import DataFigure from "./DataFigure";
import { doc } from "@/lib/links";

/* -------------------------------------------------------------------------- */

function Head({ n, title, children }: { n: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="head">
      <div className="head-num index">{n}</div>
      <div className="head-body">
        <h2 className="h2">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section id="top" className="wrap hero">
      <div className="hero-grid">
        <div className="hero-copy enter-1">
          <h1 className="display">Somebody has to actually collect the hours.</h1>
          <p className="hero-sub">
            Harvest runs teleoperated collection cells in the United States. Every
            episode is calibrated before it starts, scored before it ships, and
            delivered with its provenance attached.
          </p>
          <div className="act-row">
            <a href="#contact" className="act">
              Talk to us about data
            </a>
            <a href="#episode" className="act act-quiet">
              See an episode
            </a>
          </div>
        </div>
        <div className="enter-2">
          <DataFigure kind="pointcloud" alt="Depth-sensor point cloud of a tabletop manipulation scene, coloured by range from the sensor" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const STEPS = [
  {
    tick: "01",
    name: "Capture",
    body: "A trained operator drives real hardware through a task in a calibrated cell. Five camera streams, full proprioception, contact forces, all time-synced.",
  },
  {
    tick: "02",
    name: "Gate",
    body: "Automated integrity checks, kinematic sanity, then model-assisted review. An episode that fails any of the three never reaches a buyer.",
  },
  {
    tick: "03",
    name: "Format",
    body: "Accepted episodes are packaged as GR00T LeRobot v2 with proprioception and multi-channel annotation, ready to load rather than ready to clean.",
  },
  {
    tick: "04",
    name: "Deliver",
    body: "Buyers take reserved capacity or fixed batches. Every hour delivered carries the cell, the calibration, and the operator certification behind it.",
  },
];

export function Sequence() {
  return (
    <section id="pipeline" className="wrap band">
      <Head n="01 / 06" title="Cost accrues on hours collected. Revenue accrues on hours sold.">
        <p className="lede">
          Between those two facts sits the only thing that matters: whether an
          hour we collected is an hour anyone can train on. Four stages, in order,
          and nothing skips a stage.
        </p>
      </Head>

      <div className="seq">
        {STEPS.map((s) => (
          <div className="seq-step" key={s.tick}>
            <span className="seq-tick mono">{s.tick}</span>
            <h3 className="h3">{s.name}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <p className="footnote">
        Each stage is specified in full — the cell hardware, the gates an episode
        must clear, and the delivery contract — in{" "}
        <a className="route-link" href={doc("pipeline")} target="_blank" rel="noopener noreferrer">
          the pipeline documentation
        </a>
        .
      </p>

      <div style={{ marginTop: "clamp(36px, 5vw, 64px)" }}>
        <DataFigure kind="cellplan" alt="Plan drawing of a Harvest collection cell showing camera positions, capture volume, operator station and capture node" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const RECORD: [string, string][] = [
  ["Episode", "HVT-0416-A"],
  ["Cell", "07"],
  ["Task", "pick & place / bench"],
  ["Duration", "14.0 s"],
  ["Control rate", "50 Hz"],
  ["Force channel", "200 Hz"],
  ["Camera streams", "5 × 1280×720"],
  ["Depth points / frame", "45 812"],
  ["Calibration", "06:14 UTC · RMS 0.19 px"],
  ["Operator cert", "L2 · current"],
  ["QA score", "0.91"],
  ["Format", "GR00T LeRobot v2"],
];

export function Specimen() {
  return (
    <section id="episode" className="wrap band">
      <Head n="02 / 06" title="What one accepted episode actually contains.">
        <p className="lede">
          Not a description of the data — the data. This is a single fourteen-second
          episode from cell 07, exactly as it leaves the gate. The full delivery
          contract is in{" "}
          <a className="route-link" href={doc("deliveryFormat")} target="_blank" rel="noopener noreferrer">
            the format specification
          </a>
          .
        </p>
      </Head>

      <div className="specimen">
        <div className="specimen-top">
          <span className="specimen-id">HVT-0416-A</span>
          <span className="stamp">accepted</span>
        </div>
        <div className="rows">
          {RECORD.map(([k, v]) => (
            <div className="row" key={k}>
              <span className="row-key">{k}</span>
              <span className="row-val">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "clamp(24px, 4vw, 44px)", marginTop: "clamp(28px, 4vw, 48px)" }}>
        <DataFigure kind="trajectories" alt="Seven joint-angle traces across one reach, grasp and place episode, with contact and release marked" />
        <DataFigure kind="contact" alt="Gripper force profile over the episode, held inside the target grip band during the grasp" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const FIGURES = [
  ["100", "collection cells at target fleet scale"],
  ["17,550", "usable hours per month, base case"],
  ["3.1 PB", "raw data per year at Tier B capture"],
  ["≈16 h", "physical ceiling per robot-day"],
];

export function Capacity() {
  return (
    <section id="capacity" className="wrap band">
      <Head n="03 / 06" title="The ceiling is demand, not hardware.">
        <p className="lede">
          A hundred cells across five sites produce roughly 17,550 usable hours a
          month. Selling that through needs about $1.9M of recurring buyer demand
          a month — which is why reserved capacity contracts are the strategic
          priority, not a pricing footnote.
        </p>
      </Head>

      <div className="figures">
        {FIGURES.map(([v, k]) => (
          <div className="figure-item" key={k}>
            <div className="figure-val">{v}</div>
            <div className="figure-key">{k}</div>
          </div>
        ))}
      </div>

      <p className="footnote">
        These are figures from our published capacity model at full build-out,
        not hours already collected. The conservative, base and stretch cases and
        every assumption behind them are written up in{" "}
        <a className="route-link" href={doc("capacity")} target="_blank" rel="noopener noreferrer">
          the capacity model
        </a>
        .
      </p>

      <div style={{ display: "grid", gap: "clamp(24px, 4vw, 44px)", marginTop: "clamp(32px, 4.5vw, 56px)" }}>
        <DataFigure kind="capacity" alt="Stacked area chart of modelled usable hours per month as five sites come online over 24 months" />
        <DataFigure kind="coverage" alt="Matrix of task types against environments showing percentage of target episode count collected" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const ROUTES = [
  {
    who: "For investors",
    name: "Machine Shares",
    body: "A fractional economic interest in a named collection unit's revenue, structured as a securities offering with counsel behind it — an instrument, not a promise.",
    key: "machineShares" as const,
  },
  {
    who: "For operators",
    name: "Stake-to-Collect",
    body: "A refundable quality bond that Harvest funds, not the operator. It rewards careful work and hard tasks without penalising anyone for taking the difficult ones.",
    key: "stakeToCollect" as const,
  },
  {
    who: "Bring your own robot",
    name: "Device Holder Staking",
    body: "Independent owners of a compatible robot stake a bond, pass certification, and are paid per accepted episode collected on the network.",
    // No page in the book yet — the design docs are written but not pushed to
    // the repo. Points at the docs root rather than mislinking to a different
    // structure; give it its own key once the page exists.
    key: "home" as const,
  },
];

export function Routes() {
  return (
    <section id="routes" className="wrap band">
      <Head n="04 / 06" title="Three ways in, under three different bodies of law.">
        <p className="lede">
          They solve different problems and sit under different regulatory
          analysis, so we keep them separate instead of collapsing them into one
          structure that would be wrong about all three.
        </p>
      </Head>

      <div className="routes">
        {ROUTES.map((r) => (
          <div className="route" key={r.name}>
            <div className="route-who">{r.who}</div>
            <div>
              <h3 className="route-name">{r.name}</h3>
              <p>{r.body}</p>
            </div>
            <a
              className="route-link"
              href={doc(r.key)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the design
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const CHECKS = [
  "US-registered, US-operated, US data custody",
  "Every episode scored at the gate before delivery",
  "Consent handled per use case, not a blanket waiver",
  "Licence covers commercial derivative models",
  "Export classification handled case by case",
  "No SOC 2 yet — said plainly rather than glossed over",
];

export function Provenance() {
  return (
    <section id="provenance" className="wrap band">
      <Head n="05 / 06" title="Provenance is a measurement, not a claim.">
        <p className="lede">
          Every cell is recalibrated at the start of every shift, and the residual
          is recorded against the episodes that follow it. If the calibration
          drifts, we know which hours it touched.
        </p>
      </Head>

      <div className="duo">
        <div>
          <DataFigure kind="calibration" alt="Calibration target with 48 detected corners and the corresponding reprojection residual scatter" />
        </div>
        <div>
          <p className="body">
            The same discipline applies to the decisions around the data. Routine
            scheduling and triage run autonomously; anything bounded runs
            autonomously with logged human review; and operator safety, consent,
            and compliance clearance stay with a person no matter how good the
            models get. That last one is a permanent boundary, not a stage we
            expect to grow out of.
          </p>
          <ul className="checks">
            {CHECKS.map((c) => (
              <li key={c}>
                <span aria-hidden="true">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="footnote">
            The reviewers who ask about this usually want the source:{" "}
            <a className="route-link" href={doc("security")} target="_blank" rel="noopener noreferrer">
              data security and access control
            </a>
            {", "}
            <a className="route-link" href={doc("dataLicence")} target="_blank" rel="noopener noreferrer">
              the data licence
            </a>
            {", and "}
            <a className="route-link" href={doc("exportControl")} target="_blank" rel="noopener noreferrer">
              export classification
            </a>
            .
          </p>
        </div>
      </div>

      <div style={{ marginTop: "clamp(32px, 4.5vw, 56px)" }}>
        <DataFigure kind="episodes" alt="One collection day of episodes plotted by QA score against the acceptance threshold, with a rolling acceptance rate" />
      </div>
    </section>
  );
}
