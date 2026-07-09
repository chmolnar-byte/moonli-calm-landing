import { useEffect } from "react";
import { initAnalyticsFromStoredConsent, trackPageView } from "@/lib/analytics";

const AnalyticsPageView = () => {
  useEffect(() => {
    initAnalyticsFromStoredConsent();
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  return null;
};

export default AnalyticsPageView;
