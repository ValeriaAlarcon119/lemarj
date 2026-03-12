import { motion } from "framer-motion"
import { Users2, Package, BrainCircuit, TrendingDown, TrendingUp, Search } from "lucide-react"

export function ErpDashboard() {
  return (
    <section className="py-24 bg-transparent border-y border-border/50">
      <div className="container px-4 mx-auto">
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
                    <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Asesor Financiero con IA</h3>
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
            className="lg:col-span-4 bg-muted rounded-3xl p-8 border border-border shadow-lg flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Reclutamiento Inteligente</h3>
            </div>

            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <div className="w-full bg-background border rounded-lg py-2 pl-10 pr-4 text-sm text-muted-foreground italic">
                Buscando: Especialista en Ventas...
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {[
                { name: "Ana Maria G.", match: "98% Match", role: "Diseñadora Senior" },
                { name: "Carlos Ruiz", match: "92% Match", role: "Growth Hacker" },
                { name: "Diana Lopez", match: "89% Match", role: "Atención al Cliente" }
              ].map((candidate, i) => (
                <div key={i} className="bg-background p-3 rounded-xl border flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
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

          {/* Inventory Optimization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 bg-muted/50 rounded-3xl p-8 border border-dashed border-border flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Optimización de Inventario</h3>
              </div>
              <p className="text-muted-foreground max-w-xl">
                Nuestro sistema identifica productos con baja rotación (productos atrasados) y sugiere estrategias de salida para liberar capital de trabajo inmediatamente.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-background p-6 rounded-2xl border shadow-sm text-center min-w-[140px]">
                <div className="text-3xl font-bold text-red-500">12%</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Stock Atrasado</div>
              </div>
              <div className="bg-background p-6 rounded-2xl border shadow-sm text-center min-w-[140px]">
                <div className="text-3xl font-bold text-primary">45 d</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Rotación Media</div>
              </div>
              <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg text-center min-w-[160px] flex flex-col justify-center">
                <div className="text-sm font-bold">Liberar Capital</div>
                <div className="text-xs opacity-80">Sugerir combos</div>
              </div>
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
