import { Apple, Play } from "lucide-react";
import AppProviders from "@/components/react/AppProviders";
import StageNav from "@/components/v2/StageNav";
import NightSequence from "@/components/v2/NightSequence";
import { pageCopy } from "@/components/v2/copy";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/theme/ThemeContext";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import { guidesIndexPath } from "@/lib/guidePaths";
import { trackEvent } from "@/lib/analytics";

const storeClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-extrabold transition-transform active:scale-[0.98]";

const LandingSurface = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const copy = pageCopy(language);
  const isDark = theme === "dark";

  const freeKeys = ["pricing.free.f1", "pricing.free.f3", "pricing.free.f2", "pricing.free.f4"] as const;
  const premiumKeys = ["pricing.premium.f1", "pricing.premium.f2", "pricing.premium.f3", "pricing.premium.f4"] as const;

  return (
    <div className={`${isDark ? "night-sky" : "linen"} min-h-[100dvh] bg-background text-foreground`}>
      <StageNav />

      <NightSequence
        opening={{ a: copy.h1a, b: copy.h1b, c: copy.h1c, lede: copy.lede }}
        beats={copy.beats}
        appStore={t("nav.appStore")}
        play={t("nav.googlePlay")}
      />

      <section id="mama" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.7fr)] lg:items-end">
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.22em] text-primary">04:40</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
              {copy.youTitle}
            </h2>
            <blockquote className="mt-8 max-w-[22ch] text-[clamp(1.6rem,2.6vw,2.15rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
              {t("testimonials.1.quote")}
            </blockquote>
            <p className="mt-4 text-sm font-bold text-foreground/60">
              {t("testimonials.1.name")} · {t("testimonials.1.role")}
            </p>
          </div>
          <p className="max-w-[28ch] text-xl leading-snug text-foreground/75">{copy.youBody}</p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-[1280px] border-t border-foreground/10 px-5 sm:px-8 md:grid-cols-3">
          {copy.facts.map((fact) => (
            <div key={fact.label} className="border-b border-foreground/10 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <dt className="text-[clamp(2rem,3vw,2.8rem)] font-extrabold leading-none tracking-[-0.045em] text-primary">
                {fact.label}
              </dt>
              <dd className="mt-4 max-w-[26ch] text-base leading-snug text-foreground/75">{fact.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.22em] opacity-80">{copy.freeKicker}</p>
          <h2 className="mt-3 max-w-[12ch] text-[clamp(3rem,7vw,6.4rem)] font-extrabold leading-[0.88] tracking-[-0.055em]">
            {copy.freeTitle}
          </h2>
          <p className="mt-6 max-w-[32ch] text-xl leading-snug opacity-90">{copy.freeBody}</p>
        </div>
      </section>

      <section id="preise" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="max-w-[12ch] text-[clamp(2.6rem,5vw,4.6rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
            {copy.priceTitle}
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.6rem] border border-foreground/10 bg-card p-7 sm:p-9">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-foreground/50">{t("pricing.free.label")}</p>
              <p className="mt-5 text-[4.2rem] font-extrabold leading-none tracking-[-0.06em]">0 €</p>
              <p className="mt-2 text-foreground/60">{t("pricing.forever")}</p>
              <ul className="mt-8 space-y-4">
                {freeKeys.map((key) => (
                  <li key={key}>
                    <p className="font-extrabold">{t(`${key}.title`)}</p>
                    <p className="mt-1 text-sm leading-snug text-foreground/65">{t(`${key}.desc`)}</p>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[1.6rem] bg-foreground p-7 text-background sm:p-9">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">{t("pricing.premium.mostSelected")}</p>
              <p className="mt-5 text-[4.2rem] font-extrabold leading-none tracking-[-0.06em] text-primary">5 €</p>
              <p className="mt-2 text-background/70">/ {t("pricing.month")}</p>
              <p className="mt-3 max-w-[36ch] text-sm leading-snug text-background/70">{t("pricing.premium.priceNote")}</p>
              <ul className="mt-8 space-y-4">
                {premiumKeys.map((key) => (
                  <li key={key}>
                    <p className="font-extrabold">{t(`${key}.title`)}</p>
                    <p className="mt-1 text-sm leading-snug text-background/70">{t(`${key}.desc`)}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="rounded-[1.8rem] bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
            <h2 className="max-w-[14ch] text-[clamp(2.5rem,5vw,4.4rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
              {copy.closeTitle}
            </h2>
            <p className="mt-4 max-w-[32ch] text-lg text-background/70">{copy.closeBody}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={APP_STORE_URL}
                onClick={() => trackEvent("store_click", { store: "app_store", location: "close_v2" })}
                className={`${storeClass} bg-primary text-primary-foreground`}
              >
                <Apple className="h-5 w-5" />
                {t("nav.appStore")}
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                onClick={() => trackEvent("store_click", { store: "google_play", location: "close_v2" })}
                className={`${storeClass} border border-background/20 text-background`}
              >
                <Play className="h-5 w-5" />
                {t("nav.googlePlay")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-10 pt-6">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Moonli · Wien</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={guidesIndexPath(language)} className="hover:text-foreground">{t("nav.guides")}</a>
            <a href="/privacy/" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="/terms/" className="hover:text-foreground">{t("footer.terms")}</a>
            <a href="/imprint/" className="hover:text-foreground">{t("footer.imprint")}</a>
            <a href="/cookies/" className="hover:text-foreground">{t("footer.cookies")}</a>
            <a href="/data-deletion/" className="hover:text-foreground">{t("footer.dataDeletion")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LandingV2 = () => (
  <AppProviders>
    <LandingSurface />
  </AppProviders>
);

export default LandingV2;
