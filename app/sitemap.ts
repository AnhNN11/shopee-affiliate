import type { MetadataRoute } from 'next';
import { categories, coupons, deals } from './lib/catalog';
import { absoluteSiteUrl, SITE_URL } from './lib/seo';

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
};

const staticEntries: SitemapEntry[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/deal-hot', changeFrequency: 'daily', priority: 0.9 },
  { path: '/ma-giam-gia', changeFrequency: 'daily', priority: 0.9 },
  { path: '/danh-muc', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/cach-chon', changeFrequency: 'monthly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  const entries: SitemapEntry[] = [
    ...staticEntries,
    ...deals.map((deal) => ({
      path: `/deal-hot/${deal.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...coupons.map((coupon) => ({
      path: `/ma-giam-gia/${coupon.id}`,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      path: `/danh-muc/${category.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: absoluteSiteUrl(path)!,
    changeFrequency,
    priority,
  }));
}
