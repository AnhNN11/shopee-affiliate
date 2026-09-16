import Link from 'next/link';
import { createPageMetadata } from '@/app/lib/seo';
export const metadata = createPageMetadata({ title: 'Hướng dẫn mua hàng & hỗ trợ', description: 'Cách chọn sản phẩm, dùng voucher, đặt hàng và tìm hỗ trợ giao hàng, đổi trả.', path: '/huong-dan-mua-hang' });
export default function ShoppingHelp() {
  return <main><section className="subpage-hero"><div className="page-shell"><span className="hero-kicker">MUA SẮM CÙNG CHỌN CHUẨN</span><h1>Từ chọn món đến nhận hàng.</h1><p>Khám phá tại Chọn Chuẩn, đặt hàng và thanh toán trên Shopee.</p><Link className="primary-button" href="/san-pham">Khám phá sản phẩm →</Link></div></section><section className="help-content page-shell">
    <article><h2>Mua hàng trong 3 bước</h2><ol><li>Tìm sản phẩm theo tên, danh mục và ngân sách. Xem thông tin chi tiết và giá tham khảo.</li><li>Mở <Link href="/ma-giam-gia">kho voucher</Link>, đọc điều kiện và lưu hoặc sao chép mã phù hợp.</li><li>Chọn “Xem giá trên Shopee” hoặc “Tìm trên Shopee”. Chọn người bán, phân loại, áp mã và thanh toán tại Shopee.</li></ol></article>
    <article><h2>Đơn hàng của tôi ở đâu?</h2><p>Chọn Chuẩn không thu tiền và không lưu đơn hàng. Xem trạng thái, địa chỉ giao và yêu cầu hỗ trợ trong mục Đơn mua của tài khoản Shopee đã đặt hàng.</p></article>
    <article><h2>Giao hàng, bảo hành và đổi trả</h2><p>Kiểm tra phí vận chuyển, ngày giao dự kiến và chính sách áp dụng ngay trên trang sản phẩm hoặc trang thanh toán Shopee. Khi có vấn đề, liên hệ người bán hoặc mở yêu cầu hỗ trợ từ đơn hàng trên Shopee.</p><a href="https://help.shopee.vn/portal/4" target="_blank" rel="noopener noreferrer">Trung tâm trợ giúp Shopee ↗</a></article>
    <article><h2>Vì sao giá hoặc mã khác với trên web?</h2><p>Giá hiển thị là giá tham khảo ở lần cập nhật gần nhất. Phân loại, số lượng, tài khoản, địa chỉ nhận hàng và lượt voucher còn lại có thể làm thay đổi số tiền cuối cùng.</p></article>
    <article><h2>Góp ý về sản phẩm hoặc liên kết</h2><p>Gửi tên sản phẩm và đường dẫn bị lỗi để Chọn Chuẩn kiểm tra.</p><a className="primary-button" href="https://www.facebook.com/profile.php?id=61594614350072" target="_blank" rel="noopener noreferrer">Liên hệ qua Facebook ↗</a></article>
  </section></main>;
}
