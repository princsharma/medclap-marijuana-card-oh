import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { PriceCard } from '@/components/PriceCard';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, Faq, PageHeader, Section, Sources } from '@/components/PageParts';
import { pricing } from '@/brand/site';
import { registry } from '@/brand/registry';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: 'Ohio Medical Marijuana Card Renewal',
  description: `Renew your Ohio medical marijuana card: a new recommendation from an Ohio physician ($${pricing.renewalEvaluation}), then one click in the state registry. No state fee.`,
  alternates: { canonical: '/renewals' },
};

const faq: [string, string][] = [
  ['How much does it cost to renew an Ohio medical card?', `$${pricing.renewalEvaluation} for your renewal evaluation with us. Ohio’s current registration rule sets no state renewal fee.`],
  ['How early can I renew?', 'You can renew in the registry within 30 days before your registration expires. The state sends a reminder email about 45 days before.'],
  ['Can I renew online in Ohio?', 'Yes. The visit with your physician can be by telehealth, and the renewal itself is done in the online registry.'],
  ['My card already expired. What now?', 'Get a new recommendation first. Once your physician submits it, the Renew Card button appears in your registry account. Until then, your card can’t be used.'],
  ['Do I need to see the same doctor?', 'You can, and we recommend it, because your physician already knows your history. It isn’t required.'],
];

export default function Renewals() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Renewals', '/renewals']]} />
      <PageHeader eyebrow="Renewals" title="Renew your Ohio medical marijuana card"
        lead={<>Renewal is two steps: a new recommendation from your Ohio physician, then a click on Renew Card in the state registry. With us the visit is by video and costs ${pricing.renewalEvaluation}. Ohio charges no renewal fee.</>}>
        <Button href="/book?type=renewal">Book your renewal</Button>
      </PageHeader>

      <Section title="Step 1: get a new recommendation" id="step1">
        <p>Book a renewal visit. Your physician reviews how you’re doing, checks Ohio’s prescription monitoring report again, and, if you still qualify, submits a new recommendation right after the visit.</p>
      </Section>

      <Section title="Step 2: renew in the registry" id="step2">
        <ol>
          <li>Sign in to the <a href={registry.loginUrl} target="_blank" rel="noopener noreferrer">Ohio Medical Marijuana Registry</a> with the email and password you used when you activated your account.</li>
          <li>Click <strong>Renew Card</strong>. It appears once your new recommendation is in.</li>
          <li>Download your updated card from your profile.</li>
        </ol>
        <p>Forgot your password or can’t sign in? See <Link href="/guides/ohio-medical-marijuana-registry#help">registry help</Link>.</p>
      </Section>

      <Section title="When to renew" id="timing">
        <ul>
          <li>Your registration lasts one year and ends on the last day of the month it was issued.</li>
          <li>The state emails a reminder about 45 days before it expires.</li>
          <li>You can renew in the registry up to 30 days before it expires.</li>
          <li>If it lapses, your card stops working and Ohio requires you to dispose of any medical marijuana within 7 days.</li>
        </ul>
        <p>We email you a reminder too, so you can book your renewal visit in time.</p>
      </Section>

      <section className={s.grid2} aria-label="Renewal price"><PriceCard type="renewal" /></section>

      <Faq items={faq} />

      <Sources checked="13 Oct 2026" items={[
        ['Division of Cannabis Control — Renewing patient registration', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/patient-and-caregiver-registry/renewing-patient-registration'],
        ['Ohio Administrative Code 1301:18-10-01 — registration length and renewal', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
        ['Ohio Revised Code 4731.30 — recommendations and renewals', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
      ]} />
      <ImportantInfo />
    </main>
  );
}
