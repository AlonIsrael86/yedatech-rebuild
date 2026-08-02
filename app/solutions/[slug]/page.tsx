import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, metadataFor } from "@/components/PageShell";
import { SOLUTIONS, slugOf, solutionBySlug } from "@/content/routes";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map((r) => ({ slug: slugOf(r.path) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const route = solutionBySlug(slug);
  return route ? metadataFor(route) : {};
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const route = solutionBySlug(slug);
  if (!route) notFound();
  return <PageShell route={route} />;
}
