import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { buildFrontmatter, callAIJson, slugify, todaySlug } from "./lib/ai.js";
import { fetchAllNewsItems, formatItemsForPrompt } from "./lib/rss.js";

const NEWS_SYSTEM = `Du bist Chefredakteur für den Moonli Baby-Blog (DACH, Fokus Österreich).
Schreibe faktenbasiert, verständlich und original – niemals Copy-Paste.
Keine Heilversprechen, keine Diagnosen. Bei Gesundheitsthemen vorsichtig formulieren ("laut Fachstelle", "kann helfen").
Keine wörtlichen Übernahmen länger als 8 Wörter aus Quellen.`;

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
    NEWS_SYSTEM,
    `Analysiere diese Meldungen aus mehreren Quellen und erstelle einen Research-Brief als JSON.

Regeln:
- Wähle genau 1 relevantes Kernthema für Eltern mit Baby (0-24 Monate)
- Priorisiere Themen mit Praxisnutzen (Schlaf, Ernährung, Entwicklung, Sicherheit, Elternbelastung)
- Nutze internationale Evidenz, erkläre aber den Bezug für Eltern in AT/DE
- Wähle 2-4 Quellen aus der Liste (echte URLs)

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
  );

  const article = await callAIJson<NewsArticle>(
    NEWS_SYSTEM,
    `Schreibe auf Basis dieses Research-Briefs einen vollständigen Blogartikel als JSON.

Research-Brief:
${JSON.stringify(brief, null, 2)}

Anforderungen:
- Sprache: Deutsch (Österreich), Sie-Ansprache vermeiden, duzen
- Länge: 700-900 Wörter
- Struktur in Markdown:
  - Einleitung (klarer Nutzen)
  - "## Was aktuell wichtig ist"
  - "## Was das für euren Alltag bedeutet" (mit Bulletpoints)
  - "## Praktische Tipps" (konkret umsetzbar)
  - "## Wie Moonli unterstützen kann" (1 kurzer Absatz, nicht werblich)
  - "## Häufige Fragen" (3 Fragen mit ### Überschriften)
  - "## Quellen" (Liste mit Name + Link)
- SEO: title max 65 Zeichen, description 140-160 Zeichen
- Keine erfundenen Studien/Zahlen

JSON-Schema:
{
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "seoKeywords": ["string"],
  "sources": [{"name":"string","url":"string"}],
  "bodyMarkdown": "string"
}`,
  );

  const slugBase = slugify(brief.topic || article.title || "baby-news").slice(0, 40) || "baby-news";
  const slug = todaySlug(slugBase);
  const content = buildFrontmatter(
    {
      title: article.title,
      description: article.description,
      pubDate: new Date().toISOString().slice(0, 10),
      category: "news",
      tags: article.tags?.length ? article.tags : brief.tags,
      author: "Moonli Redaktion",
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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
