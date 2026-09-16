import { getCouponStatus, formatCouponScope, type CouponRecord } from './coupons.ts';
import { normalizeSearch } from './storefront.ts';

export type VoucherFilter = 'all' | 'shipping' | 'discount' | 'new-user';
export const voucherFilters: { id: VoucherFilter; label: string; symbol: string }[] = [
  { id: 'all', label: 'Tất cả mã', symbol: '▦' },
  { id: 'shipping', label: 'Miễn phí vận chuyển', symbol: '↗' },
  { id: 'discount', label: 'Giảm giá đơn hàng', symbol: '%' },
  { id: 'new-user', label: 'Khách hàng mới', symbol: '☆' },
];
export function filterVouchers(coupons: readonly CouponRecord[], now: number, filter: VoucherFilter = 'all', query = '', sort = 'recommended') {
  const keyword = normalizeSearch(query);
  return coupons.filter((coupon) => {
    const status = getCouponStatus(coupon, now);
    if (!coupon.published || (status !== 'active' && status !== 'upcoming')) return false;
    if (filter === 'shipping' && coupon.discount.type !== 'shipping') return false;
    if (filter === 'discount' && coupon.discount.type === 'shipping') return false;
    if (filter === 'new-user' && (coupon.scope.type !== 'account' || coupon.scope.audience !== 'new-user')) return false;
    return !keyword || normalizeSearch(`${coupon.redemption === 'save' ? '' : coupon.code} ${coupon.title} ${coupon.description} ${coupon.badge} ${formatCouponScope(coupon.scope)} ${coupon.discount.type === 'shipping' ? 'freeship mien phi van chuyen' : ''}`).includes(keyword);
  }).sort((a, b) => sort === 'expiring' ? Date.parse(a.endsAt) - Date.parse(b.endsAt) : sort === 'newest' ? Date.parse(b.verifiedAt) - Date.parse(a.verifiedAt) : 0);
}
