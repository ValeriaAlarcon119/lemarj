"use client"
import React, { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"
import { FeaturesTimeline } from "@/components/features-timeline"
import { ComparisonTable } from "@/components/comparison-table"
import { PilaresSection } from "@/components/pilares"
import { DemoSection } from "@/components/demo-section"
import { PersonalizationShowcase } from "@/components/personalization-showcase"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"
import { TrustBadges } from "@/components/trust-badges"
import { MoonStar, BookOpenCheck, Infinity as InfinityIcon, ArrowRight } from "lucide-react"
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
import { ClientDashboard } from "@/components/Dashboard/ClientDashboard"
import { AdminDashboard } from "@/components/Dashboard/AdminDashboard"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { MainLayout } from "@/components/MainLayout"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/I18nContext"
import Image from "next/image"

// Lazy load heavy components to drastically speed up initial page load
const AutomationExplorer = React.lazy(() => import("@/components/Dashboard/AutomationExplorer").then(m => ({ default: m.AutomationExplorer })))
const EcosystemView = React.lazy(() => import("@/components/Dashboard/EcosystemView").then(m => ({ default: m.EcosystemView })))

export default function Page() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [publicTab, setPublicTab] = useState('home')
  const { user, profile, loading, setProfile } = useAuth()
  const { t } = useLanguage()
  const [authTimeout, setAuthTimeout] = useState(false)

  // Prevent infinite spinner if Supabase connection hangs
  useEffect(() => {
    const t_out = setTimeout(() => setAuthTimeout(true), 2500)
    return () => clearTimeout(t_out)
  }, [])

  const handleUpdateProfile = (newData: any) => {
    if (profile) {
      setProfile({ ...profile, ...newData })
    }
  }

  if (loading && !authTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Cargando plataforma...</p>
        </div>
      </div>
    )
  }

  // If user is logged in but profile is null (e.g. RLS error)
  if (user && !profile && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
        <div className="flex flex-col items-center gap-4 max-w-md bg-red-50 dark:bg-red-950/20 p-8 rounded-3xl border border-red-100 dark:border-red-900/30">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center text-red-500 mb-2">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-black text-foreground">Error de Perfil</h2>
          <p className="text-sm text-muted-foreground">
            Has iniciado sesión correctamente, pero no pudimos cargar o crear tu perfil de usuario. 
            Esto suele ocurrir si las políticas de seguridad (RLS) en Supabase no permiten insertar en la tabla <b>profiles</b>.
          </p>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    )
  }

  // If user is logged in, show Dashboard
  if (user && profile) {
    return (
      <MainLayout profile={profile} activeTab={activeTab} onTabChange={setActiveTab}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {profile.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <ClientDashboard profile={profile} onUpdate={handleUpdateProfile} activeTab={activeTab} />
            )}
          </motion.div>
        </AnimatePresence>
      </MainLayout>
    )
  }

  // Landing Page or public sub-views (Standard view for non-logged-in users)
  return (
    <MainLayout profile={null} activeTab={publicTab} onTabChange={setPublicTab} isPublic={true}>
      <div className="w-full flex flex-col items-center overflow-x-hidden">

      {/* FLOATING NAVBAR */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none lg:pl-20">
        <header className="pointer-events-auto flex w-full max-w-2xl items-center justify-between rounded-full border border-white/10 bg-background/60 px-5 h-12 backdrop-blur-xl shadow-2xl transition-all">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setPublicTab('home')}>
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.4)] bg-black shrink-0 relative">
              <Image src="/logo-lemarj.jpg" alt="LEMARJ Logo" fill className="object-contain p-1" />
            </div>
            <div className="font-black text-lg tracking-tighter text-foreground whitespace-nowrap hidden sm:block">LEMARJ</div>
          </div>
          
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ModeToggle />
            <div className="h-4 w-[1px] bg-border/50 mx-1"></div>
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center justify-center h-10 px-4 rounded-full bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 border-2 border-pink-200 hover:border-pink-400 dark:border-pink-900/50 dark:hover:border-pink-600 shadow-[0_0_15px_rgba(244,114,182,0.3)] backdrop-blur-md transition-all text-[11px] font-bold text-pink-500 uppercase tracking-widest">
              {t('layout.login')}
            </button>
            <a href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20quiero%20mi%20demo%20gratis" target="_blank" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-black px-4 h-8 text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              {t('layout.bookDemo')}
            </a>
          </div>
        </header>
      </div>

      <div className="flex flex-col items-center pt-32 pb-8 w-full">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center space-y-10 min-h-[60vh] relative pt-10 px-4 w-full max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] max-w-4xl mx-auto text-foreground drop-shadow-sm">
            {t('hero.title1')} <br />{t('hero.title2')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400">{t('hero.titleHighlight')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
            <a href="https://wa.me/573017219288" className="inline-flex h-16 px-10 items-center justify-center rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 transition-all shadow-2xl shadow-indigo-500/10 group">
              {t('hero.cta')} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="w-full relative py-20 overflow-hidden">
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee gap-8 py-4 px-4 h-full group hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 shrink-0 items-center h-full">
                  <div className="w-[320px] shrink-0">
                    <StatCard icon={<MoonStar strokeWidth={1.5} className="w-full h-full" />} value="24/7" label={t('stats.activity')} />
                  </div>
                  <div className="w-[320px] shrink-0">
                    <StatCard icon={<BookOpenCheck strokeWidth={1.5} className="w-full h-full" />} value="100%" label={t('stats.fidelity')} />
                  </div>
                  <div className="w-[320px] shrink-0">
                    <StatCard icon={<InfinityIcon strokeWidth={1.5} className="w-full h-full" />} value={t('stats.various')} label={t('stats.clients')} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SalesComparison />
        <FeaturesTimeline />
        <ComparisonTable />
        <PilaresSection />
        <DemoSection />
        <PersonalizationShowcase />
        <FreeWebsiteOffer />
        <ExpertTips />
        <NewsBoost />
        <SmartAutomations />

        {/* Sección del Explorador y Ecosistema integradas directamente en el landing */}
        <div id="automation" className="w-full max-w-7xl mx-auto px-4 py-16 scroll-mt-32 min-h-[500px]">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <AutomationExplorer />
          </Suspense>
        </div>

        <div id="ecosystem" className="w-full max-w-7xl mx-auto px-4 py-16 scroll-mt-32 min-h-[500px]">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <EcosystemView />
          </Suspense>
        </div>

        <ErpDashboard />
        <WellnessHub />
        <IntelligentRecruitment />
        <OnboardingFlow />
        <PricingSection />
        <TrustBadges />

        <Footer />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
      </div>
    </MainLayout>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group p-[2px] rounded-[3rem] overflow-hidden w-full h-[320px] cursor-default border border-black dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-3xl" />
      <div className="relative h-full bg-white/80 dark:bg-black/60 rounded-[2.9rem] p-10 flex flex-col justify-between">
        <div className="w-16 h-16 text-indigo-500/80 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>
        <div>
          <div className="text-5xl font-black tracking-tighter mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground/80 transition-colors">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
