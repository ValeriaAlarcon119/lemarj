// ─────────────────────────────────────────────────────────────────────────────
// LEMARJ — Database Type Definitions
// src/types/database.ts
// ─────────────────────────────────────────────────────────────────────────────

// ─── profiles (Supabase Auth Users extension) ─────────────────────────────────

export type UserRole = 'admin' | 'client'
export type UserStatus = 'active' | 'inactive'
export type Industry =
  | 'Restaurante'
  | 'Maquilladora'
  | 'Tatuador'
  | 'Tienda de ropa'
  | 'Salud y bienestar'
  | 'Educación'
  | 'Inmobiliaria'
  | 'Veterinaria'
  | 'Tecnología'
  | 'Otro'

export interface Profile {
  id: string                        // UUID — matches Supabase auth.users.id
  full_name: string | null
  phone: string | null
  email: string | null
  role: UserRole
  role_requested: UserRole | null
  status: UserStatus
  industry: Industry | null         // For contextual personalization
  company_name: string | null
  company_history: string | null
  catalog_url: string | null
  onboarding_completed: boolean
  ai_system_prompt: string | null   // Module 3: Generated AI context
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// ─── automation_templates ─────────────────────────────────────────────────────
// Read-only seed table — managed by the LEMARJ team, not users.

export type AutomationComplexity = 'Básico' | 'Intermedio' | 'Avanzado'
export type AutomationCategory =
  | 'Negocios'
  | 'Productividad'
  | 'Finanzas'
  | 'Creativo'
  | 'Educación'
  | 'Hogar'
  | 'Viajes'
  | 'Marketing'
  | 'Operaciones'

export interface AutomationTemplateConfig {
  steps: AutomationStep[]
  trigger: string
  integrations: string[]
  time_saved_per_week_hours: number
}

export interface AutomationStep {
  order: number
  name: string
  tool: string
  action: string
  description: string
}

export interface AutomationTemplate {
  id: string                        // UUID
  slug: string                      // e.g. "captura-leads-meta-crm"
  title: string
  subtitle: string
  description: string
  category: AutomationCategory
  complexity: AutomationComplexity
  profession: string                // e.g. "Para: Emprendedores & Startups"
  time_saved: string                // e.g. "8h/semana"
  config: AutomationTemplateConfig  // JSON — the automation blueprint
  is_active: boolean
  created_at: string
}

// ─── user_automations ─────────────────────────────────────────────────────────
// One row per automation instance activated by a client.

export type AutomationStatus = 'active' | 'paused' | 'draft' | 'error'

export interface UserAutomation {
  id: string                          // UUID
  user_id: string                     // FK → profiles.id
  template_id: string                 // FK → automation_templates.id
  name: string                        // User-editable display name
  status: AutomationStatus
  config_overrides: Partial<AutomationTemplateConfig> | null  // User customizations
  last_run_at: string | null
  run_count: number
  error_message: string | null
  created_at: string
  updated_at: string
}

// ─── admin_audit_log ──────────────────────────────────────────────────────────
// Records every privileged admin action for compliance.

export type AuditAction =
  | 'impersonate_start'
  | 'impersonate_end'
  | 'user_ban'
  | 'user_unban'
  | 'user_delete'
  | 'credit_manual_adjustment'
  | 'role_change'

export interface AdminAuditLog {
  id: string
  admin_id: string        // FK → profiles.id (the admin doing the action)
  target_user_id: string  // FK → profiles.id (the affected user)
  action: AuditAction
  metadata: Record<string, unknown>   // Extra context (old/new values, reason, etc.)
  ip_address: string | null
  created_at: string
}

// ─── recruitment_candidates ───────────────────────────────────────────────────
// Module 3: HR recruitment candidates (can be real via Proxycurl or mocked).

export type CandidateStatus = 'new' | 'reviewed' | 'contacted' | 'rejected' | 'hired'
export type CompatibilityScore = 'Muy alta' | 'Alta' | 'Media' | 'Baja'

export interface RecruitmentCandidate {
  id: string
  search_id: string             // Groups candidates from the same search
  full_name: string
  headline: string
  current_company: string | null
  location: string
  linkedin_url: string | null
  skills: string[]
  years_experience: number
  compatibility_score: CompatibilityScore
  compatibility_pct: number     // 0–100
  summary: string
  status: CandidateStatus
  source: 'proxycurl' | 'mock'
  raw_data: Record<string, unknown> | null
  created_at: string
}

// ─── contextual_news ──────────────────────────────────────────────────────────
// Module 3: Industry news fetched server-side and cached.

export interface ContextualNews {
  id: string
  user_id: string
  industry: Industry
  headline: string
  summary: string
  source_name: string
  url: string
  published_at: string
  fetched_at: string
}

// ─── API Response Envelope ────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  code?: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiError

// ─── Supabase SQL Hints (for reference when creating tables in Supabase) ───────
// Run these in Supabase SQL Editor to create the required tables:
//
// -- automation_templates
// CREATE TABLE public.automation_templates (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   slug TEXT UNIQUE NOT NULL,
//   title TEXT NOT NULL,
//   subtitle TEXT,
//   description TEXT,
//   category TEXT NOT NULL,
//   complexity TEXT NOT NULL CHECK (complexity IN ('Básico','Intermedio','Avanzado')),
//   profession TEXT,
//   time_saved TEXT,
//   config JSONB NOT NULL DEFAULT '{}',
//   is_active BOOLEAN NOT NULL DEFAULT true,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- user_automations
// CREATE TABLE public.user_automations (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
//   template_id UUID NOT NULL REFERENCES public.automation_templates(id),
//   name TEXT NOT NULL,
//   status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active','paused','draft','error')),
//   config_overrides JSONB,
//   last_run_at TIMESTAMPTZ,
//   run_count INTEGER NOT NULL DEFAULT 0,
//   error_message TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW(),
//   UNIQUE(user_id, template_id)  -- one instance per user per template
// );
// ALTER TABLE public.user_automations ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Users see own automations" ON public.user_automations
//   FOR ALL USING (auth.uid() = user_id);
//
// -- admin_audit_log
// CREATE TABLE public.admin_audit_log (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   admin_id UUID NOT NULL REFERENCES public.profiles(id),
//   target_user_id UUID NOT NULL REFERENCES public.profiles(id),
//   action TEXT NOT NULL,
//   metadata JSONB NOT NULL DEFAULT '{}',
//   ip_address TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
