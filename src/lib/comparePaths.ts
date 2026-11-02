import {
  GUIDE_LANGS,
  GUIDE_LOCALE,
  GUIDE_SECTION,
  OG_LOCALE,
  guidesIndexPath,
  type GuideLang,
} from "./guidePaths";
import { SITE_ORIGIN, canonicalUrl } from "./seo";

export const COMPARE_IDS = ["napper-huckleberry"] as const;
export type CompareId = (typeof COMPARE_IDS)[number];

export const COMPARE_SECTION: Record<GuideLang, string> = {
  de: "vergleich",
  en: "compare",
  es: "comparacion",
  fr: "comparaison",
  ru: "sravnenie",
};

export const COMPARE_SLUGS: Record<CompareId, Record<GuideLang, string>> = {
  "napper-huckleberry": {
    de: "napper-huckleberry",
    en: "napper-huckleberry",
    es: "napper-huckleberry",
    fr: "napper-huckleberry",
    ru: "napper-huckleberry",
  },
};

function withSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function comparePath(lang: GuideLang, id: CompareId = "napper-huckleberry"): string {
  return withSlash(`/${lang}/${COMPARE_SECTION[lang]}/${COMPARE_SLUGS[id][lang]}`);
}

export function compareAlternates(id: CompareId = "napper-huckleberry") {
  const paths = GUIDE_LANGS.map((lang) => ({
    lang,
    path: comparePath(lang, id),
    href: canonicalUrl(comparePath(lang, id)),
    hreflang: GUIDE_LOCALE[lang],
  }));
  return [
    ...paths.map(({ hreflang, href, path }) => ({ hreflang, href, path })),
    {
      hreflang: "x-default",
      href: canonicalUrl(comparePath("en", id)),
      path: comparePath("en", id),
    },
  ];
}

export function compareLanguageHrefs(id: CompareId = "napper-huckleberry"): Partial<Record<GuideLang, string>> {
  return Object.fromEntries(GUIDE_LANGS.map((lang) => [lang, comparePath(lang, id)]));
}

export function compareOgLocale(lang: GuideLang): string {
  return OG_LOCALE[lang];
}

export function compareHtmlLang(lang: GuideLang): string {
  return GUIDE_LOCALE[lang];
}

export function compareGuidesIndex(lang: GuideLang): string {
  return guidesIndexPath(lang);
}

export function compareGuideSectionLabel(lang: GuideLang): string {
  return GUIDE_SECTION[lang];
}

/** Used by sitemap filter. */
export const COMPARE_PATH_RE =
  /^\/(de\/vergleich|en\/compare|es\/comparacion|fr\/comparaison|ru\/sravnenie)\/[a-z0-9-]+\/$/;

export { SITE_ORIGIN, GUIDE_LANGS };
