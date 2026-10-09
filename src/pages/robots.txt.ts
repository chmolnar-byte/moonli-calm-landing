import type { APIRoute } from "astro";
import { SITE_ORIGIN } from "@/lib/seo";

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin ?? SITE_ORIGIN).replace(/\/$/, "");
  const body = [
    "User-agent: *",
    "Allow: /",
    "Allow: /de/ratgeber/",
    "Allow: /en/guides/",
    "Allow: /es/guias/",
    "Allow: /fr/guides/",
    "Allow: /ru/gid/",
    "Allow: /de/funktionen/",
    "Allow: /en/features/",
    "Allow: /es/funciones/",
    "Allow: /fr/fonctions/",
    "Allow: /ru/funktsii/",
    "",
    "Disallow: /admin/",
    "Disallow: /blog/",
    "Disallow: /redaktion",
    "Disallow: /email-confirmed",
    "",
    `Sitemap: ${origin}/sitemap-index.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
