import type { Metadata } from 'next';
import { CouponExplorer } from '@/app/components/coupon-explorer';
import { createPageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Mã giảm giá Shopee: tìm và kiểm tra điều kiện',
  description:
    'Tìm và sao chép các mã giảm giá Shopee minh họa theo loại ưu đãi; luôn kiểm tra điều kiện và mức giảm thực tế tại bước thanh toán.',
  path: '/ma-giam-gia',
});

export default function CouponPage() {
  return (
    <main>
      <section className="subpage-hero coupon-hero">
        <div className="page-shell"><span className="hero-kicker"><b>KHO MÃ</b> Tìm nhanh · Đọc rõ điều kiện</span><h1>Mã giảm giá Shopee.</h1><p>Tìm theo tên mã, ngành hàng hoặc loại ưu đãi. Sao chép mã rồi kiểm tra điều kiện cuối cùng tại Shopee.</p></div>
      </section>
      <section className="content-with-aside page-shell">
        <div className="main-content"><CouponExplorer /></div>
        <aside className="guide-card"><span className="guide-icon">?</span><h2>Dùng mã thế nào?</h2><ol><li><span>1</span><p><strong>Tìm mã phù hợp</strong>Đọc mức giảm, đơn tối thiểu và thời hạn.</p></li><li><span>2</span><p><strong>Sao chép mã</strong>Bấm nút sao chép ngay trên thẻ.</p></li><li><span>3</span><p><strong>Kiểm tra tại Shopee</strong>Điều kiện có thể khác theo tài khoản.</p></li></ol><div className="aside-note">Mã trên trang hiện là dữ liệu minh họa cho bản thử nghiệm.</div></aside>
      </section>
    </main>
  );
}
