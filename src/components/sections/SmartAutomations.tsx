"use client";
import { motion } from "framer-motion"
import { Bell, Clock, ShoppingBag, MessageSquare, Zap, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const FEATURES = (t: (key: string) => string) => [
  {
    icon: Bell,
    title: t('smartAutomations.features.t0.title'),
    description: t('smartAutomations.features.t0.desc'),
    tint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-indigo-500/20",
  },
  {
    icon: Zap,
    title: t('smartAutomations.features.t1.title'),
    description: t('smartAutomations.features.t1.desc'),
    tint: "bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-purple-500/20",
  },
  {
    icon: Clock,
    title: t('smartAutomations.features.t2.title'),
    description: t('smartAutomations.features.t2.desc'),
    tint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-cyan-500/20",
  }
]

export function SmartAutomations() {
  const { t } = useLanguage()
  const featuresData = FEATURES(t)

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-10"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
              <span className="text-gradient-brand">{t('smartAutomations.title1')}</span>
              <span className="block mt-1">{t('smartAutomations.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              {t('smartAutomations.desc')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="card-premium group flex gap-4 rounded-3xl p-5 sm:p-6 hover:-translate-y-1"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl ring-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${feature.tint}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-x-0 -inset-y-6 sm:-inset-6 bg-gradient-to-r from-indigo-600/25 via-purple-500/20 to-cyan-500/25 blur-3xl rounded-[3rem] pointer-events-none" />
          <div className="border-glow relative rounded-3xl bg-zinc-950 text-white overflow-hidden shadow-[0_30px_80px_-30px_rgba(99,102,241,0.5)]">
            <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />

            <div className="relative px-6 py-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="text-[11px] font-mono text-white/50">{t('smartAutomations.mock.version')}</div>
            </div>

            <div className="relative p-6 sm:p-8 space-y-6">
              {/* Disparador */}
              <div className="flex items-center gap-4 rounded-2xl p-4 bg-white/5 ring-1 ring-white/10 backdrop-blur">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
                  {t('smartAutomations.mock.name').split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">{t('smartAutomations.mock.name')}</div>
                  <div className="text-xs text-white/55">{t('smartAutomations.mock.inactivity')}</div>
                </div>
                <div className="shrink-0 px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/30 text-[10px] font-semibold uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                  {t('smartAutomations.mock.trigger')}
                </div>
              </div>

              {/* Línea de tiempo */}
              <div className="relative pl-12 pb-1">
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400/60 via-purple-400/40 to-emerald-400/60" />

                <div className="relative mb-5">
                  <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-zinc-950 ring-1 ring-indigo-400/50 flex items-center justify-center text-indigo-200">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <div className="rounded-2xl p-3.5 bg-white/5 ring-1 ring-white/10">
                    <p className="text-xs font-medium text-white/85 leading-relaxed">{t('smartAutomations.mock.msg')}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-zinc-950 ring-1 ring-emerald-400/50 flex items-center justify-center text-emerald-300">
                    <ShoppingBag className="w-3 h-3" />
                  </div>
                  <div className="rounded-2xl p-3.5 bg-emerald-500/10 ring-1 ring-emerald-400/25">
                    <p className="text-xs font-medium text-white/85 leading-relaxed">{t('smartAutomations.mock.conversion')}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-300 font-semibold uppercase tracking-wide">
                      <CheckCircle2 className="w-3 h-3" />
                      {t('smartAutomations.mock.success')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
