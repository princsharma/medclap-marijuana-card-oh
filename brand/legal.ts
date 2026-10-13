// Facts the legal pages depend on. null = not confirmed yet; the page shows a highlighted
// "to be confirmed" marker instead of guessing. Fill these in, then set status to 'final'.
export const legal = {
  status: 'draft' as 'draft' | 'final',          // 'draft' shows the review banner on every legal page
  effectiveDate: null as string | null,           // e.g. '1 November 2026'
  company: null as string | null,                 // legal name of the company that runs the website
  companyAddress: null as string | null,          // mailing address for legal notices
  practice: null as string | null,                // medical practice the physicians see patients through (the HIPAA covered entity)
  practiceAddress: null as string | null,
  privacyContactEmail: null as string | null,     // privacy officer mailbox
  privacyContactPhone: null as string | null,
  bookingTool: null as string | null,
  paymentProcessor: null as string | null,
  videoPlatform: null as string | null,
  emailProvider: null as string | null,
  analytics: null as string | null,               // none installed as of 13 Oct 2026
  refundBusinessDays: null as number | null,
  venueCounty: null as string | null,             // Ohio county for disputes
  hosting: 'Vercel',
  checked: '13 Oct 2026',
};
