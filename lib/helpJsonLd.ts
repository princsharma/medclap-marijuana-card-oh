import { siteUrl } from "@/lib/site";

export const breadcrumbLd = (items: { label: string; href: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ label: "Home", href: "/" }, ...items].map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.label, item: `${siteUrl}${b.href}` })),
});

export const ldScript = (graph: object[]) => ({ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) });
