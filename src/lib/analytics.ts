import { getStoredConsent } from "@/lib/cookieConsent";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function gtag(...args: unknown[]): void {
  if (typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function applyAnalyticsConsent(granted: boolean): void {
  if (!MEASUREMENT_ID || !window.gtag) return;

  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

export function trackPageView(path: string): void {
  if (!MEASUREMENT_ID || !getStoredConsent()?.analytics || !window.gtag) return;

  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function initAnalyticsFromStoredConsent(): void {
  const consent = getStoredConsent();
  if (consent !== null) {
    applyAnalyticsConsent(consent.analytics);
  }
}
