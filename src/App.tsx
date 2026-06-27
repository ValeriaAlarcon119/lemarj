import { motion } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"
import { FeaturesTimeline } from "@/components/features-timeline"
import { ComparisonTable } from "@/components/comparison-table"
import { PilaresSection } from "@/components/pilares"
import { DemoSection } from "@/components/demo-section"
import { PersonalizationShowcase } from "@/components/personalization-showcase"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { Zap, MoonStar, BookOpenCheck, Infinity as InfinityIcon, ShieldCheck, Users2, Heart, ArrowRight } from "lucide-react"
import { NewsBoost } from "@/components/sections/NewsBoost"
import { SmartAutomations } from "@/components/sections/SmartAutomations"
import { ErpDashboard } from "@/components/sections/ErpDashboard"
import { WellnessHub } from "@/components/sections/WellnessHub"
import { OnboardingFlow } from "@/components/sections/OnboardingFlow"
import { LoginModal } from "@/components/sections/LoginModal"
import { SalesComparison } from "@/components/sections/SalesComparison"
import { FreeWebsiteOffer } from "@/components/sections/FreeWebsiteOffer"
import { ExpertTips } from "@/components/sections/ExpertTips"
import { Sidebar } from "@/components/Sidebar"
import { IntelligentRecruitment } from "@/components/sections/IntelligentRecruitment"
import { useState } from "react"


function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfaff] via-[#f0f6ff] to-[#fbfaff] dark:bg-none dark:bg-background text-foreground transition-colors duration-300 overflow-x-hidden">

      
      {/* BACKGROUND GRID CLÁSICO DEL HTML */}
      <div className="fixed inset-0 pointer-events-none -z-20 
        dark:bg-[linear-gradient(rgba(192,132,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(192,132,252,0.05)_1px,transparent_1px)] 
        bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] 
        bg-[size:50px_50px]" 
      />
      
      {/* MAGICAL GLOWS */}
      <div className="fixed top-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Sidebar />

      {/* FLOATING NAVBAR (COMPACTO & ESTORILIZADO) */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none lg:pl-20">
        <header className="pointer-events-auto flex w-full max-w-2xl items-center justify-between rounded-full border border-white/10 bg-background/60 px-5 h-12 backdrop-blur-xl shadow-2xl transition-all">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.4)] bg-black shrink-0">
              <img 
                src="/logo-lemarj.jpg" 
                alt="LEMARJ Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="font-black text-lg tracking-tighter text-foreground whitespace-nowrap hidden sm:block">
              LEMARJ
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ModeToggle />
            <div className="h-4 w-[1px] bg-border/50 mx-1"></div>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-[11px] font-bold hover:text-primary transition-colors cursor-pointer uppercase tracking-widest px-2"
            >
              Login
            </button>
            <a 
              href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20quiero%20mi%20demo%20gratis" 
              target="_blank" 
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-black px-4 h-8 text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Agendar Demo
            </a>
          </div>
        </header>
      </div>

      <main className="flex flex-col items-center pt-32 pb-8 space-y-4 sm:space-y-8 w-full overflow-hidden lg:pl-20">
        
        {/* HERO SECTION REDISEÑADA */}
        <section className="flex flex-col items-center justify-center text-center space-y-10 min-h-[60vh] relative pt-10 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
          
          
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] max-w-4xl mx-auto text-foreground drop-shadow-sm">
            Tu catálogo no es un <br />archivo estático, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
              es tu mejor vendedor.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance font-medium leading-relaxed">
            Transformando el comercio regional con ingeniería de alta fidelidad: atendiendo a tus clientes 24/7 de forma segura, personalizada e inmediata, concretando conversaciones y ventas para que tú solo tengas que cerrar el trato.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
            <style>{`
              @keyframes energy-vibrate {
                0%, 100% { transform: scale(1) translateY(0); }
                15% { transform: scale(1.03) translateY(-2px); }
                30% { transform: scale(0.98) translateY(1px); }
                45% { transform: scale(1.02) translateY(-1px); }
                60% { transform: scale(0.99) translateY(1px); }
                75% { transform: scale(1.01) translateY(0); }
              }
            `}</style>
            <a 
              href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20quiero%20mi%20demo%20gratis" 
              target="_blank" 
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground text-background font-bold px-8 h-14 text-[15px] shadow-[0_0_25px_-5px_rgba(196,181,253,0.4)] hover:shadow-[0_0_35px_-5px_rgba(196,181,253,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto ring-1 ring-[#c4b5fd]/30 overflow-hidden isolate animate-[energy-vibrate_1.5s_ease-in-out_infinite] hover:animate-none"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#c4b5fd]/10 to-[#93c5fd]/10" />
              <div className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[border-slide_3s_infinite_ease-in-out]" />
              <ArrowRight className="w-5 h-5 text-[#c4b5fd] group-hover:translate-x-1 transition-transform duration-300" />
              Agendar Demo de Alta Fidelidad
            </a>
            <a 
              href="#demo"
              className="inline-flex items-center justify-center rounded-2xl border border-[#c4b5fd] bg-background/50 backdrop-blur hover:bg-[#c4b5fd]/5 text-foreground px-8 h-14 text-[15px] shadow-[0_0_15px_rgba(196,181,253,0.4)] hover:shadow-[0_0_20px_rgba(196,181,253,0.6)] transition-all font-bold w-full sm:w-auto"
            >
              Ver Ecosistema en Acción
            </a>
          </div>

        </section>

        {/* SOCIAL PROOF - INFINITE MARQUEE */}
        <section className="text-center space-y-8 relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 overflow-hidden">
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-widest"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">
              Súmate a los emprendedores de éxito
            </span> <br /> que impulsan su negocio con IA en cada región
          </h2>
          
          {/* Contenedor del Marquee de Tarjetas de Stats */}
          <div className="relative flex w-full overflow-hidden py-12">
            {/* Gradientes a los lados para difuminar */}
            
            <div className="flex w-max min-w-full animate-slow-marquee items-center gap-10 px-4 hover:[animation-play-state:paused] cursor-default">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-10">
                  <div className="w-[300px] shrink-0">
                    <StatCard icon={<Zap strokeWidth={1.5} className="w-full h-full" />} value="<3s" label="Respuesta inmediata" />
                  </div>
                  <div className="w-[300px] shrink-0">
                    <StatCard icon={<MoonStar strokeWidth={1.5} className="w-full h-full" />} value="24/7" label="Actividad de ventas" />
                  </div>
                  <div className="w-[300px] shrink-0">
                    <StatCard icon={<BookOpenCheck strokeWidth={1.5} className="w-full h-full" />} value="100%" label="Fiel a tu catálogo" />
                  </div>
                  <div className="w-[300px] shrink-0">
                    <StatCard icon={<InfinityIcon strokeWidth={1.5} className="w-full h-full" />} value="Varios" label="Clientes a la vez" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <FeaturesTimeline />
        </motion.div>

        <SalesComparison />
        
        <motion.div id="offer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <FreeWebsiteOffer />
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <ExpertTips />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
          <ComparisonTable />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <PilaresSection />
        </motion.div>

        <motion.div id="demo" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <DemoSection />
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <PersonalizationShowcase />
        </motion.div>

        <motion.div id="news" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <NewsBoost />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <SmartAutomations />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <ErpDashboard />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <WellnessHub />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <OnboardingFlow />
        </motion.div>

        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <IntelligentRecruitment />
        </motion.div>



        <section className="py-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            
            {/* Tarjeta Garantía Premium - Rediseñada para resaltar más */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-zinc-950 border-2 border-indigo-100 dark:border-indigo-500/20 rounded-[4rem] p-12 sm:p-16 shadow-[0_40px_80px_rgba(168,85,247,0.05)] transition-all duration-700 relative overflow-hidden flex flex-col justify-between h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-500/5 dark:to-transparent pointer-events-none" />
              
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-1000">
                <ShieldCheck className="w-48 h-48 text-indigo-500" />
              </div>

              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1] text-black dark:text-white">
                  Ingeniería garantizada <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 drop-shadow-sm">Prueba sin riesgos.</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-md">
                  Disfruta de <span className="text-foreground font-black">7 días de despliegue gratuito</span>. Si en una semana no ves mejora real en tu flujo, no pagas absolutamente nada.
                </p>
              </div>

              <div className="mt-12 relative z-10">
                <div className="flex items-center gap-4 bg-indigo-500/10 px-6 py-4 rounded-2xl w-fit border border-indigo-500/20 shadow-sm transition-transform group-hover:scale-105">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Soporte Dedicado Incluido</span>
                </div>
              </div>

              {/* Elemento novedoso: Luz de borde movil */}
              <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0,transparent_25%,rgba(168,85,247,0.1)_50%,transparent_75%,transparent_100%)] animate-[spin_10s_linear_infinite] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity" />
            </motion.div>

            {/* Tarjeta Referidos Premium - Rediseñada para resaltar más */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-zinc-950 border-2 border-purple-100 dark:border-purple-500/20 rounded-[4rem] p-12 sm:p-16 shadow-[0_40px_80px_rgba(236,72,153,0.05)] transition-all duration-700 relative overflow-hidden flex flex-col justify-between h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-500/5 dark:to-transparent pointer-events-none" />

              <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-1000">
                <Users2 className="w-48 h-48 text-purple-500" />
              </div>

              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1] text-black dark:text-white">
                  Crezcamos juntos <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 drop-shadow-sm">Círculo de referidos.</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-md">
                  Por cada referido que active su plan, recibes <span className="text-foreground font-black">1 mes de servicio totalmente gratis</span>. Sin límites ni letras pequeñas.
                </p>
              </div>

              <div className="mt-12 relative z-10">
                <div className="flex items-center gap-4 bg-purple-500/10 px-6 py-4 rounded-2xl w-fit border border-purple-500/20 shadow-sm transition-transform group-hover:scale-105">
                  <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">Gana Meses Gratis</span>
                </div>
              </div>

              {/* Elemento novedoso: Aura flotante */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />
            </motion.div>
            
          </div>
        </section>

        <PricingSection />

      </main>

      <Footer />
    </div>
  )
}

/* --- STATS ICONS SVGS RELOADED --- */
function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] p-[1.5px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.15)] cursor-default">
      {/* Degrade del bordecito sutil (lila y azulito) */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/50 via-indigo-300/40 to-purple-400/50 dark:from-cyan-600/50 dark:via-indigo-600/30 dark:to-purple-700/50 transition-all duration-500 group-hover:from-cyan-400 group-hover:via-indigo-400 group-hover:to-purple-500 dark:group-hover:from-cyan-500 dark:group-hover:via-indigo-500 dark:group-hover:to-purple-600" />
      
      {/* Fondo de la tarjeta */}
      <div className="relative h-full w-full rounded-[calc(2rem-1.5px)] bg-white dark:bg-zinc-950 flex flex-col items-center text-center p-8 lg:p-10 transition-colors duration-500 overflow-hidden isolate">
        
        {/* Fondo clarito base pastel y oscuro/vibrante en hover */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 transition-colors duration-500 group-hover:from-indigo-100/70 group-hover:to-purple-100/70 dark:group-hover:from-indigo-900/60 dark:group-hover:to-purple-900/60" />
        
        {/* Luz que se mueve en hover (efecto de movimiento visual) */}
        <div className="absolute top-0 left-[-150%] h-full w-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/5 transition-all duration-1000 ease-out group-hover:left-[150%] pointer-events-none -z-10" />

        {/* Contenedor del ícono cuadrado/redondeado tipo Clickup */}
        <div className="mb-8 relative flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-2xl lg:rounded-[1.25rem] bg-gradient-to-br from-white to-indigo-50/50 dark:from-zinc-900 dark:to-indigo-950/30 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] border border-indigo-100/50 dark:border-indigo-800/30 text-indigo-500 dark:text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.3)] dark:group-hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.2)] group-hover:-translate-y-2">
          <div className="absolute inset-0 rounded-2xl lg:rounded-[1.25rem] bg-indigo-500/0 group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-400/10 transition-colors duration-500" />
          <div className="relative w-8 h-8 lg:w-10 lg:h-10 shrink-0 drop-shadow-sm transition-transform duration-500 group-hover:scale-110">{icon}</div>
        </div>
        
        {/* Valor (ej: <2s) con gradiente en hover */}
        <div className="text-[3rem] lg:text-[3.5rem] leading-none font-extrabold tracking-tighter text-foreground transition-all duration-500 drop-shadow-sm group-hover:scale-[1.02] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400">
          {value}
        </div>
        
        {/* Subtítulo (ej: CLIENTES A LA VEZ) */}
        <div className="mt-4 lg:mt-5 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 group-hover:text-indigo-700 dark:group-hover:text-purple-300 transition-colors duration-500">
          {label}
        </div>
      </div>
    </div>
  )
}

export default App
