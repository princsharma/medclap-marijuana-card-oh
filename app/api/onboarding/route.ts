/**
 * Onboarding survey submissions.
 * Forwards the answers to the EHR at EHR_WEBHOOK_URL (signed with EHR_WEBHOOK_SECRET as an HMAC-SHA256
 * hex digest in the x-mcoh-signature header). Without a URL, nothing is stored or sent and the response
 * says forwarded: false. Bodies are never logged: they contain health information.
 */
import { createHmac, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { conditions } from '@/brand/conditions';

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneOf = <T extends string>(v: unknown, list: readonly T[]) => (list.includes(v as T) ? (v as T) : undefined);

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 }); }

  const email = str(b.email); const phone = str(b.phone).replace(/\D/g, ''); const zip = str(b.zip, 5);
  const slugs = Array.isArray(b.conditions) ? b.conditions.filter((c): c is string => typeof c === 'string' && conditions.some((x) => x.slug === c)) : [];
  const record = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    source: 'marijuanacardoh.com/get-started',
    visitType: oneOf(b.visitType, ['new', 'renewal'] as const),
    ohioResident: b.ohio === true,
    dateOfBirth: str(b.dob, 10),
    conditions: slugs.map((slug) => ({ slug, name: conditions.find((x) => x.slug === slug)!.name })),
    conditionNotSure: b.notSure === true,
    diagnosed: oneOf(b.diagnosed, ['yes', 'no', 'unsure'] as const),
    records: oneOf(b.records, ['have', 'can-get', 'none'] as const),
    cardExpires: oneOf(b.expires, ['expired', '30-days', '1-3-months', 'later', 'unsure'] as const),
    patient: { firstName: str(b.firstName, 80), lastName: str(b.lastName, 80), email, phone, zip },
    smsOptIn: b.smsOptIn === true,
    consents: { telehealth: b.consentTelehealth === true, termsAndPrivacy: b.consentTerms === true, at: new Date().toISOString() },
    heardFrom: str(b.heardFrom, 80),
    attribution: typeof b.attribution === 'object' && b.attribution ? Object.fromEntries(Object.entries(b.attribution as Record<string, unknown>).slice(0, 12).map(([k, v]) => [k.slice(0, 40), str(v, 300)])) : {},
  };

  const missing = !record.visitType || !record.ohioResident || !record.dateOfBirth || !record.patient.firstName || !record.patient.lastName
    || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || phone.length !== 10 || !/^\d{5}$/.test(zip)
    || (!slugs.length && !record.conditionNotSure) || !record.consents.telehealth || !record.consents.termsAndPrivacy;
  if (missing) return NextResponse.json({ ok: false, error: 'Some answers are missing.' }, { status: 422 });

  const url = process.env.EHR_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: true, forwarded: false });

  const body = JSON.stringify(record);
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (process.env.EHR_WEBHOOK_SECRET) headers['x-mcoh-signature'] = createHmac('sha256', process.env.EHR_WEBHOOK_SECRET).update(body).digest('hex');
  try {
    const r = await fetch(url, { method: 'POST', headers, body, signal: AbortSignal.timeout(10000) });
    if (!r.ok) return NextResponse.json({ ok: false, error: 'Could not reach our care team.' }, { status: 502 });
    return NextResponse.json({ ok: true, forwarded: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not reach our care team.' }, { status: 502 });
  }
}
