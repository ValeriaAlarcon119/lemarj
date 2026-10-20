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
import { MoonStar, BookOpenCheck, Infinity as InfinityIcon } from "lucide-react"
import { HeroPremium } from "@/components/sections/HeroPremium"
import { WhatIsSection } from "@/components/sections/WhatIsSection"
import { PainPoints } from "@/components/sections/PainPoints"
import { DemoShowcase } from "@/components/sections/DemoShowcase"
import { Scalability } from "@/components/sections/Scalability"
import { ConnectorsBar } from "@/components/sections/ConnectorsBar"
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

// Secciones que salieron del Home y ahora son vistas del menú lateral
const PUBLIC_VIEW_HASH = {
  news: '#noticias',
  automations: '#automatizaciones',
  workspaces: '#workspaces',
  integrations: '#integraciones',
} as const

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

  // Vistas públicas del menú lateral: se abren desde el hash (#noticias, #integraciones…)
  useEffect(() => {
    const fromHash = () => {
      const view = Object.entries(PUBLIC_VIEW_HASH).find(([, h]) => h === window.location.hash)?.[0]
      setPublicTab(prev => view ?? (prev in PUBLIC_VIEW_HASH ? 'home' : prev))
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  // Al cambiar de vista: arriba si es una vista, o a la sección del Home pedida por el hash
  useEffect(() => {
    if (publicTab in PUBLIC_VIEW_HASH) {
      window.scrollTo({ top: 0 })
      return
    }
    const id = window.location.hash.slice(1)
    if (!id) return
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
    return () => clearTimeout(timer)
  }, [publicTab])

  const openPublicView = (view: keyof typeof PUBLIC_VIEW_HASH) => {
    window.location.hash = PUBLIC_VIEW_HASH[view]
    setPublicTab(view)
  }

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
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => { if (window.location.hash) history.replaceState(null, '', window.location.pathname); setPublicTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
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


      <div className="flex flex-col items-center pb-8 w-full">
        {publicTab in PUBLIC_VIEW_HASH ? (
          <PublicView>
            <Suspense fallback={<ViewSpinner />}>
              {publicTab === 'news' && <NewsBoost />}
              {publicTab === 'automations' && <AutomationExplorer view="ideas" />}
              {publicTab === 'workspaces' && <AutomationExplorer view="templates" />}
              {publicTab === 'integrations' && <EcosystemView />}
            </Suspense>
          </PublicView>
        ) : (
        <>

        {/* HERO SECTION */}
        <HeroPremium />

        {/* STATS BANNER */}
        <section className="w-full relative py-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee gap-6 py-4 px-3 h-full group hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 shrink-0 items-center h-full">
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

        <WhatIsSection />
        <TrustBadges />
        <PainPoints />
        <SalesComparison />
        <Scalability />
        <FeaturesTimeline />
        <ComparisonTable />
        <PilaresSection />
        <DemoShowcase />
        <DemoSection />
        <PersonalizationShowcase />
        <FreeWebsiteOffer />
        <ExpertTips />
        <SmartAutomations />

        {/* Del ecosistema solo queda la barra de logos; el catálogo completo está en la vista Integraciones */}
        <ConnectorsBar onOpen={() => openPublicView('integrations')} />

        <ErpDashboard />
        <WellnessHub />
        <IntelligentRecruitment />
        <PricingSection />
        </>
        )}

        <Footer />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
      </div>
    </MainLayout>
  )
}

function PublicView({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-7xl mx-auto px-4 pt-28 pb-8 min-h-[70vh]">{children}</div>
}

function ViewSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card-premium relative group rounded-3xl overflow-hidden w-full h-[132px] cursor-default"
    >
      <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-400/20 to-cyan-400/20 blur-2xl pointer-events-none" />
      <div className="relative h-full px-6 flex items-center gap-5">
        <div className="w-14 h-14 shrink-0 p-3 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-500">
          {icon}
        </div>
        <div className="min-w-0 text-left">
          <div className="text-4xl font-black tracking-tighter leading-none text-gradient-brand">
            {value}
          </div>
          <div className="mt-1.5 text-sm font-semibold text-foreground/80 leading-snug">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
