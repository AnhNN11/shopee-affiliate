import type { MetadataRoute } from 'next';
import { getCategories, getDeals, getDiscoverableCoupons, getShoppingProducts } from './lib/data';
import { absoluteSiteUrl, SITE_URL } from './lib/seo';

export const revalidate = 60;

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
  lastModified?: string | Date;
};

const staticEntries: SitemapEntry[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/san-pham', changeFrequency: 'daily', priority: 0.9 },
  { path: '/deal-hot', changeFrequency: 'daily', priority: 0.9 },
  { path: '/ma-giam-gia', changeFrequency: 'daily', priority: 0.9 },
  { path: '/danh-muc', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/cach-chon', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/huong-dan-mua-hang', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/quyen-rieng-tu', changeFrequency: 'monthly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_URL) return [];
  const [categories, deals, visibleCoupons, products] = await Promise.all([
    getCategories(),
    getDeals(),
    getDiscoverableCoupons(),
    getShoppingProducts(),
  ]);

  const entries: SitemapEntry[] = [
    ...staticEntries,
    ...products.map((product) => ({ path: `/san-pham/${product.id}`, changeFrequency: 'daily' as const, priority: 0.8, lastModified: product.lastVerifiedAt })),
    ...deals.map((deal) => ({
      path: `/deal-hot/${deal.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...visibleCoupons.map((coupon) => ({
      path: `/ma-giam-gia/${coupon.id}`,
      changeFrequency: 'daily' as const,
      priority: 0.7,
      lastModified: coupon.verifiedAt,
    })),
    ...categories.map((category) => ({
      path: `/danh-muc/${category.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return entries.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: absoluteSiteUrl(path)!,
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }));
}
