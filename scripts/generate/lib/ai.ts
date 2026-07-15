/**
 * Shared utilities for AI content generation scripts.
 * Requires OPENAI_API_KEY in environment.
 *
 * Modelle (überschreibbar via .env):
 * - OPENAI_MODEL_BRIEF: Recherche/Briefs (default gpt-4o-mini)
 * - OPENAI_MODEL_WRITING: finale Artikel (default gpt-4o – Goldstandard-Qualität)
 * - OPENAI_MODEL_IMAGE: Cover-Bilder (default dall-e-3)
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvFile(): void {
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

export const MODEL_BRIEF = process.env.OPENAI_MODEL_BRIEF ?? "gpt-4o-mini";
export const MODEL_WRITING = process.env.OPENAI_MODEL_WRITING ?? "gpt-4o";

function resolveModel(tier?: "brief" | "writing"): string {
  return tier === "writing" ? MODEL_WRITING : MODEL_BRIEF;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function todaySlug(prefix: string): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  return `${date}-${prefix}`;
}

function yamlQuote(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function toYaml(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (typeof value === "string") return yamlQuote(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((entry) => {
        if (typeof entry === "object" && entry !== null && !Array.isArray(entry)) {
          const lines = Object.entries(entry as Record<string, unknown>).map(
            ([key, val]) => `${pad}  ${key}: ${toYaml(val, 0)}`,
          );
          return `${pad}-\n${lines.join("\n")}`;
        }
        return `${pad}- ${toYaml(entry, 0)}`;
      })
      .join("\n");
  }

  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => `${pad}${key}: ${toYaml(val, indent + 1).replace(/^\s+/, "")}`)
      .join("\n");
  }

  return yamlQuote(String(value));
}

export function buildFrontmatter(
  data: Record<string, unknown>,
  body: string,
): string {
  const yaml = Object.entries(data)
    .map(([key, value]) => {
      const rendered = toYaml(value, 0);
      if (rendered.includes("\n")) return `${key}:\n${rendered}`;
      return `${key}: ${rendered}`;
    })
    .join("\n");
  return `---\n${yaml}\n---\n\n${body}`;
}

async function callOpenAI(
  system: string,
  user: string,
  options?: { json?: boolean; temperature?: number; model?: string },
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("No OPENAI_API_KEY set – returning placeholder content.");
    return options?.json
      ? "{}"
      : `> Automatisch generierter Platzhalter. Bitte API-Key setzen und erneut ausführen.\n\n${user.slice(0, 200)}...`;
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options?.model ?? MODEL_BRIEF,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: options?.temperature ?? 0.5,
      ...(options?.json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

export async function callAI(prompt: string, system?: string): Promise<string> {
  return callOpenAI(
    system ??
      "Du bist Redakteur für den Moonli Baby-Blog. Schreibe auf Deutsch (Österreich), SEO-optimiert, professionell, mit H2/H3-Struktur und FAQ am Ende. Ziel: 700-900 Wörter.",
    prompt,
    { temperature: 0.6, model: MODEL_WRITING },
  );
}

export async function callAIJson<T>(
  system: string,
  user: string,
  options?: { model?: "brief" | "writing"; temperature?: number },
): Promise<T> {
  const raw = await callOpenAI(system, user, {
    json: true,
    temperature: options?.temperature ?? 0.4,
    model: resolveModel(options?.model),
  });
  if (!raw || raw === "{}") {
    throw new Error("KI-Antwort leer – OPENAI_API_KEY prüfen oder API-Limit erreicht.");
  }
  return JSON.parse(raw) as T;
}
