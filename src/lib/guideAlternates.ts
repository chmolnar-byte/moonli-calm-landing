import { SITE_ORIGIN } from "./seo";
import {
  GUIDE_LANGS,
  topicLangs,
  type TopicId,
  featuresPath,
  guidesIndexPath,
  topicPath,
} from "./guidePaths";

export type Alternate = { hreflang: string; href: string; path: string };

function absolute(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

function withDefault(items: Alternate[], fallbackPath: string): Alternate[] {
  return [
    ...items,
    { hreflang: "x-default", href: absolute(fallbackPath), path: fallbackPath },
  ];
}

export function topicAlternates(topic: TopicId): Alternate[] {
  const langs = topicLangs(topic);
  const items = langs.map((lang) => {
    const path = topicPath(lang, topic);
    return { hreflang: lang, href: absolute(path), path };
  });
  const fallback = langs.includes("en")
    ? topicPath("en", topic)
    : topicPath(langs[0] ?? "de", topic);
  return withDefault(items, fallback);
}

export function featureAlternates(): Alternate[] {
  const items = GUIDE_LANGS.map((lang) => {
    const path = featuresPath(lang);
    return { hreflang: lang, href: absolute(path), path };
  });
  return withDefault(items, featuresPath("en"));
}

export function indexAlternates(): Alternate[] {
  const items = GUIDE_LANGS.map((lang) => {
    const path = guidesIndexPath(lang);
    return { hreflang: lang, href: absolute(path), path };
  });
  return withDefault(items, guidesIndexPath("en"));
}
