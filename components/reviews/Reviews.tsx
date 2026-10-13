import { publishable, reviewLinks, summary, type Review } from '@/content/reviews';
import { physicians } from '@/brand/site';
import { showPending } from '@/lib/site';
import Link from 'next/link';
import { brand, pricing } from '@/brand/site';
import { LaunchGate } from '@/components/ui/Pending';
import { JsonLd } from '@/components/PageParts';
import { BASE, ORG } from '@/lib/schema';
import r from './reviews.module.css';

const SHOW = 6;
const SERVICE_ID = `${BASE}/#service`;

function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <span className={r.stars} role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i + 1));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs><linearGradient id={`g${i}-${Math.round(fill * 100)}`}><stop offset={`${fill * 100}%`} stopColor="var(--sun-500)" /><stop offset={`${fill * 100}%`} stopColor="var(--teal-200)" /></linearGradient></defs>
            <path fill={`url(#g${i}-${Math.round(fill * 100)})`} d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
          </svg>
        );
      })}
    </span>
  );
}

const month = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function Card({ v }: { v: Review }) {
  const doc = v.physicianSlug ? physicians.find((p) => p.slug === v.physicianSlug) : undefined;
  return (
    <li className={r.card}>
      <Stars value={v.rating} />
      <blockquote className={r.text}><p>{v.text}</p></blockquote>
      <p className={r.who}>
        <strong>{v.firstName} {v.lastInitial}.</strong>{v.city ? `, ${v.city}` : ''}
      </p>
      <p className={r.meta}>
        {v.visit === 'renewal' ? 'Renewal' : 'New card'} · {month(v.date)}{doc ? ` · Saw ${doc.name.replace(' Chance', '').replace(/ [A-Z]\. /, ' ')}` : ''}
      </p>
      <p className={r.meta}>
        {v.verifiedPatient ? <span className={r.badge}>Verified patient</span> : null}
        {v.source === 'Google' ? <span>Google review</span> : null}
        {v.edited ? <span> · Edited: {v.edited}</span> : null}
      </p>
    </li>
  );
}

export function Reviews({ city, title = 'What patients say' }: { city?: string; title?: string }) {
  const all = publishable();
  // Until real reviews exist, the slot carries verifiable trust facts instead. No reviews are ever invented.
  if (all.length === 0) return <TrustInstead />;
  // A city page lists that city's reviews first; the summary always covers every review.
  const list = city ? [...all.filter((v) => v.city === city), ...all.filter((v) => v.city !== city)] : all;
  const sum = summary(all);
  // Always the 6 newest; older ones drop off as new reviews come in.
  const shown = list.slice(0, SHOW);

  return (
    <section className={r.section} aria-labelledby="reviews">
      <div className={r.head}>
        <h2 id="reviews" className="type-h2">{title}</h2>
        <div className={r.summary}>
          <p className={r.avg}>{sum.avg.toFixed(1)}</p>
          <div>
            <Stars value={sum.avg} size={22} />
            <p className={r.meta}>Based on {sum.count} {sum.count === 1 ? 'review' : 'reviews'}</p>
          </div>
          <ul className={r.dist} aria-label="Ratings breakdown">
            {sum.dist.map((d) => (
              <li key={d.stars}>
                <span>{d.stars}★</span>
                <span className={r.bar}><span style={{ width: `${sum.count ? (d.count / sum.count) * 100 : 0}%` }} /></span>
                <span>{d.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className={r.grid}>{shown.map((v) => <Card key={v.id} v={v} />)}</ul>
      <p className={r.policy}>
        We show every review from patients who give us permission, good or bad. We never pay for reviews or offer anything in return,
        and we remove health details to protect your privacy. Reviews describe our service, not medical results.
        {reviewLinks.google ? <> <a href={reviewLinks.google} target="_blank" rel="noopener noreferrer">Leave a review on Google</a>.</> : null}
      </p>
      {(
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', '@id': SERVICE_ID, name: 'Ohio medical marijuana card evaluation', provider: ORG,
          aggregateRating: { '@type': 'AggregateRating', ratingValue: sum.avg, reviewCount: sum.count, bestRating: 5, worstRating: 1 },
          review: shown.map((v) => ({ '@type': 'Review', author: { '@type': 'Person', name: `${v.firstName} ${v.lastInitial}.` }, datePublished: v.date,
            reviewBody: v.text, reviewRating: { '@type': 'Rating', ratingValue: v.rating, bestRating: 5, worstRating: 1 } })) }} />
      )}
    </section>
  );
}

/** Shown in the review slot before the first real review: facts a visitor can check for themselves. */
function TrustInstead() {
  const facts: [string, React.ReactNode][] = [
    ['Doctors you can look up', <>Both physicians hold an active Ohio license and a Certificate to Recommend. Their numbers are on <Link href="/doctors">their profiles</Link>, so you can check them on Ohio eLicense.</>],
    ['Your money back if you don’t qualify', <>If your physician finds you don’t qualify, you get your full evaluation fee back. No deductions. <Link href="/refund-policy">Refund terms</Link></>],
    ['One clear price', <>${pricing.newEvaluation} for a new card, ${pricing.renewalEvaluation} to renew. Ohio charges no state registration fee.</>],
    ['From home, anywhere in Ohio', <>Your visit is a video call with an Ohio physician. No waiting room, no travel.</>],
  ];
  return (
    <section className={r.section} aria-labelledby="reviews">
      {showPending ? <LaunchGate title="Patient reviews">No reviews yet, so this slot shows trust facts. The review carousel replaces it automatically once the first real review with permission to publish is added to content/reviews.ts.</LaunchGate> : null}
      <h2 id="reviews" className="type-h2">What you can count on</h2>
      <ul className={`${r.grid} ${r.facts}`}>
        {facts.map(([h, body]) => (
          <li key={h} className={r.card}>
            <h3 className={r.factTitle}>{h}</h3>
            <p className={r.factText}>{body}</p>
          </li>
        ))}
      </ul>
      <p className={r.policy}>
        Had your visit? Tell us how it went at <a href={`mailto:${brand.email}?subject=My%20review`}>{brand.email}</a>. We publish reviews only with your permission, good or bad, and never with your health details.
      </p>
    </section>
  );
}
