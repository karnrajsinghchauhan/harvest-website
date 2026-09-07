import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import PageHero from "@/components/PageHero";
import { posts } from "@/lib/posts";

export const metadata: Metadata = { title: "Field notes", description: "Notes from building robot-data infrastructure for physical AI." };

export default function BlogPage() {
  return <PageFrame><PageHero eyebrow="Field notes / 04" title="Notes from the physical layer." intro="Technical thinking on robot-data operations, measurement, quality, provenance, and the infrastructure behind embodied intelligence." /><section className="wrap band post-grid">{posts.map((post, index) => <article className={index === 0 ? "post-card featured" : "post-card"} key={post.slug}><div><span className="index">{post.category} · {post.readTime}</span><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.summary}</p></div><div className="post-meta"><time dateTime={post.date}>{new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>Read note →</Link></div></article>)}</section></PageFrame>;
}
