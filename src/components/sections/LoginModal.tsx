import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Chrome, Loader2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isPending, setIsPending] = useState(false)

  const handleGoogleLogin = () => {
    setIsPending(true)
    // Simulating login logic from Grayola
    setTimeout(() => {
      setIsPending(false)
      onClose()
    }, 2000)
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
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-background border rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <div className="text-2xl">💜</div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Bienvenido a LEMARJ</h2>
              <p className="text-muted-foreground mt-2">Gestiona tu negocio con IA de alta fidelidad</p>
            </div>

            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl flex items-center justify-center gap-3 border-2 hover:bg-muted transition-all group"
                onClick={handleGoogleLogin}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                )}
                <span className="font-bold">Continuar con Google</span>
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-bold tracking-tighter">O usa tu correo</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="tu@correo.com"
                    className="w-full h-12 bg-muted/50 border rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                  />
                </div>
                <Button className="w-full h-12 rounded-xl font-bold">
                  Enviar Enlace Mágico
                </Button>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 px-6">
              Al continuar, aceptas nuestros <span className="text-foreground font-bold underline cursor-pointer">Términos de Servicio</span> y <span className="text-foreground font-bold underline cursor-pointer">Política de Privacidad</span>.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
