import Link from 'next/link';
import s from './ui.module.css';

type Props = { href: string; children: React.ReactNode; variant?: 'primary' | 'accent' | 'secondary'; full?: boolean };

export function Button({ href, children, variant = 'primary', full }: Props) {
  return <Link href={href} className={[s.button, s[variant], full ? s.full : ''].join(' ')}>{children}</Link>;
}
