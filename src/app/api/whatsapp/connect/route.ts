import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { encryptToken } from '@/lib/whatsapp/token-vault';
import type { MetaPhoneNumberInfo } from '@/types/whatsapp-account';

// ============================================================
// LEMARJ — Embedded Signup OAuth Callback (Pilar Multi-Tenant)
// Endpoint: POST /api/whatsapp/connect
//
// FLUJO:
// 1. El cliente completa el Embedded Signup de Meta en el frontend
// 2. El frontend recibe el "code" y lo envía aquí
// 3. Este endpoint intercambia el code por un token de larga duración
// 4. Obtiene el phone_number_id y WABA info del cliente
// 5. Cifra el token con AES-256-GCM y lo guarda en whatsapp_accounts
// 6. Suscribe el número al webhook global de LEMARJ
// ============================================================

const META_APP_ID = process.env.META_APP_ID!;
const META_APP_SECRET = process.env.META_APP_SECRET!;
const LEMARJ_WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL + '/api/whatsapp/webhook';
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // ── Autenticación del usuario LEMARJ ──────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    const userToken = authHeader.slice(7);
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(userToken);
    if (authError || !user) {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 });
    }

    // ── Validar payload ───────────────────────────────────────
    const body = await req.json();
    const { code, waba_id } = body as { code?: string; waba_id?: string };
    
    if (!code || !waba_id) {
      return NextResponse.json(
        { error: 'Se requiere code y waba_id del Embedded Signup de Meta' },
        { status: 400 }
      );
    }

    // ── Paso 1: Intercambiar code por access_token ────────────
    const tokenRes = await fetch(
      `https://graph.facebook.com/v20.0/oauth/access_token?` +
      `client_id=${META_APP_ID}&` +
      `client_secret=${META_APP_SECRET}&` +
      `code=${encodeURIComponent(code)}`,
      { method: 'GET' }
    );

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error('[LEMARJ Connect] Error al obtener token de Meta:', errBody);
      return NextResponse.json(
        { error: 'No se pudo obtener el token de acceso de Meta. Intenta de nuevo.' },
        { status: 502 }
      );
    }

    const { access_token } = await tokenRes.json();

    // ── Paso 2: Convertir a token de larga duración (60 días) ─
    const longLivedRes = await fetch(
      `https://graph.facebook.com/v20.0/oauth/access_token?` +
      `grant_type=fb_exchange_token&` +
      `client_id=${META_APP_ID}&` +
      `client_secret=${META_APP_SECRET}&` +
      `fb_exchange_token=${access_token}`,
      { method: 'GET' }
    );

    const longLivedData = await longLivedRes.json();
    const finalToken = longLivedData.access_token || access_token;

    // ── Paso 3: Obtener info del número de teléfono del WABA ──
    const phoneRes = await fetch(
      `https://graph.facebook.com/v20.0/${waba_id}/phone_numbers?` +
      `fields=id,display_phone_number,verified_name&` +
      `access_token=${finalToken}`,
      { method: 'GET' }
    );

    if (!phoneRes.ok) {
      return NextResponse.json(
        { error: 'No se pudo obtener la info del número de WhatsApp.' },
        { status: 502 }
      );
    }

    const phoneData = await phoneRes.json();
    const phoneInfo = phoneData.data?.[0] as MetaPhoneNumberInfo | undefined;

    if (!phoneInfo) {
      return NextResponse.json(
        { error: 'No se encontraron números de teléfono en esta cuenta de WhatsApp Business.' },
        { status: 404 }
      );
    }

    // ── Paso 4: Suscribir el número al webhook global de LEMARJ ─
    await fetch(
      `https://graph.facebook.com/v20.0/${waba_id}/subscribed_apps`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${finalToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // ── Paso 5: Cifrar token y guardar en whatsapp_accounts ───
    const encryptedToken = encryptToken(finalToken);

    const tokenExpiresAt = longLivedData.expires_in
      ? new Date(Date.now() + longLivedData.expires_in * 1000).toISOString()
      : null;

    const { error: upsertError } = await supabaseAdmin
      .from('whatsapp_accounts')
      .upsert(
        {
          business_id: user.id,
          waba_id,
          phone_number_id: phoneInfo.id,
          display_phone_number: phoneInfo.display_phone_number,
          display_name: phoneInfo.verified_name,
          access_token_encrypted: encryptedToken,
          status: 'active',
          webhook_verified: true,
          connected_at: new Date().toISOString(),
          token_expires_at: tokenExpiresAt,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'business_id' } // 1 WABA activa por cliente (se puede extender)
      );

    if (upsertError) {
      console.error('[LEMARJ Connect] Error guardando en DB:', upsertError);
      return NextResponse.json(
        { error: 'Error interno al guardar la integración. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    // ── Respuesta exitosa (sin exponer el token) ──────────────
    return NextResponse.json({
      success: true,
      message: `¡WhatsApp conectado exitosamente! El número ${phoneInfo.display_phone_number} ya está activo.`,
      phone_number: phoneInfo.display_phone_number,
      display_name: phoneInfo.verified_name,
    });

  } catch (err: any) {
    console.error('[LEMARJ Connect] Error inesperado:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
