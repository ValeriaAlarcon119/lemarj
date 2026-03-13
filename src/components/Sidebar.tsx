import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { 
  LayoutDashboard
} from "lucide-react"

const menuItems = [
  { id: 'home', label: 'Inicio', emoji: "🏠", href: '#', color: "bg-blue-500/20 text-blue-500" },
  { id: 'pilares', label: 'Ingeniería', emoji: "⚙️", href: '#pilares', color: "bg-indigo-500/20 text-indigo-500" },
  { id: 'demo', label: 'WhatsApp', emoji: "📱", href: '#demo', color: "bg-emerald-500/20 text-emerald-500" },
  { id: 'news', label: 'Impulso', emoji: "🚀", href: '#news', color: "bg-orange-500/20 text-orange-500" },
  { id: 'offer', label: 'Oferta', emoji: "🎁", href: '#offer', color: "bg-purple-500/20 text-purple-500" },
  { id: 'support', label: 'Soporte', emoji: "💬", href: 'https://wa.me/573017219288', color: "bg-pink-500/20 text-pink-500" },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={false}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      animate={{ 
        width: isExpanded ? 220 : 70,
      }}
      className="fixed left-0 top-0 bottom-0 z-[60] bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-r border-border/50 hidden lg:flex flex-col py-6 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl"
    >
      {/* ClickUp Style Header */}
      <div className="px-4 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col"
            >
              <span className="font-black tracking-tighter text-foreground leading-none">LEMARJ</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-3">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-all group relative"
          >
            <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-xl ${item.color} shadow-inner group-hover:scale-110 transition-transform text-lg`}>
              {item.emoji}
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-sm text-foreground/70 group-hover:text-foreground whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        ))}
      </nav>

      {/* Footer info showing session */}
      <div className="px-3 mt-auto">
        <div className={`p-4 rounded-3xl bg-primary/5 border border-primary/10 transition-all ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Sesión 2026</span>
            <span className="text-xs font-bold text-foreground">Ventas Activas</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
