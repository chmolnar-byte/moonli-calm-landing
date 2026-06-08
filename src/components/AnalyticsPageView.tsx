import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { initAnalyticsFromStoredConsent, trackPageView } from "@/lib/analytics";

const AnalyticsPageView = () => {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initAnalyticsFromStoredConsent();
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    trackPageView(location.pathname + location.search);
  }, [location, ready]);

  return null;
};

export default AnalyticsPageView;
