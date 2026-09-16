import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductExplorer } from '@/app/components/product-explorer';
import { getShoppingProducts } from '@/app/lib/data';
import { parseShoppingFilters, shoppingPage } from '@/app/lib/storefront';
import { createPageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = createPageMetadata({ title: 'Sản phẩm — Tìm món phù hợp, chọn giá vừa túi', description: 'Khám phá sản phẩm theo nhu cầu, lọc khoảng giá, xem mã giảm giá và đến Shopee để mua hàng.', path: '/san-pham' });
export const revalidate = 60;

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseShoppingFilters(await searchParams);
  const result = shoppingPage(await getShoppingProducts(), filters);
  return <main><section className="subpage-hero affiliate-hero"><div className="page-shell"><span className="hero-kicker"><b>GÓC MUA SẮM</b> Món cần tìm, giá vừa túi</span><h1>Chọn món bạn cần.</h1><p>Từ đồ dùng mỗi ngày đến phụ kiện công nghệ. Tìm theo nhu cầu, so giá tham khảo và xem lựa chọn trên Shopee.</p><Link className="primary-button" href="/ma-giam-gia">Lấy mã trước khi mua →</Link></div></section><section className="listing-section page-shell"><ProductExplorer result={result} filters={filters} /></section></main>;
}
