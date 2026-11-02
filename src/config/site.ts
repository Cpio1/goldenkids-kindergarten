/**
 * Golden Kids World — the single place for the kindergarten's facts and links.
 * Both the website (desktop) and the mobile website read everything from here.
 *
 * Only confirmed facts are filled in. Fields set to `null` / `false` are NOT confirmed yet:
 * the site hides whatever depends on them. Fill a field in and rebuild — the UI updates itself.
 */

export type Localized = { kk: string; ru: string };

/** A real group. Add entries to `site.groups` once names (and ages) are confirmed. */
export type GroupInfo = {
  /** Stable key, e.g. "kun" */
  id: string;
  name: Localized;
  /** Optional, only if confirmed, e.g. { kk: "3–4 жас", ru: "3–4 года" } */
  ages?: Localized;
};

const PHONE_DIGITS = "77471770666";

export const site = {
  name: "Golden Kids World",

  // ——— Confirmed facts ———
  address: "Мамыр-4, 125",
  phone: {
    display: "+7 747 177 06 66",
    href: `tel:+${PHONE_DIGITS}`,
  },
  hours: { opens: "07:30", closes: "18:30", display: "07:30–18:30" },
  groupsCount: 3,
  ages: { from: 2, to: 6 },
  mealsPerDay: 5,

  // ——— Not confirmed yet (null = hidden on the site) ———
  /** City, e.g. { kk: "Алматы", ru: "Алматы" } — shown next to the address once filled. */
  city: null as Localized | null,
  /** Working days, e.g. { kk: "Дүйсенбі–жұма", ru: "Понедельник–пятница" }. */
  workingDays: null as Localized | null,
  /** Full profile URL, e.g. "https://www.instagram.com/…/". */
  instagramUrl: null as string | null,
  /** Verified 2GIS link to the kindergarten card, e.g. "https://2gis.kz/…". */
  twoGisUrl: null as string | null,
  /** Verified embeddable map URL (iframe src). Leave null — no map is embedded without it. */
  mapEmbedUrl: null as string | null,
  /** Public folder with documents (Google Drive etc.). */
  documentsUrl: null as string | null,
  whatsapp: {
    /** Turn on only after confirming that WhatsApp works on the phone number above. */
    enabled: false,
    url: `https://wa.me/${PHONE_DIGITS}`,
  },
  /** Real group names / ages — empty until confirmed. */
  groups: [] as GroupInfo[],
};

export const navIds = ["home", "about", "groups", "meals", "gallery", "documents", "contacts"] as const;
export type NavId = (typeof navIds)[number];

/** Production URL for metadata: set NEXT_PUBLIC_SITE_URL on Vercel once the domain is known. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
