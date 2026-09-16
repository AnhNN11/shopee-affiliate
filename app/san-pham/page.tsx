import type { Metadata } from 'next';
import { ProductExplorer } from '@/app/components/product-explorer';
import { getAffiliateProductPage } from '@/app/lib/data';
import { createPageMetadata } from '@/app/lib/seo';
import type { CommissionProgram, ProductSort } from '@/app/lib/products';

export const metadata: Metadata = createPageMetadata({ title: 'Sản phẩm Shopee Affiliate', description: 'Danh sách sản phẩm thuộc chương trình Hoa hồng Shopee và Hoa hồng Xtra, đồng bộ từ trang Shopee Affiliate.', path: '/san-pham' });
export const revalidate = 60;

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?:string; program?:string; sort?:string; page?:string }> }) {
  const params = await searchParams;
  const query = params.q?.slice(0,100).trim() || '';
  const program: 'all' | CommissionProgram = params.program === 'xtra' || params.program === 'shopee' ? params.program : 'all';
  const sort: ProductSort = params.sort === 'commission' || params.sort === 'sales' ? params.sort : 'rank';
  const page = Math.max(1, Number.parseInt(params.page || '1',10) || 1);
  const result = await getAffiliateProductPage({ query, program, sort, page, pageSize:24 });
  return <main><section className="subpage-hero affiliate-hero"><div className="page-shell"><span className="hero-kicker"><b>SẢN PHẨM AFFILIATE</b> Đồng bộ từ Shopee</span><h1>Hoa hồng Shopee và Xtra.</h1><p>{result.total} sản phẩm phù hợp. Hoa hồng Shopee và Xtra được lưu riêng khi nguồn cung cấp đủ dữ liệu.</p></div></section><section className="listing-section page-shell"><ProductExplorer result={result} query={query} program={program} sort={sort} /></section></main>;
}
