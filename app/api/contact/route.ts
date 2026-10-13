import { NextResponse } from "next/server";
import { callTimes, getTopic, usStates } from "@/content/help";

/**
 * Call-back requests from Help Center → Contact Us.
 * Forwarded as JSON to CONTACT_WEBHOOK_URL (helpdesk, CRM or email automation) when it is configured.
 * Without it nothing is sent or stored, and the response says so.
 * Only contact details are collected — never health information.
 */
export const dynamic = "force-dynamic";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  // Honeypot field: real visitors never fill it in.
  if (clean(b.company, 100)) return NextResponse.json({ ok: true, delivered: false });

  const topic = getTopic(clean(b.topic, 60));
  const name = clean(b.name, 100);
  const phone = clean(b.phone, 30);
  const state = clean(b.state, 40);
  const time = clean(b.time, 40);
  const digits = phone.replace(/\D/g, "");

  const errors: Record<string, string> = {};
  if (!topic) errors.topic = "Choose a category.";
  if (name.length < 2) errors.name = "Enter your name.";
  if (digits.length < 10 || digits.length > 11) errors.phone = "Enter a 10-digit US phone number.";
  if (!usStates.includes(state)) errors.state = "Select the state you’re in.";
  if (!callTimes.includes(time)) errors.time = "Choose a time.";
  if (b.consent !== true) errors.consent = "Please confirm you agree to be contacted.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return process.env.NEXT_PUBLIC_SITE_ENV === 'production'
    ? NextResponse.json({ ok: false, error: 'Our contact form is unavailable right now. Please email us instead.' }, { status: 503 })
    : NextResponse.json({ ok: true, delivered: false });

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "callback_request",
        topic: topic!.title,
        name,
        phone,
        state,
        bestTime: time,
        submittedAt: new Date().toISOString(),
        source: "help-center",
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn’t send your request just now. Please try again shortly." }, { status: 502 });
  }
}
