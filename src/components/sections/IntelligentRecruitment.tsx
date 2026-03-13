import { motion } from "framer-motion"
import { MapPin, Search, CheckCircle2, Star, Target } from "lucide-react"

const profiles = [
  { name: "Andrés Silva", role: "Vendedor Senior", region: "Pasto, Nariño", match: "98%", status: "Verificado" },
  { name: "Lucía Méndez", role: "Atención al Cliente", region: "Ipiales", match: "95%", status: "Premium" },
  { name: "Carlos Ruiz", role: "Cierre de Ventas", region: "Tumaco", match: "92%", status: "Verificado" },
]

export function IntelligentRecruitment() {
  return (
    <section id="reclutamiento" className="py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Text and Filters */}
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">
            <Target className="w-4 h-4" />
            Talento Regional Curado
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
            Reclutamiento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Inteligente.
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground/80 font-medium leading-relaxed max-w-xl">
            Filtramos los mejores perfiles según tu región y necesidades específicas. No solo buscamos personal, encontramos el éxito para tu equipo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-zinc-900/50 border border-border/50 rounded-3xl space-y-3 hover:translate-y-[-4px] transition-transform">
              <MapPin className="w-8 h-8 text-indigo-500" />
              <h3 className="font-bold text-lg">Filtros Regionales</h3>
              <p className="text-sm text-muted-foreground/70">Segmentación precisa en Pasto, Ipiales, Tumaco y todo el sur occidente.</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900/50 border border-border/50 rounded-3xl space-y-3 hover:translate-y-[-4px] transition-transform">
              <Star className="w-8 h-8 text-amber-500" />
              <h3 className="font-bold text-lg">Perfiles Validados</h3>
              <p className="text-sm text-muted-foreground/70">Cada candidato pasa por filtros de aptitud y compromiso antes de llegar a ti.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Mockup of Profiles */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-2xl rounded-[3rem] opacity-50" />
          
          <div className="relative bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[3rem] p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-1">
                <h4 className="font-black text-xl">Dashboard de Selección</h4>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">En tiempo real</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-xs font-black">
                12 Nuevos Candidatos
              </div>
            </div>

            <div className="space-y-4">
              {profiles.map((profile, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={profile.name}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-border/50 rounded-2xl group hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-lg">
                    {profile.name[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm">{profile.name}</h5>
                      <span className="text-[10px] font-black text-indigo-500">{profile.match} Match</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground/70">{profile.role}</span>
                      <span className="text-[10px] flex items-center gap-1 text-muted-foreground/40 font-bold">
                        <MapPin className="w-3 h-3" />
                        {profile.region}
                      </span>
                    </div>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3">
                <Search className="w-4 h-4" />
                Explorar Talento Regional
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
