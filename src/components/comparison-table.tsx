import { Check, X, Frown, Zap } from "lucide-react"

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

export function ComparisonTable() {
  return (
    <section className="py-20 relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-6 mb-16 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight pb-2 text-[#0a0a0a] dark:text-white leading-[1.1]">
          ¿Qué cambia cuando <br className="sm:hidden" /> usas <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">LEMARJ?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* ASESOR HUMANO */}
        <div className="rounded-[2.5rem] bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-red-500/10 dark:border-red-500/5 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-red-500/5 blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-red-500/10" />
          <div className="flex items-center gap-4 border-b border-red-500/10 pb-6 relative z-10 w-full">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
              <Frown className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#0a0a0a] dark:text-red-400">
              Personal Humano
            </h3>
          </div>
          <div className="space-y-6 flex-1 pt-2 relative z-10">
            <RowBad text="Disponible solo 8h/día, riesgo de errores humanos." />
            <RowBad text="Respuesta lenta durante picos de tráfico y demoras en atención." />
            <RowBad text="Altos costos operativos mensuales fijos por salario y prestaciones." />
            <RowBad text="Sin capacidad para atender e informar a múltiples clientes a la vez." />
            <RowBad text="Dependencia emocional y de horarios para efectuar un buen servicio." />
          </div>
        </div>

        {/* LEMARJ IA */}
        <div className="rounded-[2.5rem] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-emerald-400/60 dark:border-emerald-500/60 ring-1 ring-emerald-400/40 dark:ring-emerald-500/40 p-8 sm:p-10 shadow-[0_0_30px_rgba(16,185,129,0.15)] dark:shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col gap-6 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
           <div className="absolute top-0 left-0 -m-10 w-60 h-60 bg-emerald-500/10 blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/20" />
           <div className="absolute bottom-0 right-0 -m-10 w-60 h-60 bg-indigo-500/10 blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-indigo-500/20" />
           
          <div className="flex items-center gap-4 border-b border-emerald-500/20 pb-6 relative z-10 w-full">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
              Ingeniería LEMARJ
            </h3>
          </div>
          <div className="space-y-6 flex-1 pt-2 relative z-10">
            <RowGood text="Disponible 24/7, costo 10x menor garantizado." />
            <RowGood text="Respuesta experta y precisa en menos de 2 segundos." />
            <RowGood text="Ventas blindadas sin errores de información ni de inventario." />
            <RowGood text="Capacidad operativa infinita; atiende a 1000 clientes a la vez." />
            <RowGood text="Estandarización de calidad y calidez total en cada mensaje." />
          </div>
        </div>

      </div>
    </section>
  )
}

function RowBad({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 text-muted-foreground text-[15px] sm:text-base font-medium">
      <div className="bg-red-500/10 rounded-full p-1.5 shrink-0 mt-0.5"><X className="w-4 h-4 text-red-500 stroke-[3]" /></div>
      <span className="leading-snug pt-0.5">{text}</span>
    </div>
  )
}

function RowGood({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 text-foreground text-[15px] sm:text-base font-medium">
      <div className="bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full p-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)] shrink-0 mt-0.5">
        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
      </div>
      <span className="leading-snug pt-0.5">{text}</span>
    </div>
  )
}
