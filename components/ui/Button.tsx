import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "text";

export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  block = false,
  srSuffix,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  /** Full width on small screens. */
  block?: boolean;
  /** Extra text for screen readers, e.g. " about Couples Therapy". */
  srSuffix?: string;
  className?: string;
}) {
  const cls = [styles.button, styles[variant], block ? styles.block : "", className ?? ""].join(" ").trim();
  return (
    <Link href={href} className={cls}>
      <span>
        {children}
        {srSuffix ? <span className="visually-hidden">{srSuffix}</span> : null}
      </span>
      {arrow ? <Icon name="arrow-right" className={styles.arrow} /> : null}
    </Link>
  );
}
