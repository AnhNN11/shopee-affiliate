import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CouponCard } from '@/app/components/coupon-card';
import { DealCard } from '@/app/components/deal-card';
import { getActiveCoupons, getCategories, getDeals, getShoppingProducts } from '@/app/lib/data';
import { ShoppingProductCard } from '@/app/components/product-explorer';
import { isCouponRelevantToCategory } from '@/app/lib/coupons';
import { createNotFoundMetadata, createPageMetadata } from '@/app/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

const categoryNotes: Record<string, { question: string; tips: string[] }> = {
  'Công nghệ': { question: 'Thiết bị này giải quyết việc gì mỗi ngày?', tips: ['Ưu tiên tương thích trước cấu hình', 'So thời lượng pin trong điều kiện thực', 'Kiểm tra bảo hành và phụ kiện'] },
  'Nhà cửa': { question: 'Món này có thật sự làm nhà gọn hơn?', tips: ['Đo kích thước không gian trước', 'Ưu tiên đồ dễ vệ sinh', 'Tính cả điện năng và phụ kiện thay thế'] },
  'Làm đẹp': { question: 'Sản phẩm có hợp da và routine hiện tại?', tips: ['Đọc thành phần chính', 'Xem đánh giá từ người có loại da tương tự', 'Bắt đầu với dung tích nhỏ'] },
  'Thời trang': { question: 'Bạn sẽ mặc món này ít nhất ba cách?', tips: ['Đọc số đo thay vì chỉ nhìn size', 'Xem ảnh thật và chất vải', 'Ưu tiên màu dễ phối đồ sẵn có'] },
  'Mẹ & Bé': { question: 'Món này có an toàn và dễ dùng hằng ngày?', tips: ['Kiểm tra vật liệu và tiêu chuẩn', 'Ưu tiên thiết kế dễ làm sạch', 'Đọc kỹ độ tuổi và kích thước phù hợp'] },
};

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({ slug: category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((item) => item.id === slug);
  if (!category) return createNotFoundMetadata('Không tìm thấy danh mục');

  const description = `${category.copy}. Xem deal, mã giảm giá đã đối chiếu và tiêu chí chọn theo nhu cầu.`;

  return createPageMetadata({
    title: `Deal ${category.name}: gợi ý và tiêu chí chọn`,
    description,
    path: `/danh-muc/${encodeURIComponent(category.id)}`,
  });
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const [categories, deals, activeCoupons, products] = await Promise.all([
    getCategories(),
    getDeals(),
    getActiveCoupons(new Date()),
    getShoppingProducts(),
  ]);
  const category = categories.find((item) => item.id === slug);
  if (!category) notFound();
  const categoryDeals = deals.filter((deal) => deal.category === category.name);
  const categoryCoupons = activeCoupons.filter((coupon) => isCouponRelevantToCategory(coupon, category.id)).slice(0, 3);
  const notes = categoryNotes[category.name] || { question: 'Món này có phù hợp nhu cầu của bạn?', tips: ['Xem thông tin sản phẩm', 'Kiểm tra người bán', 'Đối chiếu giá cuối'] };
  const shoppingCategory = slug === 'lam-dep' ? 'cham-soc' : slug;
  const categoryProducts = products.filter((product) => product.category === shoppingCategory);

  return (
    <main>
      <nav className="breadcrumbs page-shell" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>›</span><Link href="/danh-muc">Danh mục</Link><span>›</span><strong>{category.name}</strong></nav>
      <section className={`category-detail-hero ${category.tone}`}>
        <div className="page-shell"><div className="category-detail-icon">{category.icon}</div><div><p className="eyebrow">{category.count} gợi ý đang theo dõi</p><h1>{category.name}</h1><p>{category.copy}. Xem nhanh deal, mã phù hợp và bộ tiêu chí nên kiểm tra trước khi mua.</p></div></div>
      </section>

      {categoryProducts.length > 0 && <section className="related-section page-shell"><div className="section-title"><h2>Sản phẩm {category.name}</h2><Link href={`/san-pham?category=${shoppingCategory}`}>Xem tất cả ({categoryProducts.length}) →</Link></div><div className="affiliate-product-grid">{categoryProducts.slice(0, 8).map((product) => <ShoppingProductCard key={product.id} product={product} />)}</div></section>}
      <section className="related-section page-shell"><div className="section-title"><div><p className="eyebrow">Gợi ý đọc thêm</p><h2>Chọn sản phẩm {category.name}</h2></div><Link href={`/san-pham?category=${shoppingCategory}`}>Tìm thêm <span>→</span></Link></div>{categoryDeals.length ? <div className="deal-grid">{categoryDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)}</div> : <div className="empty-state"><h3>Khám phá thêm trong mục Sản phẩm</h3><Link href="/san-pham">Mở danh sách →</Link></div>}</section>

      <section className="category-guide page-shell"><div><p className="eyebrow">Câu hỏi mở đầu</p><h2>{notes.question}</h2></div><div className="category-tips">{notes.tips.map((tip, index) => <span key={tip}><b>0{index + 1}</b>{tip}</span>)}</div></section>

      <section className="category-coupons"><div className="page-shell"><div className="section-title"><div><p className="eyebrow">Mã nên kiểm tra thêm</p><h2>Đối chiếu điều kiện trước khi chốt</h2></div><Link href="/ma-giam-gia">Kho mã <span>→</span></Link></div>{categoryCoupons.length ? <div className="voucher-grid">{categoryCoupons.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} status="active" />)}</div> : <div className="empty-state"><span>i</span><h3>Chưa có mã đã đối chiếu</h3><p>Xem Kho mã để mở nguồn Shopee chính thức.</p></div>}</div></section>
    </main>
  );
}
