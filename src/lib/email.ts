/**
 * LEMARJ Email Utility
 * Sends transactional emails via Resend API with 100% LEMARJ branding.
 * Supabase's built-in email sending is BYPASSED entirely — zero Grayola contamination.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || 'noreply@lemarj.com'
const FROM_NAME = 'LEMARJ'

interface EmailPayload {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  // Development fallback: log to console when no Resend key is configured
  if (!RESEND_API_KEY || RESEND_API_KEY.trim() === '') {
    console.log('\n📧 [LEMARJ Email - DEV MODE] ─────────────────────────────')
    console.log(`To      : ${payload.to}`)
    console.log(`Subject : ${payload.subject}`)
    console.log(`From    : ${FROM_NAME} <${FROM_EMAIL}>`)
    console.log('─────────────────────────────────────────────────────────\n')
    return { success: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    })

    if (!res.ok) {
      const errorBody = await res.text()
      console.error('[LEMARJ Email] Resend error:', errorBody)
      return { success: false, error: errorBody }
    }

    return { success: true }
  } catch (err: any) {
    console.error('[LEMARJ Email] Network error:', err.message)
    return { success: false, error: err.message }
  }
}

// ─── Email Templates ───────────────────────────────────────────────────────────

const baseStyles = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: #f5f5f7;
  margin: 0;
  padding: 0;
`
const gradientBadge = `
  background: linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

function buildEmailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LEMARJ</title>
</head>
<body style="${baseStyles}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border-radius: 20px 20px 0 0; padding: 32px 40px; text-align: center;">
              <div style="display:inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); border-radius: 12px; padding: 8px 20px;">
                <span style="color:#fff; font-size:22px; font-weight:900; letter-spacing:-0.5px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">LEMARJ</span>
              </div>
              <p style="color:#94a3b8; font-size:11px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; margin:12px 0 0;">IA para WhatsApp • Colombia</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff; padding: 40px 40px 32px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 20px 20px; padding: 24px 40px; text-align:center;">
              <p style="color:#9ca3af; font-size:11px; margin:0 0 6px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                LEMARJ · San Juan de Pasto, Colombia
              </p>
              <p style="color:#d1d5db; font-size:10px; margin:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                Si no realizaste esta acción, puedes ignorar este correo de forma segura.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Welcome email sent after successful registration (no OTP — user is pre-confirmed) */
export function buildWelcomeEmail(name: string, email: string): EmailPayload {
  const firstName = name.split(' ')[0]
  return {
    to: email,
    subject: `¡Bienvenido a LEMARJ, ${firstName}! Tu cuenta está lista 🚀`,
    html: buildEmailShell(`
      <h1 style="font-size:28px; font-weight:900; color:#0a0a0a; margin:0 0 8px; letter-spacing:-0.5px;">
        ¡Hola, ${firstName}! 👋
      </h1>
      <p style="font-size:15px; color:#4b5563; margin:0 0 28px; line-height:1.6;">
        Tu cuenta en <strong>LEMARJ</strong> ha sido creada exitosamente. Ya puedes iniciar sesión y comenzar a automatizar tus ventas con IA.
      </p>

      <div style="background: linear-gradient(135deg, #faf5ff, #eff6ff); border: 1px solid #e9d5ff; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
        <p style="font-size:13px; font-weight:700; color:#7c3aed; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 12px;">¿Qué puedes hacer ahora?</p>
        <ul style="margin:0; padding:0; list-style:none;">
          <li style="display:flex; align-items:flex-start; margin-bottom:10px;">
            <span style="background:#7c3aed; color:#fff; border-radius:50%; width:20px; height:20px; min-width:20px; text-align:center; line-height:20px; font-size:11px; font-weight:900; margin-right:12px;">✓</span>
            <span style="font-size:13px; color:#374151; line-height:1.5;">Conectar tu número de WhatsApp Business</span>
          </li>
          <li style="display:flex; align-items:flex-start; margin-bottom:10px;">
            <span style="background:#3b82f6; color:#fff; border-radius:50%; width:20px; height:20px; min-width:20px; text-align:center; line-height:20px; font-size:11px; font-weight:900; margin-right:12px;">✓</span>
            <span style="font-size:13px; color:#374151; line-height:1.5;">Subir tu catálogo de productos en PDF</span>
          </li>
          <li style="display:flex; align-items:flex-start;">
            <span style="background:#06b6d4; color:#fff; border-radius:50%; width:20px; height:20px; min-width:20px; text-align:center; line-height:20px; font-size:11px; font-weight:900; margin-right:12px;">✓</span>
            <span style="font-size:13px; color:#374151; line-height:1.5;">Activar tu IA para atender clientes 24/7</span>
          </li>
        </ul>
      </div>

      <p style="font-size:13px; color:#6b7280; line-height:1.6; margin:0;">
        ¿Tienes alguna pregunta? Escríbenos a WhatsApp y te respondemos en minutos. Somos de Pasto, como tú.
      </p>
    `),
    text: `¡Hola ${firstName}! Tu cuenta en LEMARJ está lista. Inicia sesión en lemarj.com para comenzar.`,
  }
}

/** Password reset email */
export function buildPasswordResetEmail(resetLink: string, email: string): EmailPayload {
  return {
    to: email,
    subject: 'Recupera el acceso a tu cuenta LEMARJ',
    html: buildEmailShell(`
      <h1 style="font-size:26px; font-weight:900; color:#0a0a0a; margin:0 0 8px; letter-spacing:-0.5px;">
        Restablece tu contraseña
      </h1>
      <p style="font-size:15px; color:#4b5563; margin:0 0 28px; line-height:1.6;">
        Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>LEMARJ</strong>. Haz clic en el botón de abajo para continuar.
      </p>

      <div style="text-align:center; margin-bottom:28px;">
        <a href="${resetLink}" style="display:inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color:#fff; font-size:14px; font-weight:900; text-decoration:none; padding:14px 36px; border-radius:12px; letter-spacing:0.05em;">
          Restablecer contraseña →
        </a>
      </div>

      <div style="background:#fef2f2; border: 1px solid #fecaca; border-radius:12px; padding:16px; margin-bottom:16px;">
        <p style="font-size:12px; color:#b91c1c; margin:0; font-weight:600;">
          ⚠️ Este enlace expira en 1 hora. Si no solicitaste este cambio, ignora este correo. Tu contraseña no cambiará.
        </p>
      </div>

      <p style="font-size:11px; color:#9ca3af; margin:0; word-break:break-all;">
        Si el botón no funciona, copia este enlace: ${resetLink}
      </p>
    `),
    text: `Restablece tu contraseña de LEMARJ: ${resetLink} (Expira en 1 hora)`,
  }
}

/** Email change confirmation */
export function buildChangeEmailEmail(confirmLink: string, newEmail: string, email: string): EmailPayload {
  return {
    to: email,
    subject: 'Confirma tu nuevo correo en LEMARJ',
    html: buildEmailShell(`
      <h1 style="font-size:26px; font-weight:900; color:#0a0a0a; margin:0 0 8px; letter-spacing:-0.5px;">
        Confirma tu cambio de correo
      </h1>
      <p style="font-size:15px; color:#4b5563; margin:0 0 8px; line-height:1.6;">
        Solicitaste cambiar tu dirección de correo en <strong>LEMARJ</strong> a:
      </p>
      <p style="font-size:16px; font-weight:900; color:#7c3aed; margin:0 0 28px;">${newEmail}</p>

      <div style="text-align:center; margin-bottom:28px;">
        <a href="${confirmLink}" style="display:inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color:#fff; font-size:14px; font-weight:900; text-decoration:none; padding:14px 36px; border-radius:12px; letter-spacing:0.05em;">
          Confirmar nuevo correo →
        </a>
      </div>

      <p style="font-size:12px; color:#9ca3af; margin:0;">
        Si no solicitaste este cambio, ignora este correo. Tu correo actual no cambiará.
      </p>
    `),
    text: `Confirma tu nuevo correo en LEMARJ: ${confirmLink}`,
  }
}

/** Invite user email */
export function buildInviteEmail(inviteLink: string, email: string, inviterName?: string): EmailPayload {
  return {
    to: email,
    subject: 'Te invitaron a LEMARJ — Plataforma de IA para WhatsApp',
    html: buildEmailShell(`
      <h1 style="font-size:26px; font-weight:900; color:#0a0a0a; margin:0 0 8px; letter-spacing:-0.5px;">
        Tienes una invitación 🎉
      </h1>
      <p style="font-size:15px; color:#4b5563; margin:0 0 28px; line-height:1.6;">
        ${inviterName ? `<strong>${inviterName}</strong> te ha invitado a unirte a` : 'Fuiste invitado a'} <strong>LEMARJ</strong>, la plataforma de automatización de ventas con IA para WhatsApp más avanzada de Colombia.
      </p>

      <div style="text-align:center; margin-bottom:28px;">
        <a href="${inviteLink}" style="display:inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color:#fff; font-size:14px; font-weight:900; text-decoration:none; padding:14px 36px; border-radius:12px; letter-spacing:0.05em;">
          Aceptar invitación →
        </a>
      </div>

      <p style="font-size:12px; color:#9ca3af; margin:0;">
        Este enlace de invitación expira en 24 horas.
      </p>
    `),
    text: `Acepta tu invitación a LEMARJ: ${inviteLink}`,
  }
}
