"use client";
import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, History, MessageSquare, Upload, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/lib/auth"
import { AutomationExplorer } from "./AutomationExplorer"
import { EcosystemView } from "./EcosystemView"

interface ClientDashboardProps {
  profile: Profile
  onUpdate: (data: Partial<Profile>) => void
  activeTab?: string
}

export function ClientDashboard({ profile, onUpdate, activeTab = 'dashboard' }: ClientDashboardProps) {
  // ── Route to new views ──────────────────────────────────────────────────
  if (activeTab === 'automation') {
    return <AutomationExplorer />
  }
  if (activeTab === 'ecosystem') {
    return <EcosystemView />
  }

  // ── Original dashboard state ─────────────────────────────────────────── 
  const [history, setHistory] = useState(profile.company_history || "")
  const [isSaving, setIsSaving] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const handleSaveHistory = async () => {
    setIsSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ company_history: history })
      .eq('id', profile.id)
    
    if (!error) {
      onUpdate({ company_history: history })
    }
    setIsSaving(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'catalog' | 'photo') => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus(`Subiendo ${type}...`)
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${profile.id}-${Math.random()}.${fileExt}`
    const filePath = `${type}s/${fileName}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('client-docs')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('client-docs')
        .getPublicUrl(filePath)

      if (type === 'catalog') {
        await supabase.from('profiles').update({ catalog_url: publicUrl }).eq('id', profile.id)
        onUpdate({ catalog_url: publicUrl })
      }
      
      setUploadStatus("¡Subida exitosa!")
      setTimeout(() => setUploadStatus(null), 3000)
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-32">
      <header className="space-y-2">
        <h1 className="text-5xl font-black tracking-tighter text-foreground">Panel de Control</h1>
        <p className="text-zinc-500 font-bold text-lg">Personaliza la inteligencia de tu negocio.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entrenar IA: Historia */}
        <section className="p-8 rounded-[3rem] bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <History className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-foreground">Historia de tu Empresa</h3>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">
              Cuéntale a la IA cómo nació tu negocio para que sus respuestas tengan tu alma.
            </p>
          </div>
          <textarea 
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="w-full h-40 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none font-medium"
            placeholder="Escribe aquí tu historia..."
          />
          <Button 
            onClick={handleSaveHistory}
            disabled={isSaving}
            className="w-full h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase tracking-widest text-[11px]"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Guardar Historia"}
          </Button>
        </section>

        {/* Documentos: Catálogo */}
        <section className="p-8 rounded-[3rem] bg-indigo-50/30 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-foreground">Catálogo PDF</h3>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">
              Sube tu catálogo de productos para que la IA sepa exactamente qué vendes.
            </p>
          </div>
          
          <div className="relative group">
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'catalog')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-32 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 rounded-3xl flex flex-col items-center justify-center gap-2 group-hover:bg-indigo-500/5 transition-all">
              <Upload className="w-6 h-6 text-indigo-400" />
              <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">
                {profile.catalog_url ? "Cambiar catálogo" : "Subir Catálogo"}
              </span>
            </div>
          </div>

          {profile.catalog_url && (
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-indigo-100/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold text-foreground">Catálogo activo en la IA</span>
            </div>
          )}
        </section>
      </div>

      {/* Formulario de Atención */}
      <section className="p-10 md:p-14 rounded-[4rem] bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-zinc-950 dark:to-zinc-950 border border-zinc-100 dark:border-zinc-800 shadow-2xl space-y-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-foreground">Trato Especializado</h2>
            <p className="text-lg text-zinc-500 font-medium">Ayúdanos a perfilar el tono de voz de tu asistente IA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-zinc-400 uppercase tracking-widest">¿Cómo es el trato ideal a tus clientes?</label>
            <input className="w-full h-14 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="Ej: Formal, muy cercano, juvenil..." />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black text-zinc-400 uppercase tracking-widest">¿Qué es lo que más preguntan?</label>
            <input className="w-full h-14 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="Ej: Precios, tiempos de entrega, tallas..." />
          </div>
        </div>

        <div className="pt-6">
          <Button className="h-16 px-12 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-[.2em] text-[11px] shadow-2xl hover:scale-105 transition-all">
            Finalizar Configuración IA
          </Button>
        </div>
      </section>

      {uploadStatus && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 right-10 bg-zinc-900 text-white px-6 py-4 rounded-2xl font-bold shadow-2xl z-[100] border border-white/10"
        >
          {uploadStatus}
        </motion.div>
      )}
    </div>
  )
}
