'use client';
import { useEffect, useRef } from 'react';

/**
 * Exit-intent triggers.
 * - Mouse/trackpad (pointer: fine): the cursor leaves through the top of the window (toward tabs or the address bar).
 * - Touch (pointer: coarse): no exit signal exists on phones, so we never hijack the Back button. Instead:
 *   'engaged' = the visitor has read `scrollPct` of the page and stayed `dwellSeconds`; or
 *   'idle'    = no taps, scrolls or typing for `idleSeconds` (used in the survey).
 * Never fires in the first `armSeconds` (Google's intrusive-interstitial guidance: no popups on arrival).
 */
export type ExitIntentOptions = {
  enabled: boolean;
  onTrigger: (reason: 'mouse-exit' | 'engaged' | 'idle') => void;
  armSeconds?: number;
  mobile?: { mode: 'engaged'; scrollPct: number; dwellSeconds: number } | { mode: 'idle'; idleSeconds: number };
};

export function useExitIntent({ enabled, onTrigger, armSeconds = 8, mobile }: ExitIntentOptions) {
  const fired = useRef(false);
  const cb = useRef(onTrigger);
  cb.current = onTrigger;

  useEffect(() => {
    if (!enabled || fired.current || typeof window === 'undefined') return;
    const start = Date.now();
    const armed = () => Date.now() - start >= armSeconds * 1000;
    const fire = (reason: 'mouse-exit' | 'engaged' | 'idle') => { if (fired.current || !armed()) return; fired.current = true; cleanup(); cb.current(reason); };
    const fine = window.matchMedia?.('(pointer: fine)').matches ?? true;
    const offs: (() => void)[] = [];
    const on = <K extends keyof DocumentEventMap>(t: Document | Window, ev: K | string, fn: EventListener) => { t.addEventListener(ev, fn, { passive: true }); offs.push(() => t.removeEventListener(ev, fn)); };
    const cleanup = () => { offs.splice(0).forEach((f) => f()); };

    if (fine) {
      on(document, 'mouseout', ((e: MouseEvent) => { if (!e.relatedTarget && e.clientY <= 10) fire('mouse-exit'); }) as EventListener);
    } else if (mobile?.mode === 'engaged') {
      const check = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? window.scrollY / max : 1;
        if (pct >= mobile.scrollPct && Date.now() - start >= mobile.dwellSeconds * 1000) fire('engaged');
      };
      on(window, 'scroll', check as EventListener);
      const t = window.setInterval(check, 2000); offs.push(() => window.clearInterval(t));
    } else if (mobile?.mode === 'idle') {
      let last = Date.now();
      const bump = () => { last = Date.now(); };
      ['touchstart', 'keydown', 'scroll', 'input', 'pointerdown'].forEach((ev) => on(window, ev, bump));
      const t = window.setInterval(() => { if (document.visibilityState === 'visible' && Date.now() - last >= mobile.idleSeconds * 1000) fire('idle'); }, 1000);
      offs.push(() => window.clearInterval(t));
    }
    return cleanup;
  }, [enabled, armSeconds, mobile]);
}

/** Frequency caps in browser storage. Storage can be blocked (private mode): then the popup just never shows twice per page view. */
export const capStore = {
  get(key: string): number | null { try { const v = localStorage.getItem(key); return v ? Number(v) : null; } catch { return null; } },
  set(key: string, value: number) { try { localStorage.setItem(key, String(value)); } catch { /* ignore */ } },
  sessionGet(key: string) { try { return sessionStorage.getItem(key); } catch { return null; } },
  sessionSet(key: string, value: string) { try { sessionStorage.setItem(key, value); } catch { /* ignore */ } },
};

export const track = (event: string, data: Record<string, unknown> = {}) => {
  try { const w = window as unknown as { dataLayer?: Record<string, unknown>[] }; (w.dataLayer = w.dataLayer || []).push({ event, ...data }); } catch { /* no-op */ }
};
