import type { Metadata } from 'next';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chọn Chuẩn — Mã giảm giá và deal đáng tiền',
  description: 'Tổng hợp mã giảm giá, deal đa ngành và hướng dẫn mua sắm có chọn lọc.',
  openGraph: {
    title: 'Chọn Chuẩn — Mã giảm giá và deal đáng tiền',
    description: 'Tổng hợp mã giảm giá, deal đa ngành và hướng dẫn mua sắm có chọn lọc.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chọn Chuẩn — Mã giảm giá và deal đáng tiền',
    description: 'Tổng hợp mã giảm giá, deal đa ngành và hướng dẫn mua sắm có chọn lọc.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
