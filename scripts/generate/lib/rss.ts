export interface NewsSourceItem {
  title: string;
  link: string;
  source: string;
  region: string;
  summary?: string;
}

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function firstTag(block: string, tags: string[]): string | undefined {
  for (const tag of tags) {
    const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
    if (match?.[1]) return decodeXml(match[1]);
  }
  return undefined;
}

function parseFeedItems(xml: string, sourceName: string, region: string): NewsSourceItem[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];
  const items: NewsSourceItem[] = [];

  for (const block of blocks.slice(0, 5)) {
    const title = firstTag(block, ["title"]);
    const link =
      firstTag(block, ["link"]) ??
      block.match(/<link[^>]+href="([^"]+)"/i)?.[1] ??
      block.match(/<id>([^<]+)<\/id>/i)?.[1];

    if (!title || !link) continue;
    if (title.toLowerCase() === "rss" || title.toLowerCase() === "feed") continue;

    const summary =
      firstTag(block, ["description", "summary", "content"])?.slice(0, 280);

    items.push({
      title,
      link,
      source: sourceName,
      region,
      summary,
    });
  }

  if (items.length > 0) return items;

  // Fallback: einfache Titel-Extraktion (für ungewöhnliche Feed-Formate)
  const titles = xml.match(/<title>([^<]+)<\/title>/gi) ?? [];
  const links = xml.match(/<link>([^<]+)<\/link>/gi) ?? [];
  for (let i = 1; i < Math.min(titles.length, 6); i++) {
    const title = decodeXml(titles[i].replace(/<\/?title>/gi, ""));
    const link = links[i] ? decodeXml(links[i].replace(/<\/?link>/gi, "")) : "";
    if (title && link.startsWith("http")) {
      items.push({ title, link, source: sourceName, region });
    }
  }

  return items.slice(0, 5);
}

export async function fetchAllNewsItems(
  sources: Array<{ name: string; url: string; region: string }>,
): Promise<NewsSourceItem[]> {
  const all: NewsSourceItem[] = [];

  for (const source of sources) {
    try {
      const res = await fetch(source.url, {
        headers: { "User-Agent": "MoonliBlogBot/1.0 (+https://moonli.net)" },
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) {
        console.warn(`RSS ${source.name}: HTTP ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const items = parseFeedItems(xml, source.name, source.region);
      all.push(...items);
      console.log(`RSS ${source.name}: ${items.length} Einträge`);
    } catch (error) {
      console.warn(`RSS ${source.name} fehlgeschlagen:`, error);
    }
  }

  return all;
}

export function formatItemsForPrompt(items: NewsSourceItem[]): string {
  return items
    .map((item, index) => {
      const parts = [
        `${index + 1}. [${item.source} / ${item.region}] ${item.title}`,
        `   URL: ${item.link}`,
      ];
      if (item.summary) parts.push(`   Kurzinfo: ${item.summary}`);
      return parts.join("\n");
    })
    .join("\n\n");
}
