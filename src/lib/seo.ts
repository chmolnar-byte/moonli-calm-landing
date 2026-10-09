export const SITE_ORIGIN = "https://moonli.net";

const INDEXABLE_PATHS = [
  "/",
  "/privacy",
  "/terms",
  "/imprint",
  "/cookies",
  "/data-deletion",
] as const;

export const INDEXABLE_URLS = new Set(
  INDEXABLE_PATHS.map((path) => canonicalUrl(path)),
);

export function canonicalUrl(input: string): string {
  const url = input.startsWith("http")
    ? new URL(input)
    : new URL(input.startsWith("/") ? input : `/${input}`, `${SITE_ORIGIN}/`);

  url.hash = "";
  url.search = "";
  url.protocol = "https:";
  url.hostname = "moonli.net";
  url.port = "";
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  if (url.pathname !== "/") url.pathname += "/";

  return url.href;
}

const GUIDE_PATH =
  /^\/(de\/ratgeber|en\/guides|es\/guias|fr\/guides|ru\/gid)(\/[a-z0-9-]+)?\/$/;

const OVERVIEW_PATH =
  /^\/(de\/funktionen|en\/features|es\/funciones|fr\/fonctions|ru\/funktsii)\/$/;

export function isIndexableUrl(url: string): boolean {
  const canonical = canonicalUrl(url);
  if (INDEXABLE_URLS.has(canonical)) return true;
  const path = new URL(canonical).pathname;
  return GUIDE_PATH.test(path) || OVERVIEW_PATH.test(path);
}
