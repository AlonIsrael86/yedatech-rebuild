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
  title: "Yeda — פלטפורמה מלאה ליצירה, ניהול והפצה של למידה דיגיטלית",
  description:
    "Yeda היא מערכת למידה (LMS) והפקת תוכן דיגיטלי למכללות, ארגונים וגופי הדרכה: מודולי HTML, מודולים מבוססי אווטאר, מבחנים אינטראקטיביים, ניהול לומדים והפקת קורסים מקצה לקצה.",
  openGraph: {
    title: "Yeda — פלטפורמה מלאה ללמידה דיגיטלית",
    description:
      "מערכת LMS והפקת תוכן דיגיטלי למכללות, ארגונים וגופי הדרכה.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface">
        <DemoFormProvider>{children}</DemoFormProvider>
      </body>
    </html>
  );
}
