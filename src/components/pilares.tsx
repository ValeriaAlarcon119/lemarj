"use client";
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight, Fingerprint, Target, Shield, RefreshCw, X, CheckCircle2, Layers } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

export function PilaresSection() {
  const { t } = useLanguage()
  const [selectedModulo, setSelectedModulo] = useState<typeof modulos[0] | null>(null)

  // Deshabilitar scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedModulo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [selectedModulo])

  const modulos = [
    {
      num: "01",
      title: t('pilares.m1.title'),
      desc: t('pilares.m1.desc'),
      icon: <Fingerprint className="w-5 h-5" />,
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20",
      accent: "text-indigo-600 dark:text-indigo-300",
      modalTitle: t('pilares.m1.modalTitle'),
      modalSubtitle: t('pilares.m1.modalSubtitle'),
      modalDesc: t('pilares.m1.modalDesc'),
      modalBenefits: [
        t('pilares.m1.b1'),
        t('pilares.m1.b2'),
        t('pilares.m1.b3')
      ],
      modalColor: "from-indigo-500/20 to-transparent",
      modalBorder: "border-indigo-500/30 ring-indigo-500/20",
      iconColor: "text-indigo-600 dark:text-indigo-300"
    },
    {
      num: "02",
      title: t('pilares.m2.title'),
      desc: t('pilares.m2.desc'),
      icon: <Target className="w-5 h-5" />,
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20",
      accent: "text-cyan-600 dark:text-cyan-300",
      modalTitle: t('pilares.m2.modalTitle'),
      modalSubtitle: t('pilares.m2.modalSubtitle'),
      modalDesc: t('pilares.m2.modalDesc'),
      modalBenefits: [
        t('pilares.m2.b1'),
        t('pilares.m2.b2'),
        t('pilares.m2.b3')
      ],
      modalColor: "from-cyan-500/20 to-transparent",
      modalBorder: "border-cyan-500/30 ring-cyan-500/20",
      iconColor: "text-cyan-600 dark:text-cyan-300"
    },
    {
      num: "03",
      title: t('pilares.m3.title'),
      desc: t('pilares.m3.desc'),
      icon: <Shield className="w-5 h-5" />,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-500/20",
      accent: "text-emerald-600 dark:text-emerald-300",
      modalTitle: t('pilares.m3.modalTitle'),
      modalSubtitle: t('pilares.m3.modalSubtitle'),
      modalDesc: t('pilares.m3.modalDesc'),
      modalBenefits: [
        t('pilares.m3.b1'),
        t('pilares.m3.b2'),
        t('pilares.m3.b3')
      ],
      modalColor: "from-emerald-500/20 to-transparent",
      modalBorder: "border-emerald-500/30 ring-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-300"
    },
    {
      num: "04",
      title: t('pilares.m4.title'),
      desc: t('pilares.m4.desc'),
      icon: <RefreshCw className="w-5 h-5" />,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-1 ring-purple-500/20",
      accent: "text-purple-600 dark:text-purple-300",
      modalTitle: t('pilares.m4.modalTitle'),
      modalSubtitle: t('pilares.m4.modalSubtitle'),
      modalDesc: t('pilares.m4.modalDesc'),
      modalBenefits: [
        t('pilares.m4.b1'),
        t('pilares.m4.b2'),
        t('pilares.m4.b3')
      ],
      modalColor: "from-purple-500/20 to-transparent",
      modalBorder: "border-purple-500/30 ring-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-300"
    }
  ]

  return (
    <section id="pilares" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4 relative z-10"
      >
        <span aria-hidden="true" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Layers className="w-4 h-4" />
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1]">
          {t('pilares.title1')} <br className="hidden sm:block" />
          <span className="text-gradient-brand">{t('pilares.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          {t('pilares.subtitle')}
        </p>
      </motion.div>

      <div className="relative z-10">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[300px] bg-gradient-to-r from-indigo-500/10 via-purple-400/10 to-cyan-400/10 blur-[90px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
          {modulos.map((modulo, i) => (
            <motion.div
              key={modulo.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              onClick={() => setSelectedModulo(modulo)}
              className="card-premium group cursor-pointer relative flex flex-col justify-between rounded-3xl p-8 sm:p-10 overflow-hidden isolate hover:-translate-y-1"
            >
              <div className="space-y-6 relative z-10 flex-1 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${modulo.color} transition-transform duration-500 group-hover:scale-110`}>
                    {modulo.icon}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/60">
                    {modulo.num}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight text-foreground">{modulo.title}</h3>
                  <p className="text-base text-muted-foreground font-medium leading-relaxed max-w-md">{modulo.desc}</p>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${modulo.accent}`}>
                  {t('pilares.explore')} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL / OVERLAY ELEGANTE */}
      {selectedModulo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">

          {/* Backdrop con Blur */}
          <div
            className="absolute inset-0 bg-background/70 dark:bg-zinc-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedModulo(null)}
          />

          {/* Contenedor del Modal */}
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-background border ${selectedModulo.modalBorder} ring-1 flex flex-col shadow-2xl shadow-indigo-500/10 animate-in zoom-in-[0.97] duration-300 isolate`}>

            {/* Luces internas */}
            <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl ${selectedModulo.modalColor} blur-[80px] -z-10 opacity-70 pointer-events-none`} />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-cyan-400/10 to-transparent blur-[60px] -z-10 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedModulo(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 ring-1 ring-foreground/10 transition-colors text-muted-foreground hover:text-foreground z-20"
            >
              <X className="w-5 h-5"/>
            </button>

            <div className="p-8 sm:p-10 relative z-10 space-y-6">
              {/* Encabezado */}
              <div className="flex items-start gap-4 sm:gap-5 pr-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selectedModulo.color}`}>
                  {selectedModulo.icon}
                </div>
                <div className="pt-0.5">
                  <div className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 ${selectedModulo.iconColor}`}>
                    {t('pilares.moduleLabel')} {selectedModulo.num}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight text-foreground">
                    {selectedModulo.modalTitle}
                  </h3>
                </div>
              </div>

              {/* Contenido (Venta e Impulso) */}
              <div className="space-y-5">
                <p className="text-lg sm:text-xl font-semibold text-foreground/90 leading-snug">
                  {selectedModulo.modalSubtitle}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                  {selectedModulo.modalDesc}
                </p>

                {/* Checkmarks / Beneficios */}
                <div className="card-premium space-y-3.5 p-6 rounded-2xl">
                  {selectedModulo.modalBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[15px] font-medium text-foreground/85 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Acción */}
            <div className="px-8 py-5 sm:px-10 sm:py-6 border-t border-foreground/10 flex flex-wrap gap-4 items-center justify-between bg-foreground/[0.02] relative z-10">
              <a
                href="https://wa.me/573017219288?text=Hola%20LEMARJ,%20estoy%20viendo%20los%20modulos%20y%20quiero%20conocer%20como%20aplicarlos%20a%20mi%20negocio"
                target="_blank"
                rel="noreferrer"
                className={`text-sm font-semibold underline decoration-2 underline-offset-4 ${selectedModulo.iconColor} hover:opacity-80 transition-opacity`}
              >
                {t('pilares.whatsappLink')}
              </a>
              <button
                onClick={() => setSelectedModulo(null)}
                className="px-6 py-2.5 rounded-xl font-semibold bg-foreground text-background hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-indigo-500/10"
              >
                {t('pilares.close')}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
