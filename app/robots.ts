import type { MetadataRoute } from 'next';
import { absoluteSiteUrl, SITE_URL } from './lib/seo';

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteSiteUrl('/sitemap.xml');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    ...(sitemap ? { sitemap } : {}),
    ...(SITE_URL ? { host: new URL(SITE_URL).origin } : {}),
  };
}
