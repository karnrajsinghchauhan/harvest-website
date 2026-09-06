import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/links";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harvest — measured robot data, collected in the US",
    template: "%s — Harvest",
  },
  description:
    "Harvest runs teleoperated collection cells that produce embodiment-matched robot data: every episode calibrated, QA-gated, and delivered in GR00T LeRobot format with its provenance attached.",
  openGraph: {
    title: "Harvest — measured robot data, collected in the US",
    description:
      "Teleoperated collection cells producing embodiment-matched robot data. Calibrated, QA-gated, delivered with provenance attached.",
    url: SITE_URL,
    siteName: "Harvest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harvest — measured robot data, collected in the US",
    description:
      "Teleoperated collection cells producing embodiment-matched robot data.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
