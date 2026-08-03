import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/FinalCta";
import { MediaCarousel } from "@/components/MediaCarousel";
import { CapabilityGrid } from "@/components/Sections";
import { Flow } from "@/components/Flow";
import { Container, Button, SectionShell, GlowCard } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { UI, HERO_CTA, DEFAULT_SECTOR } from "@/content/site";
import { getGallery } from "@/content/media";
import { SOLUTIONS, INDUSTRIES, PRODUCTS, type RouteEntry } from "@/content/routes";

const SITE = "https://www.yedatech.io";

const GROUP_LABEL: Record<RouteEntry["group"], string> = {
  home: "Home",
  solutions: "Solutions",
  industries: "Industries",
  products: "Products",
  company: "Company",
};

/** Per-page metadata with a canonical URL, built from the route registry. */
export function metadataFor(route: RouteEntry): Metadata {
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: route.path },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${SITE}${route.path}`,
      type: "website",
    },
  };
}

function Breadcrumbs({ route }: { route: RouteEntry }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: GROUP_LABEL[route.group],
        item: `${SITE}${route.path}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: route.label,
        item: `${SITE}${route.path}`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-[14px] text-white/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-white/80">{GROUP_LABEL[route.group]}</li>
        </ol>
      </nav>
    </>
  );
}

/** Sibling links keep every page in the same group reachable from any of them. */
function RelatedPages({ route }: { route: RouteEntry }) {
  const pool =
    route.group === "solutions"
      ? SOLUTIONS
      : route.group === "industries"
        ? INDUSTRIES
        : PRODUCTS;
  const siblings = pool.filter((r) => r.path !== route.path);
  if (siblings.length === 0) return null;

  return (
    <SectionShell align="start" title={`More ${GROUP_LABEL[route.group].toLowerCase()}`}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siblings.map((r) => (
          <li key={r.path}>
            <Link href={r.path} className="block h-full">
              <GlowCard tone="lift" interactive className="h-full p-5">
                <span className="block text-[17px] font-bold text-navy">
                  {r.label}
                </span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-slate">
                  {r.description}
                </span>
              </GlowCard>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/**
 * Shared layout for every solution, industry and product page. Content comes
 * entirely from the route registry and the capability library, so adding a
 * page is a data change rather than a new component.
 */
export function PageShell({ route }: { route: RouteEntry }) {
  const gallery = getGallery(route.gallery);

  /* Inner pages replace the old engagement rail with the numbered product flow.
     They are not wrapped in SectorPanel, so they show one fixed register: the
     page's own sector, or the default where a page serves both. */
  const flowSector = route.sector === "both" ? DEFAULT_SECTOR : route.sector;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:end-4 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-royal focus:px-4 focus:py-2 focus:text-[16px] focus:font-semibold focus:text-white focus:shadow-[var(--shadow-float)]"
      >
        {UI.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden bg-navy text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 460px at 82% -14%, rgba(10,89,235,0.62), transparent 62%)",
            }}
          />
          <Container className="relative py-14 sm:py-20">
            <Breadcrumbs route={route} />
            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl">
              {route.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {route.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <DemoButton variant="primary" withArrow>
                {HERO_CTA.primary}
              </DemoButton>
              <Button
                href="/#platform"
                variant="secondary"
                className="bg-white/10 text-white ring-white/20 hover:bg-white/15"
              >
                {HERO_CTA.secondary}
              </Button>
            </div>
          </Container>
        </section>

        <SectionShell
          ground="canvas"
          align="start"
          title="What this includes"
          lede="Every capability below is part of the same platform."
        >
          <CapabilityGrid keys={route.capabilities} />
        </SectionShell>

        {gallery ? <MediaCarousel gallery={gallery} /> : null}

        <Flow sector={flowSector} />
        <RelatedPages route={route} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
