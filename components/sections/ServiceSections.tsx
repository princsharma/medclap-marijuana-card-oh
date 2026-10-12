import { Breadcrumbs } from '@/components/PageParts';

/** Shims so Help Center components ported from The Well-Grounded Spirit use this site's parts. */
type Crumb = { label: string; href: string };
export function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return <Breadcrumbs trail={items.filter((i) => i.href !== '/').map((i) => [i.label, i.href] as [string, string])} />;
}
export function Tel({ n }: { n: string }) {
  return <a href={`tel:${n}`}><strong>{n}</strong></a>;
}
