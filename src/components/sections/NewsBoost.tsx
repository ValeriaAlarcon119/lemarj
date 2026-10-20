"use client";
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Zap, X, ExternalLink, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLanguage } from "@/contexts/I18nContext"

const TRENDS = (t: (key: string) => string) => [
  {
    title: t('newsBoost.trends.t0.title'),
    category: t('newsBoost.trends.t0.category'),
    growth: "+520%",
    image: "https://images.unsplash.com/photo-1596462502278-27bf2d370148?auto=format&fit=crop&q=80&w=800",
    accent: "text-indigo-600 dark:text-indigo-300",
    bar: "from-indigo-500 to-purple-400",
    url: "https://www.cosmeticsdesign.com/Article/2023/06/21/How-social-media-is-shaping-the-future-of-the-beauty-industry"
  },
  {
    title: t('newsBoost.trends.t1.title'),
    category: t('newsBoost.trends.t1.category'),
    growth: "+310%",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    accent: "text-purple-600 dark:text-purple-300",
    bar: "from-purple-400 to-cyan-400",
    url: "https://www.forbes.com/sites/forbesagencycouncil/2023/08/15/the-future-of-social-selling-trends-and-predictions/"
  },
  {
    title: t('newsBoost.trends.t2.title'),
    category: t('newsBoost.trends.t2.category'),
    growth: "+680%",
    image: "https://images.unsplash.com/photo-1633174524778-61a18ee54490?auto=format&fit=crop&q=80&w=800",
    accent: "text-cyan-600 dark:text-cyan-300",
    bar: "from-cyan-400 to-indigo-500",
    url: "https://www.socialmediaexaminer.com/how-to-go-viral-on-tiktok-reels-and-shorts/"
  }
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export function NewsBoost() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const trendsData = TRENDS(t)

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24 relative">
      {/* Brillo de fondo */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[min(900px,100%)] h-[420px] bg-gradient-to-r from-indigo-500/10 via-purple-400/10 to-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>{t('newsBoost.badge')}</span>
            </span>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight"
              dangerouslySetInnerHTML={{
                __html: `<span class="text-gradient-brand">${t('newsBoost.title1')}</span><br />${t('newsBoost.title2')}`
              }}
            />
            <p
              className="text-lg text-muted-foreground font-medium leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `${t('newsBoost.desc1')}<span class="text-foreground font-semibold">${t('newsBoost.descBold')}</span>${t('newsBoost.desc2')}`
              }}
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="shrink-0">
            <Button
              size="lg"
              className="group rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-semibold shadow-lg shadow-indigo-500/15"
              onClick={() => setIsModalOpen(true)}
            >
              {t('newsBoost.viewAll')}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trendsData.map((item, index) => (
            <motion.article
              key={index}
              {...fadeUp}
              transition={{ delay: index * 0.1, duration: 0.55 }}
              className="card-premium group relative rounded-3xl overflow-hidden flex flex-col h-full hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
                <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${item.bar}`} />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/60 backdrop-blur-md text-white text-xs font-semibold tabular-nums ring-1 ring-white/15">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {item.growth}
                </div>
                {/* Sparkline decorativa */}
                <svg viewBox="0 0 60 20" className="absolute bottom-4 right-4 w-16 h-5" aria-hidden="true">
                  <path d="M0 18 L10 15 L20 16 L30 10 L40 11 L50 5 L60 2" fill="none" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="flex-1 flex flex-col p-6 sm:p-7">
                <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] mb-2 block ${item.accent}`}>
                  {item.category}
                </span>
                <h3 className="text-lg font-bold tracking-tight leading-snug mb-6 line-clamp-2 text-foreground">
                  {item.title}
                </h3>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors group/btn"
                >
                  <span>{t('newsBoost.readMore')}</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal de noticias */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative w-full max-w-xl bg-background border border-border rounded-3xl p-7 sm:p-10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400" />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-border bg-muted/50 hover:bg-muted transition-colors group"
              >
                <X className="w-4 h-4 text-foreground group-hover:rotate-90 transition-transform" />
              </button>

              <div className="relative space-y-7">
                <div className="space-y-3 pr-10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-foreground">{t('newsBoost.modalTitle')}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {t('newsBoost.modalDesc')}
                  </p>
                </div>

                <div className="border-glow relative overflow-hidden rounded-2xl bg-zinc-950 text-white p-6 sm:p-7 text-center space-y-3">
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[360px] h-[140px] bg-gradient-to-r from-indigo-600/40 via-purple-500/30 to-cyan-500/40 blur-[60px] pointer-events-none" />
                  <p className="relative font-semibold text-indigo-200 italic leading-relaxed">{t('newsBoost.modalQuote')}</p>
                  <p className="relative text-sm text-zinc-400">{t('newsBoost.modalFooter')}</p>
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-semibold"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {t('newsBoost.modalBtn')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
