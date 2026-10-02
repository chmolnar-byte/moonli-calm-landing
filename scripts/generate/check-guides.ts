/**
 * Qualitätsprüfung für Ratgeber: Überschriften, Title, Description, fünf Sprachen.
 * Läuft vor dem Build. Entwürfe zählen mit, damit eine Sprache nicht fehlt.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseMarkdownFile } from "./lib/frontmatter.ts";
import {
  FEATURES_SLUG,
  GUIDE_LANGS,
  GUIDE_SECTION,
  PUBLISHED_TOPICS,
  TOPIC_IDS,
  TOPIC_SLUGS,
  isGuideLang,
  isTopicId,
  type GuideLang,
  type TopicId,
} from "../../src/lib/guidePaths.ts";
import { FEATURE_IDS, OVERVIEW, isFeatureId } from "../../src/lib/featureCatalog.ts";

const MIN_WORDS = 550;
const MIN_H2 = 4;
const CONTENT_DIR = join(process.cwd(), "src/content/guides");

interface Issue {
  file: string;
  message: string;
}

function countWords(text: string): number {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_[\]()!|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function headingIssues(body: string): string[] {
  const issues: string[] = [];
  let last = 1;
  let h2 = 0;

  for (const line of body.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+\S/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    if (level === 1) issues.push("Der Text enthält eine H1. Die H1 setzt das Layout.");
    if (level > 3) issues.push("Überschrift tiefer als H3.");
    if (level > last + 1) issues.push(`Überschriftenebene übersprungen (H${last} → H${level}).`);
    if (level === 2) h2 += 1;
    last = level;
  }

  if (h2 < MIN_H2) issues.push(`Zu wenige H2: ${h2} (Minimum ${MIN_H2}).`);
  return issues;
}

function main(): void {
  const issues: Issue[] = [];
  const seen = new Map<TopicId, Set<GuideLang>>();

  if (!existsSync(CONTENT_DIR)) {
    console.error("✗ src/content/guides fehlt.");
    process.exit(1);
  }

  for (const langName of readdirSync(CONTENT_DIR)) {
    if (!isGuideLang(langName)) {
      issues.push({ file: langName, message: "Unbekannter Sprachordner." });
      continue;
    }
    const dir = join(CONTENT_DIR, langName);
    for (const file of readdirSync(dir).filter((name) => name.endsWith(".md"))) {
      const topicName = file.replace(/\.md$/, "");
      const rel = `src/content/guides/${langName}/${file}`;
      if (!isTopicId(topicName)) {
        issues.push({ file: rel, message: "Dateiname ist keine bekannte Themen-ID." });
        continue;
      }

      const raw = readFileSync(join(dir, file), "utf8");
      const { data, body } = parseMarkdownFile(raw);
      const bucket = seen.get(topicName) ?? new Set<GuideLang>();
      bucket.add(langName);
      seen.set(topicName, bucket);

      if (data.topic !== topicName) {
        issues.push({ file: rel, message: "Frontmatter topic stimmt nicht mit dem Dateinamen überein." });
      }
      if (data.lang !== langName) {
        issues.push({ file: rel, message: "Frontmatter lang stimmt nicht mit dem Ordner überein." });
      }

      const expectedSlug = TOPIC_SLUGS[topicName][langName];
      if (data.urlSlug !== expectedSlug) {
        issues.push({ file: rel, message: `Slug muss ${expectedSlug} sein.` });
      }

      const shouldPublish = PUBLISHED_TOPICS.has(topicName);
      if (Boolean(data.draft) === shouldPublish) {
        issues.push({
          file: rel,
          message: shouldPublish
            ? "Thema ist veröffentlicht, draft muss false sein."
            : "Thema ist noch Entwurf, draft muss true sein.",
        });
      }

      const seoTitle = String(data.seoTitle ?? "");
      const description = String(data.description ?? "");
      const title = String(data.title ?? "");
      if (!title) issues.push({ file: rel, message: "H1 (title) fehlt." });
      if (!seoTitle) issues.push({ file: rel, message: "seoTitle fehlt." });
      else if (seoTitle.length < 20 || seoTitle.length > 70) {
        issues.push({ file: rel, message: `seoTitle hat ${seoTitle.length} Zeichen (20–70).` });
      }
      if (!description) issues.push({ file: rel, message: "Description fehlt." });
      else if (description.length < 90 || description.length > 180) {
        issues.push({ file: rel, message: `Description hat ${description.length} Zeichen (90–180).` });
      }

      const words = countWords(body);
      if (words < MIN_WORDS) {
        issues.push({ file: rel, message: `Zu kurz: ${words} Wörter (Minimum ${MIN_WORDS}).` });
      }

      for (const message of headingIssues(body)) {
        issues.push({ file: rel, message });
      }

      const faq = data.faq as Array<{ q?: string; a?: string }> | undefined;
      if (!faq || faq.length < 3 || faq.some((item) => !item.q || !item.a)) {
        issues.push({ file: rel, message: "Mindestens drei FAQ mit Frage und Antwort." });
      }

      const sources = data.sources as Array<{ name?: string; url?: string }> | undefined;
      if (!sources || sources.length < 2) {
        issues.push({ file: rel, message: "Mindestens zwei Quellen." });
      }

      const primary = data.primaryFeatures as string[] | undefined;
      if (!primary?.length || primary.some((id) => !isFeatureId(id))) {
        issues.push({ file: rel, message: "primaryFeatures fehlen oder sind unbekannt." });
      }

      const related = data.related as string[] | undefined;
      if (!related || related.some((id) => !isTopicId(id))) {
        issues.push({ file: rel, message: "related enthält ein unbekanntes Thema." });
      }

      const path = `/${langName}/${GUIDE_SECTION[langName]}/${expectedSlug}`;
      if (!path.startsWith("/")) {
        issues.push({ file: rel, message: "Pfad konnte nicht gebaut werden." });
      }
    }
  }

  for (const topic of TOPIC_IDS) {
    const langs = seen.get(topic) ?? new Set<GuideLang>();
    for (const lang of GUIDE_LANGS) {
      if (!langs.has(lang)) {
        issues.push({
          file: `src/content/guides/${lang}/${topic}.md`,
          message: "Sprachversion fehlt. Jedes Thema braucht de, en, es, fr und ru.",
        });
      }
    }
  }

  for (const lang of GUIDE_LANGS) {
    const overview = OVERVIEW[lang];
    const file = `feature-overview/${lang}/${FEATURES_SLUG[lang]}`;
    if (!overview.h1 || !overview.seoTitle || !overview.description) {
      issues.push({ file, message: "Funktionsseite ohne H1, Title oder Description." });
    }
    if (overview.seoTitle.length < 20 || overview.seoTitle.length > 70) {
      issues.push({ file, message: `seoTitle hat ${overview.seoTitle.length} Zeichen (20–70).` });
    }
    if (overview.description.length < 90 || overview.description.length > 180) {
      issues.push({ file, message: `Description hat ${overview.description.length} Zeichen (90–180).` });
    }
    for (const id of FEATURE_IDS) {
      if (!overview.features[id]?.title || !overview.features[id]?.text) {
        issues.push({ file, message: `Feature-Text fehlt: ${id}` });
      }
    }
  }

  if (issues.length > 0) {
    for (const issue of issues) console.error(`✗ ${issue.file}: ${issue.message}`);
    console.error(`\nRatgeber-Qualitätsprüfung fehlgeschlagen: ${issues.length} Fehler.`);
    process.exit(1);
  }

  console.log("Ratgeber-Qualitätsprüfung OK.");
}

main();
