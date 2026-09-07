// Generated content has one editorial source: the published GitBook space.
// Run with a normally configured GITBOOK_API_TOKEN; never commit that token.
import {writeFile,rename} from "node:fs/promises";
const space="66grjCLOCVTbt6g1RHva";
const token=process.env.GITBOOK_API_TOKEN;
if(!token)throw new Error("Configure GITBOOK_API_TOKEN to refresh the published source snapshot.");
async function api(path){const response=await fetch("https://api.gitbook.com/v1/spaces/"+space+path,{headers:{Authorization:"Bearer "+token}});if(!response.ok)throw new Error("GitBook refresh failed: "+response.status);return response.json();}
const spaceInfo=await api("");
if(spaceInfo.visibility!=="public")throw new Error("Source is no longer public; refusing to import.");
const before=spaceInfo.revision;
const tree=await api("/content/pages");
const flatten=items=>items.flatMap(p=>p.type==="document"?[p,...flatten(p.pages||[])]:flatten(p.pages||[]));
const pages=[];
for(const page of flatten(tree.pages).filter(page=>!page.path.startsWith("internal-not-for-publication/"))){
 const result=await api("/content/path/"+page.path.split("/").map(encodeURIComponent).join("/")+"?format=markdown&format.markdown.refs=relative&dereferenced=true");
 if(typeof result.markdown!=="string")throw new Error("Missing content: "+page.path);
 pages.push({id:page.id,path:page.path,title:page.title,description:page.description||"",updatedAt:page.updatedAt,gitPath:page.git?.path||"",markdown:result.markdown});
}
if((await api("")).revision!==before)throw new Error("Source changed during refresh. Retry for a consistent snapshot.");
const data={source:"https://harvest-3.gitbook.io/harvest-docs",spaceId:space,revision:before,syncedAt:new Date().toISOString(),pages};
await writeFile(new URL("../lib/docs.generated.json.tmp",import.meta.url),JSON.stringify(data,null,2));
await rename(new URL("../lib/docs.generated.json.tmp",import.meta.url),new URL("../lib/docs.generated.json",import.meta.url));
console.log("Refreshed "+pages.length+" published pages.");
