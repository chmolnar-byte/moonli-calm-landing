import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getAllPublishedPosts, getArticlePath } from "@/lib/blog";

export const GET: APIRoute = async (context) => {
  const posts = await getAllPublishedPosts();
  const site = context.site?.toString().replace(/\/$/, "") ?? "https://moonli.net";

  return rss({
    title: "Moonli Blog",
    description: "Baby-News, Moonli-Features, Angebote und Partner-Highlights für Eltern.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${site}${getArticlePath(post)}`,
    })),
    customData: `<language>de-at</language>`,
  });
};
