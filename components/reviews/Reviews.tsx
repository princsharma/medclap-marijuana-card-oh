import { publishable, reviewLinks, summary, type Review } from '@/content/reviews';
import { physicians } from '@/brand/site';
import { showPending } from '@/lib/site';
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

/** Staging-only preview of the layout. Never rendered in production and never in schema. */
const SAMPLES: Review[] = [
  { id: 's1', firstName: 'Sample', lastInitial: 'A', city: 'Columbus', rating: 5, date: '2026-10-01', text: 'Sample review text. Real patient reviews appear here once they are collected with permission.', visit: 'new', source: 'Direct', verifiedPatient: true, consentOn: '2026-10-01' },
  { id: 's2', firstName: 'Sample', lastInitial: 'B', city: 'Dayton', rating: 4, date: '2026-09-20', text: 'Sample review text. Every review is shown, good or bad, with health details removed.', visit: 'renewal', source: 'Google', sourceUrl: '#', verifiedPatient: false },
  { id: 's3', firstName: 'Sample', lastInitial: 'C', rating: 5, date: '2026-09-02', text: 'Sample review text.', visit: 'new', source: 'Direct', verifiedPatient: true, consentOn: '2026-09-02', physicianSlug: 'kevin-kargman' },
];

export function Reviews({ city, title = 'What patients say' }: { city?: string; title?: string }) {
  const real = publishable();
  const sample = real.length === 0;
  if (sample && !showPending) return null;
  const all = sample ? SAMPLES : real;
  // A city page lists that city's reviews first; the summary always covers every review.
  const list = city ? [...all.filter((v) => v.city === city), ...all.filter((v) => v.city !== city)] : all;
  const sum = summary(all);
  // Always the 6 newest; older ones drop off as new reviews come in.
  const shown = list.slice(0, SHOW);

  return (
    <section className={r.section} aria-labelledby="reviews">
      {sample ? <LaunchGate title="Patient reviews">This section shows sample layout on staging only. It goes live automatically once real reviews with permission to publish are added to content/reviews.ts.</LaunchGate> : null}
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
      {sample ? null : (
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', '@id': SERVICE_ID, name: 'Ohio medical marijuana card evaluation', provider: ORG,
          aggregateRating: { '@type': 'AggregateRating', ratingValue: sum.avg, reviewCount: sum.count, bestRating: 5, worstRating: 1 },
          review: shown.map((v) => ({ '@type': 'Review', author: { '@type': 'Person', name: `${v.firstName} ${v.lastInitial}.` }, datePublished: v.date,
            reviewBody: v.text, reviewRating: { '@type': 'Rating', ratingValue: v.rating, bestRating: 5, worstRating: 1 } })) }} />
      )}
    </section>
  );
}
