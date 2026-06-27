"use client";
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/I18nContext"

export function PricingSection() {
  const { t } = useLanguage()

  const plans = [
    {
      key: 'p0',
      href: "https://wa.me/573017219288?text=Hola%20LEMARJ,%20quiero%20cotizar%20mi%20plan%20Emprendedor",
      featured: false,
      borderClass: "border-purple-400/60 shadow-[0_0_20px_rgba(192,132,252,0.25)]",
      hoverClass: "hover:border-purple-400 hover:shadow-[0_0_35px_rgba(192,132,252,0.4)]",
      ctaClass: "border border-purple-200/50 hover:bg-purple-50 dark:hover:bg-purple-900/10 text-foreground",
      features: ['f0', 'f1', 'f2'],
      checkColor: "text-indigo-500",
    },
    {
      key: 'p1',
      href: "https://wa.me/573017219288?text=Hola%20LEMARJ,%20necesito%20una%20propuesta%20para%20el%20plan%20Pro%20IA",
      featured: true,
      borderClass: "border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(34,211,238,0.35)] ring-4 ring-cyan-400/20",
      hoverClass: "hover:shadow-[0_0_60px_rgba(34,211,238,0.55)]",
      ctaClass: "bg-gradient-to-r from-primary to-cyan-600 hover:from-indigo-600 hover:to-cyan-700 text-white shadow-[0_15px_35px_-10px_rgba(34,211,238,0.5)]",
      features: ['f0', 'f1', 'f2', 'f3'],
      checkColor: "text-cyan-400",
    },
    {
      key: 'p2',
      href: "https://wa.me/573017219288?text=Hola%20LEMARJ,%20necesito%20una%20consultoria%20para%20el%20plan%20Corporativo",
      featured: false,
      borderClass: "border-indigo-400/60 shadow-[0_0_20px_rgba(129,140,248,0.25)]",
      hoverClass: "hover:border-indigo-400 hover:shadow-[0_0_35px_rgba(129,140,248,0.4)]",
      ctaClass: "border border-indigo-200/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 text-foreground",
      features: ['f0', 'f1', 'f2'],
      checkColor: "text-indigo-500",
    },
  ]

  return (
    <section id="planes" className="py-24 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
          {t('pricing.badge')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          {t('pricing.title1')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
            {t('pricing.title2')}
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
          {t('pricing.subtitle')}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className={`relative bg-background/60 backdrop-blur-sm border rounded-[2.5rem] p-8 flex flex-col gap-6 transition-all duration-500 ${plan.borderClass} ${plan.hoverClass} ${plan.featured ? 'md:-translate-y-4 scale-105 z-10 bg-background/80 rounded-[3rem]' : ''}`}
          >
            {plan.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-cyan-500 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg whitespace-nowrap">
                {t('pricing.popularBadge')}
              </div>
            )}

            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.25em] mb-2 ${plan.featured ? 'text-primary' : 'text-muted-foreground/50'}`}>
                {t(`pricing.plans.${plan.key}.tier`)}
              </p>
              <h3 className={`font-black tracking-tight mb-3 ${plan.featured ? 'text-4xl' : 'text-2xl'}`}>
                {t(`pricing.plans.${plan.key}.name`)}
              </h3>
              <p className={`text-sm ${plan.featured ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                {t(`pricing.plans.${plan.key}.desc`)}
              </p>
              {plan.featured && (
                <p className="text-xs text-muted-foreground mt-2">
                  {t(`pricing.plans.${plan.key}.note`)}
                </p>
              )}
            </div>

            <ul className="space-y-3 flex-1">
              {plan.features.map((fKey) => (
                <li key={fKey} className={`flex gap-3 text-sm ${plan.featured ? 'font-bold' : 'font-medium'}`}>
                  <Check className={`w-5 h-5 shrink-0 ${plan.checkColor}`} />
                  {t(`pricing.plans.${plan.key}.${fKey}`)}
                </li>
              ))}
            </ul>

            <a
              href={plan.href}
              target="_blank"
              rel="noreferrer"
              className={`w-full mt-auto block text-center rounded-2xl py-4 font-black transition-all text-sm ${plan.ctaClass} ${plan.featured ? 'py-5 text-base hover:scale-[1.02] active:scale-95' : ''}`}
            >
              {t(`pricing.plans.${plan.key}.cta`)}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
