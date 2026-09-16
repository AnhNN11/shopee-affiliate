import Image from 'next/image';
import Link from 'next/link';
import { affiliateDisclosure } from '@/app/lib/affiliate';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" href="/" aria-label="Chọn Chuẩn - Trang chủ">
            <Image
              className="brand-logo"
              src="/chon-chuan-logo-v2.svg"
              width={150}
              height={32}
              alt=""
              aria-hidden="true"
              unoptimized
            />
          </Link>
          <p className="footer-note">Mua ít nhiễu hơn.<br />Chọn có căn cứ hơn.</p>
        </div>

        <nav className="footer-links" aria-label="Điều hướng chân trang">
          <span>Khám phá</span>
          <Link href="/san-pham">Tất cả sản phẩm</Link>
          <Link href="/ma-giam-gia">Mã giảm giá</Link>
          <Link href="/deal-hot">Deal đã lọc</Link>
          <Link href="/danh-muc">Danh mục</Link>
          <Link href="/cach-chon">Cách chúng tôi chọn</Link>
          <Link href="/huong-dan-mua-hang">Mua hàng, giao hàng & đổi trả</Link>
          <Link href="/quyen-rieng-tu">Quyền riêng tư</Link>
          <a href="https://www.facebook.com/profile.php?id=61594614350072" target="_blank" rel="noopener noreferrer">Facebook Chọn Chuẩn ↗</a>
        </nav>

        <div className="footer-editorial">
          <span>Cam kết biên tập</span>
          <p className="affiliate-note">{affiliateDisclosure} Website độc lập và không phải trang chính thức của Shopee.</p>
        </div>
      </div>

      <div className="footer-bottom page-shell">
        <span>Thông tin giá và ưu đãi có thể thay đổi theo thời điểm.</span>
        <span className="copyright">© 2026 Chọn Chuẩn</span>
      </div>
    </footer>
  );
}
