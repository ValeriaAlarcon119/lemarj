"use client";
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

interface Step {
  targetId: string
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
}

export function OnboardingTour({ steps, tourId }: { steps: Step[], tourId: string }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user already saw this tour
    const hasSeen = localStorage.getItem(`tour_${tourId}`)
    if (!hasSeen) {
      // Small delay to let the UI render before starting
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [tourId])

  useEffect(() => {
    if (!isVisible) return

    const updateRect = () => {
      const el = document.getElementById(steps[currentStep].targetId)
      if (el) {
        setTargetRect(el.getBoundingClientRect())
      } else {
        setTargetRect(null)
      }
    }

    updateRect()
    window.addEventListener("resize", updateRect)
    window.addEventListener("scroll", updateRect, true)

    return () => {
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("scroll", updateRect, true)
    }
  }, [currentStep, isVisible, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1)
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem(`tour_${tourId}`, "true")
  }

  if (!isVisible) return null

  // Calculate tooltip position based on targetRect
  let tooltipStyle = {}
  if (targetRect) {
    const spacing = 16
    switch (steps[currentStep].position) {
      case "bottom":
        tooltipStyle = { top: targetRect.bottom + spacing, left: targetRect.left + (targetRect.width / 2) - 150 }
        break
      case "top":
        tooltipStyle = { top: targetRect.top - 200 - spacing, left: targetRect.left + (targetRect.width / 2) - 150 }
        break
      case "right":
        tooltipStyle = { top: targetRect.top, left: targetRect.right + spacing }
        break
      case "left":
        tooltipStyle = { top: targetRect.top, left: targetRect.left - 300 - spacing }
        break
    }
  } else {
    // Fallback if element not found: center of screen
    tooltipStyle = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm pointer-events-auto"
            onClick={handleClose}
          />
          
          {/* Spotlight hole - SVGs are tricky for responsive dynamic holes, so we use absolute divs for masks or just highlight using a border/box-shadow on the target directly */}
          {targetRect && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute z-[101] rounded-2xl border-2 border-indigo-500 shadow-[0_0_0_9999px_rgba(9,9,11,0.5)] bg-transparent pointer-events-none"
            />
          )}

          {/* Tooltip Card */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ ...tooltipStyle, position: 'absolute' }}
            className="z-[102] pointer-events-auto w-[320px] bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Paso {currentStep + 1} de {steps.length}
                </span>
              </div>
              <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-lg font-black text-white mb-2">{steps[currentStep].title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {steps[currentStep].content}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
              <button 
                onClick={handleClose}
                className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
              >
                {t('onboarding.skip')}
              </button>
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button 
                    onClick={handlePrev}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800 text-white transition-colors border border-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
                >
                  {currentStep === steps.length - 1 ? t('onboarding.finish') : t('onboarding.next')}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
