import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { callAIJson, slugify } from "./ai.js";
import { IMAGE_PROMPT_SYSTEM, imagePromptRequest } from "./editorial.js";

interface ImagePromptResult {
  imagePrompt: string;
  altText: string;
}

export interface GeneratedCover {
  publicPath: string;
  absolutePath: string;
  altText: string;
}

const GENERATED_DIR = join(process.cwd(), "public/images/blog/generated");

async function callDallE(prompt: string): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY fehlt – Cover-Generierung nicht möglich.");
  }

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL_IMAGE ?? "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      response_format: "b64_json",
      quality: "standard",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DALL-E API error ${res.status}: ${err}`);
  }

  const json = (await res.json()) as {
    data?: Array<{ b64_json?: string }>;
  };
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("DALL-E lieferte kein Bild.");
  }

  return Buffer.from(b64, "base64");
}

export async function generateBlogCover(input: {
  slug: string;
  title: string;
  category: "news" | "features" | "partners";
  angle: string;
}): Promise<GeneratedCover> {
  const { imagePrompt, altText } = await callAIJson<ImagePromptResult>(
    IMAGE_PROMPT_SYSTEM,
    imagePromptRequest(input),
    { model: "brief" },
  );

  console.log(`Generiere Cover-Bild für „${input.title}"…`);
  const pngBuffer = await callDallE(imagePrompt);

  mkdirSync(GENERATED_DIR, { recursive: true });
  const fileBase = slugify(input.slug).slice(0, 60) || "blog-cover";
  const filename = `${fileBase}-cover.webp`;
  const absolutePath = join(GENERATED_DIR, filename);

  await sharp(pngBuffer)
    .webp({ quality: 85 })
    .toFile(absolutePath);

  const publicPath = `/images/blog/generated/${filename}`;
  console.log(`Cover gespeichert: ${publicPath}`);

  return { publicPath, absolutePath, altText };
}
