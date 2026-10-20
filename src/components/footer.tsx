"use client";
import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { WhatsAppIcon } from "@/components/BrandIcons"
import { useLanguage } from "@/contexts/I18nContext"

const WHATSAPP_NUMBER = "573017219288"

export function Footer() {
  const { t } = useLanguage()
  const [business, setBusiness] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)

  // El formulario abre WhatsApp con los datos ya escritos para que el lead llegue directo al chat.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!business.trim()) return setError(t('footer.errorBusiness'))
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError(t('auth.errorInvalidEmail'))
    setError("")
    const text = [
      t('footer.waIntro'),
      `${t('footer.waBusiness')}: ${business.trim()}`,
      `${t('footer.waEmail')}: ${email.trim()}`,
    ].join("\n")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  const inputClass = "w-full bg-background/70 border border-foreground/10 rounded-xl px-4 h-12 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm"

  return (
    <>
      {/* SECCIÓN FORMULARIO / DEMO */}
      <section id="contacto" className="py-24 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 text-white p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 border-glow">
          <div className="absolute inset-0 hero-dots opacity-50 pointer-events-none" />
          <div className="absolute -top-40 -right-32 w-[520px] h-[520px] bg-indigo-600/35 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-40 -left-32 w-[460px] h-[460px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex-1 space-y-5 relative z-10 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t('footer.title1')} <br />
              <span className="text-gradient-brand">{t('footer.title2')}</span>
            </h2>
            <p className="text-lg text-white/65 max-w-sm mx-auto lg:mx-0 font-medium leading-relaxed">
              {t('footer.subtitle')}
            </p>
          </div>

          <div className="flex-1 w-full max-w-md relative z-10">
            <form onSubmit={handleSubmit} noValidate className="bg-white dark:bg-zinc-900/80 text-foreground rounded-2xl p-6 sm:p-7 space-y-3 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <input
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder={t('footer.businessName')}
                aria-label={t('footer.businessName')}
                className={inputClass}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                aria-label={t('footer.emailPlaceholder')}
                className={inputClass}
              />
              {error && <p className="text-xs font-semibold text-rose-500 px-1" role="alert">{error}</p>}
              {sent && !error && (
                <p className="flex items-start gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-1" role="status">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> {t('footer.sent')}
                </p>
              )}
              <button type="submit" className="group w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-sm h-12 rounded-xl shadow-[0_12px_30px_-10px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 transition-all">
                {t('footer.submitBtn')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-foreground/10" />
                <span className="flex-shrink-0 mx-4 text-muted-foreground/60 text-[10px] font-semibold uppercase tracking-[0.25em]">O</span>
                <div className="flex-grow border-t border-foreground/10" />
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20LEMARJ!%20quiero%20una%20demo%20para%20mi%20negocio`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/25 font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <WhatsAppIcon size={16} />
                {t('footer.whatsappBtn')}
              </a>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media & Footer Bottom */}
      <footer className="w-full relative z-10 bg-gradient-to-b from-transparent to-muted/20 pb-6 overflow-hidden">
        {/* Novelty Background: Large faint glow instead of a line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative overflow-hidden w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex flex-col items-center gap-12">
          
          {/* Social Links (Original Colors) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {/* Instagram */}
            <a href="#" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#f09433"/><stop offset="0.25" stopColor="#e6683c"/><stop offset="0.5" stopColor="#dc2743"/><stop offset="0.75" stopColor="#cc2366"/><stop offset="1" stopColor="#bc1888"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#ig)"/></svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/573017219288" target="_blank" rel="noreferrer" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <svg className="w-10 h-10 fill-[#25D366]" viewBox="0 0 24 24"><path d="M12.031 0C5.38 0 0 5.38 0 12.032c0 2.656.843 5.112 2.302 7.153L.664 24l5.05-1.611A11.968 11.968 0 0 0 12.031 24c6.649 0 12.031-5.38 12.031-12.031 0-6.65-5.382-12.03-12.031-12.03zm6.545 17.202c-.281.793-1.603 1.545-2.241 1.638-.638.094-1.446.223-4.108-.887-3.216-1.341-5.308-4.636-5.464-4.845-.156-.208-1.306-1.748-1.306-3.336 0-1.587.828-2.378 1.125-2.69.296-.312.641-.39 .86-.39.218 0 .436.002.624.011.199.009.467-.076.732.56.281.674.966 2.368 1.045 2.524.08.156.126.344.016.562-.11.218-.172.358-.329.546-.156.187-.333.398-.471.554-.15.166-.308.347-.132.651.176.304.78 1.288 1.673 2.083 1.155 1.03 2.115 1.348 2.41 1.493.296.146.467.125.64-.078.172-.203.733-.852.936-1.144.203-.292.406-.244.672-.146.265.098 1.684.796 1.968.937.28.14.469.21.536.326.067.116.067.674-.213 1.467z"/></svg>
            </a>
            {/* Facebook */}
            <a href="#" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <svg className="w-10 h-10 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* TikTok - Needs bg-black fill white */}
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-xl bg-black hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.34 2.88 2.88 0 0 1 2.53-4.22h.04c.14 0 .27.02.4.05v-3.44a5.83 5.83 0 0 0-.44-.02 6.33 6.33 0 0 0-4.08 11.23 6.34 6.34 0 0 0 8.2-1.39A6.34 6.34 0 0 0 15.81 14V8.6a8.28 8.28 0 0 0 4.2 1.55v-3.44a4.9 4.9 0 0 1-.42-.02z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <svg className="w-10 h-10 fill-[#0A66C2]" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.475-.9 1.637-1.85 3.37-1.85 3.605 0 4.268 2.372 4.268 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

          {/* Footer End Credits */}
          <div className="flex flex-col items-center gap-6 mt-4 pb-8 w-full">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] mb-3 bg-black relative group transition-all duration-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105 p-2.5">
                <div className="absolute inset-0 bg-purple-500/5 blur-lg animate-pulse" />
                <img 
                  src="/logo-lemarj.jpg" 
                  alt="LEMARJ Logo" 
                  className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div 
                className="text-[10px] font-black text-foreground/70 dark:text-white/60 uppercase tracking-[0.2em] mt-2 text-center max-w-[200px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('footer.slogan') }}
              />
            </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted-foreground/50 font-medium">
            <a href="#" className="hover:text-foreground/70 transition-colors underline-offset-2 hover:underline">
              {t('legalFooter.terms')}
            </a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground/70 transition-colors underline-offset-2 hover:underline">
              {t('legalFooter.privacy')}
            </a>
          </div>
          
          <div 
            className="text-[10px] text-muted-foreground/40 text-center font-medium tracking-tight"
            dangerouslySetInnerHTML={{ __html: t('footer.copyright') }}
          />
          <div className="text-[9px] text-muted-foreground/30 text-center font-medium">
            {t('legalFooter.rights')}
          </div>
          </div>
        </div>
      </footer>
    </>
  )
}
