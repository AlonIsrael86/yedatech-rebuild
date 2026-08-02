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
 * STAGE RULE: no Figma assets yet. Every shot is tagged with `source`, so the
 * later swap to approved Figma frames is a filter on `source !== "figma"`
 * rather than an archaeology exercise. Shots with `file: null` render as a
 * labelled placeholder at the real dimensions, so composition can be judged
 * now and the asset dropped in 1:1 later.
 *
 * Real screens below come from Yeda's own published site yedalabs.ai — actual
 * product, not stock.
 */

import type { Sector } from "@/content/routes";

export type ShotCategory =
  | "dashboard"
  | "analytics"
  | "flow"
  | "settings"
  | "avatar-module"
  | "html-module"
  | "live-session"
  | "integrations"
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
   flow with one real screenshot per step. Permitted at this stage: reference
   sites yes, Figma no.

   These show the platform's Hebrew interface, because that is the interface
   Yeda has published. Flagged for Alexey — an English-first marketing site
   showing a Hebrew UI is his call, not ours, and we are not going to fake an
   English build of a screen that does not exist. */

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

/* ── Awaiting approved Figma frames ──────────────────────────────────────
   Real slots with real captions and real dimensions. Each renders a labelled
   placeholder until Victor supplies the frame. Categories here are exactly the
   spread Alexey asked for — "more categories than just courses". */

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

const adminDashboard = pending(
  "admin-dashboard",
  "Yeda LMS administrator dashboard with course and learner overview",
  "The administrator dashboard — courses, learners and completion at a glance.",
  "dashboard",
);

const courseBuilderFlow = pending(
  "course-builder-flow",
  "Yeda course builder flow from source material to published module",
  "The build flow, step by step: source material in, structured module out.",
  "flow",
);

const avatarModule = pending(
  "avatar-module",
  "Yeda avatar-based learning module with digital presenter and slides",
  "An avatar module — digital presenter, slides and practice in one unit.",
  "avatar-module",
);

const liveSession = pending(
  "live-session",
  "Yeda live learning session synchronised with Zoom and Microsoft Teams",
  "A live session, synchronised with the meeting platform the organization already uses.",
  "live-session",
);

const integrationsSettings = pending(
  "integrations-settings",
  "Yeda integration settings for CRM and meeting platform synchronisation",
  "Integration settings — where CRM and meeting-platform synchronisation is configured.",
  "integrations",
);

const platformSettings = pending(
  "platform-settings",
  "Yeda platform settings for roles, permissions and learning paths",
  "Settings — roles, permissions and how learning paths are assigned.",
  "settings",
);

const studentView = pending(
  "student-view",
  "Yeda student course view for colleges and universities",
  "The student's view of a course — what a learner in a college or university sees.",
  "dashboard",
  "education",
);

const employeePortal = pending(
  "employee-portal",
  "Yeda organizational learning portal for employee training",
  "An organizational portal — each employee's assigned training in one place.",
  "dashboard",
  "organizations",
);

const mobileLearning = pending(
  "mobile-learning",
  "Yeda mobile learning view for training on a phone",
  "The mobile view — the same programme, completed on a phone.",
  "mobile",
  "both",
  600,
  1000,
);

const softwareTrainingAgent = pending(
  "software-training-agent",
  "Yeda AI agent training a user on software by watching the screen",
  "The software-training agent watches the screen and guides the user through the program itself.",
  "flow",
);

/* ── Galleries ───────────────────────────────────────────────────────────
   Referenced by `gallery` on route entries in routes.ts. Flow shots sit next
   to each other so the sequence reads, per Alexey. */

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
      courseBuilderFlow,
      adminDashboard,
      avatarModule,
      liveSession,
      integrationsSettings,
      mobileLearning,
    ],
  },
  /* The two homepage galleries. They deliberately share only one shot, so
     flipping the tab visibly changes the carousel rather than reordering it.
     Nothing here repeats an image used elsewhere in the same sector's view. */
  "organizations-platform": {
    id: "organizations-platform",
    title: "The platform, for organizations",
    subtitle:
      "Employee, supplier and customer training managed from one place.",
    shots: [
      employeePortal,
      conceptDelivery,
      adminDashboard,
      platformSettings,
      videoEditing,
    ],
  },
  "education-platform": {
    id: "education-platform",
    title: "The platform, for institutions",
    subtitle: "Students, courses, examination and certification in one system.",
    shots: [
      studentView,
      conceptAssessment,
      avatarModule,
      mobileLearning,
      videoEditing,
    ],
  },
  authoring: {
    id: "authoring",
    title: "Building a learning module",
    subtitle:
      "From existing material to a finished interactive unit — read the flow left to right.",
    shots: [
      courseBuilderFlow,
      conceptAuthoring,
      avatarModule,
      interactiveModule,
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
      softwareTrainingAgent,
      conceptKnowledge,
      avatarModule,
      integrationsSettings,
    ],
  },
  "integrations-and-live": {
    id: "integrations-and-live",
    title: "Synchronisation and live learning",
    subtitle:
      "Yeda syncs with the CRMs and meeting platforms already in use, and exposes an API.",
    shots: [integrationsSettings, liveSession, conceptDelivery, platformSettings],
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
