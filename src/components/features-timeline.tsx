import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ShieldCheck, MessageSquareText, Timer, Lock, HeartHandshake, Zap, Sparkles } from "lucide-react"

export function FeaturesTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const steps = [
    {
      num: "1",
      icon: <MessageSquareText className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-purple-500 to-indigo-600",
      glow: "bg-purple-500/20",
      title: "IA con Contexto Nariñense",
      desc: "Un agente amable, no un bot rígido. Entiende la jerga local, resuelve dudas complejas y guía directo al pago basándose 100% en tu catálogo.",
    },
    {
      num: "2",
      icon: <Timer className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-orange-400 to-rose-500",
      glow: "bg-orange-500/20",
      title: "Respuesta Inmediata",
      desc: "El 90% de las ventas caen a los 5 minutos. Tu IA responde en menos de 2 segundos, cerrando ventas antes de que tu competencia abra.",
    },
    {
      num: "3",
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-cyan-400 to-blue-600",
      glow: "bg-cyan-500/20",
      title: "Ventas Blindadas",
      desc: "Cero riesgos de bloqueos. Usamos la API oficial de Meta para darle a tu negocio el sello de verificación e higiene digital más alto.",
    },
    {
      num: "4",
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-emerald-400 to-teal-600",
      glow: "bg-emerald-500/20",
      title: "Privacidad de Datos",
      desc: "Tus clientes son tuyos. Cumplimiento total de la Ley 1581 con bases cifradas y privadas. Máxima autoridad legal para tu tranquilidad.",
    },
    {
       num: "5",
       icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />,
       color: "from-pink-400 to-rose-600",
       glow: "bg-rose-500/20",
       title: "Calidez Humana",
       desc: "Recomienda productos y cierra tratos transmitiendo la calidez y el excelente servicio al cliente característico de nuestra región.",
    },
    {
      num: "6",
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-indigo-400 to-purple-600",
      glow: "bg-indigo-500/20",
      title: "Catálogo Vivo en 24h",
      desc: "Cero códigos. Envíanos tu PDF y en menos de un día lo transformamos en el cerebro inteligente de tu negocio. Así de rápido.",
    }
  ]

  return (
    <section id="features" ref={containerRef} className="py-32 relative overflow-hidden bg-transparent">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-6 mb-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-3 h-3" /> Ingeniería Local
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-black tracking-tight leading-[1.1] text-foreground">
          Tecnología que <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
            impulsa las ventas en Pasto
          </span>
        </h2>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Connecting Line */}
        <div className="absolute left-[39px] sm:left-[59px] top-4 bottom-4 w-[4px] bg-muted/30 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />
        </div>

        <div className="space-y-32 sm:space-y-48">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative flex items-start gap-12 sm:gap-20 group"
            >
              
              {/* Node with Animated Glow */}
              <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-3xl sm:rounded-[2rem] bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                <div className={`relative z-10 w-full h-full rounded-3xl sm:rounded-[2rem] bg-white dark:bg-zinc-950 border-2 border-indigo-500/10 dark:border-white/10 shadow-xl flex items-center justify-center text-indigo-500 dark:text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-indigo-500/30 overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="p-4 sm:p-5 w-full h-full flex items-center justify-center transition-transform group-hover:scale-110">
                    {step.icon}
                  </div>
                </div>
                {/* Number float on node */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background text-[10px] font-black flex items-center justify-center shadow-lg border-2 border-background z-20">
                  {step.num}
                </div>
              </div>

              {/* Enhanced Content Section */}
              <div className="relative flex-1 pt-2 sm:pt-4">
                
                {/* Background Watermark Number - Large & Elegant */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0.05, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="absolute -top-16 sm:-top-24 -left-12 sm:-left-20 text-[10rem] sm:text-[14rem] font-black text-indigo-900 dark:text-white pointer-events-none select-none z-0"
                >
                  0{step.num}
                </motion.div>
                
                <div className="relative z-10 space-y-4">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl font-black text-foreground tracking-tight drop-shadow-sm"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-semibold max-w-xl text-balance"
                  >
                    {step.desc}
                  </motion.p>
                  
                  {/* Novelty: Minimalist Line Tag */}
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "3rem" }}
                    viewport={{ once: true }}
                    className={`h-1.5 rounded-full bg-gradient-to-r ${step.color} mt-6`}
                  />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
