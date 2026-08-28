'use client';

import { useMemo, useState } from 'react';
import { CouponCard } from './coupon-card';
import { coupons } from '@/app/lib/catalog';
import { UiIcon } from './iconography';

const filters = ['Tất cả', 'Freeship', 'Toàn sàn', 'Theo ngành', 'Tài khoản mới', 'Mã của shop'];

export function CouponExplorer() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Tất cả');

  const visibleCoupons = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    return coupons.filter((coupon) => {
      const matchesFilter = filter === 'Tất cả' || coupon.category === filter;
      const searchable = `${coupon.code} ${coupon.title} ${coupon.description} ${coupon.badge}`.toLocaleLowerCase('vi');
      return matchesFilter && (!keyword || searchable.includes(keyword));
    });
  }, [filter, query]);

  return (
    <>
      <div className="explorer-panel coupon-search-panel">
        <label className="big-search">
          <UiIcon name="search" />
          <span className="sr-only">Tìm mã giảm giá</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Tìm FREESHIP, mỹ phẩm, công nghệ..." />
        </label>
        <div className="filter-chips" role="group" aria-label="Lọc mã giảm giá">
          {filters.map((item) => <button type="button" key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
      </div>
      <div className="result-summary"><strong>{visibleCoupons.length}</strong> mã phù hợp <span>· Cập nhật minh họa hôm nay</span></div>
      {visibleCoupons.length ? <div className="voucher-list">{visibleCoupons.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)}</div> : <div className="empty-state"><UiIcon name="search" /><h3>Không thấy mã phù hợp</h3><p>Thử từ khóa ngắn hơn hoặc chọn lại “Tất cả”.</p></div>}
    </>
  );
}
