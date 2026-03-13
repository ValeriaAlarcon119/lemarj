import { motion } from "framer-motion"
import { Palette, TrendingUp, Landmark, Share2, Zap } from "lucide-react"

export function ExpertTips() {
  return (
    <section className="py-16 relative overflow-hidden bg-transparent">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mx-auto"
          >
            <Zap className="w-3 h-3 animate-pulse" /> Valor Agregado LEMARJ
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            Más que una herramienta, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              tu aliado estratégico
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            Te ayudamos con los mejores tips de diseño, finanzas, marketing, visibilidad en línea y lo más actualizado del comercio para que conectes con tus mejores clientes y proveedores.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <TipCard 
            icon={<Palette className="w-6 h-6" />} 
            title="Diseño Viral" 
            desc="Imagen de negocio impactante" 
            delay={0.1}
          />
          <TipCard 
            icon={<Landmark className="w-6 h-6" />} 
            title="Finanzas" 
            desc="Optimización de ingresos" 
            delay={0.2}
          />
          <TipCard 
            icon={<TrendingUp className="w-6 h-6" />} 
            title="Marketing" 
            desc="Estrategias de crecimiento" 
            delay={0.3}
          />
          <TipCard 
            icon={<Share2 className="w-6 h-6" />} 
            title="Visibilidad" 
            desc="Presencia digital sólida" 
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}

function TipCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-6 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-black text-sm uppercase tracking-wider">{title}</h4>
        <p className="text-[11px] text-muted-foreground font-medium leading-tight">{desc}</p>
      </div>
    </motion.div>
  )
}
