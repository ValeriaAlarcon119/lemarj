import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Building2, Palette, Rocket, Target, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type Step = 'welcome' | 'role' | 'goal' | 'finish'

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [role, setRole] = useState<'emprendedor' | 'experto' | null>(null)

  const steps: Step[] = ['welcome', 'role', 'goal', 'finish']
  const currentIdx = steps.indexOf(currentStep)

  return (
    <section className="py-12 bg-transparent relative overflow-hidden" id="onboarding">
      <div className="container px-4 mx-auto max-w-4xl">
        {/* Progress Bar Redesign */}
        <div className="flex justify-between items-center mb-12 relative px-2">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 -z-10 rounded-full mx-10" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 rounded-full transition-all duration-700 mx-10" 
            style={{ width: `calc(${(currentIdx / (steps.length - 1)) * 100}% - 20px)` }}
          />
          {steps.map((s, i) => {
            const stepIcons: Record<Step, React.ReactNode> = {
              welcome: <Rocket className="w-5 h-5" />,
              role: <Building2 className="w-5 h-5" />,
              goal: <Target className="w-5 h-5" />,
              finish: <Sparkles className="w-5 h-5" />
            }
            const labels: Record<Step, string> = {
              welcome: 'Inicio',
              role: 'Perfil',
              goal: 'Objetivo',
              finish: 'Final'
            }
            const isActive = i <= currentIdx
            const isCurrent = i === currentIdx

            return (
              <div key={s} className="flex flex-col items-center gap-3 relative z-10 group">
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 shadow-xl overflow-hidden relative ${
                    isCurrent 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-white/20 scale-110 shadow-[0_0_25px_rgba(168,85,247,0.6)] ring-4 ring-indigo-500/20' 
                      : isActive 
                        ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                        : 'bg-background/80 backdrop-blur-md text-muted-foreground border-border'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[border-slide_3s_infinite_ease-in-out]" />
                  )}
                  <span className="relative z-10">{stepIcons[s]}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-muted-foreground/30'
                  }`}>
                    {labels[s]}
                  </span>
                  {isCurrent && (
                    <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-16 border border-border/50 relative">
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-primary/20 rotate-6 drop-shadow-xl">
                  <Rocket className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
                    Inicia tu aventura
                  </span> <br /> en LEMARJ
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                  Estamos listos para escalar tu negocio al siguiente nivel. Solo necesitamos 2 minutos de tu tiempo para personalizar tu experiencia.
                </p>
                <Button size="lg" onClick={() => setCurrentStep('role')} className="h-14 px-12 rounded-2xl font-bold text-lg">
                  Empezar Ahora
                </Button>
              </motion.div>
            )}

            {currentStep === 'role' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-3xl font-bold text-center mb-12">¿Cuál es tu <span className="text-primary italic">perfil</span>?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button
                    onClick={() => setRole('emprendedor')}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 ${
                      role === 'emprendedor' ? 'border-primary bg-background shadow-xl scale-105' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                  >
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-xl mb-2">Emprendedor / Dueño</h4>
                      <p className="text-sm text-muted-foreground">Busco automatizar mis ventas y escalar mis operaciones con IA.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setRole('experto')}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 ${
                      role === 'experto' ? 'border-primary bg-background shadow-xl scale-105' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                  >
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                      <Palette className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-xl mb-2">Colaborador / Experto</h4>
                      <p className="text-sm text-muted-foreground">Soy diseñador o experto y quiero colaborar con marcas de alto impacto.</p>
                    </div>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-12">
                  <Button variant="ghost" onClick={() => setCurrentStep('welcome')}>
                    Volver
                  </Button>
                  <Button disabled={!role} onClick={() => setCurrentStep('goal')} className="rounded-xl px-8">
                    Siguiente
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 'goal' && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-inner">
                  <Target className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Tu principal <span className="text-primary italic">objetivo</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {['Marketing Viral', 'Gestión Operativa', 'Ventas 24/7'].map((g) => (
                    <button key={g} className="p-6 rounded-2xl bg-background border hover:border-primary transition-all font-bold text-sm">
                      {g}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setCurrentStep('role')}>
                    Volver
                  </Button>
                  <Button onClick={() => setCurrentStep('finish')} className="rounded-xl px-12">
                    Casi listo
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 'finish' && (
              <motion.div
                key="finish"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-12">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-primary animate-bounce" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-6">¡Todo <span className="text-primary italic">listo</span>!</h3>
                <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
                  Tu ecosistema personalizado está preparado. Un consultor se pondrá en contacto para activar tu demo gratuita de 7 días.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold">
                    Ir al Dashboard
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold">
                    Ver Tutorial
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
