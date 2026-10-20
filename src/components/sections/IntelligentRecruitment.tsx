"use client";
import { motion } from "framer-motion"
import { MapPin, CheckCircle2, Target, Network } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const PROFILES = (t: (key: string) => string) => [
  { name: t('intelligentRecruitment.mock.profiles.p0.name'), role: t('intelligentRecruitment.mock.profiles.p0.role'), region: t('intelligentRecruitment.mock.profiles.p0.region'), match: "98%", status: t('intelligentRecruitment.mock.profiles.p0.status') },
  { name: t('intelligentRecruitment.mock.profiles.p1.name'), role: t('intelligentRecruitment.mock.profiles.p1.role'), region: t('intelligentRecruitment.mock.profiles.p1.region'), match: "95%", status: t('intelligentRecruitment.mock.profiles.p1.status') },
  { name: t('intelligentRecruitment.mock.profiles.p2.name'), role: t('intelligentRecruitment.mock.profiles.p2.role'), region: t('intelligentRecruitment.mock.profiles.p2.region'), match: "92%", status: t('intelligentRecruitment.mock.profiles.p2.status') },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export function IntelligentRecruitment() {
  const { t } = useLanguage()
  const profilesData = PROFILES(t)
  return (
    <section id="reclutamiento" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Izquierda: texto y enfoques */}
        <div className="space-y-8 relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              <Target className="w-3.5 h-3.5" />
              {t('intelligentRecruitment.badge')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] text-foreground">
              {t('intelligentRecruitment.title1')} <br />
              <span className="text-gradient-brand">
                {t('intelligentRecruitment.title2')}
              </span>
            </h2>

            <p
              className="text-lg text-muted-foreground font-medium leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{
                __html: `${t('intelligentRecruitment.desc1')}<span class="text-indigo-600 dark:text-indigo-300 font-semibold">${t('intelligentRecruitment.descBold')}</span>${t('intelligentRecruitment.desc2')}`
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.05 }} className="card-premium group rounded-3xl p-7 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2">{t('intelligentRecruitment.features.f0.title')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('intelligentRecruitment.features.f0.desc')}</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.12 }} className="card-premium group rounded-3xl p-7 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2">{t('intelligentRecruitment.features.f1.title')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('intelligentRecruitment.features.f1.desc')}</p>
            </motion.div>
          </div>
        </div>

        {/* Derecha: mock del dashboard de selección */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500/20 via-purple-400/10 to-cyan-400/20 blur-3xl rounded-[3rem] opacity-70 pointer-events-none" />

          <div className="card-premium relative rounded-3xl overflow-hidden">
            {/* Barra de ventana */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-border bg-muted/30" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="ml-3 h-1.5 w-24 rounded-full bg-foreground/10" />
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-lg tracking-tight">{t('intelligentRecruitment.mock.title')}</h4>
                  <p className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.14em]">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {t('intelligentRecruitment.mock.subtitle')}
                  </p>
                </div>
                <div className="shrink-0 bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-[11px] font-semibold tabular-nums">
                  {t('intelligentRecruitment.mock.badge')}
                </div>
              </div>

              {/* Mini gráfico decorativo de candidatos */}
              <div className="flex items-end gap-1 h-10 px-1" aria-hidden="true">
                {[30, 45, 38, 60, 52, 70, 64, 82, 76, 92, 85, 100].map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500/70 via-purple-400/60 to-cyan-400/70"
                    initial={{ height: 2 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.04 }}
                  />
                ))}
              </div>

              <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden bg-background/50">
                {profilesData.map((profile, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    key={profile.name}
                    className="flex items-center gap-4 px-4 py-3.5 group hover:bg-indigo-500/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                      {profile.name[0]}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h5 className="font-semibold text-sm truncate">{profile.name}</h5>
                        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-indigo-600 dark:text-indigo-300">{profile.match} {t('intelligentRecruitment.mock.match')}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 mt-1">
                        <span className="text-xs text-muted-foreground truncate">{profile.role}</span>
                        <span className="shrink-0 text-[11px] flex items-center gap-1 text-muted-foreground/70 font-medium">
                          <MapPin className="w-3 h-3" />
                          {profile.region}
                        </span>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden" aria-hidden="true">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: profile.match }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.3 + i * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="shrink-0 p-1.5 rounded-lg bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full h-12 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-sm shadow-lg shadow-indigo-500/10 transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2">
                <Network className="w-4 h-4" />
                {t('intelligentRecruitment.btn')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
