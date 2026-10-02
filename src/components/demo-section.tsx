"use client";
import { CheckCircle2, MessageSquare, ClipboardList, ImagePlus, ArrowLeft, UserCircle2, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/I18nContext"

// ── Types ──────────────────────────────────────────────────────────────────────
type MsgType = 'in' | 'out';

interface ChatMsg {
  type: MsgType;
  text: string;
  time: string;
  isOptions?: boolean;
  options?: string[];
  isPdf?: boolean;
  pdfName?: string;
  pdfSize?: string;
  isTyping?: boolean;
}

// ── Option Buttons Component ───────────────────────────────────────────────────
function OptionButtons({ options }: { options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5 mt-2">
      {options.map((opt, i) => (
        <div
          key={i}
          className="border border-[#00a884]/50 text-[#00a884] text-[13px] font-medium rounded-xl px-3 py-2 text-center cursor-pointer hover:bg-[#00a884]/10 transition-colors select-none"
        >
          {opt}
        </div>
      ))}
    </div>
  );
}

// ── PDF Bubble ─────────────────────────────────────────────────────────────────
function PdfBubble({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#111b21] rounded-xl border border-white/10">
      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-black text-[10px] tracking-wide shrink-0">
        PDF
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-[#e9edef] truncate">{name}</div>
        <div className="text-[11px] text-[#8696a0]">{size}</div>
      </div>
    </div>
  );
}

// ── Typing Indicator ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="bg-[#202c33] rounded-2xl rounded-tl-sm px-4 py-4 self-start shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] w-auto flex items-center gap-1.5 animate-in fade-in duration-200">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function DemoSection() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const now = () => new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })

  // ── Chat sequence — approx 40 seconds total ────────────────────────────────
  // Each step: { delay in ms, type, content }
  const schedule = [
    // 0-3s: greeting
    { d: 1200, type: 'out' as MsgType, text: 'Hola, buenas tardes! 👋' },
    { d: 2200, showTyping: true },
    { d: 3800, type: 'in' as MsgType, text: '¡Buenas tardes! Bienvenid@ al asistente virtual de **NovaTech Solutions**. Soy Luna, tu asesora digital 🤖✨\n\n¿En qué te puedo ayudar hoy?' },

    // 4-8s: client asks about catalog
    { d: 6000, type: 'out' as MsgType, text: 'Quiero ver sus productos, tienen catálogo?' },
    { d: 7200, showTyping: true },
    { d: 9000, type: 'in' as MsgType, text: '¡Por supuesto! Te comparto nuestro catálogo completo con precios actualizados y disponibilidad en tiempo real 📋', isPdf: true, pdfName: 'Catálogo_NovaTech_2024.pdf', pdfSize: '3.2 MB • Documento PDF' },

    // 9-14s: client asks for recommendation
    { d: 12500, type: 'out' as MsgType, text: 'Muchas gracias! Qué me recomiendas?' },
    { d: 13800, showTyping: true },
    { d: 16000, type: 'in' as MsgType, text: 'Claro, con gusto te oriento 🎯 Para darte la mejor recomendación, cuéntame:\n\n¿Qué tipo de solución estás buscando?', isOptions: true, options: ['💼 Para mi empresa / negocio', '👤 Para uso personal', '🏫 Para institución educativa', '🔍 Solo estoy explorando opciones'] },

    // 16-21s: client selects option
    { d: 20000, type: 'out' as MsgType, text: '💼 Para mi empresa / negocio' },
    { d: 21200, showTyping: true },
    { d: 23500, type: 'in' as MsgType, text: '¡Perfecto! Para negocios tenemos opciones increíbles 🚀\n\n¿Cuántos colaboradores tiene tu empresa?' , isOptions: true, options: ['👤 Solo yo (1 persona)', '👥 2 a 10 personas', '🏢 11 a 50 personas', '🏭 Más de 50 personas'] },

    // 23-30s: client selects team size, AI responds with personalized rec
    { d: 27500, type: 'out' as MsgType, text: '👥 2 a 10 personas' },
    { d: 28800, showTyping: true },
    { d: 31500, type: 'in' as MsgType, text: '¡Excelente! Para equipos pequeños y ágiles te recomiendo nuestro **Plan Esencial** 🌟\n\n✅ Hasta 15 usuarios\n✅ Automatización de procesos\n✅ Soporte prioritario 24/7\n✅ Integración con WhatsApp Business\n\n💵 Precio especial: **$149.000 COP/mes**\n\n¿Te gustaría conocer más detalles o ver una demo personalizada?' },

    // 31-36s: client interested
    { d: 34500, type: 'out' as MsgType, text: 'Sí! Me interesa mucho, cómo lo contrato?' },
    { d: 35800, showTyping: true },
    { d: 38500, type: 'in' as MsgType, text: '¡Genial! 🎉 Para formalizar, solo necesito:\n\n1️⃣ Tu **nombre completo**\n2️⃣ **Correo empresarial**\n3️⃣ **Número de WhatsApp**\n\nUn asesor humano te contactará en menos de 2 horas para acompañarte en todo el proceso. ¿Me compartes esos datos?' },

    // 38-40s: client provides data
    { d: 40500, type: 'out' as MsgType, text: 'Claro, soy Carlos Martínez, correo carlos@empresa.co y WhatsApp 3001234567' },
    { d: 41800, showTyping: true },
    { d: 43500, type: 'in' as MsgType, text: '¡Perfecto Carlos! ✅ Ya quedaste registrado en nuestro sistema.\n\nPronto te llegará un correo de confirmación y un asesor te llamará hoy mismo.\n\n¡Gracias por confiar en **NovaTech Solutions**! 🚀' },
  ]

  useEffect(() => {
    let mounted = true
    const timers: NodeJS.Timeout[] = []

    const startDemo = () => {
      setMessages([])
      setShowTyping(false)

      schedule.forEach((step) => {
        const t1 = setTimeout(() => {
          if (!mounted) return
          if (step.showTyping) {
            setShowTyping(true)
            return
          }
          setShowTyping(false)
          const msg: ChatMsg = {
            type: step.type!,
            text: step.text || '',
            time: now(),
            isOptions: step.isOptions,
            options: step.options,
            isPdf: step.isPdf,
            pdfName: step.pdfName,
            pdfSize: step.pdfSize,
          }
          setMessages(prev => [...prev, msg])
        }, step.d)
        timers.push(t1)
      })
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startDemo()
        observer.disconnect()
      }
    }, { threshold: 0.3 })

    if (chatRef.current) observer.observe(chatRef.current)

    return () => {
      mounted = false
      timers.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showTyping])

  return (
    <section id="demo" className="py-20 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── TEXT SIDE ── */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              Demo en vivo — Interacción real
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-2">
              {t('demoSection.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4b5fd] to-[#93c5fd]">
                {t('demoSection.title2')}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Mira cómo una IA entrenada con el ADN de tu negocio atiende, recomienda y cierra ventas de forma completamente autónoma.
            </p>
          </div>

          <div className="space-y-7">
            <FeatureRow
              icon={<MessageSquare className="w-6 h-6 text-indigo-400" />}
              title={t('demoSection.f1Title')}
              desc={t('demoSection.f1Desc')}
            />
            <FeatureRow
              icon={<ClipboardList className="w-6 h-6 text-blue-400" />}
              title={t('demoSection.f2Title')}
              desc={t('demoSection.f2Desc')}
            />
            <FeatureRow
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
              title={t('demoSection.f3Title')}
              desc={t('demoSection.f3Desc')}
            />
            <FeatureRow
              icon={<ImagePlus className="w-6 h-6 text-purple-400" />}
              title={t('demoSection.f4Title')}
              desc={t('demoSection.f4Desc')}
            />
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { value: '<2s', label: 'Tiempo de respuesta' },
              { value: '24/7', label: 'Disponibilidad total' },
              { value: '98%', label: 'Satisfacción cliente' },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHONE SIDE ── */}
        <div className="relative mx-auto w-full max-w-[340px]">

          {/* Glow under phone */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[220px] h-[60px] bg-indigo-500/20 blur-2xl rounded-full pointer-events-none" />

          {/* Phone frame */}
          <div
            ref={chatRef}
            id="chat-container"
            className="relative bg-[#0b141a] border-[8px] border-[#111b21] rounded-[2.5rem] h-[660px] overflow-hidden shadow-2xl flex flex-col font-sans"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 25px 60px rgba(0,0,0,0.7)' }}
          >
            {/* Status bar */}
            <div className="bg-[#111b21] px-5 pt-2 pb-1 flex items-center justify-between text-[10px] text-[#8696a0] shrink-0">
              <span className="font-bold">9:41</span>
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
              </div>
            </div>

            {/* WhatsApp Top Bar */}
            <div className="bg-[#202c33] px-3 py-2.5 flex items-center gap-3 shadow-sm shadow-black/20 z-10 shrink-0">
              <div className="flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-5 h-5 text-[#8696a0]" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white drop-shadow-sm border-2 border-indigo-400/30">
                  <UserCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#e9edef] text-[15px] truncate leading-tight">{t('demoSection.assistantName')}</div>
                <div className="text-[12px] text-[#25d366] font-medium mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
                  {t('demoSection.onlineStatus')}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 px-3 py-2 overflow-y-auto flex flex-col gap-2 bg-[#0b141a]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-1.66 1.66-.83-.83.83-.83zM5.373 60l-.83-.83 1.66-1.66.83.83-.83.83zM42.3 35.842l2.302-2.302 1.623 1.624-2.302 2.301-1.623-1.623zM14.654 26.634l2.302-2.303 1.623 1.624-2.302 2.302-1.623-1.623z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            >
              {/* Date pill */}
              <div className="text-center my-2">
                <span className="bg-[#182229] text-[#8696a0] text-[11px] font-medium px-4 py-1.5 rounded-xl shadow-sm">
                  {t('demoSection.todayLabel')}
                </span>
              </div>

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[88%] rounded-[14px] px-3 pt-2 pb-5 text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)] relative flex flex-col animate-in slide-in-from-bottom-2 fade-in duration-300 ${
                    msg.type === 'in'
                      ? 'bg-[#202c33] text-[#e9edef] self-start rounded-tl-sm'
                      : 'bg-[#005c4b] text-[#e9edef] self-end rounded-tr-sm'
                  }`}
                >
                  {/* Text with bold support */}
                  {!msg.isPdf && (
                    <div
                      className="leading-[1.5] whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  )}

                  {/* PDF Attachment */}
                  {msg.isPdf && (
                    <>
                      <div className="leading-[1.5] mb-2" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      <PdfBubble name={msg.pdfName!} size={msg.pdfSize!} />
                    </>
                  )}

                  {/* Option buttons */}
                  {msg.isOptions && msg.options && (
                    <OptionButtons options={msg.options} />
                  )}

                  {/* Timestamp + read ticks */}
                  <div className="absolute bottom-1.5 right-2.5 flex items-center gap-1 select-none">
                    <span className="text-[11px] text-white/50 font-medium">{msg.time}</span>
                    {msg.type === 'out' && (
                      <svg viewBox="0 0 16 16" width="16" height="15" className="text-[#53bdeb] fill-current opacity-90">
                        <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {showTyping && <TypingDots />}

              <div ref={bottomRef} />
            </div>

            {/* Bottom Input Bar */}
            <div className="bg-[#202c33] px-2 py-3 flex items-center gap-2 z-10 w-full min-h-[60px] shrink-0">
              <div className="flex-1 rounded-full bg-[#2a3942] h-[46px] flex items-center px-4">
                <span className="text-[#8696a0] text-[15px]">{t('demoSection.messagePlaceholder')}</span>
              </div>
              <div className="w-[46px] h-[46px] rounded-full bg-[#00a884] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-[1.2rem] h-[1.2rem] fill-[#111b21] translate-x-[2px]">
                  <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
