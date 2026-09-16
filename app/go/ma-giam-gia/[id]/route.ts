import { resolveCouponOutboundUrl } from '@/app/lib/affiliate';
import { findPublishedCoupon, recordOutboundClick } from '@/app/lib/data';
import { getCouponStatus } from '@/app/lib/coupons';

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteProps) {
  const { id } = await params;
  const coupon = await findPublishedCoupon(id);

  if (!coupon || getCouponStatus(coupon) !== 'active') {
    return new Response(null, {
      status: 307,
      headers: {
        'Cache-Control': 'no-store',
        Location: new URL('/ma-giam-gia#nguon-chinh-thuc', request.url).toString(),
      },
    });
  }

  await recordOutboundClick({ kind: 'coupon', itemId: coupon.id, request }).catch((error) => {
    console.error('Không thể ghi nhận click mã giảm giá.', error);
  });

  return new Response(null, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store',
      Location: resolveCouponOutboundUrl(coupon),
    },
  });
}
