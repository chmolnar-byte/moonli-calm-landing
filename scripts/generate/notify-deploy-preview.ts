/**
 * Sonntags-Vorschau: welche News-Artikel heute Abend live gehen.
 */
import { execSync } from "node:child_process";
import { githubActionsUrl, listNewsDrafts } from "./lib/newsDrafts.js";

function main() {
  const drafts = listNewsDrafts();
  const approved = drafts.filter((draft) => !draft.draft);
  const pending = drafts.filter((draft) => draft.draft);

  const date = new Date().toLocaleDateString("de-AT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const approvedList =
    approved.length > 0
      ? approved.map((draft) => `- **${draft.title}** (\`${draft.slug}\`)`).join("\n")
      : "_Keine freigegebenen Artikel._";

  const pendingList =
    pending.length > 0
      ? pending.map((draft) => `- ${draft.title} (\`${draft.slug}\`)`).join("\n")
      : "_Keine offenen Entwürfe._";

  const deployNote =
    approved.length > 0
      ? "Heute Abend (21:00 CET) werden die freigegebenen Artikel auf **moonli.net** veröffentlicht."
      : "**Kein Deploy heute Abend** – bitte vor 21:00 einen Artikel freigeben, falls du publizieren willst.";

  const body = `## Deploy-Vorschau (${date})

${deployNote}

### Wird veröffentlicht (\`draft: false\`)

${approvedList}

### Bleibt Entwurf (\`draft: true\`)

${pendingList}

---

### Aktionen

- [News freigeben](${githubActionsUrl("blog-approve-news.yml")})
- [News überarbeiten](${githubActionsUrl("blog-revise-news.yml")})
- [Deploy manuell starten](${githubActionsUrl("blog-publish.yml")}) (normalerweise automatisch So 21:00)
`;

  const title =
    approved.length > 0
      ? `🚀 Deploy heute: ${approved.length} News-Artikel`
      : "⏸️ Deploy heute: nichts freigegeben";

  if (process.env.CI && process.env.GITHUB_TOKEN) {
    execSync(
      `gh issue create --title ${JSON.stringify(title)} --body ${JSON.stringify(body)} --label blog-deploy`,
      {
        stdio: "inherit",
        env: { ...process.env, GH_TOKEN: process.env.GITHUB_TOKEN },
      },
    );
    console.log("Deploy-Vorschau-Issue erstellt.");
    return;
  }

  console.log(`Title: ${title}`);
  console.log(body);
}

main();
