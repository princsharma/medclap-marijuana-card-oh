// Site illustrations (content-system §9). All generated in Higgsfield in the
// "Maya's card" style: our own card design, never the state card; no AI people
// presented as real doctors or patients; no text inside images.
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
  blogTelehealthLaw: wide('105500_a0fb3b21-17dc-42fa-a465-958db2580117', 'Illustration of a laptop video visit on a desk beside a balance scale and a law book'),
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
export const postImage: Record<string, SiteImage> = {
  'ohio-medical-marijuana-telehealth-law': IMG.blogTelehealthLaw,
};
export const cityImage: Record<string, SiteImage> = {
  columbus: IMG.cityColumbus,
  cleveland: IMG.cityCleveland,
};
