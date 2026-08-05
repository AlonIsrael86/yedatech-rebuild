/**
 * Image manifest.
 *
 * ALEXEY'S RULES, encoded in the types below:
 *  - `caption` is NOT optional. He said twice that every image carries its own
 *    explanation, so a slot cannot exist without one.
 *  - Filenames carry keywords (`yeda-<topic>-<screen>`), because Google reads
 *    the filename on the server.
 *  - Many images, spanning far more categories than "courses", scrolling
 *    left-to-right.
 *
 * SOURCES, in order of preference:
 *  1. `figma` — the approved design file. The first export landed 2026-08-03
 *     (`uploadMaterial`, Flow step 01) and is the only shot with a real
 *     `figmaFrame`. Nine other `figma` slots are still empty and render as
 *     labelled placeholders.
 *  2. `yedalms-io` — 18 images added 2026-08-03 from Yeda's own Hebrew site.
 *     ~1250–1340px, a large upgrade on the 710px yedalabs.io screens.
 *     CAUTION: several carry Hebrew baked into the pixels — visible on an
 *     English page, and flagged to Alexey rather than fixed here.
 *  3. `yedalabs-io` / `yedalabs-ai` — Yeda's other published properties.
 *
 * ON THE "NO STOCK" RULE. Alexey's standard says "No stock, no iStock. Real
 * platform screens only", and he set that by overriding a written brief that
 * allowed stock. Several yedalms.io images below are marketing composites —
 * stock photography with UI floated over it — and are shipped anyway on
 * Victor's explicit decision of 2026-08-03. Flagged to Alexey rather than
 * slipped past him. Full audit in the gitignored _figma_ref/yedalms/INDEX.md.
 *
 * WHAT WAS REJECTED, and why it matters that it was:
 *  - A profile screen carrying a national ID number, phone, email, DOB and a
 *    face. The repo is public.
 *  - A screen whose focal point is the Zoom / Teams / Google Meet logos —
 *    other companies' trademarks, gated on Alexey like Figma frames 10 and 16.
 *  - Screens for "בקרוב" features that do not exist yet.
 *
 * Every caption below was written from looking at the image. The page section
 * order on yedalms.io is NOT a reliable guide to what a given file contains —
 * it looked like an exact 1:1 mapping and was not.
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
  | "localization"
  | "industry"
  | "mobile"
  | "concept";

export type ShotSource =
  | "yedalabs-ai"
  | "yedalabs-io"
  | "yedalms-io"
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
  /**
   * The slide's own title — what this screen IS, in two or three words. Shown
   * as the bold lead-in on the caption, and on the face of a pending card.
   *
   * Required, and required for a reason. The caption used to lead with
   * `category`, and there are only 15 categories across 16- and 14-slide
   * panels, so titles repeated by construction: three slides headed "Settings"
   * in the organizations panel, two adjacent ones headed "Integrations". They
   * read as duplicated slides. A per-slide title cannot collide by accident,
   * and making it non-optional means a new shot cannot be added without one.
   *
   * Uniqueness *within a gallery* is what actually matters, and the type cannot
   * enforce that — see the dev-only guard at the bottom of this file.
   */
  label: string;
  category: ShotCategory;
  sector: Sector | "both";
  source: ShotSource;
  /** Filled once Alexey names the approved frames. */
  figmaFrame: string | null;
  /**
   * The asset carries no background of its own, so whatever renders it has to
   * supply a surface or the subject floats on the page.
   *
   * This is a measured property of the file, not a styling preference — hence it
   * lives here with `width`/`height` rather than in a component. Verified with
   * sharp: every pixel outside the subject is `rgba(0,0,0,0)`.
   *
   * The yedalms.io composites deliberately do NOT set it. They also report
   * `hasAlpha`, but only because their pale plate has rounded corners — sample
   * the middle of one and you get rgb(197,217,253). Their surface is baked in.
   *
   * Which surface to draw is the component's call, not this file's.
   */
  needsSurface?: true;
  /**
   * The asset draws its own frame — a rounded card with a shadow, on a
   * transparent surround — so a renderer must not put it inside another one.
   *
   * Read by the Hero only. The carousel keeps wrapping everything in its own
   * card; at a 262px slide height that reads as one frame rather than two, and
   * changing it is not part of what this flag was added for.
   */
  selfFramed?: true;
};

export type Gallery = {
  id: string;
  title: string;
  subtitle: string;
  shots: readonly Shot[];
};

const P = "/media/platform";

/* ── yedalms.io, 2026-08-03 ──────────────────────────────────────────────
   Dimensions measured from the files with sharp, not taken from the WordPress
   API — the API disagreed with the file on at least one. The carousel derives
   slide width from these numbers, so a wrong one is a visibly wrong slide. */

const lms = (
  id: string,
  /** The slide title. Must be unique inside every gallery that holds it. */
  label: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
  category: ShotCategory,
  sector: Sector | "both" = "both",
): Shot => ({
  id,
  file: `${P}/${id}.png`,
  width,
  height,
  alt,
  caption,
  label,
  category,
  sector,
  source: "yedalms-io",
  figmaFrame: null,
});

const coursePlayerQuiz = lms(
  "yeda-course-player-lesson-and-quiz",
  "Course player",
  1314,
  894,
  "Yeda course player with the lesson list and a multiple-choice question open",
  "A lesson mid-flow — the course outline on one side, the video on the other, and the question that checks understanding before the learner moves on.",
  "html-module",
);

const examResults = lms(
  "yeda-assessment-exam-results-and-score",
  "Exam results",
  1314,
  894,
  "Yeda exam results screen showing a pass, an 80 percent score and per-section marks",
  "The result of an assessment, broken down by section rather than reduced to one number — so it is clear which part of the material did not land.",
  "assessment",
);

const recordingStudio = lms(
  "yeda-lesson-recording-presentation-studio",
  "Recording studio",
  1158,
  649,
  "Yeda recording studio with slide thumbnails, presenter camera and recording controls",
  "Setting up a recording against your own slides — the deck, the camera and the screen-share controls in one place, with no separate studio.",
  "flow",
);

const studentCoursePlayer = lms(
  "yeda-education-student-course-player",
  "Student course page",
  1314,
  867,
  "Yeda student course page with lesson video, syllabus and a lesson rating prompt",
  "What a student actually opens: the lesson, where it sits in the syllabus, and a prompt asking whether it was any good.",
  "dashboard",
  "education",
);

const interactiveVideoQuestion = lms(
  "yeda-interactive-video-embedded-question",
  "Question inside the video",
  1314,
  858,
  "Yeda interactive video with an open question embedded at a timestamp and answer analysis",
  "A question embedded at a point in the video, with the spread of answers beside it — practice inside the lesson, and evidence of where people struggled.",
  "html-module",
);

const subtitlesTranslation = lms(
  "yeda-automatic-subtitles-and-translation",
  "Subtitles and translation",
  1230,
  774,
  "Yeda video player showing automatic subtitles and an English, Spanish, Italian and French language switcher",
  "Automatic subtitles with the language switcher open — one recording reaches an audience that does not share the presenter's language.",
  "localization",
);

const aiStudyPlan = lms(
  "yeda-ai-learning-assistant-study-plan",
  "AI study plan",
  1314,
  876,
  "Yeda AI learning assistant building a personalised study plan on desktop and mobile",
  "The learning assistant assembling a study plan from the course material, on the desktop and the phone at once.",
  "ai-agent",
);

const mobileApp = lms(
  "yeda-mobile-learning-app-on-phone",
  "Mobile app",
  1254,
  870,
  "Yeda mobile learning app showing course progress, average grade and today's schedule",
  "The same programme on a phone — current course, average grade and what is scheduled today, for people who do not sit at a desk.",
  "mobile",
);

const aiAnswerSources = lms(
  "yeda-ai-assistant-answer-with-sources",
  "Answers with sources",
  1254,
  846,
  "Yeda AI assistant answering a learner question and linking to the source material",
  "The assistant answers from the organisation's own material and links back to the exact source, so an answer can be checked rather than trusted.",
  "ai-agent",
);

const whiteLabelPortal = lms(
  "yeda-white-label-branded-learning-portal",
  "Branded portal",
  1255,
  846,
  "Yeda learning portal with a placeholder marking where a customer's own logo is applied",
  "The portal is white-label: the marked slot takes the customer's own logo, so learners arrive somewhere that looks like their organisation.",
  "settings",
);

const videoLibrary = lms(
  "yeda-video-content-library-and-storage",
  "Video library",
  1314,
  893,
  "Yeda video content library with folders, thumbnails and durations",
  "Every recording in one library, foldered and searchable, ready to be assigned rather than hunted for in a drive.",
  "dashboard",
);

const whiteLabelOrg = lms(
  "yeda-organizations-white-label-branding",
  "Logo and colours",
  1314,
  882,
  "Yeda white-label branding controls showing a logo slot and a colour picker",
  "Branding is configuration, not a rebuild — a logo slot and a colour picker, set once.",
  "settings",
  "organizations",
);

/* ENGLISH. Victor supplied fo_2_en, the same shot with the interface in English,
   and it replaced the Hebrew file in place — same id, same 1278×882 — so the
   carousel picked up the upgrade for free and there is one file rather than two
   near-identical ones. The first of the six Hebrew screens to be swapped. */
const implementation = lms(
  "yeda-organizations-implementation-and-rollout",
  "Rollout tracker",
  1278,
  882,
  "Yeda implementation progress tracker for an organisational rollout",
  "Rollout is run as a tracked project with a named contact at every stage, rather than handing over a login and hoping.",
  "flow",
  "organizations",
);

/* REPLACED 2026-08-05. This was a stock photograph of a woman presenting to
   applauding colleagues, with a three-row Hebrew permissions table composited
   into the corner — a picture of people standing in for a capability. It is now
   the real screen, in English, from Alexey's Figma via the colleague's
   yeda-ui-page set. alt and caption are rewritten from the image; the old ones
   described the photograph and its invented HR/manager/employee rows.
   One file, three consumers: hero organizations #4, `organizations-platform`
   and `integrations-and-live`. All three are captioned about permissions.

   DE-BRANDED, and this is the one thing to check if these ever get re-cut.
   The source frame carries a "Juno OPS" wordmark and the account
   `admin@juno.ops`, both confined to the left sidebar. The crop at x=802 of
   3840 removes the whole sidebar and with it both marks — verified by scanning
   the written file for the badge red and finding 0 pixels, against 9602 in the
   source, so the detector is known to work.

   The assumption underneath: that Juno OPS is a fictional demo tenant in the
   Figma, not a separate product. The colleague files these under "admin user
   experience" for Yeda and the mobile cuts of the same screens carry no logo at
   all, which points that way, but he has not confirmed it. If it turns out to
   be a real separate product this asset comes out — cropping the logo would be
   hiding the problem, not fixing it. Victor took the call to ship. */
const rolesPermissions: Shot = {
  id: "organizations-roles-and-permissions",
  file: `${P}/yeda-organizations-roles-and-permissions.png`,
  width: 1200,
  height: 853,
  alt: "A Yeda role open for editing, with each permission listed separately and switched on or off",
  caption:
    "A role opened up — every permission named and described one by one, switched on or off individually, and counted per area before the change is published.",
  label: "Roles and permissions",
  category: "settings",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-roles",
};

const analyticsViewing = lms(
  "yeda-learning-analytics-viewing-data",
  "Viewing and question data",
  1314,
  943,
  "Yeda analytics showing completion and repeat-viewing rates beside per-question success rates",
  "Completion and repeat-viewing beside the success rate on each question — enough to tell a hard question from a badly explained one.",
  "analytics",
);

const integrationsDiagram = lms(
  "yeda-integrations-crm-hr-erp-api",
  "Integration map",
  1266,
  858,
  "Yeda integration map connecting to CRM, HR, ERP, attendance systems and a public API",
  "Yeda sits alongside the systems already in use — CRM, HR, ERP, attendance — and exposes an API rather than becoming another silo.",
  "integrations",
);

/* REPLACED 2026-08-05, same filename. This was four people at a laptop with a
   small Hebrew card and a "Your Logo" marker pasted over it; it is now the
   learner's own course list, in English, from the yeda-ui-page set.

   The caption barely changed because the old one already described this screen
   rather than the photograph it sat on — "how far in, how many units left, and
   when the student was last active" is now literally what is on the picture
   (50%, Units 8/120, last activity 2 days ago).

   TWO cards, not the colleague's one. His crop is a 2.575 strip, and the
   carousel derives slide width from this ratio — it came out ~70% wider than
   every neighbour and broke the row. 1.709 sits in family with the rest. */
const courseProgress: Shot = {
  id: "education-course-progress-tracking",
  file: `${P}/yeda-education-course-progress-tracking.png`,
  width: 1200,
  height: 702,
  alt: "A Yeda learner's course list showing percentage complete, units finished and last activity",
  caption:
    "Progress through a course at a glance — how far in, how many units are left, when the student was last active, and the lesson the Continue button drops them back into.",
  label: "Course progress",
  category: "analytics",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-courses",
};

const liveSessionRecording = lms(
  "yeda-live-session-recording",
  "Recorded live session",
  1254,
  837,
  "Yeda live session being recorded with a participant grid and a recording timer",
  "A live session recorded as it runs, so the people who could not attend get the same material as the people who did.",
  "live-session",
);

/* ── Figma ───────────────────────────────────────────────────────────────
   THE FIRST APPROVED EXPORT. Every other shot here came off a published Yeda
   site; this one came out of the Figma file Alexey pointed at, which is what
   he asked for. It is also the first shot with a non-null `figmaFrame` — the
   frame name is taken from the export filename, since Figma names exports
   after the frame.

   Measured with sharp, not estimated: the Flow sizes each step's box from
   width/height, so a wrong pair renders a visibly wrong shape.

   NOTE FOR THE NEXT EXPORT: 832px wide is thin. The Flow asks for a 560px
   slot, so a 2× display wants ~1120px and this will look slightly soft. A 2×
   re-export of the same frame (1664×926) drops straight in — same ratio,
   same filename. */

/* The two presenter characters, exported at 2× on request (312×652 for a
   210px slot). These are the figures the design actually draws — the concept
   SVGs that stood in for them showed a person beside a bar chart and a person
   in front of video tiles, which is why both had to be recaptioned earlier.

   THEY ALSO SETTLE A QUESTION THE CODE HAS BEEN DODGING. Alon's brief says
   woman-left / man-right; the SVG paths could not tell us which illustration
   was which, so PRESENTER_FIGURES was keyed by position and said so. These are
   named by the designer and their gestures confirm it: the woman's arm extends
   right, the man's extends left, so each points inward from her or his side. */

/**
 * NOT a `Shot`, deliberately. `Shot.caption` is non-optional because Alexey
 * requires every *content* image to explain itself — but the design gives these
 * two no caption, and inventing one would be writing copy about decorative art.
 * That is how the concept SVGs ended up captioned as things they did not show.
 */
export type PresenterFigure = {
  file: string;
  width: number;
  height: number;
  alt: string;
  figmaFrame: string;
};

const figureWoman: PresenterFigure = {
  file: `${P}/yeda-presenter-figure-woman.png`,
  width: 312,
  height: 652,
  alt: "Illustration of a woman gesturing toward the platform interface",
  figmaFrame: "Woman",
};

const figureMan: PresenterFigure = {
  file: `${P}/yeda-presenter-figure-man.png`,
  width: 312,
  height: 652,
  alt: "Illustration of a man gesturing toward the platform interface",
  figmaFrame: "men",
};

/* ── Hero slides, Figma 2026-08-03 ───────────────────────────────────────
   Six per sector. Victor exported twelve frames; SIX of them turned out to be
   pixel-identical to assets already on the page (mean abs diff 0.00 on a 64px
   greyscale compare) and a seventh was the English version of one. So only the
   consts below are new — the rest of each hero list reuses the existing shot
   rather than shipping the same bytes under a second name.

   That means five pictures appear twice on the homepage: once in the hero, once
   in the carousel or Flow §05. Victor was shown the comparison and accepted the
   repetition, so this is a decision, not an oversight.

   Dimensions measured with sharp after copying, never taken from the export
   dialog — the hero derives its frame from them.

   The two 3840px ones are different in kind from the rest: flat, opaque,
   full-page English screenshots rather than cut-out cards, so they are the only
   two here without `selfFramed`. */

const heroOrgOverview: Shot = {
  id: "hero-organizations-training-overview",
  file: `${P}/yeda-hero-organizations-training-overview.png`,
  width: 1170,
  height: 697,
  alt: "A person working through a course on a laptop, with playback, certification and reporting shown alongside",
  caption:
    "A course being taken on a laptop, with the playback, the certificate at the end and the completion reporting drawn alongside it.",
  label: "Training in one place",
  category: "concept",
  sector: "organizations",
  source: "figma",
  figmaFrame: "fc_hero",
  selfFramed: true,
};

/* CARRIES THIRD-PARTY MARKS: the Zoom wordmark, the Microsoft Teams logo and
   the Google Meet logo as three badges, plus small Google and Microsoft glyphs
   in the calendar toolbar.

   The standing rule is that no third-party mark reaches this repo — which is
   public — without Alexey. Victor took the call to ship it on 2026-08-03,
   knowing that. It is nominative use rather than endorsement (the site already
   claims meeting-platform sync as a capability), but it is still his override of
   a written constraint, and Alexey has been sent the clearance request. If the
   answer comes back no, remove this const and the file; nothing else depends on
   it. */
const meetingPlatformSync: Shot = {
  id: "meeting-platform-sync",
  file: `${P}/yeda-meeting-platform-sync-zoom-teams-meet.png`,
  width: 1341,
  height: 876,
  alt: "A live online session beside a scheduling calendar that syncs with Zoom, Microsoft Teams and Google Meet",
  caption:
    "A live session scheduled in the platform and mirrored into the meeting tools an organization already runs.",
  label: "Live sessions and calendars",
  category: "live-session",
  sector: "organizations",
  source: "figma",
  figmaFrame: "fo_6",
  selfFramed: true,
};

/* Opens the education hero. Replaced `studentsTogether` on 2026-08-05 — a stock
   photograph of three students at a laptop, which showed the audience rather
   than the product. This shows the thing they would actually be looking at.

   The file it replaced is left in public/ unreferenced, as `PRESENTER_SCREEN`
   was: retiring a const and deleting an asset are separate decisions, and this
   commit only makes the first.

   Cut at 2020px, not the colleague's 2160. His line keeps a last row reading
   "Teacher(s): Anna Weber" — a named person, which Victor's "clean screens
   only" ruling excludes. Losing it costs the star rating and the video length;
   the lesson list, the player, the description and the attachment all survive.

   Opaque and white-grounded, so NO `selfFramed` — it needs the Hero's card or
   it meets the navy with a bare edge. */
const coursePageLessons: Shot = {
  id: "education-course-page-lessons",
  file: `${P}/yeda-education-course-page-lessons-and-video.png`,
  width: 1200,
  height: 631,
  alt: "A Yeda course page with the section and lesson list beside the lesson's video and its attached material",
  caption:
    "One lesson open, with the course's sections and lessons listed beside it — what is done, what is playing, and the material attached to it.",
  label: "Inside a course",
  category: "flow",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-player",
};

/* A near-twin of `learningAnalytics` (mean abs diff 10.72) but a different
   screen — this one adds the engagement curve and the participant totals. Kept
   apart from it: this is the education hero, that one is not in the education
   gallery. */
const engagementAnalytics: Shot = {
  id: "education-engagement-analytics",
  file: `${P}/yeda-education-engagement-analytics-dashboard.png`,
  width: 1254,
  height: 822,
  alt: "Yeda analytics showing viewing rates, an engagement curve and per-question answer statistics",
  caption:
    "Where attention holds and where it drops, next to the success rate on each question and the class average.",
  label: "Engagement and drop-off",
  category: "analytics",
  sector: "education",
  source: "figma",
  figmaFrame: "ha_5",
  selfFramed: true,
};

/* ENGLISH. Re-cut 2026-08-05 from the colleague's yeda-ui-page set, which ships
   the 2x Figma source for this same frame.

   THE NAMED PERSON IS GONE. This used to be the full 3840×2642 page, whose
   bottom-left sidebar carried a photo and the legible name "Noam Rosenberg" —
   shipped on Victor's clearance and queued as a question for Alexey. The cut at
   2484px lands 24px above the first ink of that profile row (measured, not
   guessed), so the name is no longer in the pixels and the question is closed by
   deletion rather than by clearance.

   The crop is ours, not the colleague's: his ends at 2.041 and loses sections 4
   and 5. Ours keeps the whole path, Start to Finish, and at 1.546 it very nearly
   fills the hero's 3:2 frame instead of letterboxing inside it.

   Opaque and full-page, so no `selfFramed` — the Hero gives it a card. */
const courseRoadmap: Shot = {
  id: "education-course-roadmap",
  file: `${P}/yeda-education-course-roadmap-progress.png`,
  width: 1200,
  height: 776,
  alt: "A student's course roadmap with completed, current and locked lessons beside a progress summary",
  caption:
    "The whole course as a path — what is finished, what is open now and what unlocks next, with the progress summary beside it.",
  label: "Course roadmap",
  category: "flow",
  sector: "education",
  source: "figma",
  figmaFrame: "Road Map",
};

/* ENGLISH. Small Google and Outlook glyphs in the "Sync with" control — the
   same override as `meetingPlatformSync` above, and covered by the same request
   to Alexey. Opaque and full-page, so no `selfFramed`.

   Downscaled 2026-08-05, 3840 -> 1200. Same pixels, one sixth the width: this
   was a full-page design being rendered into a 535px slot, where none of it was
   legible. Derived from the shipping file itself rather than re-exported, so
   the content provably cannot have changed. */
const educationSchedule: Shot = {
  id: "education-schedule-week",
  file: `${P}/yeda-education-schedule-week-view.png`,
  width: 1200,
  height: 675,
  alt: "A week of classroom lessons, online lessons, exams and one-to-one sessions in the Yeda schedule",
  caption:
    "One week of classroom lessons, online lessons, exams and one-to-one sessions, with the option to mirror it into Google or Outlook.",
  label: "Weekly schedule",
  category: "dashboard",
  sector: "education",
  source: "figma",
  figmaFrame: "Schedule",
};

const uploadMaterial: Shot = {
  id: "content-upload-existing-material",
  file: `${P}/yeda-content-upload-existing-material.png`,
  width: 832,
  height: 463,
  alt: "A person uploading existing documents and files into Yeda from a laptop",
  caption:
    "Existing files going in — the documents an organization already has, uploaded as they are.",
  label: "Bring your material in",
  category: "flow",
  sector: "both",
  source: "figma",
  figmaFrame: "bring-the-material-you-already-have",
  /* A cut-out with a fully transparent ground, unlike the yedalms.io shots
     around it in the Flow, which carry their pale plate in the pixels. Without a
     surface behind it the man floated on the section. */
  needsSurface: true,
};

/* ── Real platform screens (yedalabs.ai) ─────────────────────────────── */

/* `aiAnswersFromVideo` (yeda-ai-agent-answers-from-video.jpg, 2200×3800) was
   retired here. It was the image for Flow step 01, "Bring the material you
   already have" — but it showed an AI answering a question from a video,
   which is a different claim entirely. A mismatch that predates the
   yedalms.io batch and survived the Phase B audit because that audit was
   scoped to the shots it added.

   Its 0.579 ratio was also the odd one out: steps 02–05 run 1.39–1.47, so
   step 01 rendered far taller than the rest of the sequence.

   The file is left in public/ unreferenced, as `contentLibrary` was — it is a
   real Yeda screen and an inner page may want it. */

const analyticsInsights: Shot = {
  id: "analytics-insights",
  file: `${P}/yeda-learning-analytics-insights.png`,
  width: 901,
  height: 526,
  alt: "Yeda learning analytics panel showing learner questions and insights",
  caption:
    "Insights surface what learners actually asked and where they got stuck, so a programme can be corrected on evidence rather than guesswork.",
  label: "Learner questions",
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
  label: "Drag-and-drop exercise",
  category: "html-module",
  sector: "both",
  source: "yedalabs-ai",
  figmaFrame: null,
};

/* ── The four concept illustrations, retired 2026-08-05 ──────────────────
   `conceptAuthoring`, `conceptDelivery`, `conceptAssessment` and
   `conceptKnowledge` were flat drawings — "Building the course", "Getting it
   out", "Testing and certifying", "Seeing it land" — carried over from
   yedalabs.ai. Their `source` said so: `yedalabs-ai`, not `figma`. They were
   never Yeda screens and never depicted a Yeda capability.

   They sat in three inner-page galleries, each next to real screenshots, which
   is where a generic drawing reads as a placeholder rather than as evidence.
   Their captions say the quiet part: "Lessons and recordings lined up before
   they go out" describes an idea, not a product.

   NOT reused as replacements for the six remaining stock photographs, which is
   what was first proposed. Those photographs are weak, but each one actually
   contains the thing its caption promises — `whiteLabelOrg` has a real logo slot
   and colour picker composited in, `implementation` has a rollout tracker,
   `integrationsDiagram` has the CRM/HR/ERP map. None of these four drawings
   shows any of that, so the swap would have traded a photograph that supports
   its caption for a drawing that does not. They also draw people themselves, so
   it would not even have removed the photography objection — only re-rendered
   it.

   The four .svg files stay in public/ unreferenced, as `PRESENTER_SCREEN` and
   `studentsTogether` did: retiring a const and deleting an asset are separate
   decisions and this commit makes only the first.

   `PRESENTER_FIGURES` (figureWoman / figureMan) is deliberately NOT touched —
   Alon briefed that flanking pair and MediaCarousel composes around it. */

/* ── Real platform screens (yedalabs.io) ─────────────────────────────────
   710×490 and Hebrew. Smaller than the yedalms.io set above, so they now sit
   behind it rather than carrying the galleries. */

const courseModules: Shot = {
  id: "course-modules",
  file: `${P}/yeda-course-modules-syllabus-builder.png`,
  width: 710,
  height: 490,
  alt: "Yeda course modules and syllabus builder with AI syllabus regeneration",
  caption:
    "The course structure, module by module — lessons can be edited, generated, or the whole syllabus rebuilt, then published straight into the LMS.",
  label: "Syllabus builder",
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
    "Slides, text, imagery and annotation in one place, with the recording controls sitting alongside them.",
  label: "Slide editor",
  category: "settings",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

/* `lessonRecording` was here — yeda-lesson-recording-presenter-studio.png, the
   centre screen of the old presenter composition. Retired when the figures
   moved to the carousel; see the note where PRESENTER_SCREEN used to be
   exported for why it is not simply folded into a gallery instead. The file
   stays in public/ unreferenced. */

const videoEditing: Shot = {
  id: "video-editing",
  file: `${P}/yeda-video-editing-timeline.png`,
  width: 710,
  height: 490,
  alt: "Yeda video editing timeline for trimming a recorded lesson",
  caption:
    "Editing the recording on a timeline — trimming and sequencing happen inside the platform, not in a separate tool.",
  label: "Editing timeline",
  category: "flow",
  sector: "both",
  source: "yedalabs-io",
  figmaFrame: null,
};

/* `contentLibrary` (yeda-content-library-videos-folders.png, 710×490) was
   retired here. It showed a foldered video library, which `videoLibrary` from
   yedalms.io now does at 1314×893 — keeping both put the same idea in the Flow
   and the carousel on one page. The file is left in public/ unreferenced in
   case it is wanted for an inner page. */

/* ── Still awaiting a real screen ────────────────────────────────────────
   Only the capabilities with no yedalms.io equivalent are left as slots. Each
   renders a labelled placeholder at the real ratio. Filling one is mechanical:
   the id is the export filename stem, so `file` becomes `${P}/yeda-${id}.png`. */

const pending = (
  id: string,
  /** The slide title. Also printed on the card, since there is no picture. */
  label: string,
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
  label,
  category,
  sector,
  source: "figma",
  figmaFrame: null,
});

const employeePortal = pending(
  "organizations-employee-training-portal",
  "Employee portal",
  "Yeda organizational learning portal showing an employee's assigned training",
  "Each employee's own portal — what has been assigned, what is due and what is already done.",
  "dashboard",
  "organizations",
);

const courseCatalogue = pending(
  "course-catalogue-browse-and-enrol",
  "Course catalogue",
  "Yeda course catalogue with search, browse and self-enrolment",
  "The catalogue — learners find a course and enrol themselves, which is what stops administrators becoming the bottleneck.",
  "dashboard",
);

const learningPathSchedule = pending(
  "learning-path-training-programme-schedule",
  "Learning path",
  "Yeda learning path and training programme schedule over time",
  "A programme laid out over time rather than as a single course — the difference between assigning training and running it.",
  "flow",
);

const avatarModule = pending(
  "avatar-learning-module-presenter-and-slides",
  "Avatar presenter",
  "Yeda avatar-based learning module with a digital presenter beside the slides",
  "An avatar module — a digital presenter delivers the material, so a course does not need a studio booking to exist.",
  "avatar-module",
);

const simulationModule = pending(
  "online-simulation-practice-module",
  "Simulation",
  "Yeda online simulation module being worked through by a learner",
  "A simulation being worked through — practising the task itself rather than reading about it.",
  "html-module",
);

const aiAgentScreenWatch = pending(
  "ai-agent-software-training-screen-watch",
  "Screen-watching agent",
  "Yeda AI agent training a user on software by watching the screen",
  "The agent watches the screen and guides someone through another program — software training that happens inside the software.",
  "ai-agent",
);

/* FILLED from Figma, 2026-08-03 — the first pending slot to get a real screen.
   Was blocked on lms_11, which showed the same thing but carried an Excel logo.

   The alt and caption are written from the image, not carried over from the
   placeholder. The old ones promised "courses, learners and completion at a
   glance"; the screen shows exam counts and pass rates, and completion appears
   nowhere on it.

   Two things knowingly shipped: the screen is Hebrew (the sixth such image —
   flagged to Alexey, not hidden), and it carries a ~30px avatar photo in the
   corner. Victor cleared the avatar: it is Alexey's own design asset with no
   identifying text beside it, unlike fo_11, which was rejected for carrying a
   national ID, phone, date of birth and address. */
const adminDashboard: Shot = {
  id: "admin-dashboard-courses-learners-overview",
  file: `${P}/yeda-admin-dashboard-exam-results.png`,
  width: 1210,
  height: 720,
  alt: "Yeda administrator dashboard showing exam counts, student numbers and pass-rate charts",
  caption:
    "The administrator's home — how many exams and questions are in play, how many people sat them, and what proportion passed.",
  label: "Admin dashboard",
  category: "dashboard",
  sector: "both",
  source: "figma",
  figmaFrame: "dashboard",
};

/* FILLED 2026-08-05 — the second pending slot to get a real screen, and the
   reason the placeholder count drops by one.

   It replaces `assignToDepartment`, whose placeholder promised "assigning a
   programme to a whole department or cohort AND NOTIFYING THEM". No screen in
   the set shows assignment, so the label, alt and caption are rewritten to the
   half this picture does show: the rule that fires the notification. Promising
   assignment over a picture of an automation canvas would be the placeholder
   lying rather than admitting it was empty.

   DE-BRANDED on the same crop and the same assumption as `rolesPermissions` —
   see the long note there. Verified: 9602 badge pixels in the source, 0 in the
   written file. */
const roleAutomation: Shot = {
  id: "role-automation-and-notifications",
  file: `${P}/yeda-role-automation-and-notifications.png`,
  width: 1200,
  height: 853,
  alt: "A Yeda automation branching on a new user's role and ending in a notification",
  caption:
    "A rule drawn out: someone registers, the branch follows the role they were given, and after a set wait the notification goes out on its own.",
  label: "Automations and rules",
  category: "settings",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-workflows",
};

const publicApiReference = pending(
  "public-api-developer-reference",
  "Public API",
  "Yeda public API developer reference documentation",
  "The public API — the platform is addressable by other systems, not only by its own interface.",
  "integrations",
);

const insuranceProgramme = pending(
  "insurance-industry-training-programme",
  "Insurance training",
  "Yeda insurance industry training and certification programme",
  "An insurance training programme — a regulated industry where certification is the point.",
  "industry",
  "organizations",
);

/* ── Galleries ───────────────────────────────────────────────────────────
   Each homepage gallery OPENS with its sector-only screens, so the first thing
   that changes on a tab switch is the first thing you see. Beyond that the two
   share freely — most of the platform is genuinely relevant to both, and only
   one panel is visible at a time. */

export const GALLERIES: Record<string, Gallery> = {
  /* Kept for inner pages that ask for a general tour. Not used on the homepage,
     which shows the sector gallery so the tab changes the images too. */
  homepage: {
    id: "homepage",
    title: "See the platform",
    subtitle:
      "Every screen below is part of one platform — authoring, delivery, assessment and the data that comes back.",
    shots: [
      whiteLabelPortal,
      coursePlayerQuiz,
      interactiveVideoQuestion,
      examResults,
      aiStudyPlan,
      subtitlesTranslation,
      integrationsDiagram,
    ],
  },
  "organizations-platform": {
    id: "organizations-platform",
    title: "The platform, for organizations",
    subtitle:
      "Employee, supplier and customer training managed from one place — browse left to right.",
    /* videoLibrary and analyticsViewing moved to the Flow — they were showing
       the same idea twice on one page. aiAnswerSources and mobileApp dropped:
       all three AI composites share a framing, and mobileApp's phone screen is
       the one already inside aiStudyPlan. */
    shots: [
      whiteLabelOrg,
      rolesPermissions,
      implementation,
      employeePortal,
      insuranceProgramme,
      roleAutomation,
      coursePlayerQuiz,
      examResults,
      recordingStudio,
      subtitlesTranslation,
      aiStudyPlan,
      liveSessionRecording,
      integrationsDiagram,
      publicApiReference,
      interactiveModule,
      adminDashboard,
    ],
  },
  "education-platform": {
    id: "education-platform",
    title: "The platform, for institutions",
    subtitle: "Students, courses, examination and certification in one system — browse left to right.",
    /* studentCoursePlayer and interactiveVideoQuestion are different screens
       but share a presenter video, so they are kept far apart rather than
       adjacent. aiStudyPlan and mobileApp dropped here — see the note on the
       organizations gallery. */
    shots: [
      studentCoursePlayer,
      courseProgress,
      courseCatalogue,
      learningPathSchedule,
      whiteLabelPortal,
      avatarModule,
      examResults,
      recordingStudio,
      subtitlesTranslation,
      aiAnswerSources,
      liveSessionRecording,
      simulationModule,
      interactiveVideoQuestion,
      videoEditing,
    ],
  },
  authoring: {
    id: "authoring",
    title: "Building a learning module",
    subtitle:
      "From existing material to a finished interactive unit — read the flow left to right.",
    /* Reordered when the two concept drawings came out. They were this gallery's
       first and last slides, so removing them left it opening mid-process and
       ENDING ON SUBTITLES — while the subtitle promises it ends on "a finished
       interactive unit". The order now walks record -> edit -> subtitle -> embed
       questions -> the finished module, so the last slide is the thing the
       sentence says it will be. */
    shots: [
      recordingStudio,
      videoEditing,
      subtitlesTranslation,
      interactiveVideoQuestion,
      interactiveModule,
    ],
  },
  /* aiStudyPlan is left out — mobileApp is the phone screen from inside it, so
     the two cannot sit in one gallery.

     The AI-answers-from-video screen used to be excluded here too, because the
     Flow carried it on every inner page and no page shows the same screen
     twice. It no longer does — Flow step 01 now uses the Figma upload export —
     so that screen is unreferenced and this is the gallery it would belong to.
     Not added on spec: it would want a title and a caption written from the
     image, and nobody has asked for it. */
  "ai-and-agents": {
    id: "ai-and-agents",
    title: "AI agents at work",
    subtitle:
      "Answering from source material, and training people on software by watching the screen.",
    shots: [
      aiAnswerSources,
      aiAgentScreenWatch,
      mobileApp,
      analyticsInsights,
      avatarModule,
    ],
  },
  "integrations-and-live": {
    id: "integrations-and-live",
    title: "Synchronisation and live learning",
    subtitle:
      "Yeda syncs with the CRMs and meeting platforms already in use, and exposes an API.",
    shots: [
      integrationsDiagram,
      liveSessionRecording,
      publicApiReference,
      rolesPermissions,
    ],
  },
};

/**
 * Presenter composition figures — woman left, man right, as Alon's brief asks.
 *
 * This used to be keyed by position with an explicit note that we could not tell
 * which illustration was which, because the stand-in concept SVGs gave us
 * nothing to go on. The Figma exports settle it: the designer named them, and
 * the drawings agree — the woman's arm extends right, the man's extends left,
 * so each gestures inward toward the interface between them. The composition
 * only reads correctly this way round.
 */
export const PRESENTER_FIGURES: { left: PresenterFigure; right: PresenterFigure } = {
  left: figureWoman,
  right: figureMan,
};

/* PRESENTER_SCREEN is gone, and `lessonRecording` with it.
 *
 * The figures used to flank one static screenshot; they now flank the platform
 * carousel, which is where Figma "Home page 1.4" §4 puts them, so there is no
 * single centre screen any more.
 *
 * `lessonRecording` is NOT being folded into the galleries to save it. It is
 * `yeda-lesson-recording-presenter-studio.png` — the presenter on camera beside
 * the slide, with the record control — and both galleries already carry
 * `recordingStudio`, which is `yeda-lesson-recording-presentation-studio.png`:
 * the same studio, the same camera, the same controls, at a higher resolution.
 * Putting both on one track is the thing the gallery notes above already refuse
 * to do with the AI composites.
 *
 * So the const is deleted and the file stays in public/ unreferenced, following
 * `contentLibrary` and `aiAnswersFromVideo`. Nothing is lost that is not
 * already on the page. */

/**
 * The five steps of the product flow, in order. Shared between both sectors —
 * only the words change per sector, so the browser fetches each file once even
 * though both sector panels render.
 *
 * Keyed by the step id used in FLOW in content/site.ts.
 */
export const FLOW_SHOTS: Record<string, Shot> = {
  /* Was aiAnswersFromVideo, which showed an AI answering from a video above a
     step about bringing your own material in. This is the first Figma export
     and it shows exactly what the step describes. */
  ingest: uploadMaterial,
  build: courseModules,
  shape: materialEditor,
  /*
   * publish and measure moved off the 710×490 yedalabs.io screens onto the
   * yedalms.io ones, which are roughly double the resolution. This also
   * removes a duplicate: the carousel was showing a video library and an
   * analytics screen a few sections below the Flow doing the same, on the same
   * page. Both are now here only.
   */
  publish: videoLibrary,
  measure: analyticsViewing,
};

/**
 * The hero slider — six slides per sector.
 *
 * ORDER MATTERS TWICE OVER.
 *
 * The first entry is the one the Hero loads eagerly, so it is the LCP candidate
 * for its panel. It is also the first thing anyone sees, and the rule is that it
 * must not be a Hebrew screenshot — the worst available choice on an English
 * site, even with Victor's ruling that Hebrew screens may ship.
 *
 * That rule used to be satisfied by opening on a picture with no text in it at
 * all. Education no longer has to: since 2026-08-05 its first three slides are
 * real English screens, so it opens on one. Organizations still opens on the
 * language-neutral composite, because it has no English screen to lead with.
 *
 * The copy does NOT change between slides. `HERO[sector]` keeps one title,
 * subtitle and chip set; only the picture rotates. Victor supplied images and no
 * copy, and inventing six headlines per sector is not on the table — so the
 * slider carries exactly what exists. Each slide is a full `Shot` with its own
 * caption, so per-slide headlines can be added later without restructuring.
 *
 * Five of these twelve also appear in the carousel or Flow §05. See the note on
 * the hero-slide consts above: measured, shown to Victor, accepted.
 */
export const HERO_SLIDES: Record<Sector, readonly Shot[]> = {
  organizations: [
    heroOrgOverview, // no text, language-neutral
    implementation, // English
    whiteLabelOrg,
    rolesPermissions,
    meetingPlatformSync,
    analyticsViewing,
  ],
  education: [
    coursePageLessons, // English
    courseRoadmap, // English
    educationSchedule, // English
    coursePlayerQuiz,
    aiStudyPlan,
    engagementAnalytics,
  ],
};

/*
 * Two slides in one gallery must never share a title.
 *
 * `label` being required stops a slide having no title; it cannot stop two
 * having the SAME one, and that is the failure Victor actually saw — the
 * caption used to lead with `category`, which repeats across a 16-slide panel
 * by construction. Nothing automated caught it: counts, file existence and
 * dimensions were all green while three slides in a row read "Settings".
 *
 * Dev-only. It throws loudly the moment `npm run dev` starts, which is the
 * moment a new shot gets added, and it can never take a deployed page down.
 */
if (process.env.NODE_ENV === "development") {
  /* Every list a reader pages through, not just GALLERIES. The hero slider is
     six slides deep per sector and was invisible to this guard until it was
     added here — same failure mode, same consequence: two slides that look like
     the same slide. */
  const lists: { id: string; shots: readonly Shot[] }[] = [
    ...Object.values(GALLERIES).map((g) => ({ id: `gallery "${g.id}"`, shots: g.shots })),
    ...Object.entries(HERO_SLIDES).map(([sector, shots]) => ({
      id: `hero slider "${sector}"`,
      shots,
    })),
  ];

  for (const list of lists) {
    const seen = new Map<string, string>();
    for (const shot of list.shots) {
      const previous = seen.get(shot.label);
      if (previous) {
        throw new Error(
          `The ${list.id} shows the title "${shot.label}" twice ` +
            `(${previous}, ${shot.id}). Slide titles must be unique within a ` +
            `list — they are what tells two slides apart. If the ids match, ` +
            `the same shot is listed twice.`,
        );
      }
      seen.set(shot.label, shot.id);
    }
  }
}

export const getGallery = (id?: string): Gallery | null =>
  id ? (GALLERIES[id] ?? null) : null;

/** Count of slots still waiting on a real screen. */
export const pendingShotCount = () =>
  new Set(
    Object.values(GALLERIES)
      .flatMap((g) => g.shots)
      .filter((s) => s.file === null)
      .map((s) => s.id),
  ).size;
