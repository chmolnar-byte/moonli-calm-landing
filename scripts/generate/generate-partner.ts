import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildFrontmatter, callAI } from "./lib/ai.js";
import { parse } from "yaml";

async function main() {
  const partnersYaml = readFileSync(join(process.cwd(), "content/data/partners.yaml"), "utf-8");
  const data = parse(partnersYaml) as {
    partners: Array<{
      slug: string;
      name: string;
      url: string;
      description: string;
      featuredMonth: string;
      previewToken: string;
    }>;
  };

  const partner = data.partners[0];
  if (!partner) {
    console.log("No partner configured in partners.yaml");
    return;
  }

  const prompt = `Schreibe einen Partner-Spotlight-Artikel für "${partner.name}".
Beschreibung: ${partner.description}
Ton: professionell, warm, für Eltern. Partner des Monats ${partner.featuredMonth}.`;

  const body = await callAI(prompt);
  const slug = `${partner.featuredMonth}-partner-spotlight`;
  const content = buildFrontmatter(
    {
      title: `Partner des Monats: ${partner.name}`,
      description: partner.description,
      pubDate: new Date().toISOString().slice(0, 10),
      category: "partner",
      partnerName: partner.name,
      partnerUrl: partner.url,
      partnerLogo: "/og-image.png",
      featuredMonth: partner.featuredMonth,
      previewToken: partner.previewToken,
      tags: ["partner"],
      author: "Moonli Redaktion",
      draft: true,
    },
    body,
  );

  writeFileSync(join(process.cwd(), "src/content/partners", `${slug}.md`), content, "utf-8");
  console.log(`Created partner draft: ${slug}`);
  console.log(`Preview URL: /blog/preview/${partner.previewToken}`);
}

main().catch(console.error);
