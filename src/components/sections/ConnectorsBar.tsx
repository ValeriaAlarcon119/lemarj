"use client";
import { ArrowRight } from "lucide-react"
import {
  MetaIcon, NotionIcon, TikTokIcon, StripeIcon, WompiIcon, GmailIcon, SheetsIcon,
  GitHubIcon, OpenAIIcon, HubSpotIcon, SupabaseIcon, WhatsAppIcon, LinkedInIcon, DriveIcon, CanvaIcon, CalendarIcon,
} from "@/components/BrandIcons"
import { useLanguage } from "@/contexts/I18nContext"

const LOGOS = [
  { name: "WhatsApp", Icon: WhatsAppIcon },
  { name: "Meta", Icon: MetaIcon },
  { name: "TikTok", Icon: TikTokIcon, className: "text-black dark:text-white" },
  { name: "Wompi", Icon: WompiIcon },
  { name: "Stripe", Icon: StripeIcon },
  { name: "Gmail", Icon: GmailIcon },
  { name: "Sheets", Icon: SheetsIcon },
  { name: "Drive", Icon: DriveIcon },
  { name: "Calendar", Icon: CalendarIcon },
  { name: "Notion", Icon: NotionIcon },
  { name: "HubSpot", Icon: HubSpotIcon },
  { name: "LinkedIn", Icon: LinkedInIcon },
  { name: "Canva", Icon: CanvaIcon },
  { name: "OpenAI", Icon: OpenAIIcon, className: "text-black dark:text-white" },
  { name: "Supabase", Icon: SupabaseIcon },
  { name: "GitHub", Icon: GitHubIcon, className: "text-black dark:text-white" },
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
                {LOGOS.map(({ name, Icon, className }) => (
                  <div
                    key={name}
                    className="group flex items-center gap-2.5 h-12 px-4 rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/[0.07] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:ring-indigo-400/40 transition-all duration-300"
                  >
                    <Icon size={20} className={className} />
                    <span className="text-sm font-semibold text-foreground/80">{name}</span>
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
