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
      <DropdownMenuTrigger render={<button className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 border-2 border-pink-200 hover:border-pink-400 dark:border-pink-900/50 dark:hover:border-pink-600 shadow-[0_0_15px_rgba(244,114,182,0.3)] backdrop-blur-md transition-all group overflow-hidden" />}>
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
                <Moon className="h-[1.2rem] w-[1.2rem] text-pink-500 group-hover:text-pink-600 transition-colors" />
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
                <Sun className="h-[1.2rem] w-[1.2rem] text-pink-500 group-hover:text-pink-600 transition-colors" />
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
                <Laptop className="h-[1.1rem] w-[1.1rem] text-pink-500 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Cambiar tema</span>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-36 p-1 rounded-2xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl">
        <DropdownMenuItem onClick={() => setTheme("light")} className="rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:bg-zinc-100 dark:focus:bg-zinc-900 group">
          <Sun className="h-4 w-4 mr-2 text-zinc-400 group-hover:text-amber-500 transition-colors" />
          <span className="text-sm font-medium">Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:bg-zinc-100 dark:focus:bg-zinc-900 group">
          <Moon className="h-4 w-4 mr-2 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
          <span className="text-sm font-medium">Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:bg-zinc-100 dark:focus:bg-zinc-900 group">
          <Laptop className="h-4 w-4 mr-2 text-zinc-400 group-hover:text-foreground transition-colors" />
          <span className="text-sm font-medium">Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
