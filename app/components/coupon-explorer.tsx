'use client';

import { useEffect, useMemo, useState } from 'react';
import { CouponCard } from './coupon-card';
import {
  formatCouponScope,
  formatVerifiedDate,
  getCouponStatus,
  type CouponRecord,
} from '@/app/lib/coupons';
import { UiIcon } from './iconography';

export function CouponExplorer({ coupons, initialNow }: { coupons: readonly CouponRecord[]; initialNow: string }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Tất cả');
  const [now, setNow] = useState(() => Date.parse(initialNow));

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const filters = useMemo(
    () => ['Tất cả', ...new Set(coupons.map((coupon) => formatCouponScope(coupon.scope)))],
    [coupons],
  );

  const visibleCoupons = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    return coupons.flatMap((coupon) => {
      const status = getCouponStatus(coupon, now);
      const scope = formatCouponScope(coupon.scope);
      const matchesFilter = filter === 'Tất cả' || scope === filter;
      const searchable = `${coupon.code} ${coupon.title} ${coupon.description} ${coupon.badge} ${coupon.sourceName} ${scope}`.toLocaleLowerCase('vi');
      return status !== 'expired' && matchesFilter && (!keyword || searchable.includes(keyword))
        ? [{ coupon, status }]
        : [];
    });
  }, [coupons, filter, now, query]);

  const latestVerifiedAt = useMemo(
    () => coupons.reduce<string | undefined>((latest, coupon) => {
      if (!latest || Date.parse(coupon.verifiedAt) > Date.parse(latest)) return coupon.verifiedAt;
      return latest;
    }, undefined),
    [coupons],
  );

  return (
    <>
      <div className="explorer-panel coupon-search-panel">
        <label className="big-search">
          <UiIcon name="search" />
          <span className="sr-only">Tìm mã giảm giá</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Tìm theo mã hoặc loại ưu đãi..." />
        </label>
        <div className="filter-chips" role="group" aria-label="Lọc mã giảm giá">
          {filters.map((item) => <button type="button" key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
      </div>
      <div className="result-summary"><strong>{visibleCoupons.length}</strong> mã phù hợp {latestVerifiedAt ? <span>· Kiểm tra gần nhất {formatVerifiedDate(latestVerifiedAt)}</span> : null}</div>
      {visibleCoupons.length ? <div className="voucher-list">{visibleCoupons.map(({ coupon, status }) => <CouponCard key={coupon.id} coupon={coupon} status={status} />)}</div> : <div className="empty-state"><UiIcon name="search" /><h3>Chưa có mã phù hợp còn trong thời hạn</h3><p>Thử từ khóa khác hoặc mở nguồn Shopee chính thức bên dưới.</p></div>}
    </>
  );
}
