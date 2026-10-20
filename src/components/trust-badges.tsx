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

// Módulo de garantías que acompaña la decisión de compra en Planes.
const STRIP_TONES = [
  { tile: "from-indigo-500 to-violet-600", glow: "rgba(99,102,241,0.45)" },
  { tile: "from-emerald-400 to-teal-600", glow: "rgba(16,185,129,0.45)" },
  { tile: "from-purple-400 to-fuchsia-600", glow: "rgba(192,132,252,0.45)" },
  { tile: "from-cyan-400 to-blue-600", glow: "rgba(34,211,238,0.45)" },
]

export function TrustStrip() {
  const { t } = useLanguage()
  const badges = BADGES(t)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 border-glow relative rounded-[2rem] overflow-hidden bg-zinc-950 text-white p-6 sm:p-10"
    >
      <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-28 left-1/4 w-[420px] h-[260px] bg-indigo-600/35 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-28 right-1/4 w-[420px] h-[260px] bg-cyan-500/25 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <span className="absolute inset-0 rounded-2xl bg-emerald-400/40 blur-lg animate-pulse" />
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
              <BadgeCheck className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300 mb-1.5">{t('trustBadges.eyebrow')}</p>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              {t('trustBadges.title1')}<span className="text-gradient-brand">{t('trustBadges.title2')}</span>
            </p>
          </div>
        </div>

        <p className="text-sm text-white/60 leading-relaxed md:max-w-xs md:text-right">{t('trustBadges.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon
            const tone = STRIP_TONES[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{ "--glow": tone.glow } as React.CSSProperties}
                className="group rounded-2xl p-6 bg-white/[0.04] ring-1 ring-white/10 hover:ring-white/25 hover:bg-white/[0.07] hover:shadow-[0_18px_40px_-16px_var(--glow)] transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tone.tile} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-4xl font-black tracking-tighter leading-none text-gradient-brand">{b.value}</div>
                <div className="text-[13px] font-bold mt-2">{b.label}</div>
                <p className="text-xs text-white/55 mt-1 leading-relaxed">{b.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
