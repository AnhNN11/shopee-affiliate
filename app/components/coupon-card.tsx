'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  formatCouponSchedule,
  formatDiscountShort,
  formatMinSpend,
  formatVerifiedDate,
  getCouponStatusLabel,
  type CouponRecord,
  type CouponStatus,
} from '@/app/lib/coupons';
import { UiIcon } from './iconography';

type CopyState = 'idle' | 'copied' | 'error';

export function CouponCard({ coupon, status }: { coupon: CouponRecord; status: CouponStatus }) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  async function copyCode() {
    if (status !== 'active') return;

    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(coupon.code);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }

    window.setTimeout(() => setCopyState('idle'), 1800);
  }

  const copyLabel =
    status !== 'active'
      ? getCouponStatusLabel(status)
      : copyState === 'copied'
        ? 'Đã sao chép ✓'
        : copyState === 'error'
          ? 'Hãy chọn mã'
          : 'Sao chép mã';

  return (
    <article className={`voucher-card coupon-status-${status}`}>
      <div className={`voucher-side ${coupon.tone}`}>
        <span className="voucher-symbol"><UiIcon name={coupon.tone === 'hot' ? 'spark' : 'ticket'} /></span>
        <strong>{formatDiscountShort(coupon.discount)}</strong>
      </div>
      <div className="voucher-body">
        <div className="badge-row">
          <span className={`status-badge ${coupon.tone}`}>{coupon.badge}</span>
          <span className={`coupon-status-badge status-${status}`}>{getCouponStatusLabel(status)}</span>
        </div>
        <h3>{coupon.title}</h3>
        <p>{coupon.description}</p>
        <span className="condition">{formatMinSpend(coupon.minSpendVnd)} · {formatCouponSchedule(coupon, status)}</span>
        <span className="coupon-source-line">Nguồn Shopee · <time dateTime={coupon.verifiedAt}>kiểm tra {formatVerifiedDate(coupon.verifiedAt)}</time></span>
        <div className="coupon-code-row">
          {coupon.redemption === 'save' ? <><span>Lưu trực tiếp trên Shopee</span><Link href={`/ma-giam-gia/${coupon.id}`}>Xem cách lưu →</Link></> : <><code>{coupon.code}</code><button type="button" onClick={copyCode} disabled={status !== 'active'} aria-live="polite">{copyLabel}</button></>}
        </div>
        <Link className="voucher-link" href={`/ma-giam-gia/${coupon.id}`}>Xem nguồn &amp; điều kiện <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
