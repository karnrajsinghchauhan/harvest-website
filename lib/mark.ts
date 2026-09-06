/**
 * Geometry for the Harvest mark, in one place.
 *
 * Both renderers consume these constants — the React component in
 * components/Logo.tsx and the SVG string handed to Satori for the favicon and
 * the social card — so the drawing can never drift between them.
 *
 * Redrawn from the supplied logo. The palette is the original's: gold grain,
 * green leaves, gold ring. An earlier pass coloured the grain along the depth
 * ramp used by the site's figures; it read as a colour swatch rather than a
 * mark, and the original's two-colour restraint was simply better, so the
 * ramp idea was dropped.
 */

export const GOLD = "#c9922f";
export const GOLD_LIGHT = "#e0aa46";
export const LEAF = "#5f8348";
export const LEAF_DARK = "#47653a";
export const STEM = "#4a6340";

/** One wheat kernel: pointed at the tip, rounded at the base, centred on origin. */
export const KERNEL =
  "M0,-8.4 C3.3,-6.2 4.2,-2 2.5,1.5 C1.3,3.6 -1.3,3.6 -2.5,1.5 C-4.2,-2 -3.3,-6.2 0,-8.4 Z";

/** Kernel placements: [x offset from stalk, y, rotation]. Tighter than the
 *  original so the head reads as one ear of wheat rather than separate petals. */
export const KERNELS: [number, number, number][] = [
  [-4.6, 60, -30],
  [4.6, 60, 30],
  [-4.4, 52.5, -28],
  [4.4, 52.5, 28],
  [-4.2, 45, -26],
  [4.2, 45, 26],
  [-3.8, 37.8, -22],
  [3.8, 37.8, 22],
];

export const LEAF_LEFT = "M50 72 C40 67 29 59 24 45 C36 50 47 59 50 72 Z";
export const LEAF_RIGHT = "M50 72 C60 67 71 59 76 45 C64 50 53 59 50 72 Z";
export const LEAF_VEIN_LEFT = "M50 71 C42 64 33 55 26 46";
export const LEAF_VEIN_RIGHT = "M50 71 C58 64 67 55 74 46";

/**
 * The mark as a standalone SVG string, for Satori (favicon + social card),
 * which cannot render a React component tree.
 *
 * `weight` opens up the strokes for small sizes, where hairlines vanish.
 */
export function markSvg({ stroke = 2.6 }: { stroke?: number } = {}) {
  const kernels = KERNELS.map(
    ([dx, y, rot]) =>
      `<path d="${KERNEL}" fill="${GOLD}" transform="translate(${50 + dx} ${y}) rotate(${rot})"/>`
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="45" fill="none" stroke="${GOLD}" stroke-width="${stroke}"/>
<path d="M50 80 L50 32" stroke="${STEM}" stroke-width="${stroke}" stroke-linecap="round" fill="none"/>
<path d="${LEAF_LEFT}" fill="${LEAF}"/>
<path d="${LEAF_RIGHT}" fill="${LEAF_DARK}"/>
${kernels}
<path d="${KERNEL}" fill="${GOLD_LIGHT}" transform="translate(50 30) scale(1.05)"/>
</svg>`;
}
