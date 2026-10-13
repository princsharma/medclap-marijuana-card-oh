/**
 * Email sign-ups from the exit-intent popups (free checklist, "finish later" link).
 * Forwards to LEADS_WEBHOOK_URL (the email tool / CRM), signed with LEADS_WEBHOOK_SECRET as an
 * HMAC-SHA256 hex digest in x-mcoh-signature. Only the email, consent and offer are sent: never the page
 * the visitor was on, because a sign-up from a condition page would reveal health information.
 * Without a URL nothing is stored and the response says forwarded: false (the popup then shows a direct download).
 */
import { createHmac, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';

const SOURCES = ['guide', 'survey-exit'] as const;

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 }); }
  const email = typeof b.email === 'string' ? b.email.trim().slice(0, 200) : '';
  const source = SOURCES.find((s) => s === b.source);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !source || b.consent !== true) {
    return NextResponse.json({ ok: false, error: 'Enter a valid email and tick the box.' }, { status: 422 });
  }
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: true, forwarded: false });

  const body = JSON.stringify({
    id: randomUUID(), at: new Date().toISOString(), email, source,
    offer: source === 'guide' ? 'Ohio Medical Card Checklist (PDF)' : 'Finish-later link to /get-started',
    consent: { marketing: true, text: 'Email me … and occasional Ohio medical card updates. Unsubscribe anytime.', at: new Date().toISOString() },
  });
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (process.env.LEADS_WEBHOOK_SECRET) headers['x-mcoh-signature'] = createHmac('sha256', process.env.LEADS_WEBHOOK_SECRET).update(body).digest('hex');
  try {
    const r = await fetch(url, { method: 'POST', headers, body, signal: AbortSignal.timeout(8000) });
    return NextResponse.json({ ok: true, forwarded: r.ok });
  } catch {
    return NextResponse.json({ ok: true, forwarded: false });
  }
}
