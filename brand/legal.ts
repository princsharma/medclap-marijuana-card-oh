// Facts the legal pages depend on. null = not confirmed yet; the page shows a highlighted
// "to be confirmed" marker instead of guessing. Fill these in, then set status to 'final'.
export const legal = {
  status: 'draft' as 'draft' | 'final',          // 'draft' shows the review banner on every legal page
  effectiveDate: '14 October 2026' as string | null,  // site launch date (Prince, 14 Oct 2026)           // e.g. '1 November 2026'
  company: 'Ongo Care LLC' as string | null,                 // legal name of the company that runs the website
  companyAddress: '7420 Sawmill Rd, Ste. C, Columbus, OH 43235' as string | null,          // mailing address for legal notices
  practice: null as string | null,                // medical practice the physicians see patients through (the HIPAA covered entity)
  practiceAddress: null as string | null,
  privacyContactEmail: null as string | null,     // privacy officer mailbox
  privacyContactPhone: null as string | null,
  bookingTool: 'our own EHR' as string | null,
  paymentProcessor: null as string | null,
  videoPlatform: '100ms, built into our own EHR' as string | null,
  emailProvider: null as string | null,
  analytics: null as string | null,               // none installed as of 13 Oct 2026
  refundDays: { usual: '5 to 7 business days', max: 30 },  // Prince, 14 Oct 2026
  venue: { county: 'Kent County', state: 'Delaware' },  // Ongo Care LLC is registered in Dover, DE (Prince, 14 Oct 2026); attorney to confirm
  hosting: 'Vercel',
  checked: '14 Oct 2026',
};
