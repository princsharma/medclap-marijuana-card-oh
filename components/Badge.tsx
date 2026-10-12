import s from './ui.module.css';
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className={`${s.badge} type-label`}>{children}</span>;
}
