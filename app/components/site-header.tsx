import Image from 'next/image';
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
      <div className="commerce-announcement">
        <div className="announcement-inner page-shell">
          <span className="announcement-item">
            <span className="pulse-dot" aria-hidden="true" />
            Mã mới được cập nhật mỗi ngày
          </span>
          <span className="announcement-item">Dữ liệu hiện là bản thử nghiệm</span>
        </div>
      </div>
      <header className="commerce-header">
        <div className="header-main page-shell">
          <Link className="brand commerce-brand" href="/" aria-label="Chọn Chuẩn - Trang chủ">
            <Image
              className="brand-logo"
              src="/chon-chuan-logo-v2.svg"
              width={150}
              height={32}
              alt=""
              aria-hidden="true"
              unoptimized
              loading="eager"
            />
          </Link>

          <form className="header-search" action="/deal-hot" role="search">
            <label className="sr-only" htmlFor="site-search">Tìm sản phẩm hoặc mã giảm giá</label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Tìm sản phẩm, ngành hàng hoặc mã giảm giá"
            />
            <button type="submit" aria-label="Tìm kiếm">
              <span aria-hidden="true">⌕</span>
              <span>Tìm kiếm</span>
            </button>
          </form>

          <div className="header-actions">
            <Link className="header-action" href="/ma-giam-gia">
              <span className="header-action-icon" aria-hidden="true">🎟</span>
              <span><small>Kho mã</small><b>Mã giảm giá</b></span>
            </Link>
            <Link className="header-action hot" href="/deal-hot">
              <span className="header-action-icon" aria-hidden="true">🔥</span>
              <span><small>Hôm nay</small><b>Deal hot</b></span>
            </Link>
          </div>
        </div>

        <nav className="commerce-nav" aria-label="Điều hướng chính">
          <div className="page-shell">
            {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </div>
        </nav>
      </header>
    </>
  );
}
