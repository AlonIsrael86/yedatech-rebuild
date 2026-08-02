import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DemoFormProvider } from "@/components/DemoFormProvider";
import { SectorProvider } from "@/components/SectorProvider";

// Rubik — the Yeda brand typeface. Vendored variable woff2 (Latin + Hebrew
// glyph coverage) so the build never depends on a network fetch. Hebrew
// coverage stays because the 29 Hebrew article pages are still to be migrated.
const rubik = localFont({
  variable: "--font-rubik",
  display: "swap",
  src: [
    { path: "./fonts/rubik-latin-var.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/rubik-hebrew-var.woff2", weight: "300 700", style: "normal" },
  ],
});

const SITE = "https://www.yedatech.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "Yeda — organizational learning and knowledge management platform",
    template: "%s | Yeda",
  },
  description:
    "Yeda is a learning platform for organizations and educational institutions. It builds training plans and learning materials from your own documents and video, delivers them through an LMS, LXP and LCMS, and synchronises with your CRM and meeting platforms.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yeda — organizational learning and knowledge management platform",
    description:
      "A complete learning platform for organizations, enterprises, universities, colleges and schools.",
    locale: "en",
    type: "website",
    url: SITE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface">
        <SectorProvider>
          <DemoFormProvider>{children}</DemoFormProvider>
        </SectorProvider>
      </body>
    </html>
  );
}
