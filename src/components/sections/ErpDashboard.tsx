"use client";
import { motion } from "framer-motion"
import { Users2, Package, BarChart3, TrendingDown, TrendingUp, Search, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export function ErpDashboard() {
  const { t } = useLanguage()
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto mb-14 space-y-4">
        <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight"
          dangerouslySetInnerHTML={{
            __html: `<span class="text-gradient-brand">${t('erpDashboard.title1')}</span> <br />${t('erpDashboard.title2')}`
          }}
        />
        <p
          className="text-lg text-muted-foreground font-medium max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: `${t('erpDashboard.desc1')}<span class="text-foreground font-semibold">${t('erpDashboard.descBold')}</span>${t('erpDashboard.desc2')}`
          }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* AI Financial Advisor — tarjeta destacada oscura */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 border-glow relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-7 sm:p-8 shadow-2xl shadow-indigo-950/20"
        >
          <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[420px] h-[260px] bg-gradient-to-r from-indigo-600/35 via-purple-500/25 to-cyan-500/35 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/30 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{t('erpDashboard.advisor.title')}</h3>
                  <p className="text-sm text-zinc-400">{t('erpDashboard.advisor.desc')}</p>
                </div>
              </div>
              <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/25 text-emerald-300 text-[11px] font-semibold tracking-wide">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                {t('erpDashboard.advisor.badge')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5 transition-colors hover:bg-white/[0.05]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{t('erpDashboard.advisor.incomeLabel')}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-2xl font-bold tracking-tight tabular-nums">{t('erpDashboard.advisor.incomeValue')}</div>
                      <div className="mt-1 text-xs font-medium text-emerald-400 tabular-nums">{t('erpDashboard.advisor.incomeDiff')}</div>
                    </div>
                    <Sparkline path="M0 26 L10 22 L20 24 L30 16 L40 18 L50 10 L60 12 L70 4" color="#34d399" id="erp-spark-up" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5 transition-colors hover:bg-white/[0.05]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{t('erpDashboard.advisor.expenseLabel')}</span>
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-2xl font-bold tracking-tight tabular-nums">{t('erpDashboard.advisor.expenseValue')}</div>
                      <div className="mt-1 text-xs font-medium text-rose-400 tabular-nums">{t('erpDashboard.advisor.expenseDiff')}</div>
                    </div>
                    <Sparkline path="M0 6 L10 8 L20 7 L30 13 L40 12 L50 18 L60 20 L70 24" color="#fb7185" id="erp-spark-down" />
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl p-6 flex flex-col bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 ring-1 ring-indigo-400/25">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-4">
                  <Zap className="w-4 h-4" />
                  {t('erpDashboard.advisor.strategyTitle')}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-indigo-400/60 pl-4">
                  {t('erpDashboard.advisor.strategyQuote')}
                </p>
                <button className="group/cta mt-auto pt-5 inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold text-left hover:text-cyan-200 transition-colors">
                  {t('erpDashboard.advisor.strategyBtn')}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Recruitment */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-4 card-premium rounded-3xl p-7 flex flex-col hover:-translate-y-1"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20 flex items-center justify-center">
              <Users2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold tracking-tight">{t('erpDashboard.recruitment.title')}</h3>
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <div className="w-full bg-background/60 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-muted-foreground">
              {t('erpDashboard.recruitment.searchPlaceholder')}
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-border divide-y divide-border overflow-hidden bg-background/40">
            {[
              { name: "Ana Maria G.", match: "98% Match", role: t('erpDashboard.recruitment.roles.r0') },
              { name: "Carlos Ruiz", match: "92% Match", role: t('erpDashboard.recruitment.roles.r1') },
              { name: "Diana Lopez", match: "89% Match", role: t('erpDashboard.recruitment.roles.r2') }
            ].map((candidate, i) => (
              <div key={i} className="px-3.5 py-3 flex items-center justify-between gap-3 hover:bg-indigo-500/[0.04] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div aria-hidden="true" className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-400 to-cyan-400 opacity-90" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{candidate.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{candidate.role}</div>
                  </div>
                </div>
                <div className="shrink-0 text-[11px] font-semibold tabular-nums text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-2 py-0.5 rounded-md">
                  {candidate.match}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-5 py-3 rounded-xl text-sm font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 active:scale-[0.98] transition-all">
            {t('erpDashboard.recruitment.publishBtn')}
          </button>
        </motion.div>

        {/* Inventory Optimization */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-12 card-premium relative overflow-hidden rounded-3xl p-7 sm:p-10"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{t('erpDashboard.inventory.title')}</h3>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                {t('erpDashboard.inventory.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-[560px] shrink-0">
              <div className="rounded-2xl border border-border bg-background/60 p-5 transition-transform duration-300 hover:-translate-y-0.5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">{t('erpDashboard.inventory.delayedStock')}</div>
                <div className="text-3xl font-bold tracking-tight tabular-nums text-rose-600 dark:text-rose-400">12%</div>
                <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-rose-500/80"
                    initial={{ width: 0 }}
                    whileInView={{ width: "12%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 transition-transform duration-300 hover:-translate-y-0.5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">{t('erpDashboard.inventory.averageRotation')}</div>
                <div className="text-3xl font-bold tracking-tight tabular-nums text-indigo-600 dark:text-indigo-300">45 d</div>
                <div className="mt-3 flex items-end gap-1 h-6">
                  {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                    <motion.span
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500 to-cyan-400 opacity-80"
                      initial={{ height: 2 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
              <div className="group/free relative overflow-hidden rounded-2xl bg-zinc-950 text-white dark:ring-1 dark:ring-white/10 p-5 flex flex-col justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/50 via-purple-400/40 to-cyan-400/50 blur-2xl pointer-events-none" />
                <div className="relative text-base font-bold leading-tight flex items-center gap-1.5">
                  {t('erpDashboard.inventory.freeCapital')}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/free:translate-x-0.5 group-hover/free:-translate-y-0.5" />
                </div>
                <div className="relative text-xs text-zinc-400 mt-1 font-medium">{t('erpDashboard.inventory.suggestCombos')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Mini gráfico decorativo (sin texto) para las métricas del asesor.
function Sparkline({ path, color, id }: { path: string; color: string; id: string }) {
  return (
    <svg viewBox="0 0 70 30" className="w-20 h-8 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L70 30 L0 30 Z`} fill={`url(#${id})`} />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  )
}

function Zap({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
