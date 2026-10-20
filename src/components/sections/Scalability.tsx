"use client";
import { motion } from "framer-motion"
import { MapPinned, Activity, TrendingDown, Building2 } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

export function Scalability() {
  const { t } = useLanguage()

  const cards = [
    { key: "c0", icon: MapPinned, visual: <RegionsVisual /> },
    { key: "c1", icon: Activity, visual: <PeaksVisual /> },
    { key: "c2", icon: TrendingDown, visual: <CostVisual volume={t("scalability.volume")} cost={t("scalability.cost")} /> },
  ]

  return (
    <section id="escalabilidad" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Building2 className="w-3.5 h-3.5" /> {t("scalability.badge")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
          {t("scalability.title1")}
          <span className="block text-gradient-brand mt-1">{t("scalability.title2")}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">{t("scalability.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="card-premium group rounded-3xl overflow-hidden hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-44 bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0 hero-dots opacity-60" />
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-40 bg-gradient-to-r from-indigo-600/50 via-purple-500/40 to-cyan-500/50 blur-3xl" />
                <div className="relative h-full">{c.visual}</div>
              </div>
              <div className="p-7 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:rotate-6 transition-transform duration-500">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight leading-snug">{t(`scalability.${c.key}.title`)}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`scalability.${c.key}.desc`)}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// Sedes que se encienden una a una, conectadas al núcleo de la IA.
function RegionsVisual() {
  const pins = [
    { x: 22, y: 30 }, { x: 70, y: 22 }, { x: 80, y: 62 }, { x: 35, y: 72 }, { x: 55, y: 45 },
  ]
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
      {pins.slice(0, 4).map((p, i) => (
        <motion.line
          key={i}
          x1={55} y1={45} x2={p.x} y2={p.y}
          stroke="url(#lineGrad)" strokeWidth={0.5} strokeDasharray="2 2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.25, duration: 0.8 }}
        />
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {pins.map((p, i) => (
        <g key={i}>
          <motion.circle
            cx={p.x} cy={p.y} r={i === 4 ? 4 : 2.4}
            fill={i === 4 ? "#c084fc" : "#22d3ee"}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i === 4 ? 0 : 0.6 + i * 0.25, type: "spring", stiffness: 300 }}
          />
          <circle cx={p.x} cy={p.y} r={i === 4 ? 4 : 2.4} fill="none" stroke={i === 4 ? "#c084fc" : "#22d3ee"} strokeWidth={0.4}>
            <animate attributeName="r" values={`${i === 4 ? 4 : 2.4};${i === 4 ? 10 : 7}`} dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  )
}

// Barras de tráfico que suben en pico y la IA las absorbe sin saturarse.
function PeaksVisual() {
  const bars = [18, 26, 22, 40, 72, 95, 88, 60, 38, 30, 46, 34]
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-1.5 px-8 pb-7">
      <div className="absolute left-8 right-8 top-[22%] border-t border-dashed border-cyan-300/40" />
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-full max-w-[14px] rounded-t-md bg-gradient-to-t from-indigo-500 via-purple-400 to-cyan-300"
          initial={{ height: 4 }}
          whileInView={{ height: `${h * 0.75}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ animation: `peak-pulse 2.8s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
      <style>{`@keyframes peak-pulse { 0%,100% { filter: brightness(1) } 50% { filter: brightness(1.35) } } @media (prefers-reduced-motion: reduce) { [style*="peak-pulse"] { animation: none !important } }`}</style>
    </div>
  )
}

// Volumen que crece mientras el costo operativo se mantiene plano.
function CostVisual({ volume, cost }: { volume: string; cost: string }) {
  return (
    <div className="absolute inset-0 px-6 pt-6 pb-4">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-[78%]">
        <motion.path
          d="M2 56 C 25 52, 40 40, 55 28 S 85 6, 98 4"
          fill="none" stroke="url(#volGrad)" strokeWidth={1.6} strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M2 48 L 98 46"
          fill="none" stroke="#f472b6" strokeWidth={1.2} strokeDasharray="3 2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="volGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="0.5" stopColor="#c084fc" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex items-center justify-center gap-5 text-[10px] font-semibold text-white/70">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-gradient-to-r from-indigo-500 to-cyan-300" />{volume}</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-pink-400" />{cost}</span>
      </div>
    </div>
  )
}
