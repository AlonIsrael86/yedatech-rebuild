/**
 * Image manifest.
 *
 * ALEXEY'S RULES, encoded in the types below:
 *  - `caption` is NOT optional. He said twice that every image carries its own
 *    explanation, so a slot cannot exist without one.
 *  - Filenames carry keywords (`yeda-<topic>-<screen>`), because Google reads
 *    the filename on the server.
 *  - No stock photography. Real platform screens only.
 *  - Many images, spanning far more categories than "courses", scrolling
 *    left-to-right.
 *
 * FIGMA SLOTS. Alexey reviewed the preview on 2026-08-03 and asked for more
 * images from Figma, so the twenty slots below mirror `FIGMA_IMAGE_LIST.md`
 * one-for-one. Each renders a labelled placeholder at the real aspect ratio
 * until Victor exports the frame, so the composition can be judged and the gaps
 * are visible rather than silently absent.
 *
 * FILENAME CONVENTION: a pending slot's `id` is exactly its export filename
 * stem. Slot `assessment-exam-question-bank` becomes
 * `/media/platform/yeda-assessment-exam-question-bank.png`. Filling a slot is
 * therefore mechanical — flip `file: null` to `` `${P}/yeda-${id}.png` `` — and
 * a typo cannot silently point at the wrong screen.
 *
 * Real screens below come from Yeda's own published sites yedalabs.ai and
 * yedalabs.io — actual product, not stock.
 */

import type { Sector } from "@/content/routes";

export type ShotCategory =
  | "dashboard"
  | "analytics"
  | "flow"
  | "settings"
  | "avatar-module"
  | "html-module"
  | "assessment"
  | "knowledge"
  | "ai-agent"
  | "live-session"
  | "integrations"
  | "industry"
  | "mobile"
  | "concept";

export type ShotSource =
  | "yedalabs-ai"
  | "yedalabs-io"
  | "yedatech-io"
  | "ai-concept"
  | "figma";

export type Shot = {
  id: string;
  /** null → labelled placeholder at the same aspect ratio. */
  file: string | null;
  width: number;
  height: number;
  /** Keyword-bearing. Never empty. */
  alt: string;
  /** The explanation Alexey requires on every image. Never empty. */
  caption: string;
  category: ShotCategory;
  sector: Sector | "both";
  source: ShotSource;
  /** Filled once Alexey names the approved frames. */
  figmaFrame: string | null;
};

export type Gallery = {
  id: string;
  title: string;
  subtitle: string;
  shots: readonly Shot[];
};

const P = "/media/platform";

/* ── Real platform screens (yedalabs.ai) ─────────────────────────────── */

const aiAnswersFromVideo: Shot = {
  id: "ai-answers-from-video",
  file: `${P}/yeda-ai-agent-answers-from-video.jpg`,
  width: 2200,
  height: 3800,
  alt: "Yeda AI learning agent answering a learner question from video content",
  caption:
    "The AI agent answers a learner's question directly from the video — the same speech-to-text pipeline that turns an existing recording into a learning module.",
  category: "flow",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

const analyticsInsights: Shot = {
  id: "analytics-insights",
  file: `${P}/yeda-learning-analytics-insights.png`,
  width: 901,
  height: 526,
  alt: "Yeda learning analytics panel showing learner questions and insights",
  caption:
    "Insights surface what learners actually asked and where they got stuck, so a programme can be corrected on evidence rather than guesswork.",
  category: "analytics",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

const interactiveModule: Shot = {
  id: "interactive-module",
  file: `${P}/yeda-interactive-module-drag-and-drop.png`,
  width: 1191,
  height: 678,
  alt: "Yeda interactive HTML learning module with a drag-and-drop exercise",
  caption:
    "An interactive HTML module with a drag-and-drop exercise — practice sits inside the learning unit rather than after it.",
  category: "html-module",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

const conceptAuthoring: Shot = {
  id: "concept-authoring",
  file: `${P}/yeda-learning-concept-authoring.svg`,
  width: 426,
  height: 623,
  alt: "Yeda authoring concept illustration for building digital learning modules",
  caption: "Authoring — building a learning module from existing material.",
  category: "concept",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

const conceptDelivery: Shot = {
  id: "concept-delivery",
  file: `${P}/yeda-learning-concept-delivery.svg`,
  width: 346,
  height: 187,
  alt: "Yeda learning delivery concept illustration",
  caption: "Delivery — publishing the programme to the people who need it.",
  category: "concept",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

const conceptAssessment: Shot = {
  id: "concept-assessment",
  file: `${P}/yeda-learning-concept-assessment.svg`,
  width: 426,
  height: 187,
  alt: "Yeda assessment and certification concept illustration",
  caption: "Assessment — testing, scoring and certifying what was learned.",
  category: "concept",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

const conceptKnowledge: Shot = {
  id: "concept-knowledge",
  file: `${P}/yeda-learning-concept-knowledge.svg`,
  width: 426,
  height: 623,
  alt: "Yeda organizational knowledge management concept illustration",
  caption: "Knowledge — keeping what the organization knows findable and teachable.",
  category: "concept",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

/* ── Real platform screens (yedalabs.io) ─────────────────────────────────
   Harvested from Yeda's own published site, which runs its own numbered 01–05
   flow with one real screenshot per step.

   These show the platform's Hebrew interface, because that is the interface
   Yeda has published, and at 710×490 they are also too small for the enlarged
   carousel. Both defects are exactly what the Figma exports fix — flagged to
   Alexey, and we are not going to fake an English build of a screen that does
   not exist. */

const courseModules: Shot = {
  id: "course-modules",
  file: `${P}/yeda-course-modules-syllabus-builder.png`,
  width: 710,
  height: 490,
  alt: "Yeda course modules and syllabus builder with AI syllabus regeneration",
  caption:
    "The course structure, module by module — lessons can be edited, generated, or the whole syllabus rebuilt, then published straight into the LMS.",
  category: "flow",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

const materialEditor: Shot = {
  id: "material-editor",
  file: `${P}/yeda-learning-material-slide-editor.png`,
  width: 710,
  height: 490,
  alt: "Yeda learning material editor with slides, text, images and shapes",
  caption:
    "The material editor — slides, text, imagery and annotation in one place, with the recording controls sitting alongside them.",
  category: "settings",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

const lessonRecording: Shot = {
  id: "lesson-recording",
  file: `${P}/yeda-lesson-recording-presenter-studio.png`,
  width: 710,
  height: 490,
  alt: "Yeda lesson recording studio with a presenter on camera beside the slides",
  caption:
    "Recording a lesson — the presenter, the slide and the mobile view of the same lesson, captured together.",
  category: "live-session",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

const videoEditing: Shot = {
  id: "video-editing",
  file: `${P}/yeda-video-editing-timeline.png`,
  width: 710,
  height: 490,
  alt: "Yeda video editing timeline for trimming a recorded lesson",
  caption:
    "Editing the recording on a timeline — trimming and sequencing happen inside the platform, not in a separate tool.",
  category: "flow",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

const contentLibrary: Shot = {
  id: "content-library",
  file: `${P}/yeda-content-library-videos-folders.png`,
  width: 710,
  height: 490,
  alt: "Yeda content library of learning videos organised into folders",
  caption:
    "The library — every finished lesson and folder in one searchable place, ready to be assigned to an audience.",
  category: "dashboard",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

/* ── The twenty Figma slots ──────────────────────────────────────────────
   One per row of FIGMA_IMAGE_LIST.md, in the same order, with the same ids as
   the export filenames. Real captions and real dimensions, so each renders as
   a correctly-sized labelled placeholder until the frame lands.

   16:10 (1200×750) for every desktop frame; #5 is the only portrait one. That
   ratio is not decoration — mixed ratios survive at a 420px slide and look
   broken at 880px, which is the width the carousel now runs at.

   ⚠️ CLEARANCE-GATED: liveSessionSync, aiAgentScreenWatch and integrationsSync
   will almost certainly carry Zoom / Teams / Salesforce marks. The repo is
   public. Alexey approves those three before the frames are exported — the
   placeholders below carry no third-party content and are safe to ship. */

const pending = (
  id: string,
  alt: string,
  caption: string,
  category: ShotCategory,
  sector: Sector | "both" = "both",
  width = 1200,
  height = 750,
): Shot => ({
  id,
  file: null,
  width,
  height,
  alt,
  caption,
  category,
  sector,
  source: "figma",
  figmaFrame: null,
});

/* Learner-facing — what a person actually receives */

const employeeTrainingPortal = pending(
  "organizations-employee-training-portal",
  "Yeda organizational learning portal showing an employee's assigned training",
  "Each employee's own portal — what has been assigned, what is due and what is already done, without asking anyone.",
  "dashboard",
  "organizations",
);

const studentCourseView = pending(
  "education-student-course-view",
  "Yeda student course view with lessons, materials and the next session",
  "A student's course page — lessons, materials and the next session in one view, so nothing depends on remembering an email.",
  "dashboard",
  "education",
);

const courseCatalogue = pending(
  "course-catalogue-browse-and-enrol",
  "Yeda course catalogue with search, browse and self-enrolment",
  "The catalogue — learners find a course and enrol themselves, which is what stops administrators becoming the bottleneck.",
  "dashboard",
);

const learningPathSchedule = pending(
  "learning-path-training-programme-schedule",
  "Yeda learning path and training programme schedule over time",
  "A programme laid out over time rather than as a single course — the difference between assigning training and running it.",
  "flow",
);

const mobileLesson = pending(
  "mobile-learning-lesson-on-phone",
  "Yeda mobile learning with a lesson in progress on a phone",
  "The same lesson on a phone — training that reaches people who do not sit at a desk.",
  "mobile",
  "both",
  720,
  1560,
);

/* Inside a learning unit */

const avatarModule = pending(
  "avatar-learning-module-presenter-and-slides",
  "Yeda avatar-based learning module with a digital presenter beside the slides",
  "An avatar module — a digital presenter delivers the material beside the slide, so a course does not need a studio booking to exist.",
  "avatar-module",
);

const simulationModule = pending(
  "online-simulation-practice-module",
  "Yeda online simulation module being worked through by a learner",
  "A simulation being worked through — practising the task itself rather than reading about it.",
  "html-module",
);

const assessmentQuestionBank = pending(
  "assessment-exam-question-bank",
  "Yeda assessment question bank and exam builder",
  "The question bank and test builder — where an assessment is assembled and reused, rather than rewritten for every cohort.",
  "assessment",
);

const certificationResults = pending(
  "certification-results-and-certificate",
  "Yeda assessment results with the certificate issued from the score",
  "A result and the certificate issued from it — the proof of completion an employer or regulator actually asks for.",
  "assessment",
);

const liveSessionSync = pending(
  "live-session-zoom-teams-sync",
  "Yeda live learning session synchronised with the organization's meeting platform",
  "A live session tied to the meeting platform already in use — Yeda synchronises with it rather than replacing it.",
  "live-session",
);

/* AI and knowledge — the differentiators */

const aiAgentScreenWatch = pending(
  "ai-agent-software-training-screen-watch",
  "Yeda AI agent training a user on software by watching the screen",
  "The agent watches the screen and guides someone through another program — software training that happens inside the software.",
  "ai-agent",
);

const knowledgeBaseSearch = pending(
  "organizational-knowledge-base-search",
  "Yeda organizational knowledge base search returning an answer",
  "Organizational knowledge searched and found — what the company already knows, kept findable instead of trapped in people.",
  "knowledge",
);

/* Measurement */

const adminDashboard = pending(
  "admin-dashboard-courses-learners-overview",
  "Yeda administrator dashboard with courses, learners and completion rates",
  "The administrator's home — courses, learners and completion at a glance, which is the view that answers 'is this working'.",
  "dashboard",
);

const managerTeamReport = pending(
  "manager-report-team-training-progress",
  "Yeda manager report showing a team's training progress",
  "A manager drilling into their own team's progress — accountability sits with the manager, not only with HR.",
  "analytics",
  "organizations",
);

const academicCohortReport = pending(
  "academic-report-cohort-results",
  "Yeda academic report showing cohort and semester results",
  "Cohort and semester results for an academic director — the institutional view rather than the individual one.",
  "analytics",
  "education",
);

/* Running the platform */

const integrationsSync = pending(
  "integrations-crm-and-meeting-platform-sync",
  "Yeda integrations list for CRM and meeting platform synchronisation",
  "The connector list — CRMs and meeting platforms kept in sync, so learning data does not become another silo.",
  "integrations",
);

const platformSettings = pending(
  "platform-settings-roles-and-permissions",
  "Yeda platform settings for roles, permissions and assignment",
  "Roles and permissions — who can see what, and who is allowed to assign it.",
  "settings",
);

const assignToDepartment = pending(
  "assign-training-to-department-cohort",
  "Yeda assignment of a training programme to a department or cohort",
  "Assigning a programme to a whole department or cohort and notifying them — the step that turns content into training.",
  "settings",
);

const publicApiReference = pending(
  "public-api-developer-reference",
  "Yeda public API developer reference documentation",
  "The public API — the platform is addressable by other systems, not only by its own interface.",
  "integrations",
);

/* Industry */

const insuranceProgramme = pending(
  "insurance-industry-training-programme",
  "Yeda insurance industry training and certification programme",
  "An insurance training programme — Alexey's own example of a regulated industry where certification is the point.",
  "industry",
  "organizations",
);

/* ── Galleries ───────────────────────────────────────────────────────────
   Referenced by `gallery` on route entries in routes.ts. Flow shots sit next
   to each other so the sequence reads, per Alexey.

   The two homepage galleries used to share only one shot, which kept the tab
   switch obvious. With twenty slots that rule cannot hold — most screens are
   genuinely relevant to both sectors. So the guarantee is preserved a different
   way: each gallery OPENS with its sector-only screens, so the first thing that
   changes on a tab switch is the first thing you see. */

export const GALLERIES: Record<string, Gallery> = {
  /* Kept for inner pages that ask for a general tour. NOT used on the homepage
     any more — the homepage shows the sector gallery instead, so switching the
     tab changes the images too. */
  homepage: {
    id: "homepage",
    title: "See the platform",
    subtitle:
      "Every screen below is part of one platform — authoring, delivery, assessment and the data that comes back.",
    shots: [
      adminDashboard,
      courseCatalogue,
      avatarModule,
      assessmentQuestionBank,
      liveSessionSync,
      integrationsSync,
      mobileLesson,
    ],
  },
  "organizations-platform": {
    id: "organizations-platform",
    title: "The platform, for organizations",
    subtitle:
      "Employee, supplier and customer training managed from one place — browse left to right.",
    shots: [
      employeeTrainingPortal,
      managerTeamReport,
      insuranceProgramme,
      assignToDepartment,
      adminDashboard,
      courseCatalogue,
      learningPathSchedule,
      avatarModule,
      simulationModule,
      assessmentQuestionBank,
      certificationResults,
      knowledgeBaseSearch,
      integrationsSync,
      publicApiReference,
      platformSettings,
      mobileLesson,
      interactiveModule,
      videoEditing,
    ],
  },
  "education-platform": {
    id: "education-platform",
    title: "The platform, for institutions",
    subtitle:
      "Students, courses, examination and certification in one system — browse left to right.",
    shots: [
      studentCourseView,
      academicCohortReport,
      courseCatalogue,
      learningPathSchedule,
      assessmentQuestionBank,
      certificationResults,
      avatarModule,
      simulationModule,
      liveSessionSync,
      aiAgentScreenWatch,
      knowledgeBaseSearch,
      adminDashboard,
      platformSettings,
      mobileLesson,
      interactiveModule,
      videoEditing,
    ],
  },
  authoring: {
    id: "authoring",
    title: "Building a learning module",
    subtitle:
      "From existing material to a finished interactive unit — read the flow left to right.",
    shots: [
      conceptAuthoring,
      avatarModule,
      interactiveModule,
      simulationModule,
      assessmentQuestionBank,
      conceptAssessment,
    ],
  },
  /* aiAnswersFromVideo and analyticsInsights deliberately left out: every inner
     page now also renders the numbered Flow, which already carries both, and no
     page should show the same screen twice. */
  "ai-and-agents": {
    id: "ai-and-agents",
    title: "AI agents at work",
    subtitle:
      "Answering from source material, and training people on software by watching the screen.",
    shots: [
      aiAgentScreenWatch,
      knowledgeBaseSearch,
      conceptKnowledge,
      avatarModule,
    ],
  },
  "integrations-and-live": {
    id: "integrations-and-live",
    title: "Synchronisation and live learning",
    subtitle:
      "Yeda syncs with the CRMs and meeting platforms already in use, and exposes an API.",
    shots: [
      integrationsSync,
      liveSessionSync,
      publicApiReference,
      conceptDelivery,
      platformSettings,
    ],
  },
};

/**
 * Presenter composition figures — keyed by POSITION, not by gender.
 *
 * Alon's brief says woman-left / man-right, but these are vector illustrations
 * and the SVG paths do not tell us which is which. Keying by position means
 * swapping them is a one-line change once Alexey confirms, and means we are not
 * asserting something we cannot verify.
 *
 * Both are Yeda's own published illustrations from yedalabs.ai — interim art
 * for a slot the agent/widget platform will eventually fill. We do not author
 * the characters (see the standard).
 */
export const PRESENTER_FIGURES: { left: Shot; right: Shot } = {
  left: conceptAuthoring,
  right: conceptKnowledge,
};

/**
 * The product interface that sits between them — the recording studio, where a
 * real presenter already appears beside the slide. It replaces the analytics
 * panel that used to sit here: analytics now carries the last step of the flow,
 * and a screen showing a person presenting is a far better centre for a
 * composition about presenters.
 */
export const PRESENTER_SCREEN: Shot = lessonRecording;

/**
 * The five steps of the product flow, in order. Shared between both sectors —
 * only the words change per sector, so the browser fetches each file once even
 * though both sector panels render.
 *
 * Keyed by the step id used in FLOW in content/site.ts.
 */
export const FLOW_SHOTS: Record<string, Shot> = {
  ingest: aiAnswersFromVideo,
  build: courseModules,
  shape: materialEditor,
  publish: contentLibrary,
  measure: analyticsInsights,
};

export const getGallery = (id?: string): Gallery | null =>
  id ? (GALLERIES[id] ?? null) : null;

/** Count of slots still waiting on an approved Figma frame. */
export const pendingShotCount = () =>
  new Set(
    Object.values(GALLERIES)
      .flatMap((g) => g.shots)
      .filter((s) => s.file === null)
      .map((s) => s.id),
  ).size;
