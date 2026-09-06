import {
  GOLD,
  GOLD_LIGHT,
  KERNEL,
  KERNELS,
  LEAF,
  LEAF_DARK,
  LEAF_LEFT,
  LEAF_RIGHT,
  LEAF_VEIN_LEFT,
  LEAF_VEIN_RIGHT,
  STEM,
} from "@/lib/mark";

/**
 * The Harvest mark, rebuilt as vector from the supplied logo.
 *
 * Three changes, each for a reason:
 *
 *  1. Vector and transparent. The original is a raster PNG baked onto a black
 *     rectangle, so it could not sit on this site's pale ground at all, and it
 *     softened on any retina screen. This scales from favicon to billboard.
 *
 *  2. The inner "H" badge is gone. It repeated the wordmark standing right
 *     beside it, and it was the first thing to turn to mush at 32px — the size
 *     the mark is seen at most often.
 *
 *  3. The grain is redrawn as pointed kernels packed tight against the stalk,
 *     so the head reads as one ear of wheat instead of separate petals.
 *
 * Geometry lives in lib/mark.ts, shared with the favicon and social card.
 * `tone="mono"` renders everything in currentColor, for small sizes and print.
 */

type Props = {
  size?: number;
  tone?: "brand" | "mono";
  className?: string;
};

export function Mark({ size = 36, tone = "brand", className }: Props) {
  const mono = tone === "mono";
  const c = (brand: string) => (mono ? "currentColor" : brand);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke={c(GOLD)} strokeWidth="2.6" />

      <path d="M50 80 L50 32" stroke={c(STEM)} strokeWidth="2.6" strokeLinecap="round" fill="none" />

      <path d={LEAF_LEFT} fill={c(LEAF)} />
      <path d={LEAF_RIGHT} fill={c(LEAF_DARK)} />
      <path
        d={LEAF_VEIN_LEFT}
        stroke={mono ? "currentColor" : LEAF_DARK}
        strokeWidth="0.8"
        fill="none"
        opacity={mono ? 0.3 : 0.5}
      />
      <path
        d={LEAF_VEIN_RIGHT}
        stroke={mono ? "currentColor" : "#3c5632"}
        strokeWidth="0.8"
        fill="none"
        opacity={mono ? 0.3 : 0.5}
      />

      {KERNELS.map(([dx, y, rot]) => (
        <path
          key={`${dx}-${y}`}
          d={KERNEL}
          fill={c(GOLD)}
          transform={`translate(${50 + dx} ${y}) rotate(${rot})`}
        />
      ))}
      <path d={KERNEL} fill={c(GOLD_LIGHT)} transform="translate(50 30) scale(1.05)" />
    </svg>
  );
}

/** Mark plus wordmark, set in the wide caps the brand uses. */
export default function Logo({ size = 30, tone = "brand" }: Props) {
  return (
    <span className="logo">
      <Mark size={size} tone={tone} />
      <span className="logo-word">Harvest</span>
    </span>
  );
}
