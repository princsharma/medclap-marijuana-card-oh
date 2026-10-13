import Link from 'next/link';
import { Button } from './Button';
import { LeafMark } from './LeafMark';
import s from './ui.module.css';

const links = [
  ['How it works', '/how-it-works'], ['Conditions', '/conditions'], ['Pricing', '/pricing'],
  ['Our doctors', '/doctors'], ['Renewals', '/renewals'], ['Help Center', '/help'],
] as const;

export function Header() {
  return (
    <header className={s.header}>
      <div className={`container ${s.headerInner}`}>
        <Link href="/" className={s.logo} aria-label="Marijuana Card OH home">
          <LeafMark /> <span className={`type-h3 ${s.logoText}`}>Marijuana Card OH</span>
        </Link>
        <nav aria-label="Main" className={`${s.nav} ${s.navDesktop}`}>
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Button href="/get-started">Check if you qualify</Button>
        </nav>
        {/* Phones: a native disclosure, so the menu works without JavaScript. */}
        <details className={s.navMobile}>
          <summary aria-label="Menu">Menu</summary>
          <nav aria-label="Main mobile" className={s.mobilePanel}>
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Button href="/get-started" full>Check if you qualify</Button>
          </nav>
        </details>
      </div>
    </header>
  );
}
