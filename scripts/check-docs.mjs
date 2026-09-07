import assert from "node:assert/strict";
import {docs,cleanMarkdown,resolveDocLink} from "../lib/docs.ts";
import {searchDocs} from "../lib/search.ts";
assert.equal(new Set(docs.map(p=>p.path)).size,docs.length);
assert.ok(docs.every(p=>p.markdown.length>0));
assert.equal(resolveDocLink("../capital-structures/machine-shares","the-data-business/capture-stack"),"/docs/capital-structures/machine-shares");
assert.ok(docs.every((page) => !page.path.startsWith("internal-not-for-publication/")));
assert.equal(resolveDocLink("https://example.com/file.pdf","readme"),"https://example.com/file.pdf");
assert.equal(resolveDocLink("#the-cell","readme"),"#the-cell");
assert.ok(!cleanMarkdown(docs[0].markdown).startsWith("---"));
const entries=docs.map(p=>({...p,text:p.markdown}));
assert.equal(searchDocs(entries,"").length,docs.length);
assert.ok(searchDocs(entries,"timestamp").some(p=>p.path==="the-data-business/capture-stack"));
assert.deepEqual(searchDocs(entries,"CALIBRATION"),searchDocs(entries,"calibration"));
assert.equal(searchDocs(entries,"zzzz-no-harvest-result").length,0);
let links=0;const unresolved=[];
for(const p of docs){
 for(const m of p.markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)){
  const href=m[1];if(/^(https?:|mailto:|#)/.test(href))continue;
  const resolved=resolveDocLink(href,p.path);
  if(resolved.startsWith("/docs/")){assert.ok(docs.some(d=>"/docs/"+d.path===resolved.split("#")[0]));links++;}
  else unresolved.push({page:p.path,href});
 }
}
console.log(JSON.stringify({pages:docs.length,verifiedInternalLinks:links,unresolvedSourceLinks:unresolved},null,2));
