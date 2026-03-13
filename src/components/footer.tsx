import { WhatsAppIcon } from "./comparison-table"

export function Footer() {
  return (
    <>
      {/* SECCIÓN FORMULARIO / DEMO - ESTILO SLIM & PRO */}
      <section id="contacto" className="py-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-[3.5rem] p-8 sm:p-14 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center justify-between gap-12 group">
          
          {/* Fondo animado sutil - Más vibrante */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="flex-1 space-y-6 relative z-10 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.1] text-foreground">
              Automatiza <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 drop-shadow-sm">
                hoy mismo.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground/70 max-w-sm mx-auto lg:mx-0 font-medium leading-relaxed">
              Déjanos tus datos o escríbenos a WhatsApp. En menos de 24h empezamos a construir tu IA.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md relative z-10">
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Nombre de tu negocio" 
                className="w-full bg-white/60 dark:bg-black/20 border border-border/30 rounded-2xl px-5 h-14 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 ring-indigo-500/30 transition-all font-bold relative z-10 text-sm"
              />
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                className="w-full bg-white/60 dark:bg-black/20 border border-border/30 rounded-2xl px-5 h-14 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 ring-indigo-500/30 transition-all font-bold relative z-10 text-sm"
              />
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.01] active:scale-95 text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3 group relative z-10 transition-all">
                Solicitar Ingeniería AI
              </button>
              
              <div className="relative flex items-center py-1 z-10">
                <div className="flex-grow border-t border-border/20"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground/30 text-[9px] font-black uppercase tracking-[0.3em]">O</span>
                <div className="flex-grow border-t border-border/20"></div>
              </div>

              <a 
                href="https://wa.me/573017219288?text=Hola%20LEMARJ!%20quiero%20una%20demo%20para%20mi%20negocio" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Directo
              </a>
            </div>
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
              <div className="text-[10px] font-black text-foreground/70 dark:text-white/60 uppercase tracking-[0.2em] mt-2 text-center max-w-[200px] leading-relaxed">
                Impulsa tus ventas <br /> y mejora tu atención
              </div>
            </div>
            
            <div className="text-[10px] text-muted-foreground/40 text-center font-medium tracking-tight">
              © 2026 LEMARJ en San Juan de Pasto, Colombia. <br className="sm:hidden" />Todo automatizado, todo seguro.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

