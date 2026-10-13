import Image from 'next/image';
import s from './ui.module.css';

export type Doctor = { name: string; role: string; license: string; npi: string; photo?: string };

// Credentials must match the State Medical Board of Ohio record. Never add board certifications not on file.
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className={s.card}>
      {doctor.photo ? <Image className={s.photo} src={doctor.photo} alt={`Photo of ${doctor.name}`} width={96} height={96} sizes="96px" /> : <div className={s.photo} aria-hidden="true" />}
      <h3 className="type-h3">{doctor.name}</h3>
      <p className={`type-small ${s.muted}`}>{doctor.role}</p>
      <dl className={`${s.creds} type-small`}>
        <div><dt style={{ display: 'inline' }}>Ohio license / CTR: </dt><dd style={{ display: 'inline', margin: 0 }}>{doctor.license}</dd></div>
        <div><dt style={{ display: 'inline' }}>NPI: </dt><dd style={{ display: 'inline', margin: 0 }}>{doctor.npi}</dd></div>
      </dl>
      <a className={`${s.verify} type-small`} href="https://elicense.ohio.gov/oh_verifylicense" target="_blank" rel="noopener noreferrer">
        Verify on Ohio eLicense →
      </a>
    </article>
  );
}
