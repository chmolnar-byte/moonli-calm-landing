import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { SITE_ORIGIN } from "./seo";
import {
  FEATURES_SLUG,
  GUIDE_LANGS,
  GUIDE_SECTION,
  type GuideLang,
  isGuideLang,
} from "./guidePaths";

type GuideMeta = {
  lang: GuideLang;
  slug: string;
  draft: boolean;
  lastmod: string;
};

let cache: Map<string, string> | null = null;

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  return parse(match[1]) as Record<string, unknown>;
}

function toIsoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  return null;
}

function loadGuides(): GuideMeta[] {
  const root = join(process.cwd(), "src/content/guides");
  if (!existsSync(root)) return [];
  const guides: GuideMeta[] = [];

  for (const lang of readdirSync(root)) {
    if (!isGuideLang(lang)) continue;
    const dir = join(root, lang);
    for (const file of readdirSync(dir).filter((name) => name.endsWith(".md"))) {
      const data = parseFrontmatter(readFileSync(join(dir, file), "utf8"));
      const slug = typeof data.urlSlug === "string" ? data.urlSlug : "";
      const lastmod = toIsoDate(data.updatedDate) ?? toIsoDate(data.pubDate);
      if (!slug || !lastmod) continue;
      guides.push({
        lang,
        slug,
        draft: data.draft === true,
        lastmod,
      });
    }
  }

  return guides;
}

function index(): Map<string, string> {
  if (cache) return cache;
  cache = new Map();
  for (const guide of loadGuides()) {
    if (guide.draft) continue;
    const path = `/${guide.lang}/${GUIDE_SECTION[guide.lang]}/${guide.slug}`;
    cache.set(path, guide.lastmod);
  }
  for (const lang of GUIDE_LANGS) {
    cache.set(`/${lang}/${FEATURES_SLUG[lang]}`, "2026-10-02");
    cache.set(`/${lang}/${GUIDE_SECTION[lang]}`, "2026-10-02");
  }
  return cache;
}

export function guideLastModified(url: string): string | undefined {
  const path = new URL(url, SITE_ORIGIN).pathname.replace(/\/+$/, "") || "/";
  return index().get(path);
}
