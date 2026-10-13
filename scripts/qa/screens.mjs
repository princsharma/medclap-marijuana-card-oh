// Screenshots for visual review: every listed path (or the first 12 sitemap pages) at desktop 1280 and Pixel 7,
// saved to qa-shots/. Also fails if any page scrolls horizontally on mobile.
// Usage: node scripts/qa/screens.mjs [--base URL] [/path /path ...]   (starts its own server when no --base)
import { mkdirSync } from 'node:fs';
import { launch, serve } from './browser.mjs';

const args = process.argv.slice(2);
const bi = args.indexOf('--base');
const base = bi >= 0 ? args[bi + 1] : 'http://localhost:3311';
const stop = bi >= 0 ? async () => {} : await serve(3311);
let paths = args.filter((a, i) => a.startsWith('/') && args[i - 1] !== '--base');
if (!paths.length) {
  const sm = await (await fetch(`${base}/sitemap.xml`)).text();
  paths = [...sm.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/').slice(0, 12);
}
mkdirSync('qa-shots', { recursive: true });
const { pw, browser } = await launch();
const fails = [];
try {
  for (const [name, opts] of [['desktop', { viewport: { width: 1280, height: 900 } }], ['mobile', pw.devices['Pixel 7']]]) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.route(/googletagmanager\.com/, (r) => r.abort());
    for (const p of paths) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const file = `qa-shots/${name}${p === '/' ? '-home' : p.replace(/\//g, '-')}.png`;
      await page.screenshot({ path: file, fullPage: true });
      if (name === 'mobile' && await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) fails.push(`${p} scrolls horizontally on mobile`);
    }
    await ctx.close();
  }
  console.log(`Saved ${paths.length * 2} screenshots to qa-shots/`);
  console.log(fails.length ? `FAIL\n  ${fails.join('\n  ')}` : 'PASS: no horizontal scroll on mobile');
} finally { await browser.close(); await stop(); }
process.exit(fails.length ? 1 : 0);
