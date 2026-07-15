/**
 * Generiert ein KI-Cover-Bild für einen bestehenden Blog-Artikel (News oder Features).
 * Nutzung: ARTICLE_SLUG=2026-07-01-babyschlaf-routinen CATEGORY=news npm run generate:cover
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseMarkdownFile, stringifyMarkdownFile } from "./lib/frontmatter.js";
import { generateBlogCover } from "./lib/images.js";

type Category = "news" | "features";

function findArticle(slug: string, category: Category): string {
  const path = join(process.cwd(), "src/content", category, `${slug}.md`);
  return path;
}

async function main() {
  const slug = process.env.ARTICLE_SLUG?.trim();
  const category = (process.env.CATEGORY?.trim() ?? "news") as Category;

  if (!slug) {
    throw new Error("ARTICLE_SLUG fehlt – z. B. ARTICLE_SLUG=2026-07-01-babyschlaf-routinen");
  }

  if (!["news", "features"].includes(category)) {
    throw new Error("CATEGORY muss news oder features sein.");
  }

  const filePath = findArticle(slug, category);
  const parsed = parseMarkdownFile(readFileSync(filePath, "utf-8"));
  const title = String(parsed.data.title ?? slug);
  const description = String(parsed.data.description ?? title);

  const cover = await generateBlogCover({
    slug,
    title,
    category,
    angle: description,
  });

  parsed.data.image = cover.publicPath;
  parsed.data.imageAlt = cover.altText;

  writeFileSync(filePath, stringifyMarkdownFile(parsed.data, parsed.body), "utf-8");
  console.log(`Cover aktualisiert für ${slug}: ${cover.publicPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
