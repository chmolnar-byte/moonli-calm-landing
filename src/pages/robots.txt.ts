import type { APIRoute } from "astro";
import { SITE_ORIGIN } from "@/lib/seo";

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin ?? SITE_ORIGIN).replace(/\/$/, "");
  // /blog/ must NOT be Disallow'd: old blog URLs were indexed, then redirected to /.
  // Blocking crawl prevented Google from seeing the 301 → "Indexed though blocked by robots.txt".
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "Disallow: /admin/",
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
