import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, Faq, PageHeader, Section, Sources } from '@/components/PageParts';
import { conditions } from '@/brand/conditions';
import { ArticleBottom, ArticleTop } from '@/components/ArticleExtras';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Qualifying Conditions for a Medical Card in Ohio' },
  description: 'The 21 conditions that qualify for an Ohio medical marijuana card, as listed in Ohio law, and how your physician confirms a diagnosis.',
  alternates: { canonical: '/conditions' },
};

const faq: [string, string][] = [
  ['Does anxiety qualify for a medical card in Ohio?', 'Anxiety is not on Ohio’s list of qualifying conditions. Post-traumatic stress disorder (PTSD) is. Your physician decides whether you have a qualifying diagnosis.'],
  ['Does insomnia or depression qualify?', 'Neither is on Ohio’s list. If you also have a listed condition, such as chronic and severe pain, your physician can evaluate you for that.'],
  ['What counts as chronic pain?', 'Ohio law lists “pain that is either chronic and severe, or intractable.” Your physician assesses your pain, your history and the treatments you’ve tried.'],
  ['Can Ohio add new conditions?', 'Yes. The State Medical Board of Ohio can add conditions. We check the list at every content review.'],
];

export default function Conditions() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Qualifying conditions', '/conditions']]} />
      <PageHeader eyebrow="Qualifying conditions" title="Qualifying conditions for a medical card in Ohio"
        lead="Ohio law lists 21 qualifying conditions. To get a card you need a diagnosis of at least one, which your physician makes or confirms during your visit.">
        <Button href="/eligibility">Check if you qualify</Button>
      </PageHeader>
      <ArticleTop path="/conditions" title="Qualifying conditions for a medical card in Ohio" updated="2026-10-13" readMinutes={2} />

      <section className={`${s.section} ${s.wide}`} aria-labelledby="list">
        <h2 id="list" className="type-h2">The 21 conditions</h2>
        <ul className={s.grid3} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {conditions.map((c) => (
            <li key={c.slug} className={s.panel}><Link href={`/conditions/${c.slug}`} className="type-body" style={{ fontWeight: 700 }}>{c.name}</Link></li>
          ))}
        </ul>
        <p className="type-small" style={{ color: 'var(--color-text-secondary)' }}>Worded as in Ohio Revised Code 3796.01, current version effective 20 March 2026.</p>
      </section>

      <Section title="How your physician confirms a condition" id="confirm">
        <p>Your physician reviews your medical history, examines you and decides whether you have a qualifying diagnosis. If another doctor already diagnosed you, your physician can confirm it from your records. <Link href="/how-it-works">What happens in your visit</Link>.</p>
      </Section>

      <Faq items={faq} />
      <Sources checked="13 Oct 2026" items={[
        ['Ohio Revised Code 3796.01: qualifying medical conditions', 'https://codes.ohio.gov/ohio-revised-code/section-3796.01'],
        ['Ohio Administrative Code 4731-32-03: confirming a prior diagnosis', 'https://codes.ohio.gov/ohio-administrative-code/rule-4731-32-03'],
      ]} />
      <ArticleBottom path="/conditions" related={[['How to get a medical marijuana card in Ohio', '/how-it-works'], ['Medical records for your visit', '/guides/medical-records'], ['Check if you qualify', '/eligibility'], ['Ohio medical marijuana card FAQ', '/faq']]} />
      <ImportantInfo />
    </main>
  );
}
