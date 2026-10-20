"use client";
import { motion } from "framer-motion"
import { Shield, Clock, RefreshCw, Headphones, BadgeCheck } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const BADGES = (t: (k: string) => string) => [
  {
    icon: Clock,
    tone: "text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 ring-indigo-500/20",
    value: t('trustBadges.uptimeValue'),
    label: t('trustBadges.uptime'),
    desc: t('trustBadges.uptimeDesc'),
  },
  {
    icon: RefreshCw,
    tone: "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 ring-emerald-500/20",
    value: t('trustBadges.refundValue'),
    label: t('trustBadges.refund'),
    desc: t('trustBadges.refundDesc'),
  },
  {
    icon: Shield,
    tone: "text-violet-600 dark:text-violet-300 bg-violet-500/10 ring-violet-500/20",
    value: t('trustBadges.securityValue'),
    label: t('trustBadges.security'),
    desc: t('trustBadges.securityDesc'),
  },
  {
    icon: Headphones,
    tone: "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 ring-cyan-500/20",
    value: t('trustBadges.supportValue'),
    label: t('trustBadges.support'),
    desc: t('trustBadges.supportDesc'),
  },
]

// Módulo superior de respaldo de calidad (antes estaba justo encima del formulario).
export function TrustBadges() {
  const { t } = useLanguage()
  const badges = BADGES(t)

  return (
    <section className="py-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" id="garantias">
      <div className="card-premium rounded-[2rem] p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <BadgeCheck className="w-3.5 h-3.5" /> {t('trustBadges.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em]">
              {t('trustBadges.title1')}
              <span className="text-gradient-brand">{t('trustBadges.title2')}</span>
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-sm font-medium lg:text-right">
            {t('trustBadges.subtitle')}
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-foreground/[0.07]">
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-background/95 p-6 sm:p-7 flex flex-col gap-4 hover:bg-background transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ring-1 flex items-center justify-center ${badge.tone} group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tighter text-foreground">{badge.value}</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mt-1 mb-2">{badge.label}</div>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{badge.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Franja compacta de garantías para acompañar la decisión de compra en Planes.
export function TrustStrip() {
  const { t } = useLanguage()
  const badges = BADGES(t)
  return (
    <div className="mt-14 card-premium rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-500/20 flex items-center justify-center">
            <BadgeCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{t('trustBadges.eyebrow')}</p>
            <p className="text-sm font-bold">{t('trustBadges.title1')}{t('trustBadges.title2')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-foreground/[0.03] ring-1 ring-foreground/[0.06]">
                <Icon className="w-4 h-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <div className="text-sm font-black tracking-tight leading-none">{b.value}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{b.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
