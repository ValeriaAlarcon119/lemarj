"use client";
import { motion } from "framer-motion"
import { Frown, Zap, FileText, Image as ImageIcon, MessageCircle, X } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export function SalesComparison() {
  const { t } = useLanguage()

  const problems = [
    t('salesComparison.problemList1'),
    t('salesComparison.problemList2'),
    t('salesComparison.problemList3'),
  ]

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">

        {/* FRUSTRATION SIDE */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="card-premium group relative rounded-3xl p-8 sm:p-10 flex flex-col h-full overflow-hidden hover:-translate-y-1"
        >
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
          <div className="relative flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Frown className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-300">
              {t('salesComparison.problemLabel')}
            </span>
          </div>
          <div className="relative flex-1">
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight mb-4 text-foreground">
              {t('salesComparison.problemTitle')}
            </h4>
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed mb-8">
              {t('salesComparison.problemDesc')}
            </p>
          </div>
          <ul className="relative space-y-3 pt-6 border-t border-foreground/10">
            {problems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
                <span className="w-6 h-6 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-300 shrink-0">
                  <X className="w-3.5 h-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* LEMARJ FLOW SIDE */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-glow relative rounded-3xl p-8 sm:p-10 bg-zinc-950 text-white overflow-hidden flex flex-col h-full space-y-8 hover:-translate-y-1 transition-transform duration-500"
        >
          <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

          <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/10 text-indigo-200 border border-white/15 w-fit">
            <Zap className="w-3.5 h-3.5 text-cyan-300" /> {t('salesComparison.solutionLabel')}
          </div>

          <div className="relative flex-1 space-y-4">
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight">
              {t('salesComparison.solutionTitle1')} <br />
              <span className="text-gradient-brand">{t('salesComparison.solutionTitle2')}</span>
            </h4>
            <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed">
              {t('salesComparison.solutionDesc')}
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-3">
            <FeatureTile icon={<FileText className="w-4 h-4" />} label={t('salesComparison.solutionFeature1')} />
            <FeatureTile icon={<ImageIcon className="w-4 h-4" />} label={t('salesComparison.solutionFeature2')} />
            <FeatureTile icon={<MessageCircle className="w-4 h-4" />} label={t('salesComparison.solutionFeature3')} wide />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function FeatureTile({ icon, label, wide }: { icon: React.ReactNode; label: string; wide?: boolean }) {
  return (
    <div
      className={`group/item flex items-center gap-3 rounded-2xl px-4 py-3.5 bg-white/5 ring-1 ring-white/10 backdrop-blur hover:bg-white/10 hover:ring-indigo-400/40 transition-all duration-300 ${wide ? "col-span-2" : ""}`}
    >
      <span className="w-8 h-8 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-cyan-300 shrink-0 group-hover/item:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="text-sm font-semibold text-white/90 leading-snug">{label}</span>
    </div>
  )
}
