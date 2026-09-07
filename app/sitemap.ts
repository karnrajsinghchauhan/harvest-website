import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/links";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/platform", "/data", "/company", "/blog"];
  return [...pages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })), ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.7 }))];
}
