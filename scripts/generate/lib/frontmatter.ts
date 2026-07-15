import { parse, stringify } from "yaml";

export interface ParsedMarkdown {
  data: Record<string, unknown>;
  body: string;
}

export function parseMarkdownFile(raw: string): ParsedMarkdown {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Ungültiges Markdown: Frontmatter fehlt.");
  }
  return {
    data: parse(match[1]) as Record<string, unknown>,
    body: match[2].trim(),
  };
}

export function stringifyMarkdownFile(data: Record<string, unknown>, body: string): string {
  const yaml = stringify(data, { lineWidth: 0 }).trim();
  return `---\n${yaml}\n---\n\n${body.trim()}\n`;
}
