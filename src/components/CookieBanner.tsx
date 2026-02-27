import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const COOKIE_KEY = "moonli_cookie_consent";

const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="max-w-4xl mx-auto glass-card-premium px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm">
        <p className="flex-1 text-left text-muted-foreground">
          {t("cookies.banner.text")}
        </p>
        <button
          type="button"
          onClick={accept}
          className="mt-1 sm:mt-0 inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] transition-all duration-200"
        >
          {t("cookies.banner.button")}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;

