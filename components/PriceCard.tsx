import { Button } from './Button';
import s from './ui.module.css';

type Props = { type: 'new' | 'renewal' };
const data = {
  new: { label: 'New patient evaluation', price: '$149', cta: 'Book your evaluation', href: '/book' },
  renewal: { label: 'Renewal evaluation', price: '$129', cta: 'Book your renewal', href: '/book?type=renewal' },
};

// The guarantee line must stay beside the price (16 CFR 239.3).
export function PriceCard({ type }: Props) {
  const d = data[type];
  return (
    <article className={[s.card, s.price, type === 'new' ? s.featured : ''].join(' ')}>
      <p className="type-label" style={{ color: 'var(--color-text-brand)' }}>{d.label}</p>
      <p className="type-display">{d.price}</p>
      <p className={`type-small ${s.muted}`}>Evaluation fee. Ohio currently charges no state registration fee.</p>
      <ul className={`${s.points} type-body`}>
        <li>Telehealth visit with an Ohio-licensed physician</li>
        <li>Recommendation submitted to the state registry if you qualify</li>
        <li>Renewal reminders before your card expires</li>
      </ul>
      <Button href={d.href} full>{d.cta}</Button>
      <p className={`type-small ${s.muted}`}>100% money-back guarantee if you don’t qualify. <a href="/refund-policy">See refund terms</a>.</p>
    </article>
  );
}
