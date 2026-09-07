export type SearchEntry={path:string;title:string;description:string;text:string};
export function searchDocs(entries:SearchEntry[],query:string){
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 return entries.filter(p=>terms.every(term=>(p.title+" "+p.description+" "+p.text).toLowerCase().includes(term)));
}
