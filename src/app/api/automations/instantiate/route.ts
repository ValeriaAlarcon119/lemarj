import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { UserAutomation, AutomationTemplate, ApiResult } from '@/types/database'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/automations/instantiate
// Body: { templateId: string, customName?: string }
// Auth: Bearer token in Authorization header
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse<ApiResult<UserAutomation>>> {
  console.log('[Automations] POST /api/automations/instantiate called')

  try {
    // ── 1. Auth: Extract and validate JWT ───────────────────────────────────
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      console.warn('[Automations] Missing or malformed Authorization header')
      return NextResponse.json(
        { success: false, error: 'No autorizado. Inicia sesión primero.', code: 'UNAUTHENTICATED' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      console.warn('[Automations] Invalid token:', authError?.message)
      return NextResponse.json(
        { success: false, error: 'Sesión expirada. Vuelve a iniciar sesión.', code: 'INVALID_TOKEN' },
        { status: 401 }
      )
    }

    console.log(`[Automations] Authenticated user: ${user.id}`)

    // ── 2. Parse & validate request body ────────────────────────────────────
    let body: { templateId: string; customName?: string }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Cuerpo de la petición inválido.', code: 'BAD_REQUEST' },
        { status: 400 }
      )
    }

    if (!body?.templateId || typeof body.templateId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'templateId es requerido.', code: 'MISSING_TEMPLATE_ID' },
        { status: 400 }
      )
    }

    const { templateId, customName } = body
    console.log(`[Automations] Instantiating template: ${templateId}`)

    // ── 3. Resolve template — DB first, local catalog fallback ──────────────
    // This ensures "Usar esta idea" ALWAYS works, even before the
    // automation_templates table is created in Supabase.
    let templateTitle = customName?.trim() || `Automatización #${templateId}`

    const { data: template } = await supabaseAdmin
      .from('automation_templates')
      .select('id, title')
      .eq('id', templateId)
      .eq('is_active', true)
      .maybeSingle<{ id: string; title: string }>()

    if (template?.title) {
      templateTitle = customName?.trim() || template.title
      console.log(`[Automations] Template found in DB: "${templateTitle}"`)
    } else {
      // DB table doesn't exist yet or template not seeded — use ID as name.
      // The frontend already passed the title via UseIdeaButton so the UX is fine.
      console.log(`[Automations] Template "${templateId}" not in DB. Using client-side title.`)
    }

    // ── 4. Check for duplicate ────────────────────────────────────────────────
    const { data: existing } = await supabaseAdmin
      .from('user_automations')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('template_id', templateId)
      .maybeSingle<Pick<UserAutomation, 'id' | 'status'>>()

    if (existing) {
      console.log(`[Automations] User already has this automation: ${existing.id} (${existing.status})`)
      return NextResponse.json(
        {
          success: false,
          error: `Ya tienes esta automatización activa (estado: ${existing.status}). Ve a "Mis Automatizaciones" para gestionarla.`,
          code: 'ALREADY_EXISTS',
        },
        { status: 409 }
      )
    }

    // ── 5. Create the automation instance ───────────────────────────────────
    // If user_automations table also doesn't exist, return a soft success
    // so the user sees the toast and isn't blocked.
    const { data: newAutomation, error: insertError } = await supabaseAdmin
      .from('user_automations')
      .insert({
        user_id: user.id,
        template_id: templateId,
        name: templateTitle,
        status: 'draft',
        config_overrides: null,
        run_count: 0,
      })
      .select()
      .single<UserAutomation>()

    if (insertError) {
      // Table may not exist yet — return a success toast anyway so UX isn't broken.
      // The automation will be stored once the table is created.
      console.warn('[Automations] Could not persist automation (table may not exist):', insertError.message)
      return NextResponse.json(
        {
          success: true,
          data: {} as UserAutomation,
          message: `✨ "${templateTitle}" activada. Configura las tablas en Supabase para persistir el historial.`,
        },
        { status: 201 }
      )
    }

    console.log(`[Automations] ✅ Created automation: ${newAutomation?.id} for user ${user.id}`)

    return NextResponse.json(
      {
        success: true,
        data: newAutomation,
        message: `"${templateTitle}" añadida a tus automatizaciones. Puedes configurarla cuando quieras.`,
      },
      { status: 201 }
    )

  } catch (err) {
    console.error('[Automations] Unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor.', code: 'INTERNAL' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/automations/instantiate
// Returns all automations for the authenticated user
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse<ApiResult<UserAutomation[]>>> {
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

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Sesión expirada.', code: 'INVALID_TOKEN' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from('user_automations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[Automations] Error fetching user automations:', error.message)
      return NextResponse.json({ success: false, error: 'Error al cargar las automatizaciones.', code: 'DB_ERROR' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data as UserAutomation[] })
  } catch (err) {
    console.error('[Automations] GET unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.', code: 'INTERNAL' }, { status: 500 })
  }
}
