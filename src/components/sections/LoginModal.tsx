import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isPending, setIsPending] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  const handleGoogleLogin = async () => {
    setIsPending(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || "Error al conectar con Google")
      setIsPending(false)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setStatus('idle')
    
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            }
          }
        })
        if (error) throw error
        setStatus('success')
        setMessage("¡Cuenta creada! Revisa tu correo.")
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onClose()
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || "Error en la autenticación")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          />
          
          {/* MOVING NEON BORDER CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative p-[1.5px] rounded-[2.5rem] overflow-hidden group w-full max-w-[440px] shadow-2xl"
          >
            {/* The Moving Gradient Border */}
            <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#a855f7,transparent,#6366f1,transparent,#a855f7)] animate-[spin_3s_linear_infinite] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative w-full bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden p-8 sm:p-12 text-center">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Tabs Style */}
              <div className="inline-flex p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-8 w-fit mx-auto">
                <button 
                  type="button"
                  onClick={() => { setIsRegister(false); setStatus('idle'); }}
                  className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${!isRegister ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground' : 'text-zinc-400'}`}
                >
                  Iniciar sesión
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsRegister(true); setStatus('idle'); }}
                  className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${isRegister ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground' : 'text-zinc-400'}`}
                >
                  Registrarme
                </button>
              </div>

              <div className="mb-8 text-center px-4">
                <h2 className="text-4xl font-black tracking-tighter text-foreground mb-2">Bienvenido</h2>
                <p className="text-sm text-muted-foreground font-medium">
                  {isRegister ? "Crea una cuenta para continuar" : "Inicia sesión en tu cuenta para continuar"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-4 text-left">
                  {isRegister && (
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nombre completo"
                      className="w-full h-11 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none transition-all font-medium placeholder:text-zinc-400"
                    />
                  )}
                  
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className="w-full h-11 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none transition-all font-medium placeholder:text-zinc-400"
                  />

                  {isRegister && (
                    <div className="flex gap-2">
                       <div className="w-20 h-11 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-xl flex items-center justify-center text-xs font-medium text-zinc-400">
                        co +57
                       </div>
                       <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Número de teléfono"
                        className="flex-1 h-11 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none transition-all font-medium placeholder:text-zinc-400"
                      />
                    </div>
                  )}

                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full h-11 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none transition-all font-medium placeholder:text-zinc-400"
                  />
                </div>

                {!isRegister && (
                  <div className="flex justify-end pr-2 underline underline-offset-4 decoration-zinc-200 dark:decoration-zinc-800 transition-colors hover:decoration-purple-500">
                    <button type="button" className="text-[12px] font-bold text-foreground/80 hover:text-purple-600 transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                {isRegister && (
                  <div className="flex items-start gap-3 text-left py-1">
                    <div className="w-5 h-5 rounded-md bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full" />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-bold leading-tight">
                      Al continuar, usted acepta que ha leído y aceptado la <span className="text-foreground underline decoration-zinc-300 cursor-pointer hover:text-purple-500 transition-colors">Política de privacidad</span> y <span className="text-foreground underline decoration-zinc-300 cursor-pointer hover:text-purple-500 transition-colors">Términos y condiciones</span>.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-destructive/10 text-destructive text-[11px] font-bold border border-destructive/20 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    {message}
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 text-[11px] font-bold border border-emerald-500/20 mt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {message}
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-[11px] bg-gradient-to-r from-[#e9d5ff] via-[#dbeafe] to-[#ccfbf1] hover:opacity-90 text-black border border-black shadow-lg shadow-purple-500/5 mt-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    isRegister ? "Crear cuenta" : "Continuar"
                  )}
                </Button>
              </form>

              <div className="relative py-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-100 dark:border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs font-bold">
                  <span className="bg-white dark:bg-zinc-950 px-4 text-zinc-300">o</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline" 
                className="w-full h-14 rounded-full flex items-center justify-center gap-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all bg-transparent group"
                onClick={handleGoogleLogin}
                disabled={isPending}
              >
                <img src="/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-foreground">Continuar con Google</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
