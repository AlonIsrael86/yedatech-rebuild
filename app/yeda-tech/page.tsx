import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, metadataFor } from "@/components/PageShell";
import { findByPath } from "@/content/routes";

// Preserved live slug — this path already ranks on yedatech.io, so it must not
// move under a /products/ prefix.
const ROUTE = findByPath("/yeda-tech/");

export const metadata: Metadata = ROUTE ? metadataFor(ROUTE) : {};

export default function Page() {
  if (!ROUTE) notFound();
  return <PageShell route={ROUTE} />;
}
