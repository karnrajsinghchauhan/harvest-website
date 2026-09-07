import { posts } from "@/lib/posts";
import { SITE_URL } from "@/lib/links";

export function GET() {
  const items = posts.map((post) => `<item><title><![CDATA[${post.title}]]></title><link>${SITE_URL}/blog/${post.slug}</link><guid>${SITE_URL}/blog/${post.slug}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description><![CDATA[${post.summary}]]></description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Harvest Field Notes</title><link>${SITE_URL}/blog</link><description>Notes from the physical layer.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
