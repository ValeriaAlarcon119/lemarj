"use client";
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Palette, Calendar, ArrowUpRight, Users2, X, CheckCircle2, Zap, Brain, Sparkles, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const CARDS = (t: (key: string) => string) => [
  {
    id: "bienestar",
    icon: Heart,
    title: t('wellnessHub.cards.c0.title'),
    description: t('wellnessHub.cards.c0.desc'),
    tag: t('wellnessHub.cards.c0.tag'),
    color: "bg-pink-500",
    neonColor: "border-pink-300 dark:border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.2)]",
    hoverNeon: "hover:shadow-[0_0_50px_rgba(244,114,182,0.4)]",
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
    color: "bg-indigo-500",
    neonColor: "border-indigo-300 dark:border-indigo-400 shadow-[0_0_30px_rgba(129,140,248,0.2)]",
    hoverNeon: "hover:shadow-[0_0_50px_rgba(129,140,248,0.4)]",
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
    color: "bg-cyan-500",
    neonColor: "border-cyan-300 dark:border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    hoverNeon: "hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]",
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
    <section className="py-16 bg-transparent relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
                {t('wellnessHub.title')}
              </span>
            </h2>
            <p 
              className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `${t('wellnessHub.desc1')}<span class="text-foreground font-black">${t('wellnessHub.descBold')}</span>${t('wellnessHub.desc2')}`
              }}
            />
          </div>
          <motion.div 
            initial={{ rotate: -10, scale: 0.8 }}
            whileInView={{ rotate: 5, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block relative"
          >
            <div className="w-48 h-48 bg-indigo-500/10 rounded-full flex items-center justify-center p-8 backdrop-blur-3xl border-2 border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.1)]">
              <Users2 className="w-20 h-20 text-indigo-500" />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl animate-bounce" />
          </motion.div>
        </div>

        {/* Larger & Novel Design Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {cardsData.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative p-12 rounded-[4rem] bg-background/20 backdrop-blur-md border-2 ${card.neonColor} ${card.hoverNeon} transition-all duration-700 hover:-translate-y-6 flex flex-col items-center text-center`}
            >
              {/* Animated Background Glow per card */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none rounded-[4rem]`} />
              
              <div className={`w-24 h-24 rounded-[2rem] ${card.color} flex items-center justify-center text-white shadow-2xl mb-10 transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-110 relative z-10`}>
                <card.icon className="w-12 h-12" />
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="inline-block px-5 py-2 rounded-full bg-muted text-[11px] font-black uppercase tracking-[0.2em] text-[#a855f7] dark:text-[#a855f7]">
                  {card.tag}
                </div>
                <h3 className="text-3xl font-black leading-tight text-foreground px-4">
                  {card.title}
                </h3>
                <p className="text-lg text-muted-foreground/90 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              <div className="mt-12 w-full">
                <button 
                  onClick={() => setActiveCard(card)}
                  className="w-full h-14 rounded-2xl bg-muted/50 dark:bg-zinc-900/50 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 border border-border/50 group/btn"
                >
                  {t('wellnessHub.learnMore')} <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>

              {/* Floating element */}
              <div className={`absolute -bottom-4 -left-4 w-20 h-20 ${card.color} opacity-10 blur-3xl pointer-events-none animate-pulse`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Kit Modal - Hyper-Premium & Elegant Redesign */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[3rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20 overflow-y-auto max-h-[92vh] scrollbar-hide"
            >
              {/* Top Decorative Glow */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-${activeCard.color.replace('bg-', '')} to-transparent opacity-50`} />
              
              <div className="p-8 md:p-16 space-y-12 relative z-10">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                      {t('wellnessHub.exclusive')}
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
                      {activeCard.title.split(' ')[0]} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500">
                        {activeCard.title.split(' ').slice(1).join(' ')}.
                      </span>
                    </h3>
                    <p className="text-zinc-500 font-medium text-lg max-w-md leading-relaxed">
                      {activeCard.modalContent.subtitle} <br />
                      <span className="text-foreground font-bold italic">{activeCard.modalContent.details}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveCard(null)} 
                    className="group p-4 bg-zinc-50 dark:bg-zinc-900 rounded-full hover:scale-110 transition-all active:scale-95 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                  >
                    <X className="w-5 h-5 text-foreground group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Services Grid */}
                <div className="grid gap-6">
                  {activeCard.modalContent.features.map((feature, idx) => (
                    <div key={idx} className={`group p-8 rounded-[3rem] bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-8 items-center transition-all hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-xl`}>
                      <div className={`w-20 h-20 rounded-[2rem] ${activeCard.color} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-10 h-10" />
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <h4 className="font-black text-2xl text-foreground">{feature.title}</h4>
                        <p className="text-zinc-500 text-[15px] font-bold leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* High-End CTA Section */}
                <div className="relative p-1 rounded-[4rem] group mt-8 overflow-hidden">
                  <div className={`absolute inset-[-100%] bg-[conic-gradient(from_0deg,${activeCard.id === 'bienestar' ? '#ec4899' : activeCard.id === 'diseno' ? '#6366f1' : '#06b6d4'},transparent,${activeCard.id === 'bienestar' ? '#f472b6' : activeCard.id === 'diseno' ? '#818cf8' : '#22d3ee'},transparent)] animate-[spin_6s_linear_infinite] opacity-20`} />
                  
                  <div className="relative p-12 rounded-[3.8rem] bg-white dark:bg-zinc-950 flex flex-col items-center text-center space-y-10 border border-zinc-100 dark:border-zinc-800 shadow-2xl">
                    <div className="space-y-4">
                      <h5 className="font-black text-3xl tracking-tight text-foreground">
                        {t('wellnessHub.activate')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">{t('wellnessHub.totalBoost')}</span>
                      </h5>
                      <p className="text-zinc-500 font-bold text-lg leading-relaxed max-w-sm mx-auto">
                        {t('wellnessHub.modalFooter')}
                      </p>
                    </div>

                    <a 
                      href="https://wa.me/573017219288?text=Hola!%20Quiero%20agendar%20una%20consultoria%20de%20"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-16 px-16 items-center justify-center bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl relative group/btn overflow-hidden border border-border"
                    >
                      <span className="relative z-10 font-black">{activeCard.modalContent.ctaText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
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
