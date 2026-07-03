import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail, buildPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'El correo es requerido' }, { status: 400 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey || serviceKey.trim() === '') {
      return NextResponse.json(
        { error: 'El servidor no está configurado correctamente.' },
        { status: 500 }
      )
    }

    // Generate password reset link via Admin SDK (no email from Supabase)
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email.toLowerCase().trim(),
    })

    if (error) {
      console.error('[LEMARJ /api/auth/reset-password] generateLink error:', error)
      // Return success regardless to prevent email enumeration
    }

    if (data?.properties?.action_link) {
      const emailPayload = buildPasswordResetEmail(data.properties.action_link, email)
      const emailResult = await sendEmail(emailPayload)

      if (!emailResult.success) {
        console.warn('[LEMARJ /api/auth/reset-password] Email failed:', emailResult.error)
      } else {
        console.log(`[LEMARJ /api/auth/reset-password] ✅ Reset email sent to ${email}`)
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'Si tu correo está registrado, recibirás las instrucciones en breve.',
    })
  } catch (err: any) {
    console.error('[LEMARJ /api/auth/reset-password] Unexpected error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
