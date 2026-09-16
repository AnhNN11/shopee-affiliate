import assert from 'node:assert/strict';
import test from 'node:test';
import { shopeeProducts } from '../app/lib/shopee-products.ts';
import { categoryForProduct, parseShoppingFilters, productOutbound, shoppingPage, toShoppingProduct } from '../app/lib/storefront.ts';
import { coupons, getCouponStatus, getDiscoverableCoupons, mergeReviewedCoupons } from '../app/lib/coupons.ts';

const products = shopeeProducts.map(toShoppingProduct);
test('category keywords match words, not cao cấp as áo', () => {
  assert.equal(categoryForProduct('Khăn giấy Pio TopGia đa năng cao cấp'), 'nha-cua');
  assert.equal(categoryForProduct('Áo thun cao cấp'), 'thoi-trang');
});
test('public product payload excludes commission, programs and integration state', () => {
  const payload = JSON.stringify(products);
  for (const internal of ['commission', 'programs', 'affiliateUrl', 'pending_link', 'syncedAt']) assert.equal(payload.includes(internal), false);
});
test('Vietnamese search works without accents, category and budget apply together', () => {
  const result = shoppingPage(products, { query: 'cuong luc', category: 'cong-nghe', max: 30000 });
  assert.ok(result.total >= 2);
  assert.ok(result.products.every((p) => p.category === 'cong-nghe' && p.priceVnd! <= 30000));
  assert.equal(shoppingPage(products, { min: 200000, max: 10000 }).total, 0);
});
test('price sorting is numeric and pagination is clamped', () => {
  const sorted = shoppingPage(products, { sort: 'price-asc', pageSize: 48 }).products;
  assert.ok(sorted.every((p, index) => index === 0 || sorted[index - 1].priceVnd! <= p.priceVnd!));
  assert.equal(shoppingPage(products, { page: 999 }).page, 2);
  assert.equal(shoppingPage([], { page: 99 }).page, 1);
});
test('untrusted and legacy filter params cannot activate commission sorting', () => {
  assert.deepEqual(parseShoppingFilters({ q: ['x'], sort: 'commission', category: 'xtra', min: 'NaN', page: '-2' }), { query: '', category: 'all', sort: 'recommended', min: undefined, max: undefined, page: 1 });
});
test('pending links use honest search CTA and safe search destination', () => {
  const pending = shopeeProducts.find((p) => p.status === 'pending_link')!;
  assert.equal(toShoppingProduct(pending).purchaseLabel, 'Tìm trên Shopee');
  assert.equal(productOutbound(pending)?.direct, false);
  assert.equal(productOutbound({ ...pending, destinationUrl: 'https://evil.example/' }), null);
  assert.equal(productOutbound({ ...pending, status: 'out_of_stock' }), null);
  const active = shopeeProducts.find((p) => p.status === 'active')!;
  assert.equal(productOutbound(active)?.url, active.affiliateUrl);
});
test('exhausted voucher is excluded before its expiry and reviewed sources override stale DB records', () => {
  const time = new Date('2026-09-16T11:06:00+07:00');
  const exhausted = coupons.find((c) => c.availability === 'exhausted')!;
  assert.equal(getCouponStatus(exhausted, time), 'exhausted');
  assert.ok(!getDiscoverableCoupons(time).some((c) => c.id === exhausted.id));
  const merged = mergeReviewedCoupons([{ ...exhausted, availability: 'available', verifiedAt: '2026-09-03T17:30:00+07:00' }]);
  assert.equal(merged.find((c) => c.id === exhausted.id)?.availability, 'exhausted');
  const newer = { ...exhausted, availability: 'available' as const, verifiedAt: '2026-09-17T10:00:00+07:00' };
  assert.equal(mergeReviewedCoupons([newer]).find((c) => c.id === newer.id)?.availability, 'available');
});
test('shipping voucher is save-only, not an invented copyable coupon code', () => {
  const shipping = coupons.find((c) => c.discount.type === 'shipping')!;
  assert.equal(shipping.redemption, 'save');
  assert.equal(shipping.scope.type, 'account');
});
