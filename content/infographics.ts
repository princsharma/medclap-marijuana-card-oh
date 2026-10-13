/**
 * Embeddable infographics. Every line restates copy already on the page it sits on,
 * with the same sources and checked date. They carry no prices or offers, so other
 * sites can embed them as neutral Ohio explainers (with a credit link back to us).
 */
export type IgIcon = 'check' | 'file' | 'video' | 'send' | 'mail' | 'card' | 'store' | 'calendar' | 'repeat' | 'alert'
  | 'shield' | 'briefcase' | 'car' | 'home' | 'lock' | 'scale' | 'users' | 'folder' | 'phone' | 'person';

export type Verdict = 'yes' | 'no' | 'caution';

type Base = { slug: string; page: string; title: string; subtitle: string; alt: string; sources: string; checked: string };
export type StepsIg = Base & { kind: 'steps'; steps: { icon: IgIcon; title: string; text: string }[]; facts?: string[] };
export type CompareIg = Base & { kind: 'compare'; columns: [string, string]; rows: { label: string; a: string; b: string; same?: boolean }[] };
export type ChecklistIg = Base & { kind: 'checklist'; groups: { icon: IgIcon; title: string; items: string[] }[]; note?: string };
export type TilesIg = Base & { kind: 'tiles'; tiles: { icon: IgIcon; title: string; verdict: Verdict; verdictLabel: string; text: string }[]; note?: string };
export type Infographic = StepsIg | CompareIg | ChecklistIg | TilesIg;

const CHECKED = '13 Oct 2026';

export const infographics: Infographic[] = [
  {
    kind: 'steps', slug: 'how-to-get-an-ohio-medical-marijuana-card', page: '/how-it-works',
    title: 'How to get a medical marijuana card in Ohio',
    subtitle: 'Six steps, from checking you qualify to buying at a licensed dispensary.',
    alt: 'Infographic: six steps to an Ohio medical marijuana card. Check you qualify, get ready, see an Ohio physician, get your recommendation, activate your registration, buy at a licensed dispensary.',
    steps: [
      { icon: 'check', title: 'Check you qualify', text: 'Be 18 or older, an Ohio resident, and have one of Ohio’s 21 qualifying conditions.' },
      { icon: 'file', title: 'Get ready', text: 'Have a photo ID, a list of your medicines, and any records about your condition.' },
      { icon: 'video', title: 'See an Ohio physician', text: 'In person or by video. They review your history, check at least 12 months of OARRS and explain risks and benefits.' },
      { icon: 'send', title: 'Get your recommendation', text: 'If you qualify, the physician submits your registration to the Ohio registry.' },
      { icon: 'mail', title: 'Activate by email', text: 'Click the state’s activation link, check your details and accept the legal statement.' },
      { icon: 'store', title: 'Buy at a dispensary', text: 'Bring your registry card and your photo ID to any licensed Ohio dispensary.' },
    ],
    facts: ['Registration lasts 1 year', 'Ohio charges no state registration fee', 'The physician decides whether you qualify'],
    sources: 'Ohio Revised Code 4731.30 and 3796.01; Ohio Administrative Code 4731-32-03 and 1301:18-10-01',
    checked: CHECKED,
  },
  {
    kind: 'steps', slug: 'ohio-registry-activation-and-renewal', page: '/guides/ohio-medical-marijuana-registry',
    title: 'Activating and renewing your Ohio registration',
    subtitle: 'What happens in the Ohio Medical Marijuana Registry after your visit.',
    alt: 'Infographic: activating an Ohio medical marijuana registration in four steps, then renewing it each year.',
    steps: [
      { icon: 'send', title: 'Physician submits', text: 'After your visit, your physician submits your registration to the state registry.' },
      { icon: 'mail', title: 'Watch your email', text: 'The registry emails an activation link to the address you gave your physician.' },
      { icon: 'check', title: 'Accept and confirm', text: 'Click the link, review your details and accept the legal statement.' },
      { icon: 'card', title: 'Download your card', text: 'Your registry card is ready in your profile. Show it with a photo ID.' },
      { icon: 'calendar', title: 'Valid for one year', text: 'The state sends a notice 45 days before your registration expires.' },
      { icon: 'repeat', title: 'Renew each year', text: 'Get a new recommendation, then click Renew Card in the registry, up to 30 days early.' },
    ],
    facts: ['Registry information that identifies you is confidential', 'Wrong details? Contact the physician who submitted them'],
    sources: 'Ohio Administrative Code 1301:18-10-01; Ohio Revised Code 3796.08; Division of Cannabis Control',
    checked: CHECKED,
  },
  {
    kind: 'compare', slug: 'ohio-medical-card-vs-adult-use', page: '/guides/medical-card-vs-adult-use',
    title: 'Ohio medical card vs adult-use',
    subtitle: 'What a medical card changes, and what stays the same.',
    alt: 'Infographic comparing an Ohio medical marijuana card with adult-use cannabis: age, tax, possession limits, legal protections, public use, driving and employers.',
    columns: ['Medical card', 'Adult-use (no card)'],
    rows: [
      { label: 'Who can buy', a: 'Registered patients 18 and older', b: 'Adults 21 and older with a photo ID' },
      { label: 'Ohio adult-use tax', a: 'Not charged on medical marijuana', b: '10% adult-use tax' },
      { label: 'How much you can have', a: 'Up to a 90-day supply', b: '2.5 oz of plant material and 15 g of extract' },
      { label: 'Ohio patient protections', a: 'Custody, medical care, housing applications and public benefits', b: 'Not covered' },
      { label: 'Smoking or vaping in public', a: 'Not allowed', b: 'Not allowed', same: true },
      { label: 'Impaired driving', a: 'Illegal', b: 'Illegal', same: true },
      { label: 'Employer drug-free policies', a: 'Can still apply', b: 'Can still apply', same: true },
    ],
    sources: 'Ohio Revised Code 3796.01, 3796.06, 3796.22, 3796.221, 3796.24, 3796.40',
    checked: CHECKED,
  },
  {
    kind: 'checklist', slug: 'medical-records-checklist-ohio-card', page: '/guides/medical-records',
    title: 'Medical records for your Ohio card visit',
    subtitle: 'Records aren’t always required, but they let your physician confirm a diagnosis.',
    alt: 'Infographic checklist: which medical records to bring to an Ohio medical marijuana evaluation, how to get copies, and what happens without records.',
    groups: [
      { icon: 'folder', title: 'What to bring', items: ['A visit note, letter or report that names your diagnosis', 'Test or imaging results related to your condition', 'A list of treatments you’ve tried and current medicines', 'Photos or PDFs from your patient portal are fine'] },
      { icon: 'file', title: 'How to get copies', items: ['Ask your doctor’s office or use its patient portal', 'You have a right to copies of your records', 'They can charge reasonable copying or mailing costs', 'They can’t refuse because you owe a bill'] },
      { icon: 'person', title: 'No records?', items: ['You can still be evaluated', 'Your physician takes your history and examines you', 'They may ask for records before deciding'] },
    ],
    sources: 'Ohio Administrative Code 4731-32-03; U.S. HHS, Your Medical Records',
    checked: CHECKED,
  },
  {
    kind: 'tiles', slug: 'what-an-ohio-medical-card-means', page: '/guides/what-a-medical-card-means',
    title: 'What an Ohio medical card means for you',
    subtitle: 'Where Ohio law protects registered patients, and where it doesn’t.',
    alt: 'Infographic: what an Ohio medical marijuana card means for firearms, your job, driving, housing, custody and benefits, and your privacy.',
    tiles: [
      { icon: 'scale', title: 'Firearms', verdict: 'caution', verdictLabel: 'Unsettled', text: 'Federal law changed in 2026 and is still settling. Talk to a firearms lawyer first.' },
      { icon: 'briefcase', title: 'Your job', verdict: 'no', verdictLabel: 'Not protected', text: 'Employers can keep drug-free and zero-tolerance policies and act on marijuana use.' },
      { icon: 'car', title: 'Driving', verdict: 'caution', verdictLabel: 'Limits apply', text: 'Impaired driving is illegal. Being a patient alone isn’t a reason for a sobriety test.' },
      { icon: 'home', title: 'Housing', verdict: 'yes', verdictLabel: 'Protected', text: 'A landlord can’t reject you mainly for being a patient. A lease can still ban smoking, vaping and growing.' },
      { icon: 'users', title: 'Custody, care and benefits', verdict: 'yes', verdictLabel: 'Protected', text: 'Lawful use can’t be the main reason for a custody decision, denied care or lost benefits (unemployment rules differ).' },
      { icon: 'lock', title: 'Your privacy', verdict: 'yes', verdictLabel: 'Confidential', text: 'Registry information that identifies you is not a public record.' },
    ],
    note: 'General information, not legal advice.',
    sources: 'Ohio Revised Code 3796.08, 3796.24, 3796.28, 4511.19; 18 U.S.C. 922',
    checked: CHECKED,
  },
];

export const getInfographic = (slug: string) => infographics.find((i) => i.slug === slug);
export const infographicFor = (page: string) => infographics.find((i) => i.page === page);
export const infographicPng = (slug: string) => `/infographics/${slug}.png`;
