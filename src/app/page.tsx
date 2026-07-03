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

  // If user is logged in, show Dashboard or Onboarding
  if (user && profile) {
    if (!profile.onboarding_completed) {
      return (
        <MainLayout profile={profile} activeTab="onboarding" onTabChange={() => {}}>
          <OnboardingFlow />
        </MainLayout>
      );
    }

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
        {/* Main Neon border wrapper for the entire navbar (Red -> Green) */}
        <div
          className="pointer-events-auto w-full max-w-2xl rounded-full p-[1.5px] transition-all duration-500"
          style={{
            background: 'linear-gradient(90deg, #e11d48, #d946ef, #1e3a8a, #06b6d4, #10b981)',
            boxShadow: '0 0 22px rgba(217,70,239,0.25), 0 0 44px rgba(124,58,237,0.15)',
          }}
        >
          <header className="flex w-full items-center justify-between rounded-full bg-white dark:bg-[#0a0a0c] px-4 h-12 transition-all">

            {/* Logo + brand name */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setPublicTab('home')}>
              {/* Logo Box with Pink/Purple gradient border */}
              <div
                className="rounded-[12px] p-[1.5px] shrink-0 transition-all duration-300 hover:opacity-90 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                style={{ background: 'linear-gradient(135deg, #e11d48, #8b5cf6)' }}
              >
                <div className="w-9 h-9 rounded-[10px] overflow-hidden bg-white dark:bg-[#0a0a0c] relative flex items-center justify-center">
                  <Image src="/logo-lemarj.jpg" alt="LEMARJ Logo" fill className="object-contain p-1" />
                </div>
              </div>
              <span className="font-black text-lg tracking-tighter text-slate-900 dark:text-white whitespace-nowrap hidden sm:block">
                LEMARJ
              </span>
            </div>

            {/* Right-side controls */}
            <div className="flex items-center gap-4 md:gap-6">
              <LanguageToggle />
              <ModeToggle />
              <div className="h-5 w-[1px] bg-slate-300 dark:bg-white/10 mx-1" />

              {/* LOGIN — Solid Blue border */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center justify-center h-10 px-5 rounded-full bg-white dark:bg-[#0a0a0c] border-[1.5px] border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-50 dark:hover:bg-blue-600/10 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest transition-all"
              >
                {t('layout.login')}
              </button>

              {/* BOOK DEMO — Purple to Blue gradient fill */}
              <a
                href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20quiero%20mi%20demo%20gratis"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full font-black px-5 h-10 text-[10px] uppercase tracking-widest text-white hover:scale-105 active:scale-95 transition-all duration-200"
                style={{
                  background: 'linear-gradient(90deg, #4c1d95, #1e3a8a)', // Dark Purple to Dark Blue
                  border: '1px solid rgba(124,58,237,0.5)',
                  boxShadow: '0 0 15px rgba(124,58,237,0.3)',
                }}
              >
                {t('layout.bookDemo')}
              </a>
            </div>

          </header>
        </div>
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
        <div id="automation" className="w-full max-w-7xl mx-auto px-4 py-8 scroll-mt-20 min-h-[400px]">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <AutomationExplorer />
          </Suspense>
        </div>

        <div id="ecosystem" className="w-full max-w-7xl mx-auto px-4 py-8 scroll-mt-20 min-h-[400px]">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <EcosystemView />
          </Suspense>
        </div>

        <ErpDashboard />
        <WellnessHub />
        <IntelligentRecruitment />
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
      className="relative group rounded-[3rem] overflow-hidden w-full h-[320px] cursor-default border border-indigo-200 dark:border-indigo-900/30 shadow-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-900/20 dark:to-zinc-950" />
      <div className="relative h-full rounded-[3rem] p-10 flex flex-col justify-center items-center text-center gap-6">
        <div className="w-16 h-16 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div>
          <div className="text-5xl font-black tracking-tighter mb-2 text-foreground">
            {value}
          </div>
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
