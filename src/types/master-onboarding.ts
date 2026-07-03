// ============================================================
// LEMARJ — MasterOnboardingData
// Tipado completo para el JSONB de la tabla `profiles`
// ============================================================

// ── Pilar 1A: Identidad & Contexto Regional ──────────────────
export interface BrandIdentity {
  company_name: string;                        // Nombre oficial del negocio
  brand_tone: 'calido' | 'clinico' | 'urbano' | 'juvenil' | 'formal'; // Tono de la marca
  city: string;                                // Ciudad del negocio (para jerga regional)
  regional_slang: string[];                    // Palabras/expresiones locales (ej: "parce", "jefe")
  company_history: string;                     // Historia y propósito de la empresa
  brand_values: string[];                      // Valores que guían al negocio
  greeting_script: string;                     // Cómo inicia la conversación con el cliente
  farewell_script: string;                     // Cómo cierra la conversación
  persona_name: string;                        // Nombre del agente IA (ej: "Valentina de Sabor Bogotá")
}

// ── Pilar 1B: Catálogo & Reglas Operativas ───────────────────
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;                               // Precio en COP
  category: string;
  is_star_product: boolean;                    // Producto más vendido / destacado
  is_slow_product: boolean;                    // Producto con bajo movimiento (para combos)
  stock: number | null;                        // null = sin control de inventario
  image_url?: string;
}

export interface CatalogData {
  catalog_pdf_url: string | null;             // URL del PDF parseado para RAG
  products: Product[];
  shipping_policy: string;                     // Política de envíos
  delivery_times: string;                      // Tiempos de entrega por zona
  business_hours: string;                      // Horario de atención
  service_area: string;                        // Zonas de cobertura/despacho
}

// ── Pilar 1C: Negociación & Cierre ───────────────────────────
export interface NegotiationRules {
  max_discount_pct: number;                    // % máximo de descuento autorizado (ej: 10)
  discount_conditions: string;                 // Cuándo y cómo aplicar descuentos
  accepted_payment_methods: string[];          // ['nequi', 'daviplata', 'transferencia', 'efectivo', 'stripe']
  payment_links: Record<string, string>;       // { nequi: '3001234567', stripe: 'https://...' }
  closing_script: string;                      // Paso a paso exacto para cerrar la venta
  upsell_rules: string;                        // Reglas para ofrecer combos/upsells
}

// ── Pilar 1D: Finanzas & Dashboard IA ────────────────────────
export interface FinancialData {
  monthly_revenue_cop: number | null;          // Ingresos mensuales actuales en COP
  monthly_expenses_cop: number | null;         // Gastos operativos mensuales en COP
  monthly_sales_goal_cop: number | null;       // Meta de ventas mensual en COP
  financial_challenges: string;               // Principales retos financieros del negocio
}

// ── Pilar 1E: RRHH & Bienestar del Fundador ─────────────────
export interface FounderWellbeing {
  stress_level: 1 | 2 | 3 | 4 | 5;           // 1=muy tranquilo, 5=al límite
  roles_to_hire: string[];                     // Roles que necesita contratar
  sector_news_interests: string[];             // Temas/fuentes de noticias de interés
  founder_goal_12months: string;               // Qué quiere lograr en 12 meses
}

// ── Pilar 1F: Integraciones ──────────────────────────────────
export interface IntegrationConfig {
  active_integrations: string[];               // ['stripe', 'tiktok', 'notion', 'google_calendar']
  whatsapp_phone_number_id: string | null;     // ID del número de WhatsApp Business (Meta)
  whatsapp_verify_token: string | null;        // Token de verificación del webhook de Meta
  openai_model: 'gpt-4o' | 'gpt-4o-mini' | 'claude-3-5-sonnet';  // Modelo LLM a usar
}

// ── MASTER INTERFACE (la que va en el JSONB) ─────────────────
export interface MasterOnboardingData {
  // Datos base del onboarding original (backwards-compatible)
  sector: string;
  employees: string;
  collaborators: string[];
  clients_volume: string;
  core_solution: string;

  // Datos avanzados del Onboarding Maestro
  brand_identity?: BrandIdentity;
  catalog?: CatalogData;
  negotiation?: NegotiationRules;
  financials?: FinancialData;
  founder?: FounderWellbeing;
  integrations?: IntegrationConfig;
  
  // Metadatos
  onboarding_version: number;                  // Para migraciones futuras (ej: 2)
  completed_at: string | null;                 // ISO timestamp
}

// ── SQL para Supabase (ejecutar en el SQL Editor) ────────────
/*
-- 1. Agregar columna JSONB si no existe (safe)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_data JSONB DEFAULT '{}';

-- 2. Crear índice GIN para búsquedas JSONB rápidas
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_data 
  ON profiles USING GIN (onboarding_data);

-- 3. Índice para búsqueda por número de WhatsApp (crítico para webhook latency)
CREATE INDEX IF NOT EXISTS idx_profiles_whatsapp_phone 
  ON profiles ((onboarding_data->>'whatsapp_phone_number_id'));

-- 4. Policy RLS para que cada usuario solo vea/edite su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
*/
