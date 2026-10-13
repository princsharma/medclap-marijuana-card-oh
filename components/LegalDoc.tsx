import type { ReactNode } from 'react';
import { Breadcrumbs, JsonLd, PageHeader } from '@/components/PageParts';
import { brand } from '@/brand/site';
import { legal } from '@/brand/legal';
import s from '@/components/page.module.css';
import l from './legal.module.css';

/** Shows a confirmed fact, or a highlighted marker until it is confirmed in brand/legal.ts. */
export function Tbc({ v, label }: { v: string | number | null | undefined; label: string }) {
  return v !== null && v !== undefined && v !== '' ? <>{v}</> : <mark className={l.tbc}>[{label}: to be confirmed]</mark>;
}

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalDoc({ path, eyebrow, title, lead, sections, preface, after }: { path: string; eyebrow: string; title: string; lead: ReactNode; sections: LegalSection[]; preface?: ReactNode; after?: ReactNode }) {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[[eyebrow, path]]} />
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      {legal.status === 'draft' ? (
        <aside className={l.draft} role="note">
          <strong>Draft for legal review.</strong> This page is not yet in effect. Highlighted items are still being confirmed.
        </aside>
      ) : null}
      <p className={l.dates}>Effective date: <Tbc v={legal.effectiveDate} label="effective date" /> · Last updated 14 October 2026</p>
      {preface}
      <nav className={l.toc} aria-labelledby={`${path.slice(1)}-toc`}>
        <h2 id={`${path.slice(1)}-toc`} className={l.tocTitle}>On this page</h2>
        <ol>{sections.map((x) => <li key={x.id}><a href={`#${x.id}`}>{x.title}</a></li>)}</ol>
      </nav>
      <div className={l.doc}>
        {sections.map((x, i) => (
          <section key={x.id} id={x.id} aria-labelledby={`${x.id}-h`} className={l.section}>
            <h2 id={`${x.id}-h`} className="type-h3">{i + 1}. {x.title}</h2>
            {x.body}
          </section>
        ))}
      </div>
      {after}
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: `https://${brand.domain}${path}` }} />
    </main>
  );
}
