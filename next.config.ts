import type { NextConfig } from 'next';

const CANONICAL_HOST = 'marijuanacardoh.com';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Illustrations are generated in Higgsfield and served from its CDN; Next optimises
  // and caches them under /_next/image on our own domain.
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.LOCAL_IMG_CHECK === '1',
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net', pathname: '/user_37xuX69L5la49WcVV6KjtPSFDAb/**' },
      { protocol: 'https', hostname: 'd2ol7oe51mr4n9.cloudfront.net', pathname: '/user_37xuX69L5la49WcVV6KjtPSFDAb/**' },
    ],
  },
  async redirects() {
    return [
      // Old booking path: permanent, query string (e.g. ?type=renewal) is kept.
      { source: '/book', destination: '/get-started', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Any host other than the live domain (staging, *.vercel.app) is never indexed.
      { source: '/:path*', missing: [{ type: 'host', value: CANONICAL_HOST }], headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      // Funnel and API responses stay out of search on every host.
      { source: '/get-started', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};
export default nextConfig;
