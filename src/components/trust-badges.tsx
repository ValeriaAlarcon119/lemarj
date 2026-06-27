"use client";
import { motion } from "framer-motion"
import { Shield, Clock, RefreshCw, Headphones } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const BADGES = (t: (k: string) => string) => [
  {
    icon: <Clock className="w-8 h-8" />,
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/30",
    iconBg: "bg-indigo-500/10 text-indigo-400",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    value: t('trustBadges.uptimeValue'),
    label: t('trustBadges.uptime'),
    desc: t('trustBadges.uptimeDesc'),
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/10 text-emerald-400",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    value: t('trustBadges.refundValue'),
    label: t('trustBadges.refund'),
    desc: t('trustBadges.refundDesc'),
  },
  {
    icon: <Shield className="w-8 h-8" />,
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/10 text-violet-400",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    value: t('trustBadges.securityValue'),
    label: t('trustBadges.security'),
    desc: t('trustBadges.securityDesc'),
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/10 text-cyan-400",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    value: t('trustBadges.supportValue'),
    label: t('trustBadges.support'),
    desc: t('trustBadges.supportDesc'),
  },
]

export function TrustBadges() {
  const { t } = useLanguage()
  const badges = BADGES(t)

  return (
    <section className="py-24 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="garantias">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          {t('trustBadges.title1')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
            {t('trustBadges.title2')}
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium">
          {t('trustBadges.subtitle')}
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`relative group bg-gradient-to-b ${badge.color} border ${badge.border} rounded-[2.5rem] p-8 flex flex-col gap-5 ${badge.glow} hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden`}
          >
            {/* Ambient Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${badge.color} blur-2xl`} />

            {/* Icon */}
            <div className={`relative w-16 h-16 rounded-2xl ${badge.iconBg} flex items-center justify-center ring-1 ring-white/10`}>
              {badge.icon}
            </div>

            {/* Value */}
            <div className="relative">
              <div className="text-4xl font-black tracking-tighter text-foreground mb-1">
                {badge.value}
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {badge.label}
              </div>
              <p className="text-xs text-muted-foreground/70 leading-relaxed font-medium">
                {badge.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
