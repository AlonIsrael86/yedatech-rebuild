/**
 * Customer testimonials.
 *
 * SOURCE: supplied by Seva and Alexey on 2026-08-24, relayed by Victor. These
 * are not written here and not paraphrased — the five quotes below are the text
 * exactly as it arrived, punctuation included. Nothing about a customer is
 * invented, which is the whole reason this file did not exist until now.
 *
 * WHY NOBODY IS NAMED. The brief that carried them says so in as many words:
 * "нужен апрув от клиентов чтоб поставить реальные имена" — client sign-off is
 * needed before real names can go up. Until each client gives it, a testimonial
 * carries the speaker's ROLE and the KIND of company they run it in, which is
 * what Seva and Alexey supplied and how they intended it to ship. Victor's
 * instruction on handing them over was the same: use them without the client's
 * real name.
 *
 * So `name` is null on every entry, and the card simply omits the line. When an
 * approval comes back, filling in that one field is the entire change — no
 * component edit, no layout change. Do not fill one in ahead of its approval:
 * these are real people at real companies, and attributing a sentence to
 * someone who has not agreed to it is the failure mode this whole file guards
 * against.
 *
 * SHARED BETWEEN SECTORS, rendered once, like VALUE_BAND. The five could be
 * split the way the client logos are — an online travel company and a staffing
 * firm are employers, a tech training institute and an EdTech startup are
 * educational — but the split is not in the source the way yedalms.io's two
 * groups were, it would be my inference rather than Yeda's grouping, and it
 * would leave two per tab. What each quote is actually about — how fast the
 * migration went, how little training the interface needed, whether it works on
 * a phone — is true of the platform regardless of which tab you arrived on.
 *
 * NO schema.org Review MARKUP. Review structured data requires a named author,
 * and Google treats an anonymous one as ineligible; emitting it with a company
 * type in the author slot would be marking up something the page does not say.
 * It becomes worth adding on the day the names are approved.
 */

export type Testimonial = {
  id: string;
  /** Verbatim. Never edited for length, tone or house style. */
  quote: string;
  /** The speaker's role, as supplied. */
  role: string;
  /** The kind of organization, as supplied — never the company's actual name. */
  org: string;
  /** Stays null until that specific client approves being named. See above. */
  name: string | null;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "travel-migration",
    quote:
      "Migrating our entire training program to Yeda took days, not months. Onboarding our team was fast and painless, and the transition barely disrupted our ongoing courses.",
    role: "CEO",
    org: "Online Travel Company",
    name: null,
  },
  {
    id: "edtech-interface",
    quote:
      "What stood out immediately was how intuitive the interface is. Our instructors and learners picked it up with almost no training required.",
    role: "CEO",
    org: "EdTech Startup",
    name: null,
  },
  {
    id: "automotive-onboarding",
    quote:
      "The onboarding process was smooth from day one. Within a week, our whole training team was fully up and running on the new system.",
    role: "Training Manager",
    org: "Automotive Services Company",
    name: null,
  },
  {
    id: "staffing-devices",
    quote:
      "Our learners access courses from laptops, tablets, and phones — Yeda just works, no matter the device. That flexibility has made a real difference in completion rates.",
    role: "Training Manager",
    org: "Staffing & Recruitment Firm",
    name: null,
  },
  {
    id: "training-institute-rollout",
    quote:
      "From an IT perspective, the migration was seamless and the platform is fully responsive across all devices — that made rollout across our tech training centers effortless.",
    role: "Information Systems Manager",
    org: "Tech Training Institute",
    name: null,
  },
];

export const TESTIMONIALS_COPY = {
  title: "What Yeda customers say",
  lede: "Five teams on migrating their training, getting people onboard, and what changed once the courses were live.",
} as const;
