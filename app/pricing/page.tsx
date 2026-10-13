import type { Metadata } from 'next';
import { IMG } from '@/brand/images';
import Link from 'next/link';
import { PriceCard } from '@/components/PriceCard';
import { ImportantInfo } from '@/components/ImportantInfo';
import { ArticleBottom, ArticleTop } from '@/components/ArticleExtras';
import { Breadcrumbs, Faq, JsonLd, PageHeader, Section, Sources } from '@/components/PageParts';
import { brand, pricing } from '@/brand/site';
import s from '@/components/page.module.css';
import { ORG, BASE, abs } from '@/lib/schema';
import { Reviews } from '@/components/reviews/Reviews';

export const metadata: Metadata = {
  title: 'Ohio Medical Marijuana Card Cost',
  description: `What an Ohio medical marijuana card costs: $${pricing.newEvaluation} for a new evaluation, $${pricing.renewalEvaluation} to renew, $0 state fee, and a full refund if you don’t qualify.`,
  alternates: { canonical: '/pricing' },
};

const faq: [string, string][] = [
  ['How much is a medical marijuana card in Ohio?', `With us, $${pricing.newEvaluation} for a new evaluation. Ohio’s current registration rule sets no state fee, so that is the total cost of getting registered. [How it works](/how-it-works)`],
  ['How much does it cost to renew?', `$${pricing.renewalEvaluation} for a renewal evaluation. There is no state renewal fee under the current rule. [How renewal works](/renewals)`],
  ['Is there a free Ohio medical card?', 'The state registration itself is free. The physician evaluation is not: a licensed physician has to examine you, review your history and check Ohio’s prescription database before recommending. [What happens in your visit](/how-it-works#visit)'],
  ['What if I don’t qualify?', 'We refund your evaluation fee in full, with no deductions and no no-show fee. [Refund policy](/refund-policy)'],
  ['Does insurance cover it?', 'We don’t bill insurance. You pay the evaluation fee directly.'],
  ['Is a medical card cheaper than buying adult-use?', 'Medical marijuana isn’t subject to Ohio’s 10% adult-use tax. Whether that saves you money depends on how much you buy. [Medical card vs adult-use](/guides/medical-card-vs-adult-use)'],
];

export default function Pricing() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Pricing', '/pricing']]} />
      <PageHeader image={IMG.pricing}
        eyebrow="Pricing"
        title="What an Ohio medical marijuana card costs"
        lead={<>${pricing.newEvaluation} for a new card evaluation and ${pricing.renewalEvaluation} to renew. Ohio currently charges no state registration fee, so there is nothing else to pay to get registered. If you don’t qualify, we <Link href="/refund-policy">refund you in full</Link>.</>}
      />
      <ArticleTop path="/pricing" title="What an Ohio medical marijuana card costs" updated="2026-10-13" readMinutes={2} />

      <section className={s.grid2} aria-label="Prices"><PriceCard type="new" /><PriceCard type="renewal" /></section>

      <Section title="What’s included" id="included">
        <ul>
          <li>A telehealth visit with an Ohio-licensed physician who holds a Certificate to Recommend. <Link href="/doctors">Meet our doctors</Link>.</li>
          <li>A review of your medical history, medicines and Ohio prescription monitoring report. <Link href="/how-it-works#visit">What happens in your visit</Link>.</li>
          <li>Your recommendation submitted to the <Link href="/guides/ohio-medical-marijuana-registry">Ohio registry</Link> right after your visit, if you qualify.</li>
          <li>Reminders before your registration expires, so you can <Link href="/renewals">renew</Link> in time.</li>
        </ul>
        <p>What you buy at a dispensary is separate and paid to the dispensary. If you’re 21 or older, see how a card compares with <Link href="/guides/medical-card-vs-adult-use">buying adult-use</Link>.</p>
      </Section>

      <Section title="Who qualifies" id="who">
        <p>
          Ohio residents aged 18 or older with one of Ohio’s <Link href="/conditions">21 qualifying conditions</Link>. Not sure?
          Take our <Link href="/eligibility">three-question check</Link>. Having your <Link href="/guides/medical-records">medical records</Link> ready helps.
        </p>
      </Section>

      <Section title="Why the evaluation isn’t free" id="why">
        <p>
          Ohio’s registration is free, but the law only lets a physician with a Certificate to Recommend sign you up, and only after a real exam.
          Your fee pays for that physician’s time, the checks Ohio requires, and a refund if they find you don’t qualify.
        </p>
      </Section>

      <Section title="Refunds" id="refunds">
        <p>{pricing.guaranteeTerms} <Link href="/refund-policy">Read the refund policy</Link>.</p>
      </Section>

      <Reviews />
      <Faq items={faq} />

      <Sources checked="13 Oct 2026" items={[
        ['Ohio Administrative Code 1301:18-10-01: patient registration (no fee set)', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
        ['Division of Cannabis Control: Obtain medical marijuana', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/obtain-medical-marijuana'],
        ['Ohio Revised Code 4731.30: who may recommend', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
        ['Ohio Revised Code 3796.40: adult-use excise tax', 'https://codes.ohio.gov/ohio-revised-code/section-3796.40'],
      ]} />

      <ArticleBottom path="/pricing" related={[['How to get a medical marijuana card in Ohio', '/how-it-works'], ['Renew your Ohio medical marijuana card', '/renewals'], ['Medical card or adult-use? What’s different in Ohio', '/guides/medical-card-vs-adult-use'], ['Refund policy', '/refund-policy']]} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', '@id': `${BASE}/#service`, name: 'Ohio medical marijuana card evaluation', serviceType: 'Telehealth medical evaluation', provider: ORG, areaServed: { '@type': 'State', name: 'Ohio' },
        description: `Telehealth evaluation with an Ohio-licensed physician for a medical marijuana recommendation. ${pricing.guaranteeTerms}`,
        offers: [
          { '@type': 'Offer', name: 'New patient evaluation', price: pricing.newEvaluation, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: abs('/get-started'), areaServed: { '@type': 'State', name: 'Ohio' } },
          { '@type': 'Offer', name: 'Renewal evaluation', price: pricing.renewalEvaluation, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: abs('/get-started'), areaServed: { '@type': 'State', name: 'Ohio' } }] }} />
    </main>
  );
}
