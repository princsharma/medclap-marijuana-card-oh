import Link from 'next/link';
import { Badge } from './Badge';
import { FaqItem } from './FaqItem';
import { brand, medicalReviewer } from '@/brand/site';
import s from './page.module.css';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumbs({ trail }: { trail: [string, string][] }) {
  const items = [['Home', '/'], ...trail] as [string, string][];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`${s.crumbs} type-small`}>
        <ol>{items.map(([l, h], i) => <li key={h}>{i < items.length - 1 ? <Link href={h}>{l}</Link> : <span aria-current="page">{l}</span>}</li>)}</ol>
      </nav>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, h], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `https://${brand.domain}${h}` })) }} />
    </>
  );
}

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className={s.pageHeader}>
      <Badge>{eyebrow}</Badge>
      <h1 className="type-h1">{title}</h1>
      <p className="type-body-lg">{lead}</p>
      {children}
    </header>
  );
}

// Shows only after Dr. Miller has actually reviewed the page (date from brand/page-status.json).
export function ReviewByline({ reviewedOn, author }: { reviewedOn?: string | null; author?: string }) {
  return (
    <p className={`${s.byline} type-small`}>
      {author ? <>Written by {author}. </> : null}
      {reviewedOn ? <>Medically reviewed by <Link href={`/doctors/${medicalReviewer.slug}`}>{medicalReviewer.name}, {medicalReviewer.credential}</Link>, Medical Director · Last reviewed {reviewedOn}</> : null}
    </p>
  );
}

export function Faq({ items, title = 'Common questions' }: { items: [string, string][]; title?: string }) {
  return (
    <section className={s.section} aria-labelledby="faq">
      <h2 id="faq" className="type-h2">{title}</h2>
      <div className={s.stack}>{items.map(([q, a]) => <FaqItem key={q} question={q}>{a}</FaqItem>)}</div>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
    </section>
  );
}

export function Sources({ items, checked }: { items: [string, string][]; checked: string }) {
  return (
    <section className={s.section} aria-labelledby="sources">
      <h2 id="sources" className="type-h3">Sources</h2>
      <ul className={`${s.sources} type-small`}>{items.map(([l, h]) => <li key={h}><a href={h} rel="noopener noreferrer" target="_blank">{l}</a></li>)}</ul>
      <p className="type-small">Checked {checked}.</p>
    </section>
  );
}

export function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section className={s.section} aria-labelledby={id}>
      <h2 id={id} className="type-h2">{title}</h2>
      <div className={`${s.prose} type-body`}>{children}</div>
    </section>
  );
}
