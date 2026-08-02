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
    tab: "Educational institutions",
    aria: "Show the site for universities, colleges and schools",
  },
];

export const DEFAULT_SECTOR: Sector = "organizations";

export const HERO: BySector<{
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: readonly string[];
}> = {
  organizations: {
    eyebrow: "Organizational learning and knowledge management",
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
    eyebrow: "Learning management for institutions",
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

export const CREDIBILITY: BySector<{
  title: string;
  subtitle: string;
  statements: readonly string[];
}> = {
  organizations: {
    title: "The whole training process, in one place",
    subtitle:
      "From the source material to the finished programme to the reporting — Yeda covers every stage rather than one slice of it.",
    statements: [
      "LMS, LXP and LCMS",
      "AI-assisted module creation",
      "Organizational portals",
      "Reporting and certification",
    ],
  },
  education: {
    title: "The whole learning journey, in one place",
    subtitle:
      "Course delivery, interactive content, examination and certification — managed centrally instead of across separate tools.",
    statements: [
      "Course and student management",
      "Interactive and avatar modules",
      "Examinations and certificates",
      "Progress and results reporting",
    ],
  },
};

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

/* ── Numbered feature showcase ───────────────────────────────────────────
   The Figma's signature composition: big index + product panel, alternating
   sides. Photo accents are gone — Alexey rejected the stock imagery and the
   side characters are his own widget platform, not ours to build. */
export const FEATURE_BLOCKS: BySector<{
  eyebrow: string;
  title: string;
  subtitle: string;
  blocks: readonly {
    n: string;
    title: string;
    body: string;
    panel: "dashboard" | "html" | "avatar" | "video";
  }[];
}> = {
  organizations: {
    eyebrow: "How it works",
    title: "From the documents you have to the training you need",
    subtitle:
      "Four capabilities that work as one process, not four separate tools.",
    blocks: [
      {
        n: "01",
        title: "Turn existing material into a programme",
        body: "PDFs, Word files, internal documents and video go in. A structured training plan and the learning materials come out.",
        panel: "dashboard",
      },
      {
        n: "02",
        title: "Interactive modules, not slide decks",
        body: "Units that combine text, media and practice on the same screen, so people do the task instead of reading about it.",
        panel: "html",
      },
      {
        n: "03",
        title: "Agents that teach your software",
        body: "An AI agent watches the screen and guides people through the program and the business process behind it.",
        panel: "avatar",
      },
      {
        n: "04",
        title: "Assessment and evidence",
        body: "Embedded questions, tests and automatic certificates — with reporting that shows what actually landed.",
        panel: "video",
      },
    ],
  },
  education: {
    eyebrow: "How it works",
    title: "From course material to examined, certified students",
    subtitle:
      "Four capabilities that work as one process, not four separate tools.",
    blocks: [
      {
        n: "01",
        title: "Manage courses and students centrally",
        body: "Courses, cohorts, enrolment and results in one system rather than spread across separate tools.",
        panel: "dashboard",
      },
      {
        n: "02",
        title: "Interactive learning units",
        body: "Modules that combine text, media and practice on the same screen, so students work through the material actively.",
        panel: "html",
      },
      {
        n: "03",
        title: "Avatar-led lessons",
        body: "A digital presenter carries the lesson alongside slides and practice, built as one complete unit.",
        panel: "avatar",
      },
      {
        n: "04",
        title: "Examination and certification",
        body: "Interactive examinations with embedded questions, automatic scoring and certificates.",
        panel: "video",
      },
    ],
  },
};

/* ── Coded product surfaces ──────────────────────────────────────────────
   These are CODED recreations, not screenshots, and are clearly labelled as
   illustrations. They are interim: Alexey wants real platform screens here,
   so they stay only until he confirms which Figma frames to use. */
export const PRODUCT = {
  dashboard: {
    caption: "Illustration of the platform interface",
    title: "Dashboard",
    kpis: [
      { label: "Total tests", value: "8" },
      { label: "Total questions", value: "156" },
      { label: "Avg. tests per course", value: "3" },
      { label: "Avg. questions per course", value: "12" },
    ],
    donut: {
      title: "Learners who passed",
      total: "100",
      legend: [
        { label: "High score", value: 60, color: "var(--color-ok)" },
        { label: "Average score", value: 30, color: "var(--color-warn)" },
        { label: "Did not pass", value: 10, color: "var(--color-err)" },
      ],
    },
    nav: [
      "Dashboard",
      "Categories",
      "Courses",
      "Certificates",
      "Tests",
      "Settings",
    ],
  },
} as const;

export const AVATAR = {
  panel: {
    caption: "Illustration of an avatar module",
    presenterTag: "Avatar presenter",
    slideTitle: "Unit 3 · Principles of digital learning",
    quiz: {
      tag: "Practice",
      question: "What is the main advantage of an avatar-based module?",
      options: [
        "Learning at your own pace",
        "Several formats combined in one unit",
        "Printing a workbook",
      ],
      correctIndex: 1,
    },
  },
} as const;

export const SURFACES = {
  html: {
    caption: "Interactive HTML module",
    unit: "Unit 2 · Structure of the lesson",
    accordion: "Select to expand this topic",
    callout: "Tip: text, media and practice can share one screen.",
  },
  video: {
    caption: "Video with an embedded question",
    tag: "Embedded question",
    time: "02:14",
    duration: "08:30",
    question: "What does this unit cover?",
    options: ["Structuring a digital course", "Video editing"],
    cta: "Continue",
  },
} as const;

/* ── Yeda Labs — content production ──────────────────────────────────── */
export const PRODUCTION = {
  eyebrow: "Yeda Labs — the production studio",
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

export const PROCESS = {
  title: "How working with Yeda starts",
  subtitle:
    "A clear, supported process — from the first conversation through to measurement and improvement.",
  steps: [
    { n: "01", title: "Discovery", body: "Understanding the needs, the audience and the goals." },
    { n: "02", title: "Setup", body: "Configuring the system, learning paths and permissions." },
    { n: "03", title: "Content", body: "Producing courses, modules and assessments." },
    { n: "04", title: "Launch", body: "Publishing, enrolment and distribution to learners." },
    { n: "05", title: "Measure", body: "Reporting, oversight and continuous improvement." },
  ],
} as const;

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
  },
  success: {
    title: "Thank you",
    body: "We have opened an email ready to send to the Yeda team. We will get back to you shortly.",
  },
  mailSubject: "Demo request — Yeda",
} as const;

export const FINAL_CTA = {
  title: "Ready to see Yeda in action?",
  subtitle: "We will build a demo around what you actually need to teach.",
  primaryCta: "Book a demo",
} as const;

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
