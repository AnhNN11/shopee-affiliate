import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CouponCard } from '@/app/components/coupon-card';
import { CopyCodeButton } from '@/app/components/copy-code-button';
import { coupons } from '@/app/lib/catalog';
import { createNotFoundMetadata, createPageMetadata } from '@/app/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return coupons.map((coupon) => ({ slug: coupon.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const coupon = coupons.find((item) => item.id === slug);
  if (!coupon) return createNotFoundMetadata('Không tìm thấy mã giảm giá');

  return createPageMetadata({
    title: `${coupon.code}: hướng dẫn kiểm tra mã giảm giá`,
    description: `${coupon.title}. ${coupon.description} Dữ liệu mã và điều kiện mang tính minh họa; hãy kiểm tra lại tại Shopee.`,
    path: `/ma-giam-gia/${encodeURIComponent(coupon.id)}`,
  });
}

export default async function CouponDetailPage({ params }: Props) {
  const { slug } = await params;
  const coupon = coupons.find((item) => item.id === slug);
  if (!coupon) notFound();
  const related = coupons.filter((item) => item.category === coupon.category && item.id !== coupon.id).slice(0, 2);

  return (
    <main>
      <div className="breadcrumbs page-shell"><Link href="/">Trang chủ</Link><span>›</span><Link href="/ma-giam-gia">Mã giảm giá</Link><span>›</span><strong>{coupon.code}</strong></div>
      <section className="coupon-detail page-shell">
        <div className={`coupon-detail-ticket ${coupon.kind}`}>
          <span className="ticket-icon">{coupon.kind === 'hot' ? '🔥' : coupon.kind === 'sale' ? '%' : '🎟'}</span>
          <small>{coupon.badge}</small>
          <strong>{coupon.discount}</strong>
          <p>{coupon.code}</p>
          <div className="ticket-cut top" /><div className="ticket-cut bottom" />
        </div>
        <div className="coupon-detail-copy">
          <span className={`status-badge ${coupon.kind}`}>{coupon.badge}</span>
          <h1>{coupon.title}</h1>
          <p>{coupon.description}</p>
          <div className="coupon-conditions"><div><small>Đơn tối thiểu</small><strong>{coupon.minSpend}</strong></div><div><small>Thời hạn</small><strong>{coupon.expires}</strong></div><div><small>Nhóm ưu đãi</small><strong>{coupon.category}</strong></div></div>
          <div className="coupon-actions"><CopyCodeButton code={coupon.code} /><a className="shopee-button" href={coupon.url} target="_blank" rel="sponsored nofollow noopener noreferrer">Dùng mã trên Shopee <span>↗</span></a></div>
          <p className="affiliate-inline">Điều kiện thực tế có thể khác theo tài khoản, shop và thời điểm thanh toán.</p>
        </div>
      </section>

      <section className="coupon-steps page-shell"><div><span>01</span><h2>Sao chép mã</h2><p>Bấm nút sao chép để lưu chính xác chuỗi mã.</p></div><div><span>02</span><h2>Mở Shopee</h2><p>Thêm sản phẩm đủ điều kiện vào giỏ hàng.</p></div><div><span>03</span><h2>Kiểm tra giá cuối</h2><p>Áp mã và xác nhận số tiền thật sự được giảm.</p></div></section>
      <section className="terms-box page-shell"><div><span>i</span><h2>Điều kiện cần nhớ</h2></div><ul><li>Mã có thể hết lượt trước thời hạn hiển thị.</li><li>Một số sản phẩm hoặc gian hàng có thể không tham gia.</li><li>Luôn kiểm tra tổng thanh toán cuối cùng trước khi đặt hàng.</li></ul></section>

      {related.length > 0 && <section className="related-section page-shell"><div className="section-title"><div><p className="eyebrow">Cùng loại ưu đãi</p><h2>Mã liên quan</h2></div><Link href="/ma-giam-gia">Tất cả mã <span>→</span></Link></div><div className="voucher-grid">{related.map((item) => <CouponCard key={item.id} coupon={item} />)}</div></section>}
    </main>
  );
}
