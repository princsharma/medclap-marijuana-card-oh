import type { Metadata } from "next";
import Link from "next/link";
import { CrisisNote } from "@/components/help/Answer";
import { KbBand } from "@/components/help/KbBand";
import s from "@/components/help/help.module.css";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { articles, articlesIn, helpPaths, kbCategories } from "@/content/help";
import { breadcrumbLd, ldScript } from "@/lib/helpJsonLd";
import { BASE } from "@/lib/schema";

const title = "Knowledge Base: Help Center | Marijuana Card OH";
const description =
  "Browse answers about services, providers, appointments, fees, privacy and service limitations. Search the Help Center or ask Instant AI Help.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: helpPaths.kb },
  openGraph: { title, description, url: helpPaths.kb },
};

export default function KnowledgeBasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript([
          breadcrumbLd([
            { label: "Help Center", href: helpPaths.ai },
            { label: "Knowledge Base", href: helpPaths.kb },
          ]),
          { "@type": "CollectionPage", "@id": `${BASE}${helpPaths.kb}#webpage`, url: `${BASE}${helpPaths.kb}`, name: "Knowledge Base", description,
            isPartOf: { "@id": `${BASE}/#website` }, publisher: { "@id": `${BASE}/#organization` },
            hasPart: kbCategories.map((k) => ({ "@type": "CollectionPage", name: k.title, url: `${BASE}${helpPaths.category(k.id)}` })) },
        ])}
      />
      <KbBand>
        <h1 className={s.kbHeading}>Knowledge Base</h1>
        <p className="small muted">
          {articles.length} articles across {kbCategories.length} topics
        </p>
      </KbBand>

      <div className={`container ${s.body}`}>
        <div className={s.kbGrid}>
          {kbCategories.map((c) => {
            const list = articlesIn(c.id);
            return (
              <section key={c.id} className={s.catCard} aria-labelledby={`cat-${c.id}`}>
                <div>
                  <div className={s.catHead}>
                    <span className={s.catIcon}>
                      <Icon name={c.icon} />
                    </span>
                    <h2 id={`cat-${c.id}`}>
                      <Link href={helpPaths.category(c.id)}>{c.title}</Link>
                    </h2>
                  </div>
                  <ul className={s.catLinks}>
                    {list.slice(0, 3).map((a) => (
                      <li key={a.slug}>
                        <Link href={helpPaths.article(a.slug)}>{a.question}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={helpPaths.category(c.id)} className={s.showAll}>
                  Show all ({list.length})<span className="visually-hidden"> {c.title} articles</span>
                </Link>
              </section>
            );
          })}
          <section className={s.findCard} aria-labelledby="cant-find">
            <h2 id="cant-find">Can’t find what you need?</h2>
            <p className="body">Ask Instant AI Help or contact our team about booking, fees or using the platform.</p>
            <div className={s.btnStack}>
              <Button href={helpPaths.ai} arrow>
                Ask Instant AI Help
              </Button>
              <Button href={helpPaths.contact} variant="secondary">
                Contact Us
              </Button>
            </div>
          </section>
        </div>
        <div className={s.gapTop} style={{ maxWidth: 720 }}>
          <CrisisNote />
        </div>
      </div>
    </>
  );
}
