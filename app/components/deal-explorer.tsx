'use client';

import { useMemo, useState } from 'react';
import type { Category, Deal } from '@/app/lib/catalog';
import { normalizeSearch } from '@/app/lib/storefront';
import { DealCard } from './deal-card';
import { UiIcon } from './iconography';

export function DealExplorer({
  categories,
  deals,
  initialQuery = '',
}: {
  categories: readonly Category[];
  deals: readonly Deal[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('Tất cả');
  const [sort, setSort] = useState('Nổi bật');
  const categoryNames = useMemo(
    () => ['Tất cả', ...categories.map((item) => item.name)],
    [categories],
  );

  const visibleDeals = useMemo(() => {
    const keyword = normalizeSearch(query);
    const filtered = deals.filter((deal) => {
      const matchesCategory = category === 'Tất cả' || deal.category === category;
      const searchable = normalizeSearch(`${deal.name} ${deal.description} ${deal.category} ${deal.brand} ${deal.model}`);
      return matchesCategory && (!keyword || searchable.includes(keyword));
    });
    const price = (deal: Deal) => Number(deal.price.replace(/\D/g, ''));
    if (sort === 'Giá tăng dần') return [...filtered].sort((a, b) => price(a) - price(b));
    if (sort === 'Giá giảm dần') return [...filtered].sort((a, b) => price(b) - price(a));
    return filtered;
  }, [category, deals, query, sort]);

  return (
    <>
      <div className="explorer-panel deal-search-panel">
        <label className="big-search">
          <UiIcon name="search" />
          <span className="sr-only">Tìm deal</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Bạn đang muốn mua gì?" />
        </label>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sắp xếp deal"><option>Nổi bật</option><option>Giá tăng dần</option><option>Giá giảm dần</option></select>
      </div>
      <div className="filter-chips spacious" role="group" aria-label="Lọc deal theo danh mục">{categoryNames.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="result-summary"><strong>{visibleDeals.length}</strong> deal phù hợp <span>· Giá chỉ mang tính tham khảo</span></div>
      {visibleDeals.length ? <div className="deal-grid">{visibleDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)}</div> : <div className="empty-state"><UiIcon name="search" /><h3>Chưa có deal phù hợp</h3><p>Thử từ khóa khác hoặc chọn lại “Tất cả”.</p></div>}
    </>
  );
}
