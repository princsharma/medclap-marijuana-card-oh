import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader, Section } from '@/components/PageParts';
import { brand, pricing } from '@/brand/site';
import s from '@/components/page.module.css';

export const metadata: Metadata = { title: 'Refund Policy', description: '100% money-back guarantee if you don’t qualify for an Ohio medical marijuana recommendation.', alternates: { canonical: '/refund-policy' } };

export default function Refund() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Refund policy', '/refund-policy']]} />
      <PageHeader eyebrow="Refund policy" title="100% money-back guarantee if you don’t qualify" lead="If your physician finds that you don’t qualify for a medical marijuana recommendation, we refund your evaluation fee in full." />
      <Section title="The guarantee" id="guarantee">
        <ul>
          <li>Full refund of the evaluation fee (${pricing.newEvaluation} new, ${pricing.renewalEvaluation} renewal) if the physician finds you don’t qualify.</li>
          <li>No deductions and no no-show fee.</li>
        </ul>
      </Section>
      <Section title="How to ask for a refund" id="how">
        <p>If you don’t qualify, we start your refund for you. If you have any question about a refund, email {brand.email} with your name and the email you booked with.</p>
      </Section>
      <Section title="What the guarantee covers" id="scope">
        <p>The guarantee covers our evaluation fee. Ohio currently charges no state registration fee. Purchases at dispensaries are not part of our service.</p>
      </Section>
      <p className="type-small" style={{ color: 'var(--color-text-secondary)' }}>Last updated 13 October 2026.</p>
    </main>
  );
}
