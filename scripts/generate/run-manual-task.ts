/**
 * Liest content/data/ci-manual-task.yaml und führt den gewählten Blog-Task aus.
 */
import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { execSync } from "node:child_process";

interface ManualTask {
  task?: string;
  feedback?: string;
  article_slug?: string;
}

function main(): void {
  const path = "content/data/ci-manual-task.yaml";
  let config: ManualTask;
  try {
    config = parseYaml(readFileSync(path, "utf-8")) as ManualTask;
  } catch {
    throw new Error(
      `${path} fehlt. Bitte von ci-manual-task.example.yaml kopieren, task setzen und auf content-drafts committen.`,
    );
  }

  const task = config.task?.trim();
  if (!task) {
    throw new Error(`${path}: "task" fehlt.`);
  }

  const env = { ...process.env };
  if (config.article_slug?.trim()) {
    env.ARTICLE_SLUG = config.article_slug.trim();
  }
  if (config.feedback?.trim()) {
    env.FEEDBACK = config.feedback.trim();
  }

  const run = (cmd: string) => execSync(cmd, { stdio: "inherit", env });

  switch (task) {
    case "generate-feature":
      run("npx tsx scripts/generate/verify-openai.ts");
      run("npx tsx scripts/generate/generate-feature.ts");
      run('bash .github/scripts/push-content-draft.sh "blog(draft): auto feature $(date -u +%Y-%m-%d)"');
      break;
    case "generate-partner":
      run("npx tsx scripts/generate/generate-partner.ts");
      run('bash .github/scripts/push-content-draft.sh "blog(draft): auto partner $(date -u +%Y-%m-%d)"');
      break;
    case "generate-news":
      run("npx tsx scripts/generate/verify-openai.ts");
      run("npx tsx scripts/generate/generate-news.ts");
      run('bash .github/scripts/push-content-draft.sh "blog(draft): news $(date -u +%Y-%m-%d)"');
      break;
    case "approve-news":
      run("npx tsx scripts/generate/approve-news.ts");
      run('bash .github/scripts/push-content-draft.sh "blog(approve): news freigegeben"');
      break;
    case "revise-news":
      if (!env.FEEDBACK?.trim()) {
        throw new Error('task "revise-news" braucht "feedback" in ci-manual-task.yaml.');
      }
      run("npx tsx scripts/generate/revise-news.ts");
      run('bash .github/scripts/push-content-draft.sh "blog(revise): news feedback"');
      run("npx tsx scripts/generate/notify-review.ts");
      break;
    default:
      throw new Error(`Unbekannte task "${task}". Erlaubt: generate-feature, generate-partner, generate-news, approve-news, revise-news`);
  }

  console.log(`Task "${task}" abgeschlossen.`);
}

main();
