import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { ImportantInfo } from '@/components/ImportantInfo';
import { FaqItem } from '@/components/FaqItem';
import { DoctorCard } from '@/components/DoctorCard';
import { PriceCard } from '@/components/PriceCard';
import tokens from '@/brand/tokens.json';

export const metadata = { title: 'Design system — Marijuana Card OH', robots: { index: false, follow: false } };

const doctors = [
  { name: 'Dr. Johnathan Miller, MD', role: 'General Practice · Medical Director', license: '35.141126CTR', npi: '1235623372' },
  { name: 'Dr. Kevin J. Kargman, DO', role: 'Pediatrics', license: '34.015746CTR', npi: '1407810302' },
];

export default function DesignSystem() {
  return (
    <>
      <main className="container" style={{ display: 'grid', gap: 'var(--space-3xl)', paddingBlock: 'var(--space-3xl)' }}>
        <section style={{ display: 'grid', gap: 'var(--space-lg)' }}>
          <Badge>Design system</Badge>
          <h1 className="type-display">Marijuana Card OH</h1>
          <p className="type-body-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: '40rem' }}>
            Calm Leaf direction. Tokens come from brand/tokens.json and match the Figma variables one to one.
          </p>
        </section>
        <section style={{ display: 'grid', gap: 'var(--space-lg)' }}>
          <h2 className="type-h2">Colour</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--space-md)' }}>
            {Object.entries(tokens.primitives).map(([k, hex]) => (
              <div key={k} style={{ display: 'grid', gap: 4 }}>
                <div style={{ height: 64, borderRadius: 'var(--radius-sm)', background: hex, border: '1px solid var(--color-border-default)' }} />
                <span className="type-small"><strong>{k}</strong> {hex}</span>
              </div>
            ))}
          </div>
        </section>
        <section style={{ display: 'grid', gap: 'var(--space-md)' }}>
          <h2 className="type-h2">Type</h2>
          {Object.keys(tokens.type).map((k) => <p key={k} className={`type-${k}`}>{k} — Real Ohio doctors. Clear answers.</p>)}
        </section>
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <Button href="#">Check if you qualify</Button>
          <Button href="#" variant="accent">See our doctors</Button>
          <Button href="#" variant="secondary">How it works</Button>
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
          <PriceCard type="new" />
          <PriceCard type="renewal" />
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-xl)' }}>
          {doctors.map((d) => <DoctorCard key={d.npi} doctor={d} />)}
        </section>
        <section style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: '48rem' }}>
          <FaqItem question="Does Ohio charge a state registration fee?" open>
            No. Ohio’s current registration rule sets no state fee. You pay only our evaluation fee: $149 for a new card or $129 to renew.
          </FaqItem>
          <FaqItem question="Can I get my evaluation by telehealth?">
            Yes. Ohio law allows the exam in person or by telehealth.
          </FaqItem>
        </section>
        <ImportantInfo />
      </main>
    </>
  );
}
