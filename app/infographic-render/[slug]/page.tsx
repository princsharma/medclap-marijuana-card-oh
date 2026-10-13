import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Infographic } from '@/components/infographics/Infographic';
import { getInfographic, infographics } from '@/content/infographics';

// Bare 1200px artboard used only to export the infographic PNGs (scripts/export-infographics.mjs).
export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamicParams = false;
export function generateStaticParams() { return infographics.map((i) => ({ slug: i.slug })); }

export default async function Render({ params }: { params: Promise<{ slug: string }> }) {
  const ig = getInfographic((await params).slug);
  if (!ig) notFound();
  return <main id="artboard" style={{ width: 1200, margin: 0 }}><Infographic ig={ig} artboard headingLevel={1} /></main>;
}
