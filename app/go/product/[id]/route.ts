import { findAffiliateProduct, recordOutboundClick } from '@/app/lib/data';
import { isSafeShopeeUrl } from '@/app/lib/products';

export async function GET(request: Request, context: RouteContext<'/go/product/[id]'>) {
  const { id } = await context.params;
  const product = await findAffiliateProduct(id);
  if (!product) return new Response('Không tìm thấy sản phẩm.', { status: 404 });
  if (product.status !== 'active' || !isSafeShopeeUrl(product.affiliateUrl)) return new Response('Sản phẩm chưa có link Affiliate đã xác minh.', { status: 409 });
  await recordOutboundClick({ kind: 'product', itemId: id, request }).catch((error) => console.error('Không thể ghi nhận click sản phẩm.', error));
  return new Response(null, { status:307, headers:{ 'Cache-Control':'no-store', Location:product.affiliateUrl } });
}
