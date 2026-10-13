// Shared schema.org helpers: every node links to the one Organization and WebSite in app/layout.tsx by @id,
// so Google sees a single connected entity graph instead of disconnected copies.
import { author, brand, medicalReviewer, physicians } from '@/brand/site';

export const BASE = `https://${brand.domain}`;
export const ORG = { '@id': `${BASE}/#organization` };
export const WEBSITE = { '@id': `${BASE}/#website` };
export const abs = (p: string) => new URL(p, BASE).href;
export const physicianId = (slug: string) => `${BASE}/doctors/${slug}#physician`;
export const authorId = `${BASE}/editorial-policy#author`;

/** Medical reviewer as a reference to the full Physician node on their profile. */
export const reviewerRef = () => ({ '@type': 'Person', '@id': physicianId(medicalReviewer.slug), name: `${medicalReviewer.name}, ${medicalReviewer.credential}`, url: `${BASE}/doctors/${medicalReviewer.slug}` });
export const authorRef = () => ({ '@type': 'Person', '@id': authorId, name: author.name, honorificSuffix: author.credentials, jobTitle: 'Adult Nurse Practitioner', url: `${BASE}/editorial-policy` });

type PageOpts = {
  type?: string; path: string; name: string; description?: string; image?: string;
  about?: object; mainEntity?: object; reviewedOn?: string | null; dateModified?: string; extra?: object;
};
/** One WebPage-family node (WebPage, AboutPage, ContactPage, CollectionPage, MedicalWebPage, Blog…). */
export function pageNode({ type = 'WebPage', path, name, description, image, about, mainEntity, reviewedOn, dateModified, extra }: PageOpts) {
  const url = abs(path);
  return {
    '@context': 'https://schema.org', '@type': type, '@id': `${url}#webpage`, url, name,
    ...(description ? { description } : {}), inLanguage: 'en-US', isPartOf: WEBSITE, publisher: ORG,
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: abs(image) } } : {}),
    ...(about ? { about } : {}), ...(mainEntity ? { mainEntity } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(reviewedOn ? { lastReviewed: reviewedOn, reviewedBy: reviewerRef() } : {}),
    ...(type === 'MedicalWebPage' ? { audience: { '@type': 'Patient' } } : {}),
    ...extra,
  };
}

export const physicianList = () => ({
  '@type': 'ItemList', itemListElement: physicians.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${BASE}/doctors/${p.slug}`, name: `${p.name}, ${p.credential}` })),
});
