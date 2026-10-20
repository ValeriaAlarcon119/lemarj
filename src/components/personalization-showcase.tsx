"use client";
import { useState } from "react"
import { motion } from "framer-motion"
import { BotOff, Compass, Stethoscope, Store, UtensilsCrossed, Star } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

export function PersonalizationShowcase() {
  const { t } = useLanguage()
  const [activeTone, setActiveTone] = useState<0 | 1 | 2>(0)

  const tones = [
    {
      id: 0,
      name: t('personalizationShowcase.t0.name'),
      icon: <Store className="w-5 h-5" />,
      color: "from-indigo-500",
      bgSelected: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-200",
      iconTint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-indigo-500/20",
      description: t('personalizationShowcase.t0.desc'),
      robotMsg: t('personalizationShowcase.t0.robotMsg'),
      lemarjMsg: t('personalizationShowcase.t0.lemarjMsg'),
      aiColor: "from-indigo-600 to-indigo-400"
    },
    {
      id: 1,
      name: t('personalizationShowcase.t1.name'),
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-cyan-400",
      bgSelected: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-200",
      iconTint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-cyan-500/20",
      description: t('personalizationShowcase.t1.desc'),
      robotMsg: t('personalizationShowcase.t1.robotMsg'),
      lemarjMsg: t('personalizationShowcase.t1.lemarjMsg'),
      aiColor: "from-indigo-600 to-cyan-500"
    },
    {
      id: 2,
      name: t('personalizationShowcase.t2.name'),
      icon: <UtensilsCrossed className="w-5 h-5" />,
      color: "from-purple-400",
      bgSelected: "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-200",
      iconTint: "bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-purple-500/20",
      description: t('personalizationShowcase.t2.desc'),
      robotMsg: t('personalizationShowcase.t2.robotMsg'),
      lemarjMsg: t('personalizationShowcase.t2.lemarjMsg'),
      aiColor: "from-purple-600 to-indigo-500"
    }
  ]

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      {/* Cabecera de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4 max-w-3xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <BotOff className="w-3.5 h-3.5" />
          {t('personalizationShowcase.badge')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1]">
          {t('personalizationShowcase.title1')}
          <span className="block sm:inline text-gradient-brand">{t('personalizationShowcase.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
          {t('personalizationShowcase.desc1')}
          <strong className="font-semibold text-foreground">{t('personalizationShowcase.desc2')}</strong>
          {t('personalizationShowcase.desc3')}
        </p>
      </motion.div>

      {/* Tablero interactivo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="card-premium grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch p-5 sm:p-8 rounded-[2rem]"
      >
        {/* Columna izquierda: selector */}
        <div className="lg:col-span-5 flex flex-col">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 mb-5 flex items-center gap-2">
            <Compass className="w-4 h-4" /> {t('personalizationShowcase.choosePersonality')}
          </h3>
          <div className="flex flex-col gap-3">
            {tones.map((tone) => {
              const active = activeTone === tone.id
              return (
                <button
                  key={tone.id}
                  onClick={() => setActiveTone(tone.id as typeof activeTone)}
                  className={`relative flex items-center justify-start gap-4 p-4 w-full text-left rounded-2xl font-bold transition-all duration-300 isolate overflow-hidden group border
                    ${active
                      ? `${tone.bgSelected} shadow-sm`
                      : "bg-foreground/[0.02] hover:bg-foreground/[0.05] border-foreground/[0.08] text-foreground/75 hover:-translate-y-0.5"
                    }
                  `}
                >
                  {/* Indicador lateral activo */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${tone.color} to-transparent origin-top transition-transform duration-300 ${active ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`} />

                  <div className={`w-10 h-10 rounded-xl ring-1 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${tone.iconTint}`}>
                    {tone.icon}
                  </div>
                  <span className="text-[15px] sm:text-base tracking-tight">{tone.name}</span>
                </button>
              )
            })}
          </div>

          <div className="pt-5 min-h-20">
            <p className="text-sm font-medium text-muted-foreground leading-relaxed animate-in fade-in zoom-in duration-500" key={`desc-${activeTone}`}>
              {tones[activeTone].description}
            </p>
          </div>
        </div>

        {/* Columna derecha: chat comparativo */}
        <div className="lg:col-span-7 relative">
          <div className="border-glow relative bg-zinc-950 text-white h-full min-h-[400px] rounded-3xl overflow-hidden flex flex-col pt-6 pb-8 px-5 sm:px-8 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.5)]">
            <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-600/40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

            {/* Título de demostración */}
            <div className="relative text-center mb-8 border-b border-white/10 pb-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">{t('personalizationShowcase.comparisonLabel')}</span>
            </div>

            {/* Bot clásico */}
            <div className="relative space-y-2 mb-8 animate-in slide-in-from-right-4 fade-in duration-700 delay-100 fill-mode-both" key={`robot-${activeTone}`}>
              <div className="flex items-center gap-2 mb-2 ml-1">
                <BotOff className="w-4 h-4 text-rose-300" />
                <span className="text-xs font-semibold text-rose-300">{t('personalizationShowcase.genericBot')}</span>
              </div>
              <div className="bg-white/5 text-white/60 px-5 py-4 inline-block max-w-[90%] rounded-[1.5rem] rounded-tl-sm text-[15px] font-medium leading-relaxed ring-1 ring-white/10">
                {tones[activeTone].robotMsg}
              </div>
            </div>

            {/* LEMARJ inteligente */}
            <div className="relative space-y-2 mt-auto animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both" key={`lemarj-${activeTone}`}>
              <div className="flex items-center gap-2 justify-end mb-2 mr-1">
                <span className="text-xs font-semibold text-white/85">{t('personalizationShowcase.lemarjEngine')}</span>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/40">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <div className="flex justify-end relative">
                {/* Brillo detrás de la burbuja activa */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tones[activeTone].aiColor} blur-[30px] opacity-25`} />

                <div className={`bg-gradient-to-r ${tones[activeTone].aiColor} text-white px-5 py-4 inline-block max-w-[95%] rounded-[1.5rem] rounded-tr-[4px] text-[16px] xl:text-[17px] font-semibold leading-snug shadow-xl relative z-10 ring-1 ring-white/15`}>
                  {tones[activeTone].lemarjMsg}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
