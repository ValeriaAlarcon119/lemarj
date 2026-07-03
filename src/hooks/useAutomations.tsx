"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { UserAutomation, ApiResult } from "@/types/database"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "warning" | "info"

export interface ToastItem {
  id: string
  type: ToastType
  title: string
  message?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast Hook — reusable across all dashboards
// ─────────────────────────────────────────────────────────────────────────────

export function useToast(autoDismissMs = 4500) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const show = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2)}`
      setToasts(prev => [...prev, { id, type, title, message }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), autoDismissMs)
      return id
    },
    [autoDismissMs]
  )

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, show, dismiss }
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast Container Component
// ─────────────────────────────────────────────────────────────────────────────

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 shrink-0" />,
  warning: <AlertCircle className="w-5 h-5 shrink-0" />,
  info: <Info className="w-5 h-5 shrink-0" />,
}

const styles: Record<ToastType, { bg: string; border: string; text: string }> = {
  success: {
    bg: "bg-gradient-to-r from-emerald-500 to-green-500",
    border: "border-emerald-400",
    text: "text-white",
  },
  error: {
    bg: "bg-gradient-to-r from-red-500 to-rose-500",
    border: "border-red-400",
    text: "text-white",
  },
  warning: {
    bg: "bg-gradient-to-r from-amber-400 to-orange-400",
    border: "border-amber-300",
    text: "text-white",
  },
  info: {
    bg: "bg-gradient-to-r from-indigo-500 to-violet-500",
    border: "border-indigo-400",
    text: "text-white",
  },
}

export function ToastContainer({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[]
  dismiss: (id: string) => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-[360px]">
      <AnimatePresence>
        {toasts.map(toast => {
          const s = styles[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className={`pointer-events-auto w-full rounded-2xl border shadow-2xl shadow-black/20 px-4 py-3.5 flex items-start gap-3 ${s.bg} ${s.border} ${s.text}`}
            >
              <div className="mt-0.5 opacity-90">{icons[toast.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm leading-tight">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs mt-0.5 opacity-90 leading-snug">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="opacity-70 hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                aria-label="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// useInstantiateAutomation — the core Módulo 1 hook
// ─────────────────────────────────────────────────────────────────────────────

export interface InstantiateOptions {
  templateId: string
  templateTitle?: string
  customName?: string
}

export interface UseInstantiateAutomationReturn {
  handleUseIdea: (opts: InstantiateOptions) => Promise<void>
  loadingTemplateId: string | null
  activatedIds: Set<string>
}

export function useInstantiateAutomation(
  toast: Pick<ReturnType<typeof useToast>, "show">
): UseInstantiateAutomationReturn {
  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null)
  const [activatedIds, setActivatedIds] = useState<Set<string>>(new Set())

  const handleUseIdea = useCallback(
    async ({ templateId, templateTitle, customName }: InstantiateOptions) => {
      if (loadingTemplateId !== null) {
        console.log("[useInstantiateAutomation] Already processing another request, skipping.")
        return
      }

      console.log(`[useInstantiateAutomation] Instantiating template: ${templateId} — "${templateTitle}"`)
      setLoadingTemplateId(templateId)

      try {
        // ── Get current session ──────────────────────────────────────────────
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
          console.warn("[useInstantiateAutomation] No active session.")
          toast.show("error", "Inicia sesión", "Debes iniciar sesión para activar automatizaciones.")
          return
        }

        // ── Call the instantiate endpoint ────────────────────────────────────
        const res = await fetch("/api/automations/instantiate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ templateId, customName }),
        })

        const json: ApiResult<UserAutomation> = await res.json()

        console.log(`[useInstantiateAutomation] Response ${res.status}:`, json)

        if (!res.ok || !json.success) {
          // Handle specific error codes gracefully
          const code = (json as { code?: string }).code
          if (code === "ALREADY_EXISTS") {
            toast.show(
              "info",
              "Ya la tienes activa",
              `"${templateTitle ?? "Esta automatización"}" ya está en tu panel. Ve a "Mis Automatizaciones" para gestionarla.`
            )
          } else if (code === "UNAUTHENTICATED" || code === "INVALID_TOKEN") {
            toast.show("error", "Sesión expirada", "Recarga la página e inicia sesión de nuevo.")
          } else {
            toast.show("error", "Error al activar", (json as { error?: string }).error ?? "Intenta de nuevo.")
          }
          return
        }

        // ── Success ──────────────────────────────────────────────────────────
        setActivatedIds(prev => new Set(prev).add(templateId))
        toast.show(
          "success",
          `✨ ¡${templateTitle ?? "Automatización"} activada!`,
          json.message ?? "Ya aparece en tu panel de automatizaciones."
        )

        console.log(`[useInstantiateAutomation] ✅ Automation created:`, json.data)
      } catch (err) {
        console.error("[useInstantiateAutomation] Network error:", err)
        toast.show("error", "Error de conexión", "Revisa tu internet e inténtalo de nuevo.")
      } finally {
        setLoadingTemplateId(null)
      }
    },
    [loadingTemplateId, toast]
  )

  return { handleUseIdea, loadingTemplateId, activatedIds }
}

// ─────────────────────────────────────────────────────────────────────────────
// UseIdeaButton — Drop-in replacement for the static CTA button in IdeaCard
// Usage: <UseIdeaButton templateId={card.id.toString()} templateTitle={card.title} />
// ─────────────────────────────────────────────────────────────────────────────

export function UseIdeaButton({
  templateId,
  templateTitle,
  className,
}: {
  templateId: string
  templateTitle: string
  className?: string
}) {
  const { toasts, show, dismiss } = useToast()
  const { handleUseIdea, loadingTemplateId, activatedIds } = useInstantiateAutomation({ show })

  const isLoading = loadingTemplateId === templateId
  const isActivated = activatedIds.has(templateId)

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <button
        id={`use-idea-btn-${templateId}`}
        disabled={isLoading || isActivated}
        onClick={() => handleUseIdea({ templateId, templateTitle })}
        className={`w-full flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest py-2.5 rounded-xl transition-all duration-200 ${
          isActivated
            ? "bg-emerald-500 text-white cursor-default"
            : isLoading
            ? "bg-indigo-400 text-white cursor-wait"
            : "bg-slate-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white"
        } ${className ?? ""}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Activando...
          </>
        ) : isActivated ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            ¡Activada!
          </>
        ) : (
          <>
            Usar esta idea
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </>
  )
}
