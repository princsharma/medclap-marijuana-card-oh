import Link from 'next/link';
import { Button } from './Button';
import { LeafMark } from './LeafMark';
import s from './ui.module.css';

const links = [
  ['How it works', '/how-it-works'], ['Conditions', '/conditions'], ['Pricing', '/pricing'],
  ['Our doctors', '/doctors'], ['Renewals', '/renewals'], ['FAQ', '/faq'],
] as const;

export function Header() {
  return (
    <header className={s.header}>
      <div className={`container ${s.headerInner}`}>
        <Link href="/" className={s.logo} aria-label="Marijuana Card OH home">
          <LeafMark /> <span className="type-h3">Marijuana Card OH</span>
        </Link>
        <nav aria-label="Main" className={s.nav}>
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Button href="/eligibility">Check if you qualify</Button>
        </nav>
      </div>
    </header>
  );
}
