/** Lightweight keyword ranking for Help Center articles (used by search and the assistant fallback). */

const STOP = new Set(
  "a an and are as at be can do does for from how i if in is it me my of on or the to what when where which who why will with you your we our there this that get any".split(
    " ",
  ),
);

const SYNONYMS: Record<string, string> = {
  insurance: "insurance",
  insured: "insurance",
  cost: "fee",
  costs: "fee",
  price: "fee",
  prices: "fee",
  pricing: "fee",
  fees: "fee",
  pay: "fee",
  charge: "fee",
  refunds: "refund",
  provider: "physician",
  providers: "physician",
  doctor: "physician",
  doctors: "physician",
  physicians: "physician",
  prescription: "recommendation",
  recommend: "recommendation",
  weed: "marijuana",
  cannabis: "marijuana",
  mmj: "marijuana",
  card: "card",
  cards: "card",
  renew: "renewal",
  renewing: "renewal",
  expire: "renewal",
  expired: "renewal",
  login: "registry",
  activate: "registry",
  activation: "registry",
  cancel: "cancel",
  cancellation: "cancel",
  reschedule: "cancel",
  appointment: "appointment",
  appointments: "appointment",
  session: "appointment",
  sessions: "appointment",
  book: "book",
  booking: "book",
  online: "online",
  virtual: "online",
  video: "online",
  telehealth: "online",
  private: "privacy",
  confidential: "privacy",
  confidentiality: "privacy",
  hipaa: "privacy",
  data: "privacy",
  information: "privacy",
  emergency: "emergency",
  crisis: "emergency",
  licensed: "license",
  licence: "license",
  state: "state",
  states: "state",
  adhd: "adhd",
  couples: "couples",
  couple: "couples",
  partner: "couples",
};

export const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => SYNONYMS[w] ?? w.replace(/s$/, ""));

export type Searchable = { slug: string; question: string; text: string };

export function rank<T extends Searchable>(query: string, list: T[], limit = 5): { item: T; score: number }[] {
  const q = [...new Set(tokens(query))];
  if (!q.length) return [];
  return list
    .map((item) => {
      const qt = new Set(tokens(item.question));
      const bt = new Set(tokens(item.text));
      let score = 0;
      for (const w of q) {
        if (qt.has(w)) score += 3;
        else if (bt.has(w)) score += 1;
      }
      return { item, score: score / q.length };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Phrases that should always surface crisis resources instead of an answer. */
const CRISIS =
  /\b(suicid\w*|kill (myself|me)|end (my|it all)|self[- ]?harm|hurt (myself|someone)|want to die|overdos\w*|emergency|in danger|crisis)\b/i;

export const isCrisis = (s: string) => CRISIS.test(s);
