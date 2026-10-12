import type { Metadata } from 'next';
import Link from 'next/link';
import { ImportantInfo } from '@/components/ImportantInfo';
import { FaqItem } from '@/components/FaqItem';
import { Breadcrumbs, JsonLd, PageHeader, Sources } from '@/components/PageParts';
import { brand, pricing } from '@/brand/site';
import { registry } from '@/brand/registry';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: 'Ohio Medical Marijuana Card FAQ',
  description: 'Answers about getting, paying for and renewing an Ohio medical marijuana card, telehealth visits, the state registry and your privacy.',
  alternates: { canonical: '/faq' },
};

const groups: [string, [string, string][]][] = [
  ['Getting a card', [
    ['Who can get an Ohio medical marijuana card?', 'Ohio residents 18 or older with one of the 21 qualifying conditions in Ohio law. Your physician decides whether you qualify.'],
    ['Can I get my card online?', 'Yes. Ohio law allows the physician’s exam by telehealth, and the registration is completed online.'],
    ['Do I need medical records?', 'They help and your physician may ask for them. If another doctor diagnosed you, your physician can confirm it from your records.'],
    ['Can I get a card at 18?', 'Yes. Patients under 18 need a parent’s consent and a registered caregiver; we see adults only.'],
  ]],
  ['Cost and refunds', [
    ['How much does it cost?', `$${pricing.newEvaluation} for a new evaluation and $${pricing.renewalEvaluation} to renew. Ohio’s current registration rule sets no state fee.`],
    ['What if I don’t qualify?', 'We refund your evaluation fee in full, with no deductions and no no-show fee.'],
    ['Do you take insurance?', 'No. You pay the evaluation fee directly.'],
  ]],
  ['Your visit and doctors', [
    ['Who will I see?', 'An Ohio-licensed physician with a Certificate to Recommend from the State Medical Board of Ohio. Their names and license numbers are on our doctors page.'],
    ['What happens in the visit?', 'Your physician reviews your history and medicines, examines you, checks Ohio’s prescription monitoring report, and explains the risks and benefits.'],
    ['When is my recommendation submitted?', 'If you qualify, your physician submits it to the Ohio registry right after your visit.'],
  ]],
  ['The registry and renewal', [
    ['How do I activate my registration?', 'The registry emails you an activation link after your physician submits your registration. Click it, check your details and accept the legal statement.'],
    ['Where do I log in?', `At the official registry sign-in, ${registry.loginUrl.replace('https://', '')}. We can’t see or manage your registry account.`],
    ['How long does my card last?', 'One year. You can renew up to 30 days before it expires, after a new recommendation from your physician.'],
  ]],
  ['Privacy', [
    ['Is my registration public?', 'No. Ohio law makes registry information that identifies patients confidential, and it is not a public record.'],
    ['Should I email you medical details?', `Please don’t. Email ${brand.email} for questions about booking or billing, and share medical details with your physician in your visit.`],
  ]],
];

export default function FaqPage() {
  const all = groups.flatMap(([, items]) => items);
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['FAQ', '/faq']]} />
      <PageHeader eyebrow="FAQ" title="Ohio medical marijuana card questions" lead={<>Short answers, with Ohio’s sources at the bottom. Can’t find yours? Email {brand.email}.</>} />
      {groups.map(([title, items]) => (
        <section key={title} className={s.section} aria-label={title}>
          <h2 className="type-h2">{title}</h2>
          <div className={s.stack}>{items.map(([q, a]) => <FaqItem key={q} question={q}>{a}</FaqItem>)}</div>
        </section>
      ))}
      <p><Link href="/guides/ohio-medical-marijuana-registry">Read the full Ohio registry guide</Link></p>
      <Sources checked="13 Oct 2026" items={[
        ['Ohio Revised Code 4731.30', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
        ['Ohio Revised Code 3796.01', 'https://codes.ohio.gov/ohio-revised-code/section-3796.01'],
        ['Ohio Revised Code 3796.08', 'https://codes.ohio.gov/ohio-revised-code/section-3796.08'],
        ['Ohio Administrative Code 1301:18-10-01', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
        ['Division of Cannabis Control: Patient & Caregiver Registry', registry.registryPage],
      ]} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: all.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
    </main>
  );
}
