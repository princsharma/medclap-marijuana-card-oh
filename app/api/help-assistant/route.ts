import { NextResponse } from "next/server";
import { articles, assistantFacts, getArticle, helpPaths } from "@/content/help";
import { isCrisis, rank } from "@/lib/helpSearch";

/**
 * Instant AI Help.
 * - With ANTHROPIC_API_KEY set: answers with Claude, grounded only in Help Center articles.
 * - Without it: answers from the best-matching article (keyword ranking).
 * Questions are not stored or logged by this route.
 */
export const dynamic = "force-dynamic";

type Source = { slug: string; question: string; href: string };
export type AssistantReply =
  | { kind: "answer"; answer: string; sources: Source[]; mode: "ai" | "match" }
  | { kind: "none"; answer: string; sources: Source[]; mode: "ai" | "match" }
  | { kind: "crisis"; sources: Source[] };

const MAX_LEN = 500;
const toSource = (slug: string): Source | null => {
  const a = getArticle(slug);
  return a ? { slug, question: a.question, href: helpPaths.article(slug) } : null;
};

const SYSTEM = `You are "Instant AI Help" for Marijuana Card OH, an Ohio-only telehealth service that connects Ohio adults with Ohio-licensed physicians for medical marijuana card evaluations.

Rules:
- Answer ONLY using the Help Center articles and site facts below. If they don't cover the question, say you don't have that information and suggest contacting the team. Never promise that someone will qualify or get a card. Never invent prices, policies, insurance status, availability, clinicians or legal/compliance claims.
- You give general information about the website and its services only. Do not give medical, psychological, diagnostic, medication or legal advice, and do not assess symptoms. If asked, say a qualified clinician can help and point to the relevant service page.
- You cannot book, cancel or change appointments or see accounts.
- If the person mentions danger, self-harm or a crisis, tell them to call 911 if in immediate danger, or call or text 988.
- Keep answers to 2–4 short sentences of plain text. No markdown, no lists, no headings.
- After the answer, on a final line, write "SOURCES:" followed by up to 3 article slugs you relied on, comma-separated (or "SOURCES: none").`;

const CONTEXT = [
  "SITE FACTS:",
  ...assistantFacts.map((f) => `- ${f}`),
  "",
  "HELP CENTER ARTICLES (slug | question | answer):",
  ...articles.map((a) => `${a.slug} | ${a.question} | ${a.text}`),
].join("\n");

async function askClaude(question: string, key: string): Promise<AssistantReply | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.HELP_ASSISTANT_MODEL || "claude-haiku-5-5",
      max_tokens: 400,
      temperature: 0,
      system: [{ type: "text", text: `${SYSTEM}\n\n${CONTEXT}`, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: question }],
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { content?: { type: string; text?: string }[] };
  const raw = (data.content ?? []).map((c) => c.text ?? "").join("").trim();
  if (!raw) return null;
  const m = raw.match(/\n?SOURCES:\s*(.*)$/i);
  const answer = (m ? raw.slice(0, m.index) : raw).trim();
  const slugs = m && !/^none/i.test(m[1].trim()) ? m[1].split(",").map((x) => x.trim()) : [];
  const sources = slugs.map(toSource).filter((x): x is Source => !!x).slice(0, 3);
  return { kind: sources.length ? "answer" : "none", answer, sources, mode: "ai" };
}

function fromArticles(question: string): AssistantReply {
  const hits = rank(question, articles, 3);
  const best = hits[0];
  if (!best || best.score < 1.5) {
    return {
      kind: "none",
      answer:
        "I couldn’t find an answer to that in our Help Center. Try rephrasing, browse the Knowledge Base, or contact our team.",
      sources: hits.map((h) => toSource(h.item.slug)!).filter(Boolean),
      mode: "match",
    };
  }
  const first = best.item.answer.find((l) => !l.startsWith("- ")) ?? best.item.text;
  const plain = first.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return {
    kind: "answer",
    answer: plain,
    sources: hits.filter((h) => h.score >= best.score / 2).map((h) => toSource(h.item.slug)!),
    mode: "match",
  };
}

export async function POST(req: Request) {
  let question = "";
  try {
    const body = (await req.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!question) return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
  if (question.length > MAX_LEN) return NextResponse.json({ error: `Please keep questions under ${MAX_LEN} characters.` }, { status: 400 });

  if (isCrisis(question)) {
    const crisisArticle = toSource("is-marijuana-card-oh-an-emergency-or-crisis-service");
    return NextResponse.json({ kind: "crisis", sources: crisisArticle ? [crisisArticle] : [] } satisfies AssistantReply);
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (key) {
    try {
      const reply = await askClaude(question, key);
      if (reply) return NextResponse.json(reply);
    } catch {
      // fall through to article matching
    }
  }
  return NextResponse.json(fromArticles(question));
}
