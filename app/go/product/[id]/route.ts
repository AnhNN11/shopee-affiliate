import { findAffiliateProduct, recordOutboundClick } from '@/app/lib/data';
import { productOutbound } from '@/app/lib/storefront';

export async function GET(request: Request, context: RouteContext<'/go/product/[id]'>) {
  const { id } = await context.params;
  const product = await findAffiliateProduct(id);
  if (!product) return new Response('Không tìm thấy sản phẩm.', { status: 404 });
  const destination = productOutbound(product);
  if (!destination) return new Response('Sản phẩm hiện không khả dụng. Vui lòng chọn sản phẩm khác.', { status: 410 });
  await recordOutboundClick({ kind: 'product', itemId: id, request }).catch((error) => console.error('Không thể ghi nhận click sản phẩm.', error));
  return new Response(null, { status:307, headers:{ 'Cache-Control':'no-store', Location:destination.url } });
}
