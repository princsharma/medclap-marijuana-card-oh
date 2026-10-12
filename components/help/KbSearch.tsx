"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { rank } from "@/lib/helpSearch";
import s from "./help.module.css";

type Item = { slug: string; question: string; text: string; href: string; category: string };

export function KbSearch({ items, placeholder = "Enter your question here" }: { items: Item[]; placeholder?: string }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const id = useId();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    const ranked = rank(q, items, 6).map((r) => r.item);
    // Plain substring matches catch partial words while typing.
    const sub = items.filter((i) => !ranked.includes(i) && `${i.question} ${i.text}`.toLowerCase().includes(term));
    return [...ranked, ...sub].slice(0, 6);
  }, [q, items]);

  const show = open && q.trim().length >= 2;

  return (
    <div className={s.kbSearch} role="search">
      <label htmlFor={`${id}-q`} className="visually-hidden">
        Search the Knowledge Base
      </label>
      <Icon name="search" className={s.kbSearchIcon} />
      <input
        id={`${id}-q`}
        type="search"
        className={s.kbSearchInput}
        placeholder={placeholder}
        value={q}
        autoComplete="off"
        role="combobox"
        aria-expanded={show}
        aria-controls={`${id}-list`}
        aria-activedescendant={active >= 0 ? `${id}-o${active}` : undefined}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, -1));
          } else if (e.key === "Enter") {
            const pick = results[active >= 0 ? active : 0];
            if (pick) {
              e.preventDefault();
              router.push(pick.href);
            }
          } else if (e.key === "Escape") setOpen(false);
        }}
      />
      {show ? (
        <ul id={`${id}-list`} role="listbox" className={s.kbResults}>
          {results.length ? (
            results.map((r, i) => (
              <li key={r.slug} id={`${id}-o${i}`} role="option" aria-selected={i === active}>
                <Link href={r.href} className={s.kbResult} data-active={i === active || undefined}>
                  <Icon name="book-open" size={16} />
                  <span>
                    <span className={s.kbResultQ}>{r.question}</span>
                    <span className={s.kbResultCat}>{r.category}</span>
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li role="option" aria-selected={false} className={s.kbNoResult}>
              No articles match “{q.trim()}”. <Link href={`/help?q=${encodeURIComponent(q.trim())}`}>Ask Instant AI Help</Link> or{" "}
              <Link href="/help/contact">contact us</Link>.
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
