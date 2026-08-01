/**
 * Centralized English content for the Yedatech homepage.
 *
 * SOURCING RULE (from HANDOFF.md): every visible claim must be traceable to the
 * live site (yedatech.io) or supplied Yeda materials. No invented statistics,
 * testimonials, client logos, awards, pricing, or product functionality.
 * Contact details are authoritative and must stay exact.
 *
 * Positioning (Alon 2026-07-27 + Alexey): English-first, for ORGANIZATIONS and
 * EDUCATIONAL INSTITUTIONS only — no independent-creator / course-marketplace /
 * reseller language. Product names kept as-is.
 */

export const CONTACT = {
  email: "Info@Yedatech.io",
  phone: "074-769-1066",
  phoneHref: "tel:+972747691066",
} as const;

export const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#audiences" },
  { label: "Product", href: "#product" },
  { label: "Resources", href: "#resources" },
] as const;

export const HERO = {
  eyebrow: "Learning management & digital content platform",
  title: "The complete enterprise learning and knowledge platform",
  subtitle:
    "Yeda unites an advanced learning-management system with a content-production studio — so organizations and educational institutions can build, manage, and scale learning in one place.",
  primaryCta: "Book a demo",
  secondaryCta: "Explore the platform",
  recordLabel: "Video recording",
  // Man/woman presenter characters flanking the hero product (real transparent
  // cutouts exported from Alexey's Figma). Lines are verified value-prop, not claims.
  characters: {
    woman: {
      src: "/media/character-woman.png",
      alt: "Illustration of a presenter",
      line: "Build and manage learning in one place.",
    },
    man: {
      src: "/media/character-man.png",
      alt: "Illustration of a presenter",
      line: "Train employees, partners, and customers.",
    },
  },
  // Banner photo carousel (hero left column, English LTR). Real photos exported
  // from Figma — Org 199:6051, College 199:5468, Xxiter 592:260 (app.yedalabs.io),
  // Labs 85:3928. People face inward (right, toward the copy); `flip` mirrors any
  // shot facing outward. Never flip a photo that contains readable text.
  banner: {
    slides: [
      { src: "/media/banner/org.png", alt: "A team using Yeda across an organization", flip: false },
      { src: "/media/banner/college.png", alt: "A student learning with Yeda at a college", flip: false },
      { src: "/media/banner/xxiter.png", alt: "A professional working with Yeda on a laptop", flip: true },
      { src: "/media/banner/labs.png", alt: "Yeda Labs content production", flip: false },
    ],
  },
  chips: [
    "HTML & avatar modules",
    "Interactive assessments",
    "College & organization management",
    "Content-production studio",
  ],
} as const;

/** Verified capability statements used as the credibility layer (not metrics). */
export const CREDIBILITY = {
  title: "One solution for the entire learning journey",
  subtitle:
    "From system setup to content production and delivery — Yeda supports every stage of digital learning under one roof.",
  statements: [
    "Full LMS / LCMS",
    "Digital course production",
    "Assessments, quizzes & certificates",
    "Avatar-based modules",
  ],
} as const;

export const AUDIENCES = {
  title: "Built for organizations and institutions",
  subtitle: "Every organization gets what it needs — without compromising on the rest.",
  items: [
    {
      key: "enterprises",
      title: "Enterprises & companies",
      body: "Employee, supplier, and customer training with learning paths, progress tracking, and reporting.",
      icon: "Building2",
    },
    {
      key: "government",
      title: "Government & public sector",
      body: "Structured training and knowledge management for public-sector teams and programs.",
      icon: "Landmark",
    },
    {
      key: "higher-ed",
      title: "Universities & colleges",
      body: "Manage digital and in-person courses, assessments, certificates, and analytics in one system.",
      icon: "GraduationCap",
    },
    {
      key: "schools",
      title: "Schools",
      body: "Digital learning, interactive content, and assessments for schools and their teachers.",
      icon: "School",
    },
  ],
} as const;

export const CAPABILITIES = {
  eyebrow: "One system",
  title: "One system, end-to-end capabilities",
  subtitle:
    "Everything works together — manage, create, deliver, assess, and measure learning in one place.",
  items: [
    {
      title: "LMS / LXP / LCMS",
      body: "Manage courses, learning paths, categories, and users in one central system.",
      icon: "LayoutDashboard",
    },
    {
      title: "AI learning agents",
      body: "Agents that guide learners through software and business processes, step by step.",
      icon: "Bot",
    },
    {
      title: "Avatar learning",
      body: "Digital presenters that deliver lessons in voice and vision inside a learning unit.",
      icon: "UserRound",
    },
    {
      title: "Simulations & interactive",
      body: "Hands-on simulations and interactive modules that turn learning into practice.",
      icon: "MousePointerClick",
    },
    {
      title: "Live learning & schedules",
      body: "Virtual and classroom sessions, cohorts, instructors, and structured schedules.",
      icon: "CalendarDays",
    },
    {
      title: "Assessment",
      body: "Interactive tests, quizzes, grading, and automatic certificates.",
      icon: "ClipboardCheck",
    },
    {
      title: "Analytics",
      body: "Dashboards, assessment statistics, and real-time performance reports.",
      icon: "BarChart3",
    },
    {
      title: "Integrations",
      body: "Zoom, Microsoft Teams, and Google sync plus CRM and enterprise-system connections.",
      icon: "Plug",
    },
  ],
} as const;

/**
 * AI-powered learning — concrete applications only (no vague "AI-powered"
 * claims). Whether each item is live vs. roadmap is confirmed with Alexey; copy
 * stays capability-level, never metric or customer claims.
 */
export const AI_LEARNING = {
  eyebrow: "AI-powered learning",
  title: "AI that supports learning at the moment of need",
  subtitle:
    "Practical AI across the learning workflow — from authoring content to guiding people through software and surfacing the right knowledge in the flow of work.",
  features: [
    {
      title: "AI learning agents",
      body: "Guide users through software and business processes, step by step.",
      icon: "Bot",
    },
    {
      title: "AI-assisted authoring",
      body: "Draft and assemble learning modules faster, with AI support.",
      icon: "Wand2",
    },
    {
      title: "Learning avatars",
      body: "Digital presenters that deliver lessons in voice and vision.",
      icon: "UserRound",
    },
    {
      title: "Contextual guidance",
      body: "Surface the right knowledge and support exactly when it's needed.",
      icon: "Compass",
    },
  ],
  cta: "Explore AI Learning",
} as const;

/**
 * Integrations — ONLY vendors confirmed in Yeda materials are named (Zoom,
 * Microsoft Teams, Google, CRM). Remaining categories are shown generically with
 * no invented vendor logos until the client supplies the verified list.
 */
export const INTEGRATIONS = {
  eyebrow: "Integrations",
  title: "Works with the tools your teams already use",
  subtitle: "Connect learning to your existing stack — no rip-and-replace.",
  note: "Showing confirmed integrations. The full list lives on the integrations page.",
  groups: [
    { title: "Video conferencing", items: ["Zoom", "Microsoft Teams", "Google Meet"], confirmed: true },
    { title: "CRM", items: ["CRM synchronization"], confirmed: true },
    { title: "Productivity & collaboration", items: ["Google Workspace"], confirmed: true },
    { title: "Identity & user management", items: ["Single sign-on & user provisioning"], confirmed: false },
    { title: "Enterprise systems", items: ["HR & enterprise system connections"], confirmed: false },
  ],
  cta: "View All Integrations",
} as const;

/**
 * Custom solutions & services — capability-level services story. Reuses the
 * PRODUCTION (Yeda Labs studio) steps as the "our team builds it with you" detail.
 */
export const CUSTOM_SOLUTIONS = {
  eyebrow: "Custom solutions & services",
  title: "Built around your organization — not the other way around",
  subtitle:
    "For complex institutional and organizational requirements, Yeda's team designs, builds, and rolls the solution out with you.",
  items: [
    { title: "Custom learning environments", icon: "Boxes" },
    { title: "Branded organizational portals", icon: "Palette" },
    { title: "Custom integrations", icon: "Plug" },
    { title: "Specialized learning workflows", icon: "Workflow" },
    { title: "Simulations & interactive modules", icon: "MousePointerClick" },
    { title: "Implementation & professional services", icon: "Handshake" },
  ],
  cta: "Discuss Your Requirements",
} as const;

/**
 * Resource center — DEFERRED. Real articles arrive later; the section renders
 * only when `items` is non-empty, so nothing is fabricated in the meantime.
 */
export const RESOURCES = {
  eyebrow: "Resources",
  title: "Insights on organizational learning and knowledge",
  subtitle:
    "Guides and articles on organizational learning, education technology, and AI-driven knowledge management.",
  cta: "Visit the Resource Center",
  // Honest topic areas shown until real articles are published (no fake titles).
  topics: [
    {
      title: "Organizational learning",
      body: "Guides on building, managing, and scaling learning across teams.",
      icon: "Building2",
    },
    {
      title: "Education technology",
      body: "How institutions run digital, blended, and live learning programs.",
      icon: "GraduationCap",
    },
    {
      title: "AI & knowledge management",
      body: "Putting AI agents and organizational knowledge to work in learning.",
      icon: "Bot",
    },
  ],
  items: [] as ReadonlyArray<{
    title: string;
    kind: string;
    href: string;
    excerpt?: string;
  }>,
} as const;

/**
 * Customer success story — DEFERRED. Needs a real, named customer + verified
 * result + quote. Stays `null` (section hidden) until the client supplies one.
 */
export const CASE_STUDY: {
  customerType: string;
  challenge: string;
  solution: string;
  result: string;
  quote: string;
  attribution: string;
  href: string;
} | null = null;

export const PRODUCT = {
  eyebrow: "A look inside",
  title: "The system behind the learning",
  subtitle:
    "Real screens from the system — HTML content modules and interactive video with embedded questions. Shown for illustration only.",
  // Coded conceptual dashboard (recreated from the Figma product frames).
  dashboard: {
    caption: "Illustration of the system interface",
    title: "Dashboard",
    kpis: [
      { label: "Total tests", value: "8" },
      { label: "Total questions", value: "156" },
      { label: "Avg. tests / course", value: "3" },
      { label: "Avg. questions / course", value: "12" },
    ],
    donut: {
      title: "Students who passed",
      total: "100",
      legend: [
        { label: "High score", value: 60, color: "var(--color-ok)" },
        { label: "Average score", value: 30, color: "var(--color-warn)" },
        { label: "Failed", value: 10, color: "var(--color-err)" },
      ],
    },
  },
  avatarModule: {
    tag: "Avatar-based module",
    title: "Interactive lesson",
    body: "Avatar modules that combine a filmed presenter, slides, and practice — inside a single learning unit.",
  },
} as const;

/**
 * Avatar-based learning — a capability Alexey named as a headline. Copy
 * describes the real feature (avatar presenter combined with slide, video and
 * HTML content plus in-module practice). The quiz text is a clearly-labeled
 * illustration, not a claim about a specific course.
 */
export const AVATAR = {
  eyebrow: "Avatar-based learning",
  title: "Avatar, slides, and practice — in one learning unit",
  subtitle:
    "Avatar-based modules that combine a digital presenter, slides, and interactive content — a rich learning experience built as one complete unit.",
  points: [
    {
      title: "Avatar presenter",
      body: "A digital presenter that guides the learner through the unit in voice and vision.",
      icon: "UserRound",
    },
    {
      title: "Mixed formats",
      body: "Slides, video, and HTML modules combined in the same learning unit.",
      icon: "Layers",
    },
    {
      title: "In-module practice",
      body: "Interactive questions and practice embedded directly in the learning.",
      icon: "ClipboardCheck",
    },
  ],
  panel: {
    caption: "Illustration of an avatar module",
    presenterTag: "Avatar presenter",
    slideTitle: "Unit 3 · Principles of digital learning",
    quiz: {
      tag: "Practice",
      question: "What is the main advantage of an avatar-based module?",
      options: ["Self-paced learning", "Mixed formats in one unit", "Printing a booklet"],
      correctIndex: 1,
    },
  },
} as const;

/**
 * Two more real product surfaces (coded, labeled as illustrations): an HTML
 * learning module and a video player with an embedded question — both verified
 * Yeda capabilities from the live site.
 */
export const SURFACES = {
  html: {
    caption: "Interactive HTML module",
    unit: "Unit 2 · Lesson structure",
    accordion: "Click to expand",
    callout: "Tip: combine text, image, and practice on the same screen.",
  },
  video: {
    caption: "Video with an embedded question",
    time: "02:14",
    duration: "08:30",
    question: "What did we learn in this unit?",
    options: ["Digital course structure", "Video editing"],
    cta: "Continue",
  },
} as const;

/**
 * Numbered feature showcase — the Figma's signature composition (big index +
 * product panel with a floating photo accent, alternating sides). Each block
 * pairs a coded product surface with a real photo from Alexey's Figma. Content
 * is verified capability; no pricing/invented specifics.
 */
export const FEATURE_BLOCKS = {
  eyebrow: "Platform in action",
  title: "See the platform at work",
  subtitle:
    "Five core experiences that work together — from the LMS dashboard to AI agents, avatars, simulations, and live learning.",
  blocks: [
    {
      n: "01",
      title: "LMS / LXP dashboard",
      body: "Manage courses, paths, learners, and certificates — with real-time data and analytics.",
      panel: "dashboard",
      photo: "/media/professional-laptop.png",
      alt: "A professional learning on a laptop",
    },
    {
      n: "02",
      title: "AI learning agent",
      body: "A Yeda Labs AI agent that guides people through software and business processes, in the flow of work.",
      panel: "aiagent",
      photo: null,
      alt: "",
    },
    {
      n: "03",
      title: "Avatar-based learning",
      body: "A digital presenter that combines slides, video, and practice — into one complete learning unit.",
      panel: "avatar",
      photo: null,
      alt: "",
    },
    {
      n: "04",
      title: "Simulations & interactive",
      body: "Hands-on simulations and interactive modules that turn learning into real practice.",
      panel: "html",
      photo: null,
      alt: "",
    },
    {
      n: "05",
      title: "Live learning",
      body: "Live virtual and classroom sessions with schedules, plus recorded lessons on demand.",
      panel: "video",
      photo: null,
      alt: "",
    },
  ],
} as const;

export const PRODUCTION = {
  eyebrow: "Production studio — Yeda Labs",
  title: "From idea to a ready course",
  subtitle:
    "Yeda's production team builds the content with you — from learning design to interactive modules ready to launch.",
  steps: [
    { title: "Learning design", body: "Building the course structure, learning goals, and learner experience.", icon: "PenTool" },
    { title: "Studio filming & production", body: "Lesson filming, editing, and professional video production.", icon: "Clapperboard" },
    { title: "Module development", body: "HTML and avatar modules, practice, and interactive assessments.", icon: "Code2" },
    { title: "Launch & rollout support", body: "Publishing, enrollment, and support for rolling the course out to your audience.", icon: "Rocket" },
  ],
} as const;

export const PROCESS = {
  title: "How to get started with Yeda",
  subtitle: "A clear, guided process — from the first conversation to measurement and continuous improvement.",
  steps: [
    { n: "01", title: "Discovery", body: "Understanding your needs, audience, and goals." },
    { n: "02", title: "Setup", body: "Configuring the system, paths, and permissions." },
    { n: "03", title: "Content", body: "Producing courses, modules, and assessments." },
    { n: "04", title: "Launch", body: "Publishing, enrollment, and rollout to learners." },
    { n: "05", title: "Measure & improve", body: "Reports, analytics, and continuous optimization." },
  ],
} as const;

/** Yeda product family — real product names from the current site. */
export const FAMILY = {
  title: "The Yeda product family",
  subtitle: "One system, several perspectives — for every type of organization and audience.",
  items: [
    { name: "Yeda LMS", body: "Learning management system", icon: "LayoutDashboard" },
    { name: "Yeda College", body: "Academic & college management", icon: "GraduationCap" },
    { name: "Yeda Org", body: "Corporate learning & training", icon: "Building2" },
    { name: "Yeda Labs", body: "Content production & AI tools", icon: "FlaskConical" },
    { name: "Yeda Tech", body: "Infrastructure & technology", icon: "Cpu" },
  ],
} as const;

/**
 * Native multi-step demo-request wizard (mirrors the pattern on the current
 * site). No backend this checkpoint — submit opens a prefilled mailto to the
 * real Yeda inbox, so nothing is silently captured. All options are verified
 * audiences/capabilities.
 */
export const DEMO_FORM = {
  intro: "Interested in a platform for organizational learning and content? We'd love to show you.",
  steps: [
    {
      key: "role",
      title: "What's your role?",
      type: "single" as const,
      options: [
        "Company / enterprise",
        "Government",
        "University / college",
        "School",
        "Other organization",
      ],
    },
    {
      key: "interest",
      title: "What are you interested in?",
      type: "single" as const,
      options: [
        "Learning management (LMS)",
        "Digital course production",
        "Avatar & HTML modules",
        "Employee training",
      ],
    },
    {
      key: "contact",
      title: "Contact details",
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
    required: "Required field",
    invalidEmail: "Invalid email address",
    pickOne: "Please choose one option",
  },
  success: {
    title: "Thank you!",
    body: "An email ready to send to the Yeda team has opened. We'll get back to you shortly.",
  },
  mailSubject: "Demo request — Yeda",
} as const;

export const FINAL_CTA = {
  title: "See how Yeda can support your learning ecosystem",
  subtitle:
    "Discuss your audiences, programs, systems, integrations, and knowledge-management requirements with our team.",
  primaryCta: "Book a demo",
  secondaryCta: "Contact Yeda",
} as const;

export const FOOTER = {
  tagline: "The complete platform for organizational learning and knowledge.",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Capabilities", href: "#capabilities" },
        { label: "AI learning agents", href: "#ai" },
        { label: "Integrations", href: "#integrations" },
        { label: "Content production", href: "#production" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Enterprises & companies", href: "#audiences" },
        { label: "Government", href: "#audiences" },
        { label: "Universities & colleges", href: "#audiences" },
        { label: "Schools", href: "#audiences" },
      ],
    },
    {
      title: "Product",
      links: [
        { label: "Platform in action", href: "#product" },
        { label: "Yeda product family", href: "#family" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Resources", href: "#resources" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  // Legal / compliance row. Accessibility statement is required (IS 5568).
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Accessibility statement", href: "#" },
  ],
} as const;
