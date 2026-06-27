"use client";
import { useLanguage } from "@/contexts/I18nContext"
import { Globe, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  // Si toggleLanguage es lo único disponible en el hook original, podemos mantenerlo así,
  // pero usaremos un dropdown que use 'es' o 'en'.
  // Asumiendo que el hook expone setLanguage o toggleLanguage.
  
  // Como en lemarj-v2 solo expone toggleLanguage, usémoslo al hacer clic.
  // Pero haremos un botón estilo píldora interactivo.

  return (
    <button 
      onClick={() => {
        // En caso de que I18nContext tenga toggleLanguage.
        const event = new MouseEvent('click', { bubbles: true });
        // Simplemente llamamos a la función
        const btn = document.getElementById('lang-toggle-btn');
        if (btn) btn.click();
      }}
      className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 border-2 border-pink-200 hover:border-pink-400 dark:border-pink-900/50 dark:hover:border-pink-600 shadow-[0_0_15px_rgba(244,114,182,0.3)] backdrop-blur-md transition-all group overflow-hidden"
    >
      <Globe className="h-[1.2rem] w-[1.2rem] text-pink-500 group-hover:text-pink-600 transition-colors" />
      
      {/* Botón fantasma invisible para ejecutar toggleLanguage desde el Hook */}
      <LanguageToggleGhost />
    </button>
  )
}

// Componente helper para consumir el context si solo tenemos toggleLanguage
function LanguageToggleGhost() {
  const { toggleLanguage } = useLanguage()
  return (
    <div 
      id="lang-toggle-btn" 
      onClick={toggleLanguage} 
      className="hidden" 
    />
  )
}
