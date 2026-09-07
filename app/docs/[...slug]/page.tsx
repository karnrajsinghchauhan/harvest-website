import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import PageFrame from "@/components/PageFrame";
import DocBody from "@/components/DocBody";
import {docs,findDoc,docsSource,docsRevision,docsSyncedAt} from "@/lib/docs";
export function generateStaticParams(){return docs.map(p=>({slug:p.path.split("/")}));}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const p=findDoc((await params).slug.join("/"));return p?{title:p.title,description:p.description,alternates:{canonical:docsSource+"/"+p.path}}:{};}
export default async function DocPage({params}:{params:Promise<{slug:string[]}>}){
 const page=findDoc((await params).slug.join("/"));if(!page)notFound();
 const group=page.path.split("/")[0];const related=docs.filter(p=>p.path.split("/")[0]===group);const index=docs.indexOf(page);
 return <PageFrame><div className="wrap docs-layout"><aside className="docs-sidebar"><Link href="/docs" className="docs-back">← Search all docs</Link><details open><summary>{group.replaceAll("-"," ")}</summary><nav aria-label="Documentation section">{related.map(p=><Link key={p.path} href={"/docs/"+p.path} aria-current={p.path===page.path?"page":undefined}>{p.title}</Link>)}</nav></details></aside><article className="doc-article"><header><p className="eyebrow">Documentation / {group.replaceAll("-"," ")}</p><h1>{page.title}</h1>{page.description?<p className="lede">{page.description}</p>:null}<p className="docs-version">Source snapshot {docsSyncedAt.slice(0,10)} · Revision {docsRevision.slice(0,8)} · <a href={docsSource+"/"+page.path}>View in GitBook ↗</a></p></header><DocBody markdown={page.markdown} path={page.path}/><nav className="doc-pagination" aria-label="Adjacent documentation">{index>0?<Link href={"/docs/"+docs[index-1].path}>← {docs[index-1].title}</Link>:<span/>}{index<docs.length-1?<Link href={"/docs/"+docs[index+1].path}>{docs[index+1].title} →</Link>:null}</nav></article></div></PageFrame>;
}
