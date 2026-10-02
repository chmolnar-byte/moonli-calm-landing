import { defineCollection, z } from "astro:content";

const guideLang = z.enum(["de", "en", "es", "fr", "ru"]);

const blogBase = {
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default("Moonli Redaktion"),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  previewToken: z.string().nullable().optional(),
  seo: z
    .object({
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
};

const news = defineCollection({
  type: "content",
  schema: z.object({
    ...blogBase,
    category: z.literal("news").default("news"),
    sources: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }),
      )
      .optional(),
  }),
});

const features = defineCollection({
  type: "content",
  schema: z.object({
    ...blogBase,
    category: z.literal("features").default("features"),
    moonliFeature: z.string(),
    ctaText: z.string().optional(),
  }),
});

const partners = defineCollection({
  type: "content",
  schema: z.object({
    ...blogBase,
    category: z.literal("partner").default("partner"),
    partnerName: z.string(),
    partnerUrl: z.string().url().optional(),
    partnerLogo: z.string().optional(),
    featuredMonth: z.string(),
  }),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    topic: z.string(),
    lang: guideLang,
    urlSlug: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Christian Molnar"),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
    primaryFeatures: z.array(z.string()).default([]),
    sources: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .min(3),
  }),
});

export const collections = { news, features, partners, guides };
