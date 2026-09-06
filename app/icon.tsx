import { ImageResponse } from "next/og";
import { markSvg } from "@/lib/mark";

/**
 * Favicon: the mark alone on the panel ground.
 *
 * Satori can't render a React component tree, so the mark comes through as an
 * SVG data URI built from the same geometry the site component uses. Strokes
 * are opened up because hairlines disappear at 32px.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const uri = `data:image/svg+xml;base64,${Buffer.from(markSvg({ stroke: 4.4 })).toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f1317",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={uri} width={29} height={29} alt="" />
      </div>
    ),
    size
  );
}
