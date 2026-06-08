import { getStoredConsent } from "@/lib/cookieConsent";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let scriptLoaded = false;
let isConfigured = false;

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
}

function loadGtagScript(): void {
  if (!MEASUREMENT_ID || scriptLoaded || document.getElementById("ga-script")) {
    return;
  }

  scriptLoaded = true;
  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function applyAnalyticsConsent(granted: boolean): void {
  if (!MEASUREMENT_ID) return;

  if (!granted) return;

  ensureGtag();
  loadGtagScript();

  if (!isConfigured) {
    window.gtag!("js", new Date());
    window.gtag!("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
    isConfigured = true;
  }
}

export function trackPageView(path: string): void {
  if (!MEASUREMENT_ID || !getStoredConsent()?.analytics || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function initAnalyticsFromStoredConsent(): void {
  const consent = getStoredConsent();
  if (consent?.analytics) {
    applyAnalyticsConsent(true);
  }
}
