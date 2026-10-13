// Tracking guard test (Privacy Policy promise): GTM loads on normal pages, never on no-tracking pages
// (brand/legal.ts noTrackingPaths), and links into those pages become full page loads.
// Run via `npm run qa:tracking` (builds with a dummy GTM ID in production mode first).
import { readFileSync } from 'node:fs';
import { launch, serve } from './browser.mjs';

const port = 3311, B = `http://localhost:${port}`;
const blockedList = JSON.parse(readFileSync('brand/legal.ts', 'utf8').match(/noTrackingPaths = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
const stop = await serve(port);
const { browser } = await launch();
const fails = [];
try {
  const page = await (await browser.newContext()).newPage();
  const gtm = [];
  await page.route(/googletagmanager\.com/, (r) => { gtm.push(page.url()); r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }); });
  await page.route(/cloudfront\.net|\.(png|jpe?g|webp|avif)(\?|$)/, (r) => r.fulfill({ status: 204, body: '' }));
  const loaded = () => page.evaluate(() => !!window.__mcohGtm);
  const views = () => page.evaluate(() => (window.dataLayer || []).filter((e) => e.event === 'virtual_page_view').map((e) => e.page_path));

  await page.goto(`${B}/`, { waitUntil: 'networkidle' });
  if (!(await loaded()) || gtm.length !== 1) fails.push('GTM did not load on the home page (is NEXT_PUBLIC_GTM_ID set and SITE_ENV production?)');
  if (!(await views()).includes('/')) fails.push('no virtual_page_view for /');

  // Every no-tracking link found on the home page must open as a fresh page without GTM.
  for (const prefix of blockedList.filter((p) => !p.startsWith('/api'))) {
    await page.goto(`${B}/`, { waitUntil: 'networkidle' });
    const href = await page.evaluate((p) => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).find((h) => h && (h === p || h.startsWith(p.endsWith('/') ? p : `${p}`))), prefix);
    const target = href ?? (prefix.endsWith('/') ? null : prefix);
    if (!target) continue;
    if (href) await page.click(`a[href="${href}"]`); else await page.goto(`${B}${target}`);
    await page.waitForLoadState('networkidle');
    if (await loaded()) fails.push(`GTM still running on ${target}`);
  }
  // Direct visits to each blocked path (dynamic ones via the sitemap).
  const sm = await (await fetch(`${B}/sitemap.xml`)).text();
  const paths = [...sm.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
  for (const prefix of blockedList) {
    const p = paths.find((x) => (prefix.endsWith('/') ? x.startsWith(prefix) : x === prefix)) ?? (prefix.endsWith('/') || prefix.startsWith('/api') ? null : prefix);
    if (!p) continue;
    const before = gtm.length;
    await page.goto(`${B}${p}`, { waitUntil: 'networkidle' });
    if ((await loaded()) || gtm.length > before) fails.push(`GTM loaded on direct visit to ${p}`);
  }
  console.log(fails.length ? `FAIL\n  ${fails.join('\n  ')}` : `PASS: GTM on normal pages, never on ${blockedList.join(', ')}`);
} finally {
  await browser.close(); await stop();
}
process.exit(fails.length ? 1 : 0);
