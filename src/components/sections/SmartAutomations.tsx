import { motion } from "framer-motion"
import { Bell, Clock, ShoppingBag, MessageSquare, Zap, CheckCircle2 } from "lucide-react"

const FEATURES = [
  {
    icon: Bell,
    title: "Recordatorios Inteligentes",
    description: "Notificaciones automáticas para promociones, combos o lanzamientos personalizados.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: Zap,
    title: "Activador de Re-conexión",
    description: "Activa automáticamente a usuarios que llevan más de 60 días sin realizar una compra.",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    icon: Clock,
    title: "Ventas Automáticas 24/7",
    description: "Tu negocio sigue operando y cotizando incluso cuando las puertas físicas están cerradas.",
    color: "text-green-500",
    bg: "bg-green-500/10"
  }
]

export function SmartAutomations() {
  return (
    <section className="py-16 bg-transparent">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
                Automatizaciones
              </span> <br /> que trabajan por ti
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground font-medium"
            >
              Liberamos tu tiempo. Nuestros motores de IA gestionan recordatorios, cobranzas y re-conexión de clientes sin que muevas un dedo.
            </motion.p>

            <div className="space-y-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-background transition-colors"
                >
                  <div className={`shrink-0 w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background rounded-3xl border shadow-2xl overflow-hidden">
              <div className="p-6 border-b bg-muted/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">crm_automations.v1</div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {/* Mock Activity */}
                  <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl border border-primary/10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      LC
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">Luis Castillo</div>
                      <div className="text-xs text-muted-foreground">Inactividad: 62 días</div>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-[10px] font-bold uppercase">
                      Trigger Activo
                    </div>
                  </div>

                  <div className="relative pl-12 pb-2">
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border dashed" />
                    
                    <div className="relative mb-6">
                      <div className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-200 dark:border-blue-900">
                        <p className="text-xs font-medium">WhatsApp enviado: "¡Te extrañamos Luis! Mira este combo especial para ti."</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <ShoppingBag className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-green-500/5 p-3 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="text-xs font-medium">Conversión: Compra realizada ($120.000 COP) - 15:30h</p>
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-green-600 font-bold uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Éxito de automatización
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
