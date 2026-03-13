import { motion } from "framer-motion"
import { Award, Layout, Globe, Share2, Zap } from "lucide-react"

export function FreeWebsiteOffer() {
  return (
    <section className="py-16 relative overflow-hidden bg-transparent">

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mx-auto"
          >
            <Award className="w-4 h-4 text-indigo-400 animate-pulse" /> Anuncio Especial LEMARJ
          </motion.div>
          
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-foreground"
            >
              ¿Quieres impulsar tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
                visibilidad en línea?
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-semibold leading-relaxed max-w-3xl mx-auto text-balance"
            >
              Te obsequiamos tu sitio web totalmente <span className="px-4 py-1.5 rounded-2xl bg-indigo-200/40 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 font-black relative inline-block">GRATIS</span> con carrito de compras y conectado a todas tus redes.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 pt-4"
          >
            <FeatureItem icon={<Layout className="w-8 h-8" />} label="Carrito de Ventas" />
            <FeatureItem icon={<Globe className="w-8 h-8" />} label="Dominio Propio" />
            <FeatureItem icon={<Share2 className="w-8 h-8" />} label="Conexión Redes" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-8"
          >
            <a 
              href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20Quiero%20mi%20sitio%20web%20gratis" 
              className="group relative inline-flex h-20 px-16 items-center justify-center rounded-[2rem] bg-foreground text-background font-black uppercase tracking-[0.25em] text-[14px] shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-6 h-6 mr-4 text-indigo-400" />
              Iniciar camino en LEMARJ
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function FeatureItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 group hover:bg-indigo-500/10 transition-colors">
      <div className="text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}
