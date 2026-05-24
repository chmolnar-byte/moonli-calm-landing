import { useEffect, useState } from "react";
import { Apple, CalendarDays, ExternalLink, MapPin, Play, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import babyExpoPoster from "@/assets/babyexpo-2026.png";

const STORAGE_KEY = "moonli_babyexpo_popup_2026";
const BABY_EXPO_URL = "https://www.babyexpo.at/";
const EXPO_END = new Date("2026-06-22T00:00:00+02:00");

const BabyExpoPopup = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() >= EXPO_END) return;

    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // ignore
    }

    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center bg-background/60 backdrop-blur-sm px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="babyexpo-title"
    >
      <div className="glass-card-premium relative max-w-md w-full p-4 sm:p-6 shadow-soft-xl border border-white/20 max-h-[min(92vh,900px)] overflow-y-auto">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
          aria-label={t("babyExpo.close")}
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={babyExpoPoster}
          alt={t("babyExpo.posterAlt")}
          className="w-full rounded-xl border border-white/15 object-cover mb-4"
        />

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            <CalendarDays className="h-3.5 w-3.5" />
            {t("babyExpo.dates")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {t("babyExpo.stand")}
          </span>
        </div>

        <h2
          id="babyexpo-title"
          className="text-xl sm:text-2xl font-bold text-foreground leading-snug pr-8 mb-3"
        >
          {t("babyExpo.title")}
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
          {t("babyExpo.text")}
        </p>

        <p className="inline-flex items-center rounded-full bg-primary/20 border border-primary/50 px-3 py-1 text-sm font-semibold text-primary mb-6">
          {t("babyExpo.discount")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90 transition-all shadow-soft-lg hover:scale-[1.02]"
          >
            <Apple className="h-4 w-4" />
            {t("nav.appStore")}
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all shadow-soft-lg hover:scale-[1.02]"
          >
            <Play className="h-4 w-4 text-white" />
            {t("nav.googlePlay")}
          </a>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={BABY_EXPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/15 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            {t("babyExpo.ctaExpo")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BabyExpoPopup;
