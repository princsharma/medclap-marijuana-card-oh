import type { NextConfig } from 'next';

// Illustrations are generated in Higgsfield and served from its CDN; Next optimises
// and caches them under /_next/image on our own domain.
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.LOCAL_IMG_CHECK === '1',
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net', pathname: '/user_37xuX69L5la49WcVV6KjtPSFDAb/**' },
      { protocol: 'https', hostname: 'd2ol7oe51mr4n9.cloudfront.net', pathname: '/user_37xuX69L5la49WcVV6KjtPSFDAb/**' },
    ],
  },
};
export default nextConfig;
