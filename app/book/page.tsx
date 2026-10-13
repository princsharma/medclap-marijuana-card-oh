import { redirect } from 'next/navigation';

// Old booking links go to the onboarding survey, keeping the visit type.
export default async function Book({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  redirect(type === 'renewal' ? '/get-started?type=renewal' : '/get-started');
}
