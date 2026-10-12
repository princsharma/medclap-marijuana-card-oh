/**
 * Help Center — Instant AI Help, Knowledge Base and Contact Us (ported from The Well-Grounded Spirit, Ohio content).
 * Answers use light markup: **bold**, [label](href), and list lines starting with "- ".
 * Only facts already confirmed in brand/site.ts, brand/registry.ts or the approved Compliance Scope are used.
 * Never add HIPAA, approval-rate or timing claims here.
 */
import type { IconName } from "@/components/ui/Icon";
import { pricing } from "@/brand/site";
import { registry } from "@/brand/registry";

export const HELP_UPDATED = "2026-10-13";

export type KbCategory = { id: string; title: string; short: string; icon: IconName; description: string };
export type Article = {
  slug: string; category: string; question: string; answer: string[];
  callout?: string; updated: string; readMinutes: number; text: string;
};

const plainAnswer = (lines: string[]) =>
  lines.map((l) => l.replace(/^- /, "").replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")).join(" ");

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const N = pricing.newEvaluation, R = pricing.renewalEvaluation;

const data: { id: string; title: string; short: string; icon: IconName; description: string; items: { q: string; a: string[]; callout?: string }[] }[] = [
  { id: "about", title: "About Marijuana Card OH", short: "About us", icon: "compass", description: "Who we are, who we serve and how we work.", items: [
    { q: "What is Marijuana Card OH?", a: ["Marijuana Card OH is an Ohio-only telehealth service. We connect Ohio adults with Ohio-licensed physicians who hold a Certificate to Recommend, for medical marijuana card evaluations. [About us](/about)"] },
    { q: "Do you serve states other than Ohio?", a: ["No. We serve Ohio only, and everything on this site is about Ohio’s rules."] },
    { q: "Are you the state of Ohio or the registry?", a: [`No. We are a private telehealth service. The registry is run by the Ohio Division of Cannabis Control. Its official sign-in is at ${registry.loginUrl.replace("https://", "")}, and we never ask for your registry password.`] },
    { q: "Is Marijuana Card OH an emergency or crisis service?", a: ["No. If you are in immediate danger, call 911. If you’re in crisis or thinking about harming yourself, call or text 988."], callout: "If you are in immediate danger, call 911. For crisis support, call or text 988." },
  ]},
  { id: "getting-a-card", title: "Getting a card", short: "Getting a card", icon: "list-checks", description: "Eligibility, qualifying conditions and the steps to a card.", items: [
    { q: "Who can get an Ohio medical marijuana card?", a: ["Ohio residents aged **18 or older** who are diagnosed with one of Ohio’s **21 qualifying conditions**. Your physician decides whether you qualify. [See the conditions](/conditions)"] },
    { q: "What are Ohio’s qualifying conditions?", a: ["Ohio law lists 21, including chronic and severe or intractable pain, PTSD, fibromyalgia, cancer, Crohn’s disease, epilepsy, glaucoma, multiple sclerosis and Parkinson’s disease. [Full list](/conditions)"] },
    { q: "Does anxiety, insomnia or depression qualify?", a: ["None of these is on Ohio’s list. PTSD is. If you also have a listed condition, a physician can evaluate you for it."] },
    { q: "How do I get a medical marijuana card in Ohio?", a: ["- Book a telehealth visit with an Ohio physician.", "- Your physician reviews your history, examines you and checks Ohio’s prescription monitoring report.", "- If you qualify, your physician submits your registration to the state right after the visit.", "- You activate it from the email the registry sends you.", "[Step-by-step guide](/how-it-works)"] },
    { q: "Can I get a medical card at 18 in Ohio?", a: ["Yes. Patients under 18 need a parent’s consent and a registered caregiver; we see adults only."] },
    { q: "Do I need medical records?", a: ["They help, and your physician may ask for them. If another doctor diagnosed you, your physician can confirm the diagnosis from your records."] },
    { q: "Can you guarantee I’ll qualify or get a card?", a: ["No. Whether you qualify is your physician’s medical decision, made in your visit. What we guarantee is your money: if you don’t qualify, we refund your evaluation fee in full. [Refund policy](/refund-policy)"] },
    { q: "How do I know if I qualify?", a: ["Use our [three-question check](/eligibility) for a quick guide. Only your physician can decide, after your visit."] },
  ]},
  { id: "visits-and-doctors", title: "Visits and doctors", short: "Visits & doctors", icon: "user-check", description: "Our physicians, telehealth visits and recommendations.", items: [
    { q: "Who are your doctors?", a: ["Dr. Johnathan Miller, MD (Medical Director) and Dr. Kevin J. Kargman, DO. Both hold an active Ohio license and a Certificate to Recommend. [Meet them and check their licenses](/doctors)"] },
    { q: "Can I do my evaluation by telehealth?", a: ["Yes. Ohio law lets the physician examine you in person or by telehealth. All our visits are by video."] },
    { q: "What happens during the visit?", a: ["Your physician reviews your medical history and medicines, examines you, checks at least 12 months of Ohio’s prescription monitoring report, explains the risks and benefits, and asks for your consent."] },
    { q: "When is my recommendation submitted?", a: ["If you qualify, your physician submits it to the Ohio registry right after your visit."] },
    { q: "Is it a prescription?", a: ["No. Ohio physicians **recommend** medical marijuana; they don’t prescribe it. The recommendation is entered in the state registry."] },
    { q: "How do I book?", a: ["Pick a time from your physician’s open appointment slots on our [booking page](/book)."] },
  ]},
  { id: "fees-and-refunds", title: "Fees and refunds", short: "Fees & refunds", icon: "receipt", description: "What it costs, what’s included and the refund guarantee.", items: [
    { q: "How much does an Ohio medical card cost?", a: [`**$${N}** for a new evaluation and **$${R}** to renew. Ohio’s current registration rule sets no state fee. [Pricing](/pricing)`], callout: `New evaluation $${N}. Renewal $${R}. Ohio state fee: $0 under the current rule.` },
    { q: "Is there a state registration fee?", a: ["Not under Ohio’s current patient registration rule."] },
    { q: "What if I don’t qualify?", a: ["We refund your evaluation fee in full, with no deductions and no no-show fee. [Refund policy](/refund-policy)"] },
    { q: "Do you take insurance?", a: ["No. You pay the evaluation fee directly."] },
  ]},
  { id: "registry-and-renewal", title: "Registry and renewal", short: "Registry & renewal", icon: "repeat", description: "Activating, signing in and renewing your registration.", items: [
    { q: "How do I activate my registration?", a: ["After your physician submits it, the registry emails you an activation link. Click it, check your details and accept the legal statement. [Registry guide](/guides/ohio-medical-marijuana-registry)"] },
    { q: "I didn’t get the activation email. What do I do?", a: [`Check your spam folder and make sure your physician has the right email. If it still hasn’t arrived, contact the Division of Cannabis Control at ${registry.email} or ${registry.helpline}.`] },
    { q: "Where do I log in to the registry?", a: [`At the official sign-in, ${registry.loginUrl.replace("https://", "")}. We can’t see or manage your registry account.`] },
    { q: "How long does my registration last?", a: ["One year, ending on the last day of the month it was issued. The state emails a reminder about 45 days before."] },
    { q: "How do I renew?", a: [`Get a new recommendation from your physician ($${R} with us), then sign in to the registry and click **Renew Card**. You can renew up to 30 days early. [Renewal guide](/renewals)`] },
    { q: "What happens if my registration expires?", a: ["Your card stops working, and Ohio requires you to dispose of any medical marijuana within 7 days. Get a new recommendation, then renew in the registry."] },
  ]},
  { id: "privacy", title: "Privacy", short: "Privacy", icon: "shield-check", description: "How your information is handled.", items: [
    { q: "Is my registration public?", a: ["No. Ohio law makes registry information that identifies patients confidential, and it is not a public record."] },
    { q: "Can I share health details in chat, email or Instant AI Help?", a: ["Please don’t. Share medical details with your physician during your visit."] },
  ]},
];

export const kbCategories: KbCategory[] = data.map(({ items: _items, ...c }) => c);
export const articles: Article[] = data.flatMap((c) => c.items.map((it) => {
  const text = plainAnswer(it.a);
  return { slug: slugify(it.q), category: c.id, question: it.q, answer: it.a, callout: it.callout, updated: HELP_UPDATED,
    readMinutes: Math.max(1, Math.ceil(text.split(/\s+/).length / 200)), text };
}));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getCategory = (id: string) => kbCategories.find((c) => c.id === id);
export const articlesIn = (id: string) => articles.filter((a) => a.category === id);
export function related(a: Article, n = 3) {
  const list = articlesIn(a.category); const i = list.findIndex((x) => x.slug === a.slug);
  return [...list.slice(i + 1), ...list.slice(0, i)].slice(0, n);
}

export const helpPaths = {
  ai: "/help", kb: "/help/knowledge-base", contact: "/help/contact",
  category: (id: string) => `/help/knowledge-base/${id}`,
  article: (slug: string) => `/help/articles/${slug}`,
  topic: (id: string) => `/help/contact/${id}`,
};

export const aiHelp = {
  seo: {
    title: "Help Center: Instant AI Help | Marijuana Card OH",
    description: "Instant answers about Ohio medical marijuana cards, visits, fees, the state registry and renewal, from the Marijuana Card OH Help Center.",
  },
  title: "Instant AI Help",
  lead: "Ask about getting or renewing your Ohio card, our doctors, fees or the state registry, and get an instant answer from our Help Center.",
  placeholder: "Ask us a question…",
  disclaimer: "Instant AI Help answers only from the Marijuana Card OH Help Center. It can’t give medical advice, tell you whether you qualify, or book visits. Please don’t include personal health details, because questions may be processed by a third-party AI service.",
  suggestions: ["How much does an Ohio card cost?", "Can I do my visit by telehealth?", "How do I renew?", "I didn’t get the activation email"],
};

export type ContactTopic = { id: string; title: string; description: string; icon: IconName; suggested: string[] };
const s = (q: string) => slugify(q);
export const contactTopics: ContactTopic[] = [
  { id: "getting-a-card", title: "Getting a card", description: "Eligibility, qualifying conditions and what to have ready.", icon: "list-checks",
    suggested: [s("Who can get an Ohio medical marijuana card?"), s("Do I need medical records?"), s("How do I know if I qualify?")] },
  { id: "booking-and-visits", title: "Booking and visits", description: "Booking, joining your video visit and changing a time.", icon: "calendar",
    suggested: [s("How do I book?"), s("What happens during the visit?"), s("Can I do my evaluation by telehealth?")] },
  { id: "fees-and-refunds", title: "Fees and refunds", description: "Prices, payments and the refund guarantee.", icon: "receipt",
    suggested: [s("How much does an Ohio medical card cost?"), s("What if I don’t qualify?"), s("Do you take insurance?")] },
  { id: "registry-and-renewal", title: "Registry and renewal", description: "Activation emails, signing in and renewing.", icon: "repeat",
    suggested: [s("I didn’t get the activation email. What do I do?"), s("How do I renew?"), s("Where do I log in to the registry?")] },
  { id: "privacy", title: "Privacy and your information", description: "How information is handled and privacy requests.", icon: "shield-check",
    suggested: [s("Is my registration public?"), s("Can I share health details in chat, email or Instant AI Help?")] },
];
export const getTopic = (id: string) => contactTopics.find((t) => t.id === id);

/** We serve Ohio only; the call-back form accepts Ohio. */
export const usStates = ["Ohio"];
export const callTimes = ["Weekday morning", "Weekday afternoon", "Weekday evening", "Any time"];

/** Facts the assistant may quote in addition to the articles (already published on site pages). */
export const assistantFacts = [
  `New evaluation $${N}; renewal evaluation $${R}; Ohio state registration fee $0 under the current rule. Page: /pricing`,
  "Full refund of the evaluation fee if the physician finds you don’t qualify; no deductions, no no-show fee. Page: /refund-policy",
  "Telehealth only, Ohio residents 18+, 21 qualifying conditions. Pages: /how-it-works, /conditions, /eligibility",
  "Physicians: Dr. Johnathan Miller, MD (Medical Director, Ohio 35.141126CTR) and Dr. Kevin J. Kargman, DO (Ohio 34.015746CTR). Page: /doctors",
  `Official registry sign-in: ${registry.loginUrl}. DCC helpline ${registry.helpline}, email ${registry.email}. Page: /guides/ohio-medical-marijuana-registry`,
];
