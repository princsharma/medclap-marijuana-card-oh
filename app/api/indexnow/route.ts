/**
 * IndexNow: tells Bing, Yandex, Seznam, Naver and Yep that pages changed (indexnow.org).
 * Key file: /d95eec34a39f80f279fcb0843945c720.txt (public/). Called by:
 *  - the daily Vercel cron (vercel.json) with Authorization: Bearer CRON_SECRET → pages changed in the last 2 days;
 *  - by hand with ?token=INDEXNOW_TOKEN&mode=all → every page in the sitemap (first submission or after a big update).
 * Production only, and only for the real domain.
 */
import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';
import { brand } from '@/brand/site';

export const dynamic = 'force-dynamic';
const KEY = 'd95eec34a39f80f279fcb0843945c720';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const auth = req.headers.get('authorization');
  const ok = (process.env.CRON_SECRET && auth === `Bearer ${process.env.CRON_SECRET}`)
    || (process.env.INDEXNOW_TOKEN && url.searchParams.get('token') === process.env.INDEXNOW_TOKEN);
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });
  if (process.env.NEXT_PUBLIC_SITE_ENV !== 'production') return NextResponse.json({ ok: false, error: 'production only' }, { status: 400 });

  const all = url.searchParams.get('mode') === 'all';
  const since = Date.now() - 2 * 86400000;
  const urlList = sitemap()
    .filter((e) => all || (e.lastModified && new Date(e.lastModified).getTime() >= since))
    .map((e) => e.url)
    .filter((u) => u.startsWith(`https://${brand.domain}`));
  if (!urlList.length) return NextResponse.json({ ok: true, submitted: 0 });

  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: brand.domain, key: KEY, keyLocation: `https://${brand.domain}/${KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(10000),
  });
  return NextResponse.json({ ok: r.ok, status: r.status, submitted: urlList.length });
}
