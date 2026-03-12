import { motion } from "framer-motion"
import { TrendingUp, Zap, Newspaper, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const TRENDS = [
  {
    title: "Ventas 2.0: Lo último para vender maquillaje en Pasto",
    category: "Maquillaje & Belleza",
    growth: "+520%",
    image: "https://images.unsplash.com/photo-1596462502278-27bf2d370148?auto=format&fit=crop&q=80&w=800",
    color: "bg-pink-500/10 border-pink-500/20"
  },
  {
    title: "Estrategia Viral: Cómo dominar las ventas en TikTok e Instagram",
    category: "Social Selling",
    growth: "+310%",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    color: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    title: "WhatsApp Business: La herramienta definitiva para cerrar ventas",
    category: "Tips de Finanzas",
    growth: "+280%",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800",
    color: "bg-cyan-500/10 border-cyan-500/20"
  }
]

export function NewsBoost() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            >
              <Zap className="w-4 h-4 fill-primary" />
              <span>Impulso Viral</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
                Noticias e Impulso
              </span> <br /> para tu sector
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground font-medium"
            >
              Visualiza tendencias locales y tips de finanzas. <span className="text-foreground font-bold">Damos los mejores tips para venderte en la web</span> con estrategias actualizadas semanalmente para tu emprendimiento.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="group">
              Ver todas las noticias
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {TRENDS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`rounded-2xl border p-6 flex flex-col h-full bg-gray-900 border-gray-800 backdrop-blur-sm shadow-xl transition-all duration-300 ${item.color.replace('bg-', 'hover:border-').replace('/10', '/60')} hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}
            >
              <div className="relative h-48 rounded-xl overflow-hidden mb-6 group">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-2 py-1 rounded bg-black/50 backdrop-blur-md text-xs font-bold ring-1 ring-white/20">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  {item.growth}
                </div>
              </div>
              
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mb-4 line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mt-auto group/btn">
                <span>Leer más</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
