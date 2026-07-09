/** Astro/Vite image imports resolve to a URL string or metadata object. */
export function assetUrl(asset: string | { src: string }): string {
  return typeof asset === "string" ? asset : asset.src;
}
