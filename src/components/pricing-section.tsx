import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section id="planes" className="py-16 bg-transparent">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-2">
            Planes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">personalizados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            No cobramos por módulo, cobramos por impacto. 
            <span className="text-foreground font-bold"> Nos ajustamos a todos los presupuestos</span> según tu flujo en redes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* EMPRENDEDOR IA */}
          <div className="bg-background/40 backdrop-blur-sm border border-purple-400/60 rounded-[2.5rem] p-8 shadow-[0_0_20px_rgba(192,132,252,0.3)] flex flex-col items-start gap-6 border-dashed hover:border-purple-400 transition-all duration-500 hover:shadow-[0_0_35px_rgba(192,132,252,0.4)]">
            <div className="w-full">
              <h3 className="text-xl font-bold uppercase tracking-widest text-muted-foreground/50 text-xs mb-2">Iniciación</h3>
              <h4 className="text-2xl font-extrabold">Emprendedor IA</h4>
              <p className="mt-4 text-sm text-muted-foreground">Para emprendedores locales que inician su viaje digital.</p>
            </div>
            <ul className="space-y-3 w-full flex-1">
              <li className="flex gap-3 text-sm font-medium"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> 1 número de WhatsApp</li>
              <li className="flex gap-3 text-sm font-medium"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> IA con catálogo PDF</li>
              <li className="flex gap-3 text-sm font-medium"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Respuestas 24/7</li>
            </ul>
            <a href="https://wa.me/573017219288?text=Hola%20LEMARJ,%20quiero%20cotizar%20mi%20plan%20Emprendedor" target="_blank" rel="noreferrer" className="w-full mt-auto block text-center rounded-xl border border-purple-200/50 hover:bg-purple-50 py-3 font-bold transition-colors text-sm">
              Solicitar Cotización
            </a>
          </div>

          {/* PRO - FOCUS CARD */}
          <div className="bg-gradient-to-br from-indigo-500/5 via-primary/5 to-cyan-500/5 border-2 border-cyan-400/80 rounded-[3rem] p-8 md:p-10 shadow-[0_0_40px_rgba(34,211,238,0.4)] relative flex flex-col items-start gap-6 md:-translate-y-4 scale-105 z-10 bg-background/80 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] ring-4 ring-cyan-400/30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-cyan-500 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
              MÁS POPULAR
            </div>
            <div className="w-full">
              <h3 className="text-xl font-bold uppercase tracking-widest text-primary text-xs mb-2">Crecimiento</h3>
              <h4 className="text-4xl font-black tracking-tight mb-2">Negocio Pro IA</h4>
              <p className="text-sm text-foreground font-bold">Nuestra ingeniería más avanzada para negocios que escalan.</p>
              <p className="mt-2 text-xs text-muted-foreground">El precio se ajusta dinámicamente según tu volumen de mensajes y seguidores.</p>
            </div>
            <ul className="space-y-4 w-full flex-1 pt-4">
              <li className="flex gap-3 text-sm font-bold"><Check className="w-5 h-5 text-primary shrink-0" /> IA con Catálogo Inteligente + Memoria</li>
              <li className="flex gap-3 text-sm font-bold"><Check className="w-5 h-5 text-primary shrink-0" /> Mensajería Ilimitada con Entrenamiento</li>
              <li className="flex gap-3 text-sm font-bold"><Check className="w-5 h-5 text-primary shrink-0" /> Notificaciones y Re-engagement CRM</li>
              <li className="flex gap-3 text-sm font-bold"><Check className="w-5 h-5 text-primary shrink-0" /> Soporte de Ingeniería Prioritario</li>
            </ul>
            <style>{`
              @keyframes vibrar-llamativo {
                0%, 100% { transform: scale(1) rotate(0deg); }
                20% { transform: scale(1.05) rotate(-1deg); }
                40% { transform: scale(1.05) rotate(1deg); }
                60% { transform: scale(1.05) rotate(-1deg); }
                80% { transform: scale(1.05) rotate(1deg); }
              }
            `}</style>
            <a 
              href="https://wa.me/573017219288?text=Hola%20LEMARJ,%20necesito%20una%20propuesta%20para%20el%20plan%20Pro%20IA" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full mt-6 block text-center rounded-2xl bg-gradient-to-r from-primary to-cyan-600 hover:from-indigo-600 hover:to-cyan-700 text-white py-5 font-black transition-all shadow-[0_15px_35px_-10px_rgba(34,211,238,0.6)] hover:shadow-2xl text-xl animate-[vibrar-llamativo_3s_infinite_ease-in-out]"
            >
              Comenzar Inversión
            </a>
          </div>

          {/* CORPORATIVO */}
          <div className="bg-background/40 backdrop-blur-sm border border-indigo-400/60 rounded-[2.5rem] p-8 shadow-[0_0_20px_rgba(129,140,248,0.3)] flex flex-col items-start gap-6 hover:border-indigo-400 transition-all duration-500 hover:shadow-[0_0_35px_rgba(129,140,248,0.4)]">
            <div className="w-full">
              <h3 className="text-xl font-bold uppercase tracking-widest text-muted-foreground/50 text-xs mb-2">Gran Escala</h3>
              <h4 className="text-2xl font-extrabold">Corporativo</h4>
              <p className="mt-4 text-sm text-muted-foreground">Estructuras multi-canal y sistemas dedicados.</p>
            </div>
            <ul className="space-y-3 w-full flex-1">
              <li className="flex gap-3 text-sm font-medium"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Múltiples números de WhatsApp</li>
              <li className="flex gap-3 text-sm font-medium"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Integración con ERP/POS Externo</li>
              <li className="flex gap-3 text-sm font-medium"><Check className="w-5 h-5 text-indigo-500 shrink-0" /> Panel de Control Administrativo</li>
            </ul>
            <a href="https://wa.me/573017219288?text=Hola%20LEMARJ,%20necesito%20una%20consultoria%20para%20el%20plan%20Corporativo" target="_blank" rel="noreferrer" className="w-full mt-auto block text-center rounded-xl border border-indigo-200/50 hover:bg-indigo-50 py-3 font-bold transition-colors text-sm">
              Hablar con Consultor
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
