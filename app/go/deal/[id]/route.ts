import { resolveDealOutboundUrl } from '@/app/lib/affiliate';
import { findDeal, recordOutboundClick } from '@/app/lib/data';

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteProps) {
  const { id } = await params;
  const deal = await findDeal(id);

  if (!deal) {
    return new Response(null, {
      status: 307,
      headers: {
        'Cache-Control': 'no-store',
        Location: new URL('/deal-hot', request.url).toString(),
      },
    });
  }

  await recordOutboundClick({ kind: 'deal', itemId: deal.id, request }).catch((error) => {
    console.error('Không thể ghi nhận click deal.', error);
  });

  return new Response(null, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store',
      Location: resolveDealOutboundUrl(deal),
    },
  });
}
