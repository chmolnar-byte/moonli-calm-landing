import { getStoredConsent } from "@/lib/cookieConsent";

/** GA4 Measurement ID – PUBLIC_ (Astro) oder VITE_ (Legacy), sonst Fallback. */
export const MEASUREMENT_ID =
  import.meta.env.PUBLIC_GA_MEASUREMENT_ID ||
  import.meta.env.VITE_GA_MEASUREMENT_ID ||
  "G-497RKXKY2W";

export const ANALYTICS_CONSENT_EVENT = "moonli-analytics-consent";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function ensureGtag(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // Google-Standard: arguments-Objekt in dataLayer pushen (nicht Rest-Array)
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

function gtag(...args: unknown[]): void {
  ensureGtag();
  window.gtag!(...args);
}

function hasAnalyticsConsent(): boolean {
  return getStoredConsent()?.analytics === true;
}

function emitConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: { granted } }),
  );
}

/** Nach Cookie-Einwilligung: Consent freigeben und Pageview senden. */
export function applyAnalyticsConsent(granted: boolean): void {
  ensureGtag();

  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });

  if (granted) {
    gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });
  }

  emitConsent(granted);
}

export function trackPageView(path: string): void {
  if (!hasAnalyticsConsent()) return;
  ensureGtag();

  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    send_to: MEASUREMENT_ID,
  });
}

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (!hasAnalyticsConsent()) return;
  ensureGtag();

  gtag("event", name, {
    ...params,
    send_to: MEASUREMENT_ID,
  });
}

export function setAnalyticsLanguage(language: string): void {
  if (!hasAnalyticsConsent()) return;
  ensureGtag();
  gtag("set", "user_properties", { ui_language: language });
}

export function initAnalyticsFromStoredConsent(): void {
  ensureGtag();

  const consent = getStoredConsent();
  if (consent === null) return;

  applyAnalyticsConsent(consent.analytics);
  if (consent.analytics) {
    trackPageView(window.location.pathname + window.location.search);
  }
}
