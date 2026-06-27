"use client";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Briefcase, Share2, Compass, Activity, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/I18nContext"

type Step = 'profile' | 'social' | 'dashboard'

export function OnboardingFlow() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState<Step>('profile')
  const [role, setRole] = useState<'emprendedor' | 'experto' | null>(null)
  const [social, setSocial] = useState<'meta' | 'tiktok' | null>(null)

  const steps: Step[] = ['profile', 'social', 'dashboard']
  const currentIdx = steps.indexOf(currentStep)

  return (
    <section className="py-4 bg-transparent relative overflow-hidden min-h-[600px] flex items-center" id="onboarding">
      <div className="absolute inset-0 z-0 bg-background/50 backdrop-blur-lg" />
      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        
        {/* Progress Bar Redesign */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute top-10 left-0 right-0 h-1 bg-muted/30 -translate-y-1/2 -z-10 rounded-full mx-12" />
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `calc(${(currentIdx / (steps.length - 1)) * 100}% - 24px)` }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute top-10 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 -translate-y-1/2 -z-10 rounded-full mx-12 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
          />
          
          {steps.map((s, i) => {
            const stepIcons: Record<Step, React.ReactNode> = {
              profile: <Briefcase className="w-6 h-6" />,
              social: <Share2 className="w-6 h-6" />,
              dashboard: <Activity className="w-6 h-6" />
            }
            const labels: Record<Step, string> = {
              profile: t('onboarding.stepProfile'),
              social: t('onboarding.stepSocial'),
              dashboard: t('onboarding.stepDashboard')
            }
            const isActive = i <= currentIdx
            const isCurrent = i === currentIdx

            return (
              <div key={s} className="flex flex-col items-center gap-4 relative z-10 group">
                <motion.div 
                  animate={isCurrent ? { 
                    y: [0, -4, 0],
                    scale: [1, 1.05, 1]
                  } : { y: 0, scale: 1 }}
                  transition={isCurrent ? { 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  } : {}}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-700 shadow-2xl overflow-hidden relative ${
                    isCurrent 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-white/20 shadow-[0_15px_35px_rgba(168,85,247,0.4)] ring-4 ring-indigo-500/20' 
                      : isActive 
                        ? 'bg-indigo-500/20 text-indigo-600 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                        : 'bg-background/80 backdrop-blur-md text-muted-foreground border-border'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[border-slide_3s_infinite_ease-in-out]" />
                  )}
                  <span className="relative z-10">{stepIcons[s]}</span>
                </motion.div>
                <div className="flex flex-col items-center">
                  <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-muted-foreground/30'
                  }`}>
                    {labels[s]}
                  </span>
                  {isCurrent && (
                    <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-background/60 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] p-6 md:p-12 border border-border/50 relative shadow-2xl max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            
            {currentStep === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t('onboarding.titleProfile')}<span className="text-primary italic">{t('onboarding.titleProfileHighlight')}</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={() => setRole('emprendedor')}
                    className={`p-6 sm:p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                      role === 'emprendedor' ? 'border-primary bg-background shadow-xl scale-[1.02]' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                  >
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg mb-1">{t('onboarding.roleOwner')}</h4>
                      <p className="text-xs text-muted-foreground">{t('onboarding.roleOwnerDesc')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setRole('experto')}
                    className={`p-6 sm:p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                      role === 'experto' ? 'border-primary bg-background shadow-xl scale-[1.02]' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                  >
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                      <Award className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg mb-1">{t('onboarding.roleExpert')}</h4>
                      <p className="text-xs text-muted-foreground">{t('onboarding.roleExpertDesc')}</p>
                    </div>
                  </button>
                </div>
                <div className="flex justify-end mt-10">
                  <Button disabled={!role} onClick={() => setCurrentStep('social')} className="rounded-xl px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all font-bold tracking-wide">
                    {t('onboarding.nextStep')}
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                  <Share2 className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t('onboarding.titleSocial')}<span className="text-blue-500 italic">{t('onboarding.titleSocialHighlight')}</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={() => setSocial('meta')}
                    className={`p-6 rounded-[2rem] border-2 transition-all flex items-center gap-4 ${
                      social === 'meta' ? 'border-blue-500 bg-background shadow-xl scale-[1.02]' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-white font-black text-xl">f</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base">{t('onboarding.socialMeta')}</h4>
                      <p className="text-xs text-muted-foreground">{t('onboarding.socialMetaDesc')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSocial('tiktok')}
                    className={`p-6 rounded-[2rem] border-2 transition-all flex items-center gap-4 ${
                      social === 'tiktok' ? 'border-zinc-800 dark:border-zinc-200 bg-background shadow-xl scale-[1.02]' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                  >
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-white dark:text-black font-black text-xl">t</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base">{t('onboarding.socialTiktok')}</h4>
                      <p className="text-xs text-muted-foreground">{t('onboarding.socialTiktokDesc')}</p>
                    </div>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-10">
                  <Button variant="ghost" onClick={() => setCurrentStep('profile')} className="font-medium">
                    {t('onboarding.back')}
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep('dashboard')} className="rounded-xl">
                      {t('onboarding.skip')}
                    </Button>
                    <Button disabled={!social} onClick={() => setCurrentStep('dashboard')} className="rounded-xl px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all font-bold tracking-wide">
                      {t('onboarding.connect')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="relative w-32 h-32 mx-auto mb-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-14 h-14 text-primary animate-pulse" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-4">{t('onboarding.titleFinish')}<span className="text-primary italic">{t('onboarding.titleFinishHighlight')}</span></h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-sm mx-auto">
                  {t('onboarding.finishDesc')}
                </p>
                <Button size="lg" className="rounded-2xl h-14 px-12 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-all shadow-xl shadow-indigo-500/20">
                  {t('onboarding.goToDashboard')}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
