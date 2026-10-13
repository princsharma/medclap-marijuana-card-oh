import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDoc, Tbc, type LegalSection } from '@/components/LegalDoc';
import { brand } from '@/brand/site';
import { legal } from '@/brand/legal';
import l from '@/components/legal.module.css';

const PATH = '/notice-of-privacy-practices';
export const metadata: Metadata = {
  title: 'Notice of Privacy Practices',
  description: 'How your medical information may be used and disclosed, and how you can get access to it, when you see a physician through Marijuana Card OH.',
  alternates: { canonical: PATH },
};

const officer = <><Tbc v={legal.privacyContactEmail} label="privacy officer email" />, <Tbc v={legal.privacyContactPhone} label="privacy officer phone" />, <Tbc v={legal.practiceAddress} label="practice mailing address" /></>;

const sections: LegalSection[] = [
  { id: 'rights', title: 'Your rights', body: <>
    <p>When it comes to your health information, you have the right to:</p>
    <ul>
      <li><strong>Get a copy of your medical record,</strong> on paper or electronically. Ask us and we will give you a copy or a summary, usually within 30 days. We may charge a reasonable, cost-based fee.</li>
      <li><strong>Ask us to correct your record</strong> if you think it is wrong or incomplete. We may say no, but we will tell you why in writing within 60 days.</li>
      <li><strong>Ask for confidential communications,</strong> such as contacting you at a different email or phone number. We will say yes to all reasonable requests.</li>
      <li><strong>Ask us to limit what we use or share.</strong> We are not required to agree, except in one case: because you pay for your visit in full yourself, you can ask us not to share that information with your health insurer, and we will say yes unless a law requires us to share it.</li>
      <li><strong>Get a list of those we have shared your information with</strong> for the six years before your request, with some exceptions such as treatment, payment and operations. One list a year is free.</li>
      <li><strong>Get a paper copy of this notice</strong> at any time, even if you agreed to get it electronically.</li>
      <li><strong>Choose someone to act for you,</strong> such as a legal guardian or someone with your medical power of attorney.</li>
      <li><strong>File a complaint</strong> if you feel your rights have been violated, with us at the contact below, or with the U.S. Department of Health and Human Services Office for Civil Rights, 200 Independence Avenue SW, Washington, D.C. 20201, 1-877-696-6775, or online at <a href="https://www.hhs.gov/ocr/complaints/" target="_blank" rel="noopener noreferrer">hhs.gov/ocr/complaints</a>. We will not retaliate against you for filing a complaint.</li>
    </ul>
  </> },
  { id: 'choices', title: 'Your choices', body: <>
    <p>You can tell us whether to share information with family, close friends or others involved in your care. If you can’t tell us, for example if you are unconscious, we may share it if we believe it is in your best interest, or to lessen a serious and imminent threat to health or safety.</p>
    <p>We never use or share your information for marketing, and never sell it, unless you give us written permission.</p>
  </> },
  { id: 'uses', title: 'How we use and share your information', body: <>
    <ul>
      <li><strong>To treat you.</strong> Your physician reviews your history, records and medicines, checks the Ohio Automated Rx Reporting System (OARRS), as Ohio rules require before a recommendation, and may share information with other professionals treating you.</li>
      <li><strong>To submit your registration to the State of Ohio.</strong> If you qualify, your physician submits your recommendation and registration to the Ohio Medical Marijuana Control Program’s patient registry. Ohio law requires this, and registry information that identifies you is confidential under Ohio law.</li>
      <li><strong>To bill you.</strong> We use your information to take payment for your visit and to process refunds.</li>
      <li><strong>To run our practice.</strong> For example, to schedule visits, train staff, improve quality and meet our legal duties. Service providers who help us do this sign a business associate agreement and must protect your information.</li>
    </ul>
    <p>We are also allowed or required to share your information in other ways, usually for the public good, and only when the law’s conditions are met:</p>
    <ul>
      <li>For public health and safety, such as reporting suspected abuse, neglect or domestic violence, or preventing a serious threat to someone’s health or safety.</li>
      <li>For health oversight, including audits and inspections by the State Medical Board of Ohio and the Division of Cannabis Control.</li>
      <li>When state or federal law requires it, including to the Department of Health and Human Services to show we comply with federal privacy law.</li>
      <li>In response to a court or administrative order or subpoena, and to law enforcement as the law allows.</li>
      <li>For workers’ compensation, research that meets privacy safeguards, coroners and medical examiners, and specialized government functions.</li>
    </ul>
    <p>Any other use or sharing needs your written permission, and you can withdraw it in writing at any time.</p>
  </> },
  { id: 'duties', title: 'Our responsibilities', body: <ul>
    <li>We are required by law to keep the privacy and security of your protected health information.</li>
    <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
    <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
    <li>We will not use or share your information other than as described here unless you tell us we can in writing.</li>
  </ul> },
  { id: 'changes', title: 'Changes to this notice', body: <p>We can change the terms of this notice, and the changes will apply to all information we have about you. The new notice will be on this page, and we will give you a copy on request.</p> },
  { id: 'contact', title: 'Contact our privacy officer', body: <>
    <p>This notice is given by <Tbc v={legal.practice} label="medical practice legal name" />, the medical practice through which our physicians see you. {brand.name}, operated by <Tbc v={legal.company} label="company legal name" />, handles booking and support for the practice as its business associate.</p>
    <p>Privacy officer: {officer}.</p>
    <p>For how we handle non-medical information on our website, see our <Link href="/privacy">privacy policy</Link>.</p>
  </> },
];

export default function Npp() {
  return <LegalDoc path={PATH} eyebrow="Notice of privacy practices" title="Notice of privacy practices" sections={sections}
    lead="Your rights to your medical information, and how your physician’s practice may use and share it."
    preface={<p className={l.caps} style={{ maxWidth: '48rem' }}>This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.</p>} />;
}
