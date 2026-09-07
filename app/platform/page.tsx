import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";
import PageHero from "@/components/PageHero";
import DataFigure from "@/components/DataFigure";
import { doc } from "@/lib/links";

export const metadata: Metadata = { title: "Platform", description: "The Harvest capture, quality, and delivery system for physical AI data." };

const layers = [
  ["01", "Capture", "Time-synchronized vision, depth, proprioception, actions, and contact signals from real hardware."],
  ["02", "Trace", "Cell, calibration, embodiment, operator, task, and consent context attached at source."],
  ["03", "Gate", "Integrity, kinematic, and task-level review before an episode enters a delivery."],
  ["04", "Deliver", "Versioned datasets packaged for training, with manifests that remain inspectable."],
];

export default function PlatformPage() {
  return <PageFrame>
    <PageHero eyebrow="Platform / 01" title="A production system for real-world intelligence." intro="Harvest connects physical collection cells to a traceable data pipeline. The architecture is deliberately legible: every transformation leaves evidence behind." />
    <section className="wrap band"><div className="architecture-grid">
      {layers.map(([n, name, body]) => <article className="architecture-step" key={n}><span className="index">{n}</span><h2>{name}</h2><p>{body}</p></article>)}
    </div></section>
    <section className="wrap band split-feature"><div><p className="eyebrow">Collection cell</p><h2 className="h2">Designed as a measurement instrument.</h2><p className="body">A cell brings the robot, task fixture, sensor geometry, operator station, and capture node into one reproducible system. Calibration happens at the start of a shift and stays linked to the episodes it governs.</p><a className="route-link" href={doc("captureStack")} target="_blank" rel="noopener noreferrer">Explore the capture stack</a></div><DataFigure kind="cellplan" alt="Plan drawing of a Harvest robot-data collection cell" /></section>
    <section className="wrap band split-feature reverse"><DataFigure kind="calibration" alt="Calibration residual visualization from a collection cell" /><div><p className="eyebrow">Quality system</p><h2 className="h2">Failures are routed, not hidden.</h2><p className="body">Automated checks detect structural faults and sensor drift. Task-aware review checks whether the episode actually achieved its intent. Rejected episodes stay useful for operations, but never silently enter a buyer delivery.</p><a className="route-link" href={doc("pipeline")} target="_blank" rel="noopener noreferrer">Read the pipeline specification</a></div></section>
  </PageFrame>;
}
