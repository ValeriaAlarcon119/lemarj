import { CheckCircle2, MessageSquare, ClipboardList, ImagePlus, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export function DemoSection() {
  const [messages, setMessages] = useState<{type: 'in' | 'out', text: string, time: string}[]>([])

  useEffect(() => {
    let mounted = true
    const chatSequence = [
      { t: 'out', html: 'Hola q tienen?', d: 1500 },
      { t: 'in', html: '¡Buenas! 💜 En LEVJ tenemos amigurumis desde $18K, joyería espiritual desde $32K y cajitas de regalo desde $65K. ¿Cuál te llama la atención?', d: 3500 },
      { t: 'out', html: 'quiero algo para regalar en una boda', d: 5500 },
      { t: 'in', html: 'Tenemos la **Box Boda Real** 💜 Pareja de novios amigurumi, chocolates y tarjeta en caligrafía dorada. Precio: **$135.000 COP**. Domicilio en Pasto GRATIS.', d: 8000 },
      { t: 'out', html: 'perfecto! como pago?', d: 10500 },
      { t: 'in', html: 'Con gusto 😊 Para confirmar necesito nombre y dirección. Pago por **Nequi al 3017219288**.', d: 13000 },
    ]

    const runChat = () => {
      chatSequence.forEach(({ t, html, d }) => {
        setTimeout(() => {
          if (!mounted) return
          setMessages(prev => [...prev, { 
            type: t as 'in'|'out', 
            text: html, 
            time: new Date().toLocaleTimeString('es', {hour: '2-digit', minute: '2-digit'}) 
          }])
        }, d)
      })
    }

    // intersection observer to start chat
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runChat()
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    const chatbox = document.getElementById('chat-container')
    if (chatbox) observer.observe(chatbox)
      
    return () => { mounted = false; observer.disconnect() }
  }, [])

  return (
    <section id="demo" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-background to-transparent">
      {/* Background glow for this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* TEXT SIDE */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-2 drop-shadow-sm">
              Mira cómo tu IA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4b5fd] to-[#93c5fd] drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] dark:drop-shadow-none">
                asesora y cierra ventas
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            <FeatureRow 
              icon={<MessageSquare className="w-6 h-6 text-indigo-500" />}
              title="Entiende lenguaje real" 
              desc="Funciona aunque el cliente escriba mal, use jerga colombiana o hable muy informal." 
            />
            <FeatureRow 
              icon={<ClipboardList className="w-6 h-6 text-blue-500" />}
              title="Recomienda productos específicos" 
              desc="Con precios exactos de tu catálogo. No inventa ni confunde." 
            />
            <FeatureRow 
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              title="Cierra el pedido" 
              desc="Solicita nombre, dirección y medio de pago de forma natural y amable." 
            />
            <FeatureRow 
              icon={<ImagePlus className="w-6 h-6 text-purple-500" />}
              title="Procesa fotos y documentos" 
              desc="Envía PDFs, entiende fotos que envíe el cliente y responde enviando fotos de tus productos recomendados." 
            />
          </div>
        </div>

        {/* PHONE SIDE */}
        <div className="relative mx-auto w-full max-w-[340px]">
          {/* Decorative frame */}
          <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500 to-emerald-500 rounded-[3rem] blur opacity-30 animate-pulse" />
          
          <div id="chat-container" className="relative bg-[#0b141a] border-[8px] border-[#111b21] rounded-[2.5rem] h-[650px] overflow-hidden shadow-2xl flex flex-col font-sans">
            
            {/* Topbar Phone (WhatsApp Dark Mode) */}
            <div className="bg-[#202c33] px-3 py-3 flex items-center gap-3 shadow-sm shadow-black/20 z-10 shrink-0">
              <div className="flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-5 h-5 text-[#8696a0]" />
                <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-lg drop-shadow-sm">💜</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#e9edef] text-[16px] truncate leading-tight">LEVJ Artesanías</div>
                <div className="text-[13px] text-[#8696a0] font-medium mt-0.5">en línea</div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 relative bg-[#0b141a] bg-opacity-[0.93] isolate">
              {/* WhatsApp doodle background */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-1.66 1.66-.83-.83.83-.83zM5.373 60l-.83-.83 1.66-1.66.83.83-.83.83zM42.3 35.842l2.302-2.302 1.623 1.624-2.302 2.301-1.623-1.623zM14.654 26.634l2.302-2.303 1.623 1.624-2.302 2.302-1.623-1.623zM34.773 17.653l1.9-1.9 1.414 1.414-1.9 1.9-1.414-1.414zM21.91 44.516l1.9-1.9 1.414 1.414-1.9 1.9-1.414-1.414zM40.237 0l2.404 2.404-1.556 1.556L38.68 1.556 40.237 0zM19.763 60l-2.404-2.404 1.556-1.556 2.404 2.404-1.556 1.556zM50.416 11.457l3.155-3.155 1.536 1.536-3.155 3.155-1.536-1.536zM9.584 48.543l-3.155 3.155-1.536-1.536 3.155-3.155 1.536 1.536zM59.94 28H60v4h-.058c-.28-1.5-.83-2.887-1.576-4zM.059 28C.34 29.5.888 30.886 1.635 32H0v-4h.059zM28 0h4v2.513c-1.396-.45-2.86-.688-4-.688V0zm0 60v-1.825c1.14 0 2.604-.239 4-.688V60h-4zM16.638 10.42l3.39-3.39 1.705 1.706-3.39 3.39-1.705-1.706C18.152 9.074 19.348 8 20.73 8c.762 0 1.488.196 2.138.542l1.649-1.65A7.96 7.96 0 0 0 20.73 6c-2.185 0-4.168.877-5.617 2.302l1.525 2.118zM43.362 49.58l-3.39 3.39-1.705-1.706 3.39-3.39 1.705 1.706C41.848 50.926 40.652 52 39.27 52c-.762 0-1.488-.196-2.138-.542l-1.649 1.65A7.96 7.96 0 0 0 39.27 54c2.185 0 4.168-.877 5.617-2.302l-1.525-2.118zM31 16.5c-3.037 0-5.5-2.462-5.5-5.5s2.463-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.463 5.5-5.5 5.5zm0-2c1.933 0 3.5-1.567 3.5-3.5S32.933 7.5 31 7.5 27.5 9.067 27.5 11s1.567 3.5 3.5 3.5zM29 43.5c3.037 0 5.5 2.462 5.5 5.5s-2.463 5.5-5.5 5.5-5.5-2.462-5.5-5.5 2.463-5.5 5.5-5.5zm0 2c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '150px'}} />
              
              <div className="text-center my-3">
                <span className="bg-[#182229] text-[#8696a0] text-[12px] font-medium px-4 py-1.5 rounded-xl shadow-sm">HOY</span>
              </div>
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] rounded-[14px] p-2 text-[15px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative animate-in slide-in-from-bottom-2 fade-in duration-300 flex flex-col ${
                  msg.type === 'in' 
                    ? 'bg-[#202c33] text-[#e9edef] self-start rounded-tl-sm' 
                    : 'bg-[#005c4b] text-[#e9edef] self-end rounded-tr-sm'
                }`}>
                  <div className="leading-[1.4] pb-3 pr-2" dangerouslySetInnerHTML={{__html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                  <div className="absolute bottom-1 right-2 w-auto flex items-center justify-end gap-1 select-none">
                    <span className="text-[11px] text-white/60 font-medium tracking-wide translate-y-[1px]">{msg.time}</span>
                    {msg.type === 'out' && <svg viewBox="0 0 16 16" width="16" height="15" className="text-[#53bdeb] fill-current opacity-90"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {messages.length > 0 && messages.length < 6 && messages.length % 2 !== 0 && (
                <div className="bg-[#202c33] rounded-2xl rounded-tl-sm px-4 py-4 self-start shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] w-auto flex items-center gap-1.5 animate-in fade-in duration-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" style={{animationDelay: '0ms'}} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" style={{animationDelay: '150ms'}} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8696a0] animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              )}
            </div>

            {/* Bottom Input Area */}
            <div className="bg-[#202c33] px-2 py-3 flex items-center gap-2 z-10 w-full min-h-[60px] shrink-0">
              <div className="flex-1 rounded-full bg-[#2a3942] h-[46px] flex items-center px-4">
                <span className="text-[#8696a0] text-[16px]">Mensaje</span>
              </div>
              <div className="w-[46px] h-[46px] rounded-full bg-[#00a884] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#008f6f] transition-colors">
                <svg viewBox="0 0 24 24" className="w-[1.2rem] h-[1.2rem] fill-[#111b21] translate-x-[2px]"><path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817z"/></svg>
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
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  )
}
