import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { buildFrontmatter, callAIJson, slugify, todaySlug } from "./lib/ai.js";
import { EDITORIAL_SYSTEM, NEWS_ARTICLE_SPEC } from "./lib/editorial.js";
import { generateBlogCover } from "./lib/images.js";
import { fetchAllNewsItems, formatItemsForPrompt } from "./lib/rss.js";

interface ResearchBrief {
  topic: string;
  workingTitle: string;
  angle: string;
  whyRelevant: string;
  keyFacts: string[];
  sources: Array<{ name: string; url: string }>;
  tags: string[];
  seoKeywords: string[];
}

interface NewsArticle {
  title: string;
  description: string;
  tags: string[];
  seoKeywords: string[];
  sources: Array<{ name: string; url: string }>;
  bodyMarkdown: string;
}

async function main() {
  const configPath = join(process.cwd(), "content/data/news-sources.yaml");
  const config = parse(readFileSync(configPath, "utf-8")) as {
    sources: Array<{ name: string; url: string; region: string }>;
  };

  const items = await fetchAllNewsItems(config.sources);
  if (items.length < 3) {
    throw new Error("Zu wenige RSS-Einträge – Abbruch, um Low-Quality-Content zu vermeiden.");
  }

  const researchInput = formatItemsForPrompt(items.slice(0, 25));

  const brief = await callAIJson<ResearchBrief>(
    EDITORIAL_SYSTEM,
    `Analysiere diese Meldungen aus mehreren Quellen und erstelle einen Research-Brief als JSON.

Regeln:
- Wähle genau 1 relevantes Kernthema für Eltern mit Baby (0-24 Monate)
- Priorisiere Themen mit Praxisnutzen (Schlaf, Ernährung, Entwicklung, Sicherheit, Elternbelastung)
- Nutze internationale Evidenz, erkläre aber den Bezug für Eltern in AT/DE
- Wähle 2-4 Quellen mit echten Deep-Links (nicht nur Startseiten)
- Kein erfundener Studien-Titel

Input:
${researchInput}

JSON-Schema:
{
  "topic": "string",
  "workingTitle": "string",
  "angle": "string",
  "whyRelevant": "string",
  "keyFacts": ["string"],
  "sources": [{"name":"string","url":"string"}],
  "tags": ["string"],
  "seoKeywords": ["string"]
}`,
    { model: "brief" },
  );

  const article = await callAIJson<NewsArticle>(
    EDITORIAL_SYSTEM,
    `Schreibe auf Basis dieses Research-Briefs einen vollständigen Blogartikel als JSON.

Research-Brief:
${JSON.stringify(brief, null, 2)}

${NEWS_ARTICLE_SPEC}

JSON-Schema:
{
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "seoKeywords": ["string"],
  "sources": [{"name":"string","url":"string"}],
  "bodyMarkdown": "string"
}`,
    { model: "writing", temperature: 0.5 },
  );

  const slugBase = slugify(brief.topic || article.title || "baby-news").slice(0, 40) || "baby-news";
  const slug = todaySlug(slugBase);

  const cover = await generateBlogCover({
    slug,
    title: article.title,
    category: "news",
    angle: brief.angle || brief.topic,
  });

  const content = buildFrontmatter(
    {
      title: article.title,
      description: article.description,
      pubDate: new Date().toISOString().slice(0, 10),
      category: "news",
      tags: article.tags?.length ? article.tags : brief.tags,
      author: "Moonli Redaktion",
      image: cover.publicPath,
      imageAlt: cover.altText,
      draft: true,
      sources: article.sources?.length ? article.sources : brief.sources,
      seo: {
        keywords: article.seoKeywords?.length ? article.seoKeywords : brief.seoKeywords,
      },
    },
    article.bodyMarkdown,
  );

  const outPath = join(process.cwd(), "src/content/news", `${slug}.md`);
  writeFileSync(outPath, content, "utf-8");
  console.log(`Created news draft: ${outPath}`);
  console.log(`Topic: ${brief.topic}`);
  console.log(`Title: ${article.title}`);
  console.log(`Cover: ${cover.publicPath}`);

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `article_slug=${slug}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
