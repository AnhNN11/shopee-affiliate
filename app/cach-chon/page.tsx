import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Cách Chọn Chuẩn lọc deal và sản phẩm',
  description:
    'Xem quy trình 5 bước để xác định nhu cầu, so sánh cùng phân khúc, đọc đánh giá, kiểm tra người bán và tính giá cuối cùng.',
  path: '/cach-chon',
});

const steps = [
  { number: '01', icon: '◎', title: 'Bắt đầu từ nhu cầu', copy: 'Xác định mục đích sử dụng, ngân sách và ba tiêu chí quan trọng nhất. Không bắt đầu bằng thương hiệu hay mức giảm.' },
  { number: '02', icon: '⌁', title: 'So sánh cùng phân khúc', copy: 'Đặt các sản phẩm có giá và tính năng tương đương cạnh nhau để thấy đâu là khác biệt thực sự.' },
  { number: '03', icon: '★', title: 'Đọc đánh giá gần đây', copy: 'Ưu tiên phản hồi có hình, nội dung cụ thể và cập nhật mới; không chỉ nhìn vào điểm trung bình.' },
  { number: '04', icon: '✓', title: 'Kiểm tra người bán', copy: 'Xem lịch sử hoạt động, tỷ lệ phản hồi, chính sách đổi trả và bảo hành trước khi đề xuất.' },
  { number: '05', icon: '%', title: 'Tính giá cuối cùng', copy: 'Cộng phí vận chuyển, trừ mã hợp lệ và so lại với giá thường để tránh “giảm ảo”.' },
];

export default function MethodPage() {
  return (
    <main>
      <section className="subpage-hero method-hero"><div className="page-shell"><span className="hero-kicker"><b>MINH BẠCH</b> Lý do đứng sau mỗi gợi ý</span><h1>Cách Chọn Chuẩn lọc deal.</h1><p>Một deal chỉ đáng tiền khi sản phẩm đúng nhu cầu, người bán đáng tin và giá cuối cùng thật sự tốt.</p></div></section>
      <section className="method-page page-shell"><div className="method-intro-panel"><p className="eyebrow">Quy trình 5 bước</p><h2>Từ nhu cầu đến nút “Mua ngay”.</h2><p>Đây là bộ lọc nội dung Chọn Chuẩn dùng trước khi đưa một sản phẩm vào danh sách gợi ý.</p></div><div className="method-timeline">{steps.map((step) => <article key={step.number}><div className="timeline-number">{step.number}</div><div className="timeline-icon">{step.icon}</div><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div></section>
      <section className="transparency-box page-shell"><div><p className="eyebrow">Affiliate nhưng phải rõ ràng</p><h2>Bạn không trả thêm tiền.</h2></div><p>Khi bạn mua qua liên kết giới thiệu, Chọn Chuẩn có thể nhận một khoản hoa hồng từ nền tảng. Khoản này không làm tăng giá của bạn và không thay đổi tiêu chí chọn sản phẩm.</p><Link className="primary-button" href="/deal-hot">Xem deal đã lọc</Link></section>
    </main>
  );
}
