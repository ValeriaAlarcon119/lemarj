"use client";
import { useState } from "react"
import { useLanguage } from "@/contexts/I18nContext"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Plug,
  Sparkles,
  Search,
  MessageCircle,
  Menu
} from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isPublic: boolean
}

export function BottomNav({ activeTab, onTabChange, isPublic }: BottomNavProps) {
  const { t } = useLanguage()
  
  const clientItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, labelKey: 'sidebar.dashboard' },
    { id: 'catalogo', icon: <Search className="w-5 h-5" />, labelKey: 'sidebar.catalog' },
    { id: 'automation', icon: <Sparkles className="w-5 h-5" />, labelKey: 'sidebar.explorer' },
    { id: 'ecosystem', icon: <Plug className="w-5 h-5" />, labelKey: 'sidebar.ecosystem' },
  ]

  const publicItems = [
    { id: 'home', icon: <LayoutDashboard className="w-5 h-5" />, labelKey: 'sidebar.home' },
    { id: 'pilares', icon: <Sparkles className="w-5 h-5" />, labelKey: 'sidebar.engineering' },
    { id: 'ecosystem', icon: <Plug className="w-5 h-5" />, labelKey: 'sidebar.ecosystem' },
  ]

  const items = isPublic ? publicItems : clientItems

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-border/50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <nav className="flex items-center justify-around px-2 h-16">
        {items.map((item) => {
          const isActive = activeTab === item.id || (activeTab === 'home' && item.id === 'home')
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (isPublic) {
                   if(item.id === 'home') {
                      window.location.hash = ''
                   } else {
                      window.location.hash = '#' + item.id
                   }
                }
                onTabChange(item.id)
              }}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-bold">{t(item.labelKey)}</span>
              
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 w-8 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-b-full"
                />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
