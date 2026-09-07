export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "the-hour-is-not-the-unit",
    title: "The hour is not the unit",
    summary: "Why usable robot data is measured by accepted, traceable episodes—not raw recording time.",
    date: "2026-09-06",
    readTime: "2 min",
    category: "Data operations",
    sections: [
      { heading: "Recording is the beginning", paragraphs: ["A robot can run for an hour and still produce very little training value. Sensors drift, tasks become repetitive, operators recover from mistakes, and success criteria vary. Raw duration describes storage. It does not describe utility.", "Harvest treats the accepted episode as the economic and technical unit. An episode has a bounded task, synchronized modalities, a calibration record, a quality score, and an explicit outcome."] },
      { heading: "Acceptance changes the operation", paragraphs: ["When payment, capacity planning, and delivery are tied to accepted episodes, quality becomes part of the production system. Integrity checks catch missing frames and timing errors. Kinematic checks catch impossible motion. Review catches task-level failure that telemetry alone cannot explain.", "The result is not perfect data. It is inspectable data: buyers can see why an episode passed, where it came from, and which capture conditions shaped it."] },
      { heading: "Provenance compounds", paragraphs: ["A calibration record can look like overhead on day one. Across thousands of episodes it becomes an index for investigating drift, comparing sites, and improving collection policy. The metadata that makes one episode auditable makes the whole fleet learnable."] },
    ],
  },
  {
    slug: "designing-a-robot-data-cell",
    title: "Designing a robot-data cell",
    summary: "A collection cell is a measurement instrument, a workplace, and a repeatable production system.",
    date: "2026-09-06",
    readTime: "2 min",
    category: "Infrastructure",
    sections: [
      { heading: "Start with observability", paragraphs: ["A useful cell is designed around what must be measured, not around what looks impressive on a lab floor. Camera placement, lighting, network timing, end-effector sensing, and operator visibility all affect whether an episode can be reconstructed later.", "Each modality should have a reason to exist. More sensors are not automatically better; synchronized, calibrated sensors are."] },
      { heading: "Make recovery explicit", paragraphs: ["Real manipulation includes failed grasps, occlusion, resets, and hardware interruptions. A cell needs safe recovery paths that do not quietly contaminate the next episode. Reset state, tool state, and task fixtures belong in the operating procedure and in the data record."] },
      { heading: "Design for people", paragraphs: ["Teleoperation is skilled work. Controls, task pacing, safety boundaries, and feedback loops should help operators become more consistent over time. The cell is successful when good collection becomes easier to repeat—not when it merely produces a dramatic demo."] },
    ],
  },
  {
    slug: "provenance-as-product",
    title: "Provenance is part of the product",
    summary: "Robot datasets need a chain of custody that travels with the pixels, actions, and forces.",
    date: "2026-09-06",
    readTime: "2 min",
    category: "Trust",
    sections: [
      { heading: "The dataset has a history", paragraphs: ["Every delivered tensor began as a physical event: a person operating a machine, in a place, under a task protocol, through a calibrated sensor stack. Removing that history may make a dataset simpler to describe, but harder to trust."] },
      { heading: "Attach evidence, not adjectives", paragraphs: ["Terms such as high quality and diverse are conclusions. Provenance provides the evidence: collection cell, capture time, embodiment configuration, calibration residual, operator certification, consent context, QA version, and acceptance result.", "This lets a buyer establish their own thresholds and audit exceptions without relying on a single opaque score."] },
      { heading: "A boundary for autonomy", paragraphs: ["Automation can schedule work, flag anomalies, and prioritize review. Decisions involving safety, consent, and compliance remain accountable to people. Provenance records both kinds of decisions so the operating boundary stays visible as the system scales."] },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
