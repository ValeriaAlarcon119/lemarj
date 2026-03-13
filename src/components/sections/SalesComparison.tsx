import { motion } from "framer-motion"
import { Frown, Zap, FileText, Image as ImageIcon, MessageCircle } from "lucide-react"

export function SalesComparison() {
  return (
    <section className="py-16 relative overflow-hidden bg-transparent">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* FRUSTRATION SIDE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 rounded-[3.5rem] bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 relative group flex flex-col h-full"
          >
            <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Frown className="w-16 h-16 text-zinc-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black mb-6 text-zinc-400 uppercase tracking-widest text-[10px]">El problema común</h3>
              <h4 className="text-3xl font-extrabold mb-6 leading-tight text-zinc-800 dark:text-zinc-200">¿Frustrado por esperar una respuesta?</h4>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-8">
                Escribes a un negocio y pasan horas (o días). La atención personalizada es lenta, los mensajes se pierden y el cliente termina comprando en otro lugar.
              </p>
            </div>
            <div className="space-y-4 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex items-center gap-3 text-sm font-bold text-zinc-500"><div className="w-2 h-2 rounded-full bg-zinc-400" /> Visto sin respuesta</div>
              <div className="flex items-center gap-3 text-sm font-bold text-zinc-500"><div className="w-2 h-2 rounded-full bg-zinc-400" /> Errores en precios</div>
              <div className="flex items-center gap-3 text-sm font-bold text-zinc-500"><div className="w-2 h-2 rounded-full bg-zinc-400" /> Cliente impaciente</div>
            </div>
          </motion.div>

          {/* LEMARJ FLOW SIDE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[3.5rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-[2px] shadow-2xl shadow-indigo-500/20 flex flex-col h-full"
          >
            <div className="bg-white dark:bg-zinc-950 rounded-[3.4rem] p-8 md:p-10 h-full w-full flex flex-col space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest w-fit">
                <Zap className="w-3 h-3 animate-pulse" /> Solución LEMARJ
              </div>
              <div className="flex-1 space-y-6">
                <h4 className="text-3xl font-black leading-tight text-foreground">
                  Ventas inteligentes y <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
                    asesoría inmediata
                  </span>
                </h4>
                <p className="text-muted-foreground text-lg font-semibold leading-relaxed">
                  Nuestra IA asesora al instante, envía fotos personalizadas de tus productos y documentos PDF en segundos.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pb-2">
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/10 flex flex-col items-center text-center gap-3 group/item hover:bg-indigo-500 hover:text-white transition-all duration-500">
                  <FileText className="w-6 h-6 text-indigo-500 group-hover/item:text-white" />
                  <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 group-hover/item:text-white">Envío de PDF</span>
                </div>
                <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-500/10 flex flex-col items-center text-center gap-3 group/item hover:bg-cyan-500 hover:text-white transition-all duration-500">
                  <ImageIcon className="w-6 h-6 text-cyan-500 group-hover/item:text-white" />
                  <span className="text-[11px] font-black uppercase text-cyan-600 dark:text-cyan-400 group-hover/item:text-white">Fotos Pro</span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-500/10 flex flex-col items-center text-center gap-3 col-span-2 group/item hover:bg-purple-500 hover:text-white transition-all duration-500">
                  <MessageCircle className="w-6 h-6 text-purple-500 group-hover/item:text-white" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 group-hover/item:text-white">Asesoría 24/7 de Alta Fidelidad</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
