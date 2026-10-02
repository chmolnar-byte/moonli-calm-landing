import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { SITE_ORIGIN, canonicalUrl, isIndexableUrl } from "./src/lib/seo";
import { guideLastModified } from "./src/lib/guideLastmod";

const githubPagesBase = "/moonli-calm-landing/";

export default defineConfig({
  site: SITE_ORIGIN,
  base: process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => isIndexableUrl(page),
      serialize(item) {
        const url = canonicalUrl(item.url);
        if (!isIndexableUrl(url)) return undefined;
        item.url = url;
        const lastmod = guideLastModified(url);
        if (lastmod) item.lastmod = lastmod;
        delete item.changefreq;
        delete item.priority;
        return item;
      },
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
    }),
    mdx(),
  ],
  output: "static",
  redirects: {
    "/redaktion": "/admin/index.html",
  },
});
