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
    default: "Harvest — Physical AI data infrastructure",
    template: "%s — Harvest",
  },
  description:
    "Harvest builds traceable, embodiment-matched robot datasets for physical AI — captured in real environments, QA-gated, and delivered with provenance.",
  openGraph: {
    title: "Harvest — Physical AI data infrastructure",
    description:
      "Traceable, embodiment-matched robot data captured in real environments and delivered with provenance.",
    url: SITE_URL,
    siteName: "Harvest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harvest — Physical AI data infrastructure",
    description:
      "Traceable, embodiment-matched robot data for physical AI.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
