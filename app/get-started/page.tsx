import type { Metadata } from 'next';
import { Survey } from '@/components/onboarding/Survey';
import { pricing } from '@/brand/site';

export const metadata: Metadata = {
  title: { absolute: 'Get Started: Ohio Medical Marijuana Card | Marijuana Card OH' },
  description: `Answer a few quick questions to start your Ohio medical marijuana card evaluation by video. $${pricing.newEvaluation}, full refund if you don’t qualify.`,
  alternates: { canonical: '/get-started' },
};

export default function GetStarted() {
  return <main className="container"><Survey /></main>;
}
