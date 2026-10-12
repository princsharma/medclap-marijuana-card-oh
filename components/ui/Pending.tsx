import { showPending } from "@/lib/site";
import styles from "./Pending.module.css";

/**
 * Stand-in for content that is not yet verified. Rendered on staging only —
 * production builds output nothing, so unverified copy can never ship.
 */
export function PendingNote({ children }: { children: React.ReactNode }) {
  if (!showPending) return null;
  return (
    <p className={styles.pending} role="note">
      {children}
    </p>
  );
}

/** Reviewer note describing what must be verified before launch. Staging only. */
export function LaunchGate({ title, children }: { title: string; children: React.ReactNode }) {
  if (!showPending) return null;
  return (
    <aside className={styles.gate} aria-label={`Launch gate: ${title}`}>
      <span className={styles.gateTitle}>Launch gate — {title}</span>
      <span>{children}</span>
    </aside>
  );
}
