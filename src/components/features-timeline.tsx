"use client";
import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ShieldCheck, MessageSquareText, Timer, Lock, HeartHandshake, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

export function FeaturesTimeline() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const steps = [
    {
      num: "1",
      icon: <MessageSquareText className="w-5 h-5" />,
      tile: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20",
      title: t('featuresTimeline.step1Title'),
      desc: t('featuresTimeline.step1Desc'),
    },
    {
      num: "2",
      icon: <Timer className="w-5 h-5" />,
      tile: "bg-purple-500/10 text-purple-600 dark:text-purple-300 ring-1 ring-purple-500/20",
      title: t('featuresTimeline.step2Title'),
      desc: t('featuresTimeline.step2Desc'),
    },
    {
      num: "3",
      icon: <ShieldCheck className="w-5 h-5" />,
      tile: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20",
      title: t('featuresTimeline.step3Title'),
      desc: t('featuresTimeline.step3Desc'),
    },
    {
      num: "4",
      icon: <Lock className="w-5 h-5" />,
      tile: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-500/20",
      title: t('featuresTimeline.step4Title'),
      desc: t('featuresTimeline.step4Desc'),
    },
    {
      num: "5",
      icon: <HeartHandshake className="w-5 h-5" />,
      tile: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20",
      title: t('featuresTimeline.step5Title'),
      desc: t('featuresTimeline.step5Desc'),
    },
    {
      num: "6",
      icon: <Zap className="w-5 h-5" />,
      tile: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20",
      title: t('featuresTimeline.step6Title'),
      desc: t('featuresTimeline.step6Desc'),
    }
  ]

  return (
    <section id="features" ref={containerRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24 relative">

      {/* Decorative glows */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4 relative"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Zap className="w-3.5 h-3.5" /> {t('featuresTimeline.label')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
          {t('featuresTimeline.title1')} <br />
          <span className="text-gradient-brand">{t('featuresTimeline.title2')}</span>
        </h2>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">

        {/* Scroll progress line */}
        <div className="absolute left-[27px] sm:left-[35px] top-8 bottom-8 w-[2px] bg-foreground/[0.07] rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-indigo-500 via-purple-400 to-cyan-400"
          />
        </div>

        <div className="space-y-5 sm:space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative flex items-start gap-5 sm:gap-8 group"
            >
              {/* Node */}
              <div className="relative shrink-0 w-14 h-14 sm:w-[72px] sm:h-[72px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 w-full h-full rounded-2xl card-premium flex items-center justify-center group-hover:scale-105">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.tile}`}>
                    {step.icon}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
                  {step.num}
                </div>
              </div>

              {/* Content card */}
              <div className="card-premium relative flex-1 rounded-3xl p-6 sm:p-8 overflow-hidden group-hover:-translate-y-1">
                <span className="absolute top-5 right-6 text-[11px] font-mono text-muted-foreground/60">0{step.num}</span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 pr-10 text-foreground">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium max-w-2xl text-pretty">
                  {step.desc}
                </p>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: "2.5rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 mt-5"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
