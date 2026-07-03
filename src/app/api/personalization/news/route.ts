import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import type { Profile, Industry, ApiResult } from '@/types/database'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/personalization/news
// Returns 3 contextual news articles for the user's industry
// Uses the GNews API (free tier: 100 req/day) as primary,
// with a hardcoded mock fallback for local development
// ─────────────────────────────────────────────────────────────────────────────

const INDUSTRY_KEYWORDS: Record<string, string> = {
  Restaurante: 'restaurantes Colombia gastronomía emprendimiento',
  Maquilladora: 'maquillaje belleza tendencias makeup Colombia',
  Tatuador: 'tatuajes arte corporal tendencias Colombia',
  'Tienda de ropa': 'moda ropa Colombia emprendimiento fashion',
  'Salud y bienestar': 'salud bienestar wellness Colombia tendencias',
  Educación: 'educación Colombia emprendimiento e-learning',
  Inmobiliaria: 'bienes raíces inmobiliario Colombia precios',
  Veterinaria: 'mascotas veterinaria Colombia tendencias',
  Tecnología: 'tecnología startups Colombia innovación IA',
  Otro: 'emprendimiento Colombia negocios innovación',
}

interface NewsArticle {
  headline: string
  summary: string
  source_name: string
  url: string
  published_at: string
}

const MOCK_NEWS: Record<string, NewsArticle[]> = {
  Restaurante: [
    {
      headline: 'La gastronomía colombiana conquista festivales internacionales en 2026',
      summary: 'Chefs del Pacífico y la región Andina representarán a Colombia en Madrid Fusión, con propuestas que destacan ingredientes amazónicos.',
      source_name: 'El Espectador',
      url: 'https://www.elespectador.com',
      published_at: new Date().toISOString(),
    },
    {
      headline: 'WhatsApp Business se convierte en el canal #1 de pedidos para restaurantes en ciudades intermedias',
      summary: 'Más del 67% de los restaurantes en ciudades como Pasto, Manizales e Ibagué ya reciben sus pedidos por WhatsApp, según nuevo estudio de la Cámara de Comercio.',
      source_name: 'Portafolio',
      url: 'https://www.portafolio.co',
      published_at: new Date().toISOString(),
    },
    {
      headline: 'Cómo los restaurantes pequeños superan a las cadenas con IA personalizada',
      summary: 'La atención 24/7 y los menús dinámicos impulsados por inteligencia artificial permiten a emprendimientos locales competir con grandes cadenas.',
      source_name: 'Forbes Colombia',
      url: 'https://forbes.co',
      published_at: new Date().toISOString(),
    },
  ],
  Maquilladora: [
    {
      headline: 'Tendencias de maquillaje 2026: el "no-makeup look" y los tonos terrosos dominan',
      summary: 'La naturalidad y los pigmentos locales amazónicos definen la estética de belleza este año en Colombia y Latinoamérica.',
      source_name: 'Vogue Colombia',
      url: 'https://www.vogue.co',
      published_at: new Date().toISOString(),
    },
    {
      headline: 'Maquilladoras independientes triplicaron ingresos usando catálogos digitales',
      summary: 'Compartir portafolios vía WhatsApp con IA para responder consultas automáticas se convirtió en la estrategia más exitosa para artistas de belleza freelance.',
      source_name: 'La República',
      url: 'https://www.larepublica.co',
      published_at: new Date().toISOString(),
    },
    {
      headline: 'Colombia busca certificación internacional para maquilladoras profesionales',
      summary: 'El SENA lanza programa de certificación para artistas de maquillaje con validez en 12 países de habla hispana.',
      source_name: 'SENA Noticias',
      url: 'https://www.sena.edu.co',
      published_at: new Date().toISOString(),
    },
  ],
}

const DEFAULT_NEWS: NewsArticle[] = [
  {
    headline: 'El emprendimiento digital en Colombia creció un 34% en el primer semestre de 2026',
    summary: 'Según el DANE, más de 180,000 nuevos negocios digitales se formalizaron, impulsados por herramientas de IA y automatización.',
    source_name: 'DANE Colombia',
    url: 'https://www.dane.gov.co',
    published_at: new Date().toISOString(),
  },
  {
    headline: 'Las pymes colombianas que adoptan IA en atención al cliente aumentan ventas en un 28%',
    summary: 'Un estudio de la Universidad de los Andes confirma que la automatización de WhatsApp es el mayor diferenciador para negocios locales.',
    source_name: 'Dinero',
    url: 'https://www.dinero.com',
    published_at: new Date().toISOString(),
  },
  {
    headline: 'Colombia en el top 5 de países con mayor adopción de WhatsApp Business en LATAM',
    summary: 'Meta reporta que Colombia supera el 78% de adopción de WhatsApp Business entre comercios con menos de 10 empleados.',
    source_name: 'Forbes Colombia',
    url: 'https://forbes.co',
    published_at: new Date().toISOString(),
  },
]

async function fetchNewsFromGNews(query: string): Promise<NewsArticle[] | null> {
  const apiKey = process.env.GNEWS_API_KEY
  if (!apiKey) {
    console.log('[News] GNEWS_API_KEY not set, using mock data.')
    return null
  }

  try {
    const encoded = encodeURIComponent(query)
    const url = `https://gnews.io/api/v4/search?q=${encoded}&lang=es&country=co&max=3&apikey=${apiKey}`
    console.log(`[News] Fetching GNews: ${query}`)

    const res = await fetch(url, { next: { revalidate: 3600 } }) // cache 1h
    if (!res.ok) {
      console.warn(`[News] GNews API returned ${res.status}`)
      return null
    }

    const data = await res.json() as {
      articles?: Array<{
        title: string
        description: string
        source: { name: string }
        url: string
        publishedAt: string
      }>
    }

    if (!data.articles?.length) return null

    return data.articles.slice(0, 3).map(a => ({
      headline: a.title,
      summary: a.description ?? '',
      source_name: a.source?.name ?? 'Fuente desconocida',
      url: a.url,
      published_at: a.publishedAt,
    }))
  } catch (err) {
    console.error('[News] Error fetching GNews:', err)
    return null
  }
}

export async function GET(req: NextRequest): Promise<NextResponse<ApiResult<NewsArticle[]>>> {
  console.log('[Personalization/News] GET called')

  try {
    // Auth
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

    // Get user's industry from profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('industry')
      .eq('id', user.id)
      .single<Pick<Profile, 'industry'>>()

    const industry = (profile?.industry ?? 'Otro') as Industry
    console.log(`[Personalization/News] Industry for user ${user.id}: ${industry}`)

    // Try live API first, fallback to mock
    const keyword = INDUSTRY_KEYWORDS[industry] ?? INDUSTRY_KEYWORDS['Otro']
    const liveNews = await fetchNewsFromGNews(keyword)

    const articles = liveNews
      ?? MOCK_NEWS[industry]
      ?? DEFAULT_NEWS

    console.log(`[Personalization/News] Returning ${articles.length} articles for industry: ${industry}`)
    return NextResponse.json({ success: true, data: articles })

  } catch (err) {
    console.error('[Personalization/News] Error:', err)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.', code: 'INTERNAL' }, { status: 500 })
  }
}
