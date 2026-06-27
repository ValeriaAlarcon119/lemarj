"use client";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { 
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Sparkles,
  Plug
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/lib/auth"
import { useLanguage } from "@/contexts/I18nContext"

interface SidebarProps {
  profile: Profile | null
  onTabChange: (tab: string) => void
  activeTab: string
}

interface MenuItem {
  id: string
  labelKey: string
  emoji: string
  color: string
  href?: string
}

const clientItems: MenuItem[] = [
  { id: 'dashboard', labelKey: 'sidebar.dashboard', emoji: "📊", color: "bg-indigo-500/20 text-indigo-500" },
  { id: 'catalogo', labelKey: 'sidebar.catalog', emoji: "📄", color: "bg-blue-500/20 text-blue-500" },
  { id: 'automation', labelKey: 'sidebar.explorer', emoji: "⚡", color: "bg-violet-500/20 text-violet-500" },
  { id: 'ecosystem', labelKey: 'sidebar.ecosystem', emoji: "🔌", color: "bg-orange-500/20 text-orange-500" },
  { id: 'chat', labelKey: 'sidebar.chat', emoji: "🤖", color: "bg-emerald-500/20 text-emerald-500" },
  { id: 'support', labelKey: 'sidebar.support', emoji: "💬", color: "bg-pink-500/20 text-pink-500" },
]

const adminItems: MenuItem[] = [
  { id: 'admin-overview', labelKey: 'sidebar.adminOverview', emoji: "🏢", color: "bg-purple-500/20 text-purple-500" },
  { id: 'admin-clients', labelKey: 'sidebar.adminClients', emoji: "👥", color: "bg-indigo-500/20 text-indigo-500" },
  { id: 'admin-logs', labelKey: 'sidebar.adminLogs', emoji: "📋", color: "bg-amber-500/20 text-amber-500" },
  { id: 'admin-settings', labelKey: 'sidebar.adminSettings', emoji: "⚙️", color: "bg-zinc-500/20 text-zinc-500" },
]

const homeItems: MenuItem[] = [
  { id: 'home', labelKey: 'sidebar.home', emoji: "🏠", href: '#', color: "bg-blue-500/20 text-blue-500" },
  { id: 'pilares', labelKey: 'sidebar.engineering', emoji: "⚙️", href: '#pilares', color: "bg-indigo-500/20 text-indigo-500" },
  { id: 'demo', labelKey: 'sidebar.whatsapp', emoji: "📱", href: '#demo', color: "bg-emerald-500/20 text-emerald-500" },
  { id: 'news', labelKey: 'sidebar.boost', emoji: "🚀", href: '#news', color: "bg-orange-500/20 text-orange-500" },
  { id: 'automation', labelKey: 'sidebar.explorer', emoji: "⚡", href: '#automation', color: "bg-violet-500/20 text-violet-500" },
  { id: 'ecosystem', labelKey: 'sidebar.ecosystem', emoji: "🔌", href: '#ecosystem', color: "bg-orange-500/20 text-orange-500" },
]

export function Sidebar({ profile, onTabChange, activeTab }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const { t } = useLanguage()

  const menuItems = profile 
    ? (profile.role === 'admin' ? adminItems : clientItems)
    : homeItems

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="lg:hidden fixed top-5 left-5 z-[70] p-3 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-border/50 shadow-xl text-foreground"
      >
        {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        animate={{ 
          width: (isExpanded || isOpenMobile) ? 240 : 75,
          x: (isOpenMobile || (typeof window !== 'undefined' && window.innerWidth >= 1024)) ? 0 : -300
        }}
        className={`fixed left-0 top-0 bottom-0 z-[60] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-3xl border-r border-border/50 flex flex-col py-6 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="px-4 mb-10 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${profile?.role === 'admin' ? 'bg-purple-600' : 'bg-indigo-600'} flex items-center justify-center shrink-0 shadow-lg`}>
            {profile?.role === 'admin' ? <ShieldCheck className="w-6 h-6 text-white" /> : <LayoutDashboard className="w-6 h-6 text-white" />}
          </div>
          <AnimatePresence>
            {(isExpanded || isOpenMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-black tracking-tighter text-foreground leading-none">LEMARJ</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">
                  {profile ? (profile.role === 'admin' ? t('sidebar.adminPanel') : t('sidebar.clientPanel')) : t('sidebar.home')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
            onClick={() => {
              if ('href' in item && item.href) {
                window.location.hash = item.href
              }
              onTabChange(item.id)
              setIsOpenMobile(false)
            }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all group relative ${activeTab === item.id ? 'bg-indigo-500/10' : 'hover:bg-white/5'}`}
            >
              <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-xl ${item.color} shadow-inner group-hover:scale-110 transition-transform text-lg`}>
                {item.emoji}
              </div>
              
              <AnimatePresence>
                {(isExpanded || isOpenMobile) && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={`font-black text-sm whitespace-nowrap ${activeTab === item.id ? 'text-indigo-500' : 'text-foreground/70 group-hover:text-foreground'}`}
                  >
                    {t(item.labelKey)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Footer info showing session */}
        <div className="px-3 mt-auto space-y-4">
          {profile && (isExpanded || isOpenMobile) && (
             <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-border/50 flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 font-black text-xs">
                  {profile.full_name?.[0] || 'U'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black text-foreground truncate">{profile.full_name}</span>
                  <span className="text-[9px] font-medium text-zinc-500 truncate">{profile.role}</span>
                </div>
             </div>
          )}

          {profile ? (
            <button 
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-red-500/10 group transition-all`}
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xl bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                <LogOut className="w-5 h-5" />
              </div>
              {(isExpanded || isOpenMobile) && (
                <span className="font-black text-sm text-red-500 uppercase tracking-widest">{t('sidebar.logout')}</span>
              )}
            </button>
          ) : (
             <div className={`p-5 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 transition-all ${(isExpanded || isOpenMobile) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{t('sidebar.session')}</span>
                <span className="text-sm font-black text-foreground">{t('sidebar.activeSales')}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
