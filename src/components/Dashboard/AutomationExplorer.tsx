"use client";
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Star, Users, ShoppingCart, Zap, Brain, Globe, Home,
  Plane, DollarSign, Palette, GraduationCap, Building2, ChevronRight,
  MessageCircle, BarChart3, Mail, CreditCard, Database, Camera,
  Heart, Briefcase, Music, FileText, Repeat, ArrowRight, Sparkles,
  TrendingUp, Package, Clock, CheckCircle2, Filter, X
} from "lucide-react"
import {
  MetaIcon, NotionIcon, TikTokIcon, StripeIcon, WompiIcon,
  GmailIcon, SheetsIcon, DriveIcon, CanvaIcon, HubSpotIcon, CalendarIcon, WhatsAppIcon
} from "../BrandIcons"

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "Negocios" | "Productividad" | "Finanzas" | "Creativo" | "Educación" | "Hogar" | "Viajes"

interface Integration {
  name: string
  color: string
  icon: React.ReactNode
}

interface IdeaCard {
  id: number
  category: Category
  title: string
  subtitle: string
  profession: string
  integrations: Integration[]
  complexity: "Básico" | "Intermedio" | "Avanzado"
  timeSaved: string
}

interface Template {
  id: number
  name: string
  description: string
  category: string
  users: number
  rating: number
  price: number | "Gratis"
  tags: string[]
  previewBg: string
  previewContent: React.ReactNode
  badge: string
  badgeColor: string
}

// ─── Integration Icons ─────────────────────────────────────────────────────────

const INTEGRATIONS: Record<string, Integration> = {
  meta:    { name: "Meta",   color: "bg-blue-50 border border-blue-100/50",    icon: <MetaIcon size={12} /> },
  notion:  { name: "Notion", color: "bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10/50",   icon: <NotionIcon size={12} /> },
  tiktok:  { name: "TikTok", color: "bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-slate-800 dark:text-zinc-100", icon: <TikTokIcon size={12} /> },
  stripe:  { name: "Stripe", color: "bg-violet-50 border border-violet-100/50",  icon: <StripeIcon size={12} /> },
  wompi:   { name: "Wompi",  color: "bg-purple-50 border border-purple-100/50", icon: <WompiIcon size={12} /> },
  gmail:   { name: "Gmail",  color: "bg-rose-50 border border-rose-100/50",     icon: <GmailIcon size={12} /> },
  whatsapp:{ name: "WhatsApp", color: "bg-green-50 border border-green-100/50",   icon: <WhatsAppIcon size={12} /> },
  sheets:  { name: "Sheets", color: "bg-emerald-50 border border-emerald-100/50",   icon: <SheetsIcon size={12} /> },
  drive:   { name: "Drive",  color: "bg-amber-50 border border-amber-100/50",  icon: <DriveIcon size={12} /> },
  camera:  { name: "Canva",  color: "bg-teal-50 border border-teal-100/50",    icon: <CanvaIcon size={12} /> },
  crm:     { name: "CRM",    color: "bg-orange-50 border border-orange-100/50",  icon: <HubSpotIcon size={12} /> },
  calendar:{ name: "Calendar", color: "bg-sky-50 border border-sky-100/50",  icon: <CalendarIcon size={12} /> },
}

// ─── Dummy Data: Automation Ideas ──────────────────────────────────────────────

const IDEAS: IdeaCard[] = [
  // NEGOCIOS
  {
    id: 1, category: "Negocios",
    title: "Encontrar nuevos clientes mientras duermo",
    subtitle: "Idea de automatización: Capturar leads de Meta Ads y enviarlos al CRM automáticamente",
    profession: "Para: Emprendedores & Startups",
    integrations: [INTEGRATIONS.meta, INTEGRATIONS.crm, INTEGRATIONS.gmail, INTEGRATIONS.whatsapp],
    complexity: "Intermedio", timeSaved: "8h/semana"
  },
  {
    id: 2, category: "Negocios",
    title: "Facturación automática post-compra",
    subtitle: "Genera y envía facturas PDF apenas se confirma el pago en Wompi o Stripe",
    profession: "Para: Tiendas virtuales & E-commerce",
    integrations: [INTEGRATIONS.wompi, INTEGRATIONS.stripe, INTEGRATIONS.gmail, INTEGRATIONS.notion],
    complexity: "Básico", timeSaved: "5h/semana"
  },
  {
    id: 3, category: "Negocios",
    title: "Seguimiento inteligente de propuestas",
    subtitle: "Envía recordatorios personalizados por WhatsApp cuando un cliente abre tu propuesta",
    profession: "Para: Agencias & Consultores",
    integrations: [INTEGRATIONS.notion, INTEGRATIONS.whatsapp, INTEGRATIONS.gmail, INTEGRATIONS.crm],
    complexity: "Avanzado", timeSaved: "12h/semana"
  },
  {
    id: 4, category: "Negocios",
    title: "Pipeline de ventas con IA para psicólogos",
    subtitle: "Gestiona citas, pagos y seguimiento de pacientes en un solo flujo automatizado",
    profession: "Para: Psicólogos & Terapeutas",
    integrations: [INTEGRATIONS.calendar, INTEGRATIONS.wompi, INTEGRATIONS.whatsapp, INTEGRATIONS.gmail],
    complexity: "Intermedio", timeSaved: "10h/semana"
  },
  {
    id: 5, category: "Negocios",
    title: "Reportes de obra automatizados",
    subtitle: "Ingenieros civiles reciben KPIs de avance de proyecto directo a su correo cada lunes",
    profession: "Para: Ingenieros Civiles",
    integrations: [INTEGRATIONS.sheets, INTEGRATIONS.gmail, INTEGRATIONS.drive, INTEGRATIONS.notion],
    complexity: "Avanzado", timeSaved: "15h/semana"
  },
  {
    id: 6, category: "Negocios",
    title: "Onboarding de clientes en piloto automático",
    subtitle: "Bienvenida, contratos y accesos enviados solos cuando alguien paga tu servicio",
    profession: "Para: SaaS & Agencias digitales",
    integrations: [INTEGRATIONS.stripe, INTEGRATIONS.gmail, INTEGRATIONS.notion, INTEGRATIONS.whatsapp],
    complexity: "Intermedio", timeSaved: "6h/semana"
  },
  // PRODUCTIVIDAD
  {
    id: 7, category: "Productividad",
    title: "Bandeja de entrada cero en 10 minutos",
    subtitle: "Clasifica, responde y archiva emails automáticamente con IA según reglas personalizadas",
    profession: "Para: Ejecutivos & Líderes",
    integrations: [INTEGRATIONS.gmail, INTEGRATIONS.notion, INTEGRATIONS.sheets, INTEGRATIONS.calendar],
    complexity: "Básico", timeSaved: "7h/semana"
  },
  {
    id: 8, category: "Productividad",
    title: "Meeting notes a tareas en segundos",
    subtitle: "Transcribe reuniones de Zoom y crea tasks en Notion automáticamente con IA",
    profession: "Para: Equipos remotos",
    integrations: [INTEGRATIONS.notion, INTEGRATIONS.gmail, INTEGRATIONS.calendar, INTEGRATIONS.drive],
    complexity: "Avanzado", timeSaved: "9h/semana"
  },
  {
    id: 9, category: "Productividad",
    title: "Gestor de tareas para creadores de contenido",
    subtitle: "Planifica, crea y publica en TikTok e Instagram desde un único workspace de Notion",
    profession: "Para: Creadores de contenido",
    integrations: [INTEGRATIONS.notion, INTEGRATIONS.tiktok, INTEGRATIONS.meta, INTEGRATIONS.camera],
    complexity: "Intermedio", timeSaved: "11h/semana"
  },
  // FINANZAS
  {
    id: 10, category: "Finanzas",
    title: "Control de gastos empresariales en tiempo real",
    subtitle: "Recibe alertas en WhatsApp si un gasto supera tu presupuesto mensual del negocio",
    profession: "Para: CFOs & Contadores",
    integrations: [INTEGRATIONS.stripe, INTEGRATIONS.wompi, INTEGRATIONS.whatsapp, INTEGRATIONS.sheets],
    complexity: "Intermedio", timeSaved: "8h/semana"
  },
  {
    id: 11, category: "Finanzas",
    title: "Cobro automático de suscripciones",
    subtitle: "Gestiona pagos recurrentes con Wompi y notifica a clientes sobre estados de pago",
    profession: "Para: Negocios con membresías",
    integrations: [INTEGRATIONS.wompi, INTEGRATIONS.stripe, INTEGRATIONS.gmail, INTEGRATIONS.notion],
    complexity: "Avanzado", timeSaved: "14h/semana"
  },
  {
    id: 12, category: "Finanzas",
    title: "Dashboard financiero inteligente",
    subtitle: "Consolida tus ingresos de múltiples fuentes en un tablero visual actualizado en tiempo real",
    profession: "Para: Emprendedores multi-proyecto",
    integrations: [INTEGRATIONS.sheets, INTEGRATIONS.stripe, INTEGRATIONS.wompi, INTEGRATIONS.drive],
    complexity: "Avanzado", timeSaved: "20h/semana"
  },
  // CREATIVO
  {
    id: 13, category: "Creativo",
    title: "Banco de ideas de contenido con IA",
    subtitle: "Genera 30 ideas de posts por semana basadas en tendencias de tu nicho y audiencia",
    profession: "Para: Artistas & Diseñadores",
    integrations: [INTEGRATIONS.notion, INTEGRATIONS.tiktok, INTEGRATIONS.meta, INTEGRATIONS.camera],
    complexity: "Básico", timeSaved: "5h/semana"
  },
  {
    id: 14, category: "Creativo",
    title: "Portafolio que vende solo en TikTok",
    subtitle: "Publica reels de tu proceso creativo de forma automática y capta leads directo a tu DM",
    profession: "Para: Fotógrafos & Videógrafos",
    integrations: [INTEGRATIONS.tiktok, INTEGRATIONS.meta, INTEGRATIONS.camera, INTEGRATIONS.whatsapp],
    complexity: "Intermedio", timeSaved: "9h/semana"
  },
  // EDUCACIÓN
  {
    id: 15, category: "Educación",
    title: "Aula virtual con seguimiento automático",
    subtitle: "Notifica a estudiantes sobre tareas, calificaciones y nuevas lecciones por WhatsApp",
    profession: "Para: Docentes & Tutores",
    integrations: [INTEGRATIONS.whatsapp, INTEGRATIONS.gmail, INTEGRATIONS.sheets, INTEGRATIONS.calendar],
    complexity: "Intermedio", timeSaved: "10h/semana"
  },
  {
    id: 16, category: "Educación",
    title: "Generador de exámenes con IA",
    subtitle: "Crea evaluaciones personalizadas desde tu banco de preguntas en Notion en segundos",
    profession: "Para: Universidades & Academias",
    integrations: [INTEGRATIONS.notion, INTEGRATIONS.gmail, INTEGRATIONS.drive, INTEGRATIONS.sheets],
    complexity: "Avanzado", timeSaved: "13h/semana"
  },
  // HOGAR
  {
    id: 17, category: "Hogar",
    title: "Gestión inteligente de servicios del hogar",
    subtitle: "Lleva el control de gastos del hogar, servicios y reparaciones en un tablero simple",
    profession: "Para: Familias organizadas",
    integrations: [INTEGRATIONS.sheets, INTEGRATIONS.whatsapp, INTEGRATIONS.gmail, INTEGRATIONS.calendar],
    complexity: "Básico", timeSaved: "3h/semana"
  },
  // VIAJES
  {
    id: 18, category: "Viajes",
    title: "Itinerario de viaje generado por IA",
    subtitle: "Planifica tu próximo viaje con un asistente que organiza vuelos, hoteles y actividades",
    profession: "Para: Agentes de viaje & Nómadas",
    integrations: [INTEGRATIONS.notion, INTEGRATIONS.gmail, INTEGRATIONS.calendar, INTEGRATIONS.whatsapp],
    complexity: "Intermedio", timeSaved: "6h/semana"
  },
]

// ─── Dummy Data: Templates ────────────────────────────────────────────────────

const KanbanPreview = () => (
  <div className="p-4 h-full flex gap-2">
    {["Leads", "Contactado", "Negociando", "Cerrado"].map((col, i) => (
      <div key={col} className="flex-1 flex flex-col gap-1.5">
        <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1">{col}</div>
        {Array.from({ length: i === 0 ? 3 : i === 1 ? 2 : i === 2 ? 2 : 1 }).map((_, j) => (
          <div key={j} className="bg-white dark:bg-zinc-900/50 rounded-md dark:border dark:border-white/5 p-2 shadow-sm border border-slate-100">
            <div className={`h-1.5 rounded-full mb-1.5 ${["bg-blue-400", "bg-violet-400", "bg-emerald-400", "bg-orange-400"][i]}`} style={{ width: `${60 + j * 20}%` }} />
            <div className="h-1 bg-slate-100 rounded-full w-4/5" />
          </div>
        ))}
      </div>
    ))}
  </div>
)

const StorePreview = () => (
  <div className="p-4 h-full">
    <div className="grid grid-cols-3 gap-2 h-full">
      {[
        { bg: "bg-rose-100", color: "bg-rose-400" },
        { bg: "bg-violet-100", color: "bg-violet-400" },
        { bg: "bg-amber-100", color: "bg-amber-400" },
        { bg: "bg-cyan-100", color: "bg-cyan-400" },
        { bg: "bg-emerald-100", color: "bg-emerald-400" },
        { bg: "bg-blue-100", color: "bg-blue-400" },
      ].map((item, i) => (
        <div key={i} className={`${item.bg} rounded-lg flex flex-col items-center justify-center gap-1 p-2`}>
          <div className={`w-8 h-8 ${item.color} rounded-md`} />
          <div className="h-1 bg-white/60 rounded-full w-10" />
          <div className="h-1 bg-white/40 rounded-full w-6" />
        </div>
      ))}
    </div>
  </div>
)

const HealthPreview = () => (
  <div className="p-4 h-full flex flex-col gap-2">
    <div className="flex gap-2 flex-1">
      <div className="flex-1 bg-emerald-50 rounded-lg flex flex-col items-center justify-center gap-1 border border-emerald-100">
        <Heart className="w-6 h-6 text-emerald-400" />
        <div className="text-[10px] font-bold text-emerald-600">Wellness</div>
      </div>
      <div className="flex-1 bg-blue-50 rounded-lg flex flex-col gap-1 p-2 border border-blue-100">
        {[80, 60, 90, 40, 70].map((h, i) => (
          <div key={i} className="flex gap-1 items-center">
            <div className="h-1.5 bg-blue-400 rounded-full" style={{ width: `${h}%` }} />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-violet-50 rounded-lg p-2 border border-violet-100 flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-violet-400 flex items-center justify-center">
        <Brain className="w-3 h-3 text-white" />
      </div>
      <div className="flex-1">
        <div className="h-1.5 bg-violet-300 rounded-full w-3/4" />
        <div className="h-1 bg-violet-200 rounded-full w-1/2 mt-1" />
      </div>
    </div>
  </div>
)

const RecruitPreview = () => (
  <div className="p-4 h-full flex flex-col gap-2">
    {[
      { name: "Ana García", role: "UX Designer", score: 94, color: "bg-blue-500" },
      { name: "Carlos Ruiz", role: "Dev Backend", score: 89, color: "bg-violet-500" },
      { name: "Mía Torres", role: "Product Mgr", score: 97, color: "bg-emerald-500" },
    ].map((c, i) => (
      <div key={i} className="flex items-center gap-2 bg-white dark:bg-zinc-900/50 rounded-lg dark:border dark:border-white/5 p-2 border border-slate-100 shadow-sm">
        <div className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center text-white text-[10px] font-black shrink-0`}>
          {c.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-black text-slate-700 dark:text-zinc-200 truncate">{c.name}</div>
          <div className="text-[9px] text-slate-400 dark:text-zinc-500">{c.role}</div>
        </div>
        <div className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${c.color} text-white`}>{c.score}%</div>
      </div>
    ))}
  </div>
)

const EduPreview = () => (
  <div className="p-4 h-full flex flex-col gap-2">
    <div className="flex gap-2">
      {["Módulo 1", "Módulo 2", "Módulo 3"].map((m, i) => (
        <div key={i} className={`flex-1 rounded-lg p-2 text-center text-[9px] font-black ${i === 0 ? "bg-orange-100 text-orange-600 border border-orange-200" : "bg-slate-100 text-slate-400 dark:text-zinc-500"}`}>
          {m}
        </div>
      ))}
    </div>
    <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 p-2 flex flex-col gap-1.5">
      {["Clase 01 — Introducción", "Clase 02 — Conceptos clave", "Clase 03 — Práctica avanzada"].map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <CheckCircle2 className={`w-3 h-3 shrink-0 ${i < 2 ? "text-emerald-400" : "text-slate-200"}`} />
          <div className="text-[9px] text-slate-500 dark:text-zinc-400 truncate">{c}</div>
        </div>
      ))}
    </div>
  </div>
)

const TEMPLATES: Template[] = [
  {
    id: 1,
    name: "AnyCRM — Real AI Powered CRM",
    description: "Pipeline de ventas completo con IA: scoring de leads, seguimiento automático y reportes en tiempo real.",
    category: "Marketing y ventas",
    users: 2847, rating: 4.9, price: 21,
    tags: ["CRM", "IA", "Ventas"],
    previewBg: "from-blue-50 to-indigo-50",
    previewContent: <KanbanPreview />,
    badge: "⚡ Más popular",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 2,
    name: "STORE APP — Tienda de Arte Digital",
    description: "Catálogo de productos artísticos con checkout integrado, gestión de inventario y marketing automático.",
    category: "E-commerce",
    users: 1293, rating: 4.8, price: 15,
    tags: ["E-commerce", "Arte", "Pagos"],
    previewBg: "from-rose-50 to-violet-50",
    previewContent: <StorePreview />,
    badge: "🎨 Trending",
    badgeColor: "bg-rose-100 text-rose-700"
  },
  {
    id: 3,
    name: "WellnessHub — Clínica y Bienestar",
    description: "Gestión integral para psicólogos, nutricionistas y coaches: citas, pagos, seguimiento y reportes.",
    category: "Salud y bienestar",
    users: 983, rating: 4.9, price: 29,
    tags: ["Salud", "Citas", "CRM"],
    previewBg: "from-emerald-50 to-teal-50",
    previewContent: <HealthPreview />,
    badge: "❤️ Nuevo",
    badgeColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: 4,
    name: "TalentFlow — Reclutamiento con IA",
    description: "Plataforma de RRHH que usa IA para calificar candidatos, automatizar entrevistas y generar reportes.",
    category: "Operaciones",
    users: 754, rating: 4.7, price: 35,
    tags: ["RRHH", "IA", "Reclutamiento"],
    previewBg: "from-violet-50 to-blue-50",
    previewContent: <RecruitPreview />,
    badge: "🤖 IA First",
    badgeColor: "bg-violet-100 text-violet-700"
  },
  {
    id: 5,
    name: "EduFlow — Academia en línea",
    description: "LMS completo para crear y vender cursos: módulos, estudiantes, certificados y pagos integrados.",
    category: "Educación",
    users: 1562, rating: 4.8, price: "Gratis",
    tags: ["Educación", "Cursos", "LMS"],
    previewBg: "from-orange-50 to-amber-50",
    previewContent: <EduPreview />,
    badge: "🎓 Gratis",
    badgeColor: "bg-orange-100 text-orange-700"
  },
  {
    id: 6,
    name: "BuildTrack — Gestión de Obras",
    description: "Para ingenieros civiles: seguimiento de avance de obra, presupuestos, proveedores y reportes automáticos.",
    category: "Operaciones",
    users: 428, rating: 4.6, price: 45,
    tags: ["Construcción", "Ingeniería", "Proyectos"],
    previewBg: "from-slate-50 to-zinc-100",
    previewContent: <KanbanPreview />,
    badge: "🏗️ Especializado",
    badgeColor: "bg-slate-200 text-slate-700 dark:text-zinc-200"
  },
]

// ─── Complexity Badge ──────────────────────────────────────────────────────────

const complexityConfig = {
  "Básico":     { color: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-400" },
  "Intermedio": { color: "bg-amber-100 text-amber-700 border-amber-200",       dot: "bg-amber-400" },
  "Avanzado":   { color: "bg-rose-100 text-rose-700 border-rose-200",          dot: "bg-rose-400" },
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────

const TEMPLATE_FILTERS = ["Todas", "Marketing y ventas", "Operaciones", "E-commerce", "Salud y bienestar", "Educación", "Finanzas"]
const CATEGORIES: Category[] = ["Negocios", "Productividad", "Finanzas", "Creativo", "Educación", "Hogar", "Viajes"]

const categoryIcons: Record<Category, React.ReactNode> = {
  Negocios:     <Building2 className="w-3.5 h-3.5" />,
  Productividad:<Zap className="w-3.5 h-3.5" />,
  Finanzas:     <DollarSign className="w-3.5 h-3.5" />,
  Creativo:     <Palette className="w-3.5 h-3.5" />,
  Educación:    <GraduationCap className="w-3.5 h-3.5" />,
  Hogar:        <Home className="w-3.5 h-3.5" />,
  Viajes:       <Plane className="w-3.5 h-3.5" />,
}

// ─── Component: Idea Card ─────────────────────────────────────────────────────

function IdeaCardComponent({ card }: { card: IdeaCard }) {
  const cfg = complexityConfig[card.complexity]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(99,102,241,0.05)" }}
      transition={{ duration: 0.25 }}
      className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-slate-100/90 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-indigo-150 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
    >
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {card.complexity}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="flex-1">
          <h3 className="font-black text-slate-800 dark:text-zinc-100 text-sm leading-snug mb-1.5 group-hover:text-indigo-700 transition-colors">
            {card.title}
          </h3>
          <p className="text-slate-400 dark:text-zinc-500 text-xs leading-relaxed">{card.subtitle}</p>
        </div>

        {/* Profession */}
        <p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">{card.profession}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          {/* Integrations */}
          <div className="flex items-center gap-1.5">
            {card.integrations.slice(0, 4).map((integ, i) => (
              <div
                key={i}
                title={integ.name}
                className={`w-6 h-6 rounded-lg ${integ.color} flex items-center justify-center shadow-sm`}
              >
                {integ.icon}
              </div>
            ))}
            {card.integrations.length > 4 && (
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 dark:text-zinc-500">
                +{card.integrations.length - 4}
              </div>
            )}
          </div>

          {/* Time saved */}
          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
            <Clock className="w-3 h-3" />
            {card.timeSaved}
          </div>
        </div>
      </div>

      {/* CTA on hover */}
      <div className="px-5 pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-indigo-600 transition-colors">
          Usar esta idea <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── Component: Template Card ─────────────────────────────────────────────────

function TemplateCardComponent({ template }: { template: Template }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Preview Area */}
      <div className={`h-44 bg-gradient-to-br ${template.previewBg} relative overflow-hidden`}>
        {template.previewContent}
        {/* Badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full ${template.badgeColor} backdrop-blur-sm shadow-sm`}>
          {template.badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-black text-slate-800 dark:text-zinc-100 text-sm leading-tight mb-1 group-hover:text-indigo-700 transition-colors">
            {template.name}
          </h3>
          <p className="text-slate-400 dark:text-zinc-500 text-xs leading-relaxed line-clamp-2">{template.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {template.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 dark:text-zinc-400 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
              <Users className="w-3 h-3" />
              <span className="font-black text-slate-600 dark:text-zinc-300">{template.users.toLocaleString()}</span> usuarios
            </div>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-3 h-3 ${s <= Math.floor(template.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
              <span className="text-[10px] font-black text-amber-600 ml-1">{template.rating}</span>
            </div>
          </div>

          <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide transition-all shadow-sm hover:shadow-md ${
            template.price === "Gratis"
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-slate-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-indigo-700"
          }`}>
            <ShoppingCart className="w-3 h-3" />
            {template.price === "Gratis" ? "Gratis" : `$${template.price}`}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function AutomationExplorer() {
  const [activeCategory, setActiveCategory] = useState<Category>("Negocios")
  const [templateFilter, setTemplateFilter] = useState("Todas")
  const [searchTemplates, setSearchTemplates] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const filteredIdeas = IDEAS.filter(idea => idea.category === activeCategory)

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesFilter = templateFilter === "Todas" || t.category === templateFilter
    const matchesSearch = t.name.toLowerCase().includes(searchTemplates.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTemplates.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/40 via-slate-50 to-white text-slate-700 dark:text-zinc-200 transition-all duration-300">

      {/* ─── SECTION 1: AUTOMATION IDEAS EXPLORER ─────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-16 py-14">

        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-100/50 backdrop-blur-md rounded-full px-4 py-1.5 text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Explorador de ideas
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight leading-tight mb-3">
            O comienza con una de estas ideas:
          </h2>
          <p className="text-slate-400 dark:text-zinc-500 text-sm max-w-lg mx-auto">
            Descubre automatizaciones reales adaptadas a tu industria. Ahorra horas cada semana.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-1 mb-10 bg-white/60 dark:bg-zinc-950/20 backdrop-blur-md p-1.5 rounded-3xl border border-slate-200/40 max-w-3xl mx-auto shadow-sm">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "text-white shadow-md shadow-slate-900/10"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:text-zinc-200 hover:bg-slate-200/40"
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {categoryIcons[cat]}
                {cat}
              </span>
              {activeCategory === cat && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-2xl bg-slate-900 z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span><span className="font-black text-slate-600 dark:text-zinc-300">{filteredIdeas.length}</span> ideas disponibles</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
            <Repeat className="w-3.5 h-3.5 text-emerald-400" />
            <span>Listas para activar</span>
          </div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredIdeas.map(card => (
              <IdeaCardComponent key={card.id} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* "View all" CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-[12px] font-black text-slate-500 dark:text-zinc-400 hover:text-indigo-600 transition-colors group">
            Ver todas las ideas de automatización
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-10 lg:mx-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* ─── SECTION 2: TEMPLATES MARKETPLACE ────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-16 py-14">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 text-[11px] font-black text-violet-600 uppercase tracking-widest mb-4">
              <Package className="w-3.5 h-3.5" /> Marketplace
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight leading-tight">
              Plantillas de Workspaces
            </h2>
            <p className="text-slate-400 dark:text-zinc-500 text-sm mt-2">
              Workspaces listos para usar. Instala en segundos, personaliza en minutos.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative flex-shrink-0 w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="Buscar plantillas..."
              value={searchTemplates}
              onChange={e => setSearchTemplates(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-700 dark:text-zinc-200 placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            {searchTemplates && (
              <button
                onClick={() => setSearchTemplates("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 dark:text-zinc-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills Carousel */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 dark:text-zinc-500 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </div>
          {TEMPLATE_FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setTemplateFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-black transition-all duration-300 ${
                templateFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950 shadow-md"
                  : "bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400 hover:border-slate-300 hover:text-slate-700 dark:text-zinc-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={templateFilter + searchTemplates}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => (
                <TemplateCardComponent key={template.id} template={template} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400 dark:text-zinc-500"
              >
                <Package className="w-12 h-12 mb-4 text-slate-200" />
                <p className="font-black text-slate-500 dark:text-zinc-400 mb-1">Sin resultados</p>
                <p className="text-sm">Intenta con otro filtro o término de búsqueda</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-br from-indigo-50 via-violet-50 to-cyan-50 border border-indigo-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-zinc-100 mb-1">¿No encuentras lo que buscas?</h3>
            <p className="text-slate-400 dark:text-zinc-500 text-sm">Nuestro equipo construye plantillas personalizadas para tu industria específica.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="px-6 py-3 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/10 rounded-xl text-[12px] font-black text-slate-600 dark:text-zinc-300 hover:border-slate-300 transition-all shadow-sm hover:shadow-md">
              Ver catálogo completo
            </button>
            <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl text-[12px] font-black hover:bg-indigo-700 transition-all shadow-lg shadow-slate-900/20">
              Solicitar plantilla <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AutomationExplorer
