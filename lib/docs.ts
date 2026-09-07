import snapshot from "./docs.generated.json" with {type:"json"};
export const docs = snapshot.pages.filter(
  (page) => !page.path.startsWith("internal-not-for-publication/"),
);
export const docsSource = snapshot.source;
export const docsRevision = snapshot.revision;
export const docsSyncedAt = snapshot.syncedAt;
export function findDoc(path: string) { return docs.find(page => page.path === path); }
export function cleanMarkdown(markdown: string) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").replace(/^# .+\r?\n/, "");
}
export function resolveDocLink(href: string, current: string): string {
  if (!href || href.startsWith("#") || /^(mailto:|tel:)/.test(href)) return href;
  if (/^https?:/.test(href) && !href.startsWith(docsSource)) return href;
  const [pathname,hash] = href.split("#");
  const raw = pathname.replace(docsSource, "").replace(/^\//,"");
  const normalized = new URL(raw, "https://docs.local/" + current).pathname.slice(1);
  const clean = (s:string) => s.replace(/\.md$/,"").replace(/\/?README$/i,"").replace(/\/$/,"");
  const basename=clean(raw).split("/").at(-1);
  const sameName=docs.filter(p=>p.path.split("/").at(-1)===basename);
  const target = docs.find(p => [p.path,clean(p.gitPath)].some(candidate => candidate === clean(normalized) || candidate === clean(raw)))
    || docs.find(p => [p.path,clean(p.gitPath)].includes(clean(raw.replace(/^(\.\.\/)+/,""))))
    || (sameName.length===1?sameName[0]:undefined);
  return target ? "/docs/" + target.path + (hash ? "#"+hash : "") : new URL(href, docsSource+"/"+current+"/").href;
}
