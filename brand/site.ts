// Single source of truth for facts that appear on many pages.
// Change a fact here, never in page copy. Every fact carries its source and the date it was confirmed.

export const brand = {
  name: 'Marijuana Card OH',
  domain: 'marijuanacardoh.com',
  tagline: 'Real Ohio doctors. Clear answers. Your money back if you don’t qualify.',
  email: 'contact@marijuanacardoh.com',
  serviceArea: 'Ohio (statewide, telehealth only)',
  source: 'Prince, 12–13 Oct 2026',
} as const;

// Phone line for the Call button on the survey header. null = not set up yet (button shows a placeholder).
export const phone: { display: string; tel: string } | null = null;

export const pricing = {
  newEvaluation: 149,
  renewalEvaluation: 129,
  stateFee: 0, // OAC 1301:18-10-01 sets no fee; DCC "Obtain Medical Marijuana" page lists none. Checked 13 Oct 2026.
  guarantee: '100% money-back guarantee if you don’t qualify',
  guaranteeTerms: 'Full refund of the evaluation fee if the physician finds you do not qualify. No deductions, no no-show fee.',
  source: 'Prince, 13 Oct 2026; state fee: OAC 1301:18-10-01 and com.ohio.gov DCC page, 13 Oct 2026',
} as const;

export type Physician = {
  slug: string;
  name: string;
  credential: 'MD' | 'DO';
  role: string;
  ohioLicense: string;
  npi: string;
  education: string[];
  isMedicalDirector?: boolean;
  /** Headshot in /public/doctors, 800x800. Real photo supplied by Prince (14 Oct 2026). */
  photo?: string;
  /** Intro video recorded by the physician (never AI-generated). The profile shows it only when set. */
  video?: import('./media').SiteVideo;
  source: string;
};

// Never add board certifications, years or specialties that are not on the source record.
export const physicians: Physician[] = [
  {
    slug: 'johnathan-miller',
    name: 'Dr. Johnathan Chance Miller',
    credential: 'MD',
    role: 'General Practice · Medical Director',
    ohioLicense: '35.141126CTR',
    npi: '1235623372',
    education: [
      'MD, Columbia University Vagelos College of Physicians and Surgeons, 2018',
      'Orthopaedic Surgery residency, Washington University/B-JH/SLCH Consortium, 2018–2020',
    ],
    isMedicalDirector: true,
    photo: '/doctors/johnathan-miller.jpg',
    source: 'mymmjdoctor.com profile read 12 Oct 2026; role confirmed by Prince 13 Oct 2026',
  },
  {
    slug: 'kevin-kargman',
    name: 'Dr. Kevin J. Kargman',
    credential: 'DO',
    role: 'Pediatrics',
    ohioLicense: '34.015746CTR',
    npi: '1407810302',
    education: [
      'DO, Kansas City University of Medicine and Biosciences College of Osteopathic Medicine',
      'Pediatrics residency, Geisinger Health System, 1996–1999',
    ],
    photo: '/doctors/kevin-kargman.jpg',
    source: 'mymmjdoctor.com profile read 12 Oct 2026; NPI registry 12 Oct 2026',
  },
];

export const medicalReviewer = physicians[0];

export const author = {
  name: 'Carrie L. Gessler',
  credentials: 'RN, MSN, ANP-BC',
  bio: 'Board-certified adult nurse practitioner (MSN, South University) with over 17 years of clinical experience.',
  npi: '1538565957',
  source: 'mymmjdoctor.com author profile read 13 Oct 2026; ANP-BC confirmed by Prince 13 Oct 2026',
} as const;

export const licenseLookupUrl = 'https://elicense.ohio.gov/oh_verifylicense'; // "License Look-Up", confirmed 13 Oct 2026
