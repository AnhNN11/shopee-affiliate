import type { Metadata } from 'next';
import { CouponExplorer } from '@/app/components/coupon-explorer';

export const metadata: Metadata = {
  title: 'Mã giảm giá Shopee — Chọn Chuẩn',
  description: 'Tìm, lọc và sao chép mã giảm giá theo nhu cầu mua sắm.',
};

export default function CouponPage() {
  return (
    <main>
      <section className="subpage-hero coupon-hero">
        <div className="page-shell"><span className="hero-kicker"><b>🎟 KHO MÃ</b> Tìm nhanh · Đọc rõ điều kiện</span><h1>Mã giảm giá,<br /><em>không cần mò.</em></h1><p>Tìm theo tên mã, ngành hàng hoặc loại ưu đãi. Sao chép mã rồi kiểm tra điều kiện cuối cùng tại Shopee.</p></div>
      </section>
      <section className="content-with-aside page-shell">
        <div className="main-content"><CouponExplorer /></div>
        <aside className="guide-card"><span className="guide-icon">?</span><h2>Dùng mã thế nào?</h2><ol><li><span>1</span><p><strong>Tìm mã phù hợp</strong>Đọc mức giảm, đơn tối thiểu và thời hạn.</p></li><li><span>2</span><p><strong>Sao chép mã</strong>Bấm nút sao chép ngay trên thẻ.</p></li><li><span>3</span><p><strong>Kiểm tra tại Shopee</strong>Điều kiện có thể khác theo tài khoản.</p></li></ol><div className="aside-note">Mã trên trang hiện là dữ liệu minh họa cho bản thử nghiệm.</div></aside>
      </section>
    </main>
  );
}

