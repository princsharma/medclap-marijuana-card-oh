'use client';
import { useCallback, useEffect, useState } from 'react';
import { useExitIntent, capStore, track } from '@/lib/exitIntent';
import { ExitDialog } from './ExitDialog';
import { LeadForm } from './LeadForm';
import { phone } from '@/brand/site';
import s from './exit.module.css';

const MOBILE = { mode: 'idle', idleSeconds: 45 } as const;
const KEY = 'mcoh_survey_exit_shown';

/**
 * Survey exit intent: answers the usual doubts instead of discounting the price.
 * Shown at most once per visit, never after the survey is submitted or on an exit screen.
 * Survey answers are not saved (health information); "finish later" just emails a link to start again.
 */
export function SurveyExitPopup({ active, step, email }: { active: boolean; step: string; email: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<null | boolean>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { capStore.sessionSet('mcoh_survey_started', '1'); }, []);

  const trigger = useCallback((reason: string) => {
    if (capStore.sessionGet(KEY)) return;
    capStore.sessionSet(KEY, '1');
    setOpen(true); track('exit_popup_shown', { variant: 'survey', trigger: reason, step_name: step });
  }, [step]);
  useExitIntent({ enabled: active && !open, onTrigger: trigger, armSeconds: 10, mobile: MOBILE });

  const close = useCallback(() => { setOpen(false); track('exit_popup_dismiss', { variant: 'survey', step_name: step }); }, [step]);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/get-started` : '/get-started';

  return (
    <ExitDialog open={open} onClose={close} labelledBy="sx-title" describedBy="sx-desc">
      {sent === null ? (
        <>
          <p className={s.kicker}>Before you go</p>
          <h2 id="sx-title" className={s.title}>You’re nearly there</h2>
          <p id="sx-desc" className={s.text}>Most people finish in about 2 minutes. If something’s holding you back, here’s what to know:</p>
          <ul className={s.points}>
            <li>Ohio-licensed physicians whose licenses you can look up</li>
            <li>100% money-back guarantee if you don’t qualify</li>
            <li>Ohio charges no state registration fee</li>
          </ul>
          <div className={s.actions}>
            <button type="button" className={s.primary} onClick={() => { setOpen(false); track('exit_popup_continue', { variant: 'survey', step_name: step }); }}>Continue my answers</button>
            {phone ? <a className={s.secondary} href={`tel:${phone.tel}`} onClick={() => track('onboarding_call_click', { step_name: step, from: 'exit_popup' })}>Call {phone.display}</a> : null}
          </div>
          <div className={s.later}>
            <p className={s.laterTitle}>Finish later?</p>
            <p className={s.small}>We’ll email you a link to come back. For your privacy we don’t save your answers, and starting again takes about 2 minutes.</p>
            <LeadForm source="survey-exit" cta="Email me a link" initialEmail={email} onDone={(f) => setSent(f)}
              consentText="Email me a link to finish, plus occasional Ohio medical card updates. Unsubscribe anytime." />
          </div>
        </>
      ) : sent ? (
        <>
          <p className={s.kicker}>Link sent</p>
          <h2 id="sx-title" className={s.title}>Check your inbox</h2>
          <p id="sx-desc" className={s.text}>We’ve emailed you a link to come back whenever you’re ready.</p>
          <button type="button" className={s.primary} onClick={() => setOpen(false)} data-autofocus>Or continue now</button>
        </>
      ) : (
        <>
          <p className={s.kicker}>Thanks</p>
          <h2 id="sx-title" className={s.title}>Save this link to come back</h2>
          <p id="sx-desc" className={s.text}>Bookmark this page or copy the link below.</p>
          <div className={s.actions}>
            <button type="button" className={s.primary} data-autofocus onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); } catch { /* select manually */ } }}>
              <span aria-live="polite">{copied ? 'Link copied' : 'Copy the link'}</span>
            </button>
            <button type="button" className={s.secondary} onClick={() => setOpen(false)}>Continue now</button>
          </div>
        </>
      )}
    </ExitDialog>
  );
}
