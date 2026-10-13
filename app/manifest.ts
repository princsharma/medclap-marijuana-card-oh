import type { MetadataRoute } from 'next';
import { brand } from '@/brand/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: 'Card OH',
    description: 'Ohio medical marijuana card evaluations by telehealth with Ohio-licensed physicians.',
    start_url: '/',
    display: 'standalone',
    background_color: '#E9F2EC',
    theme_color: '#0E3B39',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
