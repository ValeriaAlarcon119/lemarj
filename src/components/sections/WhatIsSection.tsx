"use client";
import { motion } from "framer-motion"
import { Bot, Target, Sparkles, PiggyBank, Clock, Users, Wallet } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export function WhatIsSection() {
  const { t } = useLanguage()

  const zeros = [
    { icon: <Clock className="w-4 h-4" />, label: t("whatIs.zeroTime") },
    { icon: <Users className="w-4 h-4" />, label: t("whatIs.zeroLeads") },
    { icon: <Wallet className="w-4 h-4" />, label: t("whatIs.zeroBudget") },
  ]

  return (
    <section id="que-es" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14 space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" /> {t("whatIs.badge")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
          {t("whatIs.title1")}
          <span className="text-gradient-brand">{t("whatIs.title2")}</span>
        </h2>
      </motion.div>

      {/* Qué es / Qué resuelve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="card-premium rounded-3xl p-8 sm:p-10 hover:-translate-y-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
            <Bot className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 mb-3">{t("whatIs.whatLabel")}</p>
          <p className="text-lg sm:text-xl leading-relaxed font-medium text-foreground/90">{t("whatIs.whatDesc")}</p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="card-premium rounded-3xl p-8 sm:p-10 hover:-translate-y-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-6">
            <Target className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 mb-3">{t("whatIs.solvesLabel")}</p>
          <p className="text-lg sm:text-xl leading-relaxed font-medium text-foreground/90">{t("whatIs.solvesDesc")}</p>
        </motion.div>
      </div>

      {/* Enfoques de valor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="card-premium rounded-3xl p-8">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300 flex items-center justify-center ring-1 ring-violet-500/20 mb-5">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold tracking-tight mb-2">{t("whatIs.v1Title")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("whatIs.v1Desc")}</p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.08 }} className="card-premium rounded-3xl p-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 flex items-center justify-center ring-1 ring-emerald-500/20 mb-5">
            <PiggyBank className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold tracking-tight mb-2">{t("whatIs.v2Title")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("whatIs.v2Desc")}</p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="border-glow rounded-3xl p-8 bg-zinc-950 text-white overflow-hidden relative"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-600/40 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-6xl font-black tracking-tighter leading-none mb-2 text-gradient-brand">0</div>
            <h3 className="text-lg font-bold tracking-tight mb-5">{t("whatIs.v3Title")}</h3>
            <ul className="space-y-2.5">
              {zeros.map((z) => (
                <li key={z.label} className="flex items-center gap-3 text-sm font-medium text-white/85">
                  <span className="w-7 h-7 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-cyan-300">{z.icon}</span>
                  {z.label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
