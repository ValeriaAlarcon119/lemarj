import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { RecruitmentCandidate, CompatibilityScore, ApiResult } from '@/types/database'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/recruitment/search
// Query params: ?role=Vendedor Senior&location=Pasto&skills=ventas,CRM
// Ready for Proxycurl integration — currently returns mock data
// Requires: admin role
// ─────────────────────────────────────────────────────────────────────────────

interface SearchParams {
  role: string
  location: string
  skills: string[]
  yearsMin: number
}

// ── AI System Prompt Generator ─────────────────────────────────────────────────

export function generateAISystemPrompt(industry: string, companyName?: string | null): string {
  const base = `Eres el asistente de ventas por WhatsApp de ${companyName ?? 'este negocio'}, entrenado específicamente para atender clientes en Colombia con calidez, naturalidad y conocimiento profundo del producto.`

  const industryPrompts: Record<string, string> = {
    Restaurante: `${base}

CONTEXTO: Eres el vendedor virtual de un restaurante colombiano. Conoces el menú completo, los tiempos de entrega y las promociones del día.

PERSONALIDAD: Cálido, apetitoso y cercano. Usas emojis de comida moderadamente 🍽️. Conoces términos locales (ej. "el corrientazo", "el menú del día", "domicilio").

INSTRUCCIONES CLAVE:
1. Siempre saluda con entusiasmo y menciona el especial del día si está disponible.
2. Cuando el cliente pide algo, confirma el pedido con todos los detalles (cantidad, tamaño, extras) antes de procesar.
3. Si preguntan por el tiempo de entrega, da un rango honesto (ej. "entre 25 y 35 minutos").
4. Ofrece bebidas o postres como complemento de forma natural, nunca agresiva.
5. Para domicilios, solicita la dirección completa y un número de referencia.
6. Acepta pagos por Wompi, Nequi, Daviplata o efectivo al entregar.
7. Cierra siempre con: "¡Provecho! Cualquier cosa estamos aquí para servirte 🙌"`,

    Maquilladora: `${base}

CONTEXTO: Eres la asistente virtual de una maquilladora profesional. Gestionas citas, consultas de precios y portafolio de servicios.

PERSONALIDAD: Elegante, amigable y experta en belleza. Usas términos del sector (contouring, iluminador, difuminado) de forma natural. Transmites confianza y profesionalismo.

INSTRUCCIONES CLAVE:
1. Presenta los servicios con descripciones atractivas que resalten el resultado final.
2. Para agendar cita, solicita: fecha, tipo de evento, y si tiene referencias de maquillaje (imagen).
3. Informa la política de anticipo (normalmente 50% para reservar).
4. Si preguntan por duración, sé específica: maquillaje social 45 min, quinceañera 90 min, etc.
5. Comparte el portafolio de forma proactiva cuando sea relevante.
6. Nunca comprometas fechas sin consultar la agenda real.`,

    Tatuador: `${base}

CONTEXTO: Eres el asistente virtual de un estudio de tatuajes. Gestionas consultas, cotizaciones y reservas de sesiones.

PERSONALIDAD: Artístico, relajado y profesional. Usas el lenguaje del mundo del tatuaje naturalmente.

INSTRUCCIONES CLAVE:
1. Para cotizar, siempre pregunta: zona del cuerpo, tamaño aproximado (en cm), colores o blackwork, y si tienen diseño propio o necesitan uno personalizado.
2. Explica que los precios varían según complejidad y tiempo de sesión.
3. Informa sobre el proceso de cuidado post-tatuaje brevemente al confirmar la cita.
4. Requiere anticipo del 30% para reservar, saldo al finalizar.
5. Menciona que trabajan con tintas certificadas y equipo esterilizado.`,

    Otro: `${base}

PERSONALIDAD: Profesional, amable y eficiente. Responde en español colombiano de forma natural.

INSTRUCCIONES CLAVE:
1. Responde con precisión a las consultas sobre productos o servicios.
2. Si no tienes información suficiente, di que consultarás con el equipo.
3. Facilita el proceso de compra o contacto en cada interacción.
4. Sé breve y directo — los clientes de WhatsApp valoran respuestas concisas.`,
  }

  return industryPrompts[industry] ?? industryPrompts['Otro']
}

// ── Mock Candidates Generator ──────────────────────────────────────────────────

function generateMockCandidates(params: SearchParams): RecruitmentCandidate[] {
  const now = new Date().toISOString()
  const mockData: Array<Omit<RecruitmentCandidate, 'id' | 'search_id' | 'created_at'>> = ([
    {
      full_name: 'Andrés Felipe Martínez',
      headline: `${params.role} — 7 años de experiencia en sector comercial`,
      current_company: 'Grupo Éxito',
      location: params.location || 'Bogotá, Colombia',
      linkedin_url: null,
      skills: ['Ventas consultivas', 'CRM HubSpot', 'Negociación B2B', 'KPIs comerciales'],
      years_experience: 7,
      compatibility_score: 'Muy alta' as CompatibilityScore,
      compatibility_pct: 94,
      summary: `Profesional con sólida trayectoria en ventas B2B y B2C. Ha liderado equipos de hasta 12 personas y superado cuotas de venta en un 140% durante 4 años consecutivos.`,
      status: 'new',
      source: 'mock',
      raw_data: null,
    },
    {
      full_name: 'Valentina Ospina Ríos',
      headline: `${params.role} freelance — Especialista en cierre de ventas`,
      current_company: null,
      location: params.location || 'Medellín, Colombia',
      linkedin_url: null,
      skills: ['Ventas por WhatsApp', 'Atención al cliente', 'Persuasión', 'E-commerce'],
      years_experience: 4,
      compatibility_score: 'Alta' as CompatibilityScore,
      compatibility_pct: 81,
      summary: `Vendedora con enfoque en canales digitales. Especialista en embudos de venta por redes sociales y WhatsApp. Generó +$120M COP en ventas para PyMEs en el último año.`,
      status: 'new',
      source: 'mock',
      raw_data: null,
    },
    {
      full_name: 'Carlos Eduardo Benavides',
      headline: `Asesor Comercial Senior — Ex-Claro Colombia`,
      current_company: 'Independiente',
      location: params.location || 'Pasto, Nariño',
      linkedin_url: null,
      skills: ['Telecomunicaciones', 'Venta cruzada', 'Fidelización de clientes', 'CRM Salesforce'],
      years_experience: 9,
      compatibility_score: 'Alta' as CompatibilityScore,
      compatibility_pct: 78,
      summary: `Ex-funcionario de Claro con experiencia en venta de servicios y retención de clientes. Conocimiento profundo del mercado de ciudades intermedias en el sur de Colombia.`,
      status: 'new',
      source: 'mock',
      raw_data: null,
    },
    {
      full_name: 'Luisa Fernanda Chaves',
      headline: 'Ejecutiva de ventas — PYME y emprendimientos',
      current_company: 'Freelance',
      location: 'Cali, Colombia',
      linkedin_url: null,
      skills: ['Ventas presenciales', 'Manejo de objeciones', 'CRM básico', 'Redes sociales'],
      years_experience: 3,
      compatibility_score: 'Media' as CompatibilityScore,
      compatibility_pct: 65,
      summary: `Profesional joven con perfil comercial orientado a resultados. Actualmente busca proyecto de crecimiento. Disponibilidad inmediata.`,
      status: 'new',
      source: 'mock',
      raw_data: null,
    },
    {
      full_name: 'Mauricio Salazar Torres',
      headline: 'Gerente Comercial — Sector agroindustrial',
      current_company: 'Agroexportar S.A.S',
      location: 'Ipiales, Nariño',
      linkedin_url: null,
      skills: ['Gestión de equipos', 'Planificación estratégica', 'Exportaciones', 'Excel avanzado'],
      years_experience: 12,
      compatibility_score: 'Media' as CompatibilityScore,
      compatibility_pct: 58,
      summary: `Alta experiencia en dirección de equipos comerciales para sector agroindustrial. Su background no es 100% alineado con ventas digitales pero tiene gran capacidad de adaptación.`,
      status: 'new',
      source: 'mock',
      raw_data: null,
    },
  ] as Array<Omit<RecruitmentCandidate, 'id' | 'search_id' | 'created_at'>>).filter(c => {
    // Filter by minimum years of experience if specified
    if (params.yearsMin > 0 && c.years_experience < params.yearsMin) return false
    return true
  })

  return mockData.map((c, i) => ({
    ...c,
    id: `mock-${i + 1}-${Date.now()}`,
    search_id: `search-${Date.now()}`,
    created_at: now,
  }))
}

// ── Route Handler ──────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse<ApiResult<{
  candidates: RecruitmentCandidate[]
  ai_system_prompt?: string
  source: 'proxycurl' | 'mock'
  search_params: SearchParams
}>>> {
  console.log('[Recruitment/Search] GET called')

  try {
    // Auth & role check
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

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<{ role: string }>()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Solo administradores pueden buscar candidatos.', code: 'FORBIDDEN' }, { status: 403 })
    }

    // Parse search params
    const { searchParams } = new URL(req.url)
    const params: SearchParams = {
      role: searchParams.get('role') ?? 'Vendedor',
      location: searchParams.get('location') ?? 'Colombia',
      skills: searchParams.get('skills')?.split(',').map(s => s.trim()).filter(Boolean) ?? [],
      yearsMin: parseInt(searchParams.get('years_min') ?? '0', 10),
    }

    console.log('[Recruitment/Search] Params:', params)

    // Try Proxycurl if key is set
    const proxycurlKey = process.env.PROXYCURL_API_KEY
    let candidates: RecruitmentCandidate[]
    let source: 'proxycurl' | 'mock' = 'mock'

    if (proxycurlKey) {
      // ── Real Proxycurl Integration (ready to activate) ─────────────────────
      // Uncomment when PROXYCURL_API_KEY is configured:
      //
      // const proxycurlUrl = new URL('https://nubela.co/proxycurl/api/v2/linkedin/profile/search')
      // proxycurlUrl.searchParams.set('country', 'CO')
      // proxycurlUrl.searchParams.set('city', params.location)
      // proxycurlUrl.searchParams.set('headline', params.role)
      // proxycurlUrl.searchParams.set('page_size', '5')
      //
      // const res = await fetch(proxycurlUrl.toString(), {
      //   headers: { Authorization: `Bearer ${proxycurlKey}` },
      // })
      // const data = await res.json()
      // candidates = mapProxycurlToCandidate(data.results, params)
      // source = 'proxycurl'
      //
      console.log('[Recruitment/Search] Proxycurl key found but using mock for now.')
      candidates = generateMockCandidates(params)
      source = 'mock'
    } else {
      console.log('[Recruitment/Search] PROXYCURL_API_KEY not set — using mock data.')
      candidates = generateMockCandidates(params)
    }

    // Sort by compatibility_pct descending
    candidates.sort((a, b) => b.compatibility_pct - a.compatibility_pct)

    console.log(`[Recruitment/Search] Returning ${candidates.length} candidates (source: ${source})`)

    return NextResponse.json({
      success: true,
      data: {
        candidates,
        source,
        search_params: params,
      },
      message: `Se encontraron ${candidates.length} candidatos compatibles.`,
    })

  } catch (err) {
    console.error('[Recruitment/Search] Error:', err)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.', code: 'INTERNAL' }, { status: 500 })
  }
}

// ── POST: Generate AI System Prompt for a user ─────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse<ApiResult<{ system_prompt: string }>>> {
  console.log('[Recruitment/SystemPrompt] POST called')

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
      return NextResponse.json({ success: false, error: 'Sesión inválida.', code: 'INVALID_TOKEN' }, { status: 401 })
    }

    const body = await req.json() as { industry: string; company_name?: string }
    if (!body?.industry) {
      return NextResponse.json({ success: false, error: 'industry es requerido.', code: 'BAD_REQUEST' }, { status: 400 })
    }

    const prompt = generateAISystemPrompt(body.industry, body.company_name)
    console.log(`[SystemPrompt] Generated prompt for industry: ${body.industry} (${prompt.length} chars)`)

    // Optionally save to the user's profile
    await supabaseAdmin
      .from('profiles')
      .update({ ai_system_prompt: prompt })
      .eq('id', user.id)

    return NextResponse.json({
      success: true,
      data: { system_prompt: prompt },
      message: 'Contexto de IA generado y guardado correctamente.',
    })

  } catch (err) {
    console.error('[SystemPrompt] Error:', err)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.', code: 'INTERNAL' }, { status: 500 })
  }
}
