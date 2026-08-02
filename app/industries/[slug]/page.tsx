import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, metadataFor } from "@/components/PageShell";
import { INDUSTRIES, slugOf, industryBySlug } from "@/content/routes";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDUSTRIES.map((r) => ({ slug: slugOf(r.path) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const route = industryBySlug(slug);
  return route ? metadataFor(route) : {};
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const route = industryBySlug(slug);
  if (!route) notFound();
  return <PageShell route={route} />;
}
