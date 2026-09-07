"use client";

import { useEffect, useRef } from "react";

/**
 * The figures on this page are drawn, not photographed.
 *
 * Each one is generated here in the browser from synthetic-but-plausible
 * telemetry: a depth return, seven joint traces, a day of QA dispositions, a
 * build-out ramp. Nothing is stock, nothing is scraped, and nothing depicts a
 * third party's hardware. Drawing them rather than shipping rasters keeps the
 * page light and keeps every figure sharp at any pixel density.
 *
 * The palette is shared with the page: the depth ramp below is where the
 * accent teal comes from.
 */

export type Kind =
  | "pointcloud"
  | "trajectories"
  | "contact"
  | "episodes"
  | "capacity"
  | "calibration"
  | "cellplan"
  | "coverage";

const PANEL = "#0f1317";
const GRID = "#1c242b";
const DIM = "#5a6872";
const TEXT = "#93a4ae";
const BRIGHT = "#d8e2e8";
const AMBER = "#e0a83d";

const PAPER = "#e9ebe7";
const INK = "#12161a";
const PDIM = "#6b7670";
const PRULE = "#b9c0b9";
const TEAL = "#1f8c82";

const RAMP = [
  [34, 28, 88],
  [27, 74, 120],
  [23, 130, 123],
  [79, 168, 92],
  [183, 190, 56],
  [232, 168, 61],
  [245, 217, 138],
] as const;

function depth(t: number) {
  const x = Math.max(0, Math.min(1, t)) * (RAMP.length - 1);
  const i = Math.min(RAMP.length - 2, Math.floor(x));
  const f = x - i;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * f)},${Math.round(
    a[1] + (b[1] - a[1]) * f
  )},${Math.round(a[2] + (b[2] - a[2]) * f)})`;
}

/** Deterministic PRNG so the figures are identical on every render. */
function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Box–Muller, for sensor noise that looks like sensor noise. */
function normal(r: () => number) {
  return Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
}

const MONO = (px: number, weight = 400) =>
  `${weight} ${px}px var(--font-plex-mono), ui-monospace, monospace`;

type Ctx = CanvasRenderingContext2D;

function header(c: Ctx, w: number, left: string, right: string, light = false) {
  c.font = MONO(12.5, 600);
  c.fillStyle = light ? INK : BRIGHT;
  c.textAlign = "left";
  c.textBaseline = "middle";
  c.fillText(left, 26, 26);
  c.font = MONO(11);
  c.fillStyle = light ? PDIM : DIM;
  c.textAlign = "right";
  c.fillText(right, w - 26, 26);
  c.textAlign = "left";
}

/* -------------------------------------------------------------------------- */

function pointcloud(c: Ctx, w: number, h: number) {
  const r = rand(7);
  type P = [number, number, number];
  const pts: P[] = [];

  for (let i = 0; i < 15000; i++)
    pts.push([r() * 2 - 1, r() * 1.36 - 0.68, normal(r) * 0.004]);

  for (let i = 0; i < 2400; i++) {
    const face = Math.floor(r() * 5);
    const u = r(), v = r();
    let p: P;
    if (face === 0) p = [-0.42, -0.18 + u * 0.3, v * 0.26];
    else if (face === 1) p = [-0.14, -0.18 + u * 0.3, v * 0.26];
    else if (face === 2) p = [-0.42 + u * 0.28, -0.18, v * 0.26];
    else if (face === 3) p = [-0.42 + u * 0.28, 0.12, v * 0.26];
    else p = [-0.42 + u * 0.28, -0.18 + v * 0.3, 0.26];
    pts.push([p[0] + normal(r) * 0.002, p[1] + normal(r) * 0.002, p[2] + normal(r) * 0.002]);
  }

  for (let i = 0; i < 2000; i++) {
    const th = r() * Math.PI * 2;
    pts.push([
      0.2 + 0.088 * Math.cos(th) + normal(r) * 0.002,
      -0.1 + 0.088 * Math.sin(th) + normal(r) * 0.002,
      r() * 0.3,
    ]);
  }

  for (let i = 0; i < 1300; i++) {
    const u = r() * Math.PI * 2;
    const v = Math.acos(r() * 2 - 1);
    const R = 0.1;
    pts.push([
      0.58 + R * Math.sin(v) * Math.cos(u),
      0.26 + R * Math.sin(v) * Math.sin(u),
      R + R * Math.cos(v),
    ]);
  }

  // isometric-ish projection
  const az = (-52 * Math.PI) / 180;
  const el = (32 * Math.PI) / 180;
  const scale = Math.min(w / 2.6, h / 1.25);
  const cx = w / 2;
  const cy = h * 0.56;

  const project = ([x, y, z]: P) => {
    const X = x * Math.cos(az) - y * Math.sin(az);
    const Y = x * Math.sin(az) + y * Math.cos(az);
    return [cx + X * scale, cy - (z * scale * 1.35 - Y * Math.sin(el) * scale)] as const;
  };

  const sensor: P = [-1.5, -1.9, 1.35];
  const ds = pts.map((p) =>
    Math.hypot(p[0] - sensor[0], p[1] - sensor[1], p[2] - sensor[2])
  );
  const dmin = Math.min(...ds);
  const dmax = Math.max(...ds);

  pts.forEach((p, i) => {
    const t = Math.max(0.05, Math.min(1, 1.05 - Math.pow((ds[i] - dmin) / (dmax - dmin), 0.85)));
    const [px, py] = project(p);
    c.fillStyle = depth(t);
    c.fillRect(px, py, 1.35, 1.35);
  });

  // sensor frame triad at the near corner of the work surface
  const origin: P = [-0.98, -0.66, 0];
  const axes: [P, string][] = [
    [[-0.72, -0.66, 0], "#e86a4c"],
    [[-0.98, -0.4, 0], "#6fd08c"],
    [[-0.98, -0.66, 0.26], "#5aa9e8"],
  ];
  const [ox, oy] = project(origin);
  c.lineWidth = 1.4;
  axes.forEach(([end, col]) => {
    const [ex, ey] = project(end);
    c.strokeStyle = col;
    c.beginPath();
    c.moveTo(ox, oy);
    c.lineTo(ex, ey);
    c.stroke();
  });

  header(c, w, "capture · depth return", "20 700 pts · 1 frame · 30 Hz");
  c.font = MONO(11);
  c.fillStyle = DIM;
  c.fillText("episode HVT-0416-A · cell 07 · calibrated 06:14 UTC", 26, h - 22);
}

/* -------------------------------------------------------------------------- */

function trajectories(c: Ctx, w: number, h: number) {
  const r = rand(11);
  const labels = ["shoulder_p", "shoulder_r", "shoulder_y", "elbow", "wrist_p", "wrist_y", "gripper"];
  const n = 700;
  const dur = 14;
  const L = 118;
  const R = w - 34;
  const top = 56;
  const bot = h - 44;
  const step = (bot - top) / labels.length;

  const bump = (t: number, ctr: number, wd: number, amp: number) =>
    amp * Math.exp(-((t - ctr) ** 2) / (2 * wd * wd));

  const shapes: ((t: number) => number)[] = [
    (t) => bump(t, 4.0, 1.6, 0.85) + bump(t, 9.4, 1.5, -0.55),
    (t) => bump(t, 3.4, 1.9, -0.42) + bump(t, 10.0, 1.7, 0.3),
    (t) => bump(t, 4.6, 2.2, 0.3) + bump(t, 9.0, 1.4, -0.22),
    (t) => bump(t, 4.2, 1.4, -1.1) + bump(t, 9.6, 1.6, 0.72),
    (t) => bump(t, 5.0, 1.2, 0.48) + bump(t, 9.2, 1.3, -0.34),
    (t) => bump(t, 4.4, 1.7, -0.26) + bump(t, 9.8, 1.5, 0.19),
    (t) => (t > 5.6 && t < 10.2 ? 0.9 : 0) ,
  ];

  const x = (t: number) => L + (t / dur) * (R - L);

  labels.forEach((lab, i) => {
    const base = top + (i + 0.5) * step;
    c.strokeStyle = GRID;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(L, base);
    c.lineTo(R, base);
    c.stroke();

    c.strokeStyle = depth(0.16 + (0.72 * i) / (labels.length - 1));
    c.lineWidth = 1.4;
    c.lineJoin = "round";
    c.beginPath();
    for (let k = 0; k <= n; k++) {
      const t = (k / n) * dur;
      let v = shapes[i](t);
      if (i === 6) {
        // soften the gripper step so it reads as an actuator, not a square wave
        const e = 0.28;
        if (t > 5.6 - e && t < 5.6 + e) v = 0.9 * ((t - (5.6 - e)) / (2 * e));
        if (t > 10.2 - e && t < 10.2 + e) v = 0.9 * (1 - (t - (10.2 - e)) / (2 * e));
      }
      v += normal(r) * 0.006;
      const y = base - v * step * 0.62;
      k ? c.lineTo(x(t), y) : c.moveTo(x(t), y);
    }
    c.stroke();

    c.font = MONO(11);
    c.fillStyle = DIM;
    c.textAlign = "right";
    c.textBaseline = "middle";
    c.fillText(lab, L - 12, base);
    c.textAlign = "left";
  });

  [
    [5.62, "contact"],
    [10.18, "release"],
  ].forEach(([t, lab]) => {
    c.strokeStyle = AMBER;
    c.lineWidth = 1;
    c.setLineDash([3, 3]);
    c.beginPath();
    c.moveTo(x(t as number), top - 6);
    c.lineTo(x(t as number), bot);
    c.stroke();
    c.setLineDash([]);
    c.font = MONO(10.5);
    c.fillStyle = AMBER;
    c.fillText(lab as string, x(t as number) + 5, top + 2);
  });

  axisX(c, L, R, bot, dur, 2, "seconds");
  header(c, w, "proprioception · 7 DOF @ 50 Hz", "episode HVT-0416-A · accepted");
}

function axisX(c: Ctx, L: number, R: number, y: number, max: number, stepv: number, label: string) {
  c.strokeStyle = "#2a343d";
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(L, y);
  c.lineTo(R, y);
  c.stroke();
  c.font = MONO(10.5);
  c.fillStyle = DIM;
  c.textAlign = "center";
  c.textBaseline = "top";
  for (let v = 0; v <= max; v += stepv) {
    const px = L + (v / max) * (R - L);
    c.beginPath();
    c.moveTo(px, y);
    c.lineTo(px, y + 4);
    c.stroke();
    c.fillText(String(v), px, y + 8);
  }
  c.fillText(label, (L + R) / 2, y + 24);
  c.textAlign = "left";
}

/* -------------------------------------------------------------------------- */

function contact(c: Ctx, w: number, h: number) {
  const r = rand(23);
  const L = 96;
  const R = w - 34;
  const top = 54;
  const bot = h - 46;
  const dur = 14;
  const fmax = 15;

  const x = (t: number) => L + (t / dur) * (R - L);
  const y = (f: number) => bot - (f / fmax) * (bot - top);

  // target band
  c.fillStyle = "rgba(224,168,61,0.09)";
  c.fillRect(L, y(12.5), R - L, y(10.5) - y(12.5));
  c.font = MONO(10.5);
  c.fillStyle = AMBER;
  c.textAlign = "right";
  c.fillText("target grip band 10.5–12.5 N", R, y(12.5) - 10);
  c.textAlign = "left";

  c.strokeStyle = GRID;
  c.lineWidth = 1;
  c.font = MONO(10.5);
  for (let f = 0; f <= fmax; f += 5) {
    c.beginPath();
    c.moveTo(L, y(f));
    c.lineTo(R, y(f));
    c.stroke();
    c.fillStyle = DIM;
    c.textAlign = "right";
    c.textBaseline = "middle";
    c.fillText(String(f), L - 10, y(f));
  }
  c.textAlign = "left";

  const force = (t: number) => {
    let f = 0;
    if (t > 5.6 && t < 10.2) f = 11.5 + 0.28 * Math.sin(2 * Math.PI * 6.5 * t);
    else if (t >= 5.35 && t <= 5.6) f = ((t - 5.35) / 0.25) * 11.5;
    else if (t >= 10.2 && t < 10.5) f = (1 - (t - 10.2) / 0.3) * 11.5;
    return Math.max(0, f + normal(r) * 0.11);
  };

  const n = 1000;
  c.beginPath();
  c.moveTo(L, y(0));
  for (let k = 0; k <= n; k++) {
    const t = (k / n) * dur;
    c.lineTo(x(t), y(force(t)));
  }
  c.lineTo(R, y(0));
  c.closePath();
  c.fillStyle = "rgba(31,140,130,0.16)";
  c.fill();

  c.beginPath();
  const r2 = rand(23);
  const force2 = (t: number) => {
    let f = 0;
    if (t > 5.6 && t < 10.2) f = 11.5 + 0.28 * Math.sin(2 * Math.PI * 6.5 * t);
    else if (t >= 5.35 && t <= 5.6) f = ((t - 5.35) / 0.25) * 11.5;
    else if (t >= 10.2 && t < 10.5) f = (1 - (t - 10.2) / 0.3) * 11.5;
    return Math.max(0, f + normal(r2) * 0.11);
  };
  for (let k = 0; k <= n; k++) {
    const t = (k / n) * dur;
    k ? c.lineTo(x(t), y(force2(t))) : c.moveTo(x(t), y(force2(t)));
  }
  c.strokeStyle = TEAL;
  c.lineWidth = 1.3;
  c.stroke();

  c.save();
  c.translate(30, (top + bot) / 2);
  c.rotate(-Math.PI / 2);
  c.font = MONO(11);
  c.fillStyle = TEXT;
  c.textAlign = "center";
  c.fillText("gripper force (N)", 0, 0);
  c.restore();
  c.textAlign = "left";

  axisX(c, L, R, bot, dur, 2, "seconds");
  header(c, w, "contact · force channel @ 200 Hz", "episode HVT-0416-A");
}

/* -------------------------------------------------------------------------- */

function episodes(c: Ctx, w: number, h: number) {
  const r = rand(31);
  const n = 214;
  const L = 74;
  const R = w - 34;
  const top = 56;
  const split = h * 0.63;
  const bot = h - 48;

  const q: number[] = [];
  for (let i = 0; i < n; i++)
    q.push(Math.max(0.18, Math.min(0.99, 0.79 + 0.16 * Math.sin(i / 34) + normal(r) * 0.1)));
  const ok = q.map((v) => v > 0.55);

  const bw = (R - L) / n;
  q.forEach((v, i) => {
    c.fillStyle = ok[i] ? depth(0.3 + 0.55 * v) : "#39424a";
    const bh = v * (split - top);
    c.fillRect(L + i * bw, split - bh, bw * 0.76, bh);
  });

  c.strokeStyle = AMBER;
  c.lineWidth = 1;
  c.setLineDash([3, 3]);
  const thr = split - 0.55 * (split - top);
  c.beginPath();
  c.moveTo(L, thr);
  c.lineTo(R, thr);
  c.stroke();
  c.setLineDash([]);
  c.font = MONO(10.5);
  c.fillStyle = AMBER;
  c.textAlign = "right";
  c.fillText("acceptance threshold", R, thr - 9);
  c.textAlign = "left";

  c.font = MONO(11);
  c.fillStyle = TEXT;
  c.save();
  c.translate(26, (top + split) / 2);
  c.rotate(-Math.PI / 2);
  c.textAlign = "center";
  c.fillText("QA score", 0, 0);
  c.restore();
  c.textAlign = "left";

  // rolling acceptance
  const win = 24;
  const roll = q.map((_, i) => {
    let s = 0, k = 0;
    for (let j = Math.max(0, i - win / 2); j < Math.min(n, i + win / 2); j++) { s += ok[j] ? 1 : 0; k++; }
    return s / k;
  });
  const ry = (v: number) => bot - ((v - 0.4) / 0.6) * (bot - split - 26);

  c.beginPath();
  c.moveTo(L, bot);
  roll.forEach((v, i) => c.lineTo(L + i * bw, ry(v)));
  c.lineTo(R, bot);
  c.closePath();
  c.fillStyle = "rgba(31,140,130,0.14)";
  c.fill();

  c.beginPath();
  roll.forEach((v, i) => (i ? c.lineTo(L + i * bw, ry(v)) : c.moveTo(L, ry(v))));
  c.strokeStyle = TEAL;
  c.lineWidth = 1.5;
  c.stroke();

  c.font = MONO(10.5);
  c.fillStyle = DIM;
  c.textAlign = "right";
  c.textBaseline = "middle";
  [0.5, 0.75, 1].forEach((v) => c.fillText(`${v * 100}`, L - 10, ry(v)));
  c.textAlign = "left";
  c.textBaseline = "top";
  c.fillText("episode index · collection day 0416", L, bot + 10);

  const acc = ok.filter(Boolean).length;
  header(c, w, "QA gate · episode disposition", `${acc} accepted / ${n} · ${((100 * acc) / n).toFixed(1)}%`);
}

/* -------------------------------------------------------------------------- */

function capacity(c: Ctx, w: number, h: number) {
  const L = 96;
  const R = w - 34;
  const top = 56;
  const bot = h - 52;
  const months = 24;
  const perCell = 175.5;
  const starts = [0, 4, 9, 14, 18];
  const ymax = 19500;

  const x = (m: number) => L + (m / months) * (R - L);
  const y = (v: number) => bot - (v / ymax) * (bot - top);

  c.strokeStyle = GRID;
  c.lineWidth = 1;
  c.font = MONO(10.5);
  [0, 5000, 10000, 15000].forEach((v) => {
    c.beginPath();
    c.moveTo(L, y(v));
    c.lineTo(R, y(v));
    c.stroke();
    c.fillStyle = DIM;
    c.textAlign = "right";
    c.textBaseline = "middle";
    c.fillText(v ? (v / 1000).toFixed(0) + " 000" : "0", L - 10, y(v));
  });
  c.textAlign = "left";

  const layer = (i: number, m: number) =>
    Math.max(0, Math.min(1, (m - starts[i]) / 4)) * 20 * perCell;

  let below = new Array(months + 1).fill(0);
  for (let i = 0; i < 5; i++) {
    c.beginPath();
    for (let m = 0; m <= months; m++) {
      const v = below[m] + layer(i, m);
      m ? c.lineTo(x(m), y(v)) : c.moveTo(x(0), y(v));
    }
    for (let m = months; m >= 0; m--) c.lineTo(x(m), y(below[m]));
    c.closePath();
    c.fillStyle = depth(0.2 + (0.62 * i) / 4);
    c.fill();
    below = below.map((b, m) => b + layer(i, m));
  }

  c.beginPath();
  below.forEach((v, m) => (m ? c.lineTo(x(m), y(v)) : c.moveTo(x(0), y(v))));
  c.strokeStyle = BRIGHT;
  c.lineWidth = 1.2;
  c.stroke();

  c.font = MONO(11.5, 500);
  c.fillStyle = BRIGHT;
  c.textAlign = "right";
  c.fillText("17,550 usable hrs / mo", R - 10, y(below[months]) + 22);
  c.textAlign = "left";

  starts.forEach((s, i) => {
    c.strokeStyle = "rgba(255,255,255,0.10)";
    c.beginPath();
    c.moveTo(x(s), top);
    c.lineTo(x(s), bot);
    c.stroke();
    c.save();
    c.translate(x(s) + 12, bot - 8);
    c.rotate(-Math.PI / 2);
    c.font = MONO(10);
    c.fillStyle = "rgba(255,255,255,0.42)";
    c.fillText(`site ${i + 1}`, 0, 0);
    c.restore();
  });

  c.save();
  c.translate(28, (top + bot) / 2);
  c.rotate(-Math.PI / 2);
  c.font = MONO(11);
  c.fillStyle = TEXT;
  c.textAlign = "center";
  c.fillText("usable hours / month", 0, 0);
  c.restore();
  c.textAlign = "left";

  axisX(c, L, R, bot, months, 6, "month from first cell online");
  header(c, w, "build-out · 5 sites, 100 cells", "base case · modelled, not achieved");
}

/* -------------------------------------------------------------------------- */

function calibration(c: Ctx, w: number, h: number) {
  const r = rand(41);
  const half = w / 2;

  // checkerboard with detected corners
  const cols = 9, rows = 7;
  const cell = Math.min((half - 130) / cols, (h - 150) / rows);
  const bx = 74;
  const by = (h - rows * cell) / 2 + 8;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      if ((i + j) % 2 === 0) {
        c.fillStyle = "#1a222a";
        c.fillRect(bx + i * cell, by + j * cell, cell, cell);
      }
  c.strokeStyle = TEAL;
  c.lineWidth = 1;
  for (let i = 1; i < cols; i++)
    for (let j = 1; j < rows; j++) {
      c.beginPath();
      c.arc(bx + i * cell, by + j * cell, 3.4, 0, Math.PI * 2);
      c.stroke();
    }
  c.font = MONO(10.5);
  c.fillStyle = DIM;
  c.fillText("48 corners detected · 30 mm pitch", bx, by + rows * cell + 20);

  // reprojection residuals
  const ox = half + (half - 40) / 2;
  const oy = h / 2 + 6;
  const rad = Math.min((half - 90) / 2, (h - 140) / 2);
  c.strokeStyle = GRID;
  [0.33, 0.66, 1].forEach((f) => {
    c.beginPath();
    c.arc(ox, oy, rad * f, 0, Math.PI * 2);
    c.stroke();
    c.font = MONO(9.5);
    c.fillStyle = DIM;
    c.fillText((0.75 * f).toFixed(2), ox + rad * f * 0.71 + 3, oy - rad * f * 0.71);
  });
  c.beginPath();
  c.moveTo(ox - rad, oy); c.lineTo(ox + rad, oy);
  c.moveTo(ox, oy - rad); c.lineTo(ox, oy + rad);
  c.stroke();

  for (let i = 0; i < 460; i++) {
    const dx = normal(r) * 0.19;
    const dy = normal(r) * 0.19;
    const d = Math.hypot(dx, dy);
    if (d > 0.75) continue;
    c.fillStyle = depth(0.3 + 0.6 * (1 - d / 0.75));
    c.beginPath();
    c.arc(ox + (dx / 0.75) * rad, oy + (dy / 0.75) * rad, 1.9, 0, Math.PI * 2);
    c.fill();
  }
  c.font = MONO(10.5);
  c.fillStyle = DIM;
  c.textAlign = "center";
  c.fillText("reprojection residual · RMS 0.19 px", ox, oy + rad + 24);
  c.textAlign = "left";

  header(c, w, "calibration · every cell, every shift", "cell 07 · 06:14 UTC · pass");
}

/* -------------------------------------------------------------------------- */

function cellplan(c: Ctx, w: number, h: number) {
  const pad = 92;
  const availW = w - pad * 2;
  const availH = h - 116;
  const s = Math.min(availW / 6, availH / 4);
  const ox = (w - 6 * s) / 2;
  const oy = 62 + (availH - 4 * s) / 2;
  const X = (u: number) => ox + u * s;
  const Y = (v: number) => oy + (4 - v) * s;

  c.strokeStyle = INK;
  c.lineWidth = 1.6;
  c.strokeRect(X(0), Y(4), 6 * s, 4 * s);

  c.fillStyle = "rgba(31,140,130,0.10)";
  c.fillRect(X(1.6), Y(3.2), 2.8 * s, 2.2 * s);
  c.strokeStyle = TEAL;
  c.lineWidth = 1.1;
  c.setLineDash([4, 3]);
  c.strokeRect(X(1.6), Y(3.2), 2.8 * s, 2.2 * s);
  c.setLineDash([]);
  c.font = MONO(11);
  c.fillStyle = TEAL;
  c.textAlign = "center";
  c.fillText("capture volume  2.8 × 2.2 m", X(3), Y(3.2) - 12);

  c.fillStyle = "#d3d8d2";
  c.fillRect(X(2.35), Y(2.35), 1.3 * s, 0.8 * s);
  c.strokeStyle = INK;
  c.lineWidth = 1.1;
  c.strokeRect(X(2.35), Y(2.35), 1.3 * s, 0.8 * s);
  c.font = MONO(10.5);
  c.fillStyle = PDIM;
  c.textBaseline = "middle";
  c.fillText("work surface", X(3), Y(1.95));

  const cams: [number, number, number][] = [
    [1.6, 3.2, -45], [4.4, 3.2, -135], [1.6, 1.0, 45], [4.4, 1.0, 135], [3.0, 3.55, -90],
  ];
  cams.forEach(([u, v, ang], i) => {
    c.fillStyle = INK;
    c.fillRect(X(u) - 4, Y(v) - 4, 8, 8);
    const a = (ang * Math.PI) / 180;
    c.strokeStyle = INK;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(X(u), Y(v));
    c.lineTo(X(u) + Math.cos(a) * 0.55 * s, Y(v) - Math.sin(a) * 0.55 * s);
    c.stroke();
    c.font = MONO(9.5);
    c.fillStyle = PDIM;
    c.textBaseline = "bottom";
    c.fillText(`C${i + 1}`, X(u), Y(v) - 8);
  });

  c.textBaseline = "middle";
  ([["operator", 0.28, 0.3, 1.0], ["capture node", 4.7, 0.3, 1.0]] as const).forEach(
    ([lab, u, v, ww]) => {
      c.strokeStyle = INK;
      c.lineWidth = 1.1;
      c.strokeRect(X(u), Y(v + 0.62), ww * s, 0.62 * s);
      c.font = MONO(10.5);
      c.fillStyle = INK;
      c.fillText(lab, X(u + ww / 2), Y(v + 0.31));
    }
  );

  // dimensions
  c.strokeStyle = PDIM;
  c.lineWidth = 0.9;
  c.beginPath();
  c.moveTo(X(0), Y(4) + 4 * s + 30);
  c.lineTo(X(6), Y(4) + 4 * s + 30);
  c.moveTo(X(0) - 34, Y(4));
  c.lineTo(X(0) - 34, Y(0));
  c.stroke();
  c.font = MONO(10.5);
  c.fillStyle = PDIM;
  c.fillText("6.0 m", X(3), Y(4) + 4 * s + 44);
  c.save();
  c.translate(X(0) - 46, Y(2));
  c.rotate(-Math.PI / 2);
  c.fillText("4.0 m", 0, 0);
  c.restore();
  c.textAlign = "left";

  header(c, w, "one collection cell, in plan", "5 cameras · 1 operator · 1 capture node", true);
}

/* -------------------------------------------------------------------------- */

function coverage(c: Ctx, w: number, h: number) {
  const tasks = ["pick & place", "insertion", "articulated obj.", "deformable", "tool use", "bimanual", "locomotion + manip.", "long horizon"];
  const envs = ["bench", "kitchen", "retail", "light industrial", "logistics"];
  const m = [
    [95, 88, 72, 90, 84], [82, 44, 38, 86, 55], [70, 80, 62, 48, 44], [52, 74, 40, 30, 58],
    [66, 58, 34, 72, 40], [58, 50, 42, 55, 62], [30, 26, 36, 44, 68], [34, 42, 30, 38, 46],
  ];
  const L = 176;
  const top = 84;
  const R = w - 30;
  const bot = h - 22;
  const cw = (R - L) / envs.length;
  const ch = (bot - top) / tasks.length;

  c.font = MONO(10.5);
  c.textBaseline = "middle";
  envs.forEach((e, j) => {
    c.fillStyle = PDIM;
    c.textAlign = "center";
    c.fillText(e, L + (j + 0.5) * cw, top - 16);
  });
  tasks.forEach((t, i) => {
    c.fillStyle = PDIM;
    c.textAlign = "right";
    c.fillText(t, L - 14, top + (i + 0.5) * ch);
  });

  c.textAlign = "center";
  m.forEach((row, i) =>
    row.forEach((v, j) => {
      c.fillStyle = depth(0.18 + 0.68 * (v / 100));
      c.fillRect(L + j * cw + 2, top + i * ch + 2, cw - 5, ch - 5);
      c.fillStyle = v > 55 ? "#f2f5f1" : "#e9ebe7";
      c.font = MONO(10.5);
      c.fillText(String(v), L + (j + 0.5) * cw, top + (i + 0.5) * ch);
    })
  );
  c.textAlign = "left";

  header(c, w, "task × environment coverage", "% of target episode count collected", true);
}

/* -------------------------------------------------------------------------- */

const DRAW: Record<Kind, (c: Ctx, w: number, h: number) => void> = {
  pointcloud, trajectories, contact, episodes, capacity, calibration, cellplan, coverage,
};

const SIZE: Record<Kind, [number, number]> = {
  pointcloud: [900, 500],
  trajectories: [960, 520],
  contact: [960, 330],
  episodes: [960, 440],
  capacity: [960, 460],
  calibration: [960, 380],
  cellplan: [960, 470],
  coverage: [960, 460],
};

const LIGHT: Kind[] = ["cellplan", "coverage"];

export default function DataFigure({ kind, alt }: { kind: Kind; alt: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [w, h] = SIZE[kind];
  const light = LIGHT.includes(kind);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const c = canvas.getContext("2d");
    if (!c) return;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = light ? PAPER : PANEL;
    c.fillRect(0, 0, w, h);
    if (light) {
      c.strokeStyle = PRULE;
      c.lineWidth = 1;
    }
    DRAW[kind](c, w, h);
  }, [kind, w, h, light]);

  return (
    <figure className="fig">
      <div className={light ? "fig-frame fig-frame-light" : "fig-frame"}>
        <canvas
          ref={ref}
          role="img"
          aria-label={alt}
          style={{ width: "100%", height: "auto", display: "block", aspectRatio: `${w} / ${h}` }}
        />
      </div>
      <figcaption className="figure-caption">Illustrative visualization · synthetic data, not a production record</figcaption>
    </figure>
  );
}
