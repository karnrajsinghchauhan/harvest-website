import Header from "@/components/Header";
import { Hero, Capacity, Routes, Provenance } from "@/components/Sections";
import { Contact, Footer } from "@/components/Footer";
import Link from "next/link";
import { posts } from "@/lib/posts";
import ProcessExplorer from "@/components/ProcessExplorer";
import EpisodeExplorer from "@/components/EpisodeExplorer";
import MediaShowcase from "@/components/MediaShowcase";
import {media} from "@/lib/media";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProcessExplorer />
        <EpisodeExplorer />
        <MediaShowcase items={media}/>
        <Capacity />
        <Routes />
        <Provenance />
        <section className="wrap band home-notes">
          <div><p className="eyebrow">Field notes</p><h2 className="h2">Thinking from the physical layer.</h2><p className="body">Short, practical notes on collection operations, quality, and provenance.</p><Link className="route-link" href="/blog">View all field notes</Link></div>
          <div>{posts.slice(0, 2).map((post) => <article key={post.slug}><span className="index">{post.category} · {post.readTime}</span><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.summary}</p></article>)}</div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
