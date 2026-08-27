import type { Metadata } from 'next';
import Link from 'next/link';
import { categories, deals } from '@/app/lib/catalog';

export const metadata: Metadata = {
  title: 'Danh mục mua sắm — Chọn Chuẩn',
  description: 'Khám phá gợi ý mua sắm theo từng ngành hàng.',
};

export default function CategoriesPage() {
  return (
    <main>
      <section className="subpage-hero category-hero"><div className="page-shell"><span className="hero-kicker"><b>⌘ DANH MỤC</b> Mỗi nhu cầu một lối đi</span><h1>Đi đúng ngành.<br /><em>Đỡ mất thời gian.</em></h1><p>Chọn nhóm bạn đang quan tâm để xem sản phẩm, khoảng giá và những tiêu chí cần kiểm tra trước khi mua.</p></div></section>
      <section className="category-directory page-shell">
        {categories.map((category, index) => {
          const examples = deals.filter((deal) => deal.category === category.name).slice(0, 2);
          return (
            <article className={`directory-card ${category.tone}`} key={category.name}>
              <div className="directory-number">0{index + 1}</div>
              <div className="directory-icon">{category.icon}</div>
              <div className="directory-copy"><p className="eyebrow">{category.count} gợi ý</p><h2>{category.name}</h2><p>{category.copy}. Nội dung tập trung vào lựa chọn thực tế, dễ so sánh và vừa ngân sách.</p><div className="example-tags">{examples.map((deal) => <span key={deal.id}>{deal.icon} {deal.name}</span>)}</div></div>
              <Link href={`/deal-hot?q=${encodeURIComponent(category.name)}`}>Xem deal {category.name} <span>→</span></Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}

