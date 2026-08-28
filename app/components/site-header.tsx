import Image from 'next/image';
import Link from 'next/link';
import { UiIcon } from './iconography';
import { SiteNav } from './site-nav';

export function SiteHeader() {
  return (
    <>
      <div className="commerce-announcement">
        <div className="announcement-inner page-shell">
          <span className="announcement-item">
            <span className="pulse-dot" aria-hidden="true" />
            Bản tin mua sắm có biên tập
          </span>
          <span className="announcement-item">Luôn kiểm tra giá và điều kiện ở bước thanh toán</span>
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
            <label className="sr-only" htmlFor="site-search">Tìm deal theo sản phẩm hoặc ngành hàng</label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Tìm deal theo sản phẩm hoặc ngành hàng"
            />
            <button type="submit" aria-label="Tìm kiếm">
              <UiIcon name="search" />
              <span>Tìm kiếm</span>
            </button>
          </form>

          <div className="header-actions">
            <Link className="header-action" href="/ma-giam-gia">
              <span className="header-action-icon"><UiIcon name="ticket" /></span>
              <span><small>Kho mã</small><b>Mã giảm giá</b></span>
            </Link>
            <Link className="header-action hot" href="/deal-hot">
              <span className="header-action-icon"><UiIcon name="spark" /></span>
              <span><small>Đáng chú ý</small><b>Deal đã lọc</b></span>
            </Link>
          </div>
        </div>

        <SiteNav />
      </header>
    </>
  );
}
