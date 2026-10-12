/**
 * Blog posts. Same rules as every page (brand/content-system.md): primary sources only, dated,
 * and no author or medical-review byline until that person has actually approved the post.
 * Body uses light markup: "## " headings, "- " list lines, **bold**, [label](href).
 */
export type Post = {
  slug: string;
  title: string;
  metaTitle: string; // ≤ 60 characters
  description: string;
  published: string; // YYYY-MM-DD
  updated?: string;
  authorApprovedOn: string | null;
  medicallyReviewedOn: string | null;
  body: string[];
  sources: [string, string][];
};

export const posts: Post[] = [
  {
    slug: 'ohio-medical-marijuana-telehealth-law',
    title: 'Can you get an Ohio medical marijuana card by telehealth? What the law says',
    metaTitle: 'Ohio Medical Marijuana Card by Telehealth: The Law',
    description: 'Ohio law lets physicians examine patients for a medical marijuana recommendation by telehealth. Here is what the law requires and what it means for your visit.',
    published: '2026-10-13',
    authorApprovedOn: null,
    medicallyReviewedOn: null,
    body: [
      'Yes. Since 23 March 2022, Ohio law has let a physician examine a patient for a medical marijuana recommendation **either in person or through the use of telehealth services**. Here is what that means in practice.',
      '## What the law requires',
      'Ohio Revised Code 4731.30 says a physician may recommend medical marijuana only when there is a real physician–patient relationship. That relationship needs three things:',
      '- an examination of the patient, in person or by telehealth',
      '- a review of the patient’s medical history',
      '- an expectation of ongoing care',
      'The physician must also hold a Certificate to Recommend from the State Medical Board of Ohio, and must review at least 12 months of the patient’s record in Ohio’s prescription monitoring database before recommending.',
      '## Telehealth is held to the same standard',
      'Ohio’s telehealth law (Revised Code 4743.09) says care by telehealth must meet the same standard of care as an in-person visit. A physician can also decide that an in-person visit is needed.',
      '## What this means for your visit',
      '- You can do the whole evaluation by video from anywhere in Ohio.',
      '- Have your photo ID, a list of your medicines and any medical records ready.',
      '- Your physician still decides whether you qualify. Telehealth changes where the visit happens, not the rules.',
      'The Division of Cannabis Control’s own guidance says the same: you need “an in-person or telemedicine visit at least once a year.” [How our visits work](/how-it-works)',
    ],
    sources: [
      ['Ohio Revised Code 4731.30', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
      ['Ohio Revised Code 4743.09 — telehealth', 'https://codes.ohio.gov/ohio-revised-code/section-4743.09'],
      ['Division of Cannabis Control — Obtain medical marijuana', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/obtain-medical-marijuana'],
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
