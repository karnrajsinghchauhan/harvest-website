import { ImageResponse } from "next/og";
import { markSvg } from "@/lib/mark";

/**
 * The social card, generated at build time rather than shipped as a raster.
 *
 * Satori only supports flexbox, so this is deliberately simple: the wordmark,
 * the position in one line, and a bar of the depth ramp that the figures on the
 * page are coloured with — enough that a link posted to X reads as the same
 * object as the site it points at.
 */

export const alt = "Harvest — physical AI data infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RAMP = ["#221c58", "#1b4a78", "#17827b", "#4fa85c", "#b7be38", "#e8a83d", "#f5d98a"];

const markUri = `data:image/svg+xml;base64,${Buffer.from(markSvg()).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f1317",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markUri} width={58} height={58} alt="" />
            <div style={{ color: "#eef2f7", fontSize: 31, fontWeight: 600, letterSpacing: 5 }}>
              HARVEST
            </div>
          </div>
          <div style={{ color: "#5a6872", fontSize: 22 }}>US registered · US operations</div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#eef2f7",
            fontSize: 74,
            lineHeight: 1.08,
            letterSpacing: -2.6,
            maxWidth: 940,
          }}
        >
          Intelligence needs contact with the real world.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", height: 8, width: "100%" }}>
            {RAMP.map((c) => (
              <div key={c} style={{ flex: 1, backgroundColor: c }} />
            ))}
          </div>
          <div style={{ color: "#93a4ae", fontSize: 25, display: "flex" }}>
            Teleoperated collection cells · every episode calibrated, scored, and
            delivered with its provenance attached
          </div>
        </div>
      </div>
    ),
    size
  );
}
