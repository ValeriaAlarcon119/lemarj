"use client";
import { useLanguage } from "@/contexts/I18nContext"
import { Target } from "lucide-react"

export function LanguageToggle() {
  return (
    <button
      onClick={() => {
        const btn = document.getElementById('lang-toggle-btn');
        if (btn) btn.click();
      }}
      className="relative flex items-center justify-center h-10 w-10 rounded-[12px] bg-white dark:bg-[#0a0a0c] border-[1.5px] border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all overflow-hidden shadow-[0_0_15px_rgba(225,29,72,0.25)] hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
    >
      <Target className="h-5 w-5 text-rose-500 transition-colors" />
      <LanguageToggleGhost />
    </button>
  )
}

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
