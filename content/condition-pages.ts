/**
 * Condition pages (wave 3). Evidence wording follows the National Academies (NASEM, 2017) conclusions and NCCIH
 * exactly, with their limits. Never claim marijuana treats or cures a disease. Needs Dr. Miller's review before
 * any "Medically reviewed" byline. Checked 13 Oct 2026.
 */
export const EVIDENCE_SOURCES: [string, string][] = [
  ['National Academies of Sciences, Engineering, and Medicine (2017) — committee conclusions', 'https://nap.nationalacademies.org/resource/24625/Cannabis_committee_conclusions.pdf'],
  ['NIH National Center for Complementary and Integrative Health — Cannabis and cannabinoids', 'https://www.nccih.nih.gov/health/cannabis-marijuana-and-cannabinoids-what-you-need-to-know'],
  ['Ohio Revised Code 3796.01 — qualifying medical conditions', 'https://codes.ohio.gov/ohio-revised-code/section-3796.01'],
  ['Ohio Administrative Code 4731-32-03 — physician standard of care', 'https://codes.ohio.gov/ohio-administrative-code/rule-4731-32-03'],
];

export type ConditionPage = {
  slug: string;
  short: string;          // used in titles: "Medical marijuana for {short} in Ohio"
  metaShort?: string;     // shorter name for the meta title when needed
  evidence: string[];     // light markup paragraphs
  records: string[];      // what helps at the visit
  crisisNote?: boolean;
};

const NOT_REVIEWED = (what: string) =>
  `The National Academies’ 2017 review of cannabis research did not reach a conclusion about ${what}. That means there isn’t enough good research to say whether it helps or not.`;

export const conditionPages: ConditionPage[] = [
  { slug: 'aids', short: 'AIDS', evidence: [
    'The National Academies found **limited evidence** that cannabis and oral cannabinoids increase appetite and reduce weight loss associated with HIV/AIDS.',
    'Dronabinol, a synthetic form of THC approved by the FDA, is used for appetite loss and weight loss in people with HIV/AIDS.',
    'Cannabis does not treat HIV or AIDS itself. Keep taking the treatment your HIV care team prescribes.'],
    records: ['Lab results or a clinic note confirming your diagnosis', 'Notes about appetite or weight loss', 'Your current medicines'] },
  { slug: 'alzheimers-disease', short: 'Alzheimer’s disease', evidence: [
    'The National Academies found **limited evidence that cannabinoids are ineffective** for symptoms associated with dementia.',
    'Older adults can be more sensitive to side effects such as dizziness, which raises the risk of falls. A family member or caregiver should be part of the decision.'],
    records: ['A neurology or primary care note naming the diagnosis', 'Your current medicines'] },
  { slug: 'als', short: 'ALS', evidence: [
    'The National Academies found **no or insufficient evidence** to say whether cannabinoids help symptoms associated with amyotrophic lateral sclerosis (ALS).',
    'Your physician can talk through what is and isn’t known, alongside the care from your ALS team.'],
    records: ['A neurology note naming the diagnosis', 'Your current medicines'] },
  { slug: 'cancer', short: 'cancer', evidence: [
    'The National Academies found **conclusive evidence** that oral cannabinoids are effective for **nausea and vomiting caused by chemotherapy**. Two FDA-approved drugs, dronabinol and nabilone, are used for this.',
    'They also found **substantial evidence** that cannabis is effective for chronic pain in adults.',
    'They found **no or insufficient evidence** that cannabinoids treat cancers, including glioma, or cancer-related loss of appetite and weight (cachexia). **Medical marijuana is not a cancer treatment.** Keep following your oncology team’s plan.'],
    records: ['An oncology note or pathology report naming the diagnosis', 'Your current treatment plan and medicines'] },
  { slug: 'chronic-traumatic-encephalopathy', short: 'chronic traumatic encephalopathy (CTE)', metaShort: 'CTE', evidence: [
    NOT_REVIEWED('chronic traumatic encephalopathy (CTE)'),
    'Ohio still lists CTE as a qualifying condition, so your physician can evaluate you for it.'],
    records: ['A neurology note describing the diagnosis or suspected diagnosis', 'Any imaging or test results', 'Your current medicines'] },
  { slug: 'crohns-disease', short: 'Crohn’s disease', evidence: [
    NOT_REVIEWED('Crohn’s disease or other inflammatory bowel diseases'),
    'Cannabis is not a treatment for Crohn’s disease. Keep following the plan from your gastroenterologist.'],
    records: ['A gastroenterology note, colonoscopy or pathology report naming the diagnosis', 'Your current medicines'] },
  { slug: 'epilepsy-seizure-disorders', short: 'epilepsy', evidence: [
    'The National Academies found **no or insufficient evidence** about cannabinoids for epilepsy in general.',
    'One purified CBD medicine, **Epidiolex**, is FDA-approved for seizures associated with Lennox-Gastaut syndrome or Dravet syndrome. Products sold at dispensaries are not Epidiolex, and NIH notes the evidence is insufficient for more common forms of epilepsy.',
    'Never stop or change seizure medicine without your neurologist.'],
    records: ['A neurology note naming the diagnosis', 'EEG results if you have them', 'Your current seizure medicines'] },
  { slug: 'fibromyalgia', short: 'fibromyalgia', evidence: [
    'The National Academies found **substantial evidence** that cannabis is effective for chronic pain in adults, and **moderate evidence** that cannabinoids (mainly nabiximols) improve short-term sleep in people with fibromyalgia.',
    'NIH notes the pain benefit in studies was small: in one review, 29% of people taking cannabinoids had at least 30% less pain, compared with 26% taking a placebo.'],
    records: ['A rheumatology or primary care note naming the diagnosis', 'Treatments you’ve tried', 'Your current medicines'] },
  { slug: 'glaucoma', short: 'glaucoma', evidence: [
    'The National Academies found **limited evidence that cannabinoids are ineffective** at lowering the eye pressure associated with glaucoma.',
    'Glaucoma can cause permanent vision loss. Keep using the treatment your eye doctor prescribes.'],
    records: ['An ophthalmology note naming the diagnosis', 'Your current eye drops and medicines'] },
  { slug: 'hepatitis-c', short: 'hepatitis C', evidence: [
    NOT_REVIEWED('hepatitis C'),
    'Cannabis is not a treatment for hepatitis C. Effective antiviral treatment exists; keep working with your liver or infectious disease specialist.'],
    records: ['Lab results or a clinic note confirming the diagnosis', 'Your current medicines'] },
  { slug: 'inflammatory-bowel-disease', short: 'inflammatory bowel disease', evidence: [
    NOT_REVIEWED('inflammatory bowel disease'),
    'It found **no or insufficient evidence** for symptoms of irritable bowel syndrome, which is a different condition.',
    'Keep following the plan from your gastroenterologist.'],
    records: ['A gastroenterology note, colonoscopy or pathology report naming the diagnosis', 'Your current medicines'] },
  { slug: 'multiple-sclerosis', short: 'multiple sclerosis', evidence: [
    'The National Academies found **substantial evidence** that oral cannabinoids improve **patient-reported** muscle spasticity in multiple sclerosis, but only **limited evidence** when spasticity is measured by a clinician.',
    'They also found **moderate evidence** for short-term sleep improvement in MS, and **substantial evidence** for chronic pain in adults.',
    'NIH notes the improvements were small and did not show up on objective tests.'],
    records: ['A neurology note naming the diagnosis', 'MRI reports if you have them', 'Your current medicines'] },
  { slug: 'chronic-pain', short: 'chronic pain', crisisNote: true, evidence: [
    'Ohio’s law covers **pain that is either chronic and severe, or intractable**. Your physician assesses your pain, how long you’ve had it and what you’ve tried.',
    'The National Academies found **substantial evidence** that cannabis is effective for chronic pain in adults.',
    'NIH notes the benefit in studies was small: in one review, 29% of people taking cannabinoids had at least 30% less pain, compared with 26% taking a placebo, and side effects were more common.',
    'If you take opioids or benzodiazepines, your physician will check Ohio’s prescription monitoring report and talk with you about interactions.'],
    records: ['Notes describing your pain, its cause and how long you’ve had it', 'Imaging or test results', 'Treatments you’ve tried and current medicines'] },
  { slug: 'parkinsons-disease', short: 'Parkinson’s disease', evidence: [
    'The National Academies found **no or insufficient evidence** about cannabinoids for the motor symptoms of Parkinson’s disease or for levodopa-induced dyskinesia.',
    'Dizziness on standing is a known side effect, which matters for fall risk. Keep working with your neurologist.'],
    records: ['A neurology note naming the diagnosis', 'Your current medicines'] },
  { slug: 'hiv', short: 'HIV', evidence: [
    'The National Academies found **limited evidence** that cannabis and oral cannabinoids increase appetite and reduce weight loss associated with HIV/AIDS. Dronabinol, an FDA-approved synthetic THC, is used for this.',
    'Cannabis does not treat HIV. Keep taking your antiretroviral treatment.'],
    records: ['Lab results or a clinic note confirming positive HIV status', 'Your current medicines'] },
  { slug: 'ptsd', short: 'PTSD', crisisNote: true, evidence: [
    'The National Academies found **limited evidence**, from one small trial of nabilone, for symptoms of post-traumatic stress disorder. NIH notes there has been little research on whether cannabis is useful for PTSD.',
    'Cannabis can raise the risk of psychosis in people predisposed to it, especially with frequent use. Your physician will ask about your mental health history.',
    'Evidence-based therapies for PTSD exist. Medical marijuana is not a replacement for them.'],
    records: ['A PTSD diagnosis from a licensed clinician (psychiatrist, psychologist, counselor or primary care physician)', 'Treatments you’ve tried and current medicines'] },
  { slug: 'sickle-cell-anemia', short: 'sickle cell anemia', evidence: [
    NOT_REVIEWED('sickle cell anemia'),
    'It did find **substantial evidence** that cannabis is effective for chronic pain in adults in general. Keep working with your hematologist on your care plan.'],
    records: ['A hematology note or lab results confirming the diagnosis', 'Your current medicines'] },
  { slug: 'spinal-cord-disease-injury', short: 'spinal cord disease or injury', evidence: [
    'The National Academies found **no or insufficient evidence** about cannabinoids for spasticity in people with paralysis due to spinal cord injury.',
    'They did find **substantial evidence** that cannabis is effective for chronic pain in adults.'],
    records: ['A neurology, spine or rehabilitation note naming the diagnosis or injury', 'Imaging reports', 'Your current medicines'] },
  { slug: 'tourette-syndrome', short: 'Tourette’s syndrome', evidence: [
    'The National Academies found **limited evidence** that THC capsules improve symptoms of Tourette syndrome.',
    'Keep working with your neurologist or psychiatrist on your treatment plan.'],
    records: ['A neurology or psychiatry note naming the diagnosis', 'Your current medicines'] },
  { slug: 'traumatic-brain-injury', short: 'traumatic brain injury', evidence: [
    'The National Academies found **limited evidence** of a statistical association between cannabinoids and better outcomes (survival and disability) after a traumatic brain injury or bleeding in the brain. An association does not show cause and effect.',
    'Keep working with your neurology or rehabilitation team.'],
    records: ['Hospital, neurology or rehabilitation notes about the injury', 'Imaging reports', 'Your current medicines'] },
  { slug: 'ulcerative-colitis', short: 'ulcerative colitis', evidence: [
    NOT_REVIEWED('ulcerative colitis or other inflammatory bowel diseases'),
    'Cannabis is not a treatment for ulcerative colitis. Keep following the plan from your gastroenterologist.'],
    records: ['A gastroenterology note, colonoscopy or pathology report naming the diagnosis', 'Your current medicines'] },
];

export const SAFETY = [
  'Side effects can include dizziness, sleepiness, and dizziness on standing, which raises the risk of falls in older adults.',
  'Cannabis raises the risk of motor vehicle crashes. Never drive while impaired.',
  'Frequent use is linked to cannabis use disorder, and to psychosis in people predisposed to it.',
  'Smoking cannabis during pregnancy is linked to lower birth weight.',
  'Cannabis can interact with other medicines. Your physician reviews your medicines before recommending.',
];
