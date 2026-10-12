import { KbSearch } from "@/components/help/KbSearch";
import { articles, getCategory, helpPaths } from "@/content/help";
import s from "./help.module.css";

const items = articles.map((a) => ({
  slug: a.slug,
  question: a.question,
  text: a.text,
  href: helpPaths.article(a.slug),
  category: getCategory(a.category)?.title ?? "",
}));

/** Knowledge Base title + search. `slim` is the article-page variant. */
export function KbBand({ slim = false, children }: { slim?: boolean; children?: React.ReactNode }) {
  return (
    <section className={slim ? s.kbBandSlim : s.band} aria-label="Search the Knowledge Base">
      <div className={`container ${s.kbBandInner}`}>
        <div>{children}</div>
        <KbSearch items={items} />
      </div>
    </section>
  );
}
