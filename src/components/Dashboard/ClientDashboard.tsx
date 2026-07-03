"use client";
import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, History, MessageSquare, Upload, CheckCircle2, Loader2, Sparkles } from "lucide-react"
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
  if (activeTab === 'automation') {
    return <AutomationExplorer />
  }
  if (activeTab === 'ecosystem') {
    return <EcosystemView />
  }

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
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-32 bg-[#0a0a0c] min-h-screen text-white">
      <header className="space-y-4 pt-4">
        <h1 
          className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-400 to-purple-400"
        >
          Panel de Control
        </h1>
        <p className="text-zinc-400 font-bold text-lg max-w-2xl">
          Personaliza la inteligencia de tu negocio 
          {profile.onboarding_data?.sector ? (
            <span> en el sector de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{profile.onboarding_data.sector.toUpperCase()}</span></span>
          ) : ''}.
        </p>
      </header>

      {/* Dynamic Widget Section based on Sector */}
      {profile.onboarding_data?.sector && (
        <section 
          className="relative p-[1.5px] rounded-[2rem] overflow-hidden group"
          style={{
            background: 'linear-gradient(90deg, #e11d48, #d946ef, #1e3a8a, #06b6d4, #10b981)',
            boxShadow: '0 0 22px rgba(217,70,239,0.15)',
          }}
        >
          <div className="bg-[#0a0a0c] p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Recomendación IA</span>
              </div>
              <h3 className="text-2xl font-black text-white">Plantillas premium para {profile.onboarding_data.sector.toUpperCase()}</h3>
              <p className="text-sm font-medium text-zinc-400 max-w-xl">
                Hemos preconfigurado tu IA basándonos en tu objetivo: <span className="text-white">"{profile.onboarding_data.core_solution || 'Automatizar ventas y atención'}"</span>.
              </p>
            </div>
            <Button className="shrink-0 h-14 px-8 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Activar Módulos
            </Button>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entrenar IA: Historia */}
        <section className="relative p-8 rounded-[3rem] bg-[#0f0f13] border border-white/5 space-y-6 hover:border-white/10 transition-colors shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
            <History className="w-7 h-7 text-indigo-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Historia de tu Empresa</h3>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
              Cuéntale a la IA cómo nació tu negocio para que sus respuestas tengan tu alma.
            </p>
          </div>
          <textarea 
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="w-full h-40 bg-black/50 border border-white/10 rounded-3xl p-5 text-sm focus:border-indigo-500/50 outline-none transition-all resize-none font-medium text-white placeholder:text-zinc-600"
            placeholder="Escribe aquí tu historia..."
          />
          <Button 
            onClick={handleSaveHistory}
            disabled={isSaving}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[11px] shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Guardar Historia"}
          </Button>
        </section>

        {/* Documentos: Catálogo */}
        <section className="relative p-8 rounded-[3rem] bg-[#0f0f13] border border-white/5 space-y-6 hover:border-white/10 transition-colors shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
            <FileText className="w-7 h-7 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Catálogo PDF</h3>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
              Sube tu catálogo de productos para que la IA sepa exactamente qué vendes.
            </p>
          </div>
          
          <div className="relative group mt-4">
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'catalog')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all">
              <Upload className="w-6 h-6 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              <span className="text-xs font-black text-zinc-400 group-hover:text-cyan-400 uppercase tracking-widest transition-colors">
                {profile.catalog_url ? "Cambiar catálogo" : "Subir Catálogo"}
              </span>
            </div>
          </div>

          {profile.catalog_url && (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mt-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">Catálogo activo en la IA</span>
            </div>
          )}
        </section>
      </div>

      {/* Formulario de Atención */}
      <section className="relative p-10 md:p-14 rounded-[4rem] bg-[#0f0f13] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] space-y-10 overflow-hidden">
        {/* Subtle glow background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
            <MessageSquare className="w-10 h-10" />
          </div>
          <div className="space-y-4">
            <h2 
              className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-400 to-purple-400"
            >
              Trato Especializado
            </h2>
            <p className="text-lg text-zinc-400 font-medium">Ayúdanos a perfilar el tono de voz de tu asistente IA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-3">
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">¿Cómo es el trato ideal a tus clientes?</label>
            <input className="w-full h-14 bg-black/50 border border-white/10 rounded-2xl px-6 text-sm font-medium focus:border-purple-500/50 outline-none transition-all text-white placeholder:text-zinc-600" placeholder="Ej: Formal, muy cercano, juvenil..." />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">¿Qué es lo que más preguntan?</label>
            <input className="w-full h-14 bg-black/50 border border-white/10 rounded-2xl px-6 text-sm font-medium focus:border-purple-500/50 outline-none transition-all text-white placeholder:text-zinc-600" placeholder="Ej: Precios, tiempos de entrega, tallas..." />
          </div>
        </div>

        <div className="pt-6 relative z-10">
          <Button className="h-16 px-12 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-[.2em] text-[11px] shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all">
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
