import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildFrontmatter, callAI, todaySlug } from "./lib/ai.js";
import { parse } from "yaml";

async function main() {
  const dealsYaml = readFileSync(join(process.cwd(), "content/data/deals-manual.yaml"), "utf-8");
  const data = parse(dealsYaml) as { offers: Array<Record<string, string>> };

  const prompt = `Schreibe einen SEO-Artikel "Baby-Angebote der Woche" basierend auf diesen Angeboten:
${JSON.stringify(data.offers, null, 2)}

Struktur: Einleitung, pro Shop eine Sektion, Spartipps, FAQ.
Hinweis auf Affiliate-Links am Ende.`;

  const body = await callAI(prompt);
  const slug = todaySlug("baby-angebote");
  const content = buildFrontmatter(
    {
      title: "Baby-Angebote der Woche",
      description: "Aktuelle Rabatte bei Bipa, DM und Amazon für Eltern.",
      pubDate: new Date().toISOString().slice(0, 10),
      category: "deals",
      tags: ["angebote", "baby", "rabatt"],
      shops: ["bipa", "dm", "amazon"],
      author: "Moonli Redaktion",
      draft: true,
    },
    body,
  );

  writeFileSync(join(process.cwd(), "src/content/deals", `${slug}.md`), content, "utf-8");
  console.log(`Created deals draft: ${slug}`);
}

main().catch(console.error);
