import type {Metadata} from "next";
import PageFrame from "@/components/PageFrame";
import DocsSearch from "@/components/DocsSearch";
import {docs,cleanMarkdown,docsSyncedAt} from "@/lib/docs";
export const metadata:Metadata={title:"Documentation",description:"Search Harvest's collection, quality, delivery, and operating documentation."};
export default function DocsPage(){return <PageFrame><section className="wrap docs-home"><p className="eyebrow">Harvest / Knowledge base</p><h1 className="display">The system, documented.</h1><p className="lede">Capture specifications, quality gates, delivery contracts, and operating designs. Read the source behind the pipeline.</p><p className="docs-version">GitBook source snapshot · {docsSyncedAt.slice(0,10)}</p><DocsSearch entries={docs.map(p=>({path:p.path,title:p.title,description:p.description,text:cleanMarkdown(p.markdown).replace(/[#*_`|]/g,"")}))}/></section></PageFrame>;}
