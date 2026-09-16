import { isSafeShopeeUrl, type AffiliateProduct } from './products.ts';

export const shoppingCategories = [
  { id: 'all', name: 'Tất cả' }, { id: 'cong-nghe', name: 'Công nghệ' },
  { id: 'nha-cua', name: 'Nhà cửa' }, { id: 'thoi-trang', name: 'Thời trang' },
  { id: 'me-va-be', name: 'Mẹ & bé' }, { id: 'cham-soc', name: 'Chăm sóc cá nhân' },
  { id: 'thuc-pham', name: 'Thực phẩm' },
] as const;
export type ShoppingSort = 'recommended' | 'price-asc' | 'price-desc' | 'sales';
export type ShoppingProduct = Pick<AffiliateProduct, 'id' | 'name' | 'price' | 'sales' | 'salesCount' | 'image' | 'rank' | 'lastVerifiedAt'> & {
  category: string; priceVnd: number | null; purchaseLabel: string;
};
export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}
export function categoryForProduct(name: string): string {
  const text = normalizeSearch(name);
  if (/cho be|me va be|me & be|mdkids|khan uot/.test(text)) return 'me-va-be';
  if (/chan ga|sot cham|thuc pham/.test(text)) return 'thuc-pham';
  if (/khau trang|chong nang|rua mat|skincare/.test(text)) return 'cham-soc';
  if (/iphone|tai nghe|laptop|dien thoai|cuong luc/.test(text)) return 'cong-nghe';
  if (/\b(?:ao|quan)\b|thoi trang/.test(text)) return 'thoi-trang';
  return 'nha-cua';
}
export function productOutbound(product: AffiliateProduct): { url: string; direct: boolean } | null {
  if (product.status === 'expired' || product.status === 'out_of_stock') return null;
  if (product.status === 'active' && isSafeShopeeUrl(product.affiliateUrl)) return { url: product.affiliateUrl, direct: true };
  if (!isSafeShopeeUrl(product.destinationUrl)) return null;
  const url = new URL(product.destinationUrl);
  const direct = /^\/product\/\d+\/\d+\/?$/.test(url.pathname) || /-i\.\d+\.\d+$/.test(url.pathname);
  return { url: product.destinationUrl, direct };
}
export function toShoppingProduct(product: AffiliateProduct): ShoppingProduct {
  const digits = product.price.replace(/[^0-9]/g, '');
  return {
    id: product.id, name: product.name, price: product.price, sales: product.sales,
    salesCount: product.salesCount, image: product.image, rank: product.rank,
    lastVerifiedAt: product.lastVerifiedAt, category: categoryForProduct(product.name),
    priceVnd: digits ? Number(digits) : null,
    purchaseLabel: productOutbound(product)?.direct ? 'Xem giá trên Shopee' : 'Tìm trên Shopee',
  };
}
export type ShoppingFilters = { query?: string; category?: string; sort?: ShoppingSort; min?: number; max?: number; page?: number; pageSize?: number };
export function shoppingPage(products: ShoppingProduct[], options: ShoppingFilters = {}) {
  const query = normalizeSearch(options.query || '');
  const filtered = products.filter((product) =>
    (!query || normalizeSearch(product.name).includes(query)) &&
    (!options.category || options.category === 'all' || product.category === options.category) &&
    (options.min === undefined || (product.priceVnd !== null && product.priceVnd >= options.min)) &&
    (options.max === undefined || (product.priceVnd !== null && product.priceVnd <= options.max)),
  ).sort((a, b) => {
    if (options.sort === 'sales') return b.salesCount - a.salesCount || a.rank - b.rank;
    if (options.sort === 'price-asc' || options.sort === 'price-desc') {
      if (a.priceVnd === null) return b.priceVnd === null ? a.rank - b.rank : 1;
      if (b.priceVnd === null) return -1;
      return (options.sort === 'price-asc' ? a.priceVnd - b.priceVnd : b.priceVnd - a.priceVnd) || a.rank - b.rank;
    }
    return a.rank - b.rank;
  });
  const pageSize = Math.min(48, Math.max(1, Math.floor(options.pageSize || 24)));
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(pageCount, Math.max(1, Math.floor(options.page || 1)));
  return { products: filtered.slice((page - 1) * pageSize, page * pageSize), total: filtered.length, page, pageCount };
}
export function parseShoppingFilters(params: Record<string, string | string[] | undefined>): ShoppingFilters {
  const single = (key: string) => typeof params[key] === 'string' ? params[key] as string : '';
  const amount = (key: string) => /^\d{1,12}$/.test(single(key)) ? Number(single(key)) : undefined;
  const sort = single('sort');
  return {
    query: single('q').trim().slice(0, 100),
    category: shoppingCategories.some((category) => category.id === single('category')) ? single('category') : 'all',
    sort: sort === 'price-asc' || sort === 'price-desc' || sort === 'sales' ? sort : 'recommended',
    min: amount('min'), max: amount('max'), page: Math.max(1, Number.parseInt(single('page'), 10) || 1),
  };
}
