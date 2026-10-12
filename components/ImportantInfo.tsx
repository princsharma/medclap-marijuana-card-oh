import s from './ui.module.css';

// Approved wording (Compliance Scope, 13 Oct 2026). Change only after legal review.
export function ImportantInfo() {
  return (
    <aside className={s.info} aria-labelledby="important-info">
      <h2 id="important-info" className="type-h3">Important information</h2>
      <p className="type-small">
        Marijuana Card OH connects Ohio adults with Ohio-licensed physicians who hold a Certificate to Recommend from the
        State Medical Board of Ohio. Whether you qualify is the physician’s medical decision. This page is general
        information, not medical advice. Medical marijuana is legal in Ohio under state law but remains federally controlled.
      </p>
    </aside>
  );
}
