import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildFrontmatter, callAIJson, slugify, todaySlug } from "./lib/ai.js";
import { EDITORIAL_SYSTEM, FEATURE_ARTICLE_SPEC } from "./lib/editorial.js";
import { generateBlogCover } from "./lib/images.js";

interface FeatureBrief {
  workingTitle: string;
  angle: string;
  targetAge: string;
  painScenario: string;
  keyTakeaways: string[];
  outline: string[];
  seoKeywords: string[];
}

interface FeatureArticle {
  title: string;
  description: string;
  tags: string[];
  seoKeywords: string[];
  bodyMarkdown: string;
}

interface FeatureConfig {
  id: string;
  titleKey: string;
  descriptionKey: string;
  searchIntent: string;
  painPoints: string[];
  moonliBenefits: string[];
}

interface RotationFile {
  features: FeatureConfig[];
  lastRotatedIndex: number;
}

function loadGermanTranslation(key: string): string {
  const translationsPath = join(process.cwd(), "src/i18n/translations.ts");
  const source = readFileSync(translationsPath, "utf-8");
  const escaped = key.replace(/\./g, "\\.");
  const match = source.match(new RegExp(`"${escaped}":\\s*"([^"]+)"`));
  return match?.[1] ?? key;
}

async function main() {
  const rotationPath = join(process.cwd(), "content/data/feature-rotation.json");
  const rotation = JSON.parse(readFileSync(rotationPath, "utf-8")) as RotationFile;
  const features = rotation.features;
  const index = (rotation.lastRotatedIndex + 1) % features.length;
  const feature = features[index];

  const featureTitle = loadGermanTranslation(feature.titleKey);
  const featureDesc = loadGermanTranslation(feature.descriptionKey);

  const brief = await callAIJson<FeatureBrief>(
    EDITORIAL_SYSTEM,
    `Erstelle einen Research-Brief für einen Feature-Ratgeber-Artikel als JSON.

Feature: ${feature.id}
App-Titel: ${featureTitle}
Kurzbeschreibung: ${featureDesc}
Suchintention: ${feature.searchIntent}
Schmerzpunkte: ${feature.painPoints.join("; ")}
Moonli-Vorteile (nur für Abschluss): ${feature.moonliBenefits.join("; ")}

Regeln:
- Problem-first: Elternproblem steht im Vordergrund, nicht die App
- Konkretes Szenario (z. B. Abend, Übermüdung, 3-Uhr-nachts)
- Altersangabe nennen
- Keine erfundenen Studien

JSON-Schema:
{
  "workingTitle": "string",
  "angle": "string",
  "targetAge": "string",
  "painScenario": "string",
  "keyTakeaways": ["string"],
  "outline": ["string"],
  "seoKeywords": ["string"]
}`,
    { model: "brief" },
  );

  const article = await callAIJson<FeatureArticle>(
    EDITORIAL_SYSTEM,
    `Schreibe auf Basis dieses Briefs einen vollständigen Feature-Ratgeber als JSON.

Brief:
${JSON.stringify(brief, null, 2)}

Feature-Kontext:
- ID: ${feature.id}
- App-Name: Moonli
- Vorteile (max. 1 Absatz am Ende): ${feature.moonliBenefits.join("; ")}

${FEATURE_ARTICLE_SPEC}

JSON-Schema:
{
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "seoKeywords": ["string"],
  "bodyMarkdown": "string"
}`,
    { model: "writing", temperature: 0.5 },
  );

  const slugBase = slugify(brief.workingTitle || article.title || feature.id).slice(0, 40) || feature.id;
  const slug = todaySlug(slugBase);

  const cover = await generateBlogCover({
    slug,
    title: article.title,
    category: "features",
    angle: brief.angle || brief.painScenario,
  });

  const content = buildFrontmatter(
    {
      title: article.title,
      description: article.description,
      pubDate: new Date().toISOString().slice(0, 10),
      category: "features",
      moonliFeature: feature.id,
      tags: article.tags?.length ? article.tags : [feature.id, "moonli"],
      author: "Moonli Redaktion",
      image: cover.publicPath,
      imageAlt: cover.altText,
      ctaText: "Moonli kostenlos testen",
      draft: true,
      seo: {
        keywords: article.seoKeywords?.length ? article.seoKeywords : brief.seoKeywords,
      },
    },
    article.bodyMarkdown,
  );

  writeFileSync(join(process.cwd(), "src/content/features", `${slug}.md`), content, "utf-8");
  rotation.lastRotatedIndex = index;
  writeFileSync(rotationPath, JSON.stringify(rotation, null, 2), "utf-8");
  console.log(`Created feature draft: ${slug}`);
  console.log(`Titel: ${article.title}`);
  console.log(`Cover: ${cover.publicPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
