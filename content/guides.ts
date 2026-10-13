/**
 * Guides (wave 3). Same rules as every page: primary sources only, checked dates,
 * and no author or medical-review byline until that person has approved the page.
 * Body uses light markup: "## " headings, "- " list lines, **bold**, [label](href).
 */
export type Guide = {
  slug: string;
  title: string;      // H1
  metaTitle: string;  // ≤ 60 characters
  description: string;
  eyebrow: string;
  lead: string;
  keyTakeaways: string[];
  body: string[];
  faq: [string, string][];
  sources: [string, string][];
  checked: string;
  authorApprovedOn: string | null;
  medicallyReviewedOn: string | null;
};

const ORC = (n: string) => `https://codes.ohio.gov/ohio-revised-code/section-${n}`;

export const guides: Guide[] = [
  {
    slug: 'what-a-medical-card-means',
    title: 'What an Ohio medical card means for guns, work, driving and housing',
    metaTitle: 'Ohio Medical Card: Guns, Jobs, Driving and Housing',
    description: 'What registering as an Ohio medical marijuana patient means for firearms, your job, driving, housing, custody and benefits, under Ohio and federal law.',
    eyebrow: 'Guide',
    lead: 'Registering as a patient gives you real protections under Ohio law, but not everywhere. Employers can still enforce drug-free policies, driving while impaired is still illegal, and federal firearms law is still unsettled.',
    keyTakeaways: [
      "Ohio protects registered patients in custody decisions, medical care, housing applications and public benefits.",
      "Employers can still enforce drug-free and zero-tolerance policies and act on marijuana use, even by patients.",
      "Driving while impaired is illegal for everyone, patients included.",
      "Federal firearms law changed in 2026 but is still settling. Talk to a firearms lawyer before buying or carrying a gun.",
      "Registry information that identifies you is confidential and is not a public record.",
    ],
    body: [
      '## Firearms',
      'Federal law (18 U.S.C. 922(g)(3)) bars an “unlawful user” of a controlled substance from having a gun. Two things changed in 2026:',
      '- **Rescheduling.** Since 28 April 2026, marijuana covered by a state medical marijuana license is in Schedule III under a DEA rule. Marijuana outside a state medical program stays in Schedule I.',
      '- **The Supreme Court.** On 18 June 2026, in *United States v. Hemani*, the Court held the government had not shown that disarming someone simply for regular marijuana use fits the nation’s tradition of gun laws, as applied to that defendant. It did not decide cases involving people who are intoxicated while armed.',
      'ATF has also withdrawn its 2011 letter that told gun dealers to treat medical marijuana card holders as prohibited. The law is still settling, so talk to a firearms lawyer before buying or carrying a gun. We can’t give legal advice.',
      '## Your job',
      'Ohio law does not protect your job because you are a patient. Under Revised Code 3796.28, employers:',
      '- don’t have to accommodate marijuana use;',
      '- can keep drug-testing, drug-free workplace and zero-tolerance policies;',
      '- can refuse to hire, discipline or fire someone for marijuana use;',
      '- must still follow federal rules, such as U.S. Department of Transportation testing for commercial drivers.',
      'If you’re fired for breaking a written drug policy, Ohio treats it as “just cause”, and you can lose unemployment benefits.',
      '## Driving',
      'Driving under the influence of marijuana is illegal for everyone, patients included. Ohio’s OVI law (Revised Code 4511.19) also sets limits for marijuana in blood and urine. Being a registered patient is **not** enough reason for police to give you a field sobriety test or suspend your license; they need an independent reason to suspect impaired driving (Revised Code 3796.24).',
      '## Housing',
      'A landlord can’t reject you as a tenant mainly because you’re a registered patient, unless federal law requires it. A lease can still ban smoking or vaping marijuana in the home or common areas, and home growing (Revised Code 3796.24).',
      '## Custody, medical care and benefits',
      '- Lawful medical use can’t be the sole or main reason for a child abuse or neglect finding, or for a custody or parenting-time decision, unless there is clear and convincing evidence a child is unsafe.',
      '- It can’t be a reason to deny you medical care or a place on a transplant list.',
      '- It can’t disqualify you from public benefit programs, except unemployment benefits under the rules above.',
      '## Your privacy',
      'Registry information that identifies you is confidential under Ohio law and is not a public record (Revised Code 3796.08).',
    ],
    faq: [
      ['Can I own a gun with an Ohio medical card?', 'Federal law on this is changing. A 2026 DEA rule moved state-licensed medical marijuana to Schedule III, and in June 2026 the Supreme Court limited how the federal ban on “unlawful users” can be applied. Speak to a firearms lawyer before buying or carrying a gun.'],
      ['Can my employer fire me for having a medical card?', 'Ohio law lets employers enforce drug-free and zero-tolerance policies and take action for marijuana use, even by registered patients.'],
      ['Will police know I’m a patient?', 'Your registration is confidential under Ohio law. Being a registered patient is not, on its own, a reason for a field sobriety test.'],
    ],
    sources: [
      ['18 U.S.C. 922: unlawful users and firearms', 'https://www.law.cornell.edu/uscode/text/18/922'],
      ['DEA final rule, Federal Register, 28 April 2026: rescheduling to Schedule III', 'https://www.federalregister.gov/documents/2026/04/28/2026-08176/schedules-of-controlled-substances-rescheduling-of-food-and-drug-administration-approved-products'],
      ['Supreme Court of the United States: United States v. Hemani (18 June 2026)', 'https://www.supremecourt.gov/opinions/25pdf/24-1234_new_6k47.pdf'],
      ['Ohio Revised Code 3796.28: rights of employers', ORC('3796.28')],
      ['Ohio Revised Code 3796.24: patient protections', ORC('3796.24')],
      ['Ohio Revised Code 4511.19: OVI', ORC('4511.19')],
      ['Ohio Revised Code 3796.08: confidentiality', ORC('3796.08')],
    ],
    checked: '13 Oct 2026',
    authorApprovedOn: null,
    medicallyReviewedOn: null,
  },
  {
    slug: 'medical-card-vs-adult-use',
    title: 'Medical card or adult-use? What’s different in Ohio',
    metaTitle: 'Ohio Medical Card vs Adult-Use: What’s Different',
    description: 'Adults 21+ can buy adult-use cannabis in Ohio. What a medical card still adds: access from 18, no 10% adult-use tax, a 90-day supply and legal protections.',
    eyebrow: 'Guide',
    lead: 'Adults 21 and older can buy adult-use cannabis at Ohio dispensaries without a card. A medical card still matters if you’re 18 to 20, want to avoid the 10% adult-use tax, need more than the adult-use limit, or want the protections Ohio gives registered patients.',
    keyTakeaways: [
      "Adults 21 and older can buy adult-use cannabis in Ohio without a card. People aged 18 to 20 need to be registered patients.",
      "Medical marijuana isn’t subject to Ohio’s 10% adult-use tax.",
      "Patients may have up to a 90-day supply. Adult-use limits are 2.5 ounces of plant material and 15 grams of extract.",
      "Smoking or vaping in public and impaired driving are illegal either way, and employers can enforce drug-free policies for both.",
    ],
    body: [
      '## Do you need a medical card to buy at an Ohio dispensary?',
      'Not if you’re 21 or older: Ohio allows adult-use purchases from licensed dispensaries. If you’re 18 to 20, you can only buy medical marijuana, as a registered patient.',
      '## What a medical card adds',
      '- **Access from age 18.** Adult-use is for people 21 and older.',
      '- **No adult-use tax.** Ohio charges a 10% tax on adult-use marijuana (Revised Code 3796.40). That tax does not apply to medical marijuana.',
      '- **A larger supply.** Patients may possess up to a 90-day supply set by state rules. Adult-use consumers may possess up to 2.5 ounces of plant material and 15 grams of extract.',
      '- **Legal protections.** Ohio protects registered patients in custody decisions, medical care, housing applications and public benefits (Revised Code 3796.24). See [what a medical card means](/guides/what-a-medical-card-means).',
      '## What stays the same',
      '- You can’t smoke or vape marijuana in public places. Medical marijuana can only be vaporized on private property used mainly as a home or farm, and smoking it is not allowed (Revised Code 3796.06, as amended by SB 56 from 20 March 2026).',
      '- Driving while impaired is illegal for everyone.',
      '- Employers can enforce drug-free workplace policies for patients and adult-use consumers alike.',
      '## Home growing',
      'Adults 21 and older can grow up to six plants each, and up to twelve per home, in an enclosed area out of public view (Revised Code 3796.04). A lease can ban it.',
    ],
    faq: [
      ['Do you need a medical card for a dispensary in Ohio?', 'Not if you’re 21 or older. Adults 21+ can buy adult-use cannabis. People aged 18 to 20 need to be registered patients.'],
      ['Is it worth getting a medical card in Ohio?', 'It can be if you’re 18 to 20, buy often enough that the 10% adult-use tax adds up, need more than the adult-use limit, or want the legal protections Ohio gives patients.'],
      ['Is weed legal in Ohio without a medical card?', 'For adults 21 and older, yes, within Ohio’s adult-use limits. Smoking or vaping in public and impaired driving are still illegal.'],
    ],
    sources: [
      ['Ohio Revised Code 3796.40: adult-use excise tax', ORC('3796.40')],
      ['Ohio Revised Code 3796.221: adult-use possession limits', ORC('3796.221')],
      ['Ohio Revised Code 3796.22: registered patient rights', ORC('3796.22')],
      ['Ohio Revised Code 3796.04: homegrown marijuana', ORC('3796.04')],
      ['Ohio Revised Code 3796.24: patient protections', ORC('3796.24')],
      ['Ohio Revised Code 3796.01: definitions (adult-use consumer, 21+)', ORC('3796.01')],
    ],
    checked: '13 Oct 2026',
    authorApprovedOn: null,
    medicallyReviewedOn: null,
  },
  {
    slug: 'medical-records',
    title: 'Medical records for your Ohio medical card visit',
    metaTitle: 'Medical Records for an Ohio Medical Card Visit',
    description: 'Which medical records help at your Ohio medical marijuana evaluation, how to get copies, and what happens if you don’t have any.',
    eyebrow: 'Guide',
    lead: 'Records aren’t always required, but they help. If another doctor already diagnosed your condition, Ohio lets your physician confirm it from your records, which keeps the visit short and the decision clear.',
    keyTakeaways: [
      "Records aren’t always required, but they let your physician confirm a diagnosis another doctor made.",
      "Bring a note naming your diagnosis, related test or imaging results, and a list of treatments and current medicines.",
      "You have a right to copies. A provider can charge reasonable copying costs but can’t refuse because you owe a bill.",
      "No records? You can still book, and if you don’t qualify, we refund your fee in full.",
    ],
    body: [
      '## Why records help',
      'Ohio’s standard of care (Administrative Code 4731-32-03) asks your physician to review your history, prior treatments and current medicines. If another licensed physician diagnosed your condition, your physician can confirm it using copies of your records or a detailed summary, and must keep copies of what they relied on.',
      '## What to bring',
      '- A visit note, letter or report that names your diagnosis',
      '- Test or imaging results related to your condition',
      '- A list of treatments you’ve tried and current medicines',
      'Photos or PDFs from your patient portal are fine.',
      '## How to get copies',
      'You have the right to see and get copies of your medical records from your doctors and health plans. Ask your doctor’s office or use its patient portal. A provider can charge reasonable copying or mailing costs, but can’t charge for searching for your records, and can’t refuse because you owe a bill.',
      '## No records?',
      'You can still book. Your physician will take your history, examine you and decide whether you have a qualifying condition. They may ask for records before deciding. If you don’t qualify, we refund your fee in full.',
    ],
    faq: [
      ['Can I get a medical card in Ohio without medical records?', 'You can be evaluated without them. Your physician decides whether you qualify and may ask for records first.'],
      ['How far back should records go?', 'Bring whatever shows your diagnosis and treatment. Recent records are most useful.'],
      ['Will you send my records to the state?', 'No. Your physician keeps the records they rely on, as Ohio requires. The registry receives your registration details, including your qualifying condition, but not your records.'],
    ],
    sources: [
      ['Ohio Administrative Code 4731-32-03: physician standard of care', 'https://codes.ohio.gov/ohio-administrative-code/rule-4731-32-03'],
      ['HHS: Your medical records', 'https://www.hhs.gov/hipaa/for-individuals/medical-records/index.html'],
      ['Ohio Administrative Code 1301:18-10-01: what the registration contains', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
    ],
    checked: '13 Oct 2026',
    authorApprovedOn: null,
    medicallyReviewedOn: null,
  },
];

/** Every guide, for "Related guides" lists. */
export const GUIDE_LINKS: [string, string][] = [
  ['The Ohio Medical Marijuana Registry, explained', '/guides/ohio-medical-marijuana-registry'],
  ...guides.map((g) => [g.title, `/guides/${g.slug}`] as [string, string]),
];
export const relatedGuides = (href: string) => GUIDE_LINKS.filter(([, h]) => h !== href);

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
