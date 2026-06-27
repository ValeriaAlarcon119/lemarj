"use client";
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, ChevronDown, ChevronRight, Shield, Megaphone, Plug,
  LayoutGrid, List, Globe, CreditCard, Database, Mail, Code2,
  Users, Briefcase, LineChart, MessageCircle, ShoppingCart, Cpu,
  BarChart3, FileText, Settings2, BookOpen, ExternalLink, CheckCircle2,
  AlertCircle, Zap, X, Play, Copy, Check, GitBranch, Lock, Star,
  ArrowRight, Sparkles, Terminal, Eye, EyeOff, RefreshCw, Cloud
} from "lucide-react"
import {
  MetaIcon, NotionIcon, TikTokIcon, StripeIcon, WompiIcon,
  GmailIcon, SheetsIcon, GitHubIcon, OpenAIIcon, HubSpotIcon, SupabaseIcon, WhatsAppIcon
} from "../BrandIcons"
import { useLanguage } from "@/contexts/I18nContext"
import { OnboardingTour } from "@/components/OnboardingTour"

// ─── Types ────────────────────────────────────────────────────────────────────

type SidebarSection = "seguridad-resumen" | "seguridad-acceso" | "social" |
  "conectores-resumen" | "catalogo" | "integraciones"

interface Connector {
  id: string
  name: string
  description: string
  category: string
  color: string
  bgColor: string
  icon: React.ReactNode
  status: "Activo" | "Beta" | "Próximamente"
  statusColor: string
  docs?: string
}

interface CategoryCard {
  id: string
  name: string
  icon: React.ReactNode
  apps: string[]
  color: string
  bgColor: string
  count: number
}

interface ChatMessage {
  type: "ai" | "user" | "code" | "action"
  content: string
  timestamp?: string
}

// ─── Connector Data ───────────────────────────────────────────────────────────

const CONNECTORS: Connector[] = [
  {
    id: "meta", name: "Meta Business", category: "Marketing",
    description: "Sincroniza leads de Facebook Ads e Instagram directamente a tu CRM con IA de clasificación.",
    color: "text-blue-600", bgColor: "bg-blue-50/80 border border-blue-100/40",
    icon: <MetaIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "tiktok", name: "TikTok Business", category: "Social",
    description: "Captura leads de TikTok Ads y automatiza seguimiento con mensajes personalizados.",
    color: "text-slate-900 dark:text-white", bgColor: "bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/40",
    icon: <TikTokIcon size={20} className="text-black dark:text-white" />,
    status: "Beta", statusColor: "bg-amber-100 text-amber-700"
  },
  {
    id: "stripe", name: "Stripe", category: "Finanzas",
    description: "Procesa pagos, suscripciones y webhooks de eventos para automatizar cobros y reportes.",
    color: "text-violet-600", bgColor: "bg-violet-50/80 border border-violet-100/40",
    icon: <StripeIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "wompi", name: "Wompi", category: "Finanzas",
    description: "Pasarela de pagos colombiana. Recibe pagos en COP con tarjeta, Nequi y PSE.",
    color: "text-emerald-600", bgColor: "bg-purple-50/80 border border-purple-100/40",
    icon: <WompiIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "notion", name: "Notion", category: "Productividad",
    description: "Usa Notion como base de datos y CMS. Sincroniza tareas, proyectos y documentos.",
    color: "text-slate-700 dark:text-zinc-200", bgColor: "bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10/40",
    icon: <NotionIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "github", name: "GitHub", category: "Desarrollo",
    description: "Automatiza deployments, PR reviews y notificaciones de repositorios de tu equipo.",
    color: "text-slate-900 dark:text-white", bgColor: "bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/40",
    icon: <GitHubIcon size={20} />,
    status: "Beta", statusColor: "bg-amber-100 text-amber-700"
  },
  {
    id: "gmail", name: "Gmail / Google", category: "Comunicación",
    description: "Lee, clasifica y responde emails con IA. Integra con Calendar, Sheets y Drive.",
    color: "text-red-500", bgColor: "bg-rose-50/80 border border-rose-100/40",
    icon: <GmailIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "whatsapp", name: "WhatsApp Business", category: "Comunicación",
    description: "Envía mensajes automatizados, campañas y flujos de atención al cliente 24/7.",
    color: "text-green-600", bgColor: "bg-green-50/80 border border-green-100/40",
    icon: <WhatsAppIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "openai", name: "OpenAI / GPT", category: "IA",
    description: "Integra modelos GPT-4 para análisis, clasificación y generación de contenido inteligente.",
    color: "text-slate-700 dark:text-zinc-200", bgColor: "bg-teal-50/80 border border-teal-100/40",
    icon: <OpenAIIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "hubspot", name: "HubSpot CRM", category: "CRM",
    description: "Sincroniza contactos, deals y actividades de ventas bidireccional en tiempo real.",
    color: "text-orange-500", bgColor: "bg-orange-50/80 border border-orange-100/40",
    icon: <HubSpotIcon size={20} />,
    status: "Próximamente", statusColor: "bg-slate-100 text-slate-500 dark:text-zinc-400"
  },
  {
    id: "sheets", name: "Google Sheets", category: "Datos",
    description: "Lee y escribe en hojas de cálculo. Ideal para reportes automáticos y dashboards.",
    color: "text-green-600", bgColor: "bg-emerald-50/80 border border-emerald-100/40",
    icon: <SheetsIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "supabase", name: "Supabase", category: "Base de datos",
    description: "Base de datos PostgreSQL en tiempo real con autenticación y storage integrados.",
    color: "text-emerald-600", bgColor: "bg-emerald-50/80 border border-emerald-100/40",
    icon: <SupabaseIcon size={20} />,
    status: "Activo", statusColor: "bg-emerald-100 text-emerald-700"
  },
]

const CATEGORIES: CategoryCard[] = [
  { id: "crm", name: "CRM & Ventas", icon: <Briefcase className="w-5 h-5" />, apps: ["HubSpot", "Salesforce", "Pipedrive"], color: "text-blue-600", bgColor: "bg-blue-50 border-blue-100", count: 8 },
  { id: "finanzas", name: "Finanzas", icon: <LineChart className="w-5 h-5" />, apps: ["Wompi", "Stripe", "PayU"], color: "text-emerald-600", bgColor: "bg-emerald-50 border-emerald-100", count: 6 },
  { id: "social", name: "Redes Sociales", icon: <Globe className="w-5 h-5" />, apps: ["LinkedIn", "TikTok", "Meta"], color: "text-violet-600", bgColor: "bg-violet-50 border-violet-100", count: 9 },
  { id: "productividad", name: "Productividad", icon: <Zap className="w-5 h-5" />, apps: ["Notion", "Trello", "Asana"], color: "text-orange-500", bgColor: "bg-orange-50 border-orange-100", count: 12 },
  { id: "ia", name: "Inteligencia Artificial", icon: <Cpu className="w-5 h-5" />, apps: ["OpenAI", "Anthropic", "Gemini"], color: "text-slate-700 dark:text-zinc-200", bgColor: "bg-slate-50 border-slate-200", count: 5 },
  { id: "comunicacion", name: "Comunicación", icon: <MessageCircle className="w-5 h-5" />, apps: ["WhatsApp", "Gmail", "Slack"], color: "text-green-600", bgColor: "bg-green-50 border-green-100", count: 7 },
  { id: "datos", name: "Datos & Analytics", icon: <BarChart3 className="w-5 h-5" />, apps: ["Sheets", "BigQuery", "Metabase"], color: "text-cyan-600", bgColor: "bg-cyan-50 border-cyan-100", count: 10 },
  { id: "dev", name: "Desarrollo", icon: <Code2 className="w-5 h-5" />, apps: ["GitHub", "GitLab", "Jira"], color: "text-rose-500", bgColor: "bg-rose-50 border-rose-100", count: 6 },
]

// ─── Simulated Chat Messages ──────────────────────────────────────────────────

const CHAT_MESSAGES: ChatMessage[] = [
  { type: "user", content: "Quiero conectar Stripe a mi workspace de LEMARJ", timestamp: "14:32" },
  { type: "ai", content: "Perfecto. Voy a configurar la conexión con Stripe para tu workspace. Necesito verificar los permisos requeridos.", timestamp: "14:32" },
  { type: "code", content: `// Conectando a Stripe...
{
  "connector": "stripe",
  "permissions": [
    "read:customers",
    "write:charges", 
    "read:subscriptions",
    "webhook:events"
  ],
  "environment": "production"
}`, timestamp: "14:33" },
  { type: "ai", content: "He preparado la conexión. Los permisos listados son los mínimos necesarios para procesar pagos y gestionar suscripciones. ¿Confirmas?", timestamp: "14:33" },
]

// ─── Sidebar Items Data ───────────────────────────────────────────────────────

const sidebarSections = [
  {
    id: "seguridad",
    label: "Asegurando tu aplicación",
    icon: <Shield className="w-4 h-4" />,
    items: [
      { id: "seguridad-resumen" as SidebarSection, label: "Resumen" },
      { id: "seguridad-acceso" as SidebarSection, label: "Acceso y roles" },
    ]
  },
  {
    id: "marketing",
    label: "Promocionando tu app",
    icon: <Megaphone className="w-4 h-4" />,
    items: [
      { id: "social" as SidebarSection, label: "Contenido social" },
    ]
  },
  {
    id: "conectores",
    label: "Conectores",
    icon: <Plug className="w-4 h-4" />,
    items: [
      { id: "conectores-resumen" as SidebarSection, label: "Resumen de los conectores" },
      { id: "catalogo" as SidebarSection, label: "Catálogo de conectores" },
      { id: "integraciones" as SidebarSection, label: "Integraciones" },
    ]
  }
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConnectorCard({ connector, viewMode }: { connector: Connector; viewMode: "grid" | "list" }) {
  const [hovering, setHovering] = useState(false)

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all group cursor-pointer"
      >
        <div className={`w-10 h-10 rounded-xl ${connector.bgColor} border flex items-center justify-center shrink-0 ${connector.color}`}>
          {connector.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-black text-slate-800 dark:text-zinc-100 text-sm">{connector.name}</span>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${connector.statusColor}`}>
              {connector.status}
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-zinc-500 truncate">{connector.description}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 bg-slate-100 px-2 py-1 rounded-lg">{connector.category}</span>
          <button className="p-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-indigo-600 transition-colors">
            <Plug className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden hover:-translate-y-1"
    >
      {/* CONECTOR badge */}
      <div className="absolute top-3 right-3">
        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 uppercase tracking-widest">
          CONECTOR
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-xl ${connector.bgColor} border flex items-center justify-center ${connector.color} group-hover:scale-110 transition-transform duration-300`}>
          {connector.icon}
        </div>
        <div>
          <div className="font-black text-slate-800 dark:text-zinc-100 text-sm leading-tight">{connector.name}</div>
          <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">{connector.category}</div>
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-zinc-500 leading-relaxed mb-4 line-clamp-2">{connector.description}</p>

      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${connector.statusColor}`}>
          {connector.status}
        </span>
        <motion.button
          animate={{ scale: hovering ? 1 : 0.9, opacity: hovering ? 1 : 0 }}
          className="flex items-center gap-1.5 text-[10px] font-black bg-slate-900 dark:bg-white text-white dark:text-zinc-950 px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Conectar <ArrowRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function CategoryCardComponent({ card }: { card: CategoryCard }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-white/5 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className={`w-10 h-10 rounded-xl ${card.bgColor} border flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
        {card.icon}
      </div>
      <div className="font-black text-slate-800 dark:text-zinc-100 text-sm mb-1.5">{card.name}</div>
      <div className="text-[11px] text-slate-400 dark:text-zinc-500 mb-3">{card.apps.join(", ")} y más</div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500">{card.count} apps</span>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 dark:text-zinc-300 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  )
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (msg.type === "code") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Configuración</span>
          </div>
          <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-500 hover:text-white transition-colors">
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <pre className="p-4 text-[11px] text-emerald-400 font-mono leading-relaxed overflow-x-auto">
          {msg.content}
        </pre>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2.5 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      {msg.type === "ai" && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
        msg.type === "user"
          ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950 rounded-tr-sm"
          : "bg-slate-100 text-slate-700 dark:text-zinc-200 rounded-tl-sm"
      }`}>
        {msg.content}
        {msg.timestamp && (
          <div className={`text-[9px] mt-1 ${msg.type === "user" ? "text-slate-400 dark:text-zinc-500" : "text-slate-400 dark:text-zinc-500"}`}>
            {msg.timestamp}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Views ───────────────────────────────────────────────────────────────

function ConnectorCatalog() {
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filters = ["Todos", "Activo", "Beta", "Próximamente"]

  const filtered = CONNECTORS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === "Todos" || c.status === activeFilter
    return matchSearch && matchFilter
  })

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
          <Plug className="w-3 h-3" /> Catálogo de conectores
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mb-1">Integraciones disponibles</h2>
        <p className="text-slate-400 dark:text-zinc-500 text-sm">Conecta tus herramientas favoritas en segundos. Más de {CONNECTORS.length} conectores activos.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div id="tour-search" className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="Buscar conector..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-700 dark:text-zinc-200 placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-2 rounded-xl text-[11px] font-black transition-all ${activeFilter === f ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-zinc-400 hover:border-slate-300"}`}>
              {f}
            </button>
          ))}
          <div className="h-full w-px bg-slate-200 dark:bg-slate-800 mx-1" />
          <button onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-zinc-500"}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode("list")}
            className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-zinc-500"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid / List */}
      <div className={viewMode === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pb-4"
        : "flex flex-col gap-3 overflow-y-auto custom-scrollbar pb-4"
      }>
        {filtered.map(c => (
          <ConnectorCard key={c.id} connector={c} viewMode={viewMode} />
        ))}
      </div>
    </div>
  )
}

function CategoryExplorer() {
  return (
    <div id="tour-categories" className="h-full flex flex-col gap-6">
      <div>
        <div className="inline-flex items-center gap-1.5 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
          <LayoutGrid className="w-3 h-3" /> Por categoría
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mb-1">Explorador por categoría</h2>
        <p className="text-slate-400 dark:text-zinc-500 text-sm">Encuentra las herramientas correctas para cada área de tu negocio.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pb-4">
        {CATEGORIES.map(cat => (
          <CategoryCardComponent key={cat.id} card={cat} />
        ))}
      </div>
    </div>
  )
}

function IntegrationsPanel({ onOpenSplit }: { onOpenSplit: () => void }) {
  const active = CONNECTORS.filter(c => c.status === "Activo")

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            <CheckCircle2 className="w-3 h-3" /> Integraciones activas
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mb-1">Mis integraciones</h2>
          <p className="text-slate-400 dark:text-zinc-500 text-sm">Gestiona y configura tus conexiones activas.</p>
        </div>
        <button
          onClick={onOpenSplit}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
        >
          <Zap className="w-4 h-4" /> Configurar con IA
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pb-4">
        {active.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-2xl p-5 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${c.bgColor} border flex items-center justify-center ${c.color} shrink-0`}>
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-slate-800 dark:text-zinc-100 text-sm">{c.name}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Conectado
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-zinc-500 truncate">{c.description}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 transition-colors" title="Configurar">
                  <Settings2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 transition-colors" title="Docs">
                  <BookOpen className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenSplit}
                  className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 hover:bg-indigo-100 transition-colors" title="Asistente IA">
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
                <RefreshCw className="w-3 h-3 text-emerald-400" />
                <span>Último sync: hace 2 min</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
                <Cloud className="w-3 h-3 text-blue-400" />
                <span>API v3 · Latencia: 42ms</span>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{c.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SecurityView() {
  const [showKey, setShowKey] = useState(false)
  return (
    <div id="tour-security" className="h-full flex flex-col gap-6">
      <div>
        <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
          <Shield className="w-3 h-3" /> Seguridad
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mb-1">Asegurando tu aplicación</h2>
        <p className="text-slate-400 dark:text-zinc-500 text-sm">Gestiona roles, permisos y credenciales de forma segura.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600"><Lock className="w-4 h-4" /></div>
            <div>
              <div className="font-black text-slate-800 dark:text-zinc-100 text-sm">API Key del workspace</div>
              <div className="text-[11px] text-slate-400 dark:text-zinc-500">Acceso de solo lectura</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2">
            <code className="flex-1 text-[11px] text-slate-600 dark:text-zinc-300 font-mono">
              {showKey ? "lmj_sk_live_9Xa3kP...8mQnR7" : "lmj_sk_live_••••••••••••••••••"}
            </code>
            <button onClick={() => setShowKey(!showKey)} className="text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:text-zinc-300">
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600"><Users className="w-4 h-4" /></div>
            <div>
              <div className="font-black text-slate-800 dark:text-zinc-100 text-sm">Roles y permisos</div>
              <div className="text-[11px] text-slate-400 dark:text-zinc-500">3 roles configurados</div>
            </div>
          </div>
          {[
            { role: "Admin", perms: "Full access", color: "bg-rose-100 text-rose-700" },
            { role: "Editor", perms: "Read + Write", color: "bg-amber-100 text-amber-700" },
            { role: "Viewer", perms: "Read only", color: "bg-slate-100 text-slate-600 dark:text-zinc-300" },
          ].map(r => (
            <div key={r.role} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
              <span className="text-sm font-black text-slate-700 dark:text-zinc-200">{r.role}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${r.color}`}>{r.perms}</span>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-2xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-black text-amber-700 dark:text-amber-500 text-sm mb-1">Recomendación de seguridad</div>
            <p className="text-amber-600 dark:text-amber-400 text-xs leading-relaxed">
              Habilita autenticación de dos factores (2FA) para todos los miembros con rol Admin. Esto reduce el riesgo de acceso no autorizado en un 99.9%.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialView() {
  const posts = [
    { platform: "TikTok", status: "Publicado", reach: "12.4K", engagement: "8.2%", color: "text-slate-900 dark:text-white bg-slate-50 border-slate-200 dark:border-slate-800" },
    { platform: "Meta", status: "Programado", reach: "—", engagement: "—", color: "text-blue-600 bg-blue-50 border-blue-100 dark:border-slate-800" },
    { platform: "LinkedIn", status: "Borrador", reach: "—", engagement: "—", color: "text-blue-700 bg-blue-50 border-blue-100 dark:border-slate-800" },
  ]
  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
          <Megaphone className="w-3 h-3" /> Social media
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mb-1">Contenido social</h2>
        <p className="text-slate-400 dark:text-zinc-500 text-sm">Gestiona y programa publicaciones en todas tus redes desde un solo lugar.</p>
      </div>
      <div className="flex flex-col gap-3">
        {posts.map(p => (
          <div key={p.platform} className={`flex items-center gap-4 p-4 border rounded-2xl dark:bg-slate-900/40 ${p.color}`}>
            <Globe className="w-8 h-8" />
            <div className="flex-1">
              <div className="font-black text-sm">{p.platform}</div>
              <div className="text-xs opacity-60">Último post · Campaña Q2 2026</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black">{p.reach}</div>
              <div className="text-[10px] opacity-60">{p.engagement}</div>
            </div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
              p.status === "Publicado" ? "bg-emerald-100 text-emerald-700" :
              p.status === "Programado" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500 dark:text-zinc-400"
            }`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Split Pane ───────────────────────────────────────────────────────────────

function SplitPane({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES)
  const [input, setInput] = useState("")
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      setMessages(prev => [...prev, {
        type: "ai",
        content: "✅ ¡Stripe conectado correctamente! Ya puedes recibir pagos y gestionar suscripciones desde LEMARJ.",
        timestamp: "14:34"
      }])
    }, 2000)
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { type: "user", content: input, timestamp: "Ahora" }])
    setInput("")
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "ai",
        content: "Entendido. Procesando tu solicitud con los conectores disponibles...",
        timestamp: "Ahora"
      }])
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-5xl h-[85vh] bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-black text-slate-800 dark:text-zinc-100 text-sm">Asistente de Integraciones IA</div>
              <div className="text-[10px] text-slate-400 dark:text-zinc-500">Configuración guiada · LEMARJ</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              IA Activa
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split body */}
        <div className="flex flex-1 overflow-hidden">

          {/* LEFT: AI Chat */}
          <div className="flex flex-col w-full md:w-1/2 border-r border-slate-100 dark:border-slate-800">
            <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
              <div className="text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> Asistente IA
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} />
              ))}

              {/* Action Buttons */}
              {!connected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
                >
                  <div className="text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-3">Permisos solicitados</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["read:customers", "write:charges", "read:subscriptions"].map(p => (
                      <span key={p} className="text-[10px] font-mono bg-slate-900 text-emerald-400 px-2 py-0.5 rounded-md">{p}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleConnect}
                      disabled={connecting}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-black rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-60"
                    >
                      {connecting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                      {connecting ? "Conectando..." : "Conectar a Stripe"}
                    </button>
                    <button className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-zinc-300 text-[11px] font-black rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                      Rechazar
                    </button>
                  </div>
                </motion.div>
              )}

              {connected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl p-4 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  <div>
                    <div className="font-black text-emerald-700 dark:text-emerald-400 text-sm">Stripe conectado</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-500">Listo para procesar pagos</div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-700 dark:text-zinc-200 placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl hover:bg-indigo-700 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Preview */}
          <div className="hidden md:flex flex-col w-1/2">
            <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
              <div className="text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Vista previa del proyecto
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4 bg-slate-50/30 dark:bg-slate-950/20">
              {/* Preview card */}
              <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-slate-800 dark:text-zinc-100 text-sm">Stripe · Catálogo de Pagos</div>
                    <div className="text-[11px] text-slate-400 dark:text-zinc-500">Vista previa de integración</div>
                  </div>
                  {connected && (
                    <span className="ml-auto text-[10px] font-black px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
                    </span>
                  )}
                </div>

                {/* Mock dashboard */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Ingresos hoy", value: "$1,847", up: true },
                    { label: "Transacciones", value: "34", up: true },
                    { label: "Tasa de éxito", value: "99.1%", up: false },
                  ].map(stat => (
                    <div key={stat.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="text-[9px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="font-black text-slate-800 dark:text-zinc-100 text-sm">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mock transactions */}
                <div className="space-y-2">
                  {[
                    { name: "Ana M.", amount: "+$89.00", type: "Suscripción" },
                    { name: "Carlos R.", amount: "+$21.00", type: "Plantilla" },
                    { name: "María T.", amount: "+$35.00", type: "Pro Plan" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-600 shrink-0">
                        {tx.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-black text-slate-700 dark:text-zinc-200">{tx.name}</div>
                        <div className="text-[9px] text-slate-400 dark:text-zinc-500">{tx.type}</div>
                      </div>
                      <div className="text-[11px] font-black text-emerald-600">{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration endpoints */}
              <div className="bg-slate-900 rounded-2xl p-5 flex-1">
                <div className="text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Code2 className="w-3 h-3" /> Webhook endpoint activo
                </div>
                <pre className="text-[11px] text-emerald-400 font-mono leading-relaxed">
{`POST /api/webhooks/stripe
→ charge.succeeded ✓
→ customer.created ✓  
→ invoice.paid ✓
→ subscription.updated ✓`}
                </pre>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-mono">Escuchando eventos · 0 errores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function EcosystemView() {
  const [activeSection, setActiveSection] = useState<SidebarSection>("catalogo")
  const [showSplit, setShowSplit] = useState(false)

  const renderMainContent = () => {
    switch (activeSection) {
      case "catalogo":          return <ConnectorCatalog />
      case "conectores-resumen": return <CategoryExplorer />
      case "integraciones":      return <IntegrationsPanel onOpenSplit={() => setShowSplit(true)} />
      case "seguridad-resumen":
      case "seguridad-acceso":   return <SecurityView />
      case "social":             return <SocialView />
      default:                   return <ConnectorCatalog />
    }
  }

  const tabs = [
    { id: "catalogo" as SidebarSection, label: "Catálogo", icon: <Plug className="w-3.5 h-3.5" /> },
    { id: "conectores-resumen" as SidebarSection, label: "Categorías", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: "integraciones" as SidebarSection, label: "Mis Conexiones", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: "social" as SidebarSection, label: "Contenido Social", icon: <Megaphone className="w-3.5 h-3.5" /> },
    { id: "seguridad-resumen" as SidebarSection, label: "Seguridad", icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "seguridad-acceso" as SidebarSection, label: "Acceso & Roles", icon: <Users className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/30 via-slate-50 to-white text-slate-700 dark:text-zinc-200 transition-all duration-300">
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-20 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-slate-100/50 dark:border-white/10 px-6 py-4 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8.5 h-8.5 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                <Plug className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h1 className="font-black text-slate-800 dark:text-zinc-100 text-sm leading-tight">Ecosistema</h1>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">Automatizaciones & Conectores</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Pro Badge */}
              <div className="hidden sm:flex items-center gap-1.5 bg-indigo-50/80 border border-indigo-100/50 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-black text-indigo-600">
                <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" /> Plan Pro Activo
              </div>
              <button
                onClick={() => setShowSplit(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-black rounded-xl hover:shadow-lg hover:shadow-indigo-200/50 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" /> Configurar con IA
              </button>
            </div>
          </div>

          {/* Horizontal Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 pt-1 -mx-2 px-2">
            {tabs.map(tab => {
              const isActive = activeSection === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? "text-orange-600 shadow-sm shadow-orange-500/5"
                      : "text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:text-zinc-200 hover:bg-slate-200/30"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.icon}
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="ecosystem-tab-indicator"
                      className="absolute inset-0 rounded-xl bg-orange-50 border border-orange-100/50 z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ─── SPLIT PANE MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSplit && <SplitPane onClose={() => setShowSplit(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default EcosystemView
