import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Palette, Calendar, ArrowUpRight, Sparkles, X, CheckCircle2 } from "lucide-react"

const CARDS = [
  {
    icon: Heart,
    title: "Mentalidad y Bienestar de Negocios",
    description: "Conexión con psicólogos especializados en bienestar emocional para emprendedores.",
    tag: "Bienestar",
    color: "bg-pink-500",
    neonColor: "border-pink-300 dark:border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.2)]",
    hoverNeon: "hover:shadow-[0_0_50px_rgba(244,114,182,0.4)]"
  },
  {
    icon: Palette,
    title: "Hub de Diseño",
    description: "Asesoría en branding, logotipos y publicidad con diseñadores de alto nivel.",
    tag: "Creatividad",
    color: "bg-indigo-500",
    neonColor: "border-indigo-300 dark:border-indigo-400 shadow-[0_0_30px_rgba(129,140,248,0.2)]",
    hoverNeon: "hover:shadow-[0_0_50px_rgba(129,140,248,0.4)]"
  },
  {
    icon: Calendar,
    title: "Calendarización Estratégica",
    description: "Alertas de fechas especiales y tendencias estacionales para ir un paso adelante.",
    tag: "Estrategia",
    color: "bg-cyan-500",
    neonColor: "border-cyan-300 dark:border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    hoverNeon: "hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]"
  }
]

export function WellnessHub() {
  const [isKitModalOpen, setIsKitModalOpen] = useState(false)

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Smooth Background Transition Elment */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
                Bienestar y Red de Expertos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              No estás solo en esto. Te conectamos con los <span className="text-foreground font-black">mejores profesionales</span> y herramientas para crecer exponencialmente sin descuidar tu paz mental.
            </p>
          </div>
          <motion.div 
            initial={{ rotate: -10, scale: 0.8 }}
            whileInView={{ rotate: 5, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block relative"
          >
            <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center p-8 backdrop-blur-xl border-2 border-primary/20">
              <Sparkles className="w-20 h-20 text-primary animate-pulse" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500 rounded-full blur-xl opacity-50 animate-bounce" />
          </motion.div>
        </div>

        {/* Larger & Novel Design Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative p-12 rounded-[4rem] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-2 ${card.neonColor} ${card.hoverNeon} transition-all duration-700 hover:-translate-y-6 flex flex-col items-center text-center`}
            >
              {/* Novelty: Animated Background Glow per card - ALWAYS VISIBLE */}
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
                  onClick={() => setIsKitModalOpen(true)}
                  className="w-full h-14 rounded-2xl bg-muted/50 dark:bg-zinc-900/50 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 border border-border/50 group/btn"
                >
                  Saber más <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>

              {/* Floating Novelty element */}
              <div className={`absolute -bottom-4 -left-4 w-20 h-20 ${card.color} opacity-10 blur-3xl pointer-events-none animate-pulse`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Kit Modal (Existing logic preserved, but styled better) */}
      <AnimatePresence>
        {isKitModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsKitModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[3rem] border-2 border-[#a855f7]/30 shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <div className="p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black tracking-tight">Kits de Impulso</h3>
                    <p className="text-muted-foreground font-medium">Sitios web y estrategias según tus necesidades</p>
                  </div>
                  <button onClick={() => setIsKitModalOpen(false)} className="p-2 bg-muted/50 rounded-full hover:bg-muted transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid gap-6">
                  <div className="p-8 rounded-[2rem] bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border-2 border-cyan-400/40 dark:border-cyan-400/20 flex flex-col sm:flex-row gap-6 items-center shadow-lg shadow-cyan-500/5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-xl">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-1 text-foreground">Sitio Web Gratuito</h4>
                      <p className="text-muted-foreground text-[16px] font-medium leading-relaxed italic">Incluido con nuestra suscripción mensual de IA de ventas.</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-2 border-pink-400/40 dark:border-pink-400/20 flex flex-col sm:flex-row gap-6 items-center shadow-lg shadow-pink-500/5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-xl">
                      <Palette className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-1 text-foreground">Diseño por Catálogo</h4>
                      <p className="text-muted-foreground text-[16px] font-medium leading-relaxed">Se cobra según la cantidad de productos y complejidad de ventas.</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white text-center space-y-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-xl font-bold relative z-10">Ofrecemos todos los servicios de impulso en redes si compras la suscripción.</p>
                  <a 
                    href="https://wa.me/573017219288?text=Hola!%20Quiero%20cotizar%20un%20kit%20de%20sitio%20web"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-16 px-12 items-center justify-center bg-white text-indigo-600 font-black uppercase tracking-[0.2em] text-[13px] rounded-2xl hover:scale-105 transition-all shadow-xl relative z-10"
                  >
                    Cotizar Ahora
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
