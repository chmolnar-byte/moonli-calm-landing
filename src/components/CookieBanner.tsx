import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { applyAnalyticsConsent, trackPageView } from "@/lib/analytics";
import { getStoredConsent, OPEN_COOKIE_SETTINGS_EVENT, saveConsent } from "@/lib/cookieConsent";

/** Small bar at the bottom: it never blocks the page, and analytics stays off unless allowed. */
const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!getStoredConsent());
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const save = (analytics: boolean) => {
    saveConsent({ analytics });
    applyAnalyticsConsent(analytics);
    // trackPageView merges stored UTMs/fbclid so Meta traffic is not lost as Direct
    if (analytics) trackPageView();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      aria-label={t("cookies.title")}
      className="sheet-enter fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border/60 bg-card/95 p-4 shadow-soft-xl backdrop-blur sm:bottom-4 sm:flex sm:items-center sm:gap-5"
    >
      <p className="text-xs leading-relaxed text-muted-foreground sm:flex-1 sm:text-sm">
        {t("cookies.banner.text")}{" "}
        <a href="/cookies/" className="font-semibold text-foreground underline underline-offset-2">
          {t("footer.cookies")}
        </a>
      </p>
      <div className="mt-3 flex gap-2 sm:mt-0 sm:shrink-0">
        <button
          type="button"
          onClick={() => save(false)}
          className="pressable inline-flex flex-1 items-center justify-center rounded-full border border-border/70 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-foreground/5 sm:flex-none sm:text-sm"
        >
          {t("cookies.banner.necessaryOnly")}
        </button>
        <button
          type="button"
          onClick={() => save(true)}
          className="pressable inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft-lg sm:flex-none sm:text-sm"
        >
          {t("cookies.banner.allowAll")}
        </button>
      </div>
    </section>
  );
};

export default CookieBanner;
