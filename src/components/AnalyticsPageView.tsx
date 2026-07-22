import { useEffect } from "react";
import { initAnalyticsFromStoredConsent } from "@/lib/analytics";

const AnalyticsPageView = () => {
  useEffect(() => {
    initAnalyticsFromStoredConsent();
  }, []);

  return null;
};

export default AnalyticsPageView;
