import { getPosts } from "@/lib/api";
import { BLOG_URL } from "@/lib/site";

export const revalidate = 300;

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const { data } = await getPosts({});
  const items = data
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BLOG_URL}/${post.slug}</link>
      <guid>${BLOG_URL}/${post.slug}</guid>
      ${post.published_at ? `<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>` : ""}
      <description>${escapeXml(post.excerpt ?? "")}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog do Controle Dois</title>
    <link>${BLOG_URL}</link>
    <description>Gestão, fiscal e dicas para o seu negócio.</description>
    <language>pt-BR</language>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
