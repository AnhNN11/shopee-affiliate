import type { Metadata } from 'next';
import { DealExplorer } from '@/app/components/deal-explorer';
import { createPageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Deal hot Shopee đáng cân nhắc',
  description:
    'Khám phá gợi ý sản phẩm có ảnh và thông số đối chiếu từ trang hãng; so sánh giá tham khảo và tiêu chí cần kiểm tra trước khi mở Shopee.',
  path: '/deal-hot',
});

export default async function DealPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  return (
    <main>
      <section className="subpage-hero deal-hero"><div className="page-shell"><span className="hero-kicker"><b>DEAL ĐÃ LỌC</b> Giá tốt có lý do</span><h1>Deal Shopee đáng cân nhắc.</h1><p>Tìm theo hãng, model hoặc ngành hàng; xem nguồn thông tin và các tiêu chí cần kiểm tra trước khi mở Shopee.</p></div></section>
      <section className="listing-section page-shell"><DealExplorer initialQuery={q} /></section>
    </main>
  );
}
