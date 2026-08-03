/**
 * Centralized English content for the Yedatech site.
 *
 * SOURCING RULE: every visible claim must be traceable to the live site
 * (yedatech.io / yedalabs.ai), Alon's written brief, or Alexey's direction.
 * No invented statistics, testimonials, client logos, awards, pricing or
 * product functionality. Contact details are authoritative and stay exact.
 *
 * ALEXEY'S CORRECTIONS applied here:
 *  - Zoom / Teams / Google / CRM are SYNCHRONISATION + API, not content
 *    creation.
 *  - Content ingestion is a headline capability: the platform builds the
 *    training plan AND the materials from PDFs, Word files, arbitrary uploads
 *    and YouTube video via speech-to-text.
 *  - Software training: the agent watches the screen.
 *  - Exactly two audiences, with genuinely different vocabulary. Education
 *    says "students"; organizations says "employees, suppliers, customers".
 *  - No creator / marketplace / course-resale positioning. No testimonials.
 *  - No pricing until Alexey confirms figures from the current Yeda LMS offer.
 */

import type { BySector, Sector } from "@/content/routes";

export const CONTACT = {
  email: "Info@Yedatech.io",
  phone: "074-769-1066",
  phoneHref: "tel:+972747691066",
} as const;

/* ── The two sectors ─────────────────────────────────────────────────────
   Alexey: "you can treat it as two platforms" — one for corporations, one
   for teaching students. The tab switches the whole site. */
export const SECTORS: { key: Sector; tab: string; aria: string }[] = [
  {
    key: "organizations",
    tab: "Organizations",
    aria: "Show the site for organizations and enterprises",
  },
  {
    key: "education",
    // "Education" rather than "Educational institutions": two single words
    // balance against "Organizations" and fit 375px without wrapping. The
    // Sector key stays `education`, so nothing downstream changes.
    tab: "Education",
    aria: "Show the site for universities, colleges and schools",
  },
];

export const DEFAULT_SECTOR: Sector = "organizations";

export const HERO: BySector<{
  title: string;
  subtitle: string;
  chips: readonly string[];
}> = {
  organizations: {
    title: "One platform for everything your organization needs to teach",
    subtitle:
      "Yeda builds the training plan and the learning materials from the documents you already have — then delivers them to employees, suppliers and customers, and shows you what actually landed.",
    chips: [
      "Employee, supplier and customer training",
      "AI learning agents",
      "CRM and meeting-platform sync",
      "Knowledge management",
    ],
  },
  education: {
    title: "One platform for teaching, examining and certifying students",
    subtitle:
      "Yeda gives universities, colleges and schools a single system for courses, students, examination and certification — with interactive modules built from the material lecturers already have.",
    chips: [
      "Course and student management",
      "Interactive and avatar modules",
      "Examinations and certificates",
      "Progress reporting",
    ],
  },
};

export const HERO_CTA = {
  primary: "Book a demo",
  secondary: "See the platform",
} as const;

/* ── Audience — exactly two ──────────────────────────────────────────────
   The creator / independent-instructor audience is deliberately absent:
   removed by Alon (messages 4, 5, 7 and the handoff) and by Alexey. */
export const AUDIENCES: BySector<{
  title: string;
  subtitle: string;
  items: readonly { key: string; title: string; body: string; icon: string }[];
}> = {
  organizations: {
    title: "Built for organizations that have to train people",
    subtitle:
      "Companies, enterprises, corporations and government bodies — and everyone connected to them.",
    items: [
      {
        key: "employees",
        title: "Employees",
        body: "Onboarding and role-based training, assigned automatically and tracked to completion.",
        icon: "Users",
      },
      {
        key: "suppliers",
        title: "Suppliers and partners",
        body: "Bring the people outside your payroll up to the same standard as the people inside it.",
        icon: "Handshake",
      },
      {
        key: "customers",
        title: "Customers",
        body: "Teach the people who buy your product how to use it, through the same platform.",
        icon: "UserRound",
      },
      {
        key: "government",
        title: "Government organizations",
        body: "Structured programmes with organizational portals, permissions and reporting.",
        icon: "Building2",
      },
    ],
  },
  education: {
    title: "Built for the institutions that teach students",
    subtitle:
      "Universities, colleges and schools running real course loads for real student bodies.",
    items: [
      {
        key: "universities",
        title: "Universities",
        body: "Course delivery, examination and certification managed across faculties in one system.",
        icon: "GraduationCap",
      },
      {
        key: "colleges",
        title: "Colleges",
        body: "Digital and in-person course management, student tracking and results in one place.",
        icon: "School",
      },
      {
        key: "schools",
        title: "Schools",
        body: "Structured lessons, interactive practice and progress reporting for pupils.",
        icon: "BookOpen",
      },
      {
        key: "students",
        title: "Students",
        body: "One place to find their courses, work through modules and see their results.",
        icon: "Users",
      },
    ],
  },
};

/* ── Capability library ──────────────────────────────────────────────────
   Keyed so route entries in routes.ts can select the relevant subset. Every
   entry is a verified capability from Alon's brief, the handoff, or Alexey. */
export const CAPABILITY_LIBRARY: Record<
  string,
  { title: string; body: string; icon: string }
> = {
  lms: {
    title: "LMS, LXP and LCMS",
    body: "Courses, learning paths, categories and users managed from one central system.",
    icon: "LayoutDashboard",
  },
  ingestion: {
    title: "Builds the plan and the materials",
    body: "Feed it PDFs, Word files, existing documents — even a YouTube video, which it reads through speech-to-text — and it produces both the training plan and the learning materials.",
    icon: "FileStack",
  },
  agents: {
    title: "AI learning agents",
    body: "Agents that guide people through business processes and answer their questions from the source material.",
    icon: "Bot",
  },
  "software-training": {
    title: "Software training",
    body: "To teach a program, the agent watches the screen and walks the user through it.",
    icon: "MonitorPlay",
  },
  avatars: {
    title: "Avatar-based learning",
    body: "A digital presenter combined with slides, video and practice, built as one complete learning unit.",
    icon: "UserRound",
  },
  "html-modules": {
    title: "Interactive HTML modules",
    body: "Rich units that combine text, media and practice on the same screen.",
    icon: "Sparkles",
  },
  simulations: {
    title: "Online simulations",
    body: "Interactive scenarios where people practise the task rather than read about it.",
    icon: "Boxes",
  },
  assessment: {
    title: "Assessment and certification",
    body: "Interactive tests, questionnaires, scoring and automatic certificates.",
    icon: "ClipboardCheck",
  },
  paths: {
    title: "Learning paths",
    body: "Sequenced programmes assigned by role, department or cohort.",
    icon: "Route",
  },
  schedules: {
    title: "Schedules and programme management",
    body: "Plan training calendars and manage programmes across groups.",
    icon: "CalendarDays",
  },
  live: {
    title: "Live learning",
    body: "Live sessions alongside recorded content, in the same programme.",
    icon: "Radio",
  },
  integrations: {
    title: "Synchronisation and API",
    body: "Yeda synchronises with CRMs and with live-meeting platforms including Zoom, Microsoft Teams and Google — and exposes an API to work with them directly.",
    icon: "Workflow",
  },
  portals: {
    title: "Organizational portals",
    body: "A branded space where each audience finds the learning assigned to it.",
    icon: "LayoutGrid",
  },
  students: {
    title: "Student management",
    body: "Enrolment, progress tracking and day-to-day management of the student body.",
    icon: "GraduationCap",
  },
  reporting: {
    title: "Reporting and analytics",
    body: "Dashboards, results and completion data in real time.",
    icon: "BarChart3",
  },
};

export const CAPABILITIES: BySector<{
  title: string;
  subtitle: string;
  keys: readonly string[];
}> = {
  organizations: {
    title: "One system, end to end",
    subtitle:
      "Everything works together — building the content, delivering it, assessing it, and reporting on it.",
    keys: [
      "ingestion",
      "agents",
      "software-training",
      "lms",
      "integrations",
      "reporting",
    ],
  },
  education: {
    title: "One system, end to end",
    subtitle:
      "Course delivery, interactive content, examination and reporting in a single platform.",
    keys: [
      "lms",
      "students",
      "html-modules",
      "avatars",
      "assessment",
      "reporting",
    ],
  },
};

/* ── Value band ──────────────────────────────────────────────────────────
   The full-width gradient band that closes the product story.

   This was `PRESENTER`, and it carried two more fields: a title, "Guided from
   both sides of the screen", and a lede claiming Yeda's learning agents sit
   alongside the interface and answer from the organization's own material.

   Both are gone with the presenter section. Alon's message 4 required the
   woman-left / man-right arrangement around the product interface, and that
   arrangement survives — it moved into MediaCarousel, which is where Figma
   "Home page 1.4" §4 draws it. The copy did not move with it, because the
   merged section already has a heading that describes what is on the screen,
   and because the agent characters themselves remain an open question for
   Alexey. An unanswered question should not be phrased as a shipped feature.

   Nothing here invents media, voice, play behaviour or a backend — the handoff
   is explicit that those are Alexey's to define, and that still holds. */
export const VALUE_BAND = {
  title: "Innovation that brings measurable value",
  body: "The same platform that delivers the training reports on what it achieved.",
  cta: "Book a demo",
} as const;

/* ── Capability bento ────────────────────────────────────────────────────
   Replaces the checkpoint's even 4-up card row and its numbered feature
   blocks. Spans sum to 6 per row, so one wide feature tile can lead and the
   supporting capabilities sit beside it. The lead tile is content ingestion —
   the capability Alexey described at length and every written brief omitted. */
export const BENTO: BySector<{
  title: string;
  lede: string;
  tiles: readonly { key: string; span: 2 | 3 | 4 | 6 }[];
}> = {
  organizations: {
    title: "Everything the organization needs to teach, in one system",
    lede: "Start from the documents you already have. Finish with people who can demonstrably do the job.",
    tiles: [
      { key: "ingestion", span: 4 },
      { key: "agents", span: 2 },
      { key: "software-training", span: 2 },
      { key: "integrations", span: 2 },
      { key: "assessment", span: 2 },
      { key: "portals", span: 3 },
      { key: "reporting", span: 3 },
    ],
  },
  education: {
    title: "Everything an institution needs to teach and examine",
    lede: "Course delivery, interactive material and certification, managed centrally rather than across separate tools.",
    tiles: [
      { key: "lms", span: 4 },
      { key: "students", span: 2 },
      { key: "html-modules", span: 2 },
      { key: "avatars", span: 2 },
      { key: "assessment", span: 2 },
      { key: "ingestion", span: 3 },
      { key: "reporting", span: 3 },
    ],
  },
};

/* ── Yeda Labs — content production ──────────────────────────────────── */
export const PRODUCTION = {
  title: "From an idea to a finished course",
  subtitle:
    "Yeda's production team builds the content with you — from learning design through to interactive modules ready to launch.",
  steps: [
    {
      title: "Learning design",
      body: "Course structure, learning objectives and the learner's experience.",
      icon: "PenTool",
    },
    {
      title: "Studio production",
      body: "Filming lessons, editing and professional video production.",
      icon: "Clapperboard",
    },
    {
      title: "Module development",
      body: "HTML and avatar modules, practice exercises and interactive tests.",
      icon: "Code2",
    },
    {
      title: "Launch support",
      body: "Publishing, enrolment and support in getting the course to its audience.",
      icon: "Rocket",
    },
  ],
} as const;

/* ── The numbered product flow ───────────────────────────────────────────
   Modelled on yedalabs.io's 01–05 sequence, and on Alexey's instruction that
   the flow screens should sit next to each other so a person can understand
   the platform from the pictures alone.

   This REPLACES the old PROCESS block, which described the sales engagement
   (discovery → setup → launch) rather than the product. Two five-step numbered
   sequences on one page compete, and PRODUCTION already carries the "we help
   you build it" story.

   `shot` keys index FLOW_SHOTS in content/media.ts. The media is shared between
   sectors; only the words change, which is the two-registers rule Alexey set. */
export const FLOW: BySector<{
  title: string;
  lede: string;
  steps: readonly { n: string; shot: string; title: string; body: string }[];
}> = {
  organizations: {
    title: "From the documents you already have to people who can do the job",
    lede: "Five steps, one platform. Nothing here needs a separate authoring tool, a separate video editor or a separate reporting stack.",
    steps: [
      {
        n: "01",
        shot: "ingest",
        title: "Bring the material you already have",
        body: "Procedures, presentations, PDFs, Word files, a recorded session — even a YouTube video, which the platform reads through speech-to-text.",
      },
      {
        n: "02",
        shot: "build",
        title: "Yeda builds the plan and the modules",
        body: "It produces the training plan for the role or the department, and the learning material that goes with it — not just an outline.",
      },
      {
        n: "03",
        shot: "shape",
        title: "Shape it the way your organization works",
        body: "Adjust the wording, the slides and the media, add practice and interaction, and record a presenter against the material.",
      },
      {
        n: "04",
        shot: "publish",
        title: "Publish it to the people who need it",
        body: "Finished lessons land in one library, then go out to employees, suppliers and customers by role, department or cohort.",
      },
      {
        n: "05",
        shot: "measure",
        title: "See what actually landed",
        body: "Completion, drop-off and the success rate on every question — so the next version is corrected on evidence, not on a hunch.",
      },
    ],
  },
  education: {
    title: "From the material lecturers already have to students who can show what they know",
    lede: "Five steps, one platform. Course structure, materials, examination and results stop living in four different systems.",
    steps: [
      {
        n: "01",
        shot: "ingest",
        title: "Start from the material lecturers already have",
        body: "Syllabi, lecture slides, PDFs, a recorded lesson — even a YouTube video, which the platform reads through speech-to-text.",
      },
      {
        n: "02",
        shot: "build",
        title: "Yeda builds the course plan and the modules",
        body: "It produces the structure for the module or the semester, and the learning material that goes with it — not just an outline.",
      },
      {
        n: "03",
        shot: "shape",
        title: "Shape it the way you teach",
        body: "Adjust the wording, the slides and the media, add practice and interaction, and record a lecturer against the material.",
      },
      {
        n: "04",
        shot: "publish",
        title: "Publish it to your students",
        body: "Finished lessons land in one searchable library, then go out to the cohorts that need them, on desktop or on a phone.",
      },
      {
        n: "05",
        shot: "measure",
        title: "See how the cohort is doing",
        body: "Completion, drop-off and the success rate on every question — so a lecturer can see where a cohort is stuck while it still matters.",
      },
    ],
  },
};

/** Real product names from the current site. */
export const FAMILY = {
  title: "The Yeda product family",
  subtitle: "One platform, several perspectives — one for each kind of organization and audience.",
  items: [
    { name: "Yeda LMS", body: "The learning management platform", icon: "LayoutDashboard", href: null },
    { name: "Yeda College", body: "Course and student management", icon: "GraduationCap", href: "/yeda-college/" },
    { name: "Yeda Org", body: "Learning and training in organizations", icon: "Building2", href: "/yeda-org/" },
    { name: "Yeda Labs", body: "Content production and AI tooling", icon: "FlaskConical", href: "/yedalabs/" },
    { name: "Yeda Tech", body: "Infrastructure and integrations", icon: "Cpu", href: "/yeda-tech/" },
    { name: "Yeda Hub", body: "A shared space for courses and content", icon: "LayoutGrid", href: "/yeda-hub/" },
  ],
} as const;

/**
 * Native multi-step demo-request wizard. No backend — submit opens a prefilled
 * mailto to the real Yeda inbox, so nothing is silently captured.
 * The "independent teacher" role option is gone with the creator audience.
 */
export const DEMO_FORM = {
  intro:
    "Looking for a platform to build and run digital learning? We would be glad to show you.",
  steps: [
    {
      key: "role",
      title: "What kind of organization are you?",
      type: "single" as const,
      options: [
        "Company or enterprise",
        "Government organization",
        "University or college",
        "School",
      ],
    },
    {
      key: "interest",
      title: "What are you interested in?",
      type: "single" as const,
      options: [
        "Learning management platform",
        "Building learning content from our material",
        "AI learning agents and software training",
        "Employee, supplier or customer training",
      ],
    },
    {
      key: "contact",
      title: "How can we reach you?",
      type: "contact" as const,
      fields: [
        { name: "name", label: "Full name", inputType: "text", required: true },
        { name: "email", label: "Email", inputType: "email", required: true },
        { name: "phone", label: "Phone", inputType: "tel", required: false },
        { name: "note", label: "Message (optional)", inputType: "textarea", required: false },
      ],
    },
  ],
  ui: {
    next: "Next",
    prev: "Back",
    submit: "Send",
    stepLabel: (n: number, total: number) => `Step ${n} of ${total}`,
    close: "Close",
    required: "This field is required",
    invalidEmail: "That email address is not valid",
    pickOne: "Choose one option",
    /* The inline contact section asks the same two questions as selects rather
       than radio lists, so it needs an empty first option. Chrome will happily
       show the first real option as if it were chosen otherwise. */
    selectPlaceholder: "Select an option",
  },
  success: {
    title: "Thank you",
    body: "We have opened an email ready to send to the Yeda team. We will get back to you shortly.",
  },
  mailSubject: "Demo request — Yeda",
} as const;

/**
 * The closing CTA varies by sector on the homepage and stays neutral on the 21
 * inner pages, which render through PageShell without a sector.
 */
export const FINAL_CTA = {
  title: "Ready to see Yeda in action?",
  subtitle: "We will build a demo around what you actually need to teach.",
  primaryCta: "Book a demo",
} as const;

export const FINAL_CTA_BY_SECTOR: BySector<{ subtitle: string }> = {
  organizations: {
    subtitle:
      "Bring one procedure or one existing deck, and we will show you the training your people would actually receive.",
  },
  education: {
    subtitle:
      "Bring one syllabus or one recorded lecture, and we will show you the course your students would actually see.",
  },
};

export const FOOTER = {
  tagline:
    "A complete platform for creating, managing and delivering digital learning.",
  legal: "All rights reserved.",
  strapline: "Learning management and digital content production.",
} as const;

/** Skip-link and other shared UI strings. */
export const UI = {
  skipToContent: "Skip to content",
  homeAriaLabel: "Yeda — go to homepage",
  primaryNav: "Primary",
  mobileNav: "Primary (mobile)",
  openMenu: "Open menu",
  closeMenu: "Close menu",
} as const;
