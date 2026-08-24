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

/* RETIRED 2026-08-06 with the carousel replacement, along with `whiteLabelOrg`,
   `implementation`, `analyticsViewing`, `courseProgress`, `heroOrgOverview`,
   `meetingPlatformSync`, `adminDashboard` and five placeholder slots. All of
   them held slots in the two platform galleries or the organizations hero, and
   both were replaced outright by Victor's chosen set. Every file stays in
   public/ unreferenced, as retired assets on this project always do.

   `studentCoursePlayer` was here — yeda-education-student-course-player.png,
   1314×867, the student's own course page. `coursePageLessons` is the same
   idea from Alexey's Figma, in English, and it is carousel slide 2. */

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

/* `videoLibrary` (yeda-video-content-library-and-storage.png, 1314×893) was
   retired here on 2026-08-06. It held Flow step 04 and nothing else, and step 04
   is now Victor's members-and-roles screen. The two show different halves of the
   same sentence — the step says finished lessons "land in one library, then go
   out ... by role, department or cohort", and the new picture is the second
   half. Choosing between them was his call, not a tidy-up. File left in public/
   unreferenced. */

/* RETIRED 2026-08-06, both of them, with the carousel replacement.

   `whiteLabelOrg` — yeda-organizations-white-label-branding.png, 1314×882, a
   logo slot and a colour picker. `orgThemeEditor` is the same capability from
   Alexey's Figma and goes considerably further: the preset, the typeface and
   the radius, with the components they produce rendered beside them.

   `implementation` — yeda-organizations-implementation-and-rollout.png,
   1278×882, the rollout tracker. This was the fo_2_en English swap, the first
   of the six Hebrew screens Victor replaced; nothing in his new set covers
   rollout, so this capability is no longer pictured anywhere. Worth knowing
   rather than discovering later. */

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

/* RETIRED 2026-08-06. `analyticsViewing` —
   yeda-learning-analytics-viewing-data.png, 1314×943 — held Flow step 05 until
   yesterday and organizations hero slide 6 until today, and both moved. It is
   the only screen the project ever had showing completion, repeat-viewing and
   per-question success together, which is precisely what Flow step 05 still
   promises in words. Nothing pictures that claim now. Flagged, not fixed:
   Victor chose the assistant dashboard for step 05 knowing the mismatch, and
   dropping the organizations hero list is what removed the second use. */

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
/* RETIRED 2026-08-06. `courseProgress` —
   yeda-education-course-progress-tracking.png, 1200×702, the learner's course
   list with percentage complete and last activity. `courseStatistics` from
   Victor's set covers the same ground per lesson rather than per course, and is
   carousel slide 4. */

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

/* RETIRED 2026-08-06 with the organizations hero list. `heroOrgOverview` —
   yeda-hero-organizations-training-overview.png, 1170×697 — was that hero's
   opening slide, and the only image on the homepage with no real product in it:
   a person at a laptop with playback, a certificate and reporting drawn around
   them. It was the most-seen picture on the site. It is now in no list. */

/* RETIRED 2026-08-06 with the organizations hero list, and this one closes an
   open exposure rather than merely tidying up.

   `meetingPlatformSync` — yeda-meeting-platform-sync-zoom-teams-meet.png,
   1341×876 — carried the Zoom wordmark, the Microsoft Teams logo and the Google
   Meet logo as three badges, plus Google and Microsoft glyphs in its calendar
   toolbar. The standing rule is that no third-party mark reaches this public
   repo without Alexey; Victor overrode it knowingly on 2026-08-03 and the
   clearance request has been sitting with Alexey since. Nothing renders it now,
   so the answer no longer gates anything. The file stays in public/
   unreferenced — if the clearance comes back yes it can go straight back into a
   list; if it comes back no, delete the file too.

   Note `learner-schedule`, which IS still on the page as `educationSchedule`,
   carries small Google and Outlook glyphs in its "Sync with" control. Victor
   cleared those separately. This retirement does not cover them. */

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

/* ── The numbered flow, 2026-08-06 ───────────────────────────────────────
   The five images below are Victor's own choice, delivered named for the five
   steps. That is the process from here on: he picks the picture, the page is
   fitted around it. Everything here is read off the file — alt, caption, label
   and the dimensions, which come from sharp rather than an export dialog.

   Four of the five are 16:9, which ends a long-standing defect: step 01 used to
   be a 1.80 cut-out against neighbours at 1.39–1.47 and rendered a 292px plate
   where the rest were 362px. Step 05 is now the odd ratio at 1.35.

   None of them needs `needsSurface`. They report an alpha channel, but it is
   0.01% of the pixels and it is only the 14px rounded corners — the ground is
   baked in, as it is on the yedalms.io composites. At the rendered 560px those
   corners fall inside the container's own 14px clip. */

const uploadMaterial: Shot = {
  id: "choose-materials-for-a-module",
  file: `${P}/yeda-choose-materials-for-a-module.png`,
  width: 1200,
  height: 675,
  alt: "The Yeda module wizard on its first step, offering stored videos, document upload and a written outline",
  caption:
    "The first step of building a module: videos already in storage, documents uploaded exactly as they are, or an outline typed straight in — one of the three, or all of them together.",
  label: "Choosing the material",
  category: "flow",
  sector: "both",
  source: "figma",
  figmaFrame: "01-bring-the-material-you-already-have",
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

/* Steps 02 and 03 were the last two 710×490 Hebrew screens in the Flow. Their
   files stay in public/ unreferenced, as retired assets on this project always
   do — see `contentLibrary` and `lessonRecording`. */

const courseModules: Shot = {
  id: "module-builder-pages-and-lesson",
  file: `${P}/yeda-module-builder-pages-and-lesson.png`,
  width: 1200,
  height: 675,
  alt: "The Yeda module builder with the page list beside a written-out lesson, ready to publish",
  caption:
    "What came back, open for review — the module's pages listed down one side and one of them written out in full, with its introduction and what the lesson will cover.",
  label: "The module Yeda built",
  category: "flow",
  sector: "both",
  source: "figma",
  figmaFrame: "02-yeda-builds-the-plan-and-the-modules",
};

const materialEditor: Shot = {
  id: "slide-editor-templates-and-recording",
  file: `${P}/yeda-slide-editor-templates-and-recording.png`,
  width: 1200,
  height: 675,
  alt: "The Yeda slide editor with the layout picker open and the presenter's camera ready to record",
  caption:
    "The same material, reshaped — a layout chosen for the slide, text, photos, icons and practice forms down the side, and the presenter's camera ready to record against it.",
  label: "Editing and recording",
  category: "flow",
  sector: "both",
  source: "figma",
  figmaFrame: "03-shape-it-the-way-your-organization-works",
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
   retired here. It showed a foldered video library, duplicating `videoLibrary`
   at 1314×893 — the same idea in the Flow and the carousel on one page. Both
   are gone now: `videoLibrary` was itself retired on 2026-08-06 when step 04
   took Victor's members screen, so no foldered library is on the page at all.
   Both files are left in public/ unreferenced in case an inner page wants one. */

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

/* RETIRED 2026-08-06. `employeePortal`, `courseCatalogue` and
   `learningPathSchedule` were three of the seven grey cards on the homepage.
   Replacing both platform galleries took every placeholder off it — the
   homepage now shows only real screens, which is what Alexey asked for in the
   first place.

   None of the three is covered by Victor's set, so those capabilities are no
   longer pictured: an employee's own assigned-training portal, self-enrolment
   from a catalogue, and a programme laid out over time. If a screen for any of
   them turns up, this is the shape it goes back in as.

   `avatarModule`, `aiAgentScreenWatch` and `simulationModule` are the other
   three. The first two survive below because `ai-and-agents` still holds them
   on the AI inner pages, which this change does not touch. */
const avatarModule = pending(
  "avatar-learning-module-presenter-and-slides",
  "Avatar presenter",
  "Yeda avatar-based learning module with a digital presenter beside the slides",
  "An avatar module — a digital presenter delivers the material, so a course does not need a studio booking to exist.",
  "avatar-module",
);

/* RETIRED 2026-08-06 with the other placeholders. `simulationModule` promised a
   simulation being worked through — practising the task rather than reading
   about it. Nothing in Victor's set shows one. */

const aiAgentScreenWatch = pending(
  "ai-agent-software-training-screen-watch",
  "Screen-watching agent",
  "Yeda AI agent training a user on software by watching the screen",
  "The agent watches the screen and guides someone through another program — software training that happens inside the software.",
  "ai-agent",
);

/* RETIRED 2026-08-06. `adminDashboard` —
   yeda-admin-dashboard-exam-results.png, 1210×720 — was the exam-counts and
   pass-rate dashboard, and it was the LAST Hebrew screen on the homepage. It
   also carried the ~30px avatar Victor cleared in August. `orgAdminHome` from
   his new set is the same kind of screen in English, so the homepage now has no
   Hebrew in its pixels at all. */

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

/* RETIRED 2026-08-06, the last of the seven placeholders. `insuranceProgramme`
   was the only industry-specific card on the homepage. The industry pages
   themselves are unaffected — they never rendered it. */

/* ── The carousel set, 2026-08-06 ────────────────────────────────────────
   Victor's chosen files, from `_figma_ref/media-carousel/`. They replace both
   platform galleries outright — the yedalms.io screens and every grey
   placeholder are gone from the homepage.

   SIX OF HIS SEVENTEEN ARE NOT HERE, and not because they were rejected.
   `admin-roles`, `admin-workflows`, `learner-roadmap`, `learner-player`,
   `learner-schedule` and `admin-members` are screens this repo ALREADY ships,
   cut from the 3840px sources at equal or better resolution — 1200×853 against
   949×675 for the two admin ones, and pixel-for-pixel the same crop. The
   galleries below reuse those consts rather than adding a second, smaller file
   of the same screen. `admin-members` is Flow step 04 and stays there only.

   DE-BRANDED. Five of the admin screens carried the `Juno OPS` lockup and
   `admin@juno.ops` in a sidebar whose border measures at x=250; the crop takes
   everything left of x=251. Verified on every written file by scanning for the
   badge red: 747 in each source, 0 in each output.

   REDACTED BY BLUR, on Victor's instruction, where a crop could not reach:
    - `learner-profile` — the email/location/phone row and the CV thumbnail.
      The source carries a live-domain Gmail address and a phone number that is
      not a reserved fictional pattern, beside a face. Same category as the
      profile screen rejected in July. The name and face stay.
    - `admin-user` — the email, the phone and the Employee ID.
    - `admin-builder` — the Juno wordmark in the preview header and the word
      "Juno" opening the paragraph beneath it. Measured, not eyeballed: the
      paragraph's ink starts at x=473 and the first inter-word gap is 496-498,
      so the box stops at 499 and "helps" survives intact. A looser box ate it
      and the line read "ps educators and teams…".
      Worth being honest about what that blur is doing: unlike the other two it
      conceals another product's identity rather than removing personal data,
      and the question of whether Juno OPS is Alexey's demo tenant or a separate
      product is still unanswered by Seva. Victor took the call to ship. */

/* UPDATED 2026-08-06 — Victor replaced the source. It was the Dashboard's
   General tab (a users pie, new sign-ups, forum threads) at 1200×675; it is now
   the Exams tab, 1346×1600 portrait, and a much stronger screen: totals, the
   split between successful and failed attempts, and the mark bands the people
   who passed fall into.

   CUT AT y=635 OF 1600, AND THIS ONE IS NOT OPTIONAL. Below that line the page
   carries "The most problematic question" and "The most problematic wrong
   answer", and both are filled with Lorem ipsum — eight blocks of it, plus
   "Exam: Lorem ipsum dolor" twice in the card headers. No placeholder copy is
   the oldest rule on this project. The cut lands in the page-background gap
   under the two donut cards, so nothing is sliced: verified, the last five rows
   of the written file are background with no card edge in them.

   The bottom of the source also holds two period charts worth having. They are
   NOT spliced in — removing the Lorem ipsum band and joining the halves would
   compose a screen that has never existed. If those charts are wanted, they
   want their own slide from their own export.

   alt, caption and the filename are all rewritten: the old ones described the
   General tab, and the file was called ...users-and-activity, which this is
   not.

   NAVIGATION RAIL CROPPED OFF at x=200, on Victor's instruction — "crop the
   photo so that only the dashboard can be seen". The rail is white and the
   content area's ground is pale blue-grey, so the boundary measures exactly:
   white through x=199, page background from x=200. The yeda wordmark went with
   the rail, so this is no longer the one carousel image carrying Yeda's own
   branding.

   RIGHT EDGE PULLED IN TO CENTRE IT, second pass. The source is a 1346px-wide
   window whose content does not fill it: ink runs x 251..1103, leaving a 51px
   left margin against 242px of dead space on the right, so the dashboard sat
   visibly off to one side. Cutting at 1155 — the right edge of the ink plus the
   same 51px — balances it. Measured on the written file afterwards: 51px each
   side.

   955×635, ratio 1.504. It has now been three ratios in one day — 2.120 with
   the rail and the dead space, 1.805 with the rail gone, 1.504 centred — and
   the last is the best fit for the track, sitting between the roles editor at
   1.407 and the roadmap at 1.546. */
const orgAdminHome: Shot = {
  id: "organizations-admin-dashboard",
  file: `${P}/yeda-organizations-admin-dashboard-exam-statistics.png`,
  width: 955,
  height: 635,
  alt: "The Yeda administrator dashboard on its exams tab, showing exam and question totals beside the pass rate and the spread of marks",
  caption:
    "The administrator's home — how many exams and questions are in play, what share of attempts succeeded, and how the people who passed are spread across the mark bands.",
  label: "Admin dashboard",
  category: "dashboard",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-dashboard",
};

const orgUserAccess: Shot = {
  id: "organizations-user-profiles-and-access",
  file: `${P}/yeda-organizations-user-profiles-and-access.png`,
  width: 949,
  height: 656,
  alt: "One person's Yeda record, holding a separate profile and level of access for each organization they belong to",
  caption:
    "One person, several organizations — each with its own profile and its own access, so somebody can administer one site and study on another without a second account.",
  label: "One person, many roles",
  category: "settings",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-user",
};

const orgSiteBuilder: Shot = {
  id: "organizations-learning-site-page-builder",
  file: `${P}/yeda-organizations-learning-site-page-builder.png`,
  width: 1138,
  height: 675,
  alt: "The Yeda page builder editing a learning site's landing page, with typography, layout and colour controls beside a live preview",
  caption:
    "The page learners arrive at, built in the platform — fonts, spacing, radius and colour on one side, the result updating on the other, published when it is ready.",
  label: "Page builder",
  category: "settings",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-builder",
};

const orgThemeEditor: Shot = {
  id: "organizations-white-label-theme-editor",
  file: `${P}/yeda-organizations-white-label-theme-editor.png`,
  width: 949,
  height: 675,
  alt: "The Yeda theme editor showing a preset, fonts and corner radius beside a live preview of the buttons, tabs, inputs and dialogs they produce",
  caption:
    "Branding as configuration — pick the preset, the typeface and the shape once, and every button, tab, field and dialog across the platform follows.",
  label: "Theme and branding",
  category: "settings",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-themes",
};

const orgAuditLog: Shot = {
  id: "organizations-admin-audit-log",
  file: `${P}/yeda-organizations-admin-audit-log.png`,
  width: 949,
  height: 675,
  alt: "The Yeda audit log listing role changes by action, target, organization, who made them and whether they succeeded",
  caption:
    "Every change on the record — what was done, to which role, in which organization, by whom, and whether it went through or was blocked.",
  label: "Audit log",
  category: "settings",
  sector: "organizations",
  source: "figma",
  figmaFrame: "admin-audit",
};

/* The strongest single image in the set, and the only one Victor supplied
   separately rather than in the batch. "Powered by yeda" sits bottom-left; the
   tenant logo top-left reads "IPSUM", which is white-label placeholder branding
   — noted for Alexey, not something a crop can fix without losing the panel. */
const assistantStudyPlan: Shot = {
  id: "ai-learning-assistant-personal-study-plan",
  file: `${P}/yeda-ai-learning-assistant-personal-study-plan.png`,
  width: 1200,
  height: 723,
  alt: "The Yeda learning assistant proposing a study plan, building it from the course material, and rebuilding it when the learner rejects a topic",
  caption:
    "The assistant offers a study plan, builds it out of the course material, and when the learner says they do not want the fourth topic it rewrites the plan rather than arguing.",
  label: "Study plan on request",
  category: "ai-agent",
  sector: "both",
  source: "figma",
  figmaFrame: "Chat",
};

const courseStatistics: Shot = {
  id: "education-course-statistics-per-lesson",
  file: `${P}/yeda-education-course-statistics-per-lesson.png`,
  width: 1200,
  height: 645,
  alt: "Yeda course statistics listing each lesson with its type, percentage progress and time spent",
  caption:
    "A course opened up lesson by lesson — what kind of thing each one is, how far through it people are, and how long it actually took them.",
  label: "Course statistics",
  category: "analytics",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-progress",
};

/* Trimmed at y=625 of 675 to drop the account name in the sidebar foot. Same
   treatment as `courseMessages` below, and the same reason: a demo person's
   name is not something to publish just because it came with the screen. */
const examQuestion: Shot = {
  id: "education-online-exam-question",
  file: `${P}/yeda-education-online-exam-question.png`,
  width: 1200,
  height: 625,
  alt: "A Yeda exam in progress — question two of ten, four options, and the time remaining",
  caption:
    "An exam mid-flow, with every question reachable, the time left in view, and nothing submitted until the learner says so.",
  label: "Exam in progress",
  category: "assessment",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-exam",
};

const courseMessages: Shot = {
  id: "education-course-messages-and-teacher-inbox",
  file: `${P}/yeda-education-course-messages-and-teacher-inbox.png`,
  width: 1200,
  height: 600,
  alt: "A Yeda course inbox with messages from teachers and course staff, and one thread open with its attachment",
  caption:
    "The conversation around a course, kept with the course — teachers, coordinators and the platform itself in one inbox, with the material attached where it was promised.",
  label: "Messages",
  category: "dashboard",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-messages",
};

const learnerProfile: Shot = {
  id: "education-learner-profile",
  file: `${P}/yeda-education-learner-profile.png`,
  width: 1200,
  height: 637,
  alt: "A Yeda learner's own profile page with their picture, their background and their attached CV",
  caption:
    "The learner's own page — who they are and what they are working towards, with a CV attached, so a cohort is made of people rather than user IDs.",
  label: "Learner profile",
  category: "dashboard",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-profile",
};

/* ZOOMED 2026-08-06. The source is a 1200×675 window holding a 414×407 card
   dead centre, so 35% of the frame's width was the screen and the rest was
   white. At the desktop slide height the card rendered 161×158 — the weakest
   frame in either track.

   The crop is the card's bounding box (x 393..806, y 134..540) with 20px above
   and below, widened symmetrically about its centre until the ratio reaches
   1.400. Card margins land at 107 left and 105 right, one pixel off perfect
   from rounding.

   WHY 1.400 AND NOT TIGHTER. Written when slide width was derived from the
   ratio against a fixed height, so the card's rendered size was set almost
   entirely by the vertical crop: a tight 462×455 crop rendered the card 238×234
   against this one's 243×239 — no gain — and would have made the slide 266px
   wide in a track whose narrowest was 368px.

   That sizing model is gone (MediaCarousel now fixes the WIDTH and draws every
   slide in one band ratio), so the argument no longer holds — but the crop is
   still the right one, for a plainer reason. 1.400 is the narrowest frame in
   the education set and the band is drawn at the set's median, 1.860, so this
   is the slide that sits furthest from it. Cropping tighter would only widen
   the white margins either side of it.

   No resize: the card's 414px are all the pixels there will ever be, and
   resampling would only soften them. Density falls from 2.6× to 1.7× as pure
   arithmetic — zooming without new pixels costs exactly that, under any crop.

   The card holds the Google and Facebook sign-in buttons, so this makes two
   third-party marks 1.5× more prominent. It adds no new mark; it is in the
   Alexey brief with the rest of the logo items. */
const learnerSignIn: Shot = {
  id: "education-learner-sign-in",
  file: `${P}/yeda-education-learner-sign-in.png`,
  width: 626,
  height: 447,
  alt: "The Yeda LMS sign-in screen, with email and password or a single-click Google or Facebook sign-in",
  caption:
    "Getting in — an email and a password, or the account a learner already has, so the first step of a course is not a support ticket.",
  label: "Signing in",
  category: "settings",
  sector: "education",
  source: "figma",
  figmaFrame: "learner-signin",
};

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
    /* REPLACED WHOLESALE 2026-08-06 with Victor's chosen set. Sixteen slides
       became seven, and the three grey placeholders in the old list are gone
       with it — nothing here is waiting on a screen that does not exist.

       ORDER IS A LEFT-TO-RIGHT PROGRESSION, not a grouping. The subtitle says
       "browse left to right" and the track reads that way, so each slide should
       follow from the one before it:

         see the platform → define what a role may do → give people those roles
         → let the rest run by itself → build the pages learners land on →
         brand them → keep the record of every change

       Corrected 2026-08-06: `orgUserAccess` sat at position 2, ahead of
       `rolesPermissions`. Assigning somebody a role before the roles exist is
       backwards, and it was the one step that broke the chain. Defining comes
       first, assigning second.

       It opens on the dashboard because that is where an administrator opens,
       and because it is the only screen in the set with real Yeda branding and
       no redaction at all. */
    shots: [
      orgAdminHome,
      rolesPermissions,
      orgUserAccess,
      roleAutomation,
      orgSiteBuilder,
      orgThemeEditor,
      orgAuditLog,
    ],
  },
  "education-platform": {
    id: "education-platform",
    title: "The platform, for institutions",
    subtitle: "Students, courses, examination and certification in one system — browse left to right.",
    /* REPLACED WHOLESALE 2026-08-06 with Victor's chosen set. Fourteen slides
       became nine, and the four grey placeholders are gone.

       ORDER IS A LEFT-TO-RIGHT PROGRESSION — a learner's term, in the order
       they live it, so each slide follows from the one before:

         get in → see the course and where you are in it → open a lesson →
         let the assistant reshape it → sit the exam → see how it went, lesson
         by lesson → look at the week ahead → ask the teacher → your own page

       Corrected 2026-08-06, twice over. `courseStatistics` sat ahead of
       `examQuestion`, which put the result before the thing being measured.
       And `learnerSignIn` was parked last for being the weakest frame — true,
       but it is where a learner starts, and a progression that opens mid-course
       and ends at the login box is not a progression. Sequence beats picking
       the prettiest opener.

       Slides 2, 3 and 7 are the same three consts the education hero opens
       with, so those pictures appear twice on the homepage. Victor was shown
       that and chose to leave the hero untouched. Reusing the consts rather
       than adding second crops of the same screens at least makes the repeat
       exact instead of nearly-but-not-quite. */
    shots: [
      learnerSignIn,
      courseRoadmap,
      coursePageLessons,
      assistantStudyPlan,
      examQuestion,
      courseStatistics,
      educationSchedule,
      courseMessages,
      learnerProfile,
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

/* DE-BRANDED, and the one thing to check if this is ever re-cut. The delivered
   file carries the `Juno OPS` lockup top-left and `admin@juno.ops` bottom-left,
   both inside a sidebar whose right border measures at x=250. The crop takes
   everything left of x=251, which removes both marks and nothing else — verified
   by scanning the written file for the badge red and finding 0 pixels against
   747 in the source, so the detector is known to work. It is the same treatment
   `rolesPermissions` and `roleAutomation` got, and the same open question sits
   under it: whether Juno OPS is a fictional demo tenant in Alexey's Figma or a
   separate product. Seva has not answered. Victor took the call to ship it
   cropped.

   The bottom is cut at the row separator below Clara Martinez (y=511) rather
   than at a 16:9 line, because 16:9 landed mid-row and sliced a name in half;
   41px of empty background came off the right instead, which brings it back to
   1.777 with nothing lost — the rightmost ink is at x=892.

   What stays: demo people with avatars, names and @example.com addresses — the
   RFC 2606 reserved domain, so synthetic — and two named institutions. Demo
   data inside a product UI, but a reader could take them for customers, which
   is in the note to Alexey. */
const memberRolesAssignments: Shot = {
  id: "organization-members-roles-and-assignments",
  file: `${P}/yeda-organization-members-roles-and-assignments.png`,
  width: 908,
  height: 511,
  alt: "A Yeda organization's member list showing each person's assignments, status, and the role they hold on each site",
  caption:
    "Who it reached, and as what — the people in an organization with the training assigned to each of them, whether they are active or still invited, and the role they hold on every site.",
  label: "Members and roles",
  category: "settings",
  sector: "both",
  source: "figma",
  figmaFrame: "04-publish-it-to-the-people-who-need-it",
};

/* KNOWINGLY SHIPPED AGAINST ITS OWN STEP. Step 05 promises "completion, drop-off
   and the success rate on every question". This screen reports on the learning
   assistant instead — conversations, messages, engagement, one average grade —
   and `analyticsViewing`, which it replaces in the Flow, does show all three of
   the things the step names. Victor chose this picture and chose to leave the
   step's wording alone, so the caption below describes the screen honestly and
   the sentence beside it on the page is about different measures.

   `analyticsViewing` is deliberately NOT repointed: it carries one caption for
   both of its consumers, so editing it in place would have moved Organizations
   hero slide 6 as well, and hero slides are parked pending Victor's decision.
   The Flow changes; the hero does not.

   Two flaws in the source, both Alexey's UI rather than ours, both in the note
   to him: "Assistent" is misspelled twice, and the date filter reads Jul 2024
   while the chart axis runs Apr–Jun. */
const assistantAnalytics: Shot = {
  id: "ai-assistant-usage-dashboard",
  file: `${P}/yeda-ai-assistant-usage-dashboard.png`,
  width: 1200,
  height: 888,
  alt: "A Yeda dashboard reporting on the learning assistant — conversations started, messages, engagement rate and average grade",
  caption:
    "The reporting side: how many conversations the learning assistant held, how many messages went back and forth, what share of people stayed active, and the average grade beside them.",
  label: "Assistant reporting",
  category: "analytics",
  sector: "both",
  source: "figma",
  figmaFrame: "05-see-what-actually-landed",
};

/**
 * The five steps of the product flow, in order. Shared between both sectors —
 * only the words change per sector, so the browser fetches each file once even
 * though both sector panels render.
 *
 * Keyed by the step id used in FLOW in content/site.ts.
 */
export const FLOW_SHOTS: Record<string, Shot> = {
  /* All five are Victor's chosen images as of 2026-08-06, delivered named for
     the steps they belong to, so the mapping below is his and not inferred. */
  ingest: uploadMaterial,
  build: courseModules,
  shape: materialEditor,
  publish: memberRolesAssignments,
  measure: assistantAnalytics,
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
/*
 * ONE SLIDER, BOTH SECTORS, as of 2026-08-06.
 *
 * Victor dropped the organizations list — "drop the organizations hero carousel
 * entirely, leave only education hero carousel" — and asked for the education
 * one in its place. The per-sector heading, subtitle and chips are untouched;
 * only the picture column is shared. Same array object, so the browser fetches
 * each file once even though both panels render server-side.
 *
 * Flagged once and then left alone: an organizations visitor now sees
 * student-facing screens in the hero.
 *
 * Two things went with the organizations list, both worth having gone.
 * `meetingPlatformSync` was the only asset on the site carrying the Zoom,
 * Teams and Google Meet trademarks — shipped on Victor's override with a
 * clearance request still sitting with Alexey, and now moot. `heroOrgOverview`
 * was the stock composite, the one hero image with no real product in it.
 */
const EDUCATION_HERO: readonly Shot[] = [
  coursePageLessons, // English
  courseRoadmap, // English
  educationSchedule, // English
  coursePlayerQuiz,
  aiStudyPlan,
  engagementAnalytics,
];

export const HERO_SLIDES: Record<Sector, readonly Shot[]> = {
  organizations: EDUCATION_HERO,
  education: EDUCATION_HERO,
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
