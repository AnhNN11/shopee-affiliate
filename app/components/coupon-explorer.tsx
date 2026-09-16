'use client';
import { useEffect, useState } from 'react';
import { CouponCard } from './coupon-card';
import { formatVerifiedDate, getCouponStatus, type CouponRecord } from '@/app/lib/coupons';
import { filterVouchers, voucherFilters, type VoucherFilter } from '@/app/lib/voucher-filters';
import { UiIcon } from './iconography';

export function CouponExplorer({ coupons, initialNow }: { coupons: readonly CouponRecord[]; initialNow: string }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<VoucherFilter>('all');
  const [sort, setSort] = useState('recommended');
  const [now, setNow] = useState(() => Date.parse(initialNow));
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const visible = filterVouchers(coupons, now, filter, query, sort);
  const latest = coupons.reduce<string | undefined>((value, coupon) => !value || Date.parse(coupon.verifiedAt) > Date.parse(value) ? coupon.verifiedAt : value, undefined);
  return <section className="voucher-shop-panel" id="kho-voucher" aria-labelledby="voucher-shop-title">
    <div className="voucher-shop-title"><div><span className="eyebrow">Lưu trước, mua sau</span><h2 id="voucher-shop-title">Chọn voucher của bạn</h2></div>{latest && <span className="voucher-reviewed"><UiIcon name="check" /> Đối chiếu {formatVerifiedDate(latest)}</span>}</div>
    <div className="voucher-type-tabs" role="group" aria-label="Loại voucher">{voucherFilters.map((item) => <button type="button" key={item.id} aria-pressed={filter === item.id} className={filter === item.id ? 'active' : ''} onClick={() => setFilter(item.id)}><span className="voucher-tab-icon" aria-hidden="true">{item.symbol}</span><strong>{item.label}</strong><small>{filterVouchers(coupons, now, item.id).length} mã</small></button>)}</div>
    <div className="voucher-shop-toolbar"><label className="big-search"><UiIcon name="search" /><span className="sr-only">Tìm mã giảm giá</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm mã, freeship, khách hàng mới…" /></label><label className="voucher-sort">Sắp xếp<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Gợi ý</option><option value="expiring">Hết hạn gần nhất</option><option value="newest">Mới kiểm tra</option></select></label></div>
    <p className="voucher-result" role="status"><strong>{visible.length} voucher</strong> phù hợp <span>· Ưu đãi tùy tài khoản và sản phẩm</span></p>
    {visible.length ? <div className="voucher-shop-grid">{visible.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} status={getCouponStatus(coupon, now)} />)}</div> : <div className="empty-state"><UiIcon name="ticket" /><h3>Chưa có voucher khớp lựa chọn</h3><p>Thử từ khóa khác hoặc mở kho ưu đãi chính thức bên dưới.</p><button type="button" className="primary-button" onClick={() => { setQuery(''); setFilter('all'); }}>Xóa bộ lọc</button></div>}
    <div className="voucher-stock-note"><UiIcon name="check" /><p><strong>Mã có nguồn, điều kiện rõ ràng.</strong> Chỉ đăng mã đã đối chiếu. Mã vẫn có thể hết lượt trước hạn; hãy kiểm tra tại bước thanh toán.</p></div>
  </section>;
}
