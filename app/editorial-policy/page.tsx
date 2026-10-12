import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader, Section } from '@/components/PageParts';
import { author, brand } from '@/brand/site';
import s from '@/components/page.module.css';

export const metadata: Metadata = { title: 'Editorial and Medical Review Policy', description: 'How Marijuana Card OH researches, writes, medically reviews and updates its content.', alternates: { canonical: '/editorial-policy' } };

export default function Editorial() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Editorial policy', '/editorial-policy']]} />
      <PageHeader eyebrow="Editorial policy" title="How we write and review our content" lead="Every fact on this site comes from a primary source, carries the date we checked it, and is reviewed again when Ohio’s rules change." />
      <Section title="Where our facts come from" id="sources">
        <ul>
          <li>Ohio law and rules: the Ohio Revised Code and Ohio Administrative Code.</li>
          <li>Ohio agencies: the Division of Cannabis Control and the State Medical Board of Ohio.</li>
          <li>Federal health agencies and peer-reviewed research for anything about health and evidence.</li>
        </ul>
        <p>We don’t use other card services, dispensary blogs or unsourced articles as sources. Every page lists its sources and the date we checked them.</p>
      </Section>
      <Section title="Who writes and who reviews" id="review">
        <p>Guides are written by {author.name}, {author.credentials}. Medical pages are reviewed by our Medical Director, Dr. Johnathan Miller, MD. A page shows “Medically reviewed” only after he has reviewed it, with the date he did.</p>
        <p>We describe medical evidence with its limits, and we never say medical marijuana cures a condition.</p>
      </Section>
      <Section title="Keeping pages current" id="updates">
        <p>We re-check medical and legal pages at least every 6 to 12 months, and straight away when Ohio law changes.</p>
      </Section>
      <Section title="Corrections" id="corrections">
        <p>If you spot something wrong, email {brand.email}. We check every report and correct confirmed errors.</p>
      </Section>
    </main>
  );
}
