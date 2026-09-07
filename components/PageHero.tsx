export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="wrap page-hero"><p className="eyebrow">{eyebrow}</p><h1 className="display">{title}</h1><p className="lede">{intro}</p></section>;
}
