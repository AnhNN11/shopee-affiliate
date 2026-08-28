import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from './lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: 'vi',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f7f5f3',
    theme_color: '#ee4d2d',
    icons: [
      {
        src: '/chon-chuan-mark-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/chon-chuan-mark-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/chon-chuan-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
