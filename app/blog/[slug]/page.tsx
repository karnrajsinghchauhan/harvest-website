import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const post = getPost((await params).slug); return post ? { title: post.title, description: post.summary, openGraph: { type: "article", publishedTime: post.date } } : {}; }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug); if (!post) notFound();
  return <PageFrame><article className="article wrap"><Link className="article-back" href="/blog">← All field notes</Link><header><p className="eyebrow">{post.category} · {post.readTime}</p><h1 className="display">{post.title}</h1><p className="lede">{post.summary}</p><time dateTime={post.date}>{new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></header><div className="article-body">{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><footer className="article-end"><span className="index">HARVEST / FIELD NOTE</span><Link href="/#contact">Discuss a data program →</Link></footer></article></PageFrame>;
}
