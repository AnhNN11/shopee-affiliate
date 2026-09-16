export type CommissionProgram = 'shopee' | 'xtra';
export type ProductStatus = 'active' | 'pending_link' | 'expired' | 'out_of_stock';
export type ProductSort = 'rank' | 'commission' | 'sales';

export type AffiliateProduct = {
  schemaVersion: 2;
  id: string;
  name: string;
  price: string;
  discount: string;
  sales: string;
  salesCount: number;
  image: string;
  destinationUrl: string;
  affiliateUrl?: string;
  commission: { shopeeRate?: number; xtraRate?: number; totalRate: number; socialRate?: number; liveRate?: number; videoRate?: number };
  programs: CommissionProgram[];
  status: ProductStatus;
  rank: number;
  source: 'shopee_affiliate_ui' | 'product_feed' | 'open_api' | 'manual_import';
  syncedAt: string;
  lastVerifiedAt: string;
  linkVerifiedAt?: string;
  commissionValidFrom?: string;
  commissionValidTo?: string;
};

export type AffiliateProductPage = { products: AffiliateProduct[]; total: number; page: number; pageCount: number; pageSize: number };

const programs = new Set<CommissionProgram>(['shopee', 'xtra']);
const statuses = new Set<ProductStatus>(['active', 'pending_link', 'expired', 'out_of_stock']);
const sources = new Set<AffiliateProduct['source']>(['shopee_affiliate_ui', 'product_feed', 'open_api', 'manual_import']);

export function isAffiliateProduct(value: unknown): value is AffiliateProduct {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<AffiliateProduct>;
  const commission = product.commission;
  return Boolean(
    product.schemaVersion === 2 && isText(product.id) && isText(product.name) && isText(product.price) &&
    typeof product.discount === 'string' && typeof product.sales === 'string' &&
    Number.isFinite(product.salesCount) && Number(product.salesCount) >= 0 && isSafeImageUrl(product.image) &&
    isSafeShopeeUrl(product.destinationUrl) && (!product.affiliateUrl || isSafeShopeeUrl(product.affiliateUrl)) &&
    commission && isRate(commission.totalRate) && optionalRate(commission.shopeeRate) && optionalRate(commission.xtraRate) &&
    optionalRate(commission.socialRate) && optionalRate(commission.liveRate) && optionalRate(commission.videoRate) &&
    Array.isArray(product.programs) && product.programs.length > 0 && product.programs.every((item) => programs.has(item)) &&
    product.status && statuses.has(product.status) && Number.isInteger(product.rank) && Number(product.rank) > 0 &&
    product.source && sources.has(product.source) && isIsoDate(product.syncedAt) && isIsoDate(product.lastVerifiedAt) &&
    (!product.linkVerifiedAt || isIsoDate(product.linkVerifiedAt)) && (!product.commissionValidFrom || isIsoDate(product.commissionValidFrom)) &&
    (!product.commissionValidTo || isIsoDate(product.commissionValidTo)) && (product.status !== 'active' || Boolean(product.affiliateUrl))
  );
}

export function validateAffiliateProducts(values: unknown[]): asserts values is AffiliateProduct[] {
  values.forEach((value, index) => {
    if (!isAffiliateProduct(value)) throw new Error(`Sản phẩm thứ ${index + 1} không đúng cấu trúc hoặc chứa URL không an toàn.`);
  });
  const ids = new Set<string>();
  for (const product of values as AffiliateProduct[]) {
    if (ids.has(product.id)) throw new Error(`Trùng product id ${product.id}.`);
    ids.add(product.id);
  }
}

export function isSafeShopeeUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try { const url = new URL(value); return url.protocol === 'https:' && (url.hostname === 'shopee.vn' || url.hostname.endsWith('.shopee.vn')); }
  catch { return false; }
}

function isSafeImageUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try { const url = new URL(value); return url.protocol === 'https:' && (url.hostname === 'img.susercontent.com' || url.hostname.endsWith('.img.susercontent.com')); }
  catch { return false; }
}

function isText(value: unknown): value is string { return typeof value === 'string' && value.trim().length > 0; }
function isRate(value: unknown): value is number { return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100; }
function optionalRate(value: unknown): boolean { return value === undefined || isRate(value); }
function isIsoDate(value: unknown): value is string { return typeof value === 'string' && Number.isFinite(Date.parse(value)); }
