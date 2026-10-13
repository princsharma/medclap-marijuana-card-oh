'use client';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useExitIntent, capStore, track } from '@/lib/exitIntent';
import { ExitDialog } from './ExitDialog';
import { LeadForm } from './LeadForm';
import s from './exit.module.css';

export const GUIDE_PDF = '/guides/ohio-medical-card-checklist.pdf';
const SNOOZE_DAYS = 7;
const MOBILE = { mode: 'engaged', scrollPct: 0.5, dwellSeconds: 30 } as const;
// No popup where it would get in the way or be inappropriate.
const EXCLUDED = ['/get-started', '/privacy', '/terms', '/notice-of-privacy-practices', '/telehealth-consent', '/refund-policy', '/help/contact', '/infographic-render', '/design-system'];

/** Site-wide: offers the free checklist PDF to researchers who are about to leave. */
export function GuidePopup() {
  const path = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<null | boolean>(null);
  const excluded = EXCLUDED.some((p) => path === p || path.startsWith(`${p}/`));
  const snoozed = () => { const until = capStore.get('mcoh_guide_snooze'); return capStore.get('mcoh_guide_subscribed') !== null || (until !== null && Date.now() < until) || capStore.sessionGet('mcoh_survey_started') !== null; };

  const trigger = useCallback((reason: string) => {
    if (snoozed()) return;
    capStore.set('mcoh_guide_snooze', Date.now() + SNOOZE_DAYS * 864e5);
    setOpen(true); track('exit_popup_shown', { variant: 'guide', trigger: reason });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useExitIntent({ enabled: !excluded && !open, onTrigger: trigger, armSeconds: 10, mobile: MOBILE });

  const close = useCallback(() => { setOpen(false); if (sent === null) track('exit_popup_dismiss', { variant: 'guide' }); }, [sent]);

  return (
    <ExitDialog open={open} onClose={close} labelledBy="guide-title" describedBy="guide-desc">
      {sent === null ? (
        <>
          <p className={s.kicker}>Free download</p>
          <h2 id="guide-title" className={s.title}>The Ohio Medical Card Checklist</h2>
          <p id="guide-desc" className={s.text}>Five one-page guides in one PDF: the steps, the records to bring, the state registry, medical vs adult-use, and what a card means for your job, driving and housing.</p>
          <ul className={s.points}>
            <li>Checked against Ohio law, with sources</li>
            <li>Print it or keep it on your phone</li>
          </ul>
          <LeadForm source="guide" cta="Email me the checklist" onDone={(f) => { setSent(f); capStore.set('mcoh_guide_subscribed', Date.now()); }}
            consentText={<>Email me the checklist and occasional Ohio medical card updates. Unsubscribe anytime. <Link href="/privacy" target="_blank">Privacy policy</Link>.</>} />
          <button type="button" className={s.textBtn} onClick={close}>No thanks</button>
        </>
      ) : (
        <>
          <p className={s.kicker}>{sent ? 'Check your inbox' : 'Here it is'}</p>
          <h2 id="guide-title" className={s.title}>Your checklist is ready</h2>
          <p id="guide-desc" className={s.text}>{sent ? 'We’ve emailed it to you. You can also download it now.' : 'Download it now and keep it on your phone or print it.'}</p>
          <a className={s.primary} href={GUIDE_PDF} download onClick={() => track('guide_download', { from: 'exit_popup' })} data-autofocus>Download the checklist (PDF)</a>
          <Link className={s.textBtn} href="/get-started" onClick={() => setOpen(false)}>Ready now? Check if you qualify</Link>
        </>
      )}
    </ExitDialog>
  );
}
