import type { Metadata } from 'next';
import Link from 'next/link';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, Faq, JsonLd, PageHeader, ReviewByline, Section, Sources } from '@/components/PageParts';
import { brand } from '@/brand/site';
import { registry } from '@/brand/registry';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Ohio Medical Marijuana Registry: Login and Help' },
  description: 'What the Ohio Medical Marijuana Registry is, how to activate and sign in, how to renew, and who to contact when something goes wrong.',
  alternates: { canonical: '/guides/ohio-medical-marijuana-registry' },
};

const faq: [string, string][] = [
  ['Where do I log in to the Ohio medical marijuana registry?', `The official sign-in page is ${registry.loginUrl.replace('https://', '')}, linked from the Division of Cannabis Control’s website. Marijuana Card OH is not the registry and can’t see your registry account.`],
  ['Can I register myself?', 'No. Your recommending physician submits your registration. You then activate it by email and accept the legal statement.'],
  ['I never got the activation email. What should I do?', 'Check your spam folder and confirm the email address your physician has on file. If it still hasn’t arrived, contact the Division of Cannabis Control.'],
  ['How do I print my card?', 'Sign in to the registry and download your card from your profile. You can show it on your phone or print it.'],
  ['Is there a fee for the registry?', 'Ohio’s current patient registration rule sets no fee.'],
];

export default function RegistryGuide() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Ohio registry guide', '/guides/ohio-medical-marijuana-registry']]} />
      <PageHeader eyebrow="Guide" title="The Ohio Medical Marijuana Registry, explained"
        lead={<>The registry is the state’s record of registered patients, run by the Division of Cannabis Control. Your physician registers you; you activate your account by email, then sign in at the <a href={registry.loginUrl} target="_blank" rel="noopener noreferrer">official registry login</a> to download your card and renew it each year.</>} />
      <ReviewByline />

      <aside className={s.callout}>
        <p><strong>Looking for the login?</strong> Go to the <a href={registry.loginUrl} target="_blank" rel="noopener noreferrer">official Ohio Medical Marijuana Registry sign-in</a>. {brand.name} is a private telehealth service, not the state, and never asks for your registry password.</p>
      </aside>

      <Section title="What the registry does" id="what">
        <ul>
          <li>Records that you’re a registered patient and which physician recommended you.</li>
          <li>Issues your registry card, which you show with a photo ID at licensed dispensaries.</li>
          <li>Tracks when your registration expires and lets you renew.</li>
        </ul>
        <p>Registry information that identifies you is confidential under Ohio law and is not a public record.</p>
      </Section>

      <Section title="Activating your registration" id="activate">
        <ol>
          <li>After your visit, your physician submits your registration.</li>
          <li>Watch the email address you gave your physician for a message from the registry with an activation link.</li>
          <li>Click the link, review your details and accept the legal statement.</li>
          <li>Your card is then ready to download from your profile.</li>
        </ol>
      </Section>

      <Section title="Renewing each year" id="renew">
        <p>Your registration lasts one year. Get a new recommendation from your physician, then sign in and click <strong>Renew Card</strong>. You can renew up to 30 days before it expires. <Link href="/renewals">Full renewal guide</Link>.</p>
      </Section>

      <Section title="Registry help" id="help">
        <ul>
          <li><strong>Forgot your password:</strong> use the registry’s <a href={registry.passwordHelpUrl} target="_blank" rel="noopener noreferrer">login help article</a>.</li>
          <li><strong>Questions about your registration:</strong> email the Division of Cannabis Control at {registry.email} or call its toll-free helpline, {registry.helpline}.</li>
          <li><strong>Wrong details on your registration:</strong> contact your recommending physician, who submitted them.</li>
        </ul>
      </Section>

      <Faq items={faq} />

      <Sources checked="13 Oct 2026" items={[
        ['Division of Cannabis Control — Patient & Caregiver Registry', registry.registryPage],
        ['Division of Cannabis Control — Renewing patient registration', registry.renewalPage],
        ['Division of Cannabis Control — Obtain medical marijuana', registry.obtainPage],
        ['Ohio Revised Code 3796.08 — registration and confidentiality', 'https://codes.ohio.gov/ohio-revised-code/section-3796.08'],
        ['Ohio Administrative Code 1301:18-10-01 — procedure for patient registration', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
      ]} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'The Ohio Medical Marijuana Registry, explained', about: 'Ohio Medical Marijuana Control Program patient registry', audience: 'Patient' }} />
    </main>
  );
}
