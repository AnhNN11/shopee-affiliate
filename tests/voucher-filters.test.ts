import assert from 'node:assert/strict';
import test from 'node:test';
import { coupons } from '../app/lib/coupons.ts';
import { filterVouchers } from '../app/lib/voucher-filters.ts';
const now = Date.parse('2026-09-16T12:00:00+07:00');
test('voucher tabs exclude exhausted and unpublished coupons', () => {
  assert.equal(filterVouchers(coupons, now).length, 2);
  assert.equal(filterVouchers(coupons.map(c => ({ ...c, published: false })), now).length, 0);
  assert.equal(filterVouchers(coupons, now, 'shipping').length, 1);
  assert.equal(filterVouchers(coupons, now, 'discount').length, 1);
  assert.equal(filterVouchers(coupons, now, 'new-user').length, 2);
});
test('voucher search supports accentless phrases and freeship without exposing save IDs', () => {
  assert.equal(filterVouchers(coupons, now, 'all', 'van chuyen').length, 1);
  assert.equal(filterVouchers(coupons, now, 'all', 'freeship').length, 1);
  assert.equal(filterVouchers(coupons, now, 'all', 'CRMNUICL60T9').length, 1);
  assert.equal(filterVouchers(coupons, now, 'all', 'FSV-1494801891627008').length, 0);
  assert.equal(filterVouchers(coupons, now, 'all', 'no-match').length, 0);
});
test('voucher expiry is enforced as clock advances', () => {
  assert.equal(filterVouchers(coupons, Date.parse('2026-10-01T00:00:00+07:00')).length, 0);
});
