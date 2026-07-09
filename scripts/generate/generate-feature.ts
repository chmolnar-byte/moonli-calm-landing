import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildFrontmatter, callAI, todaySlug } from "./lib/ai.js";

async function main() {
  const rotation = JSON.parse(
    readFileSync(join(process.cwd(), "content/data/feature-rotation.json"), "utf-8"),
  );
  const features = rotation.features as Array<{ id: string; titleKey: string; descriptionKey: string }>;
  const index = (rotation.lastRotatedIndex + 1) % features.length;
  const feature = features[index];

  const prompt = `Schreibe einen SEO-Artikel über das Moonli-Feature "${feature.id}". 
Feature-Key: ${feature.titleKey}. 
Betonung: kostenlos, Made in Vienna, für Eltern im DACH-Raum.
Verlinke am Ende auf die Moonli App (App Store & Google Play).`;

  const body = await callAI(prompt);
  const slug = todaySlug(feature.id);
  const content = buildFrontmatter(
    {
      title: `Moonli Feature: ${feature.id}`,
      description: `Alles über ${feature.id} in der Moonli Baby-App.`,
      pubDate: new Date().toISOString().slice(0, 10),
      category: "features",
      moonliFeature: feature.id,
      tags: ["moonli", "feature", feature.id],
      author: "Moonli Redaktion",
      draft: true,
    },
    body,
  );

  writeFileSync(join(process.cwd(), "src/content/features", `${slug}.md`), content, "utf-8");
  rotation.lastRotatedIndex = index;
  writeFileSync(
    join(process.cwd(), "content/data/feature-rotation.json"),
    JSON.stringify(rotation, null, 2),
    "utf-8",
  );
  console.log(`Created feature draft: ${slug}`);
}

main().catch(console.error);
