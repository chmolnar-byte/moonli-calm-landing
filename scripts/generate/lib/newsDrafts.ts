import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { parseMarkdownFile } from "./frontmatter.js";

export interface NewsDraftInfo {
  slug: string;
  path: string;
  title: string;
  description: string;
  draft: boolean;
  pubDate: string;
  body: string;
}

const NEWS_DIR = join(process.cwd(), "src/content/news");

export function listNewsDrafts(): NewsDraftInfo[] {
  let files: string[];
  try {
    files = readdirSync(NEWS_DIR).filter((file) => file.endsWith(".md"));
  } catch {
    return [];
  }

  return files
    .map((file) => {
      const path = join(NEWS_DIR, file);
      const raw = readFileSync(path, "utf-8");
      const { data, body } = parseMarkdownFile(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        path,
        title: String(data.title ?? "Ohne Titel"),
        description: String(data.description ?? ""),
        draft: data.draft !== false,
        pubDate: String(data.pubDate ?? ""),
        body,
      };
    })
    .sort((a, b) => {
      const aTime = statSync(a.path).mtimeMs;
      const bTime = statSync(b.path).mtimeMs;
      return bTime - aTime;
    });
}

export function findNewsDraft(slug?: string): NewsDraftInfo {
  const drafts = listNewsDrafts();
  if (drafts.length === 0) {
    throw new Error("Kein News-Entwurf in src/content/news gefunden.");
  }

  if (slug) {
    const match = drafts.find((draft) => draft.slug === slug);
    if (!match) {
      throw new Error(`News-Entwurf "${slug}" nicht gefunden.`);
    }
    return match;
  }

  return drafts[0];
}

export function githubFileUrl(slug: string, branch = "content-drafts"): string {
  const repo = process.env.GITHUB_REPOSITORY ?? "chmolnar-byte/moonli-calm-landing";
  return `https://github.com/${repo}/blob/${branch}/src/content/news/${slug}.md`;
}

export function githubActionsUrl(workflowFile: string): string {
  const repo = process.env.GITHUB_REPOSITORY ?? "chmolnar-byte/moonli-calm-landing";
  return `https://github.com/${repo}/actions/workflows/${workflowFile}`;
}
