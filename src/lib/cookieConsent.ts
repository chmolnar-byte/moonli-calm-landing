export const COOKIE_KEY = "moonli_cookie_consent_v2";

/** Fired by the footer link so the consent bar can be reopened to change or withdraw consent. */
export const OPEN_COOKIE_SETTINGS_EVENT = "moonli-open-cookie-settings";

export type CookieConsent = {
  analytics: boolean;
};

export function getStoredConsent(): CookieConsent | null {
  try {
    const stored = window.localStorage.getItem(COOKIE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CookieConsent;
  } catch {
    return null;
  }
}

export function saveConsent(consent: CookieConsent): void {
  try {
    window.localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
  } catch {
    // ignore
  }
}
