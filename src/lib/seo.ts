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

  return url.href;
}

export function isIndexableUrl(url: string): boolean {
  return INDEXABLE_URLS.has(canonicalUrl(url));
}
