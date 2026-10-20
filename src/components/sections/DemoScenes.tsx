"use client";
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/I18nContext"

// Escenas animadas tipo "video" para los mockups de demostración.
// Estilo: trazos finos dibujados a mano (blancos), acentos de marca índigo → púrpura → cian.

const INK = "rgba(255,255,255,0.78)"
const INK_SOFT = "rgba(255,255,255,0.28)"
const CYAN = "#22d3ee"
const PURPLE = "#c084fc"
const INDIGO = "#6366f1"

// Avanza por fases con duraciones propias y vuelve a empezar (loop).
function usePhases(durations: number[], active = true) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase])
    return () => clearTimeout(timer)
  }, [phase, durations, active])
  return phase
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
  }, [])
  return reduced
}

/* ───────────────────────── Escena 1: respuesta en tiempo real ───────────────────────── */

const RT_DURATIONS = [700, 1300, 1100, 1500, 1100, 3000, 500]
// 0 reposo · 1 entra la pregunta · 2 viaja a la IA · 3 lee el catálogo · 4 vuelve la respuesta · 5 respuesta + tiempo · 6 salida

const P_IN = "M172 128 C 220 128, 238 150, 284 150"
const P_DOC = "M356 150 C 404 150, 446 138, 494 138"
const P_OUT = "M284 166 C 236 182, 214 186, 172 186"

export function RealtimeScene() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const phase = usePhases(RT_DURATIONS, !reduced)
  const p = reduced ? 5 : phase

  // Globo de puntos que gira detrás del núcleo: atención desde cualquier región.
  const [spin, setSpin] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setSpin((v) => (v + 1.2) % 360), 60)
    return () => clearInterval(id)
  }, [reduced])
  const dots = useMemo(() => {
    const out: { x: number; y: number; o: number }[] = []
    const cx = 320, cy = 158, r = 128
    for (let lat = -75; lat <= 75; lat += 15) {
      const step = 360 / Math.max(6, Math.round(24 * Math.cos((lat * Math.PI) / 180)))
      for (let lon = 0; lon < 360; lon += step) {
        const la = (lat * Math.PI) / 180, lo = ((lon + spin) * Math.PI) / 180
        const depth = Math.cos(la) * Math.cos(lo)
        if (depth < 0) continue
        out.push({ x: cx + r * Math.cos(la) * Math.sin(lo), y: cy - r * Math.sin(la), o: 0.06 + depth * 0.3 })
      }
    }
    return out
  }, [spin])

  return (
    <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" role="img" aria-label={t("demoShowcase.v0Title")}>
      <defs>
        <linearGradient id="rt-brand" x1="0" x2="1">
          <stop offset="0" stopColor={INDIGO} />
          <stop offset="0.5" stopColor={PURPLE} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
        <radialGradient id="rt-glow">
          <stop offset="0" stopColor={PURPLE} stopOpacity="0.55" />
          <stop offset="1" stopColor={PURPLE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Fondo: globo de puntos */}
      <g>
        <circle cx={320} cy={158} r={128} fill="none" stroke="#fff" strokeOpacity={0.06} />
        <ellipse cx={320} cy={158} rx={150} ry={34} fill="none" stroke="url(#rt-brand)" strokeOpacity={0.35} strokeWidth={1} strokeDasharray="2 5" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.2} fill="#fff" opacity={d.o} />
        ))}
      </g>

      {/* Cliente: celular dibujado a trazo */}
      <g>
        <rect x={44} y={52} width={128} height={250} rx={20} fill="rgba(255,255,255,0.03)" stroke={INK} strokeWidth={1.4} />
        <line x1={92} y1={64} x2={124} y2={64} stroke={INK_SOFT} strokeWidth={3} strokeLinecap="round" />
        <text x={108} y={322} textAnchor="middle" fill={INK} fontSize={11} fontWeight={700}>{t("demoShowcase.scenes.client")}</text>

        <circle cx={62} cy={84} r={7} fill="none" stroke={INK_SOFT} strokeWidth={1.2} />
        <line x1={74} y1={81} x2={118} y2={81} stroke={INK_SOFT} strokeWidth={2} strokeLinecap="round" />
        <line x1={74} y1={88} x2={98} y2={88} stroke={INK_SOFT} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
        <line x1={52} y1={98} x2={164} y2={98} stroke={INK_SOFT} strokeWidth={0.8} />
        <rect x={54} y={268} width={86} height={20} rx={10} fill="none" stroke={INK_SOFT} strokeWidth={1.2} />
        <circle cx={152} cy={278} r={9} fill="none" stroke={INK_SOFT} strokeWidth={1.2} />

        <g style={{ opacity: p >= 1 && p <= 5 ? 1 : 0, transform: `translateY(${p >= 1 && p <= 5 ? 0 : 6}px)`, transition: "opacity .45s, transform .45s" }}>
          <rect x={66} y={110} width={96} height={30} rx={10} fill="#005c4b" />
          <text x={114} y={129} textAnchor="middle" fill="#e9edef" fontSize={9.5} fontWeight={600}>{t("demoShowcase.scenes.question")}</text>
        </g>
        <g style={{ opacity: p === 5 ? 1 : 0, transform: `translateY(${p === 5 ? 0 : 6}px)`, transition: "opacity .45s, transform .45s" }}>
          <rect x={54} y={152} width={104} height={50} rx={10} fill="#202c33" />
          <rect x={62} y={160} width={22} height={22} rx={5} fill="rgba(239,68,68,0.25)" />
          <text x={73} y={175} textAnchor="middle" fill="#f87171" fontSize={6.5} fontWeight={800}>PDF</text>
          <text x={90} y={170} fill="#e9edef" fontSize={8.5} fontWeight={700}>{t("demoShowcase.scenes.pdf")}</text>
          <text x={90} y={181} fill="rgba(233,237,239,0.55)" fontSize={7}>{t("demoShowcase.scenes.prices")}</text>
          <text x={150} y={197} textAnchor="end" fill={CYAN} fontSize={7}>✓✓</text>
        </g>
      </g>

      {/* Rutas punteadas */}
      <path d={P_IN} fill="none" stroke={INK_SOFT} strokeWidth={1.2} strokeDasharray="3 4" />
      <path d={P_DOC} fill="none" stroke={INK_SOFT} strokeWidth={1.2} strokeDasharray="3 4" />
      <path d={P_OUT} fill="none" stroke={INK_SOFT} strokeWidth={1.2} strokeDasharray="3 4" />

      {/* Paquetes que viajan por las rutas */}
      {p === 2 && <Traveler path={P_IN} color={CYAN} duration={1.05} />}
      {p === 3 && <Traveler path={P_DOC} color={PURPLE} duration={0.7} back />}
      {p === 4 && <Traveler path={P_OUT} color={CYAN} duration={1.05} />}

      {/* Núcleo IA */}
      <g>
        <circle cx={320} cy={158} r={70} fill="url(#rt-glow)" opacity={p >= 2 && p <= 4 ? 1 : 0.35} style={{ transition: "opacity .5s" }} />
        {p === 3 && !reduced && [0, 1].map((i) => (
          <motion.circle
            key={i} cx={320} cy={158} r={36} fill="none" stroke={PURPLE} strokeWidth={1}
            initial={{ r: 36, opacity: 0.8 }} animate={{ r: 64, opacity: 0 }}
            transition={{ duration: 1.2, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
        <circle cx={320} cy={158} r={36} fill="#0b0b12" stroke="url(#rt-brand)" strokeWidth={2} />
        <motion.circle
          cx={320} cy={158} r={44} fill="none" stroke={INK_SOFT} strokeWidth={1} strokeDasharray="2 6"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "320px 158px" }}
        />
        <text x={320} y={164} textAnchor="middle" fill="#fff" fontSize={17} fontWeight={800}>IA</text>
        <text x={320} y={222} textAnchor="middle" fill={INK} fontSize={11} fontWeight={700}>{t("demoShowcase.scenes.ai")}</text>
      </g>

      {/* Catálogo: documento dibujado con línea de lectura */}
      <g>
        <path d="M494 84 h62 l18 18 v100 a6 6 0 0 1 -6 6 h-74 a6 6 0 0 1 -6 -6 v-112 a6 6 0 0 1 6 -6 z" fill="rgba(255,255,255,0.03)" stroke={INK} strokeWidth={1.4} />
        <path d="M556 84 v18 h18" fill="none" stroke={INK} strokeWidth={1.4} />
        {[118, 132, 146, 160, 174, 188].map((y, i) => (
          <line key={y} x1={502} y1={y} x2={i % 2 ? 548 : 562} y2={y} stroke={INK_SOFT} strokeWidth={2} strokeLinecap="round" />
        ))}
        {p === 3 && (
          <motion.line
            x1={496} x2={570} stroke={CYAN} strokeWidth={1.6}
            initial={{ y1: 104, y2: 104, opacity: 0 }}
            animate={{ y1: [104, 200, 104], y2: [104, 200, 104], opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        )}
        <text x={530} y={232} textAnchor="middle" fill={INK} fontSize={11} fontWeight={700}>{t("demoShowcase.scenes.catalog")}</text>
      </g>

      {/* Tiempo de respuesta */}
      <g style={{ opacity: p === 5 ? 1 : 0, transition: "opacity .45s" }}>
        <rect x={278} y={256} width={84} height={30} rx={15} fill="rgba(34,211,238,0.12)" stroke={CYAN} strokeWidth={1} />
        <text x={320} y={275} textAnchor="middle" fill={CYAN} fontSize={12} fontWeight={800}>⚡ {t("demoShowcase.scenes.time")}</text>
      </g>
    </svg>
  )
}

function Traveler({ path, color, duration, back }: { path: string; color: string; duration: number; back?: boolean }) {
  return (
    <>
      <motion.path
        d={path} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={back ? { pathLength: [0, 1, 1], opacity: [1, 1, 0.3] } : { pathLength: 1 }}
        transition={{ duration: back ? duration * 2 : duration, ease: "easeInOut" }}
      />
      <motion.circle
        r={4.5} fill={color}
        style={{ offsetPath: `path("${path}")`, filter: `drop-shadow(0 0 6px ${color})` } as React.CSSProperties}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: back ? ["0%", "100%", "0%"] : "100%" }}
        transition={{ duration: back ? duration * 2 : duration, ease: "easeInOut" }}
      />
    </>
  )
}

/* ───────────────────────── Escena 2: atención y cierre de leads ───────────────────────── */

const ROUTE = "M70 96 C 130 96, 196 116, 196 176 C 196 236, 74 206, 74 262 C 74 318, 196 296, 196 348 C 196 402, 74 382, 74 432 C 74 482, 176 462, 176 512"
const NODES = [
  { x: 70, y: 96, side: "right" },
  { x: 196, y: 176, side: "left" },
  { x: 74, y: 262, side: "right" },
  { x: 196, y: 348, side: "left" },
  { x: 74, y: 432, side: "right" },
  { x: 176, y: 512, side: "left" },
] as const
const CL_STEP = 1100
const CL_DURATIONS = [600, CL_STEP, CL_STEP, CL_STEP, CL_STEP, CL_STEP, 2600, 500]
// 0 reposo · 1–5 avanza nodo a nodo · 6 cierre (pago) · 7 salida

export function ClosingScene() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const phase = usePhases(CL_DURATIONS, !reduced)
  const reached = reduced ? 5 : Math.min(phase, 6) - 1 // índice del último nodo alcanzado (-1 = ninguno)
  const progress = Math.max(0, reached) / (NODES.length - 1)
  const drawn = reduced ? 1 : phase === 0 || phase === 7 ? 0 : progress

  return (
    <svg viewBox="0 0 270 570" className="absolute inset-0 w-full h-full" role="img" aria-label={t("demoShowcase.v1Title")}>
      <defs>
        <linearGradient id="cl-brand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INDIGO} />
          <stop offset="0.5" stopColor={PURPLE} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
      </defs>

      {/* Curvas de nivel: textura de mapa */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M-10 ${120 + i * 80} C 60 ${90 + i * 80}, 120 ${160 + i * 80}, 180 ${120 + i * 80} S 260 ${100 + i * 80}, 290 ${130 + i * 80}`}
          fill="none" stroke="#fff" strokeOpacity={0.05} strokeWidth={1}
        />
      ))}

      <text x={135} y={52} textAnchor="middle" fill={INK} fontSize={12} fontWeight={800} letterSpacing={0.5}>{t("demoShowcase.scenes.route")}</text>
      <line x1={110} y1={62} x2={160} y2={62} stroke="url(#cl-brand)" strokeWidth={2} strokeLinecap="round" />

      {/* Ruta completa (punteada) y ruta recorrida (gradiente de marca) */}
      <path d={ROUTE} fill="none" stroke={INK_SOFT} strokeWidth={1.3} strokeDasharray="3 5" />
      <motion.path
        d={ROUTE} fill="none" stroke="url(#cl-brand)" strokeWidth={2.2} strokeLinecap="round"
        initial={false}
        animate={{ pathLength: drawn }}
        transition={{ duration: phase === 7 ? 0.3 : CL_STEP / 1000, ease: "easeInOut" }}
      />
      <motion.circle
        r={5} fill="#fff"
        style={{ offsetPath: `path("${ROUTE}")`, filter: `drop-shadow(0 0 8px ${CYAN})` } as React.CSSProperties}
        initial={false}
        animate={{ offsetDistance: `${drawn * 100}%`, opacity: phase === 7 ? 0 : 1 }}
        transition={{ duration: CL_STEP / 1000, ease: "easeInOut" }}
      />

      {/* Rama de descarte: los curiosos se filtran */}
      <AnimatePresence>
        {reached >= 2 && phase !== 7 && (
          <motion.g key="curious" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.path
              d="M196 176 C 226 190, 238 206, 246 226" fill="none" stroke="#fb7185" strokeOpacity={0.6} strokeWidth={1.2} strokeDasharray="3 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
            />
            <text x={246} y={240} textAnchor="middle" fill="#fb7185" fillOpacity={0.75} fontSize={8.5} fontWeight={700}>✕ {t("demoShowcase.scenes.curious")}</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Nodos tipo pin de mapa */}
      {NODES.map((n, i) => {
        const on = reached >= i && phase !== 7
        const isPay = i === NODES.length - 1
        const right = n.side === "right"
        return (
          <g key={i}>
            {on && !reduced && (
              <motion.circle
                cx={n.x} cy={n.y} fill="none" stroke={isPay ? CYAN : PURPLE} strokeWidth={1}
                initial={{ r: 10, opacity: 0.8 }} animate={{ r: 24, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={10} fill="#0b0b12" stroke={on ? (isPay ? CYAN : PURPLE) : INK_SOFT} strokeWidth={1.6} style={{ transition: "stroke .4s" }} />
            <AnimatePresence>
              {on && (
                <motion.path
                  key="chk" d={`M${n.x - 4} ${n.y} l3 3 l5.5 -6`} fill="none" stroke={isPay ? CYAN : "#fff"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                />
              )}
            </AnimatePresence>
            <g opacity={on ? 1 : 0.4} style={{ transition: "opacity .4s" }}>
              <text x={right ? n.x + 18 : n.x - 18} y={n.y - 1} textAnchor={right ? "start" : "end"} fill="#fff" fontSize={11} fontWeight={800}>
                {t(`demoShowcase.scenes.n${i}`)}
              </text>
              <text x={right ? n.x + 18 : n.x - 18} y={n.y + 12} textAnchor={right ? "start" : "end"} fill="rgba(255,255,255,0.55)" fontSize={isPay ? 7.5 : 8.5}>
                {t(`demoShowcase.scenes.n${i}s`)}
              </text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}
