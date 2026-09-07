import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";
import PageHero from "@/components/PageHero";
import DataFigure from "@/components/DataFigure";
import { doc } from "@/lib/links";

export const metadata: Metadata = { title: "Data", description: "Embodiment-matched multimodal robot datasets with quality and provenance attached." };

const modalities = [["RGB + depth", "Scene context, geometry, occlusion, and object state."], ["Robot state", "Joint position, velocity, controller state, and actions."], ["Contact", "Gripper or end-effector force aligned to motion."], ["Outcome", "Task stage, intervention, success, and QA result."]];

export default function DataPage() {
  return <PageFrame>
    <PageHero eyebrow="Data / 02" title="The episode is the atomic unit." intro="Each delivery is a versioned collection of synchronized episodes—not a folder of unexplained recordings. Modalities, task definitions, QA decisions, and capture context travel together." />
    <section className="wrap band"><div className="metric-strip"><div><strong>50 Hz</strong><span>control stream</span></div><div><strong>5</strong><span>camera streams</span></div><div><strong>200 Hz</strong><span>force channel</span></div><div><strong>v2</strong><span>LeRobot delivery</span></div></div><p className="footnote">Representative delivery profile; final configuration is matched to the embodiment and training objective.</p></section>
    <section className="wrap band split-feature"><div><p className="eyebrow">Multimodal by design</p><h2 className="h2">Signals share a clock and a story.</h2><div className="modality-list">{modalities.map(([name, body]) => <div key={name}><h3>{name}</h3><p>{body}</p></div>)}</div></div><DataFigure kind="trajectories" alt="Synchronized robot joint trajectories through a manipulation episode" /></section>
    <section className="wrap band split-feature reverse"><DataFigure kind="episodes" alt="Episode quality scores plotted against an acceptance gate" /><div><p className="eyebrow">Delivery contract</p><h2 className="h2">Ready to inspect before it is ready to train.</h2><p className="body">Schema, units, timestamps, dataset cards, checksums, licence terms, and known limitations are explicit. Buyers can validate a representative sample and define acceptance criteria before a larger program begins.</p><a className="act" href={doc("deliveryFormat")} target="_blank" rel="noopener noreferrer">Open format specification</a></div></section>
  </PageFrame>;
}
