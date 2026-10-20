"use client";
import { motion } from "framer-motion"
import { Award, Layout, Globe, Share2, Zap, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export function FreeWebsiteOffer() {
  const { t } = useLanguage()
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7 }}
        className="border-glow relative rounded-[2rem] bg-zinc-950 text-white overflow-hidden px-6 py-14 sm:px-12 sm:py-20"
      >
        {/* Decoración */}
        <div className="absolute inset-0 hero-dots opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-indigo-600/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-cyan-500/30 blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/10 text-indigo-200 border border-white/15">
            <Award className="w-3.5 h-3.5" /> {t('freeWebsiteOffer.badge')}
          </span>

          <div className="space-y-5">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1]">
              {t('freeWebsiteOffer.title1')}{" "}
              <span className="block text-gradient-brand mt-1">{t('freeWebsiteOffer.title2')}</span>
            </h2>

            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-2xl mx-auto text-balance">
              {t('freeWebsiteOffer.desc1')}
              <span className="mx-0.5 inline-block px-2.5 py-0.5 rounded-lg bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30 font-bold">
                {t('freeWebsiteOffer.descFree')}
              </span>
              {t('freeWebsiteOffer.desc2')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureItem icon={<Layout className="w-5 h-5" />} label={t('freeWebsiteOffer.f1')} delay={0.05} />
            <FeatureItem icon={<Globe className="w-5 h-5" />} label={t('freeWebsiteOffer.f2')} delay={0.12} />
            <FeatureItem icon={<Share2 className="w-5 h-5" />} label={t('freeWebsiteOffer.f3')} delay={0.19} />
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20Quiero%20mi%20sitio%20web%20gratis"
              className="group relative inline-flex h-14 px-8 items-center justify-center gap-2 rounded-full bg-white text-zinc-950 font-bold text-[15px] shadow-[0_10px_40px_-10px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              {t('freeWebsiteOffer.cta')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function FeatureItem({ icon, label, delay }: { icon: React.ReactNode, label: string, delay: number }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5, delay }}
      className="group flex items-center gap-3 rounded-2xl px-5 py-4 bg-white/5 ring-1 ring-white/10 backdrop-blur hover:bg-white/10 hover:-translate-y-0.5 transition-all"
    >
      <span className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/15 text-cyan-300 ring-1 ring-indigo-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {icon}
      </span>
      <span className="text-sm font-bold text-white/90 text-left">{label}</span>
    </motion.div>
  )
}
