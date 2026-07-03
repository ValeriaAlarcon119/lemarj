import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import type { Profile, ApiResult, AuditAction } from '@/types/database'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/users
// Query params: ?page=1&limit=10&search=&status=&role=
// Requires: admin role
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginatedUsers {
  users: Profile[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function GET(req: NextRequest): Promise<NextResponse<ApiResult<PaginatedUsers>>> {
  console.log('[Admin/Users] GET called')

  try {
    // ── Auth & Role Check ────────────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'No autorizado.', code: 'UNAUTHENTICATED' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Sesión inválida.', code: 'INVALID_TOKEN' }, { status: 401 })
    }

    // Verify admin role
    const { data: adminProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<Pick<Profile, 'role'>>()

    if (profileError || adminProfile?.role !== 'admin') {
      console.warn(`[Admin/Users] Forbidden access attempt by: ${user.id}`)
      return NextResponse.json({ success: false, error: 'Acceso denegado. Solo administradores.', code: 'FORBIDDEN' }, { status: 403 })
    }

    // ── Query Params ─────────────────────────────────────────────────────────
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)))
    const search = searchParams.get('search')?.trim() ?? ''
    const status = searchParams.get('status') ?? ''
    const role = searchParams.get('role') ?? ''
    const offset = (page - 1) * limit

    console.log(`[Admin/Users] Querying page=${page} limit=${limit} search="${search}" status="${status}" role="${role}"`)

    // ── Build Query ───────────────────────────────────────────────────────────
    let query = supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact' })
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }
    if (status && ['active', 'inactive'].includes(status)) {
      query = query.eq('status', status)
    }
    if (role && ['admin', 'client'].includes(role)) {
      query = query.eq('role', role)
    }

    const { data, count, error: queryError } = await query

    if (queryError) {
      console.error('[Admin/Users] DB error:', queryError.message)
      return NextResponse.json({ success: false, error: 'Error al obtener los usuarios.', code: 'DB_ERROR' }, { status: 500 })
    }

    const totalPages = Math.ceil((count ?? 0) / limit)
    console.log(`[Admin/Users] Found ${count} users, returning page ${page}/${totalPages}`)

    return NextResponse.json({
      success: true,
      data: {
        users: (data ?? []) as Profile[],
        total: count ?? 0,
        page,
        limit,
        totalPages,
      },
    })
  } catch (err) {
    console.error('[Admin/Users] Unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.', code: 'INTERNAL' }, { status: 500 })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/users/impersonate
// Body: { targetUserId: string }
// Returns a short-lived impersonation token + audit log entry
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse<ApiResult<{ impersonationToken: string; targetUser: Pick<Profile, 'id' | 'full_name' | 'email' | 'role'> }>>> {
  console.log('[Admin/Impersonate] POST called')

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'No autorizado.', code: 'UNAUTHENTICATED' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user: adminUser }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !adminUser) {
      return NextResponse.json({ success: false, error: 'Sesión inválida.', code: 'INVALID_TOKEN' }, { status: 401 })
    }

    // Verify admin role
    const { data: adminProfile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', adminUser.id)
      .single<Pick<Profile, 'role'>>()

    if (adminProfile?.role !== 'admin') {
      console.warn(`[Admin/Impersonate] Non-admin attempted impersonation: ${adminUser.id}`)
      return NextResponse.json({ success: false, error: 'Solo los administradores pueden suplantar identidades.', code: 'FORBIDDEN' }, { status: 403 })
    }

    const body = await req.json() as { targetUserId: string }
    if (!body?.targetUserId) {
      return NextResponse.json({ success: false, error: 'targetUserId es requerido.', code: 'BAD_REQUEST' }, { status: 400 })
    }

    // Prevent self-impersonation
    if (body.targetUserId === adminUser.id) {
      return NextResponse.json({ success: false, error: 'No puedes suplantarte a ti mismo.', code: 'SELF_IMPERSONATE' }, { status: 400 })
    }

    // Fetch target user profile
    const { data: targetProfile, error: targetError } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, email, role')
      .eq('id', body.targetUserId)
      .is('deleted_at', null)
      .single<Pick<Profile, 'id' | 'full_name' | 'email' | 'role'>>()

    if (targetError || !targetProfile) {
      console.warn(`[Admin/Impersonate] Target user not found: ${body.targetUserId}`)
      return NextResponse.json({ success: false, error: 'Usuario objetivo no encontrado.', code: 'USER_NOT_FOUND' }, { status: 404 })
    }

    // Generate impersonation link using Service Role
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: targetProfile.email!,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/?impersonated=true`,
      },
    })

    if (signInError || !signInData) {
      console.error('[Admin/Impersonate] Error generating impersonation link:', signInError?.message)
      return NextResponse.json({ success: false, error: 'Error generando el acceso de suplantación.', code: 'IMPERSONATE_ERROR' }, { status: 500 })
    }

    // ── Write audit log ──────────────────────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    const { error: auditError } = await supabaseAdmin.from('admin_audit_log').insert({
      admin_id: adminUser.id,
      target_user_id: body.targetUserId,
      action: 'impersonate_start' satisfies AuditAction,
      metadata: {
        target_name: targetProfile.full_name,
        target_email: targetProfile.email,
        target_role: targetProfile.role,
      },
      ip_address: ip,
    })

    if (auditError) {
      console.error('[Admin/Impersonate] AUDIT LOG FAILED:', auditError.message)
      // Don't block the request — but log loudly
    }

    const impersonationToken = (signInData as { properties?: { hashed_token?: string } }).properties?.hashed_token ?? ''
    console.log(`[Admin/Impersonate] ✅ Admin ${adminUser.id} impersonating user ${body.targetUserId}`)

    return NextResponse.json({
      success: true,
      data: {
        impersonationToken,
        targetUser: targetProfile,
      },
      message: `Suplantando a ${targetProfile.full_name}`,
    })

  } catch (err) {
    console.error('[Admin/Impersonate] Unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.', code: 'INTERNAL' }, { status: 500 })
  }
}
