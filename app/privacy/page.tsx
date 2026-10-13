import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDoc, Tbc, type LegalSection } from '@/components/LegalDoc';
import { brand } from '@/brand/site';
import { legal } from '@/brand/legal';

const PATH = '/privacy';
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${brand.name} collects, uses and protects your information when you use our website and book an Ohio medical marijuana card evaluation.`,
  alternates: { canonical: PATH },
};

const contact = <><Tbc v={legal.privacyContactEmail} label="privacy email" /> or {brand.email}</>;

const sections: LegalSection[] = [
  { id: 'who', title: 'Who we are and what this policy covers', body: <>
    <p>{brand.name} ({brand.domain}) is operated by <Tbc v={legal.company} label="company legal name" />. We help Ohio adults book a telehealth evaluation with independent, Ohio-licensed physicians who hold a Certificate to Recommend medical marijuana.</p>
    <p>This policy covers our website and the non-medical information we handle, such as your contact details, booking and payment. Health information you give your physician for your visit is protected health information. How it is used and shared is described in the <Link href="/notice-of-privacy-practices">Notice of Privacy Practices</Link>, which takes priority over this policy for that information.</p>
  </> },
  { id: 'collect', title: 'Information we collect', body: <>
    <ul>
      <li><strong>Details you give us:</strong> your name, email, phone number, date of birth and address when you book, and anything you write to us.</li>
      <li><strong>Health information for your visit:</strong> your medical history, records, medicines and qualifying condition. This goes to your physician and is covered by the Notice of Privacy Practices.</li>
      <li><strong>Payment details:</strong> handled by our payment processor, <Tbc v={legal.paymentProcessor} label="payment processor" />. We don’t store full card numbers.</li>
      <li><strong>Email sign-ups:</strong> if you ask for our free checklist or a link to finish the sign-up form later, your email address and your consent, so we can send it and occasional updates. We don’t record which page you were reading. Unsubscribe anytime with the link in any email.</li>
      <li><strong>Help Center questions and contact forms:</strong> the questions you type into Instant AI Help and the messages you send through our contact forms. Please don’t include health details in them.</li>
      <li><strong>Technical information:</strong> your browser, device and IP address, collected by our hosting provider ({legal.hosting}) to deliver and secure the website.</li>
    </ul>
    <p>Some tools on our website work only in your browser and send nothing to us: the eligibility check, and the location you share with the dispensary locator to sort results by distance.</p>
  </> },
  { id: 'use', title: 'How we use your information', body: <ul>
    <li>To book your visit, connect you with your physician and run the telehealth visit.</li>
    <li>To take payment and process refunds under our <Link href="/refund-policy">refund policy</Link>.</li>
    <li>To send you messages about your booking, your registration and renewal reminders.</li>
    <li>To answer your questions and give support.</li>
    <li>To keep the website secure, prevent fraud and meet our legal obligations.</li>
    <li>To understand, in aggregate, how the website is used so we can improve it.</li>
  </ul> },
  { id: 'share', title: 'How we share your information', body: <>
    <ul>
      <li><strong>With your physician and their medical practice,</strong> <Tbc v={legal.practice} label="medical practice name" />, so they can evaluate you.</li>
      <li><strong>With the State of Ohio:</strong> if you qualify, your physician submits your recommendation and registration to the Ohio Medical Marijuana Control Program’s patient registry, as Ohio law requires.</li>
      <li><strong>With service providers</strong> who work for us under contract and only for the purposes above: booking (<Tbc v={legal.bookingTool} label="booking tool" />), video visits (<Tbc v={legal.videoPlatform} label="video platform" />), payments (<Tbc v={legal.paymentProcessor} label="payment processor" />), email (<Tbc v={legal.emailProvider} label="email provider" />) and website hosting ({legal.hosting}). Providers that handle health information sign a business associate agreement.</li>
      <li><strong>When the law requires it,</strong> or to protect someone’s safety, our rights or the rights of others.</li>
      <li><strong>If our business changes hands,</strong> with the new owner, who must protect your information as this policy describes.</li>
    </ul>
    <p>We don’t sell your personal information, and we don’t use or share your health information for advertising.</p>
  </> },
  { id: 'cookies', title: 'Cookies, analytics and tracking', body: <>
    <p>Our website currently sets no advertising or analytics cookies. If we add an analytics tool (<Tbc v={legal.analytics} label="analytics tool, if any" />), we will update this policy first, and we will not place advertising pixels or third-party tracking on pages where you book, pay or share health information.</p>
    <p>Your browser lets you block or delete cookies. Blocking essential cookies may stop booking from working.</p>
  </> },
  { id: 'rights', title: 'Your choices and rights', body: <>
    <ul>
      <li>Ask what personal information we hold about you, and ask us to correct it.</li>
      <li>Ask us to delete it. We will, unless we must keep it by law. Ohio requires physicians to keep medical records for at least three years after your last visit.</li>
      <li>Stop marketing emails at any time with the unsubscribe link. We will still send messages about your booking.</li>
      <li>For your medical records, use the rights in the <Link href="/notice-of-privacy-practices">Notice of Privacy Practices</Link>.</li>
    </ul>
    <p>To make a request, email {contact}. We will confirm your identity before acting on it.</p>
  </> },
  { id: 'security', title: 'How we protect and keep your information', body: <>
    <p>We use encryption in transit, access controls and contracts with our providers to protect your information. No system is completely secure, so if a breach affects your information we will tell you as the law requires.</p>
    <p>We keep personal information only as long as we need it for the purposes above or as the law requires, then delete or de-identify it.</p>
  </> },
  { id: 'eligibility', title: 'Adults in Ohio only', body: <p>Our service is for adults aged 18 or older in Ohio. We don’t knowingly collect information from anyone under 18. If you think we have, contact us and we will delete it.</p> },
  { id: 'changes', title: 'Changes to this policy', body: <p>We will post any change on this page with a new date. If a change materially affects how we use information we already hold, we will tell you before it takes effect.</p> },
  { id: 'contact', title: 'Contact us', body: <p>Questions about privacy: {contact}. Mail: <Tbc v={legal.company} label="company legal name" />, <Tbc v={legal.companyAddress} label="mailing address" />.</p> },
];

export default function Privacy() {
  return <LegalDoc path={PATH} eyebrow="Privacy policy" title="Privacy policy" sections={sections}
    lead={<>What we collect when you use {brand.name}, why, who we share it with, and the choices you have. In short: we use your information to run your visit, we don’t sell it, and we don’t use your health information for advertising.</>} />;
}
