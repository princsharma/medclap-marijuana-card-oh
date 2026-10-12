import { HelpNav } from "@/components/help/HelpNav";

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HelpNav />
      {children}
    </>
  );
}
