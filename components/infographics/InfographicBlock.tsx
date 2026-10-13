import { getInfographic, infographicPng } from '@/content/infographics';
import sizes from '@/content/infographic-sizes.json';
import { brand } from '@/brand/site';
import { siteUrl } from '@/lib/site';
import { Infographic } from './Infographic';
import { EmbedInfographic } from './EmbedInfographic';
import { JsonLd } from '@/components/PageParts';

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Infographic + embed box + ImageObject data. Place it where a page walks through steps. */
export function InfographicBlock({ slug }: { slug: string }) {
  const ig = getInfographic(slug);
  if (!ig) return null;
  const pageUrl = `${siteUrl}${ig.page}`;
  const png = `${siteUrl}${infographicPng(ig.slug)}`;
  const h = (sizes as Record<string, number>)[ig.slug];
  const code = `<a href="${pageUrl}"><img src="${png}" alt="${esc(ig.alt)}" width="1200"${h ? ` height="${h}"` : ''} style="max-width:100%;height:auto" loading="lazy"></a>\n<p>Infographic: <a href="${pageUrl}">${esc(ig.title)}</a> by ${esc(brand.name)}</p>`;
  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <Infographic ig={ig} />
      <EmbedInfographic code={code} png={infographicPng(ig.slug)} title={ig.slug} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ImageObject', contentUrl: png, name: ig.title, description: ig.alt,
        width: 1200, ...(h ? { height: h } : {}), creditText: brand.name, creator: { '@id': `https://${brand.domain}/#organization` },
        copyrightNotice: `© 2026 ${brand.name}`, acquireLicensePage: pageUrl }} />
    </div>
  );
}
