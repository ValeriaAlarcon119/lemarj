"use client";
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <button className="relative flex items-center justify-center h-10 w-10 rounded-[12px] bg-[#0a0a0c] border-[1.5px] border-emerald-500 hover:bg-emerald-500/10 transition-colors overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
      }>
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="dark"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-5 w-5 text-emerald-500" />
            </motion.div>
          ) : theme === 'light' ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-5 w-5 text-emerald-500" />
            </motion.div>
          ) : (
            <motion.div
              key="system"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Laptop className="h-5 w-5 text-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Cambiar tema</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36 p-1 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-2xl">
        <DropdownMenuItem onClick={() => setTheme("light")} className="rounded-xl cursor-pointer hover:bg-zinc-900 transition-colors focus:bg-zinc-900 group">
          <Sun className="h-4 w-4 mr-2 text-zinc-400 group-hover:text-amber-400 transition-colors" />
          <span className="text-sm font-medium text-white">Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="rounded-xl cursor-pointer hover:bg-zinc-900 transition-colors focus:bg-zinc-900 group">
          <Moon className="h-4 w-4 mr-2 text-zinc-400 group-hover:text-fuchsia-400 transition-colors" />
          <span className="text-sm font-medium text-white">Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="rounded-xl cursor-pointer hover:bg-zinc-900 transition-colors focus:bg-zinc-900 group">
          <Laptop className="h-4 w-4 mr-2 text-zinc-400 group-hover:text-sky-400 transition-colors" />
          <span className="text-sm font-medium text-white">Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
