import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { buildWhatsAppSystemPrompt } from '@/lib/ai/promptGenerator';
import { decryptToken } from '@/lib/whatsapp/token-vault';
import type { MasterOnboardingData } from '@/types/master-onboarding';

// ============================================================
// LEMARJ — WhatsApp Cloud API Webhook MULTI-TENANT (Pilar 2 v2)
// Endpoint: /api/whatsapp/webhook
//
// ARQUITECTURA MULTI-TENANT:
// - UN solo webhook para TODOS los clientes del SaaS
// - Cada mensaje tiene phone_number_id → lookup en whatsapp_accounts
// - El token de API se descifra POR TENANT en cada request
// - Responde 200 a Meta en < 200ms (antes de hacer cualquier I/O)
// ============================================================

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

// Admin client con service_role para lectura cross-tenant
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET: Verificación de Webhook (solo 1 vez al registrar) ──
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    console.log('[LEMARJ WhatsApp] Webhook verificado.');
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ── POST: Pipeline de mensajes entrantes Multi-Tenant ──────
export async function POST(req: NextRequest) {
  // CRÍTICO: Responder a Meta ANTES de cualquier procesamiento.
  // Meta espera 200 OK en < 3 segundos o reintentará el mensaje.
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ status: 'ok' }, { status: 200 });

  // Fire-and-forget — no bloquea la respuesta 200
  processIncomingMessage(body).catch(err => {
    console.error('[LEMARJ WhatsApp] Pipeline error:', err?.message);
  });

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}

// ── PIPELINE ASÍNCRONO MULTI-TENANT ──────────────────────────
async function processIncomingMessage(body: unknown) {
  try {
    // ─ 1. Extraer datos del payload de Meta ──────────────────
    const entry = (body as any)?.entry?.[0];
    const value = entry?.changes?.[0]?.value;

    if (!value?.messages?.length) return; // Solo mensajes, no status updates

    const message = value.messages[0];
    const fromPhone: string = message.from;
    const phoneNumberId: string = value.metadata?.phone_number_id;
    const messageId: string = message.id;

    if (!fromPhone || !phoneNumberId) return;

    // ─ 2. Extraer contenido según tipo de mensaje ─────────────
    const customerText = extractMessageText(message);

    // ─ 3. Lookup del tenant por phone_number_id ───────────────
    // Índice único en whatsapp_accounts.phone_number_id → O(log n)
    const { data: waAccount, error: waError } = await supabaseAdmin
      .from('whatsapp_accounts')
      .select('business_id, access_token_encrypted, status')
      .eq('phone_number_id', phoneNumberId)
      .eq('status', 'active')
      .maybeSingle();

    if (waError || !waAccount) {
      console.warn(`[LEMARJ WhatsApp] No se encontró cuenta activa para phone_number_id: ${phoneNumberId}`);
      return; // Silencioso: este número no está en LEMARJ
    }

    // ─ 4. Descifrar el token DEL TENANT específico ────────────
    const tenantToken = decryptToken(waAccount.access_token_encrypted);

    // ─ 5. Marcar mensaje como "leído" (evita doble check gris) ─
    await markAsRead(phoneNumberId, messageId, tenantToken);

    // ─ 6. Obtener el perfil/onboarding del negocio ────────────
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('onboarding_data, full_name, company_name')
      .eq('id', waAccount.business_id)
      .maybeSingle();

    if (profileError || !profile?.onboarding_data) {
      // Negocio sin onboarding → respuesta genérica profesional
      await sendMessage(phoneNumberId, fromPhone, tenantToken,
        '¡Hola! Gracias por escribirnos. En este momento estamos configurando nuestra atención. Te contactaremos muy pronto. 🙏'
      );
      return;
    }

    const onboardingData = profile.onboarding_data as MasterOnboardingData;

    // ─ 7. Construir el System Prompt PERSONALIZADO del tenant ──
    const systemPrompt = buildWhatsAppSystemPrompt(onboardingData, customerText);

    // ─ 8. Llamar al LLM con el modelo configurado por el tenant ─
    const aiResponse = await callLLM(systemPrompt, customerText, onboardingData);

    // ─ 9. Enviar respuesta al cliente usando el TOKEN del tenant ─
    await sendMessage(phoneNumberId, fromPhone, tenantToken, aiResponse);

    // ─ 10. Loguear conversación para analytics del tenant ──────
    await logConversation({
      business_id: waAccount.business_id,
      customer_phone: fromPhone,
      customer_message: customerText,
      ai_response: aiResponse,
    });

  } catch (err: any) {
    // Error ya capturado en el caller, Meta ya tiene su 200
    console.error('[LEMARJ WhatsApp] Error en pipeline:', err?.message);
  }
}

// ── HELPERS ───────────────────────────────────────────────────

function extractMessageText(message: any): string {
  switch (message.type) {
    case 'text':     return message.text?.body || '';
    case 'image':    return `[Imagen enviada${message.image?.caption ? ': ' + message.image.caption : ''}]`;
    case 'document': return `[Documento: ${message.document?.filename || 'adjunto'}]`;
    case 'audio':    return '[Audio enviado]';
    case 'video':    return '[Video enviado]';
    case 'location': return `[Ubicación: lat ${message.location?.latitude}, lng ${message.location?.longitude}]`;
    default:         return '[Mensaje recibido]';
  }
}

async function callLLM(
  systemPrompt: string,
  userMessage: string,
  data: MasterOnboardingData
): Promise<string> {
  const model = data.integrations?.openai_model ?? 'gpt-4o-mini';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      temperature: 0.65,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage },
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);

  const json = await res.json();
  return (
    json.choices?.[0]?.message?.content?.trim() ||
    'Disculpa, tuve un problema procesando tu mensaje. ¿Puedes repetirlo? 🙏'
  );
}

async function sendMessage(
  phoneNumberId: string,
  to: string,
  accessToken: string,  // ← Token ESPECÍFICO del tenant, no el global
  text: string
): Promise<void> {
  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: text },
      }),
    }
  );
  if (!res.ok) {
    console.error(`[LEMARJ WhatsApp] Error enviando mensaje: ${await res.text()}`);
  }
}

async function markAsRead(
  phoneNumberId: string,
  messageId: string,
  accessToken: string
): Promise<void> {
  await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    }),
  }).catch(() => {}); // No crítico
}

async function logConversation(data: {
  business_id: string;
  customer_phone: string;
  customer_message: string;
  ai_response: string;
}): Promise<void> {
  await supabaseAdmin
    .from('conversations')
    .insert(data)
    .then(({ error }) => {
      if (error) console.warn('[LEMARJ WhatsApp] Log fallo (no crítico):', error.message);
    });
}
