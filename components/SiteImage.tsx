import Image from 'next/image';
import type { SiteImage } from '@/brand/images';
import s from './page.module.css';

/** Illustration with fixed aspect, rounded frame and descriptive alt text. */
export function Illustration({ image, priority = false, sizes = '(min-width: 900px) 40vw, 100vw', className = '' }:
  { image: SiteImage; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`${s.illo} ${className}`}>
      <Image src={image.src} alt={image.alt} width={image.w} height={image.h} sizes={sizes} priority={priority} />
    </div>
  );
}
