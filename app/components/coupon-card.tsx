'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Coupon } from '@/app/lib/catalog';
import { UiIcon } from './iconography';

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard?.writeText(coupon.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <article className="voucher-card">
      <div className={`voucher-side ${coupon.kind}`}>
        <span className="voucher-symbol"><UiIcon name={coupon.kind === 'hot' ? 'spark' : 'ticket'} /></span>
        <strong>{coupon.discount}</strong>
      </div>
      <div className="voucher-body">
        <div className="badge-row">
          <span className={`status-badge ${coupon.kind}`}>{coupon.badge}</span>
          <span className="expiry">{coupon.expires}</span>
        </div>
        <h3>{coupon.title}</h3>
        <p>{coupon.description}</p>
        <span className="condition">{coupon.minSpend}</span>
        <div className="coupon-code-row">
          <code>{coupon.code}</code>
          <button type="button" onClick={copyCode} aria-live="polite">{copied ? 'Đã sao chép ✓' : 'Sao chép mã'}</button>
        </div>
        <Link className="voucher-link" href={`/ma-giam-gia/${coupon.id}`}>Xem chi tiết mã <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
