import { getCollection, type CollectionEntry } from "astro:content";

export type BlogCollection = "news" | "features" | "deals" | "partners";

export type BlogEntry =
  | CollectionEntry<"news">
  | CollectionEntry<"features">
  | CollectionEntry<"deals">
  | CollectionEntry<"partners">;

const CATEGORY_LABELS: Record<BlogCollection, string> = {
  news: "News",
  features: "Moonli Features",
  deals: "Baby-Angebote",
  partners: "Partner des Monats",
};

const CATEGORY_PATHS: Record<BlogCollection, string> = {
  news: "/blog/news",
  features: "/blog/features",
  deals: "/blog/deals",
  partners: "/blog/partner",
};

export function getCategoryLabel(collection: BlogCollection): string {
  return CATEGORY_LABELS[collection];
}

export function getCategoryPath(collection: BlogCollection): string {
  return CATEGORY_PATHS[collection];
}

export function getArticlePath(entry: BlogEntry): string {
  return `${CATEGORY_PATHS[entry.collection]}/${entry.slug}`;
}

export async function getPublishedPosts(
  collection: BlogCollection,
  includeDrafts = false,
): Promise<BlogEntry[]> {
  const posts = await getCollection(collection, ({ data }) =>
    includeDrafts ? true : !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getAllPublishedPosts(
  includeDrafts = false,
): Promise<BlogEntry[]> {
  const collections: BlogCollection[] = ["news", "features", "deals", "partners"];
  const all = await Promise.all(
    collections.map((c) => getPublishedPosts(c, includeDrafts)),
  );
  return all.flat().sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getPostsByPreviewToken(
  token: string,
): Promise<BlogEntry[]> {
  const collections: BlogCollection[] = ["news", "features", "deals", "partners"];
  const all = await Promise.all(
    collections.map((c) => getCollection(c)),
  );
  return all
    .flat()
    .filter((entry) => entry.data.previewToken === token)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

const CATEGORY_DESCRIPTIONS: Record<BlogCollection, string> = {
  news: "Aktuelle Themen zu Babys und Elternalltag. Ältere News bleiben online – nichts wird gelöscht.",
  features: "Alle Moonli-Funktionen erklärt. Auch ältere Feature-Artikel bleiben als Nachschlagewerk erreichbar.",
  deals: "Aktuelle und vergangene Angebote. Abgelaufene Deals bleiben im Archiv sichtbar.",
  partners: "Partner-Highlights – aktuell und aus vergangenen Monaten.",
};

export function getCategoryDescription(collection: BlogCollection): string {
  return CATEGORY_DESCRIPTIONS[collection];
}

export function groupPostsByMonth(
  posts: BlogEntry[],
): { key: string; label: string; posts: BlogEntry[] }[] {
  const groups: { key: string; label: string; posts: BlogEntry[] }[] = [];

  for (const post of posts) {
    const date = post.data.pubDate;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("de-AT", { month: "long", year: "numeric" });
    const last = groups[groups.length - 1];

    if (last?.key === key) {
      last.posts.push(post);
    } else {
      groups.push({ key, label, posts: [post] });
    }
  }

  return groups;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("de-AT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
