import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

const githubPagesBase = "/moonli-calm-landing/";

export default defineConfig({
  site: "https://moonli.net",
  base: process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes("/blog/preview/") && !page.includes("/admin"),
    }),
    mdx(),
  ],
  output: "static",
  redirects: {
    "/redaktion": "/admin/index.html",
  },
});
