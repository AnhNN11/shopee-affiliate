import assert from 'node:assert/strict';
import test from 'node:test';
import {
  coupons,
  getCouponStatus,
  getDiscoverableCoupons,
  validateCouponCatalog,
  type CouponRecord,
} from '../app/lib/coupons.ts';

const sample = { ...coupons[0], availability: 'available' as const };

test('voucher chuyển đúng trạng thái tại biên thời gian', () => {
  const startsAt = Date.parse(sample.startsAt);
  const endsAt = Date.parse(sample.endsAt);

  assert.equal(getCouponStatus(sample, startsAt - 1), 'upcoming');
  assert.equal(getCouponStatus(sample, startsAt), 'active');
  assert.equal(getCouponStatus(sample, endsAt - 1), 'active');
  assert.equal(getCouponStatus(sample, endsAt), 'expired');
});

test('danh sách tự loại voucher hết hạn', () => {
  const afterEveryExpiry = Math.max(...coupons.map((coupon) => Date.parse(coupon.endsAt)));
  assert.deepEqual(getDiscoverableCoupons(afterEveryExpiry), []);
});

test('catalog chỉ chứa mã có nguồn Shopee riêng', () => {
  validateCouponCatalog(coupons);

  for (const coupon of coupons) {
    assert.match(coupon.sourceUrl, /^https:\/\/(?:[^/]+\.)?shopee\.vn\/voucher\/details\?/);
    assert.notEqual(coupon.sourceUrl, coupon.destinationUrl);
  }
});

test('không còn mã minh họa cũ trong catalog', () => {
  const oldDemoCodes = [
    'FREESHIP50',
    'CHONCHUAN10',
    'SIEUSALE20',
    'TECH100K',
    'BEPAM10',
    'DEPXINH12',
    'THEMMOI80',
    'SHOPTHEM15',
  ];
  const liveCodes = new Set(coupons.map((coupon) => coupon.code));
  assert.equal(oldDemoCodes.some((code) => liveCodes.has(code)), false);
});

test('catalog từ chối khoảng thời gian sai', () => {
  const invalid: CouponRecord = { ...sample, id: 'invalid-window', code: 'INVALID', endsAt: sample.startsAt };
  assert.throws(() => validateCouponCatalog([invalid]), /Khoảng thời gian/);
});
