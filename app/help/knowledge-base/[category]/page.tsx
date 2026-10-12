import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrisisNote } from "@/components/help/Answer";
import { KbBand } from "@/components/help/KbBand";
import s from "@/components/help/help.module.css";
import { Breadcrumb } from "@/components/sections/ServiceSections";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { articlesIn, getCategory, helpPaths, kbCategories } from "@/content/help";
import { breadcrumbLd, ldScript } from "@/lib/helpJsonLd";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => kbCategories.map((c) => ({ category: c.id }));

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  const title = `${c.title} — Help Center | Marijuana Card OH`;
  const description = `${c.description} Browse every ${c.title.toLowerCase()} article in Marijuana Card OH Help Center.`;
  return { title: { absolute: title }, description, alternates: { canonical: helpPaths.category(c.id) }, openGraph: { title, description, url: helpPaths.category(c.id) } };
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const list = articlesIn(c.id);
  const crumbs = [
    { label: "Help Center", href: helpPaths.ai },
    { label: "Knowledge Base", href: helpPaths.kb },
    { label: c.title, href: helpPaths.category(c.id) },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript([
          breadcrumbLd(crumbs),
          {
            "@type": "CollectionPage",
            name: c.title,
            url: `${siteUrl}${helpPaths.category(c.id)}`,
            hasPart: list.map((a) => ({ "@type": "Article", headline: a.question, url: `${siteUrl}${helpPaths.article(a.slug)}` })),
          },
        ])}
      />
      <KbBand slim>
        <p className={s.kbHeadingSmall}>Knowledge Base</p>
      </KbBand>
      <div className={`container ${s.body}`}>
        <div className={s.article}>
          <Breadcrumb items={crumbs} />
          <div className={s.catHead} style={{ marginBottom: 0 }}>
            <span className={s.catIcon}>
              <Icon name={c.icon} />
            </span>
            <h1 className={s.articleTitle} style={{ marginTop: 0 }}>
              {c.title}
            </h1>
          </div>
          <p className="lead">{c.description}</p>
          <ul className={s.catList}>
            {list.map((a) => (
              <li key={a.slug}>
                <Link href={helpPaths.article(a.slug)}>
                  {a.question}
                  <Icon name="chevron-right" size={18} />
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <p className={s.shareLabel}>Other topics</p>
            <ul className={s.otherCats}>
              {kbCategories
                .filter((x) => x.id !== c.id)
                .map((x) => (
                  <li key={x.id}>
                    <Link href={helpPaths.category(x.id)}>{x.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className={s.stillHelp}>
            <div>
              <p className={s.panelTitle}>Still need help?</p>
              <p className="small muted">Ask Instant AI Help or contact our team.</p>
            </div>
            <div className={s.stillBtns}>
              <Button href={helpPaths.ai} arrow>
                Ask Instant AI Help
              </Button>
              <Button href={helpPaths.contact} variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
          <CrisisNote />
        </div>
      </div>
    </>
  );
}
