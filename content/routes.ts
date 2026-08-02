/**
 * Route registry — the single source of truth for the site's information
 * architecture. Header nav, footer columns, sitemap.xml and every
 * generateStaticParams() read from here, so a page cannot exist without also
 * being linked and indexed.
 *
 * RANKING-SAFE RULE (Alexey): every path that already exists on yedatech.io
 * keeps its exact slug. Only genuinely new pages take a /solutions/ or
 * /industries/ prefix. Adding a /products/ prefix would break five ranking
 * URLs, so the product pages deliberately stay at their live paths.
 *
 * SEO RULE (Alexey): keywords live in the URL itself.
 */

export type Sector = "organizations" | "education";

/** Copy that differs between the two sectors Alexey defined. */
export type BySector<T> = Record<Sector, T>;

export type RouteGroup =
  | "home"
  | "solutions"
  | "industries"
  | "products"
  | "company";

export type RouteEntry = {
  /** Absolute path, always with a trailing slash to match the live site. */
  path: string;
  /** Short label used in navigation. */
  label: string;
  /** <h1> and hero heading. */
  title: string;
  /** One-line lede under the h1, also used as the meta description. */
  description: string;
  group: RouteGroup;
  /** Which sector this page primarily serves; "both" shows in either. */
  sector: Sector | "both";
  /** Whether the page already exists on the live WordPress site. */
  preserved: boolean;
  /** Capability keys from site.ts to render on the page body. */
  capabilities: readonly string[];
  /** Carousel id from media.ts. */
  gallery?: string;
};

/* ── Solutions — new pages, keyword-rich paths ───────────────────────────
   Naming follows yedalms.io, which already uses this pattern and is the
   structural reference Alexey told us to study. */
export const SOLUTIONS: readonly RouteEntry[] = [
  {
    path: "/solutions/lms-for-organizations/",
    label: "LMS for organizations",
    title: "A learning management system built for organizations",
    description:
      "Run employee, supplier and customer training on one platform — courses, learning paths, assessment, certificates and reporting.",
    group: "solutions",
    sector: "organizations",
    preserved: false,
    capabilities: ["lms", "paths", "assessment", "reporting", "portals"],
    gallery: "organizations-platform",
  },
  {
    path: "/solutions/lms-for-colleges/",
    label: "LMS for colleges",
    title: "A learning management system for colleges, universities and schools",
    description:
      "Manage students, courses, exams and certificates in one system — for universities, colleges and schools.",
    group: "solutions",
    sector: "education",
    preserved: false,
    capabilities: ["lms", "students", "assessment", "reporting"],
    gallery: "education-platform",
  },
  {
    path: "/solutions/employee-training/",
    label: "Employee training",
    title: "Employee training and onboarding",
    description:
      "Build onboarding and role-based training programmes, schedule them, and track completion across the organization.",
    group: "solutions",
    sector: "organizations",
    preserved: false,
    capabilities: ["paths", "schedules", "reporting", "ingestion"],
  },
  {
    path: "/solutions/customer-and-partner-training/",
    label: "Customer & partner training",
    title: "Training for customers, suppliers and partners",
    description:
      "Extend the same learning platform beyond your employees — to the suppliers, partners and end customers who need to know your product.",
    group: "solutions",
    sector: "organizations",
    preserved: false,
    capabilities: ["portals", "paths", "reporting"],
  },
  {
    path: "/solutions/ai-learning-agents/",
    label: "AI learning agents",
    title: "AI learning agents that train people on your software",
    description:
      "An AI agent guides users through software and business processes — watching the screen to teach the program itself.",
    group: "solutions",
    sector: "both",
    preserved: false,
    capabilities: ["agents", "software-training", "simulations"],
    gallery: "ai-and-agents",
  },
  {
    path: "/solutions/avatar-based-learning/",
    label: "Avatar-based learning",
    title: "Avatar-based learning modules",
    description:
      "A digital presenter combined with slides, video, HTML content and in-module practice — built as one complete learning unit.",
    group: "solutions",
    sector: "both",
    preserved: false,
    capabilities: ["avatars", "html-modules", "assessment"],
    gallery: "authoring",
  },
  {
    path: "/solutions/knowledge-management/",
    label: "Knowledge management",
    title: "Organizational knowledge management",
    description:
      "Turn the documents your organization already has into structured, searchable, teachable knowledge.",
    group: "solutions",
    sector: "organizations",
    preserved: false,
    capabilities: ["ingestion", "portals", "lms"],
  },
  {
    path: "/solutions/live-and-virtual-learning/",
    label: "Live & virtual learning",
    title: "Live learning, synchronised with the tools you already use",
    description:
      "Run live sessions and keep them in sync with Zoom, Microsoft Teams and Google — through native synchronisation and an open API.",
    group: "solutions",
    sector: "both",
    preserved: false,
    capabilities: ["live", "integrations", "schedules"],
    gallery: "integrations-and-live",
  },
] as const;

/* ── Industries — the category Alexey asked for ("training for the
   insurance industry, training for industry X, and so on") ───────────── */
export const INDUSTRIES: readonly RouteEntry[] = [
  {
    path: "/industries/insurance-training/",
    label: "Insurance",
    title: "Learning and training for the insurance industry",
    description:
      "Product, compliance and process training for insurers — delivered to employees, agents and brokers on one platform.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["paths", "assessment", "reporting", "software-training"],
  },
  {
    path: "/industries/financial-services-training/",
    label: "Financial services",
    title: "Learning and training for financial services",
    description:
      "Onboarding, product and process training for banks and financial institutions, with tracking and certification.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["paths", "assessment", "reporting"],
  },
  {
    path: "/industries/healthcare-training/",
    label: "Healthcare",
    title: "Learning and training for healthcare organizations",
    description:
      "Clinical and operational training for healthcare teams, with scheduling, assessment and completion reporting.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["paths", "schedules", "assessment"],
  },
  {
    path: "/industries/government-training/",
    label: "Government",
    title: "Learning and training for government organizations",
    description:
      "Structured training programmes for public-sector bodies, with organizational portals and reporting.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["portals", "paths", "reporting"],
  },
  {
    path: "/industries/technology-companies/",
    label: "Technology",
    title: "Learning solutions for technology companies",
    description:
      "Train employees, partners and customers on your own software — including AI agents that teach the product itself.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["software-training", "agents", "portals"],
  },
  {
    path: "/industries/manufacturing-training/",
    label: "Manufacturing",
    title: "Learning and training for manufacturing",
    description:
      "Process, safety and equipment training for production teams, with simulations and practical assessment.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["simulations", "assessment", "schedules"],
  },
  {
    path: "/industries/retail-training/",
    label: "Retail",
    title: "Learning and training for retail",
    description:
      "Onboard and train distributed store teams with short modules, scheduling and completion tracking.",
    group: "industries",
    sector: "organizations",
    preserved: false,
    capabilities: ["paths", "schedules", "reporting"],
  },
  {
    path: "/industries/higher-education/",
    label: "Higher education",
    title: "Learning solutions for higher education",
    description:
      "Course delivery, examination and certification for universities and colleges, managed centrally.",
    group: "industries",
    sector: "education",
    preserved: false,
    capabilities: ["lms", "students", "assessment"],
  },
] as const;

/* ── Products — PRESERVED live slugs, do not add a prefix ────────────────
   These five paths rank today on yedatech.io. */
export const PRODUCTS: readonly RouteEntry[] = [
  {
    path: "/yeda-org/",
    label: "Yeda Org",
    title: "Yeda Org — learning and training for organizations",
    description:
      "The organizational view of the Yeda platform: employee, supplier and customer training, portals and reporting.",
    group: "products",
    sector: "organizations",
    preserved: true,
    capabilities: ["lms", "portals", "paths", "reporting"],
    gallery: "organizations-platform",
  },
  {
    path: "/yeda-college/",
    label: "Yeda College",
    title: "Yeda College — course and student management for institutions",
    description:
      "Manage students, courses, exams and certificates for colleges, universities and schools.",
    group: "products",
    sector: "education",
    preserved: true,
    capabilities: ["lms", "students", "assessment", "reporting"],
    gallery: "education-platform",
  },
  {
    path: "/yedalabs/",
    label: "Yeda Labs",
    title: "Yeda Labs — digital learning content production",
    description:
      "The production studio: learning design, studio filming, HTML and avatar module development, and launch support.",
    group: "products",
    sector: "both",
    preserved: true,
    capabilities: ["avatars", "html-modules", "ingestion"],
    gallery: "authoring",
  },
  {
    path: "/yeda-tech/",
    label: "Yeda Tech",
    title: "Yeda Tech — platform infrastructure and integrations",
    description:
      "The technology layer: synchronisation with CRMs and live-meeting platforms, and an open API.",
    group: "products",
    sector: "both",
    preserved: true,
    capabilities: ["integrations", "agents", "software-training"],
    gallery: "integrations-and-live",
  },
  {
    path: "/yeda-hub/",
    label: "Yeda Hub",
    title: "Yeda Hub — a shared space for courses and content",
    description:
      "A central space where an organization's courses and learning content are organised and made available to its people.",
    group: "products",
    sector: "both",
    preserved: true,
    capabilities: ["portals", "lms"],
  },
] as const;

export const ALL_ROUTES: readonly RouteEntry[] = [
  ...SOLUTIONS,
  ...INDUSTRIES,
  ...PRODUCTS,
] as const;

/** Slug helpers for generateStaticParams(). */
export const slugOf = (path: string) =>
  path.replace(/^\/[^/]+\//, "").replace(/\/$/, "");

export const findByPath = (path: string) =>
  ALL_ROUTES.find((r) => r.path === path);

export const solutionBySlug = (slug: string) =>
  SOLUTIONS.find((r) => slugOf(r.path) === slug);

export const industryBySlug = (slug: string) =>
  INDUSTRIES.find((r) => slugOf(r.path) === slug);

/**
 * Paths that exist on the live WordPress site and are not yet rebuilt.
 * Listed so the gap is explicit and nothing is silently dropped when the new
 * site eventually replaces production.
 *
 * The 29 Hebrew article slugs under /blog/ are deliberately excluded from the
 * new sitemap until they are migrated verbatim — Alexey's rule is that their
 * text and URL must not change, so they stay on WordPress for now.
 */
export const NOT_YET_MIGRATED: readonly string[] = [
  "/about/",
  "/contact-us/",
  "/prices/", // keeps its URL, but content is gated on Alexey confirming Yeda LMS pricing
  "/lessons-photography/",
  "/blog/",
  "/איך-המערכת-עובדת/",
  "/תודה/",
] as const;
