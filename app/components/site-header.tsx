import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/ma-giam-gia', label: 'Mã giảm giá' },
  { href: '/deal-hot', label: 'Deal hot' },
  { href: '/danh-muc', label: 'Danh mục' },
  { href: '/cach-chon', label: 'Cách chọn' },
];

export function SiteHeader() {
  return (
    <>
      <div className="announcement">
        <span className="pulse-dot" /> Mã mới được cập nhật mỗi ngày · Dữ liệu hiện là bản thử nghiệm
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Chọn Chuẩn - Trang chủ">
          <span className="brand-mark">C</span>
          <span>CHỌN CHUẨN</span>
        </Link>
        <nav className="main-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="header-cta" href="/deal-hot"><span>🔥</span> Săn deal</Link>
      </header>
    </>
  );
}

