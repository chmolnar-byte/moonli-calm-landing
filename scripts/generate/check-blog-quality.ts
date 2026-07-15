/**
 * Qualitätsprüfung für veröffentlichte Blog-Artikel (draft: false).
 * Wird vor dem Build ausgeführt – schlägt fehl bei zu dünnem oder unvollständigem Content.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseMarkdownFile } from "./lib/frontmatter.js";

type BlogCategory = "news" | "features" | "partners";

const MIN_WORDS: Record<BlogCategory, number> = {
  news: 700,
  features: 600,
  partners: 500,
};

const MIN_H2: Record<BlogCategory, number> = {
  news: 4,
  features: 3,
  partners: 3,
};

const CONTENT_DIR = join(process.cwd(), "src/content");

function countWords(text: string): number {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_\[\]()!|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function countH2(text: string): number {
  return (text.match(/^## /gm) ?? []).length;
}

function hasFaq(text: string): boolean {
  return /^## Häufige Fragen/m.test(text) && /^### /m.test(text);
}

function hasTldr(text: string): boolean {
  return /^> \*\*In 30 Sekunden:/m.test(text);
}

interface Issue {
  file: string;
  level: "error" | "warn";
  message: string;
}

function checkArticle(category: BlogCategory, filePath: string): Issue[] {
  const issues: Issue[] = [];
  const rel = filePath.replace(process.cwd(), "").replace(/\\/g, "/");
  const raw = readFileSync(filePath, "utf-8");
  const { data, body } = parseMarkdownFile(raw);

  if (data.draft === true) return issues;

  const words = countWords(body);
  const minWords = MIN_WORDS[category];
  if (words < minWords) {
    issues.push({
      file: rel,
      level: "error",
      message: `Zu kurz: ${words} Wörter (Minimum ${minWords}).`,
    });
  }

  const h2 = countH2(body);
  const minH2 = MIN_H2[category];
  if (h2 < minH2) {
    issues.push({
      file: rel,
      level: "error",
      message: `Zu wenige Abschnitte: ${h2}× H2 (Minimum ${minH2}).`,
    });
  }

  if (!hasFaq(body)) {
    issues.push({
      file: rel,
      level: "error",
      message: "FAQ fehlt (Abschnitt „Häufige Fragen“ mit ###-Fragen).",
    });
  }

  if (category === "news" && !hasTldr(body)) {
    issues.push({
      file: rel,
      level: "warn",
      message: "TL;DR fehlt (empfohlen: > **In 30 Sekunden:** …).",
    });
  }

  const image = data.image as string | undefined;
  if (image) {
    const publicPath = join(process.cwd(), "public", image.replace(/^\//, ""));
    if (!existsSync(publicPath)) {
      issues.push({
        file: rel,
        level: "error",
        message: `Hero-Bild nicht gefunden: ${image}`,
      });
    }
  }

  if (category === "news") {
    const sources = data.sources as Array<{ name: string; url: string }> | undefined;
    if (!sources?.length) {
      issues.push({
        file: rel,
        level: "error",
        message: "News-Artikel brauchen mindestens eine Quelle (sources).",
      });
    }
  }

  const description = String(data.description ?? "");
  if (description.length < 120 || description.length > 170) {
    issues.push({
      file: rel,
      level: "warn",
      message: `Description-Länge ${description.length} Zeichen (empfohlen 120–170).`,
    });
  }

  const placeholderPatterns = [/Automatisch generierter Platzhalter/i, /Bitte API-Key setzen/i];
  if (placeholderPatterns.some((p) => p.test(body))) {
    issues.push({
      file: rel,
      level: "error",
      message: "Platzhalter-Text im Body – Artikel ist nicht fertig.",
    });
  }

  return issues;
}

function main(): void {
  const categories: BlogCategory[] = ["news", "features", "partners"];
  const allIssues: Issue[] = [];

  for (const category of categories) {
    const dir = join(CONTENT_DIR, category);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      allIssues.push(...checkArticle(category, join(dir, file)));
    }
  }

  const errors = allIssues.filter((i) => i.level === "error");
  const warnings = allIssues.filter((i) => i.level === "warn");

  for (const issue of warnings) {
    console.warn(`⚠ ${issue.file}: ${issue.message}`);
  }

  for (const issue of errors) {
    console.error(`✗ ${issue.file}: ${issue.message}`);
  }

  if (errors.length > 0) {
    console.error(`\nBlog-Qualitätsprüfung fehlgeschlagen: ${errors.length} Fehler.`);
    process.exit(1);
  }

  console.log(
    `Blog-Qualitätsprüfung OK (${warnings.length} Warnung${warnings.length === 1 ? "" : "en"}).`,
  );
}

main();
