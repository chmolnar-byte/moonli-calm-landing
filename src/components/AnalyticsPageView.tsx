import { useEffect } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  initAnalyticsFromStoredConsent,
  setAnalyticsLanguage,
} from "@/lib/analytics";
import { useLanguage } from "@/i18n/LanguageContext";
import { getStoredConsent } from "@/lib/cookieConsent";

const AnalyticsPageView = () => {
  const { language } = useLanguage();

  useEffect(() => {
    initAnalyticsFromStoredConsent();
  }, []);

  useEffect(() => {
    const syncLanguage = () => {
      if (!getStoredConsent()?.analytics) return;
      setAnalyticsLanguage(language);
    };

    syncLanguage();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, syncLanguage);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, syncLanguage);
  }, [language]);

  return null;
};

export default AnalyticsPageView;
