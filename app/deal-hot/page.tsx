import type { Metadata } from 'next';
import { DealExplorer } from '@/app/components/deal-explorer';
import { createPageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Deal hot Shopee đáng cân nhắc',
  description:
    'Khám phá gợi ý deal Shopee theo từ khóa và danh mục; so sánh giá tham khảo, đánh giá và tiêu chí cần kiểm tra trước khi mở sàn.',
  path: '/deal-hot',
});

export default async function DealPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  return (
    <main>
      <section className="subpage-hero deal-hero"><div className="page-shell"><span className="hero-kicker"><b>🔥 DEAL HOT</b> Giá tốt có lý do</span><h1>Đang giảm sâu.<br /><em>Đừng chọn vội.</em></h1><p>Tìm theo sản phẩm hoặc ngành hàng, sau đó so sánh mức giá, đánh giá và lượng bán trước khi mở Shopee.</p></div></section>
      <section className="listing-section page-shell"><DealExplorer initialQuery={q} /></section>
    </main>
  );
}
