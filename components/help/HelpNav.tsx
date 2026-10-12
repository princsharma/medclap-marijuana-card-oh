"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { helpPaths } from "@/content/help";
import s from "./help.module.css";

const tabs = [
  { label: "Instant AI Help", href: helpPaths.ai, match: (p: string) => p === helpPaths.ai },
  { label: "Knowledge Base", href: helpPaths.kb, match: (p: string) => p.startsWith(helpPaths.kb) || p.startsWith("/help/articles") },
];
const contact = { label: "Contact Us", href: helpPaths.contact, match: (p: string) => p.startsWith(helpPaths.contact) };

export function HelpNav() {
  const path = usePathname() ?? "";
  const item = (t: typeof contact) => (
    <li key={t.href}>
      <Link href={t.href} className={s.tab} aria-current={t.match(path) ? "page" : undefined}>
        {t.label}
      </Link>
    </li>
  );
  return (
    <nav className={s.helpNav} aria-label="Help Center">
      <div className={`container ${s.helpNavInner}`}>
        <p className={s.helpBrand}>
          <Link href={helpPaths.ai}>Help Center</Link>
        </p>
        <ul className={s.tabs}>
          {tabs.map(item)}
          <li className={s.tabSpacer} aria-hidden="true" />
          {item(contact)}
        </ul>
      </div>
    </nav>
  );
}
