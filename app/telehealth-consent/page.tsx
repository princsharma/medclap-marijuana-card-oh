import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDoc, Tbc, type LegalSection } from '@/components/LegalDoc';
import { Sources } from '@/components/PageParts';
import { brand, pricing } from '@/brand/site';
import { legal } from '@/brand/legal';

const PATH = '/telehealth-consent';
export const metadata: Metadata = {
  title: 'Telehealth Consent',
  description: 'What you agree to before an Ohio medical marijuana evaluation by video: how the visit works, its benefits, risks and alternatives, and your rights.',
  alternates: { canonical: PATH },
};

const sections: LegalSection[] = [
  { id: 'what', title: 'What telehealth means here', body: <>
    <p>Your evaluation is a live video visit, using <Tbc v={legal.videoPlatform} label="video platform" />, with a physician who holds an Ohio license and a Certificate to Recommend from the State Medical Board of Ohio. Ohio requires a telehealth visit to meet the same standard of care as an in-person visit.</p>
  </> },
  { id: 'visit', title: 'What happens in your visit', body: <ol>
    <li>Your physician tells you their name and the type of Ohio license they hold.</li>
    <li>They confirm who you are, with photo ID, and that you are physically in Ohio.</li>
    <li>They review your medical history, records and current medicines, and check the Ohio Automated Rx Reporting System (OARRS) report covering at least the last 12 months.</li>
    <li>They examine you, and explain the risks and benefits of medical marijuana for your condition and history.</li>
    <li>They decide whether you have a qualifying condition. If you do and you agree, they submit your recommendation and registration to the Ohio patient registry.</li>
  </ol> },
  { id: 'benefits', title: 'Benefits', body: <ul>
    <li>No travel or waiting room: you can have your visit from home anywhere in Ohio.</li>
    <li>Access to Ohio physicians with a Certificate to Recommend, wherever you live in the state.</li>
  </ul> },
  { id: 'risks', title: 'Risks and limits', body: <ul>
    <li>A video visit has limits. Your physician may ask for records, a follow-up visit or an in-person examination before deciding.</li>
    <li>Poor connection, audio or video can delay or interrupt the visit. If that happens, your physician will try to reconnect or reschedule.</li>
    <li>We use secure systems, but no electronic system is completely free from privacy or security risks.</li>
    <li>Your physician may find you don’t qualify. If so, you get a full refund.</li>
  </ul> },
  { id: 'alternatives', title: 'Alternatives', body: <p>You can see any Ohio physician with a Certificate to Recommend in person instead, or choose not to be evaluated. Choosing not to use telehealth won’t affect your ability to get care elsewhere.</p> },
  { id: 'rights', title: 'Your rights', body: <ul>
    <li>You can refuse or withdraw your consent to telehealth at any time, including during the visit.</li>
    <li>You can ask questions before and during your visit.</li>
    <li>Please take the visit somewhere private. We don’t record visits, and we ask that you don’t either, without your physician’s permission.</li>
    <li>You can get a copy of your visit record. See the <Link href="/notice-of-privacy-practices">Notice of Privacy Practices</Link> for your rights to your medical information.</li>
  </ul> },
  { id: 'emergencies', title: 'Emergencies', body: <p>Telehealth visits are not for emergencies. If you have a medical emergency, call 911 or go to the nearest emergency department. If you are in crisis or thinking about harming yourself, call or text 988. If an emergency happens during your visit, your physician may call emergency services for you.</p> },
  { id: 'fees', title: 'Fees', body: <p>By consenting, you agree to be billed ${pricing.newEvaluation} for a new evaluation or ${pricing.renewalEvaluation} for a renewal. There is no facility or origination fee. If your physician finds you don’t qualify, we refund your fee in full. See our <Link href="/refund-policy">refund policy</Link>.</p> },
  { id: 'mmj', title: 'About medical marijuana', body: <ul>
    <li>A recommendation is not a prescription. Your physician decides whether to recommend, based on Ohio law and your health.</li>
    <li>Registry information that identifies you is confidential under Ohio law.</li>
    <li>Medical marijuana is legal in Ohio under state law but remains controlled under federal law. Never drive while impaired.</li>
  </ul> },
  { id: 'consent', title: 'Your consent', body: <>
    <p>You give this consent when you tick the box at booking, and you confirm it with your physician at the start of your visit, who records it in your medical record. By giving it, you confirm that:</p>
    <ul>
      <li>you are 18 or older and will be physically in Ohio during your visit;</li>
      <li>you have read this page and had the chance to ask questions;</li>
      <li>you consent to an evaluation by telehealth, to your physician checking your OARRS report, and, if you qualify, to your physician submitting your recommendation and registration to the Ohio registry;</li>
      <li>you agree to be billed the fee shown when you book.</li>
    </ul>
    <p>Questions before your visit? Email {brand.email}.</p>
  </> },
];

export default function TelehealthConsent() {
  return <LegalDoc path={PATH} eyebrow="Telehealth consent" title="Consent to telehealth" sections={sections}
    lead="Ohio requires your physician to explain the benefits, risks and alternatives of a telehealth visit and get your consent before your evaluation. Here is what you are agreeing to."
    after={<Sources checked={legal.checked} items={[
      ['Ohio Administrative Code 4731-37-01: telehealth', 'https://codes.ohio.gov/ohio-administrative-code/rule-4731-37-01'],
      ['Ohio Revised Code 4743.09: telehealth services', 'https://codes.ohio.gov/ohio-revised-code/section-4743.09'],
      ['Ohio Administrative Code 4731-32-03: medical marijuana standard of care', 'https://codes.ohio.gov/ohio-administrative-code/rule-4731-32-03'],
    ]} />} />;
}
