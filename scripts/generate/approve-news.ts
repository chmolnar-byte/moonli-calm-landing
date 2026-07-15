/**
 * Gibt einen News-Entwurf frei (draft: false).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { findNewsDraft } from "./lib/newsDrafts.js";
import { parseMarkdownFile, stringifyMarkdownFile } from "./lib/frontmatter.js";

function main() {
  const slug = process.env.ARTICLE_SLUG;
  const draft = findNewsDraft(slug);
  const raw = readFileSync(draft.path, "utf-8");
  const parsed = parseMarkdownFile(raw);

  if (parsed.data.draft === false) {
    console.log(`"${draft.slug}" ist bereits freigegeben.`);
    return;
  }

  parsed.data.draft = false;
  writeFileSync(draft.path, stringifyMarkdownFile(parsed.data, parsed.body), "utf-8");
  console.log(`Freigegeben: ${draft.slug}`);
  console.log(`Titel: ${draft.title}`);
}

main();
