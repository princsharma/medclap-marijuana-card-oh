import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Rich } from '@/components/Rich';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, Faq, JsonLd, PageHeader, ReviewByline, Section, Sources } from '@/components/PageParts';
import { conditions } from '@/brand/conditions';
import { conditionPages, EVIDENCE_SOURCES, SAFETY } from '@/content/condition-pages';
import { brand, pricing } from '@/brand/site';
import s from '@/components/page.module.css';

const find = (slug: string) => {
  const c = conditions.find((x) => x.slug === slug); const p = conditionPages.find((x) => x.slug === slug);
  return c && p ? { ...c, ...p } : null;
};

export function generateStaticParams() { return conditionPages.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = find(slug); if (!c) return {};
  const n = c.metaShort ?? c.short;
  const t = `Medical Marijuana for ${n.charAt(0).toUpperCase()}${n.slice(1)} in Ohio`;
  return { title: { absolute: t.length <= 60 ? t : `${c.short.charAt(0).toUpperCase()}${c.short.slice(1)} and Ohio Medical Marijuana` },
    description: `Is ${c.short} a qualifying condition for an Ohio medical marijuana card? What the research says, what records help, and how to get evaluated.`,
    alternates: { canonical: `/conditions/${c.slug}` } };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = find(slug);
  if (!c) notFound();
  const faq: [string, string][] = [
    [`Does ${c.short} qualify for a medical card in Ohio?`, `Yes. Ohio law lists “${c.name}” as a qualifying condition. Your physician confirms the diagnosis during your visit and decides whether you qualify.`],
    ['What records should I bring?', `${c.records.join('; ')}. If you don’t have records, your physician can still examine you and may ask for them.`],
    ['What does it cost?', `$${pricing.newEvaluation} for a new evaluation, with a full refund if you don’t qualify. Ohio charges no state registration fee under the current rule.`],
  ];
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Qualifying conditions', '/conditions'], [c.name, `/conditions/${c.slug}`]]} />
      <PageHeader eyebrow="Qualifying condition" title={`Medical marijuana for ${c.short} in Ohio`}
        lead={<>“{c.name}” is one of Ohio’s 21 qualifying conditions for a medical marijuana card. An Ohio physician confirms your diagnosis and decides whether you qualify.</>}>
        <Button href="/eligibility">Check if you qualify</Button>
      </PageHeader>
      <ReviewByline />

      <Section title="What the research says" id="evidence">
        {c.evidence.map((e) => <p key={e}><Rich text={e} /></p>)}
      </Section>

      <Section title="What to have ready for your visit" id="records">
        <ul>{c.records.map((r) => <li key={r}>{r}</li>)}</ul>
        <p>If another doctor diagnosed you, your physician can confirm it from your records. <Link href="/guides/medical-records">How to get your records</Link>.</p>
      </Section>

      <Section title="Safety" id="safety">
        <ul>{SAFETY.map((x) => <li key={x}>{x}</li>)}</ul>
        <p>Your physician explains the risks and benefits for you before recommending, as Ohio requires.</p>
      </Section>

      {c.crisisNote ? (
        <aside className={s.callout}><p><strong>If you’re struggling right now:</strong> call or text 988 to reach the Suicide & Crisis Lifeline. In an emergency, call 911.</p></aside>
      ) : null}

      <Faq items={faq} />
      <Sources checked="13 Oct 2026" items={EVIDENCE_SOURCES} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: `Medical marijuana for ${c.short} in Ohio`, url: `https://${brand.domain}/conditions/${c.slug}`,
        about: { '@type': 'MedicalCondition', name: c.name }, audience: 'Patient' }} />
    </main>
  );
}
