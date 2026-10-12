import { Apple, Play } from "lucide-react";
import logo from "@/assets/logo.webp";
import dashboardWeekly from "@/assets/hero-wochenbericht.png";
import dashboardGrowth from "@/assets/hero-entwicklung.png";
import dashboardHome from "@/assets/hero-sleep.png";
import { assetUrl } from "@/lib/assetUrl";
import { useLanguage } from "@/i18n/LanguageContext";
import MagneticCta from "@/components/MagneticCta";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";

const bandGhost =
  "!border-white/25 !bg-transparent !text-[hsl(36_28%_94%)] !shadow-none hover:!bg-white/8";
const bandPrimary = "!bg-primary !text-primary-foreground !shadow-none";

const weeklyUrl = assetUrl(dashboardWeekly);
const growthUrl = assetUrl(dashboardGrowth);
const homeUrl = assetUrl(dashboardHome);

const CTAFooter = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <section id="download" className="py-16 md:py-24">
        <div className="container">
          <div className="grid overflow-hidden rounded-[1.75rem] bg-[hsl(24_18%_12%)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)]">
            <div className="flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-14 lg:py-16 lg:pr-8">
              <h2 className="max-w-[16ch] text-balance text-display-md text-[hsl(36_28%_96%)]">
                {t("cta.title")}
              </h2>
              <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-[hsl(36_18%_78%)] sm:text-lg">
                {t("cta.subtitle")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <MagneticCta
                  href={APP_STORE_URL}
                  variant="ghost"
                  faceClassName={bandGhost}
                  trackEventName="store_click"
                  trackParams={{ store: "app_store", location: "footer" }}
                >
                  <Apple className="w-5 h-5" />
                  {t("nav.appStore")}
                </MagneticCta>
                <MagneticCta
                  href={GOOGLE_PLAY_URL}
                  variant="primary"
                  faceClassName={bandPrimary}
                  trackEventName="store_click"
                  trackParams={{ store: "google_play", location: "footer" }}
                >
                  <Play className="w-5 h-5" />
                  {t("nav.googlePlay")}
                </MagneticCta>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[360px] lg:h-auto lg:min-h-[460px] [mask-image:linear-gradient(to_bottom,black_58%,transparent_96%)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(hsl(36_28%_96%/0.22)_0.7px,transparent_0.7px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_70%)]"
              />
              <img
                src={weeklyUrl}
                alt=""
                width={447}
                height={921}
                className="absolute bottom-[-18%] left-[7%] w-[36%] -rotate-[7deg] select-none"
                loading="lazy"
                decoding="async"
              />
              <img
                src={growthUrl}
                alt=""
                width={447}
                height={921}
                className="absolute bottom-[-18%] right-[7%] w-[36%] rotate-[7deg] select-none"
                loading="lazy"
                decoding="async"
              />
              <img
                src={homeUrl}
                alt="Moonli Smart Sleep"
                width={447}
                height={921}
                className="absolute bottom-[-10%] left-1/2 w-[42%] -translate-x-1/2 select-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border py-8">
        <div className="container">
          <p className="mb-6 text-sm text-muted-foreground max-w-3xl">
            {t("testimonials.trust").replace("🇦🇹 ", "")}
          </p>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              <img src={assetUrl(logo)} alt="Moonli" className="w-5 h-5 rounded-full object-cover" />
              <span className="font-semibold text-foreground">MOONLI</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-muted-foreground sm:justify-end">
              <a href="/cookies/" className="hover:text-foreground transition-colors whitespace-nowrap">{t("footer.cookies")}</a>
              <a href="/terms/" className="hover:text-foreground transition-colors whitespace-nowrap">{t("footer.terms")}</a>
              <a href="/privacy/" className="hover:text-foreground transition-colors whitespace-nowrap">{t("footer.privacy")}</a>
              <a href="/data-deletion/" className="hover:text-foreground transition-colors whitespace-nowrap">{t("footer.dataDeletion")}</a>
              <a href="/imprint/" className="hover:text-foreground transition-colors whitespace-nowrap">{t("footer.imprint")}</a>
              <a href="mailto:hello@moonli.net" className="hover:text-foreground transition-colors whitespace-nowrap">hello@moonli.net</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CTAFooter;
