"use client";
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight, Fingerprint, Target, Shield, RefreshCw, X, CheckCircle2 } from "lucide-react"
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
      icon: <Fingerprint className="w-8 h-8" />,
      color: "from-indigo-500/20 to-transparent border-indigo-500/20 text-indigo-500",
      accent: "text-indigo-600 dark:text-indigo-400",
      modalTitle: t('pilares.m1.modalTitle'),
      modalSubtitle: t('pilares.m1.modalSubtitle'),
      modalDesc: t('pilares.m1.modalDesc'),
      modalBenefits: [
        t('pilares.m1.b1'),
        t('pilares.m1.b2'),
        t('pilares.m1.b3')
      ],
      modalColor: "from-indigo-500/10 to-transparent",
      modalBorder: "border-indigo-500/40 dark:border-indigo-500/50 ring-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.2)] dark:shadow-[0_0_60px_rgba(79,70,229,0.2)]",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      num: "02",
      title: t('pilares.m2.title'),
      desc: t('pilares.m2.desc'),
      icon: <Target className="w-8 h-8" />,
      color: "from-cyan-500/20 to-transparent border-cyan-500/20 text-cyan-500",
      accent: "text-cyan-600 dark:text-cyan-400",
      modalTitle: t('pilares.m2.modalTitle'),
      modalSubtitle: t('pilares.m2.modalSubtitle'),
      modalDesc: t('pilares.m2.modalDesc'),
      modalBenefits: [
        t('pilares.m2.b1'),
        t('pilares.m2.b2'),
        t('pilares.m2.b3')
      ],
      modalColor: "from-cyan-500/10 to-transparent",
      modalBorder: "border-cyan-500/40 dark:border-cyan-500/50 ring-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] dark:shadow-[0_0_60px_rgba(8,145,178,0.2)]",
      iconColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      num: "03",
      title: t('pilares.m3.title'),
      desc: t('pilares.m3.desc'),
      icon: <Shield className="w-8 h-8" />,
      color: "from-emerald-500/20 to-transparent border-emerald-500/20 text-emerald-500",
      accent: "text-emerald-600 dark:text-emerald-400",
      modalTitle: t('pilares.m3.modalTitle'),
      modalSubtitle: t('pilares.m3.modalSubtitle'),
      modalDesc: t('pilares.m3.modalDesc'),
      modalBenefits: [
        t('pilares.m3.b1'),
        t('pilares.m3.b2'),
        t('pilares.m3.b3')
      ],
      modalColor: "from-emerald-500/10 to-transparent",
      modalBorder: "border-emerald-500/40 dark:border-emerald-500/50 ring-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)] dark:shadow-[0_0_60px_rgba(5,150,105,0.2)]",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      num: "04",
      title: t('pilares.m4.title'),
      desc: t('pilares.m4.desc'),
      icon: <RefreshCw className="w-8 h-8" />,
      color: "from-violet-500/20 to-transparent border-violet-500/20 text-violet-500",
      accent: "text-violet-600 dark:text-violet-400",
      modalTitle: t('pilares.m4.modalTitle'),
      modalSubtitle: t('pilares.m4.modalSubtitle'),
      modalDesc: t('pilares.m4.modalDesc'),
      modalBenefits: [
        t('pilares.m4.b1'),
        t('pilares.m4.b2'),
        t('pilares.m4.b3')
      ],
      modalColor: "from-violet-500/10 to-transparent",
      modalBorder: "border-violet-500/40 dark:border-violet-500/50 ring-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.2)] dark:shadow-[0_0_60px_rgba(124,58,237,0.2)]",
      iconColor: "text-violet-600 dark:text-violet-400"
    }
  ]

  return (
    <section id="pilares" className="py-20 relative">
      <div className="text-center space-y-6 mb-20 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold tracking-tight pb-2 leading-[1.1] text-[#0a0a0a] dark:text-white">
          {t('pilares.title1')} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400 tracking-tight">
            {t('pilares.title2')}
          </span>
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          {t('pilares.subtitle')}
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-16">
        {/* Línea conectora animada (Desktop - Rediseñada para 2x2) */}
        <div className="hidden md:block absolute top-[140px] left-[200px] right-[200px] h-[3px] overflow-hidden rounded-full pointer-events-none opacity-30">
          <div className="w-full h-full bg-indigo-500/20" />
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 relative z-10">
          {modulos.map((modulo) => (
            <div 
              key={modulo.num}
              onClick={() => setSelectedModulo(modulo)}
              className="group cursor-pointer relative flex flex-col justify-between p-10 sm:p-14 rounded-[3.5rem] border-2 border-black/80 dark:border-white/20 bg-white dark:bg-zinc-950 transition-all duration-500 hover:-translate-y-3 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-2xl overflow-hidden isolate"
            >
              <div className="space-y-10 relative z-10 flex-1 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className={`w-20 h-20 rounded-[2rem] border-2 border-black dark:border-white shadow-xl bg-white dark:bg-zinc-900 flex items-center justify-center ${modulo.iconColor} transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    {modulo.icon}
                  </div>
                  <span className="text-3xl font-black text-black dark:text-white/80 transition-all duration-300 group-hover:scale-125 drop-shadow-sm">
                    {modulo.num}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.1] text-black dark:text-white`}>{modulo.title}</h3>
                  <p className="text-lg text-[#475569] dark:text-slate-400 font-medium leading-relaxed max-w-md">{modulo.desc}</p>
                </div>
              </div>

              <div className="pt-12 relative z-10">
                <div className={`inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-black dark:text-white group-hover:translate-x-4 transition-all duration-300`}>
                  {t('pilares.explore')} <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL / OVERLAY ELEGANTE */}
      {selectedModulo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          
          {/* Backdrop con Blur */}
          <div 
            className="absolute inset-0 bg-background/60 dark:bg-zinc-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedModulo(null)}
          />
          
          {/* Contenedor del Modal */}
          <div className={`relative w-full max-w-2xl rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border ${selectedModulo.modalBorder} ring-1 overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-[0.97] duration-300`}>
            
            {/* Sombras / Luces Neon internas para elegancia */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${selectedModulo.modalColor} blur-[80px] -z-10 opacity-70 pointer-events-none`} />
            <div className={`absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr ${selectedModulo.modalColor} blur-[60px] -z-10 opacity-50 pointer-events-none`} />

            {/* Close Button */}
            <button 
              onClick={() => setSelectedModulo(null)} 
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500 z-20 backdrop-blur-sm"
            >
              <X className="w-5 h-5"/>
            </button>

            <div className="p-8 sm:p-12 relative z-10 space-y-8">
              {/* Encabezado */}
              <div className="flex items-start gap-5 sm:gap-6">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] flex items-center justify-center shrink-0 border bg-gradient-to-br ${selectedModulo.modalColor} ${selectedModulo.iconColor} shadow-inner bg-white dark:bg-zinc-900`}>
                  {selectedModulo.icon}
                </div>
                <div className="pt-1">
                  <div className={`text-[11px] font-black tracking-widest uppercase mb-1.5 opacity-80 ${selectedModulo.iconColor}`}>
                    {t('pilares.moduleLabel')} {selectedModulo.num}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#0a0a0a] dark:text-white leading-[1.1] tracking-tight">
                    {selectedModulo.modalTitle}
                  </h3>
                </div>
              </div>

              {/* Contenido (Venta e Impulso) */}
              <div className="space-y-6 mt-4 pl-1">
                <p className="text-lg sm:text-xl font-bold text-foreground/90 leading-snug">
                  {selectedModulo.modalSubtitle}
                </p>
                <p className="text-[16px] text-muted-foreground leading-relaxed font-medium pb-2">
                  {selectedModulo.modalDesc}
                </p>
                
                {/* Checkmarks / Beneficios */}
                <div className="space-y-4 bg-zinc-50/50 dark:bg-zinc-900/30 p-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50">
                  {selectedModulo.modalBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${selectedModulo.iconColor} drop-shadow-sm`} />
                      <span className="text-[15px] sm:text-[16px] font-semibold text-foreground/80 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Acción */}
            <div className="px-8 py-6 sm:px-12 sm:py-8 border-t border-border/40 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-xl relative z-10">
               <a 
                href="https://wa.me/573017219288?text=Hola%20LEMARJ,%20estoy%20viendo%20los%20modulos%20y%20quiero%20conocer%20como%20aplicarlos%20a%20mi%20negocio" 
                target="_blank" 
                rel="noreferrer"
                className={`text-[14px] font-bold underline decoration-2 underline-offset-4 ${selectedModulo.iconColor} hover:opacity-80 transition-opacity`}
              >
                {t('pilares.whatsappLink')}
              </a>
              <button 
                onClick={() => setSelectedModulo(null)} 
                className="px-8 py-3 rounded-2xl font-extrabold bg-[#0a0a0a] text-white dark:bg-white dark:text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all shadow-lg"
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
