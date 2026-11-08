import {
  buildLocationWithCampaign,
  campaignForGtag,
  captureCampaignParams,
} from "@/lib/campaignParams";
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

function pageLocationWithCampaign(): string {
  return `${window.location.origin}${buildLocationWithCampaign()}`;
}

/** Loads the Google tag once. Only ever called after the visitor agreed to analytics. */
function loadGoogleTag(): void {
  if (document.querySelector('script[data-moonli-gtag]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.moonliGtag = "1";
  document.head.appendChild(script);
  gtag("js", new Date());
}

/** Removes the Google Analytics cookies (_ga, _ga_*) that an earlier consent may have set. */
function deleteGoogleCookies(): void {
  const host = window.location.hostname;
  const domains = ["", `; domain=${host}`, `; domain=.${host}`, `; domain=.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/** Nach Cookie-Einwilligung: Consent freigeben, Google-Tag laden, Pageview senden. */
export function applyAnalyticsConsent(granted: boolean): void {
  ensureGtag();
  captureCampaignParams();
  if (!granted) deleteGoogleCookies();

  // Withdrawing consent also switches off a tag that was loaded earlier in this session.
  (window as unknown as Record<string, boolean>)[`ga-disable-${MEASUREMENT_ID}`] = !granted;

  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });

  if (granted) {
    loadGoogleTag();
    const pagePath = buildLocationWithCampaign();
    const campaign = campaignForGtag();
    gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
      page_path: pagePath,
      page_location: pageLocationWithCampaign(),
      page_title: document.title,
      ...(campaign ? { campaign } : {}),
    });
  }

  emitConsent(granted);
}

export function trackPageView(path?: string): void {
  if (!hasAnalyticsConsent()) return;
  ensureGtag();
  captureCampaignParams();

  const pagePath = path || buildLocationWithCampaign();
  gtag("event", "page_view", {
    page_path: pagePath,
    page_location: pageLocationWithCampaign(),
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
  captureCampaignParams();

  const consent = getStoredConsent();
  if (consent === null) return;

  applyAnalyticsConsent(consent.analytics);
  if (consent.analytics) {
    trackPageView();
  }
}
