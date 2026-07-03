"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, ChevronLeft, ChevronRight, Eye, Shield, CheckCircle2,
  XCircle, Filter, RefreshCw, UserX, AlertTriangle, X,
  Activity, Users, ShieldCheck, Clock
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/lib/auth"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface PaginatedResponse {
  users: Profile[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface ImpersonationState {
  active: boolean
  targetName: string | null
  targetId: string | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast System
// ─────────────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts(prev => [...prev, { id, type, title, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, show, dismiss }
}

const toastStyles: Record<ToastType, string> = {
  success: "bg-emerald-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-amber-500 text-white",
  info: "bg-indigo-500 text-white",
}

function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`pointer-events-auto min-w-[280px] max-w-[360px] rounded-2xl px-5 py-4 shadow-2xl flex items-start gap-3 ${toastStyles[toast.type]}`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm leading-tight">{toast.title}</p>
              {toast.message && <p className="text-xs mt-0.5 opacity-90">{toast.message}</p>}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="opacity-80 hover:opacity-100 transition-opacity shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Impersonation Banner
// ─────────────────────────────────────────────────────────────────────────────

function ImpersonationBanner({
  state,
  onEnd,
}: {
  state: ImpersonationState
  onEnd: () => void
}) {
  if (!state.active) return null

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      className="fixed top-0 inset-x-0 z-[9998] bg-red-600 text-white px-6 py-3 flex items-center justify-between gap-4 shadow-2xl"
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 animate-pulse" />
        <div className="text-sm">
          <span className="font-black uppercase tracking-wider">Modo Admin Activo — </span>
          <span className="font-medium">Estás viendo la cuenta como:</span>
          <span className="font-black ml-1.5 underline underline-offset-2">{state.targetName}</span>
        </div>
      </div>
      <button
        onClick={onEnd}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all shrink-0"
      >
        <X className="w-3.5 h-3.5" />
        Salir de suplantación
      </button>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Row
// ─────────────────────────────────────────────────────────────────────────────

function StatPill({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl ${color}`}>
      <div className="opacity-80">{icon}</div>
      <div>
        <p className="text-2xl font-black leading-none">{value}</p>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component: SuperadminUsersTable
// ─────────────────────────────────────────────────────────────────────────────

export function SuperadminUsersTable() {
  const { toasts, show: showToast, dismiss } = useToast()
  const [data, setData] = useState<PaginatedResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [impersonating, setImpersonating] = useState<string | null>(null) // loading state per row
  const [impersonationState, setImpersonationState] = useState<ImpersonationState>({
    active: false,
    targetName: null,
    targetId: null,
  })

  // Filters state
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  // ── Fetch users from API ───────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        showToast("error", "Sesión expirada", "Vuelve a iniciar sesión.")
        return
      }

      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        search,
        status: statusFilter,
        role: roleFilter,
      })

      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        showToast("error", "Error al cargar usuarios", json.error ?? "Intenta de nuevo.")
        console.error("[SuperadminTable] Fetch error:", json)
        return
      }

      setData(json.data)
      console.log(`[SuperadminTable] Loaded ${json.data.users.length}/${json.data.total} users`)
    } catch (err) {
      console.error("[SuperadminTable] Unexpected error:", err)
      showToast("error", "Error de red", "No se pudo conectar al servidor.")
    } finally {
      setLoading(false)
    }
  }, [page, search, statusFilter, roleFilter, showToast])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // ── Debounced search ───────────────────────────────────────────────────────
  const handleSearchChange = (val: string) => {
    setSearchInput(val)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      setSearch(val)
      setPage(1)
    }, 350)
  }

  // ── Impersonation ──────────────────────────────────────────────────────────
  const handleImpersonate = async (targetUser: Profile) => {
    if (!targetUser.id) return
    setImpersonating(targetUser.id)
    console.log(`[SuperadminTable] Starting impersonation for: ${targetUser.id}`)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        showToast("error", "Sesión expirada")
        return
      }

      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetUserId: targetUser.id }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        showToast("error", "Error al suplantar identidad", json.error)
        console.error("[SuperadminTable] Impersonation error:", json)
        return
      }

      console.log(`[SuperadminTable] ✅ Impersonation started for: ${targetUser.full_name}`)
      setImpersonationState({
        active: true,
        targetName: targetUser.full_name,
        targetId: targetUser.id,
      })

      showToast("warning", `Viendo como: ${targetUser.full_name}`, "Acción registrada en auditoría.")
    } catch (err) {
      console.error("[SuperadminTable] Impersonation network error:", err)
      showToast("error", "Error de conexión")
    } finally {
      setImpersonating(null)
    }
  }

  const handleEndImpersonation = () => {
    setImpersonationState({ active: false, targetName: null, targetId: null })
    showToast("info", "Suplantación terminada", "Has vuelto a tu cuenta de administrador.")
    console.log("[SuperadminTable] Impersonation ended")
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalUsers = data?.total ?? 0
  const activeUsers = data?.users.filter(u => u.status === "active").length ?? 0
  const adminUsers = data?.users.filter(u => u.role === "admin").length ?? 0

  return (
    <>
      {/* Impersonation banner */}
      <AnimatePresence>
        {impersonationState.active && (
          <ImpersonationBanner state={impersonationState} onEnd={handleEndImpersonation} />
        )}
      </AnimatePresence>

      {/* Toast container */}
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <div className={`space-y-8 ${impersonationState.active ? "pt-16" : ""}`}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-600 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Panel Superadmin
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-foreground">Gestión de Usuarios</h2>
            <p className="text-zinc-500 text-sm mt-1">Control total del sistema LEMARJ. Cada acción queda auditada.</p>
          </div>
          <button
            onClick={() => { setPage(1); fetchUsers() }}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-black text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatPill icon={<Users className="w-5 h-5" />} label="Total usuarios" value={totalUsers} color="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300" />
          <StatPill icon={<Activity className="w-5 h-5" />} label="Activos (página)" value={activeUsers} color="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300" />
          <StatPill icon={<Shield className="w-5 h-5" />} label="Admins (página)" value={adminUsers} color="bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              id="admin-user-search"
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchInput}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm text-foreground placeholder:text-zinc-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm text-foreground focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          >
            <option value="">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={e => { setRoleFilter(e.target.value); setPage(1) }}
            className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm text-foreground focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          >
            <option value="">Todos los roles</option>
            <option value="client">Clientes</option>
            <option value="admin">Administradores</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">

          {/* Table header */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Usuario</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center w-20">Rol</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center w-20">Estado</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center w-36">Acciones</span>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-zinc-400">Cargando usuarios...</p>
              </div>
            </div>
          )}

          {/* Rows */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${page}-${search}-${statusFilter}-${roleFilter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {data?.users.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                    <Users className="w-10 h-10 mb-3 opacity-30" />
                    <p className="font-black">Sin resultados</p>
                    <p className="text-sm">Intenta con otro filtro o término de búsqueda</p>
                  </div>
                ) : (
                  data?.users.map((user, idx) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-6 py-4 border-b border-zinc-50 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors last:border-0"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow shrink-0">
                        {user.full_name?.[0]?.toUpperCase() ?? "?"}
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <p className="font-black text-foreground text-sm truncate">
                          {user.full_name ?? "Sin nombre"}
                        </p>
                        <p className="text-zinc-400 text-xs truncate">
                          {user.phone ?? user.id.slice(0, 12) + "..."}
                        </p>
                      </div>

                      {/* Role badge */}
                      <div className="flex justify-start md:justify-center w-20">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                            : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400"
                        }`}>
                          {user.role === "admin" ? "Admin" : "Cliente"}
                        </span>
                      </div>

                      {/* Status badge */}
                      <div className="flex justify-start md:justify-center w-20">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
                        }`}>
                          {user.status === "active"
                            ? <><CheckCircle2 className="w-2.5 h-2.5" /> Activo</>
                            : <><XCircle className="w-2.5 h-2.5" /> Inactivo</>
                          }
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 justify-start md:justify-end w-36">
                        <button
                          id={`impersonate-btn-${user.id}`}
                          onClick={() => handleImpersonate(user)}
                          disabled={impersonating === user.id || impersonationState.active}
                          title={`Ver como ${user.full_name}`}
                          className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {impersonating === user.id ? (
                            <div className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                          Ver como
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400 font-medium">
              Mostrando {((data.page - 1) * data.limit) + 1}–{Math.min(data.page * data.limit, data.total)} de {data.total} usuarios
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={data.page === 1 || loading}
                className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page pills */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                  const p = i + 1
                  const isActive = p === data.page
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      disabled={loading}
                      className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                          : "border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      } disabled:opacity-40`}
                    >
                      {p}
                    </button>
                  )
                })}
                {data.totalPages > 5 && (
                  <span className="text-zinc-400 font-black">···</span>
                )}
              </div>

              <button
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={data.page === data.totalPages || loading}
                className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
