import { brand, physicians, pricing } from '@/brand/site';
import { conditions } from '@/brand/conditions';
import { guides } from '@/content/guides';
import { siteUrl } from '@/lib/site';

// llms.txt: a plain-text map of the site for AI answer engines (llmstxt.org format).
export const dynamic = 'force-static';

export function GET() {
  const u = (p: string) => `${siteUrl}${p}`;
  const body = `# ${brand.name}

> ${brand.name} is an Ohio-only telehealth service. Ohio adults see an Ohio-licensed physician who holds a Certificate to Recommend from the State Medical Board of Ohio, by video, to find out whether they qualify for Ohio's Medical Marijuana Control Program. A new evaluation costs $${pricing.newEvaluation} and a renewal costs $${pricing.renewalEvaluation}; Ohio currently charges no state registration fee. If the physician finds you don't qualify, the evaluation fee is refunded in full.

Key facts:
- Service area: Ohio only, adults 18 and older, by video from home.
- Physicians: ${physicians.map((p) => `${p.name}, ${p.credential}`).join('; ')}. License numbers are listed on each physician's page.
- The physician decides whether you qualify. A recommendation is not a prescription.
- Every page cites Ohio sources (Ohio Revised Code, Ohio Administrative Code, Division of Cannabis Control) with the date checked.

## Start here
- [How to get a medical marijuana card in Ohio](${u('/how-it-works')}): steps, who qualifies, what to bring
- [Pricing](${u('/pricing')}): fees and the money-back guarantee if you don't qualify
- [Qualifying conditions](${u('/conditions')}): Ohio's 21 qualifying conditions
- [Renewals](${u('/renewals')}): renewing an Ohio registration
- [Our doctors](${u('/doctors')}): physicians, licenses and NPI numbers
- [FAQ](${u('/faq')})

## Guides
- [The Ohio Medical Marijuana Registry, explained](${u('/guides/ohio-medical-marijuana-registry')})
${guides.map((g) => `- [${g.title}](${u(`/guides/${g.slug}`)})`).join('\n')}

## Qualifying conditions
${conditions.map((c) => `- [${c.name}](${u(`/conditions/${c.slug}`)})`).join('\n')}

## Optional
- [Locations](${u('/locations')}): Ohio cities and local rules
- [Dispensary locator](${u('/dispensaries')}): every licensed Ohio dispensary from state data
- [Help Center](${u('/help/knowledge-base')})
- [Editorial policy](${u('/editorial-policy')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
