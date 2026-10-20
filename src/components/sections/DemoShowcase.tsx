"use client";
import { motion } from "framer-motion"
import { Play, Zap, Handshake } from "lucide-react"
import { useLanguage } from "@/contexts/I18nContext"

// Rutas de los videos de demostración. Sube los archivos a /public/demos/
// y escribe aquí la ruta (ej. "/demos/respuesta-tiempo-real.mp4").
// Mientras estén vacías se muestra el contenedor listo con "Video próximamente".
export const DEMO_MEDIA = {
  realtime: { src: "", poster: "" },
  closing: { src: "", poster: "" },
}

export function DemoShowcase() {
  const { t } = useLanguage()

  return (
    <section id="demostracion" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
          <Play className="w-3.5 h-3.5" /> {t("demoShowcase.badge")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
          {t("demoShowcase.title1")}
          <span className="text-gradient-brand">{t("demoShowcase.title2")}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">{t("demoShowcase.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        {/* Mockup de escritorio: respuesta en tiempo real */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 flex flex-col"
        >
          <div className="border-glow rounded-[1.75rem] p-2 bg-gradient-to-b from-foreground/[0.06] to-transparent">
            <div className="rounded-[1.4rem] overflow-hidden bg-zinc-950 ring-1 ring-white/10 shadow-2xl shadow-indigo-500/20">
              <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-zinc-900/80">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <div className="ml-3 flex-1 max-w-xs h-5 rounded-md bg-white/5 ring-1 ring-white/10 text-[10px] text-white/40 flex items-center px-2 font-mono">lemarj.com</div>
              </div>
              <VideoSlot media={DEMO_MEDIA.realtime} label={t("demoShowcase.placeholder")} aspect="aspect-video" />
            </div>
          </div>
          <Caption icon={<Zap className="w-4 h-4" />} title={t("demoShowcase.v0Title")} desc={t("demoShowcase.v0Desc")} />
        </motion.div>

        {/* Mockup de celular: atención y cierre de leads */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col items-center"
        >
          <div className="relative w-full max-w-[290px]">
            <div className="absolute -inset-6 bg-gradient-to-br from-indigo-500/30 via-purple-400/20 to-cyan-400/30 blur-3xl rounded-full pointer-events-none" />
            <div className="relative rounded-[2.8rem] p-2.5 bg-zinc-900 ring-1 ring-white/15 shadow-2xl">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />
              <div className="rounded-[2.2rem] overflow-hidden bg-zinc-950">
                <VideoSlot media={DEMO_MEDIA.closing} label={t("demoShowcase.placeholder")} aspect="aspect-[9/19]" />
              </div>
            </div>
          </div>
          <Caption icon={<Handshake className="w-4 h-4" />} title={t("demoShowcase.v1Title")} desc={t("demoShowcase.v1Desc")} />
        </motion.div>
      </div>
    </section>
  )
}

function VideoSlot({ media, label, aspect }: { media: { src: string; poster: string }; label: string; aspect: string }) {
  if (media.src) {
    return (
      <video
        className={`w-full ${aspect} object-cover`}
        src={media.src}
        poster={media.poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        controls
      />
    )
  }
  return (
    <div className={`relative w-full ${aspect} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 hero-dots opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-transparent to-cyan-500/20" />
      <div className="relative flex flex-col items-center gap-3">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/30 flex items-center justify-center">
            <Play className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" />
          </div>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{label}</span>
      </div>
    </div>
  )
}

function Caption({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="mt-6 flex items-start gap-3 w-full">
      <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center">{icon}</div>
      <div>
        <h3 className="font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
