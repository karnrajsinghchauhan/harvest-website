import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {cleanMarkdown,resolveDocLink} from "@/lib/docs";
export default function DocBody({markdown,path}:{markdown:string;path:string}){
 const parts=cleanMarkdown(markdown).split(/({% hint style="[^"]+" %}[\s\S]*?{% endhint %})/g);
 function render(text:string){return <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={{
   a:({href,children})=><a href={resolveDocLink(href||"",path)}>{children}</a>,
   table:({children})=><div className="doc-table" tabIndex={0} role="region" aria-label="Scrollable table"><table>{children}</table></div>,
   img:({src,alt})=><figure><img src={resolveDocLink(typeof src==="string"?src:"",path)} alt={alt||""} loading="lazy"/>{alt?<figcaption>{alt}</figcaption>:null}</figure>
 }}>{text}</Markdown>;}
 return <div className="doc-body">{parts.map((part,i)=>part.startsWith("{% hint")?<aside className="doc-callout" key={i}><strong>Source note</strong>{render(part.replace(/{%.*?%}/g,""))}</aside>:<div key={i}>{render(part)}</div>)}</div>;
}
