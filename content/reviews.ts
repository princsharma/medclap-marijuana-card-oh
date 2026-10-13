// Patient reviews shown on service pages, and the source of the Review / AggregateRating schema.
//
// RULES (FTC 16 CFR Part 465, HIPAA, Google review-snippet guidelines):
// 1. Real patients only. Never write, edit for tone, or invent a review. Never pay or discount for one.
// 2. Add every review that meets the rules below, good or bad. Do not cherry-pick: the average must reflect them all.
// 3. Written permission to publish (`consentOn`) is required for reviews collected directly. Reviews copied from
//    Google need the reviewer to have posted publicly under that name; link the original in `sourceUrl`.
// 4. Show first name + last initial only. Remove any health detail (condition, symptoms, medicines) before adding,
//    and note it in `edited`. A review of how cannabis worked for a condition is a health claim: do not publish it.
// 5. Staff, doctors, their families and Medclap employees can never leave a review.

export type Review = {
  id: string;
  firstName: string;
  lastInitial: string;
  city?: string;                  // Ohio city, only if the reviewer gave it
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;                   // ISO date the review was written
  text: string;                   // verbatim, minus removed health details
  visit: 'new' | 'renewal';
  source: 'Google' | 'Direct';    // Direct = post-visit survey/email
  sourceUrl?: string;             // link to the public original (Google)
  verifiedPatient: boolean;       // matched to a completed visit in the EHR
  consentOn?: string;             // date written permission to publish was given (required for Direct)
  edited?: string;                // what was removed, e.g. "condition name removed"
  physicianSlug?: string;         // if the reviewer named their doctor
};

export const reviews: Review[] = [];

/** Where patients can leave a review. null = not set up yet. */
export const reviewLinks = {
  google: null as string | null,  // Google Business Profile "write a review" link
};

/** Every review that is allowed to be shown. Direct reviews without written consent are never shown. */
export const publishable = () =>
  reviews.filter((r) => r.source === 'Google' ? !!r.sourceUrl : !!r.consentOn).sort((a, b) => b.date.localeCompare(a.date));

export function summary(list = publishable()) {
  const count = list.length;
  const avg = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ stars: n, count: list.filter((r) => r.rating === n).length }));
  return { count, avg: Math.round(avg * 10) / 10, dist };
}
