import type { Deal } from './catalog';
import type { CouponRecord } from './coupons';
import { isSafeShopeeDestination } from './coupons';

type OutboundRecord = {
  destinationUrl: string;
  affiliateUrl?: string;
};

export function resolveShopeeOutboundUrl(record: OutboundRecord): string {
  const candidate = record.affiliateUrl || record.destinationUrl;

  if (!isSafeShopeeDestination(candidate)) {
    throw new Error('Liên kết Shopee không hợp lệ.');
  }

  return candidate;
}

export function resolveCouponOutboundUrl(coupon: CouponRecord): string {
  return resolveShopeeOutboundUrl(coupon);
}

export function resolveDealOutboundUrl(deal: Deal): string {
  return resolveShopeeOutboundUrl({
    destinationUrl: deal.url,
    affiliateUrl: deal.affiliateUrl,
  });
}

export function getOutboundRel(record: Pick<OutboundRecord, 'affiliateUrl'>): string {
  return record.affiliateUrl
    ? 'sponsored nofollow noopener noreferrer'
    : 'nofollow noopener noreferrer';
}

export const affiliateDisclosure =
  'Liên kết mua sắm có thể là liên kết tiếp thị. Bạn không trả thêm chi phí; tiêu chí biên tập không thay đổi.';
