// Site illustrations (content-system §9). All generated in Higgsfield in the
// "Maya's card" style: our own card design, never the state card; no AI people
// presented as real doctors or patients; no text inside images.
import { posts } from '@/content/blog';

export type SiteImage = { src: string; alt: string; w: number; h: number };

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_37xuX69L5la49WcVV6KjtPSFDAb/hf_20261013_';
const wide = (id: string, alt: string): SiteImage => ({ src: `${CDN}${id}.png`, alt, w: 2048, h: 1152 });
const std = (id: string, alt: string): SiteImage => ({ src: `${CDN}${id}.png`, alt, w: 1760, h: 1328 });

export const IMG = {
  stepQuestions: std('105500_57b4a2e1-64a8-4de1-a800-910037d3a1bb', 'Illustration of a woman on her sofa answering a few quick questions on her phone'),
  stepVisit: std('105635_41490af5-afa6-4bc6-8dee-49b3ac17d008', 'Illustration of a woman at home on a video visit on her laptop'),
  stepCard: std('105501_bcf7a00d-df47-4cec-a8cf-ac14f286b8b9', 'Illustration of a phone showing a medical card with a check mark beside an email'),
  howItWorks: std('105502_415a60d9-4b46-45b7-b7d0-7c859c3b74d3', 'Illustration of a woman at home with her phone and laptop, with icons for questions, a video visit and a card'),
  about: std('105501_33db812a-faf6-4aa6-ae04-107893e1d827', 'Illustration of a small Ohio-style town with a laptop video call glowing in a house window'),
  pricing: std('105500_81e626b1-69a2-4405-a69c-68d281fbfc3f', 'Illustration of a medical card with a price tag, a refund arrow and a shield with a check mark'),
  renewals: std('105502_2d087a59-abeb-40c7-9b56-e7fe3ca5cdfa', 'Illustration of a calendar with a checked date and a medical card circled by renewal arrows'),
  eligibility: std('105634_e1a8f430-8537-4f0c-8d1d-3bcd021ba658', 'Illustration of a checklist on a clipboard with a stethoscope and a medical card'),
  conditions: std('105502_e845de3e-ee27-4bce-8c71-ba0267e35659', 'Illustration of a folder of medical records with a stethoscope and a phone photo of a page'),
  locations: std('105634_e0fd673c-9d3b-487f-8cf4-0c0a2dbcec68', 'Illustration of a countryside map with towns marked by map pins'),
  faq: std('105633_4ab1bd63-c334-4596-9c48-79aea0502bae', 'Illustration of a woman thinking, with speech bubbles showing a question mark, a light bulb and a check mark'),
  guideCardMeans: wide('105633_ec388438-4da2-4d90-8e39-b1d28bd7a9e1', 'Illustration of a medical card linked to icons for work, driving, housing and the law'),
  guideMedVsAdult: wide('105634_64cc9e68-2f7a-4a1b-84f0-ef9d842225e1', 'Illustration of a woman at a fork in a path choosing between a medical card sign and a shopping bag sign'),
  guideRecords: wide('105635_4d5a2b4e-2377-4e48-b780-d940e9c9576c', 'Illustration of a desk with a folder of medical records and a phone photographing a page'),
  guideRegistry: wide('105633_cb9e9820-a285-480a-8245-f94f650057e3', 'Illustration of an online registration on a laptop, an email with a check mark and a card on a phone'),
  cityColumbus: wide('105720_45f2b344-ea62-4ec0-b956-a18f5f0d3e5f', 'Illustration of a city skyline beside a river with a bridge and park'),
  cityCleveland: wide('105719_c1d3b1a5-bfce-42c1-9bad-33e452061fc9', 'Illustration of a city skyline beside a lake with a lighthouse and sailboats'),
  // Social share card (1200x630) with the brand name added; hosted on the Higgsfield media CDN.
  social: { src: 'https://d2ol7oe51mr4n9.cloudfront.net/user_37xuX69L5la49WcVV6KjtPSFDAb/209ac707-242e-4945-a13f-e0cb7e05272f.jpg', alt: 'Marijuana Card OH: Ohio medical marijuana card evaluations by telehealth', w: 1200, h: 630 },
} satisfies Record<string, SiteImage>;

export const guideImage: Record<string, SiteImage> = {
  'what-a-medical-card-means': IMG.guideCardMeans,
  'medical-card-vs-adult-use': IMG.guideMedVsAdult,
  'medical-records': IMG.guideRecords,
};
// Post images live in each post's JSON (content/posts/<slug>.json).
export const postImage: Record<string, SiteImage> = Object.fromEntries(posts.filter((p) => p.image).map((p) => [p.slug, p.image!]));
export const cityImage: Record<string, SiteImage> = {
  columbus: IMG.cityColumbus,
  cleveland: IMG.cityCleveland,
};

// Condition pages: symbolic still-lifes (body-area symbol + records folder + our card). No people, pills or plants.
const C = (id: string, what: string): SiteImage => wide(id, `Illustration for ${what}, with a folder of medical records and a medical card`);
export const conditionImage: Record<string, SiteImage> = {
  aids: C('174721_d8cb63a6-d724-46ff-852d-a38451eb19f2', 'AIDS, a shield with an immune cell'),
  'alzheimers-disease': C('174723_d7024de8-434d-40d2-a97d-903f1cc9f112', 'Alzheimer’s disease, a brain with a puzzle piece'),
  als: C('174722_68a9dffb-b4f1-4f69-b040-45dc58408e09', 'ALS, a nerve cell linked to a hand'),
  cancer: C('174722_c433f401-a74c-4b11-a448-d894c98adaf5', 'cancer, an awareness ribbon'),
  'chronic-traumatic-encephalopathy': C('174723_3f1ca010-f669-452e-884b-020cfc33bae4', 'chronic traumatic encephalopathy, a sports helmet beside a brain'),
  'crohns-disease': C('174723_7860ca6f-a26d-462b-80f6-f03948393c1c', 'Crohn’s disease, the intestines with a small heart'),
  'epilepsy-seizure-disorders': C('174723_62ce048c-e3ff-439d-a1c5-beb1bb38f816', 'epilepsy, a brain with calm wave lines'),
  fibromyalgia: C('174722_d813c79e-1d8a-428d-9304-2e05598627a5', 'fibromyalgia, a body outline with tender points'),
  glaucoma: C('175027_c4a8d3bb-aebc-401b-8451-adc947a84133', 'glaucoma, an eye beside a pressure gauge'),
  'hepatitis-c': C('175029_7f405fbf-a452-457d-a47a-61d9e5ec8e97', 'hepatitis C, a liver with a small shield'),
  'inflammatory-bowel-disease': C('175028_63f4b665-6d38-421f-9803-32dd76a3ff8f', 'inflammatory bowel disease, the digestive tract and a hot-water bottle'),
  'multiple-sclerosis': C('175028_44793fb1-78cb-4064-9817-7205d83546d6', 'multiple sclerosis, a brain and spinal cord with nerves'),
  'chronic-pain': C('175029_06e2fef3-68b7-4740-88f7-646f4dea50ca', 'chronic pain, a body outline with a heat pack at the lower back'),
  'parkinsons-disease': C('175028_b1b8cd1a-bec5-4832-b1ef-711bfc3def7f', 'Parkinson’s disease, a hand holding a mug'),
  hiv: C('175027_342af7da-0ac1-42dc-be59-6944c190fbfd', 'HIV, a shield with an immune cell and a heart'),
  ptsd: C('175028_3f4b5046-c5c2-4d17-a390-24bbb830f152', 'PTSD, a calm sunrise over a lake and a heart'),
  'sickle-cell-anemia': C('175252_bc727729-75b3-48b3-a774-52927f4bf29a', 'sickle cell anemia, blood cells with one crescent-shaped cell'),
  'spinal-cord-disease-injury': C('175250_28427583-49b8-4c30-ac21-b16b2f78bcf7', 'spinal cord disease or injury, an upright spine'),
  'tourette-syndrome': C('175251_0ae372ee-7f48-45fd-9e8d-7baede9f1f25', 'Tourette’s syndrome, a speech bubble beside an open hand'),
  'traumatic-brain-injury': C('175254_e1678eee-a92b-42ea-b4ad-ba2d347d291d', 'traumatic brain injury, a brain with a bandage'),
  'ulcerative-colitis': C('175250_aefd23a4-87a2-4827-9f25-54b3ad453727', 'ulcerative colitis, the colon beside a calendar'),
};
