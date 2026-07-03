import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail, buildWelcomeEmail } from '@/lib/email'

// Creates a fresh Admin client per request so it always uses the current env values
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log('[LEMARJ /api/auth/register] ENV check:', {
    hasUrl: !!url,
    hasServiceKey: !!serviceKey,
    serviceKeyLength: serviceKey?.length ?? 0,
  })

  if (!url || !serviceKey || serviceKey.trim() === '') return null

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, full_name, phone } = body

    // ── Validations ─────────────────────────────────────────────────────────
    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: email, password, full_name' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // ── Admin client ─────────────────────────────────────────────────────────
    const adminClient = getAdminClient()
    if (!adminClient) {
      console.error('[LEMARJ /api/auth/register] SUPABASE_SERVICE_ROLE_KEY not set or empty.')
      return NextResponse.json(
        { error: 'El servidor no está configurado correctamente. Contacta al administrador. (service key faltante)' },
        { status: 500 }
      )
    }

    // ── Create user via Admin SDK — email_confirm: true skips Supabase emails ──
    const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
      email: email.toLowerCase().trim(),
      password,
      email_confirm: true, // pre-confirmed → zero Supabase/Grayola emails
      user_metadata: {
        full_name: full_name.trim(),
        phone: phone || '',
        role_requested: 'client',
        registered_at: new Date().toISOString(),
      },
    })

    if (createError) {
      console.error('[LEMARJ /api/auth/register] createUser error:', createError)

      if (
        createError.message.includes('already registered') ||
        createError.message.includes('already been registered')
      ) {
        return NextResponse.json(
          { error: 'Este correo ya está registrado. Intenta iniciar sesión.' },
          { status: 409 }
        )
      }

      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    const userId = authData.user?.id
    console.log('[LEMARJ /api/auth/register] ✅ User created:', userId)

    // ── Create profile ────────────────────────────────────────────────────────
    if (userId) {
      const { error: profileError } = await adminClient
        .from('profiles')
        .upsert({
          id: userId,
          email: email.toLowerCase().trim(),
          full_name: full_name.trim(),
          phone: phone || '',
          role: 'client',
          created_at: new Date().toISOString(),
        })

      if (profileError) {
        console.warn('[LEMARJ /api/auth/register] Profile upsert warning:', profileError.message)
      }
    }

    // ── Send LEMARJ-branded welcome email ─────────────────────────────────────
    const emailPayload = buildWelcomeEmail(full_name.trim(), email)
    const emailResult = await sendEmail(emailPayload)

    if (!emailResult.success) {
      console.warn('[LEMARJ /api/auth/register] Welcome email failed:', emailResult.error)
    } else {
      console.log(`[LEMARJ /api/auth/register] ✅ Welcome email sent to ${email}`)
    }

    return NextResponse.json({
      success: true,
      message: `¡Cuenta creada! Ya puedes iniciar sesión con ${email}.`,
      userId,
    })
  } catch (err: any) {
    console.error('[LEMARJ /api/auth/register] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}


