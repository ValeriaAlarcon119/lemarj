"use client";
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, AlertCircle, CheckCircle2, ChevronDown, Eye, EyeOff } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useLanguage } from "@/contexts/I18nContext"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

interface CountryOption {
  code: string
  label: string
  flag: string 
  iso: string
  minLength: number
  maxLength: number
}

const COUNTRIES: CountryOption[] = [
  { code: "+57", label: "Colombia",   iso: "co", flag: "co", minLength: 10, maxLength: 10 },
  { code: "+52", label: "México",     iso: "mx", flag: "mx", minLength: 10, maxLength: 10 },
  { code: "+1",  label: "USA",        iso: "us", flag: "us", minLength: 10, maxLength: 10 },
  { code: "+34", label: "España",     iso: "es", flag: "es", minLength: 9, maxLength: 9 },
  { code: "+54", label: "Argentina",  iso: "ar", flag: "ar", minLength: 10, maxLength: 11 },
  { code: "+56", label: "Chile",      iso: "cl", flag: "cl", minLength: 9, maxLength: 9 },
  { code: "+51", label: "Perú",       iso: "pe", flag: "pe", minLength: 9, maxLength: 9 },
  { code: "+58", label: "Venezuela",  iso: "ve", flag: "ve", minLength: 10, maxLength: 10 },
]

function FlagImg({ iso, size = 20 }: { iso: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      width={size}
      height={size}
      alt={iso}
      className="rounded-sm object-cover flex-shrink-0"
      style={{ height: `${Math.round(size * 0.67)}px` }}
    />
  )
}

function GradientBorder({
  children,
  active = false,
  filled = false,
}: {
  children: React.ReactNode
  active?: boolean
  filled?: boolean
}) {
  const show = active || filled
  return (
    <div
      className={`relative rounded-xl transition-all duration-300 ${
        show
          ? "p-[1.5px] bg-gradient-to-r from-[#e8caff] via-[#bcd9ff] to-[#b3f0e6]"
          : "p-[1.5px] bg-zinc-200 dark:bg-zinc-800"
      }`}
    >
      {children}
    </div>
  )
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage()
  const [isPending, setIsPending] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState(COUNTRIES[0])
  const [countryOpen, setCountryOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setFullName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setPhone("")
    setStatus("idle")
    setMessage("")
    setShowPassword(false)
    setShowConfirmPassword(false)
  }, [isRegister, isOpen])

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Prevent strictly numbers
    if (/[0-9]/.test(value)) return;
    setFullName(value);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only numbers
    if (value !== "" && !/^\d+$/.test(value)) return;
    setPhone(value);
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validations
    if (!validateEmail(email)) {
      setStatus("error")
      setMessage(t('auth.errorInvalidEmail'))
      return
    }

    if (isRegister) {
      if (fullName.trim().length < 3) {
        setStatus("error")
        setMessage(t('auth.errorFullName'))
        return
      }
      if (phone.length < country.minLength || phone.length > country.maxLength) {
        setStatus("error")
        setMessage(`El número debe tener ${country.minLength === country.maxLength ? country.minLength : `entre ${country.minLength} y ${country.maxLength}`} dígitos para ${country.label}`)
        return
      }
      if (password !== confirmPassword) {
        setStatus("error")
        setMessage(t('auth.errorPasswordMatch'))
        return
      }
      if (password.length < 6) {
        setStatus("error")
        setMessage(t('auth.errorPasswordLength'))
        return
      }
    }

    setIsPending(true)
    setStatus("idle")
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: `${country.code} ${phone}`,
              role_requested: "client",
            },
          },
        })
        if (error) throw error
        
        setStatus("success")
        setMessage(`${t('auth.successRegister')} ${email}`)
        
        // Clear fields
        setTimeout(() => {
          setIsRegister(false)
          setPassword("")
          setConfirmPassword("")
          setStatus("idle")
        }, 3000)
      } else {
        console.log('Intentando login con:', email)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        
        if (error) {
          if (error.message === "Email not confirmed") {
            throw new Error(t('auth.errorUnconfirmedEmail'))
          }
          console.error('Login error:', error)
          throw error
        }
        onClose()
      }
    } catch (err: any) {
      console.error('Auth error detail:', err)
      setStatus("error")
      let errorMsg = err.message
      if (err.message === "Invalid login credentials") {
        errorMsg = t('auth.errorInvalidCredentials')
      }
      setMessage(errorMsg)
    } finally {
      setIsPending(false)
    }
  }

  const isFilled = (val: string) => val.trim().length > 0
  const tabBg = "bg-gradient-to-r from-[#faeeff] via-[#e8f4ff] to-[#e2fbf6] border border-[#ddcaff]/50 shadow-sm"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            className="relative my-auto w-full max-w-[400px]"
          >
            {/* Elegant static glow foundation */}
            <div className="absolute inset-[-1px] rounded-[2.5rem] bg-gradient-to-r from-[#e8caff] via-[#bcd9ff] to-[#b3f0e6] opacity-30 shadow-[0_0_50px_rgba(168,85,247,0.15)]" />
            
            <div className="relative bg-white dark:bg-zinc-950 rounded-[2.5rem] p-7 sm:p-9 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-white/50 dark:border-white/5">
              {/* Close */}
              <button 
                onClick={onClose} 
                className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors z-[110]"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              <div className="overflow-y-auto custom-scrollbar pr-3 h-full">

              <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-7 w-full">
                {[false, true].map((reg) => (
                  <button
                    key={String(reg)}
                    type="button"
                    onClick={() => setIsRegister(reg)}
                    className={`relative flex-1 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all z-10 ${
                      isRegister === reg ? "text-foreground" : "text-zinc-400"
                    }`}
                  >
                    {isRegister === reg && <span className={`absolute inset-0 rounded-xl ${tabBg}`} />}
                    <span className="relative">{reg ? t('auth.registerTab') : t('auth.loginTab')}</span>
                  </button>
                ))}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-[2rem] font-black tracking-tighter text-foreground">{t('auth.welcome')}</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mt-0.5">
                  {isRegister ? t('auth.createAccount') : t('auth.accessAccount')}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-3">
                {isRegister && (
                  <GradientBorder active={focusedField === "name"} filled={isFilled(fullName)}>
                    <input
                      type="text" required value={fullName}
                      onChange={handleFullNameChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t('auth.fullName')}
                      className="w-full h-11 bg-white dark:bg-zinc-950 rounded-[10px] px-4 text-sm font-medium outline-none"
                    />
                  </GradientBorder>
                )}

                <GradientBorder active={focusedField === "email"} filled={isFilled(email)}>
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t('auth.email')}
                    className="w-full h-11 bg-white dark:bg-zinc-950 rounded-[10px] px-4 text-sm font-medium outline-none"
                  />
                </GradientBorder>

                <div className="relative">
                  <GradientBorder active={focusedField === "password"} filled={isFilled(password)}>
                    <input
                      type={showPassword ? "text" : "password"} 
                      required 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t('auth.password')}
                      autoComplete="new-password"
                      className="w-full h-11 bg-white dark:bg-zinc-950 rounded-[10px] pl-4 pr-10 text-sm font-medium outline-none"
                    />
                  </GradientBorder>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {isRegister && (
                  <div className="relative">
                    <GradientBorder active={focusedField === "confirmPassword"} filled={isFilled(confirmPassword)}>
                      <input
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('auth.confirmPassword')}
                        className="w-full h-11 bg-white dark:bg-zinc-950 rounded-[10px] pl-4 pr-10 text-sm font-medium outline-none"
                      />
                    </GradientBorder>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                )}

                {isRegister && (
                  <div className="flex gap-2">
                    <div ref={dropdownRef} className="relative">
                      <GradientBorder active={countryOpen} filled={true}>
                        <button
                          type="button"
                          onClick={() => setCountryOpen(o => !o)}
                          className="flex items-center gap-1.5 h-11 px-3 bg-white dark:bg-zinc-950 rounded-[10px] w-full min-w-[90px] text-xs font-bold text-zinc-600 dark:text-zinc-300"
                        >
                          <FlagImg iso={country.iso} size={20} />
                          <span className="text-[11px]">{country.code}</span>
                          <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${countryOpen ? "rotate-180" : ""}`} />
                        </button>
                      </GradientBorder>

                      <AnimatePresence>
                        {countryOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            className="absolute top-[calc(100%+6px)] left-0 z-50 w-52 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
                          >
                            <div className="max-h-52 overflow-y-auto py-1">
                              {COUNTRIES.map(c => (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => { setCountry(c); setCountryOpen(false) }}
                                  className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left ${c.code === country.code ? "bg-purple-50 dark:bg-purple-900/20" : ""}`}
                                >
                                  <FlagImg iso={c.iso} size={22} />
                                  <span className="text-xs font-bold text-foreground flex-1">{c.label}</span>
                                  <span className="text-[10px] font-black text-zinc-400">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex-1">
                      <GradientBorder active={focusedField === "phone"} filled={isFilled(phone)}>
                        <input
                          type="text" required value={phone}
                          onChange={handlePhoneChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          placeholder={t('auth.phone')}
                          className="w-full h-11 bg-white dark:bg-zinc-950 rounded-[10px] px-4 text-sm font-medium outline-none"
                        />
                      </GradientBorder>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-500 text-[11px] font-bold border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />{message}
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />{message}
                  </motion.div>
                )}

                <button
                  type="submit" disabled={isPending}
                  className="w-full h-12 rounded-xl font-black uppercase tracking-[0.18em] text-[11px] bg-gradient-to-r from-[#f0d6ff] via-[#d6ebff] to-[#c6f4eb] text-zinc-800 border border-black/80 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md flex items-center justify-center mt-1"
                >
                  {isPending
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : isRegister ? t('auth.submitRegister') : t('auth.submitLogin')
                  }
                </button>
              </form>

              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100 dark:border-zinc-800" /></div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-zinc-950 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">{t('auth.or')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } })}
                className="w-full h-11 rounded-xl border border-black/80 flex items-center justify-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-xs font-black uppercase tracking-widest"
              >
                <img src="/google.svg" alt="Google" className="w-4 h-4" />
                {t('auth.continueWithGoogle')}
              </button>
              </div> {/* Close overflow-y-auto */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
