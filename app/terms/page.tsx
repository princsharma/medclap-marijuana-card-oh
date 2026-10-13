import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDoc, Tbc, type LegalSection } from '@/components/LegalDoc';
import { brand, pricing } from '@/brand/site';
import { legal } from '@/brand/legal';

const PATH = '/terms';
export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `The terms for using ${brand.name} and booking an Ohio medical marijuana card evaluation by telehealth, including fees, refunds and your responsibilities.`,
  alternates: { canonical: PATH },
};

const co = <Tbc v={legal.company} label="company legal name" />;

const sections: LegalSection[] = [
  { id: 'agreement', title: 'Agreeing to these terms', body: <p>These terms are an agreement between you and {co}, which operates {brand.name} ({brand.domain}). By using the website or booking a visit, you agree to them, to our <Link href="/privacy">privacy policy</Link> and, when you book, to the <Link href="/telehealth-consent">telehealth consent</Link>. If you don’t agree, please don’t use the service.</p> },
  { id: 'service', title: 'What we do, and what we don’t', body: <>
    <ul>
      <li>We help you book a telehealth evaluation with an independent physician who holds an Ohio license and a Certificate to Recommend from the State Medical Board of Ohio.</li>
      <li>Your physician decides, using their own medical judgment, whether you have a qualifying condition and whether to recommend medical marijuana. We can’t influence that decision and don’t guarantee any outcome.</li>
      <li>A recommendation is not a prescription, and we don’t sell, supply or deliver marijuana.</li>
      <li>We are a private service, not the State of Ohio, and we don’t control the state registry.</li>
      <li>We don’t offer caregiver registrations.</li>
    </ul>
  </> },
  { id: 'eligibility', title: 'Who can use the service', body: <>
    <p>To book a visit, you must:</p>
    <ul>
      <li>be 18 or older and an Ohio resident;</li>
      <li>be physically in Ohio during your visit, because your physician is licensed in Ohio;</li>
      <li>give true, complete information about yourself and your health, and show valid photo ID if asked.</li>
    </ul>
    <p>Your physician may decline to evaluate you, or end a visit, if information is false or if telehealth isn’t appropriate for you.</p>
  </> },
  { id: 'emergencies', title: 'Not for emergencies', body: <p>Our service is not for urgent or emergency care. If you have a medical emergency, call 911. If you are in crisis or thinking about harming yourself, call or text 988.</p> },
  { id: 'fees', title: 'Fees and refunds', body: <>
    <ul>
      <li>Fees are ${pricing.newEvaluation} for a new evaluation and ${pricing.renewalEvaluation} for a renewal evaluation, shown before you pay. We don’t charge facility, origination or equipment fees.</li>
      <li>If your physician finds you don’t qualify, we refund your evaluation fee in full, with no deductions and no no-show fee, as set out in our <Link href="/refund-policy">refund policy</Link>. Refunds go back to your original payment method usually within {legal.refundDays.usual}, and no later than {legal.refundDays.max} days.</li>
      <li>We don’t bill insurance. Ohio’s current rule sets no state registration fee.</li>
    </ul>
  </> },
  { id: 'use', title: 'Using the website', body: <>
    <p>Please don’t misuse the website. For example, don’t:</p>
    <ul>
      <li>book for someone else or pretend to be someone else;</li>
      <li>try to get a recommendation with false information;</li>
      <li>interfere with the website’s security, or copy it with automated tools;</li>
      <li>record a visit without your physician’s permission.</li>
    </ul>
  </> },
  { id: 'info', title: 'Information on our website', body: <>
    <p>Our articles, guides and Help Center are general information, written to Ohio sources and dated. They are not medical or legal advice and don’t replace a conversation with your physician or a lawyer.</p>
    <p>Medical marijuana is legal in Ohio under state law but remains controlled under federal law. Our dispensary locator lists every licensed Ohio dispensary from state data; we don’t recommend, rank or partner with any dispensary.</p>
  </> },
  { id: 'ip', title: 'Our content', body: <p>The website’s text, design, logo and code belong to {co} or its licensors. You may view and share pages for personal, non-commercial use. Please ask before reusing anything else.</p> },
  { id: 'links', title: 'Links to other websites', body: <p>We link to sources such as the Ohio registry and state agencies. We aren’t responsible for other websites or how they handle your information.</p> },
  { id: 'disclaimers', title: 'Disclaimers', body: <p>To the extent the law allows, the website is provided “as is” and we don’t promise it will always be available or error-free. Nothing in these terms limits the professional duties your physician owes you.</p> },
  { id: 'liability', title: 'Limits on our liability', body: <p>To the extent the law allows, {co} is not liable for indirect or consequential losses arising from your use of the website, and our total liability to you is limited to the fees you paid us in the 12 months before the claim. These limits don’t apply where the law doesn’t allow them.</p> },
  { id: 'law', title: 'Governing law', body: <p>Ohio law governs these terms. Any dispute will be heard in the state or federal courts located in {legal.venue.county}, {legal.venue.state}, unless the law requires otherwise. Before going to court, please email us so we can try to resolve it.</p> },
  { id: 'changes', title: 'Changes to these terms', body: <p>We may update these terms. We will post the new version on this page with a new date. Changes don’t affect a visit you have already booked.</p> },
  { id: 'contact', title: 'Contact us', body: <p>Email {brand.email}. Mail: {co}, <Tbc v={legal.companyAddress} label="mailing address" />.</p> },
];

export default function Terms() {
  return <LegalDoc path={PATH} eyebrow="Terms of use" title="Terms of use" sections={sections}
    lead={<>The rules for using {brand.name}. In short: your Ohio physician decides whether you qualify, you get a full refund if you don’t, and the service is for adults in Ohio, not for emergencies.</>} />;
}
