import assert from 'node:assert/strict';
import test from 'node:test';
import { isAffiliateProduct, isSafeShopeeUrl, validateAffiliateProducts } from '../app/lib/products.ts';
import { shopeeProducts } from '../app/lib/shopee-products.ts';

test('catalog sản phẩm phiên bản 2 hợp lệ và không trùng id', () => {
  validateAffiliateProducts(shopeeProducts);
  assert.equal(new Set(shopeeProducts.map((product) => product.id)).size, shopeeProducts.length);
});

test('sản phẩm active luôn có link affiliate Shopee an toàn', () => {
  for (const product of shopeeProducts.filter((item) => item.status === 'active')) {
    assert.equal(isSafeShopeeUrl(product.affiliateUrl), true);
    assert.ok(product.linkVerifiedAt);
  }
});

test('từ chối redirect ngoài hệ thống Shopee', () => {
  assert.equal(isSafeShopeeUrl('https://s.shopee.vn/abc'), true);
  assert.equal(isSafeShopeeUrl('https://shopee.vn/product/1/2'), true);
  assert.equal(isSafeShopeeUrl('https://shopee.vn.attacker.test/abc'), false);
  assert.equal(isSafeShopeeUrl('javascript:alert(1)'), false);
});

test('từ chối sản phẩm active không có affiliateUrl', () => {
  const invalid = { ...shopeeProducts[0], status:'active' as const };
  assert.equal(isAffiliateProduct(invalid), false);
});

test('hoa hồng đã tách khớp với tổng khi có đủ dữ liệu', () => {
  for (const product of shopeeProducts) {
    const { shopeeRate, xtraRate, totalRate } = product.commission;
    if (shopeeRate !== undefined && xtraRate !== undefined) assert.equal(shopeeRate + xtraRate, totalRate);
  }
});
