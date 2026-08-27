'use client';

import { useMemo, useState } from 'react';
import { categories, deals } from '@/app/lib/catalog';
import { DealCard } from './deal-card';

const categoryNames = ['Tất cả', ...categories.map((category) => category.name)];

export function DealExplorer({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('Tất cả');
  const [sort, setSort] = useState('Nổi bật');

  const visibleDeals = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    const filtered = deals.filter((deal) => {
      const matchesCategory = category === 'Tất cả' || deal.category === category;
      const searchable = `${deal.name} ${deal.description} ${deal.category} ${deal.badge}`.toLocaleLowerCase('vi');
      return matchesCategory && (!keyword || searchable.includes(keyword));
    });
    if (sort === 'Giảm nhiều') return [...filtered].sort((a, b) => Number(b.discount.replace(/\D/g, '')) - Number(a.discount.replace(/\D/g, '')));
    if (sort === 'Bán chạy') return [...filtered].sort((a, b) => Number.parseFloat(b.sold.replace(',', '.')) - Number.parseFloat(a.sold.replace(',', '.')));
    return filtered;
  }, [category, query, sort]);

  return (
    <>
      <div className="explorer-panel deal-search-panel">
        <label className="big-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Tìm deal</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Bạn đang muốn mua gì?" />
        </label>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sắp xếp deal"><option>Nổi bật</option><option>Giảm nhiều</option><option>Bán chạy</option></select>
      </div>
      <div className="filter-chips spacious" aria-label="Lọc deal theo danh mục">{categoryNames.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="result-summary"><strong>{visibleDeals.length}</strong> deal phù hợp <span>· Giá chỉ mang tính tham khảo</span></div>
      {visibleDeals.length ? <div className="deal-grid">{visibleDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)}</div> : <div className="empty-state"><span>🔎</span><h3>Chưa có deal phù hợp</h3><p>Thử từ khóa khác hoặc chọn lại “Tất cả”.</p></div>}
    </>
  );
}
