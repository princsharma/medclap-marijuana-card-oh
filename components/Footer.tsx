import Link from 'next/link';
import { LeafMark } from './LeafMark';
import { brand } from '@/brand/site';
import s from './page.module.css';

const cols = [
  ['Get your card', [['How it works', '/how-it-works'], ['Pricing', '/pricing'], ['Renewals', '/renewals'], ['Check if you qualify', '/eligibility']]],
  ['Learn', [['Qualifying conditions', '/conditions'], ['Ohio registry guide', '/guides/ohio-medical-marijuana-registry'], ['Help Center', '/help'], ['FAQ', '/faq'], ['Blog', '/blog'], ['Locations', '/locations']]],
  ['About', [['Our doctors', '/doctors'], ['About us', '/about'], ['Editorial policy', '/editorial-policy'], ['Contact', '/contact']]],
  ['Policies', [['Refund policy', '/refund-policy'], ['Privacy policy', '/privacy'], ['Notice of privacy practices', '/notice-of-privacy-practices'], ['Terms of use', '/terms'], ['Telehealth consent', '/telehealth-consent']]],
] as const;

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.footerGrid}`}>
        <div className={s.footerBrand}>
          <Link href="/" className={s.footerLogo}><LeafMark size={32} /> <span className="type-h3">{brand.name}</span></Link>
          <p className="type-small">Telehealth medical marijuana evaluations for adults across Ohio.</p>
          <p className="type-small">{brand.email}</p>
        </div>
        {cols.map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <p className="type-label">{title}</p>
            <ul>{links.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className={`container ${s.footerLegal} type-small`}>
        <p>If you’re in crisis or thinking about harming yourself, call or text 988. In an emergency, call 911.</p>
        <p>© 2026 {brand.name}. Medical marijuana is legal in Ohio under state law but remains federally controlled.</p>
      </div>
    </footer>
  );
}
