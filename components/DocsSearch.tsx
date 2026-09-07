"use client";
import {useState} from "react";
import Link from "next/link";
import {searchDocs,type SearchEntry as Entry} from "@/lib/search";
export default function DocsSearch({entries}:{entries:Entry[]}){
 const [query,setQuery]=useState("");
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const results=searchDocs(entries,query);
 return <div className="docs-search"><label htmlFor="docs-query">Search documentation</label><div className="search-field"><input id="docs-query" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try calibration, LeRobot, licensing…" autoComplete="off"/>{query?<button onClick={()=>setQuery("")}>Clear</button>:null}</div><p role="status">{results.length} {results.length===1?"page":"pages"}{terms.length?" found":""}</p><div className="docs-results">{results.length?results.map(p=><Link key={p.path} href={"/docs/"+p.path}><span className="index">{p.path.split("/")[0].replaceAll("-"," ")}</span><h2>{p.title}</h2><p>{p.description||p.text.slice(0,160)}</p><span className="result-arrow" aria-hidden="true">↗</span></Link>):<div className="empty-result"><h2>No matching pages</h2><p>Try a shorter term, such as “capture” or “QA”.</p></div>}</div></div>;
}
