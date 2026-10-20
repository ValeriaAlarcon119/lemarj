"use client";
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

// Escribe el texto letra por letra; se reinicia si cambia el idioma.
function useTypewriter(text: string, speed = 55, startDelay = 300) {
  const [out, setOut] = useState("")
  useEffect(() => {
    setOut("")
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      i += 1
      setOut(text.slice(0, i))
      if (i < text.length) timer = setTimeout(tick, speed)
    }
    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [text, speed, startDelay])
  return { out, done: out.length === text.length }
}

const ROTATING = ["r0", "r1", "r2", "r3", "r4"]

export function HeroPremium() {
  const { t } = useLanguage()
  const { out, done } = useTypewriter(t("hero.typed"))
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % ROTATING.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Fondo en movimiento: auroras, retícula de puntos y haces de luz */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="hero-aurora hero-aurora-a w-[520px] h-[520px] -top-40 left-[5%] bg-indigo-400/60 dark:bg-indigo-600/50" />
        <div className="hero-aurora hero-aurora-b w-[460px] h-[460px] top-10 right-[0%] bg-cyan-300/60 dark:bg-cyan-500/40" />
        <div className="hero-aurora hero-aurora-c w-[420px] h-[420px] top-64 left-[35%] bg-fuchsia-300/50 dark:bg-fuchsia-600/30" />
        <div className="absolute inset-0 hero-dots" />
        <div className="hero-beam top-[30%] left-0" style={{ animationDelay: "0s" }} />
        <div className="hero-beam top-[58%] left-0" style={{ animationDelay: "3s" }} />
        <div className="hero-beam top-[78%] left-0" style={{ animationDelay: "6s" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="flex flex-col items-center justify-center text-center min-h-[min(78vh,820px)] pt-40 pb-16 px-4 w-full max-w-5xl mx-auto">
        {/* Título corto con máquina de escribir */}
        <h1
          className="text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] max-w-4xl text-foreground min-h-[2.2em] sm:min-h-[2.1em]"
          aria-label={t("hero.typed")}
        >
          <span aria-hidden className="text-gradient-brand">{out}</span>
          <span aria-hidden className={`type-caret ${done ? "" : "!animate-none"}`} />
        </h1>

        {/* Subtítulo dinámico: qué hace la plataforma */}
        <div className="mt-6 h-[3.5rem] sm:h-8 flex items-start sm:items-center justify-center text-lg sm:text-xl font-semibold text-foreground/85">
          <span className="whitespace-nowrap mr-2 inline-flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.rotatingLead")}
          </span>
          <span className="relative inline-block text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING[idx]}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-block text-indigo-600 dark:text-indigo-300"
              >
                {t(`hero.${ROTATING[idx]}`)}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* Resumen original */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-10"
        >
          <a
            href="https://wa.me/573017219288"
            className="group relative inline-flex h-14 px-8 items-center justify-center rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm tracking-wide shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6)] hover:shadow-[0_16px_40px_-10px_rgba(79,70,229,0.75)] hover:-translate-y-0.5 transition-all"
          >
            {t("hero.cta")}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
