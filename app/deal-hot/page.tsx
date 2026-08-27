import type { Metadata } from 'next';
import { DealExplorer } from '@/app/components/deal-explorer';

export const metadata: Metadata = {
  title: 'Deal hot đa ngành — Chọn Chuẩn',
  description: 'Tìm deal theo từ khóa, danh mục và mức độ nổi bật.',
};

export default async function DealPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  return (
    <main>
      <section className="subpage-hero deal-hero"><div className="page-shell"><span className="hero-kicker"><b>🔥 DEAL HOT</b> Giá tốt có lý do</span><h1>Đang giảm sâu.<br /><em>Đừng chọn vội.</em></h1><p>Tìm theo sản phẩm hoặc ngành hàng, sau đó so sánh mức giá, đánh giá và lượng bán trước khi mở Shopee.</p></div></section>
      <section className="listing-section page-shell"><DealExplorer initialQuery={q} /></section>
    </main>
  );
}

