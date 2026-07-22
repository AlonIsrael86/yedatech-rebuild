/**
 * Centralized Hebrew content for the Yedatech homepage.
 *
 * SOURCING RULE (from HANDOFF.md): every visible claim must be traceable to the
 * live site (yedatech.io) or supplied Yeda materials. No invented statistics,
 * testimonials, client logos, awards, pricing, or product functionality.
 * Contact details are authoritative and must stay exact.
 */

export const CONTACT = {
  email: "Info@Yedatech.io",
  phone: "074-769-1066",
  phoneHref: "tel:+972747691066",
} as const;

export const NAV = [
  { label: "הפלטפורמה", href: "#platform" },
  { label: "יכולות", href: "#capabilities" },
  { label: "למי זה מתאים", href: "#audiences" },
  { label: "הפקת תוכן", href: "#production" },
  { label: "איך זה עובד", href: "#process" },
] as const;

export const HERO = {
  eyebrow: "מערכת ניהול למידה והפקת תוכן דיגיטלי",
  title: "הפלטפורמה המלאה ליצירה, ניהול והפצה של למידה דיגיטלית",
  subtitle:
    "Yeda מאחדת מערכת ניהול למידה מתקדמת עם אולפן הפקה ופיתוח תוכן — כדי שמכללות, ארגונים ויוצרי קורסים יבנו, ינהלו וירחיבו חוויות למידה במקום אחד.",
  primaryCta: "לתיאום הדגמה",
  secondaryCta: "הכירו את הפלטפורמה",
  chips: [
    "מודולי HTML ואווטאר",
    "מבחנים אינטראקטיביים",
    "ניהול מכללה וארגון",
    "אולפן הפקת תוכן",
  ],
} as const;

/** Verified capability statements used as the credibility layer (not metrics). */
export const CREDIBILITY = {
  title: "פתרון אחד לכל מסע הלמידה",
  subtitle:
    "מהקמת המערכת ועד הפקת התוכן וההפצה — Yeda מלווה את כל שלבי הלמידה הדיגיטלית תחת קורת גג אחת.",
  statements: [
    "מערכת LMS / LCMS מלאה",
    "הפקת קורסים דיגיטליים",
    "מבחנים, שאלונים ותעודות",
    "מודולים מבוססי אווטאר",
  ],
} as const;

export const AUDIENCES = {
  title: "בנוי סביב מי שלומד ומי שמלמד",
  subtitle: "כל קהל מוצא ב-Yeda את מה שהוא צריך — בלי להתפשר על השאר.",
  items: [
    {
      key: "colleges",
      title: "מכללות ואוניברסיטאות",
      body: "ניהול קורסים דיגיטליים ופרונטליים, מבחנים, תעודות ובקרת נתונים — במערכת אחת.",
      icon: "GraduationCap",
    },
    {
      key: "hr",
      title: "משאבי אנוש והדרכה",
      body: "גיוס, קליטה והכשרת עובדים עם מסלולי למידה, מעקב התקדמות ודוחות.",
      icon: "Users",
    },
    {
      key: "orgs",
      title: "ארגונים ויוצרי תוכן",
      body: "הפקת קורסים דיגיטליים, מודולי HTML ואווטאר ותוכן אינטראקטיבי באיכות אולפן.",
      icon: "Building2",
    },
    {
      key: "creators",
      title: "מומחים ומדריכים עצמאיים",
      body: "בניית קורס, ניהול לומדים והפצה — מהרעיון ועד ההשקה והמכירה.",
      icon: "UserRound",
    },
  ],
} as const;

export const CAPABILITIES = {
  title: "מערכת אחת, יכולות מקצה לקצה",
  subtitle:
    "כל היכולות עובדות יחד — ניהול, יצירה, הערכה והפצה של תוכן לימודי במקום אחד.",
  items: [
    {
      title: "ניהול למידה (LMS / LCMS)",
      body: "ניהול קורסים, מסלולים, קטגוריות ומשתמשים במערכת מרכזית אחת.",
      icon: "LayoutDashboard",
    },
    {
      title: "יצירת תוכן לימודי",
      body: "מודולי HTML, מודולים מבוססי אווטאר ושילוב פורמטים לחוויית למידה עשירה.",
      icon: "Sparkles",
    },
    {
      title: "מבחנים והערכה",
      body: "מבחנים אינטראקטיביים, שאלונים, ציונים ותעודות אוטומטיות.",
      icon: "ClipboardCheck",
    },
    {
      title: "וידאו ולמידה חיה",
      body: "שיעורים מוקלטים, נגן וידאו אינטראקטיבי ושידורים חיים.",
      icon: "PlayCircle",
    },
    {
      title: "ניהול לומדים",
      body: "הרשמה, מעקב התקדמות ותפעול שוטף של קהל הלומדים.",
      icon: "GraduationCap",
    },
    {
      title: "נתונים ובקרה",
      body: "לוח בקרה, סטטיסטיקות מבחנים ודוחות ביצועים בזמן אמת.",
      icon: "BarChart3",
    },
  ],
} as const;

export const PRODUCT = {
  eyebrow: "הצצה למערכת",
  title: "המערכת שמאחורי הלמידה",
  subtitle:
    "מסכים אמיתיים מתוך המערכת — מודולי תוכן HTML ווידאו אינטראקטיבי עם שאלות משובצות. התצוגה להמחשה בלבד.",
  // Coded conceptual dashboard (recreated from the Figma product frames).
  dashboard: {
    caption: "המחשה של ממשק המערכת",
    title: "לוח בקרה",
    kpis: [
      { label: "ס״כ המבחנים", value: "8" },
      { label: "ס״כ השאלות", value: "156" },
      { label: "מבחנים ממוצע לקורס", value: "3" },
      { label: "שאלות ממוצע לקורס", value: "12" },
    ],
    donut: {
      title: "סטודנטים שעברו את המבחנים",
      total: "100",
      legend: [
        { label: "ציון גבוה", value: 60, color: "var(--color-ok)" },
        { label: "ציון ממוצע", value: 30, color: "var(--color-warn)" },
        { label: "נכשלו", value: 10, color: "var(--color-err)" },
      ],
    },
  },
  avatarModule: {
    tag: "מודול מבוסס אווטאר",
    title: "שיעור אינטראקטיבי",
    body: "מודולי אווטאר שמשלבים הנחיה מצולמת, מצגת ותרגול — בתוך יחידת למידה אחת.",
  },
} as const;

/**
 * Avatar-based learning — the capability Alexey named as the headline. Copy
 * describes the real feature (avatar presenter combined with slide, video and
 * HTML content plus in-module practice). The quiz text is a clearly-labeled
 * illustration ("המחשה"), not a claim about a specific course.
 */
export const AVATAR = {
  eyebrow: "למידה מבוססת אווטאר",
  title: "אווטאר, מצגת ותרגול — ביחידת למידה אחת",
  subtitle:
    "מודולים מבוססי אווטאר שמשלבים מנחה דיגיטלי, מצגת ותוכן אינטראקטיבי — חוויית למידה עשירה שנבנית כיחידה אחת שלמה.",
  points: [
    {
      title: "מנחה אווטאר",
      body: "מנחה דיגיטלי שמלווה את הלומד לאורך היחידה בקול ובתמונה.",
      icon: "UserRound",
    },
    {
      title: "שילוב פורמטים",
      body: "מצגת, וידאו ומודולי HTML משולבים באותה יחידת למידה.",
      icon: "Layers",
    },
    {
      title: "תרגול בתוך המודול",
      body: "שאלות ותרגול אינטראקטיבי משובצים ישירות בתוך הלמידה.",
      icon: "ClipboardCheck",
    },
  ],
  panel: {
    caption: "המחשה של מודול אווטאר",
    presenterTag: "מנחה אווטאר",
    slideTitle: "יחידה 3 · עקרונות הלמידה הדיגיטלית",
    quiz: {
      tag: "תרגול",
      question: "מהו היתרון המרכזי של מודול מבוסס אווטאר?",
      options: ["למידה בקצב אישי", "שילוב פורמטים ביחידה אחת", "הדפסת חוברת"],
      correctIndex: 1,
    },
  },
} as const;

/**
 * Two more real product surfaces (coded, labeled "המחשה"): an HTML learning
 * module and a video player with an embedded question — both verified Yeda
 * capabilities from the live site.
 */
export const SURFACES = {
  html: {
    caption: "מודול HTML אינטראקטיבי",
    unit: "יחידה 2 · מבנה השיעור",
    accordion: "לחצו להרחבת הנושא",
    callout: "טיפ: אפשר לשלב טקסט, תמונה ותרגול באותו מסך.",
  },
  video: {
    caption: "וידאו עם שאלה משובצת",
    time: "02:14",
    duration: "08:30",
    question: "מה נלמד ביחידה זו?",
    options: ["מבנה קורס דיגיטלי", "עריכת וידאו"],
    cta: "המשך",
  },
} as const;

/**
 * Numbered feature showcase — the Figma's signature composition (big index +
 * product panel with a floating photo accent, alternating sides). Each block
 * pairs a coded product surface with a real photo from Alexey's Figma. Content
 * is verified capability; no pricing/invented specifics.
 */
export const FEATURE_BLOCKS = {
  eyebrow: "יכולות המערכת",
  title: "כל מה שצריך כדי ללמד, לתרגל ולהעריך",
  subtitle:
    "ארבע יכולות ליבה שעובדות יחד — מניהול הלמידה ועד תוכן אינטראקטיבי, אווטאר, וידאו והערכה.",
  blocks: [
    {
      n: "01",
      title: "ניהול הלמידה במקום אחד",
      body: "ניהול קורסים, מסלולים, לומדים ותעודות — עם נתונים ובקרה בזמן אמת.",
      panel: "dashboard",
      photo: "/media/professional-laptop.png",
      alt: "איש מקצוע לומד מול מחשב נייד",
    },
    {
      n: "02",
      title: "תוכן אינטראקטיבי ומודולי HTML",
      body: "יחידות למידה עשירות שמשלבות טקסט, מדיה ותרגול — הכול באותו מסך.",
      panel: "html",
      photo: "/media/training-room.png",
      alt: "הדרכה ארגונית בחדר ישיבות",
    },
    {
      n: "03",
      title: "למידה מבוססת אווטאר",
      body: "מנחה דיגיטלי שמשלב מצגת, וידאו ותרגול — ליחידת למידה אחת שלמה.",
      panel: "avatar",
      photo: "/media/learning.png",
      alt: "יוצר תוכן דיגיטלי",
      cutout: true,
    },
    {
      n: "04",
      title: "וידאו והערכה",
      body: "שיעורי וידאו עם שאלות משובצות, מבחנים אינטראקטיביים ותעודות אוטומטיות.",
      panel: "video",
      photo: null,
      alt: "",
    },
  ],
} as const;

export const PRODUCTION = {
  eyebrow: "אולפן ההפקה — Yeda Labs",
  title: "מרעיון לקורס מוכן",
  subtitle:
    "צוות ההפקה של Yeda בונה את התוכן איתכם — מאפיון הלמידה ועד מודולים אינטראקטיביים מוכנים להשקה.",
  steps: [
    { title: "אפיון ועיצוב למידה", body: "בניית מבנה הקורס, יעדי הלמידה וחוויית הלומד.", icon: "PenTool" },
    { title: "צילום והפקה באולפן", body: "צילום שיעורים, עריכה והפקת וידאו מקצועית.", icon: "Clapperboard" },
    { title: "פיתוח מודולים", body: "מודולי HTML ואווטאר, תרגולים ומבחנים אינטראקטיביים.", icon: "Code2" },
    { title: "ליווי השקה והפצה", body: "פרסום, הרשמה ותמיכה בהפצת הקורס לקהל.", icon: "Rocket" },
  ],
} as const;

export const PROCESS = {
  title: "איך מתחילים לעבוד עם Yeda",
  subtitle: "תהליך ברור ומלווה — מהשיחה הראשונה ועד למדידה ושיפור מתמשך.",
  steps: [
    { n: "01", title: "אפיון", body: "הבנת הצרכים, הקהל והיעדים." },
    { n: "02", title: "הקמה", body: "הגדרת המערכת, מסלולים והרשאות." },
    { n: "03", title: "תוכן", body: "הפקת קורסים, מודולים ומבחנים." },
    { n: "04", title: "השקה", body: "פרסום, הרשמה והפצה ללומדים." },
    { n: "05", title: "מדידה ושיפור", body: "דוחות, בקרה ואופטימיזציה מתמשכת." },
  ],
} as const;

/** Yeda product family — real product names from the current site. */
export const FAMILY = {
  title: "משפחת המוצרים של Yeda",
  subtitle: "מערכת אחת, כמה נקודות מבט — לכל סוג ארגון וקהל.",
  items: [
    { name: "Yeda LMS", body: "מערכת ניהול למידה", icon: "LayoutDashboard" },
    { name: "Yeda College", body: "ניהול מכללות ואקדמיה", icon: "GraduationCap" },
    { name: "Yeda Org", body: "למידה והדרכה בארגונים", icon: "Building2" },
    { name: "Yeda Labs", body: "הפקת תוכן וכלי AI", icon: "FlaskConical" },
    { name: "Yeda Tech", body: "תשתית וטכנולוגיה", icon: "Cpu" },
    { name: "Yeda Hub", body: "מרחב קורסים ותוכן", icon: "LayoutGrid" },
  ],
} as const;

/**
 * Native multi-step demo-request wizard (mirrors the pattern on the current
 * site). No backend this checkpoint — submit opens a prefilled mailto to the
 * real Yeda inbox, so nothing is silently captured. All options are verified
 * audiences/capabilities.
 */
export const DEMO_FORM = {
  intro: "מעוניינים בפתרון ליצירה וניהול של קורסים דיגיטליים? נשמח להראות לכם.",
  steps: [
    {
      key: "role",
      title: "מה העיסוק שלך?",
      type: "single" as const,
      options: [
        "מורה עצמאי/ת",
        "מכללה",
        "אוניברסיטה",
        "עסק",
        "ארגון",
      ],
    },
    {
      key: "interest",
      title: "מה מעניין אתכם?",
      type: "single" as const,
      options: [
        "מערכת ניהול למידה (LMS)",
        "הפקת קורסים דיגיטליים",
        "מודולי אווטאר ו-HTML",
        "הדרכת עובדים בארגון",
      ],
    },
    {
      key: "contact",
      title: "פרטים ליצירת קשר",
      type: "contact" as const,
      fields: [
        { name: "name", label: "שם מלא", inputType: "text", required: true },
        { name: "email", label: "אימייל", inputType: "email", required: true },
        { name: "phone", label: "טלפון", inputType: "tel", required: false },
        { name: "note", label: "הודעה (לא חובה)", inputType: "textarea", required: false },
      ],
    },
  ],
  ui: {
    next: "הבא",
    prev: "הקודם",
    submit: "שליחה",
    stepLabel: (n: number, total: number) => `שלב ${n} מתוך ${total}`,
    close: "סגירה",
    required: "שדה חובה",
    invalidEmail: "כתובת אימייל לא תקינה",
    pickOne: "בחרו אפשרות אחת",
  },
  success: {
    title: "תודה!",
    body: "נפתח עבורכם מייל מוכן לשליחה לצוות Yeda. נשמח לחזור אליכם בהקדם.",
  },
  mailSubject: "בקשת הדגמה — Yeda",
} as const;

export const FINAL_CTA = {
  title: "מוכנים לראות את Yeda בפעולה?",
  subtitle: "נבנה יחד הדגמה שמתאימה בדיוק לצרכים שלכם.",
  primaryCta: "לתיאום הדגמה",
} as const;

export const FOOTER = {
  tagline: "פלטפורמה מלאה ליצירה, ניהול והפצה של למידה דיגיטלית.",
  columns: [
    {
      title: "הפלטפורמה",
      links: [
        { label: "מערכת ניהול למידה", href: "#platform" },
        { label: "יכולות המערכת", href: "#capabilities" },
        { label: "הפקת תוכן", href: "#production" },
        { label: "איך זה עובד", href: "#process" },
      ],
    },
    {
      title: "Yeda",
      links: [
        { label: "אודותינו", href: "#" },
        { label: "צור קשר", href: "#contact" },
        { label: "משפחת המוצרים", href: "#family" },
      ],
    },
    {
      title: "מידע",
      links: [
        { label: "תקנון ותנאי שימוש", href: "#" },
        { label: "הצהרת נגישות", href: "#" },
      ],
    },
  ],
} as const;
