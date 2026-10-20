"use client";
import { ArrowRight } from "lucide-react"
import {
  MetaIcon, NotionIcon, TikTokIcon, StripeIcon, WompiIcon, GmailIcon, SheetsIcon,
  GitHubIcon, OpenAIIcon, HubSpotIcon, SupabaseIcon, WhatsAppIcon, LinkedInIcon, DriveIcon, CanvaIcon, CalendarIcon,
} from "@/components/BrandIcons"
import { useLanguage } from "@/contexts/I18nContext"

// Color oficial de cada marca: tiñe el brillo y el borde al pasar el cursor.
const LOGOS = [
  { name: "WhatsApp", Icon: WhatsAppIcon, color: "#25D366" },
  { name: "Meta", Icon: MetaIcon, color: "#0081FB" },
  { name: "TikTok", Icon: TikTokIcon, color: "#FE2C55", className: "text-black" },
  { name: "Wompi", Icon: WompiIcon, color: "#6A1B9A" },
  { name: "Stripe", Icon: StripeIcon, color: "#635BFF" },
  { name: "Gmail", Icon: GmailIcon, color: "#EA4335" },
  { name: "Sheets", Icon: SheetsIcon, color: "#0F9D58" },
  { name: "Drive", Icon: DriveIcon, color: "#FBBC05" },
  { name: "Calendar", Icon: CalendarIcon, color: "#4285F4" },
  { name: "Notion", Icon: NotionIcon, color: "#9CA3AF" },
  { name: "HubSpot", Icon: HubSpotIcon, color: "#FF7A59" },
  { name: "LinkedIn", Icon: LinkedInIcon, color: "#0A66C2" },
  { name: "Canva", Icon: CanvaIcon, color: "#00C4CC" },
  { name: "OpenAI", Icon: OpenAIIcon, color: "#10A37F" },
  { name: "Supabase", Icon: SupabaseIcon, color: "#3ECF8E" },
  { name: "GitHub", Icon: GitHubIcon, color: "#8B5CF6" },
]

// Resumen del ecosistema en el Home; el catálogo completo vive en la vista "Integraciones".
export function ConnectorsBar({ onOpen }: { onOpen: () => void }) {
  const { t } = useLanguage()
  return (
    <section id="ecosystem" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      <div className="card-premium rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{t("ecosystem.title")}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">{t("ecosystem.subtitle")}</p>
          </div>
          <button
            onClick={onOpen}
            className="group self-start md:self-auto inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-bold border border-foreground/15 hover:border-indigo-400/60 hover:bg-indigo-500/5 transition-all"
          >
            {t("connectorsBar.cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-slow-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 gap-3 pr-3" aria-hidden={dup === 1}>
                {LOGOS.map(({ name, Icon, className, color }) => (
                  <div
                    key={name}
                    style={{ "--brand": color } as React.CSSProperties}
                    className="group flex items-center gap-3 h-14 pl-2 pr-5 rounded-2xl bg-foreground/[0.04] ring-1 ring-foreground/[0.08] hover:ring-[color:var(--brand)] hover:shadow-[0_8px_28px_-8px_var(--brand)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform">
                      <Icon size={22} className={className} />
                    </span>
                    <span className="text-sm font-semibold text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
