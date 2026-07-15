/**
 * Erstellt ein GitHub-Issue zur manuellen Prüfung eines News-Entwurfs.
 * Wird nach generate-news im CI ausgeführt.
 */
import { execSync } from "node:child_process";
import { findNewsDraft, githubActionsUrl, githubFileUrl } from "./lib/newsDrafts.js";

function excerpt(text: string, max = 900): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trim()}…`;
}

function main() {
  const slug = process.env.ARTICLE_SLUG;
  const draft = findNewsDraft(slug);

  const body = `## News-Entwurf zur Freigabe

**Titel:** ${draft.title}

**Kurzbeschreibung:** ${draft.description}

**Status:** \`draft: ${draft.draft}\` – erscheint erst live, wenn freigegeben.

**Datei:** [${draft.slug}.md](${githubFileUrl(draft.slug)})

---

### Textvorschau

${excerpt(draft.body)}

---

### Nächste Schritte

1. **Text prüfen** – Datei auf GitHub öffnen oder lokal bearbeiten.
2. **Mit dem Bot anpassen** – [News überarbeiten](${githubActionsUrl("blog-revise-news.yml")}) → Feedback eintragen → Run workflow.
3. **Freigeben** – [News freigeben](${githubActionsUrl("blog-approve-news.yml")}) → Run workflow (setzt \`draft: false\`).
4. **Sonntag 21:00** – Freigegebene Artikel werden automatisch auf moonli.net deployed.

> Du erhältst am Sonntagvormittag noch eine Erinnerung, was veröffentlicht wird.
`;

  if (process.env.CI && process.env.GITHUB_TOKEN) {
    const title = `📰 News-Review: ${draft.title}`;
    execSync(
      `gh issue create --title ${JSON.stringify(title)} --body ${JSON.stringify(body)} --label blog-review`,
      {
        stdio: "inherit",
        env: { ...process.env, GH_TOKEN: process.env.GITHUB_TOKEN },
      },
    );
    console.log("Review-Issue erstellt.");
    return;
  }

  console.log("--- ISSUE PREVIEW ---");
  console.log(`Title: 📰 News-Review: ${draft.title}`);
  console.log(body);
}

main();
