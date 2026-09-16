export type CouponTone = 'hot' | 'sale' | 'voucher';

export type CouponStatus = 'upcoming' | 'active' | 'expired';

export type CouponScope =
  | { type: 'platform' }
  | { type: 'category'; categoryIds: readonly string[] }
  | { type: 'account'; audience: 'new-user' | 'selected-users' };

export type CouponDiscount =
  | { type: 'fixed'; amountVnd: number }
  | { type: 'percent'; percent: number; maxAmountVnd: number | null }
  | { type: 'shipping'; maxAmountVnd: number | null };

export type CouponRecord = {
  id: string;
  code: string;
  tone: CouponTone;
  badge: string;
  title: string;
  description: string;
  discount: CouponDiscount;
  minSpendVnd: number;
  scope: CouponScope;
  startsAt: string;
  endsAt: string;
  terms: readonly string[];
  sourceName: string;
  sourceUrl: string;
  destinationUrl: string;
  affiliateUrl?: string;
  verifiedAt: string;
  published: boolean;
};

const couponCatalog = [
  {
    id: 'crmnuicl80t9',
    code: 'CRMNUICL80T9',
    tone: 'hot',
    badge: 'Đơn đầu tiên',
    title: 'Giảm 80.000đ cho đơn đầu tiên',
    description:
      'Voucher do Shopee phát hành cho đơn đầu tiên của tài khoản đủ điều kiện. Số lượng có hạn và có thể hết trước ngày hiển thị.',
    discount: { type: 'fixed', amountVnd: 80_000 },
    minSpendVnd: 0,
    scope: { type: 'account', audience: 'new-user' },
    startsAt: '2026-09-03T00:00:00+07:00',
    endsAt: '2026-10-01T00:00:00+07:00',
    terms: [
      'Dành cho đơn hàng đầu tiên của tài khoản đủ điều kiện.',
      'Đơn tối thiểu 0đ; sản phẩm và tài khoản vẫn phải đáp ứng điều kiện trên Shopee.',
      'Số lượng voucher có hạn và có thể hết lượt trước ngày kết thúc.',
      'Kiểm tra số tiền được giảm ở bước thanh toán trước khi đặt hàng.',
    ],
    sourceName: 'Shopee — Điều Kiện voucher',
    sourceUrl:
      'https://shopee.vn/voucher/details?evcode=Q1JNTlVJQ0w4MFQ5&from_source=microsite&promotionId=1494242522468352&signature=6aeeb654c7aa9ef71d87cf4992d3993ca0525e488abc39ee5c9f9ebb734796c3&source=0',
    destinationUrl: 'https://shopee.vn/m/ma-giam-gia',
    verifiedAt: '2026-09-03T17:30:00+07:00',
    published: true,
  },
  {
    id: 'crmnuicl60t9',
    code: 'CRMNUICL60T9',
    tone: 'voucher',
    badge: 'Đơn đầu tiên',
    title: 'Giảm 60.000đ cho đơn đầu tiên',
    description:
      'Voucher do Shopee phát hành cho đơn đầu tiên của tài khoản đủ điều kiện. Hãy lưu mã sớm vì số lượng được phát có hạn.',
    discount: { type: 'fixed', amountVnd: 60_000 },
    minSpendVnd: 0,
    scope: { type: 'account', audience: 'new-user' },
    startsAt: '2026-09-03T00:00:00+07:00',
    endsAt: '2026-10-01T00:00:00+07:00',
    terms: [
      'Dành cho đơn hàng đầu tiên của tài khoản đủ điều kiện.',
      'Đơn tối thiểu 0đ; sản phẩm và tài khoản vẫn phải đáp ứng điều kiện trên Shopee.',
      'Số lượng voucher có hạn và có thể hết lượt trước ngày kết thúc.',
      'Kiểm tra số tiền được giảm ở bước thanh toán trước khi đặt hàng.',
    ],
    sourceName: 'Shopee — Điều Kiện voucher',
    sourceUrl:
      'https://shopee.vn/voucher/details?evcode=Q1JNTlVJQ0w2MFQ5&from_source=microsite&promotionId=1494242548551680&signature=f435950c8e9570eac1117de1748070268dbf7d3073b3343852178f737dc84319&source=0',
    destinationUrl: 'https://shopee.vn/m/ma-giam-gia',
    verifiedAt: '2026-09-03T17:30:00+07:00',
    published: true,
  },
] as const satisfies readonly CouponRecord[];

const vietnameseDateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Asia/Ho_Chi_Minh',
});

const vndFormatter = new Intl.NumberFormat('vi-VN');

export const coupons: readonly CouponRecord[] = couponCatalog;

function isShopeeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLocaleLowerCase('en-US');
    return url.protocol === 'https:' && (hostname === 'shopee.vn' || hostname.endsWith('.shopee.vn'));
  } catch {
    return false;
  }
}

function hasExplicitTimezone(value: string): boolean {
  return /T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value);
}

export function validateCouponCatalog(records: readonly CouponRecord[]): void {
  const ids = new Set<string>();
  const codes = new Set<string>();

  for (const coupon of records) {
    if (!/^[a-z0-9-]+$/.test(coupon.id) || ids.has(coupon.id)) {
      throw new Error(`Coupon id không hợp lệ hoặc bị trùng: ${coupon.id}`);
    }
    ids.add(coupon.id);

    if (!/^[A-Z0-9_-]+$/.test(coupon.code) || codes.has(coupon.code)) {
      throw new Error(`Coupon code không hợp lệ hoặc bị trùng: ${coupon.code}`);
    }
    codes.add(coupon.code);

    const startsAt = Date.parse(coupon.startsAt);
    const endsAt = Date.parse(coupon.endsAt);
    const verifiedAt = Date.parse(coupon.verifiedAt);
    if (
      ![coupon.startsAt, coupon.endsAt, coupon.verifiedAt].every(hasExplicitTimezone)
      || ![startsAt, endsAt, verifiedAt].every(Number.isFinite)
      || startsAt >= endsAt
      || verifiedAt < startsAt
      || verifiedAt >= endsAt
    ) {
      throw new Error(`Khoảng thời gian không hợp lệ: ${coupon.code}`);
    }

    if (!isShopeeUrl(coupon.sourceUrl) || !isShopeeUrl(coupon.destinationUrl)) {
      throw new Error(`Nguồn hoặc đích không phải URL Shopee an toàn: ${coupon.code}`);
    }

    if (coupon.sourceUrl === coupon.destinationUrl) {
      throw new Error(`Coupon cần URL bằng chứng riêng: ${coupon.code}`);
    }

    const sourceUrl = new URL(coupon.sourceUrl);
    const evidenceCode = sourceUrl.searchParams.get('evcode');
    if (
      coupon.published
      && (sourceUrl.pathname !== '/voucher/details' || !evidenceCode || globalThis.atob(evidenceCode) !== coupon.code)
    ) {
      throw new Error(`URL Điều Kiện không khớp mã: ${coupon.code}`);
    }

    if (coupon.published && (!coupon.terms.length || !coupon.sourceName.trim())) {
      throw new Error(`Coupon đã xuất bản nhưng thiếu nguồn hoặc điều kiện: ${coupon.code}`);
    }

    if (coupon.minSpendVnd < 0 || !Number.isFinite(coupon.minSpendVnd)) {
      throw new Error(`Giá trị đơn tối thiểu không hợp lệ: ${coupon.code}`);
    }

    if (coupon.discount.type === 'fixed' && coupon.discount.amountVnd <= 0) {
      throw new Error(`Mức giảm cố định không hợp lệ: ${coupon.code}`);
    }

    if (coupon.discount.type === 'percent' && (coupon.discount.percent <= 0 || coupon.discount.percent > 100)) {
      throw new Error(`Phần trăm giảm không hợp lệ: ${coupon.code}`);
    }

    if (coupon.affiliateUrl && !isShopeeUrl(coupon.affiliateUrl)) {
      throw new Error(`Affiliate URL không hợp lệ: ${coupon.code}`);
    }
  }
}

validateCouponCatalog(coupons);

export function getCouponStatus(
  coupon: Pick<CouponRecord, 'startsAt' | 'endsAt'>,
  now: number | Date = Date.now(),
): CouponStatus {
  const timestamp = now instanceof Date ? now.getTime() : now;
  const startsAt = Date.parse(coupon.startsAt);
  const endsAt = Date.parse(coupon.endsAt);

  if (!Number.isFinite(startsAt) || !Number.isFinite(endsAt) || startsAt >= endsAt) {
    throw new Error('Khoảng thời gian voucher không hợp lệ.');
  }

  if (timestamp < startsAt) return 'upcoming';
  if (timestamp >= endsAt) return 'expired';
  return 'active';
}

export function getDiscoverableCoupons(now: number | Date = Date.now()): CouponRecord[] {
  return coupons.filter((coupon) => coupon.published && getCouponStatus(coupon, now) !== 'expired');
}

export function getActiveCoupons(now: number | Date = Date.now()): CouponRecord[] {
  return coupons.filter((coupon) => coupon.published && getCouponStatus(coupon, now) === 'active');
}

export function findPublishedCoupon(id: string): CouponRecord | undefined {
  return coupons.find((coupon) => coupon.published && coupon.id === id);
}

export function formatDiscount(discount: CouponDiscount): string {
  if (discount.type === 'fixed') return `${vndFormatter.format(discount.amountVnd)}đ`;
  if (discount.type === 'shipping') {
    return discount.maxAmountVnd ? `Freeship đến ${vndFormatter.format(discount.maxAmountVnd)}đ` : 'Freeship';
  }
  const cap = discount.maxAmountVnd ? `, tối đa ${vndFormatter.format(discount.maxAmountVnd)}đ` : '';
  return `Giảm ${discount.percent}%${cap}`;
}

export function formatDiscountShort(discount: CouponDiscount): string {
  if (discount.type === 'fixed') return `₫${Math.round(discount.amountVnd / 1_000)}K`;
  if (discount.type === 'shipping') return 'FREESHIP';
  return `-${discount.percent}%`;
}

export function formatMinSpend(amountVnd: number): string {
  return `Đơn từ ${vndFormatter.format(amountVnd)}đ`;
}

export function formatCouponSchedule(coupon: Pick<CouponRecord, 'startsAt' | 'endsAt'>, status?: CouponStatus): string {
  const currentStatus = status ?? getCouponStatus(coupon);
  if (currentStatus === 'upcoming') return `Mở ${vietnameseDateFormatter.format(new Date(coupon.startsAt))}`;
  const lastValidMoment = new Date(Date.parse(coupon.endsAt) - 1);
  return `${currentStatus === 'expired' ? 'Hết hạn' : 'HSD'} ${vietnameseDateFormatter.format(lastValidMoment)}`;
}

export function formatVerifiedDate(verifiedAt: string): string {
  return vietnameseDateFormatter.format(new Date(verifiedAt));
}

export function formatCouponScope(scope: CouponScope): string {
  if (scope.type === 'platform') return 'Toàn sàn';
  if (scope.type === 'category') return 'Theo ngành';
  return scope.audience === 'new-user' ? 'Đơn đầu tiên' : 'Theo tài khoản';
}

export function getCouponStatusLabel(status: CouponStatus): string {
  if (status === 'upcoming') return 'Sắp mở';
  if (status === 'expired') return 'Đã hết hạn';
  return 'Trong thời hạn';
}

export function isCouponRelevantToCategory(coupon: CouponRecord, categoryId: string): boolean {
  if (coupon.scope.type === 'category') return coupon.scope.categoryIds.includes(categoryId);
  return coupon.scope.type === 'platform' || coupon.scope.type === 'account';
}

export function isSafeShopeeDestination(value: string): boolean {
  return isShopeeUrl(value);
}
