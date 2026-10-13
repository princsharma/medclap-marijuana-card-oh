import type { Metadata } from 'next';
import { IMG } from '@/brand/images';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, Faq, PageHeader, Section, Sources } from '@/components/PageParts';
import { pricing } from '@/brand/site';
import { ArticleBottom, ArticleTop } from '@/components/ArticleExtras';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'How to Get a Medical Marijuana Card in Ohio' },
  description: 'The steps to an Ohio medical marijuana card: who qualifies, what to bring, what happens in the telehealth visit, and how the state registry works.',
  alternates: { canonical: '/how-it-works' },
};

const faq: [string, string][] = [
  ['Can I get a medical card at 18 in Ohio?', 'Yes. Adults 18 and older can register as patients. Patients under 18 need a parent’s consent and a registered caregiver. We see adults only.'],
  ['Do I need medical records?', 'They help, and your physician may ask for them. Ohio lets a physician confirm a condition that another doctor diagnosed by reviewing your records. If you don’t have records, your physician can still examine you and decide.'],
  ['Do I have to live in Ohio?', 'Yes. Ohio’s registration rule requires patients to be Ohio residents, and you need a valid government photo ID.'],
  ['Can I get a card online in Ohio?', 'Yes. Ohio law allows the exam by telehealth. Your whole visit happens by video, and the registration is completed online.'],
  ['How long does a recommendation last?', 'Each written recommendation lasts up to 90 days and can be renewed. You need a visit with your physician at least once a year to keep your registration active.'],
];

export default function HowItWorks() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['How it works', '/how-it-works']]} />
      <PageHeader image={IMG.howItWorks}
        eyebrow="How it works"
        title="How to get a medical marijuana card in Ohio"
        lead={<>See an Ohio physician who holds a Certificate to Recommend, by telehealth or in person. If you have a qualifying condition, the physician submits your registration to the state and you activate it by email. With us, the visit is by video and costs ${pricing.newEvaluation}; Ohio charges no state fee.</>}
      >
        <Button href="/get-started">Check if you qualify</Button>
      </PageHeader>
      <ArticleTop path="/how-it-works" title="How to get a medical marijuana card in Ohio" updated="2026-10-13" readMinutes={3} />

      <Section title="Who can get a card" id="who">
        <ul>
          <li><strong>Age 18 or older.</strong> Registration records a government photo ID showing you’re at least 18.</li>
          <li><strong>An Ohio resident.</strong> You need an Ohio address and a valid photo ID.</li>
          <li><strong>A qualifying condition.</strong> One of the 21 conditions in Ohio law, such as chronic and severe pain, PTSD, fibromyalgia or cancer. <Link href="/conditions">See the full list</Link>.</li>
        </ul>
      </Section>

      <Section title="Step by step" id="steps">
        <ol>
          <li><strong>Book a visit.</strong> Choose a time from your physician’s open appointment slots.</li>
          <li><strong>Get ready.</strong> Have your photo ID, a list of your medicines, and any medical records about your condition.</li>
          <li><strong>See your physician by video.</strong> They review your medical history and medicines, examine you, and check at least 12 months of Ohio’s prescription monitoring report (OARRS). They explain the risks and benefits and ask for your consent.</li>
          <li><strong>Get your recommendation.</strong> If you qualify, your physician submits your recommendation to the Ohio registry right after your visit. If you don’t, we refund your fee in full.</li>
          <li><strong>Activate your registration.</strong> The state emails you an activation link. Click it, check your details and accept the legal statement.</li>
          <li><strong>Buy at a licensed dispensary.</strong> Bring your registry card and your photo ID.</li>
        </ol>
      </Section>

      <Section title="What happens in your visit" id="visit">
        <p>
          Ohio requires a real physician–patient relationship. That means an examination, a review of your medical history, and an expectation of ongoing care.
          Your physician also checks Ohio’s prescription monitoring report, looks for medicines that could interact, and asks whether standard treatments were tried or considered.
        </p>
        <p>Whether you qualify is your physician’s medical decision. We never promise a result before the visit.</p>
      </Section>

      <Section title="After your visit" id="after">
        <ul>
          <li>Your physician must submit your registration within 90 days of the recommendation. We do it right after your visit.</li>
          <li>Your registration lasts one year. The state sends a notice 45 days before it expires, and you can renew up to 30 days early. <Link href="/renewals">How renewal works</Link>.</li>
          <li>If your registration lapses, your card stops working. Ohio requires you to dispose of any medical marijuana within 7 days.</li>
        </ul>
      </Section>

      <Faq items={faq} />

      <Sources checked="13 Oct 2026" items={[
        ['Ohio Revised Code 4731.30: certificate to recommend and the physician–patient relationship', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
        ['Ohio Administrative Code 4731-32-03: physician standard of care', 'https://codes.ohio.gov/ohio-administrative-code/rule-4731-32-03'],
        ['Ohio Administrative Code 1301:18-10-01: procedure for patient registration', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
        ['Ohio Revised Code 3796.01: qualifying medical conditions', 'https://codes.ohio.gov/ohio-revised-code/section-3796.01'],
        ['Division of Cannabis Control: Obtain medical marijuana', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/obtain-medical-marijuana'],
      ]} />

      <ArticleBottom path="/how-it-works" related={[['Qualifying conditions for a medical card in Ohio', '/conditions'], ['Medical records for your visit', '/guides/medical-records'], ['The Ohio Medical Marijuana Registry, explained', '/guides/ohio-medical-marijuana-registry'], ['What an Ohio medical marijuana card costs', '/pricing']]} />
      <ImportantInfo />
    </main>
  );
}
