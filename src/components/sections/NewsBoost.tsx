import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Zap, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const TRENDS = [
  {
    title: "Ventas 2.0: Lo último para vender maquillaje en tu ciudad",
    category: "Maquillaje & Belleza",
    growth: "+520%",
    image: "https://images.unsplash.com/photo-1596462502278-27bf2d370148?auto=format&fit=crop&q=80&w=800",
    color: "bg-pink-500/10 border-pink-500/20",
    url: "https://www.cosmeticsdesign.com/Article/2023/06/21/How-social-media-is-shaping-the-future-of-the-beauty-industry"
  },
  {
    title: "Estrategia Viral: Cómo dominar las ventas en TikTok e Instagram",
    category: "Social Selling",
    growth: "+310%",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    color: "bg-indigo-500/10 border-indigo-500/20",
    url: "https://www.forbes.com/sites/forbesagencycouncil/2023/08/15/the-future-of-social-selling-trends-and-predictions/"
  },
  {
    title: "TikTok & Reels: Tips para que tus videos se hagan virales en días",
    category: "Diseño & Video",
    growth: "+680%",
    image: "https://images.unsplash.com/photo-1633174524778-61a18ee54490?auto=format&fit=crop&q=80&w=800",
    color: "bg-purple-500/10 border-purple-500/20",
    url: "https://www.socialmediaexaminer.com/how-to-go-viral-on-tiktok-reels-and-shorts/"
  }
]

export function NewsBoost() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-16 relative overflow-hidden bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Button size="lg" className="group" onClick={() => setIsModalOpen(true)}>
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

              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mt-auto group/btn"
              >
                <span>Leer más</span>
                <ExternalLink className="w-3 h-3 translate-y-[-1px] opacity-0 group-hover/btn:opacity-100 transition-all" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Noticia Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white">Centro de Tendencias</h3>
                  <p className="text-muted-foreground text-lg">
                    Estamos trabajando para traerte todas las noticias actualizadas minuto a minuto de tu sector.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 text-center space-y-4">
                  <p className="font-bold text-indigo-400 italic">"Los mejores tips para mejorar la imagen de tu negocio con diseño, videos y reels que se harán virales en días."</p>
                  <p className="text-sm text-muted-foreground">Próximamente sección dedicada a contenido viral.</p>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" onClick={() => setIsModalOpen(false)}>
                    Entendido
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
