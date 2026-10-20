"use client";
import { motion } from "framer-motion"
import { Check, X, Frown, Zap, Scale } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

export function ComparisonTable() {
  const { t } = useLanguage()
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4 relative z-10"
      >
        <span aria-hidden="true" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Scale className="w-4 h-4" />
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1]">
          {t('comparisonTable.title1')}
          <span className="text-gradient-brand">{t('comparisonTable.title2')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10 items-stretch">

        {/* ASESOR HUMANO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card-premium group rounded-3xl p-8 sm:p-10 flex flex-col gap-6 relative overflow-hidden hover:-translate-y-1"
        >
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 border-b border-foreground/10 pb-6 relative z-10 w-full">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              <Frown className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {t('comparisonTable.humanTitle')}
            </h3>
          </div>
          <div className="space-y-5 flex-1 relative z-10">
            <RowBad text={t('comparisonTable.human1')} />
            <RowBad text={t('comparisonTable.human2')} />
            <RowBad text={t('comparisonTable.human3')} />
            <RowBad text={t('comparisonTable.human4')} />
            <RowBad text={t('comparisonTable.human5')} />
          </div>
        </motion.div>

        {/* LEMARJ IA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-glow rounded-3xl p-8 sm:p-10 bg-zinc-950 text-white flex flex-col gap-6 relative overflow-hidden hover:-translate-y-1 transition-transform duration-500"
        >
          <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-600/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -right-20 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 border-b border-white/10 pb-6 relative z-10 w-full">
            <div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/15 text-cyan-300 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gradient-brand">
              {t('comparisonTable.aiTitle')}
            </h3>
          </div>
          <div className="space-y-5 flex-1 relative z-10">
            <RowGood text={t('comparisonTable.ai1')} />
            <RowGood text={t('comparisonTable.ai2')} />
            <RowGood text={t('comparisonTable.ai3')} />
            <RowGood text={t('comparisonTable.ai4')} />
            <RowGood text={t('comparisonTable.ai5')} />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function RowBad({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3.5 text-muted-foreground text-[15px] sm:text-base font-medium">
      <span className="w-6 h-6 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20 flex items-center justify-center shrink-0 mt-0.5 text-rose-600 dark:text-rose-300">
        <X className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>
      <span className="leading-snug pt-0.5">{text}</span>
    </div>
  )
}

function RowGood({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3.5 text-white/90 text-[15px] sm:text-base font-medium">
      <span className="w-6 h-6 rounded-lg bg-emerald-400/15 ring-1 ring-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>
      <span className="leading-snug pt-0.5">{text}</span>
    </div>
  )
}
