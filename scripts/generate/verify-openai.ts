/**
 * Prüft OPENAI_API_KEY vor teuren Generierungs-Läufen (klare Fehlermeldung in CI).
 */

async function main(): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY fehlt. Bitte unter GitHub → Settings → Secrets → Actions setzen.",
    );
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL_BRIEF ?? "gpt-4o-mini",
      messages: [{ role: "user", content: "Antworte nur mit OK." }],
      max_tokens: 5,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI API nicht erreichbar (${res.status}): ${body}`);
  }

  console.log("OpenAI API-Key gültig.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
