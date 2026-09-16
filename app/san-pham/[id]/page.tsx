import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getShoppingProducts } from '@/app/lib/data';
import { shoppingCategories } from '@/app/lib/storefront';
import { createPageMetadata } from '@/app/lib/seo';
import { ShoppingProductCard } from '@/app/components/product-explorer';

export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getShoppingProducts()).find((item) => item.id === id);
  if (!product) return { title: 'Không tìm thấy sản phẩm' };
  return createPageMetadata({ title: product.name, description: `Xem giá tham khảo, thông tin mua sắm và tìm ${product.name} trên Shopee.`, path: `/san-pham/${id}` });
}
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getShoppingProducts();
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  const category = shoppingCategories.find((item) => item.id === product.category);
  const related = products.filter((item) => item.id !== id && item.category === product.category).slice(0, 4);
  return <main>
    <nav className="breadcrumbs page-shell" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>›</span><Link href="/san-pham">Sản phẩm</Link><span>›</span><span>{product.name}</span></nav>
    <section className="deal-detail page-shell">
      <div className="detail-visual"><Image className="detail-product-photo" src={product.image} alt={product.name} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
      <div className="detail-summary"><Link className="eyebrow" href={`/san-pham?category=${product.category}`}>{category?.name}</Link><h1>{product.name}</h1>
        <p>Giá tham khảo</p><div className="detail-price-row"><strong>{product.price}</strong></div>
        <p>{product.sales} đã bán theo dữ liệu Shopee · Cập nhật {new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(product.lastVerifiedAt))}</p>
        <p className="detail-description">Kiểm tra phân loại, số lượng, người bán và giá cuối sau mã giảm giá trước khi đặt hàng.</p>
        <a className="shopee-button" href={`/go/product/${product.id}`} target="_blank" rel="sponsored nofollow noopener noreferrer">{product.purchaseLabel} ↗</a>
        {product.purchaseLabel === 'Tìm trên Shopee' && <p className="affiliate-inline">Liên kết mở kết quả tìm kiếm. Bạn chọn đúng sản phẩm và người bán trên Shopee; giá kết quả có thể khác giá tham khảo.</p>}
        <Link className="shopping-detail-link" href="/ma-giam-gia">Xem voucher trước khi đặt hàng →</Link>
      </div>
    </section>
    <section className="decision-section page-shell"><article><h2>Trước khi mua</h2><ul><li>Đọc đánh giá gần đây có hình ảnh.</li><li>Chọn đúng kích thước, màu sắc và phiên bản.</li><li>Đối chiếu tổng tiền sau mã và phí giao hàng.</li></ul></article><article><h2>Giao hàng & đổi trả</h2><p>Đơn hàng được đặt và thanh toán trên Shopee. Thời gian giao, bảo hành và điều kiện đổi trả do người bán và Shopee cung cấp tại trang sản phẩm.</p><Link href="/huong-dan-mua-hang">Xem hướng dẫn mua hàng →</Link></article></section>
    {related.length > 0 && <section className="related-section page-shell"><div className="section-title"><h2>Có thể bạn cũng cần</h2><Link href={`/san-pham?category=${product.category}`}>Xem thêm →</Link></div><div className="affiliate-product-grid">{related.map((item) => <ShoppingProductCard key={item.id} product={item} />)}</div></section>}
  </main>;
}
