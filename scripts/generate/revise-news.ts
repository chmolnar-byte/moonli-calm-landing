import { readFileSync, writeFileSync } from "node:fs";
import { callAIJson } from "./lib/ai.js";
import { parseMarkdownFile, stringifyMarkdownFile } from "./lib/frontmatter.js";
import { findNewsDraft } from "./lib/newsDrafts.js";

const NEWS_SYSTEM = `Du bist Chefredakteur für den Moonli Baby-Blog (DACH, Fokus Österreich).
Überarbeite Artikel präzise nach Redaktions-Feedback. Behalte Fakten und Quellen bei, es sei denn das Feedback verlangt Korrekturen.
Keine Heilversprechen. Deutsch (Österreich), duzen.`;

interface RevisedArticle {
  title: string;
  description: string;
  tags: string[];
  seoKeywords: string[];
  sources: Array<{ name: string; url: string }>;
  bodyMarkdown: string;
}

async function main() {
  const feedback = process.env.FEEDBACK?.trim();
  if (!feedback) {
    throw new Error("FEEDBACK fehlt – bitte Anpassungswünsche als Text übergeben.");
  }

  const slug = process.env.ARTICLE_SLUG;
  const draft = findNewsDraft(slug);
  const raw = readFileSync(draft.path, "utf-8");
  const parsed = parseMarkdownFile(raw);

  const revised = await callAIJson<RevisedArticle>(
    NEWS_SYSTEM,
    `Überarbeite diesen News-Artikel nach dem Redaktions-Feedback.

Aktueller Artikel:
Titel: ${parsed.data.title}
Beschreibung: ${parsed.data.description}
Tags: ${JSON.stringify(parsed.data.tags ?? [])}
Quellen: ${JSON.stringify(parsed.data.sources ?? [])}

Markdown:
${parsed.body}

Redaktions-Feedback:
${feedback}

Anforderungen:
- Feedback vollständig umsetzen
- Struktur beibehalten (H2-Abschnitte, FAQ, Quellen)
- Länge: 700-900 Wörter
- draft bleibt true (wird separat freigegeben)

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

  parsed.data.title = revised.title;
  parsed.data.description = revised.description;
  parsed.data.tags = revised.tags;
  parsed.data.sources = revised.sources;
  parsed.data.draft = true;
  parsed.data.seo = { keywords: revised.seoKeywords };

  writeFileSync(draft.path, stringifyMarkdownFile(parsed.data, revised.bodyMarkdown), "utf-8");
  console.log(`Überarbeitet: ${draft.slug}`);
  console.log(`Neuer Titel: ${revised.title}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
