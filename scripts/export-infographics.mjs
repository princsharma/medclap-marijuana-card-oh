// Renders each infographic artboard to public/infographics/<slug>.png and records heights.
// Usage: next build && next start -p 3311, then: node scripts/export-infographics.mjs [executablePath]
import { chromium } from 'playwright';
import fs from 'fs';
const BASE = process.env.BASE ?? 'http://localhost:3311';
const src = fs.readFileSync(new URL('../content/infographics.ts', import.meta.url), 'utf8');
const slugs = [...src.matchAll(/slug: '([^']+)', page:/g)].map((m) => m[1]);
const b = await chromium.launch(process.argv[2] ? { executablePath: process.argv[2] } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
const sizes = {};
for (const slug of slugs) {
  await p.goto(`${BASE}/infographic-render/${slug}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const el = p.locator('#artboard figure');
  const box = await el.boundingBox();
  await el.screenshot({ path: `public/infographics/${slug}.png` });
  sizes[slug] = Math.round(box.height);
  console.log(slug, Math.round(box.width), 'x', Math.round(box.height));
}
fs.writeFileSync('content/infographic-sizes.json', JSON.stringify(sizes, null, 2) + '\n');
await b.close();
