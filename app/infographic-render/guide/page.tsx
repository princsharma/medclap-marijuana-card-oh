import type { Metadata } from 'next';
import { Infographic } from '@/components/infographics/Infographic';
import { infographics } from '@/content/infographics';
import { brand, pricing } from '@/brand/site';
import { siteUrl } from '@/lib/site';

// Print layout for the free "Ohio Medical Card Checklist" PDF (scripts/export-infographics.mjs).
export const metadata: Metadata = { robots: { index: false, follow: false } };

const page: React.CSSProperties = { width: 1200, height: 900, boxSizing: 'border-box', display: 'grid', alignContent: 'center', justifyItems: 'center', breakAfter: 'page', background: 'var(--teal-50)', overflow: 'hidden' };
const order = ['how-to-get-an-ohio-medical-marijuana-card', 'medical-records-checklist-ohio-card', 'ohio-registry-activation-and-renewal', 'ohio-medical-card-vs-adult-use', 'what-an-ohio-medical-card-means'];

export default function GuidePdf() {
  const igs = order.map((s) => infographics.find((i) => i.slug === s)!).filter(Boolean);
  return (
    <main id="pdf" style={{ margin: 0 }}>
      <section style={{ ...page, padding: 96, justifyItems: 'start', gap: 28, background: 'var(--teal-600)', color: '#fff' }}>
        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12, font: '800 22px/1 var(--font-display)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
          <svg width="40" height="40" viewBox="8 8 84 84" aria-hidden="true"><path d="M45 45 C20 44 11 27 13 10 C31 8 46 19 45 45 Z M45 55 C20 54 9 71 10 89 C29 91 45 79 45 55 Z M55 55 C54 80 71 91 89 90 C91 71 79 55 55 55 Z" fill="#E9F2EC" /><path d="M55 45 C54 20 71 9 89 10 C91 29 79 45 55 45 Z" fill="var(--sun-400)" /></svg>
          {brand.name}
        </p>
        <h1 style={{ margin: 0, font: '800 76px/1.05 var(--font-display)', maxWidth: 900 }}>The Ohio Medical Marijuana Card Checklist</h1>
        <p style={{ margin: 0, font: '400 28px/1.45 var(--font-body)', maxWidth: 820, color: 'var(--teal-100)' }}>The steps, the records to bring, the state registry, medical vs adult-use, and what a card means for your job, driving and housing. Five one-page guides, checked against Ohio law.</p>
        <ol style={{ margin: '12px 0 0', paddingLeft: 28, font: '600 24px/1.7 var(--font-body)' }}>
          {igs.map((i) => <li key={i.slug}>{i.title}</li>)}
        </ol>
        <p style={{ margin: '24px 0 0', font: '400 18px/1.5 var(--font-body)', color: 'var(--teal-100)' }}>Updated {igs[0].checked} · {brand.domain} · General information, not medical or legal advice.</p>
      </section>
      {igs.map((ig) => (
        <section key={ig.slug} style={page}><Infographic ig={ig} artboard /></section>
      ))}
      <section style={{ ...page, padding: 96, justifyItems: 'start', gap: 24, breakAfter: 'auto' }}>
        <p style={{ margin: 0, font: '800 20px/1 var(--font-display)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--teal-600)' }}>Next steps</p>
        <h2 style={{ margin: 0, font: '800 60px/1.1 var(--font-display)', color: 'var(--teal-800)', maxWidth: 900 }}>Ready to see if you qualify?</h2>
        <p style={{ margin: 0, font: '400 26px/1.5 var(--font-body)', color: 'var(--teal-500)', maxWidth: 860 }}>
          {brand.name} connects Ohio adults with Ohio-licensed physicians who hold a Certificate to Recommend, by video from home.
          It’s ${pricing.newEvaluation} for a new evaluation and ${pricing.renewalEvaluation} to renew, with a full refund if your physician finds you don’t qualify.
        </p>
        <ul style={{ margin: 0, paddingLeft: 28, font: '400 24px/1.8 var(--font-body)', color: 'var(--teal-800)' }}>
          <li>Start in about 2 minutes: <a href={`${siteUrl}/get-started`} style={{ color: 'var(--teal-600)', fontWeight: 700 }}>{brand.domain}/get-started</a></li>
          <li>Ohio’s 21 qualifying conditions: <a href={`${siteUrl}/conditions`} style={{ color: 'var(--teal-600)', fontWeight: 700 }}>{brand.domain}/conditions</a></li>
          <li>Questions: <a href={`mailto:${brand.email}`} style={{ color: 'var(--teal-600)', fontWeight: 700 }}>{brand.email}</a></li>
        </ul>
        <p style={{ margin: '24px 0 0', font: '400 18px/1.5 var(--font-body)', color: 'var(--teal-500)', maxWidth: 900 }}>Your physician decides whether you qualify; a recommendation is not a prescription. In crisis? Call or text 988. In an emergency, call 911.</p>
      </section>
    </main>
  );
}
