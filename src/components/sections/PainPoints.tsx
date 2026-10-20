"use client";
import { motion } from "framer-motion"
import { MoonStar, Hourglass, Wallet, Users, AlertTriangle, Filter, Megaphone, MessageCircle, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const PAINS = [
  { key: "p0", icon: MoonStar },
  { key: "p1", icon: Hourglass },
  { key: "p2", icon: Wallet },
  { key: "p3", icon: Users },
  { key: "p4", icon: AlertTriangle },
  { key: "p5", icon: Filter },
]

export function PainPoints() {
  const { t } = useLanguage()

  return (
    <section id="problemas" className="w-full py-24 scroll-mt-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> {t("painPoints.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
            {t("painPoints.title1")}
            <span className="text-gradient-brand">{t("painPoints.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">{t("painPoints.subtitle")}</p>
        </motion.div>

        {/* Diagrama: anuncios → mensajes → cuello de botella → ventas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] bg-zinc-950 text-white p-6 sm:p-10 mb-6 overflow-hidden"
        >
          <div className="absolute inset-0 hero-dots opacity-60 pointer-events-none" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-gradient-to-r from-indigo-600/40 via-purple-500/30 to-cyan-500/40 blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <FlowNode icon={<Megaphone className="w-5 h-5" />} label={t("painPoints.flowAds")} />
            <FlowLine />
            <FlowNode icon={<MessageCircle className="w-5 h-5" />} label={t("painPoints.flowMessages")} />
            <FlowLine danger />
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-rose-500/30 blur-xl animate-pulse" />
              <div className="relative flex items-center gap-3 rounded-2xl px-5 py-4 bg-rose-500/15 ring-1 ring-rose-400/40 text-rose-200">
                <Hourglass className="w-5 h-5" />
                <span className="text-sm font-bold whitespace-nowrap">{t("painPoints.flowBottleneck")}</span>
              </div>
            </div>
            <FlowLine faded />
            <FlowNode icon={<TrendingUp className="w-5 h-5" />} label={t("painPoints.flowSales")} faded />
          </div>
        </motion.div>

        {/* Tarjetas de dolor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAINS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="card-premium group rounded-3xl p-7 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/60">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2">{t(`painPoints.${p.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`painPoints.${p.key}.desc`)}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FlowNode({ icon, label, faded }: { icon: React.ReactNode; label: string; faded?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-5 py-4 bg-white/5 ring-1 ring-white/10 backdrop-blur ${faded ? "opacity-35" : ""}`}>
      <span className="text-cyan-300">{icon}</span>
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </div>
  )
}

function FlowLine({ danger, faded }: { danger?: boolean; faded?: boolean }) {
  const color = danger ? "text-rose-400" : "text-indigo-300"
  return (
    <>
      <div className={`hidden md:block flex-1 mx-3 h-px dotted-flow ${color} ${faded ? "opacity-20 [animation:none]" : ""}`} />
      <div className={`md:hidden w-px h-6 bg-current ${color} ${faded ? "opacity-20" : "opacity-60"}`} />
    </>
  )
}
