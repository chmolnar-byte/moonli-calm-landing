/**
 * Generiert KI-Cover für alle veröffentlichten Live-Artikel ohne generated/-Cover.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseMarkdownFile, stringifyMarkdownFile } from "./lib/frontmatter.js";
import { generateBlogCover } from "./lib/images.js";

const LIVE_COVERS: Array<{ category: "news" | "features"; slug: string }> = [
  { category: "news", slug: "2026-07-01-babyschlaf-routinen" },
  { category: "features", slug: "2026-07-03-schlaftracking-wachfenster" },
];

function needsNewCover(image: unknown): boolean {
  if (typeof image !== "string" || !image) return true;
  if (image.includes("-placeholder.")) return true;
  if (!image.includes("/generated/")) return true;
  return false;
}

async function main() {
  let updated = 0;

  for (const { category, slug } of LIVE_COVERS) {
    const filePath = join(process.cwd(), "src/content", category, `${slug}.md`);
    const parsed = parseMarkdownFile(readFileSync(filePath, "utf-8"));

    if (!needsNewCover(parsed.data.image)) {
      console.log(`Überspringe ${slug} – Cover bereits KI-generiert.`);
      continue;
    }

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
    console.log(`✓ ${slug} → ${cover.publicPath}`);
    updated += 1;
  }

  if (updated === 0) {
    console.log("Keine Cover aktualisiert.");
  } else {
    console.log(`${updated} Cover generiert.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
