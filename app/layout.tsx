import type { Metadata } from 'next';
import { IMG } from '@/brand/images';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HideInFunnel } from '@/components/HideInFunnel';
import { JsonLd } from '@/components/PageParts';
import { brand } from '@/brand/site';

// Self-hosted (SIL Open Font License) so no visitor data goes to a font CDN.
const bricolage = localFont({
  src: [
    { path: './fonts/bricolage-grotesque-latin-700-normal.woff2', weight: '700' },
    { path: './fonts/bricolage-grotesque-latin-800-normal.woff2', weight: '800' },
  ],
  variable: '--font-bricolage', display: 'swap',
});
const figtree = localFont({
  src: [
    { path: './fonts/figtree-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/figtree-latin-600-normal.woff2', weight: '600' },
    { path: './fonts/figtree-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-figtree', display: 'swap',
});

// Nothing is indexed until go-live (step 19): set ALLOW_INDEXING=true on the production environment only.
const allowIndexing = process.env.ALLOW_INDEXING === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: { default: 'Ohio Medical Marijuana Card Online | Marijuana Card OH', template: '%s | Marijuana Card OH' },
  description: 'Real Ohio doctors. Clear answers. Your money back if you don’t qualify.',
  robots: allowIndexing ? undefined : { index: false, follow: false },
  openGraph: { type: 'website', siteName: brand.name, images: [{ url: IMG.social.src, width: IMG.social.w, height: IMG.social.h, alt: IMG.social.alt }] },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <HideInFunnel><Header /></HideInFunnel>
        <div id="main">{children}</div>
        <HideInFunnel><Footer /></HideInFunnel>
        <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
          { '@type': 'MedicalOrganization', '@id': `https://${brand.domain}/#organization`, name: brand.name, url: `https://${brand.domain}`,
            logo: `https://${brand.domain}/apple-icon.png`, image: IMG.social.src, description: brand.tagline, email: brand.email,
            areaServed: { '@type': 'State', name: 'Ohio' }, isAcceptingNewPatients: true,
            knowsAbout: ['Ohio Medical Marijuana Control Program', 'Medical marijuana recommendations', 'Telehealth'] },
          { '@type': 'WebSite', '@id': `https://${brand.domain}/#website`, url: `https://${brand.domain}`, name: brand.name, inLanguage: 'en-US',
            publisher: { '@id': `https://${brand.domain}/#organization` } },
        ] }} />
      </body>
    </html>
  );
}
