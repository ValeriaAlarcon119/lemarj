"use client";
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, Settings, ShieldCheck, Mail, Phone } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/lib/auth"

export function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAllProfiles() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('id', { ascending: false })
      
      if (data) setProfiles(data as Profile[])
      setLoading(false)
    }
    fetchAllProfiles()
  }, [])

  const handleApproveAdmin = async (id: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin', role_requested: 'client' }) // Reset requested
      .eq('id', id)
    
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, role: 'admin', role_requested: 'client' } : p))
    }
  }

  const handleRejectAdmin = async (id: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role_requested: 'client' }) // Reset requested
      .eq('id', id)
    
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, role_requested: 'client' } : p))
    }
  }

  const pendingAdmins = profiles.filter(p => p.role_requested === 'admin' && p.role !== 'admin')

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            Acceso Administrador
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground leading-none">Gestión Central</h1>
          <p className="text-zinc-500 font-bold text-lg">Monitorea y configura todas las cuentas de clientes.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm text-center min-w-[140px]">
            <span className="text-3xl font-black text-foreground">{profiles.length}</span>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Clientes</p>
          </div>
        </div>
      </header>

      {/* Admin Requests Section */}
      {pendingAdmins.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-purple-500 tracking-tight flex items-center gap-3">
            Solicitudes de Administrador
            <span className="bg-purple-500 text-white text-[10px] px-2 py-1 rounded-full">{pendingAdmins.length}</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {pendingAdmins.map(p => (
              <div key={p.id} className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-black">
                    {p.full_name?.[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{p.full_name}</h4>
                    <p className="text-xs text-zinc-500">{p.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleApproveAdmin(p.id)}
                    className="h-10 px-5 rounded-xl bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all"
                  >
                    Aprobar
                  </button>
                  <button 
                    onClick={() => handleRejectAdmin(p.id)}
                    className="h-10 px-5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          profiles.map((p) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={p.id}
              className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center gap-8 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                {p.full_name?.[0] || '?'}
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-2xl font-black text-foreground">{p.full_name || "Sin nombre"}</h4>
                <div className="flex flex-wrap gap-4 text-zinc-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <span>ID: {p.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-zinc-400" />
                    <span>{p.phone || "Sin teléfono"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {p.catalog_url && (
                  <a 
                    href={p.catalog_url} 
                    target="_blank" 
                    className="h-12 px-6 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Catálogo
                  </a>
                )}
                <button className="h-12 px-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-500 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-zinc-950 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                  <Settings className="w-4 h-4" />
                  Configurar
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
