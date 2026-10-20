"use client";
import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/I18nContext"
import { TrustStrip } from "@/components/trust-badges"

export function PricingSection() {
  const { t } = useLanguage()

  const plans = [
    {
      key: 'p0',
      href: "https://wa.me/573017219288?text=Hola%20LEMARJ,%20quiero%20cotizar%20mi%20plan%20Emprendedor",
      featured: false,
      features: ['f0', 'f1', 'f2'],
      checkTone: "text-purple-500 bg-purple-500/10",
    },
    {
      key: 'p1',
      href: "https://wa.me/573017219288?text=Hola%20LEMARJ,%20necesito%20una%20propuesta%20para%20el%20plan%20Pro%20IA",
      featured: true,
      features: ['f0', 'f1', 'f2', 'f3'],
      checkTone: "text-cyan-300 bg-cyan-400/15",
    },
    {
      key: 'p2',
      href: "https://wa.me/573017219288?text=Hola%20LEMARJ,%20necesito%20una%20consultoria%20para%20el%20plan%20Corporativo",
      featured: false,
      features: ['f0', 'f1', 'f2'],
      checkTone: "text-indigo-500 bg-indigo-500/10",
    },
  ]

  return (
    <section id="planes" className="py-24 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          {t('pricing.badge')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
          {t('pricing.title1')}
          <span className="text-gradient-brand">{t('pricing.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
          {t('pricing.subtitle')}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={
              plan.featured
                ? "border-glow relative rounded-[2rem] p-8 flex flex-col gap-6 bg-zinc-950 text-white shadow-[0_30px_80px_-30px_rgba(34,211,238,0.45)] md:-my-4 md:py-12 overflow-hidden"
                : "card-premium relative rounded-[2rem] p-8 flex flex-col gap-6 hover:-translate-y-1"
            }
          >
            {plan.featured && (
              <>
                <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full bg-indigo-600/40 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none" />
                <span className="relative self-start bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]">
                  {t('pricing.popularBadge')}
                </span>
              </>
            )}

            <div className="relative">
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-2 ${plan.featured ? 'text-cyan-300' : 'text-muted-foreground'}`}>
                {t(`pricing.plans.${plan.key}.tier`)}
              </p>
              <h3 className={`font-extrabold tracking-tight mb-3 ${plan.featured ? 'text-3xl' : 'text-2xl'}`}>
                {t(`pricing.plans.${plan.key}.name`)}
              </h3>
              <p className={`text-sm leading-relaxed ${plan.featured ? 'text-white/80' : 'text-muted-foreground'}`}>
                {t(`pricing.plans.${plan.key}.desc`)}
              </p>
              {plan.featured && (
                <p className="text-xs text-white/50 mt-2">
                  {t(`pricing.plans.${plan.key}.note`)}
                </p>
              )}
            </div>

            <div className={`relative h-px ${plan.featured ? 'bg-white/10' : 'bg-foreground/[0.08]'}`} />

            <ul className="relative space-y-3 flex-1">
              {plan.features.map((fKey) => (
                <li key={fKey} className="flex gap-3 text-sm font-medium items-start">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.checkTone}`}>
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  {t(`pricing.plans.${plan.key}.${fKey}`)}
                </li>
              ))}
            </ul>

            <a
              href={plan.href}
              target="_blank"
              rel="noreferrer"
              className={
                plan.featured
                  ? "relative group w-full mt-auto inline-flex items-center justify-center gap-2 rounded-full h-12 font-bold text-sm text-white bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_12px_30px_-10px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 transition-all"
                  : "relative group w-full mt-auto inline-flex items-center justify-center gap-2 rounded-full h-12 font-bold text-sm border border-foreground/15 hover:border-purple-400/60 hover:bg-purple-500/5 transition-all"
              }
            >
              {t(`pricing.plans.${plan.key}.cta`)}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Respaldo de calidad junto a la decisión de compra */}
      <TrustStrip />
    </section>
  )
}
