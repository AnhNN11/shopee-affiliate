'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/san-pham', label: 'Sản phẩm Affiliate' },
  { href: '/ma-giam-gia', label: 'Mã giảm giá' },
  { href: '/deal-hot', label: 'Deal đã lọc' },
  { href: '/danh-muc', label: 'Danh mục' },
  { href: '/cach-chon', label: 'Cách chọn' },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="commerce-nav" aria-label="Điều hướng chính">
      <div className="page-shell">
        {navItems.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return <Link href={item.href} key={item.href} aria-current={active ? 'page' : undefined}>{item.label}</Link>;
        })}
      </div>
    </nav>
  );
}
