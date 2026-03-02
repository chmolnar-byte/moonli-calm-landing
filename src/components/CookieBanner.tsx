import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const COOKIE_KEY = "moonli_cookie_consent_v2";

type CookieConsent = {
  analytics: boolean;
};

const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        setAnalytics(!!parsed.analytics);
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value: boolean) => {
    try {
      const consent: CookieConsent = { analytics: value };
      window.localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-background/70 backdrop-blur-sm px-4 py-6">
      <div className="glass-card-premium max-w-xl w-full p-5 sm:p-6 shadow-soft-xl border border-border/60">
        <h2 className="text-base sm:text-lg font-extrabold mb-2">
          {t("cookies.title")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
          {t("cookies.banner.text")}
        </p>

        <div className="mb-4 rounded-2xl border border-border/60 bg-background/60 px-3 sm:px-4 py-3 flex items-start gap-3">
          <input
            id="analytics-cookies"
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <div>
            <label
              htmlFor="analytics-cookies"
              className="text-xs sm:text-sm font-semibold text-foreground"
            >
              {t("cookies.banner.analyticsLabel")}
            </label>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              {t("cookies.banner.analyticsDesc")}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
          <button
            type="button"
            onClick={() => save(analytics)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-border/70 bg-background text-xs sm:text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
          >
            {t("cookies.banner.save")}
          </button>
          <button
            type="button"
            onClick={() => save(true)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] transition-all duration-200"
          >
            {t("cookies.banner.allowAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

