import type { BlogCollection, BlogEntry } from "./blog";

export const CATEGORY_PLACEHOLDER_IMAGES: Record<BlogCollection, string> = {
  news: "/images/blog/news-placeholder.svg",
  features: "/images/blog/features-placeholder.svg",
  partners: "/images/blog/partner-placeholder.svg",
};

export function getCategoryPlaceholderImage(collection: BlogCollection): string {
  return CATEGORY_PLACEHOLDER_IMAGES[collection];
}

export function getPostCoverImage(entry: BlogEntry): string {
  if (entry.data.image) return entry.data.image;
  if (entry.collection === "partners" && entry.data.partnerLogo) {
    return entry.data.partnerLogo;
  }
  return CATEGORY_PLACEHOLDER_IMAGES[entry.collection];
}
