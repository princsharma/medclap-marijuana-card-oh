'use client';
import { useState } from 'react';
import { track } from '@/lib/exitIntent';
import s from './exit.module.css';

/**
 * Email capture used by both popups. Sends only the email, the consent flag and which offer it was
 * (never the page URL: a sign-up from a condition page would be health information about that person).
 */
export function LeadForm({ source, cta, consentText, onDone, initialEmail = '' }:
  { source: 'guide' | 'survey-exit'; cta: string; consentText: React.ReactNode; onDone: (forwarded: boolean) => void; initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setError('Enter a valid email address.'); return; }
    if (!consent) { setError('Please tick the box so we can email you.'); return; }
    setSending(true);
    try {
      const r = await fetch('/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: email.trim(), consent: true, source }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || 'failed');
      track('exit_popup_submit', { variant: source });
      onDone(!!j.forwarded);
    } catch { setError('Something went wrong. Please try again.'); } finally { setSending(false); }
  };
  return (
    <form className={s.form} onSubmit={submit} noValidate data-clarity-mask="True">
      <label className={s.label} htmlFor={`lead-${source}`}>Email address</label>
      <div className={s.row}>
        <input id={`lead-${source}`} className={s.input} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `lead-err-${source}` : undefined} />
        <button type="submit" className={s.primary} disabled={sending}>{sending ? 'Sending…' : cta}</button>
      </div>
      <label className={s.check}><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> <span>{consentText}</span></label>
      {error ? <p id={`lead-err-${source}`} className={s.error} role="alert">{error}</p> : null}
    </form>
  );
}
