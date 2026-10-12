import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
  title: 'Marijuana Card OH',
  description: 'Real Ohio doctors. Clear answers. Your money back if you don’t qualify.',
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
