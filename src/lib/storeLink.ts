import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";

export type StoreTarget = {
  href: string;
  store: "app_store" | "google_play" | "page";
};

/** Fallback for desktop and server rendering: scroll to the store buttons at the end of the page. */
export const PAGE_STORE_TARGET: StoreTarget = { href: "/#download", store: "page" };

/** On iPhone/iPad and Android the hero button opens the matching store directly. */
export const detectStoreTarget = (): StoreTarget => {
  if (typeof navigator === "undefined") return PAGE_STORE_TARGET;
  const ua = navigator.userAgent;
  const isIpadOs = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || isIpadOs) return { href: APP_STORE_URL, store: "app_store" };
  if (/Android/.test(ua)) return { href: GOOGLE_PLAY_URL, store: "google_play" };
  return PAGE_STORE_TARGET;
};
