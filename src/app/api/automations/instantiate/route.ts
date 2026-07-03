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

    // ── 3. Fetch template (verify it exists and is active) ──────────────────
    const { data: template, error: templateError } = await supabaseAdmin
      .from('automation_templates')
      .select('*')
      .eq('id', templateId)
      .eq('is_active', true)
      .single<AutomationTemplate>()

    if (templateError || !template) {
      console.warn(`[Automations] Template not found or inactive: ${templateId}`, templateError?.message)
      return NextResponse.json(
        { success: false, error: 'Plantilla no encontrada o inactiva.', code: 'TEMPLATE_NOT_FOUND' },
        { status: 404 }
      )
    }

    console.log(`[Automations] Template found: "${template.title}"`)

    // ── 4. Check for duplicate (user can only have one instance per template) ─
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
    const automationName = customName?.trim() || template.title
    const { data: newAutomation, error: insertError } = await supabaseAdmin
      .from('user_automations')
      .insert({
        user_id: user.id,
        template_id: templateId,
        name: automationName,
        status: 'draft',
        config_overrides: null,
        run_count: 0,
      })
      .select()
      .single<UserAutomation>()

    if (insertError || !newAutomation) {
      console.error('[Automations] Error creating automation instance:', insertError?.message)
      return NextResponse.json(
        { success: false, error: 'Error al guardar la automatización. Intenta de nuevo.', code: 'DB_ERROR' },
        { status: 500 }
      )
    }

    console.log(`[Automations] ✅ Created automation: ${newAutomation.id} for user ${user.id}`)

    return NextResponse.json(
      {
        success: true,
        data: newAutomation,
        message: `"${automationName}" añadida a tus automatizaciones. Puedes configurarla cuando quieras.`,
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
