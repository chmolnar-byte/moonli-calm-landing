import { Apple, Play } from "lucide-react";
import logo from "@/assets/logo.webp";
import { assetUrl } from "@/lib/assetUrl";
import { useLanguage } from "@/i18n/LanguageContext";
import MagneticCta from "@/components/MagneticCta";
import LeafAccent from "@/components/LeafAccent";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";

const CTAFooter = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <section id="download" className="relative py-20 md:py-24">
        <LeafAccent
          src="/leaves/hanging.png"
          className="page-leaf page-leaf-fade-top top-0 right-0 z-0 w-[210px] sm:w-[260px]"
        />
        <div className="container relative z-10 max-w-2xl text-left md:text-center">
          <h2 className="text-display-md text-foreground mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[36ch] md:mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:justify-center">
            <MagneticCta
              href={APP_STORE_URL}
              variant="ghost"
              trackEventName="store_click"
              trackParams={{ store: "app_store", location: "footer" }}
            >
              <Apple className="w-5 h-5" />
              {t("nav.appStore")}
            </MagneticCta>
            <MagneticCta
              href={GOOGLE_PLAY_URL}
              variant="primary"
              trackEventName="store_click"
              trackParams={{ store: "google_play", location: "footer" }}
            >
              <Play className="w-5 h-5" />
              {t("nav.googlePlay")}
            </MagneticCta>
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
