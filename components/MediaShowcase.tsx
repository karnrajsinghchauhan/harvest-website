import Image from "next/image";
export type HarvestMedia =
 | {kind:"image";src:string;alt:string;caption:string;width:number;height:number}
 | {kind:"video";src:string;poster:string;title:string;caption:string;captions:string;transcript:string};
export default function MediaShowcase({items}:{items:HarvestMedia[]}){
 if(!items.length)return null;
 return <section className="wrap band"><p className="eyebrow">In the field</p><h2 className="h2">Collection, in view.</h2><div className="media-gallery">{items.map(item=><figure key={item.src}>{item.kind==="image"?<Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 860px) 100vw, 60vw"/>:<><video controls playsInline preload="none" poster={item.poster} aria-label={item.title}><source src={item.src}/><track kind="captions" src={item.captions} srcLang="en" label="English" default/>Your browser does not support embedded video. <a href={item.src}>Download video</a>.</video><details><summary>Read transcript</summary><p>{item.transcript}</p></details></>}<figcaption>{item.caption}</figcaption></figure>)}</div></section>;
}
