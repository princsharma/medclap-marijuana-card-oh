import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const popular: [string, string][] = [
  ['How to get an Ohio medical marijuana card', '/how-it-works'],
  ['Ohio’s qualifying conditions', '/conditions'],
  ['Pricing and refunds', '/pricing'],
  ['Renew your card', '/renewals'],
  ['Find a dispensary', '/dispensaries'],
  ['Help Center', '/help'],
];

export default function NotFound() {
  return (
    <main className={`container ${s.main}`}>
      <header className={s.pageHeader}>
        <h1 className="type-h1">We couldn’t find that page</h1>
        <p className="type-body-lg">The link may be old or mistyped. These pages are a good place to start.</p>
        <Button href="/get-started">Check if you qualify</Button>
      </header>
      <nav aria-label="Popular pages" className={s.section}>
        <ul className={`${s.prose} type-body`}>
          {popular.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
        </ul>
      </nav>
    </main>
  );
}
