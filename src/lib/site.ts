/** Shared, non-translatable site configuration. */

export const CALENDLY_URL = "https://calendly.com/anthony-becarne/30min";

/** Sections surfaced in the main navigation, in document order. */
export const NAV_SECTIONS = [
  "experience",
  "work",
  "skills",
  "education",
  "contact",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

/** How many cards to show before the "see more" toggle. */
export const PREVIEW_COUNT = 3;
