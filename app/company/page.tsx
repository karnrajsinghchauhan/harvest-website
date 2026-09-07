import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";
import PageHero from "@/components/PageHero";
import { DOCS } from "@/lib/links";

export const metadata: Metadata = { title: "Company", description: "Harvest is building accountable robot-data infrastructure for physical AI." };

export default function CompanyPage() {
  return <PageFrame>
    <PageHero eyebrow="Company / 03" title="Building the supply layer for physical AI." intro="Harvest is a US-registered company developing robot-data operations in the United States. We believe the next generation of embodied models will depend on disciplined collection, accountable labor, and evidence-rich datasets." />
    <section className="wrap band"><div className="principles"><article><span className="index">01</span><h2>Measure what matters</h2><p>Accepted episodes, calibration health, task coverage, and buyer utility—not vanity recording hours.</p></article><article><span className="index">02</span><h2>Keep people accountable</h2><p>Automation assists scheduling and review. Safety, consent, and compliance decisions remain human-owned.</p></article><article><span className="index">03</span><h2>Publish the interfaces</h2><p>Formats, quality gates, legal terms, and system boundaries should be inspectable before a partnership starts.</p></article></div></section>
    <section className="wrap band statement"><p className="eyebrow">Working in public</p><h2>Documentation is part of the product.</h2><p>Our public knowledge base covers the capture stack, delivery format, capacity model, security posture, legal structure, and roadmap. Some elements are designs and targets rather than deployed capabilities; we label them accordingly.</p><div className="act-row"><a className="act" href={DOCS} target="_blank" rel="noopener noreferrer">Read the documentation</a><a className="act act-quiet" href="/#contact">Start a conversation</a></div></section>
  </PageFrame>;
}
