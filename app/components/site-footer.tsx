import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/"><span className="brand-mark">C</span><span>CHỌN CHUẨN</span></Link>
        <p className="footer-note">Mã dễ tìm, deal dễ chọn, điều kiện dễ hiểu.</p>
      </div>
      <div className="footer-links">
        <Link href="/ma-giam-gia">Mã giảm giá</Link>
        <Link href="/deal-hot">Deal hot</Link>
        <Link href="/danh-muc">Danh mục</Link>
        <Link href="/cach-chon">Cách chọn</Link>
      </div>
      <p className="affiliate-note">Minh bạch Affiliate: Chọn Chuẩn có thể nhận hoa hồng khi bạn mua hàng qua liên kết giới thiệu. Bạn không trả thêm chi phí. Website này độc lập và không phải trang chính thức của Shopee.</p>
      <span className="copyright">© 2026 Chọn Chuẩn</span>
    </footer>
  );
}

