import type { Metadata } from "next";
import { AiHelp } from "@/components/help/AiHelp";
import { CrisisNote } from "@/components/help/Answer";
import s from "@/components/help/help.module.css";
import { aiHelp as c, helpPaths } from "@/content/help";

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: c.seo.description,
  alternates: { canonical: helpPaths.ai },
  openGraph: { title: c.seo.title, description: c.seo.description, url: helpPaths.ai },
};

export default function HelpCenterPage() {
  return (
    <>
      <section className={`${s.band} ${s.aiHero}`} aria-labelledby="ai-title">
        <div className="container">
          <h1 id="ai-title" className={s.title}>
            {c.title}
          </h1>
          <p className={`lead ${s.lead}`}>{c.lead}</p>
        </div>
      </section>
      <div className={`container ${s.body}`}>
        <AiHelp placeholder={c.placeholder} disclaimer={c.disclaimer} suggestions={c.suggestions} />
        <div className={`${s.narrow} ${s.gapTop}`}>
          <CrisisNote />
        </div>
      </div>
    </>
  );
}
