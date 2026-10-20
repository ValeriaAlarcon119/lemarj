"use client";
import { motion } from "framer-motion"
import { Palette, TrendingUp, Landmark, Share2, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const TINTS = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-indigo-500/20",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-purple-500/20",
  cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-cyan-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-emerald-500/20",
} as const

export function ExpertTips() {
  const { t } = useLanguage()
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Zap className="w-3.5 h-3.5" /> {t('expertTips.badge')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
          {t('expertTips.title1')}
          <span className="block text-gradient-brand mt-1">{t('expertTips.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          {t('expertTips.desc')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <TipCard
          icon={<Palette className="w-5 h-5" />}
          title={t('expertTips.tips.design.title')}
          desc={t('expertTips.tips.design.desc')}
          tint="indigo"
          index={0}
        />
        <TipCard
          icon={<Landmark className="w-5 h-5" />}
          title={t('expertTips.tips.finance.title')}
          desc={t('expertTips.tips.finance.desc')}
          tint="emerald"
          index={1}
        />
        <TipCard
          icon={<TrendingUp className="w-5 h-5" />}
          title={t('expertTips.tips.marketing.title')}
          desc={t('expertTips.tips.marketing.desc')}
          tint="purple"
          index={2}
        />
        <TipCard
          icon={<Share2 className="w-5 h-5" />}
          title={t('expertTips.tips.visibility.title')}
          desc={t('expertTips.tips.visibility.desc')}
          tint="cyan"
          index={3}
        />
      </div>
    </section>
  )
}

function TipCard({ icon, title, desc, tint, index }: { icon: React.ReactNode, title: string, desc: string, tint: keyof typeof TINTS, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="card-premium group rounded-3xl p-7 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-5">
        <div className={`w-10 h-10 rounded-xl ring-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${TINTS[tint]}`}>
          {icon}
        </div>
        <span className="text-[11px] font-mono text-muted-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  )
}
