import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DemoFormProvider } from "@/components/DemoFormProvider";

// Rubik — the Yeda brand typeface. Vendored variable woff2 (Hebrew + Latin
// glyph coverage) so the build never depends on a network fetch and Hebrew
// never silently falls back to a system font.
const rubik = localFont({
  variable: "--font-rubik",
  display: "swap",
  src: [
    { path: "./fonts/rubik-hebrew-var.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/rubik-latin-var.woff2", weight: "300 700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yedatech.io"),
  title: "Yeda — the complete platform for organizational learning and training",
  description:
    "Yeda is a learning-management system (LMS) and digital content-production platform for organizations and educational institutions: HTML modules, avatar-based modules, interactive assessments, learner management, and end-to-end course production.",
  openGraph: {
    title: "Yeda — the complete platform for organizational learning",
    description:
      "An LMS and digital content-production platform for organizations and educational institutions.",
    locale: "en_US",
    type: "website",
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
        <DemoFormProvider>{children}</DemoFormProvider>
      </body>
    </html>
  );
}
