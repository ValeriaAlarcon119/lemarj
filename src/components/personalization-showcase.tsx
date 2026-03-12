import { useState } from "react"
import { BotOff, Sparkles, Stethoscope, Store, UtensilsCrossed } from "lucide-react"

export function PersonalizationShowcase() {
  const [activeTone, setActiveTone] = useState<0 | 1 | 2>(0)

  const tones = [
    {
      id: 0,
      name: "Cálido y Artesanal",
      icon: <Store className="w-5 h-5" />,
      color: "from-violet-500",
      bgSelected: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400",
      description: "Ideal para marcas con alma, que buscan crear conexión emocional al instante.",
      robotMsg: "Saludos. Para compras seleccione la opción 3 en el menú principal.",
      lemarjMsg: "¡Hola! Qué gusto saludarte 💜 Claro que sí, nuestras cajitas son hechas a mano con mucho cariño. ¿Para quién sería este detalle tan especial?",
      aiColor: "from-violet-600 to-violet-400"
    },
    {
      id: 1,
      name: "Clínico y Profesional",
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-blue-500",
      bgSelected: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
      description: "Autoridad absoluta. Transmite seguridad, limpieza y estatus profesional.",
      robotMsg: "Por favor envíe su requerimiento para programar cita médica.",
      lemarjMsg: "Buenas tardes, estimado paciente. Será un placer agendar su valoración odontológica. ¿Le vendría mejor acompañarnos en la jornada de la mañana o en la tarde?",
      aiColor: "from-blue-600 to-blue-400"
    },
    {
      id: 2,
      name: "Urbano Nariñense",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      color: "from-emerald-500",
      bgSelected: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      description: "Descontracturado, veloz y con el acento exacto de tu local de comidas.",
      robotMsg: "El costo de la orden es de 25000 pesos. Envíe confirmación.",
      lemarjMsg: "¡Qué más! Listo rey, la promo de hamburguesas dobles te sale en 25K con envío gratis. ¿Te las mando de una vez con salsita extra de la casa?",
      aiColor: "from-emerald-600 to-emerald-400"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Luces y brillos de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Cabecera de la sección */}
        <div className="text-center space-y-6 max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-700 dark:text-[#a5cdff] text-sm font-extrabold tracking-wide backdrop-blur-md">
            <BotOff className="w-5 h-5" />
            CERO MENÚS ROBÓTICOS ABURRIDOS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight pb-2 text-[#0a0a0a] dark:text-white leading-[1.15]">
             Se lee como tú, <br className="sm:hidden" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
               convence como tú.
             </span>
          </h2>
          <p className="text-[17px] text-muted-foreground font-medium leading-relaxed">
            Eliminamos el molesto "Oprima 1 para ventas". Nuestra ingeniería lingüística adapta el cerebro de la IA para que absorba el  
            <strong> acento, la calidez y el argot específico</strong> que enamora a tus clientes reales.
          </p>
        </div>

        {/* Tablero de Interactividad Front-End */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 bg-white/40 dark:bg-[#111116]/60 p-6 sm:p-10 rounded-[3rem] border border-white/60 dark:border-zinc-800 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
          
          {/* Columna Izquierda: Botones de Selector */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-black text-foreground mb-6 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" /> Elige la Personalidad
            </h3>
            <div className="flex flex-col gap-3">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setActiveTone(tone.id as typeof activeTone)}
                  className={`relative flex items-center justify-start gap-4 p-4 sm:p-5 w-full text-left rounded-2xl sm:rounded-3xl font-extrabold transition-all duration-300 isolate overflow-hidden group border
                    ${activeTone === tone.id 
                      ? tone.bgSelected 
                      : "bg-white/50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent text-foreground/70"
                    }
                  `}
                >
                  {/* Selector Active BG Glow indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${tone.color} to-transparent transition-transform duration-300 ${activeTone === tone.id ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`} />
                  
                  <div className={`p-2 rounded-xl transition-colors duration-300 ${activeTone === tone.id ? 'bg-background shadow-sm' : 'bg-muted group-hover:bg-background'}`}>
                    {tone.icon}
                  </div>
                  <span className="text-[16px] sm:text-lg">{tone.name}</span>
                </button>
              ))}
            </div>
            
            <div className="pt-6 h-20">
              <p className="text-sm font-medium text-muted-foreground animate-in fade-in zoom-in duration-500" key={`desc-${activeTone}`}>
                {tones[activeTone].description}
              </p>
            </div>
          </div>

          {/* Columna Derecha: El Chat Demonstrativo */}
          <div className="lg:col-span-7 relative h-full">
            <div className="relative bg-[#0a0f12] dark:bg-[#070b0e] h-full min-h-[400px] rounded-[2rem] border-[4px] border-[#222] overflow-hidden shadow-2xl flex flex-col pt-6 pb-8 px-5 sm:px-8">
              
              {/* Título de demostración */}
              <div className="text-center mb-8 border-b border-white/5 pb-4">
                 <span className="text-xs font-black tracking-[0.2em] text-white/30 uppercase">Comparación de Agente en Vivo</span>
              </div>

              {/* Bot Clásico */}
              <div className="space-y-2 mb-8 animate-in slide-in-from-right-4 fade-in duration-700 delay-100 fill-mode-both" key={`robot-${activeTone}`}>
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <BotOff className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-orange-400">Bot Genérico</span>
                </div>
                <div className="bg-zinc-800 text-zinc-300 px-5 py-4 inline-block max-w-[90%] rounded-[1.5rem] rounded-tl-sm text-[15px] font-medium leading-relaxed border border-zinc-700/50 shadow-md">
                  {tones[activeTone].robotMsg}
                </div>
              </div>

              {/* LEMARJ Inteligente */}
              <div className="space-y-2 mt-auto animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both" key={`lemarj-${activeTone}`}>
                 <div className="flex items-center gap-2 justify-end mb-2 mr-1">
                  <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Ingeniería LEMARJ</span>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px]">✨</div>
                </div>
                <div className="flex justify-end relative">
                  {/* Glow detrás de la burbuja activa */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tones[activeTone].aiColor} blur-[30px] opacity-20`} />
                  
                  <div className={`bg-gradient-to-r ${tones[activeTone].aiColor} text-white px-5 py-4 inline-block max-w-[95%] rounded-[1.5rem] rounded-tr-[4px] text-[16px] xl:text-[17px] font-semibold leading-snug shadow-xl relative z-10 border border-white/10`}>
                    {tones[activeTone].lemarjMsg}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
