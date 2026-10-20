"use client";
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Palette, Calendar, ArrowUpRight, Users2, X, CheckCircle2, Brain, Sparkles, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const CARDS = (t: (key: string) => string) => [
  {
    id: "bienestar",
    icon: Heart,
    title: t('wellnessHub.cards.c0.title'),
    description: t('wellnessHub.cards.c0.desc'),
    tag: t('wellnessHub.cards.c0.tag'),
    accent: {
      tile: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20",
      tag: "text-indigo-600 dark:text-indigo-300",
      glow: "bg-indigo-500/15",
      bar: "from-indigo-500 to-purple-400",
    },
    modalContent: {
      subtitle: t('wellnessHub.cards.c0.subtitle'),
      details: t('wellnessHub.cards.c0.details'),
      features: [
        { icon: Brain, title: t('wellnessHub.cards.c0.f0.title'), desc: t('wellnessHub.cards.c0.f0.desc') },
        { icon: Sparkles, title: t('wellnessHub.cards.c0.f1.title'), desc: t('wellnessHub.cards.c0.f1.desc') }
      ],
      ctaText: t('wellnessHub.cards.c0.cta')
    }
  },
  {
    id: "diseno",
    icon: Palette,
    title: t('wellnessHub.cards.c1.title'),
    description: t('wellnessHub.cards.c1.desc'),
    tag: t('wellnessHub.cards.c1.tag'),
    accent: {
      tile: "bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-1 ring-purple-500/20",
      tag: "text-purple-600 dark:text-purple-300",
      glow: "bg-purple-500/15",
      bar: "from-purple-400 to-indigo-500",
    },
    modalContent: {
      subtitle: t('wellnessHub.cards.c1.subtitle'),
      details: t('wellnessHub.cards.c1.details'),
      features: [
        { icon: Palette, title: t('wellnessHub.cards.c1.f0.title'), desc: t('wellnessHub.cards.c1.f0.desc') },
        { icon: CheckCircle2, title: t('wellnessHub.cards.c1.f1.title'), desc: t('wellnessHub.cards.c1.f1.desc') }
      ],
      ctaText: t('wellnessHub.cards.c1.cta')
    }
  },
  {
    id: "estrategia",
    icon: Calendar,
    title: t('wellnessHub.cards.c2.title'),
    description: t('wellnessHub.cards.c2.desc'),
    tag: t('wellnessHub.cards.c2.tag'),
    accent: {
      tile: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20",
      tag: "text-cyan-600 dark:text-cyan-300",
      glow: "bg-cyan-500/15",
      bar: "from-cyan-400 to-indigo-500",
    },
    modalContent: {
      subtitle: t('wellnessHub.cards.c2.subtitle'),
      details: t('wellnessHub.cards.c2.details'),
      features: [
        { icon: TrendingUp, title: t('wellnessHub.cards.c2.f0.title'), desc: t('wellnessHub.cards.c2.f0.desc') },
        { icon: Calendar, title: t('wellnessHub.cards.c2.f1.title'), desc: t('wellnessHub.cards.c2.f1.desc') }
      ],
      ctaText: t('wellnessHub.cards.c2.cta')
    }
  }
]

export function WellnessHub() {
  const { t } = useLanguage()
  const [activeCard, setActiveCard] = useState<typeof cardsData[0] | null>(null)
  const cardsData = CARDS(t)

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24 relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4 text-center md:text-left"
        >
          <div className="mx-auto md:mx-0 w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
            <span className="text-gradient-brand">{t('wellnessHub.title')}</span>
          </h2>
          <p
            className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: `${t('wellnessHub.desc1')}<span class="text-foreground font-semibold">${t('wellnessHub.descBold')}</span>${t('wellnessHub.desc2')}`
            }}
          />
        </motion.div>

        {/* Orbe decorativo de la red de expertos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex relative w-48 h-48 shrink-0 items-center justify-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-400/15 to-cyan-400/20 blur-2xl" />
          <div className="absolute inset-2 rounded-full border border-dashed border-indigo-500/25 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-foreground/10" />
          <span className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
          <span className="absolute bottom-8 left-5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]" />
          <span className="absolute bottom-10 right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          <div className="relative w-20 h-20 rounded-2xl card-premium flex items-center justify-center">
            <Users2 className="w-9 h-9 text-indigo-600 dark:text-indigo-300" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cardsData.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="card-premium group relative overflow-hidden rounded-3xl p-7 sm:p-8 hover:-translate-y-1 flex flex-col"
          >
            {/* Línea de acento superior y brillo suave */}
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.accent.bar} opacity-60`} />
            <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full ${card.accent.glow} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative flex items-center justify-between gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl ${card.accent.tile} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${card.accent.tag}`}>
                {card.tag}
              </span>
            </div>

            <div className="relative flex-1 space-y-2">
              <h3 className="text-xl font-bold tracking-tight leading-snug text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>

            <button
              onClick={() => setActiveCard(card)}
              className="relative mt-8 w-full h-11 rounded-xl border border-border bg-background/60 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 dark:hover:border-white transition-colors duration-300 text-sm font-semibold flex items-center justify-center gap-2 group/btn"
            >
              {t('wellnessHub.learnMore')} <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal del kit */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
              className="absolute inset-0 bg-zinc-950/50 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-background rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)] border border-border overflow-y-auto max-h-[92vh] scrollbar-hide"
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${activeCard.accent.bar}`} />
              <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full ${activeCard.accent.glow} blur-3xl pointer-events-none`} />

              <div className="p-7 sm:p-10 space-y-8 relative z-10">
                {/* Encabezado */}
                <div className="flex justify-between items-start gap-6">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                      <Sparkles className="w-3.5 h-3.5" /> {t('wellnessHub.exclusive')}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-foreground leading-tight">
                      {activeCard.title.split(' ')[0]} <br />
                      <span className="text-gradient-brand">
                        {activeCard.title.split(' ').slice(1).join(' ')}.
                      </span>
                    </h3>
                    <p className="text-muted-foreground font-medium text-base leading-relaxed max-w-lg">
                      {activeCard.modalContent.subtitle} <br />
                      <span className="text-foreground font-medium">{activeCard.modalContent.details}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCard(null)}
                    className="group shrink-0 p-2.5 rounded-full border border-border bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Servicios */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeCard.modalContent.features.map((feature, idx) => (
                    <div key={idx} className="card-premium rounded-2xl p-6 hover:-translate-y-0.5">
                      <div className={`w-10 h-10 rounded-xl ${activeCard.accent.tile} flex items-center justify-center mb-4`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-base tracking-tight text-foreground mb-1">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="border-glow relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-8 sm:p-10 text-center">
                  <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-gradient-to-r from-indigo-600/40 via-purple-500/30 to-cyan-500/40 blur-[70px] pointer-events-none" />
                  <div className="relative space-y-6">
                    <div className="space-y-3">
                      <h5 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em]">
                        {t('wellnessHub.activate')} <span className="text-gradient-brand">{t('wellnessHub.totalBoost')}</span>
                      </h5>
                      <p className="text-zinc-400 font-medium text-base leading-relaxed max-w-sm mx-auto">
                        {t('wellnessHub.modalFooter')}
                      </p>
                    </div>

                    <a
                      href="https://wa.me/573017219288?text=Hola!%20Quiero%20agendar%20una%20consultoria%20de%20"
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-indigo-500/20"
                    >
                      <span>{activeCard.modalContent.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

