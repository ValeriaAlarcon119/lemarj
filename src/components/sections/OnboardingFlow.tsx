"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Building2, Users, Users2, LineChart, Target, CheckCircle2, 
  Store, Scissors, Laptop, Shirt, Wrench, Package,
  Palette, Megaphone, Camera, Heart, Paintbrush, BookOpen, Activity, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/contexts/GlobalContext";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const SECTORS = [
  { id: 'comida', label: 'Comida / Restaurantes', icon: <Store className="w-6 h-6" /> },
  { id: 'maquillaje', label: 'Maquillaje / Belleza', icon: <Scissors className="w-6 h-6" /> },
  { id: 'tecnologia', label: 'Tecnología / Software', icon: <Laptop className="w-6 h-6" /> },
  { id: 'ropa', label: 'Ropa / Moda', icon: <Shirt className="w-6 h-6" /> },
  { id: 'servicios', label: 'Servicios', icon: <Wrench className="w-6 h-6" /> },
  { id: 'otro', label: 'Otro', icon: <Package className="w-6 h-6" /> },
];

const SUB_SECTORS = [
  { id: 'arte', label: 'Arte', icon: <Palette className="w-6 h-6" /> },
  { id: 'marketing', label: 'Marketing', icon: <Megaphone className="w-6 h-6" /> },
  { id: 'diseno-modas', label: 'Diseño de Modas', icon: <Scissors className="w-6 h-6" /> },
  { id: 'contenido', label: 'Creación de Contenido', icon: <Camera className="w-6 h-6" /> },
  { id: 'cuidado-personal', label: 'Cuidado Personal', icon: <Heart className="w-6 h-6" /> },
  { id: 'artesanales', label: 'Cosas Artesanales', icon: <Paintbrush className="w-6 h-6" /> },
  { id: 'educacion', label: 'Educación', icon: <BookOpen className="w-6 h-6" /> },
  { id: 'salud', label: 'Salud', icon: <Activity className="w-6 h-6" /> },
  { id: 'consultoria', label: 'Consultoría', icon: <Briefcase className="w-6 h-6" /> },
];

const EMPLOYEES = ['1-10', '11-50', '51-200', '+200'];
const CLIENTS_VOLUME = ['0-50', '50-200', '200-1000', '+1000'];

export function OnboardingFlow() {
  const { profile, updateOnboardingState, refreshProfile } = useGlobalState();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [sector, setSector] = useState('');
  const [employees, setEmployees] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const [clientsVolume, setClientsVolume] = useState('');
  const [coreSolution, setCoreSolution] = useState('');
  
  const [showSubSectors, setShowSubSectors] = useState(false);
  const [coreSolutionError, setCoreSolutionError] = useState('');

  const handleNext = async (step: Step) => {
    setCurrentStep(step);
    if (step === 6) {
      await finishOnboarding();
    }
  };

  const validateAndNextStep5 = () => {
    setCoreSolutionError('');
    const trimmed = coreSolution.trim();
    if (trimmed.length < 30) {
      setCoreSolutionError("El texto es muy corto. Escribe un párrafo detallado.");
      return;
    }
    const words = trimmed.split(/\s+/);
    if (words.length < 5) {
      setCoreSolutionError("Por favor, escribe un contexto más detallado (mínimo 5 palabras).");
      return;
    }
    const hasLongWords = words.some(w => w.length > 20);
    if (hasLongWords) {
      setCoreSolutionError("No se reconoce el texto y la IA no podrá trabajar en eso. Escribe un párrafo formal.");
      return;
    }
    handleNext(6);
  };

  const finishOnboarding = async () => {
    setIsSaving(true);
    // Save onboarding data
    await updateOnboardingState({
      sector,
      employees,
      collaborators: collaborators.split(',').map(c => c.trim()).filter(Boolean),
      clients_volume: clientsVolume,
      core_solution: coreSolution
    });

    // Mark as completed
    if (profile?.id) {
      await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', profile.id);
      await refreshProfile();
    }
  };

  const stepIcons: Record<Step, React.ReactNode> = {
    1: <Building2 className="w-5 h-5" />,
    2: <Users className="w-5 h-5" />,
    3: <Users2 className="w-5 h-5" />,
    4: <LineChart className="w-5 h-5" />,
    5: <Target className="w-5 h-5" />,
    6: <CheckCircle2 className="w-5 h-5" />
  };

  return (
    <section className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Progress Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Configuración de tu IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">LEMARJ</span>
          </h1>
          <p className="text-zinc-400 font-bold tracking-widest uppercase text-sm">
            Paso {currentStep} de 5
          </p>
          
          <div className="flex justify-between items-center relative max-w-xl mx-auto mt-10">
            <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full -z-10" />
            <motion.div 
              className="absolute left-0 h-1 rounded-full -z-10"
              style={{ background: 'linear-gradient(90deg, #4f46e5, #06b6d4)' }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div 
                key={s} 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= s 
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                    : 'bg-[#0a0a0c] border-white/20 text-zinc-500'
                }`}
              >
                {stepIcons[s as Step]}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Content */}
        <div 
          className="relative p-[1.5px] rounded-[3rem] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.5), rgba(6,182,212,0.5))',
            boxShadow: '0 0 30px rgba(79,70,229,0.15)'
          }}
        >
          <div className="bg-[#0f0f13] p-8 md:p-14 rounded-[3rem] relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-black text-white mb-8 text-center">
                    {showSubSectors ? '1.5. ¿Cuál es tu especialidad?' : '1. ¿En qué sector se encuentra tu empresa?'}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {showSubSectors ? SUB_SECTORS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSector(s.id)}
                        className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                          sector === s.id 
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                            : 'border-white/5 bg-black/50 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl ${sector === s.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-zinc-400'}`}>
                          {s.icon}
                        </div>
                        <span className="font-bold text-sm text-center text-white">{s.label}</span>
                      </button>
                    )) : SECTORS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSector(s.id);
                          if (s.id !== 'otro') setShowSubSectors(false);
                        }}
                        className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                          sector === s.id 
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                            : 'border-white/5 bg-black/50 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl ${sector === s.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-zinc-400'}`}>
                          {s.icon}
                        </div>
                        <span className="font-bold text-sm text-center text-white">{s.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-between">
                    {showSubSectors ? (
                      <Button variant="ghost" onClick={() => { setShowSubSectors(false); setSector(''); }} className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold">Atrás</Button>
                    ) : (
                      <div />
                    )}
                    <Button 
                      disabled={!sector} 
                      onClick={() => {
                        if (sector === 'otro' && !showSubSectors) {
                          setShowSubSectors(true);
                          setSector(''); // reset for the sub-options
                        } else {
                          handleNext(2);
                        }
                      }} 
                      className="h-14 px-10 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      Continuar
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-black text-white mb-8 text-center">2. ¿Cuántos empleados conforman tu equipo?</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {EMPLOYEES.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmployees(e)}
                        className={`p-8 rounded-[2rem] border-2 transition-all font-black text-2xl ${
                          employees === e 
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                            : 'border-white/5 bg-black/50 text-white hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        {e} <span className="text-sm font-bold text-zinc-400 block mt-2">empleados</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentStep(1)} className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold">Atrás</Button>
                    <Button disabled={!employees} onClick={() => handleNext(3)} className="h-14 px-10 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_20px_rgba(255,255,255,0.2)]">Continuar</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-black text-white mb-4">3. Invita a tus colaboradores</h2>
                  <p className="text-zinc-400 font-medium mb-8">Ingresa los correos de tu equipo separados por comas. Ellos recibirán acceso a la plataforma vinculados a tu empresa.</p>
                  <textarea
                    value={collaborators}
                    onChange={(e) => setCollaborators(e.target.value)}
                    placeholder="ejemplo@empresa.com, juan@empresa.com..."
                    className="w-full h-40 p-6 rounded-[2rem] border border-white/10 bg-black/50 text-white placeholder:text-zinc-600 focus:border-indigo-500/50 outline-none resize-none font-medium text-lg"
                  />
                  <div className="mt-10 flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentStep(2)} className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold">Atrás</Button>
                    <Button onClick={() => handleNext(4)} className="h-14 px-10 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_20px_rgba(255,255,255,0.2)]">Continuar (Opcional)</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-black text-white mb-8 text-center">4. ¿Cuál es tu volumen mensual de clientes aprox.?</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {CLIENTS_VOLUME.map((c) => (
                      <button
                        key={c}
                        onClick={() => setClientsVolume(c)}
                        className={`p-8 rounded-[2rem] border-2 transition-all font-black text-2xl ${
                          clientsVolume === c 
                            ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                            : 'border-white/5 bg-black/50 text-white hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        {c} <span className="text-sm font-bold text-zinc-400 block mt-2">clientes/mes</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentStep(3)} className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold">Atrás</Button>
                    <Button disabled={!clientsVolume} onClick={() => handleNext(5)} className="h-14 px-10 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_20px_rgba(255,255,255,0.2)]">Continuar</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl font-black text-white mb-4">5. ¿Qué problema principal quieres resolver de raíz?</h2>
                  <p className="text-zinc-400 font-medium mb-8">Describe tu objetivo principal (Ej: Automatizar ventas por WhatsApp, agendar citas automáticamente, responder dudas frecuentes de mi catálogo).</p>
                  <textarea
                    value={coreSolution}
                    onChange={(e) => {
                      setCoreSolution(e.target.value);
                      if (coreSolutionError) setCoreSolutionError('');
                    }}
                    placeholder="Quiero que la IA atienda a los clientes 24/7 y agende citas..."
                    className="w-full h-40 p-6 rounded-[2rem] border border-white/10 bg-black/50 text-white placeholder:text-zinc-600 focus:border-indigo-500/50 outline-none resize-none font-medium text-lg"
                  />
                  {coreSolutionError && (
                    <p className="mt-4 text-red-400 font-bold bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                      ⚠️ {coreSolutionError}
                    </p>
                  )}
                  <div className="mt-10 flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentStep(4)} className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold">Atrás</Button>
                    <Button disabled={!coreSolution.trim()} onClick={validateAndNextStep5} className="h-14 px-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform text-white font-black uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                      Finalizar Configuración IA
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-t-indigo-500 border-r-purple-500 border-b-cyan-500 border-l-transparent rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#0a0a0c] rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        <CheckCircle2 className="w-10 h-10 text-indigo-400" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4">Configurando tu Inteligencia...</h2>
                  <p className="text-zinc-400 text-lg font-medium">Inyectando tus objetivos comerciales en el núcleo de LEMARJ.</p>
                  
                  {isSaving && (
                    <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-indigo-400 animate-pulse">
                      Estructurando perfil neuronal...
                    </p>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
