import type { APIRoute } from "astro";
import { SITE_ORIGIN } from "@/lib/seo";

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin ?? SITE_ORIGIN).replace(/\/$/, "");
  const body = [
    "User-agent: *",
    "Allow: /",
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
