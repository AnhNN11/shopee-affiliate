import 'server-only';

import { cache } from 'react';
import { categories as seedCategories, deals as seedDeals, type Category, type Deal } from './catalog';
import {
  coupons as seedCoupons,
  getCouponStatus,
  validateCouponCatalog,
  type CouponRecord,
} from './coupons';
import { getDatabase, isMongoConfigured } from './mongodb';
import { shopeeProducts } from './shopee-products';
import type { AffiliateProduct, AffiliateProductPage, CommissionProgram, ProductSort } from './products';

type CollectionName = 'categories' | 'deals' | 'coupons' | 'affiliate_products';

async function readCollection<T>(name: CollectionName): Promise<T[]> {
  const database = await getDatabase();
  const documents = await database
    .collection<Record<string, unknown>>(name)
    .find({}, { projection: { _id: 0 } })
    .toArray();

  return documents as T[];
}

export const getCategories = cache(async (): Promise<Category[]> => {
  if (!isMongoConfigured()) return seedCategories;
  return readCollection<Category>('categories');
});

export const getDeals = cache(async (): Promise<Deal[]> => {
  if (!isMongoConfigured()) return seedDeals;
  return readCollection<Deal>('deals');
});

export const getCoupons = cache(async (): Promise<CouponRecord[]> => {
  if (!isMongoConfigured()) return [...seedCoupons];
  const coupons = await readCollection<CouponRecord>('coupons');
  validateCouponCatalog(coupons);
  return coupons;
});

export const getAffiliateProducts = cache(async (): Promise<AffiliateProduct[]> => {
  if (!isMongoConfigured()) return shopeeProducts;
  const database = await getDatabase();
  return database.collection<AffiliateProduct>('affiliate_products').find({}, { projection: { _id: 0 } }).sort({ rank: 1 }).toArray();
});

export async function findAffiliateProduct(id: string): Promise<AffiliateProduct | undefined> {
  if (!isMongoConfigured()) return shopeeProducts.find((product) => product.id === id);
  const database = await getDatabase();
  return (await database.collection<AffiliateProduct>('affiliate_products').findOne({ id }, { projection: { _id: 0 } })) ?? undefined;
}

export async function getAffiliateProductPage(options: {
  query?: string;
  program?: CommissionProgram | 'all';
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
} = {}): Promise<AffiliateProductPage> {
  const query = options.query?.trim() || '';
  const program = options.program || 'all';
  const sort = options.sort || 'rank';
  const pageSize = Math.min(48, Math.max(1, options.pageSize || 24));
  const requestedPage = Math.max(1, options.page || 1);

  if (!isMongoConfigured()) {
    const filtered = shopeeProducts.filter((product) =>
      (product.status === 'active' || product.status === 'pending_link') &&
      (program === 'all' || product.programs.includes(program)) &&
      (!query || product.name.toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi'))),
    );
    filtered.sort(productSort(sort));
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    const page = Math.min(requestedPage, pageCount);
    return { products: filtered.slice((page - 1) * pageSize, page * pageSize), total: filtered.length, page, pageCount, pageSize };
  }

  const database = await getDatabase();
  const collection = database.collection<AffiliateProduct>('affiliate_products');
  const filter: Record<string, unknown> = { status: { $in: ['active', 'pending_link'] } };
  if (program !== 'all') filter.programs = program;
  if (query) filter.name = { $regex: escapeRegex(query), $options: 'i' };
  const total = await collection.countDocuments(filter);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(requestedPage, pageCount);
  const sortSpec: Record<string, 1 | -1> = sort === 'commission' ? { 'commission.totalRate': -1, rank: 1 } : sort === 'sales' ? { salesCount: -1, rank: 1 } : { rank: 1 };
  const products = await collection.find(filter, { projection: { _id: 0 } }).sort(sortSpec).skip((page - 1) * pageSize).limit(pageSize).toArray();
  return { products, total, page, pageCount, pageSize };
}

export async function findDeal(id: string): Promise<Deal | undefined> {
  return (await getDeals()).find((deal) => deal.id === id);
}

export async function findPublishedCoupon(id: string): Promise<CouponRecord | undefined> {
  return (await getCoupons()).find((coupon) => coupon.published && coupon.id === id);
}

export async function getDiscoverableCoupons(now: number | Date = Date.now()): Promise<CouponRecord[]> {
  return (await getCoupons()).filter(
    (coupon) => coupon.published && getCouponStatus(coupon, now) !== 'expired',
  );
}

export async function getActiveCoupons(now: number | Date = Date.now()): Promise<CouponRecord[]> {
  return (await getCoupons()).filter(
    (coupon) => coupon.published && getCouponStatus(coupon, now) === 'active',
  );
}

export async function recordOutboundClick(input: {
  kind: 'deal' | 'coupon' | 'product';
  itemId: string;
  request: Request;
}): Promise<void> {
  if (!isMongoConfigured()) return;

  const database = await getDatabase();
  const requestUrl = new URL(input.request.url);
  const referer = input.request.headers.get('referer');
  const refererUrl = referer ? safeUrl(referer) : null;

  await database.collection('outbound_clicks').insertOne({
    kind: input.kind,
    itemId: input.itemId,
    clickedAt: new Date(),
    sourcePath: refererUrl?.pathname ?? null,
    sourceHost: refererUrl?.hostname ?? null,
    utmSource: requestUrl.searchParams.get('utm_source'),
    utmMedium: requestUrl.searchParams.get('utm_medium'),
    utmCampaign: requestUrl.searchParams.get('utm_campaign'),
  });
}

function safeUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function escapeRegex(value: string): string { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function productSort(sort: ProductSort): (a: AffiliateProduct, b: AffiliateProduct) => number {
  if (sort === 'commission') return (a, b) => b.commission.totalRate - a.commission.totalRate || a.rank - b.rank;
  if (sort === 'sales') return (a, b) => b.salesCount - a.salesCount || a.rank - b.rank;
  return (a, b) => a.rank - b.rank;
}
