import s from './ui.module.css';
export function FaqItem({ question, children, open }: { question: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className={s.faq} open={open}>
      <summary>{question}</summary>
      <div className={`${s.answer} type-body`}>{children}</div>
    </details>
  );
}
