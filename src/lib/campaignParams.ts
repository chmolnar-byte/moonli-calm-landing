/** First-party campaign params (UTM + click IDs). No third-party calls. */

const STORAGE_KEY = "moonli_campaign_params_v1";

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
] as const;

export type CampaignParamKey = (typeof PARAM_KEYS)[number];
export type CampaignParams = Partial<Record<CampaignParamKey, string>>;

function readStorage(): CampaignParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CampaignParams;
  } catch {
    return {};
  }
}

function writeStorage(params: CampaignParams): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // private mode / quota — ignore
  }
}

/**
 * Reads UTM/click IDs from the current URL and merges them into sessionStorage
 * for the rest of the visit (SPA navigations, cookie accept after scroll, etc.).
 * If Meta only sends fbclid, we infer source/medium so GA does not mark it Direct.
 */
export function captureCampaignParams(): CampaignParams {
  if (typeof window === "undefined") return {};

  const search = new URLSearchParams(window.location.search);
  const fromUrl: CampaignParams = {};
  for (const key of PARAM_KEYS) {
    const value = search.get(key)?.trim();
    if (value) fromUrl[key] = value;
  }

  if (fromUrl.fbclid && !fromUrl.utm_source) {
    fromUrl.utm_source = "meta";
    fromUrl.utm_medium = fromUrl.utm_medium || "paid";
  }

  if (Object.keys(fromUrl).length === 0) return readStorage();

  const merged = { ...readStorage(), ...fromUrl };
  writeStorage(merged);
  return merged;
}

export function getStoredCampaignParams(): CampaignParams {
  return readStorage();
}

/** Path + query with stored campaign params filled in if the URL lost them. */
export function buildLocationWithCampaign(): string {
  if (typeof window === "undefined") return "/";
  const stored = captureCampaignParams();
  const url = new URL(window.location.href);
  for (const key of PARAM_KEYS) {
    const value = stored[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}`;
}

/** GA4 campaign object for gtag config (only fields that exist). */
export function campaignForGtag():
  | {
      source?: string;
      medium?: string;
      name?: string;
      content?: string;
      term?: string;
      id?: string;
    }
  | undefined {
  const p = captureCampaignParams();
  if (!p.utm_source && !p.utm_campaign && !p.fbclid) return undefined;
  return {
    source: p.utm_source,
    medium: p.utm_medium,
    name: p.utm_campaign,
    content: p.utm_content,
    term: p.utm_term,
    id: p.utm_id,
  };
}
