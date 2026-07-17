import { getStoredConsent } from "@/lib/cookieConsent";

/** GA4 Measurement ID – PUBLIC_ (Astro) oder VITE_ (Legacy), sonst Fallback. */
const MEASUREMENT_ID =
  import.meta.env.PUBLIC_GA_MEASUREMENT_ID ||
  import.meta.env.VITE_GA_MEASUREMENT_ID ||
  "G-497RKXKY2W";

function gtag(...args: unknown[]): void {
  if (typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function applyAnalyticsConsent(granted: boolean): void {
  if (!window.gtag) return;

  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

export function trackPageView(path: string): void {
  if (!getStoredConsent()?.analytics || !window.gtag) return;

  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function initAnalyticsFromStoredConsent(): void {
  if (!window.gtag) return;

  gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });

  const consent = getStoredConsent();
  if (consent !== null) {
    applyAnalyticsConsent(consent.analytics);
  }
}
