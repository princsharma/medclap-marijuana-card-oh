// Facts the legal pages depend on. null = not confirmed yet; the page shows a highlighted
// "to be confirmed" marker instead of guessing. Fill these in, then set status to 'final'.
export const legal = {
  status: 'draft' as 'draft' | 'final',          // 'draft' shows the review banner on every legal page
  effectiveDate: '14 October 2026' as string | null,  // site launch date (Prince, 14 Oct 2026)           // e.g. '1 November 2026'
  company: 'Marijuana Card OH' as string | null,                 // legal name of the company that runs the website
  companyAddress: '7420 Sawmill Rd, Ste. C, Columbus, OH 43235' as string | null,          // mailing address for legal notices
  practice: null as string | null,                // none: physicians are independent, not part of a practice (Prince, 14 Oct 2026)                // medical practice the physicians see patients through (the HIPAA covered entity)
  practiceAddress: null as string | null,
  privacyContactEmail: 'contact@marijuanacardoh.com' as string | null,     // privacy officer mailbox
  privacyContactPhone: null as string | null,
  bookingTool: 'our own EHR' as string | null,
  paymentProcessor: 'Stripe or Braintree (a PayPal service)' as string | null,  // Prince switches processors; update when one is added
  videoPlatform: '100ms, built into our own EHR' as string | null,
  emailProvider: null as string | null,
  analytics: null as string | null,               // none installed as of 13 Oct 2026
  refundDays: { usual: '5 to 7 business days', max: 30 },  // Prince, 14 Oct 2026
  venue: { county: 'Franklin County', state: 'Ohio' },  // county of the Columbus mailing address (Prince, 14 Oct 2026); attorney to confirm
  hosting: 'Vercel',
  checked: '14 Oct 2026',
};

/**
 * Promise made in the Privacy Policy (14 Oct 2026): Google Analytics, Microsoft Clarity and the Meta Pixel must NOT load
 * on these paths, and Clarity must mask form input. Enforce this when the GTM snippet is added.
 */
export const noTrackingPaths = ['/get-started', '/eligibility', '/conditions/', '/help/contact', '/api/'];
