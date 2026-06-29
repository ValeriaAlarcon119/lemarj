'use server'

import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import type {
  ApiResponse,
  UpdateUserParams,
  CreditTransactionData,
  UpdateProjectCostData,
} from './types'

function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

async function getAuthenticatedUser(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

async function getUserRole(
  supabase: ReturnType<typeof createServerClient>,
  authUserId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authUserId)
    .single()

  if (error || !data) return null
  return data.role ?? null
}

export async function adminUpdateUser({
  userId,
  data,
  userEmail,
  userName,
}: UpdateUserParams): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .update(data)
      .eq('id', userId)

    if (error) {
      return { errorMessage: error.message, errorTitle: 'Error al actualizar el usuario' }
    }

    if (data.verified === true && userEmail) {
      adminSendWelcomeNotification(userEmail, userName).catch((err) =>
        console.error('[Admin] Error sending welcome notification:', err)
      )
    }

    revalidatePath('/admin-dashboard')
    return { successMessage: 'Usuario actualizado correctamente.', data: { success: true } }
  } catch (err) {
    console.error('[Admin] Error updating user:', err)
    return {
      errorMessage: err instanceof Error ? err.message : 'Error interno del servidor',
      errorTitle: 'Error al actualizar el usuario',
    }
  }
}

async function adminSendWelcomeNotification(email: string, name?: string | null) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.warn('[Admin] RESEND_API_KEY not set. Notification skipped.')
    return
  }
  const displayName = name ?? email.split('@')[0]
  const fromAddress = process.env.EMAIL_FROM_ADDRESS ?? 'noreply@lemarj.com'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [email],
      subject: '¡Bienvenido a LEMARJ! Tu cuenta está activa.',
      html: `<h2>Hola ${displayName},</h2><p>Tu cuenta en LEMARJ ha sido activada y verificada por nuestro equipo. Ya puedes iniciar sesión y comenzar a usar la plataforma.</p><p>¡Bienvenido!</p>`,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend API error: ${body}`)
  }
}

export async function adminDeleteUser(userId: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', userId)

    if (error) {
      return { errorMessage: error.message, errorTitle: 'Error al eliminar el usuario' }
    }

    revalidatePath('/admin-dashboard')
    return { successMessage: 'Usuario eliminado correctamente.' }
  } catch (err) {
    console.error('[Admin] Error deleting user:', err)
    return {
      errorMessage: err instanceof Error ? err.message : 'Error interno del servidor',
      errorTitle: 'Error al eliminar el usuario',
    }
  }
}

export async function adminBanUser(
  userId: string,
  isBanned: boolean
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const { data: userData, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (fetchError || !userData) {
      return { errorMessage: 'Usuario no encontrado.', errorTitle: 'Error' }
    }

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban_duration: isBanned ? '876000h' : 'none',
    })

    if (authError) {
      return {
        errorMessage: authError.message,
        errorTitle: `Error al ${isBanned ? 'suspender' : 'reactivar'} el usuario`,
      }
    }

    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .update({ status: isBanned ? 'inactive' : 'active' })
      .eq('id', userId)

    if (dbError) {
      return {
        errorMessage: dbError.message,
        errorTitle: `Error al ${isBanned ? 'suspender' : 'reactivar'} el usuario en la BD`,
      }
    }

    revalidatePath('/admin-dashboard')
    return {
      successMessage: `Usuario ${isBanned ? 'suspendido' : 'reactivado'} correctamente.`,
      data: { success: true },
    }
  } catch (err) {
    console.error('[Admin] Error banning user:', err)
    return {
      errorMessage: err instanceof Error ? err.message : 'Error interno del servidor',
      errorTitle: 'Error de sistema',
    }
  }
}

export async function adminCreateCreditTransaction(
  data: CreditTransactionData
): Promise<ApiResponse<boolean>> {
  try {
    const supabase = createServerClient()
    const authUser = await getAuthenticatedUser(supabase)
    if (!authUser) return { errorMessage: 'No autenticado.', errorTitle: 'Acceso denegado' }

    const role = await getUserRole(supabase, authUser.id)
    if (role !== 'admin') {
      return { errorMessage: 'No tienes permisos para crear transacciones.', errorTitle: 'Acceso denegado' }
    }

    const { data: orgCredits, error: creditsError } = await supabaseAdmin
      .from('organization_credits')
      .select('credits')
      .eq('organization_id', data.organization_id)
      .single()

    if (creditsError || !orgCredits) {
      return { errorMessage: 'No se pudo obtener el saldo de créditos.', errorTitle: 'Error' }
    }

    const currentCredits: number = orgCredits.credits
    const newBalance =
      data.transaction_type === 'increase'
        ? currentCredits + data.amount
        : currentCredits - data.amount

    if (newBalance < -10) {
      return { errorMessage: 'El saldo de créditos no puede ser inferior a -10.', errorTitle: 'Saldo insuficiente' }
    }

    const { error: rpcError } = await supabase.rpc('create_credit_transaction', {
      p_organization_id: data.organization_id,
      p_amount: data.amount,
      p_transaction_type: data.transaction_type,
      p_reason: data.reason,
      p_notes: data.notes ?? undefined,
      p_author_id: data.author_id,
      p_created_at: data.created_at && data.created_at !== '' ? data.created_at : undefined,
    })

    if (rpcError) {
      return { errorMessage: rpcError.message, errorTitle: 'Error en la transacción' }
    }

    revalidatePath('/admin-dashboard')
    revalidatePath('/workspace')

    const verb = data.transaction_type === 'increase' ? 'agregaron' : 'descontaron'
    return {
      data: true,
      successMessage: `Transacción creada: se ${verb} ${data.amount} créditos.`,
    }
  } catch (err) {
    console.error('[Admin] Error creating credit transaction:', err)
    return { errorMessage: 'Error interno del servidor.', errorTitle: 'Error' }
  }
}

export async function adminUpdateProjectCost(
  data: UpdateProjectCostData
): Promise<ApiResponse<boolean>> {
  try {
    const supabase = createServerClient()
    const authUser = await getAuthenticatedUser(supabase)
    if (!authUser) return { errorMessage: 'No autenticado.' }

    const role = await getUserRole(supabase, authUser.id)
    if (role !== 'admin' && role !== 'manager') {
      return { errorMessage: 'Sin permisos para actualizar el costo del proyecto.' }
    }

    const { data: project, error: projError } = await supabase
      .from('projects')
      .select('cost')
      .eq('id', data.project_id)
      .single()

    if (projError || !project) return { errorMessage: 'Proyecto no encontrado.' }

    const currentCost: number = project.cost ?? 0
    const costDifference = data.new_cost - currentCost

    if (costDifference === 0) {
      return { data: true, successMessage: 'El costo del proyecto no ha cambiado.' }
    }

    const { data: orgCredits, error: creditsError } = await supabaseAdmin
      .from('organization_credits')
      .select('credits, organization_id')
      .eq('organization_id', data.organization_id)
      .single()

    if (creditsError || !orgCredits) {
      return { errorMessage: 'No se pudo obtener el saldo de créditos.' }
    }

    const newBalance = (orgCredits.credits as number) - costDifference
    if (newBalance < -10) {
      return { errorMessage: 'La organización no puede tener créditos por debajo de -10.' }
    }

    const { error: rpcError } = await supabase.rpc('update_project_cost_with_credits', {
      p_project_id: data.project_id,
      p_new_cost: data.new_cost,
      p_organization_id: data.organization_id,
      p_author_id: data.author_id,
      p_cost_difference: costDifference,
      p_notes: data.notes ?? `Actualización de costo del proyecto #${data.project_id}`,
    })

    if (rpcError) return { errorMessage: rpcError.message }

    revalidatePath('/admin-dashboard')
    revalidatePath('/workspace')

    const amount = Math.abs(costDifference)
    const msg =
      costDifference > 0
        ? `Costo aumentado: se descontaron ${amount} créditos.`
        : `Costo reducido: se devolvieron ${amount} créditos.`

    return { data: true, successMessage: msg }
  } catch (err) {
    console.error('[Admin] Error updating project cost:', err)
    return { errorMessage: 'Error interno del servidor.' }
  }
}

export async function adminGetUsers() {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email, phone, role, status, created_at')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function adminGetSummary() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [usersResult, activeUsersResult] = await Promise.all([
    supabaseAdmin.from('profiles').select('id', { count: 'exact' }),
    supabaseAdmin
      .from('profiles')
      .select('id', { count: 'exact' })
      .eq('status', 'active')
      .gte('created_at', startOfMonth),
  ])

  return {
    period: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
    totalUsers: usersResult.count ?? 0,
    newUsersThisMonth: activeUsersResult.count ?? 0,
  }
}
