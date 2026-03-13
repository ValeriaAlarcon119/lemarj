import { motion } from "framer-motion"
import { Users2, Package, BarChart3, TrendingDown, TrendingUp, Search, ArrowUpRight } from "lucide-react"

export function ErpDashboard() {
  return (
    <section className="py-16 bg-transparent border-t border-border/50">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
              Asesoría de Finanzas Personalizadas
            </span> <br /> según tus ventas con IA
          </motion.h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto">
            Mantenemos actualizando las <span className="text-foreground font-bold">mejores recomendaciones de marketing</span> para tu sector y tu emprendimiento, impulsadas por un análisis profundo de tu flujo de caja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* AI Financial Advisor */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-gray-900 rounded-3xl p-8 border border-gray-800 relative overflow-hidden group shadow-2xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Asesor Financiero</h3>
                    <p className="text-sm text-gray-400">Análisis de flujo de caja en tiempo real</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase">
                  Conectado a APIs Financieras
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Ingresos este mes</span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">$12.450.000 COP</div>
                    <div className="text-xs text-green-400 mt-1">+12% vs mes anterior</div>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Gastos operativos</span>
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">$4.200.000 COP</div>
                    <div className="text-xs text-red-400 mt-1">-5% optimizado por IA</div>
                  </div>
                </div>

                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 flex flex-col">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                      <Zap className="w-4 h-4" />
                      Estrategia de Crecimiento
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-primary pl-4">
                      "Tu sector está mostrando una tendencia alcista en pedidos nocturnos. Recomendamos activar el 'Boost de Marketing' personalizado para tu catálogo actual y optimizar el stock de tus productos estrella para el próximo fin de semana."
                    </p>
                    <button className="mt-auto text-primary text-sm font-bold hover:underline py-2 text-left">
                      Activar Recomendación Personalizada
                    </button>
                  </div>
              </div>
            </div>
            
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Smart Recruitment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 bg-muted/30 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-lg flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Reclutamiento Inteligente</h3>
            </div>

            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <div className="w-full bg-background/50 border rounded-lg py-2 pl-10 pr-4 text-sm text-muted-foreground italic">
                Buscando: Especialista en Ventas...
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {[
                { name: "Ana Maria G.", match: "98% Match", role: "Diseñadora Senior" },
                { name: "Carlos Ruiz", match: "92% Match", role: "Growth Hacker" },
                { name: "Diana Lopez", match: "89% Match", role: "Atención al Cliente" }
              ].map((candidate, i) => (
                <div key={i} className="bg-background/50 p-3 rounded-xl border flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                  <div>
                    <div className="text-sm font-bold">{candidate.name}</div>
                    <div className="text-[10px] text-muted-foreground">{candidate.role}</div>
                  </div>
                  <div className="text-[11px] font-bold text-green-600 bg-green-500/10 px-2 py-1 rounded">
                    {candidate.match}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
              Publicar Vacante
            </button>
          </motion.div>

          {/* Inventory Optimization - REDESIGNED with animated border and pastel colors */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 relative p-[2px] rounded-[3rem] overflow-hidden group"
          >
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0,transparent_25%,rgba(99,102,241,0.5)_50%,transparent_75%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative h-full w-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-[calc(3rem-2px)] p-8 md:p-12 border border-border/50 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-inner">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground">Optimización de Inventario</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl font-medium">
                  Nuestro sistema identifica productos con baja rotación (productos atrasados) y sugiere estrategias de salida para liberar capital de trabajo inmediatamente.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <div className="bg-pink-500/5 dark:bg-pink-500/10 px-8 py-6 rounded-[2.5rem] border border-pink-500/20 shadow-sm text-center min-w-[160px] group/item hover:scale-105 transition-transform duration-500">
                  <div className="text-4xl font-black text-pink-500 mb-2">12%</div>
                  <div className="text-[10px] text-pink-600 dark:text-pink-400 uppercase font-black tracking-[0.2em]">Stock Atrasado</div>
                </div>
                <div className="bg-indigo-500/5 dark:bg-indigo-500/10 px-8 py-6 rounded-[2.5rem] border border-indigo-500/20 shadow-sm text-center min-w-[160px] group/item hover:scale-105 transition-transform duration-500">
                  <div className="text-4xl font-black text-indigo-500 mb-2">45 d</div>
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-black tracking-[0.2em]">Rotación Media</div>
                </div>
                <div className="bg-zinc-950 dark:bg-white text-white dark:text-black px-10 py-6 rounded-[2.5rem] shadow-xl text-center min-w-[180px] flex flex-col justify-center group/item hover:scale-105 transition-transform duration-500 cursor-pointer border border-white/10 dark:border-black/10">
                  <div className="text-lg font-black leading-tight flex items-center justify-center gap-2">
                    Liberar Capital <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs opacity-70 mt-1 font-bold">Sugerir combos</div>
                </div>
              </div>

              {/* Decorative Pastel Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Zap({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
