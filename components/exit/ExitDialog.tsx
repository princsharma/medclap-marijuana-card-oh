'use client';
import { useEffect, useRef } from 'react';
import s from './exit.module.css';

/** Modal shell: focus moves in and is trapped, Esc / backdrop / × close, focus returns, page scroll locks. */
export function ExitDialog({ open, onClose, labelledBy, describedBy, children }:
  { open: boolean; onClose: () => void; labelledBy: string; describedBy?: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () => [...(box.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
    // Focus the dialog itself (announced by screen readers, no stray focus ring); success screens pass data-autofocus.
    (box.current?.querySelector<HTMLElement>('[data-autofocus]') ?? box.current)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={s.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} tabIndex={-1} className={s.dialog} role="dialog" aria-modal="true" aria-labelledby={labelledBy} aria-describedby={describedBy}>
        <button type="button" className={s.close} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
}
