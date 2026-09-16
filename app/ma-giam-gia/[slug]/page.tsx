import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CouponCard } from '@/app/components/coupon-card';
import { CopyCodeButton } from '@/app/components/copy-code-button';
import { UiIcon } from '@/app/components/iconography';
import { affiliateDisclosure, getOutboundRel } from '@/app/lib/affiliate';
import {
  findPublishedCoupon,
  getCoupons,
  getDiscoverableCoupons,
} from '@/app/lib/data';
import {
  formatCouponSchedule,
  formatCouponScope,
  formatDiscount,
  formatDiscountShort,
  formatMinSpend,
  formatVerifiedDate,
  getCouponStatus,
  getCouponStatusLabel,
} from '@/app/lib/coupons';
import { absoluteSiteUrl, createNotFoundMetadata, createPageMetadata } from '@/app/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getCoupons())
    .filter((coupon) => coupon.published)
    .map((coupon) => ({ slug: coupon.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const coupon = await findPublishedCoupon(slug);
  if (!coupon) return createNotFoundMetadata('Không tìm thấy mã giảm giá');

  const status = getCouponStatus(coupon);
  return createPageMetadata({
    title: coupon.redemption === 'save' ? coupon.title : `Mã ${coupon.code}: ${coupon.title}`,
    description: `${coupon.title}, ${formatMinSpend(coupon.minSpendVnd)}. Nguồn ${coupon.sourceName}, kiểm tra ngày ${formatVerifiedDate(coupon.verifiedAt)}.`,
    path: `/ma-giam-gia/${encodeURIComponent(coupon.id)}`,
    index: status !== 'expired' && status !== 'exhausted',
    follow: true,
  });
}

export default async function CouponDetailPage({ params }: Props) {
  const { slug } = await params;
  const coupon = await findPublishedCoupon(slug);
  if (!coupon) notFound();

  const now = new Date();
  const status = getCouponStatus(coupon, now);
  const related = (await getDiscoverableCoupons(now)).filter((item) => item.id !== coupon.id).slice(0, 3);
  const pageUrl = absoluteSiteUrl(`/ma-giam-gia/${coupon.id}`);
  const listingUrl = absoluteSiteUrl('/ma-giam-gia');
  const homeUrl = absoluteSiteUrl('/');
  const structuredData = pageUrl && listingUrl && homeUrl
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: coupon.redemption === 'save' ? coupon.title : `Mã ${coupon.code}: ${coupon.title}`,
            description: coupon.description,
            inLanguage: 'vi-VN',
            dateModified: coupon.verifiedAt,
            isPartOf: { '@id': `${homeUrl}/#website` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: homeUrl },
              { '@type': 'ListItem', position: 2, name: 'Mã giảm giá', item: listingUrl },
              { '@type': 'ListItem', position: 3, name: coupon.redemption === 'save' ? coupon.title : coupon.code, item: pageUrl },
            ],
          },
        ],
      }
    : null;

  return (
    <main>
      {structuredData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /> : null}
      <nav className="breadcrumbs page-shell" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>›</span><Link href="/ma-giam-gia">Mã giảm giá</Link><span>›</span><strong>{coupon.redemption === 'save' ? 'Voucher vận chuyển' : coupon.code}</strong></nav>
      <section className={`coupon-detail page-shell coupon-status-${status}`}>
        <div className={`coupon-detail-ticket ${coupon.tone}`}>
          <span className="ticket-icon"><UiIcon name={coupon.tone === 'hot' ? 'spark' : 'ticket'} /></span>
          <small>{coupon.badge}</small>
          <strong>{formatDiscountShort(coupon.discount)}</strong>
          <p>{coupon.redemption === 'save' ? 'Lưu trên Shopee' : coupon.code}</p>
          <div className="ticket-cut top" /><div className="ticket-cut bottom" />
        </div>
        <div className="coupon-detail-copy">
          <div className="coupon-detail-badges">
            <span className={`status-badge ${coupon.tone}`}>{coupon.badge}</span>
            <span className={`coupon-status-badge status-${status}`}>{getCouponStatusLabel(status)}</span>
          </div>
          <h1>{coupon.title}</h1>
          <p>{coupon.description}</p>
          <div className="coupon-conditions">
            <div><small>Mức giảm</small><strong>{formatDiscount(coupon.discount)}</strong></div>
            <div><small>Đơn tối thiểu</small><strong>{formatMinSpend(coupon.minSpendVnd)}</strong></div>
            <div><small>Thời hạn</small><strong>{formatCouponSchedule(coupon, status)}</strong></div>
            <div><small>Đối tượng</small><strong>{formatCouponScope(coupon.scope)}</strong></div>
          </div>
          <div className="coupon-actions">
            {coupon.redemption !== 'save' && <CopyCodeButton code={coupon.code} disabled={status !== 'active'} />}
            {status === 'active'
              ? <a className="shopee-button" href={`/go/ma-giam-gia/${coupon.id}`} target="_blank" rel={getOutboundRel(coupon)}>Xem/Lưu trên Shopee <span>↗</span></a>
              : <span className="shopee-button disabled" aria-disabled="true">{getCouponStatusLabel(status)}</span>}
          </div>
          <p className="affiliate-inline">{affiliateDisclosure}</p>
          <p className="coupon-evidence"><a href={coupon.sourceUrl} target="_blank" rel="noopener noreferrer">{coupon.sourceName} <span aria-hidden="true">↗</span></a><span>Kiểm tra lần cuối <time dateTime={coupon.verifiedAt}>{formatVerifiedDate(coupon.verifiedAt)}</time></span></p>
        </div>
      </section>

      <section className="coupon-steps page-shell"><div><span>01</span><h2>{coupon.redemption === 'save' ? 'Lưu voucher' : 'Sao chép mã'}</h2><p>{coupon.redemption === 'save' ? 'Mở trang mã trên Shopee và chọn Lưu tại voucher phù hợp.' : 'Chép đúng chuỗi mã để nhập khi thanh toán.'}</p></div><div><span>02</span><h2>Kiểm tra tài khoản</h2><p>Đăng nhập tài khoản nhận được ưu đãi và chọn sản phẩm thỏa điều kiện.</p></div><div><span>03</span><h2>Kiểm tra giá cuối</h2><p>Xác nhận mã còn lượt và số tiền thực tế được giảm trước khi đặt hàng.</p></div></section>
      <section className="terms-box page-shell"><div><span>i</span><h2>Điều kiện cần nhớ</h2></div><ul>{coupon.terms.map((term) => <li key={term}>{term}</li>)}</ul></section>

      {related.length > 0 && <section className="related-section page-shell"><div className="section-title"><div><p className="eyebrow">Còn trong thời hạn</p><h2>Mã liên quan</h2></div><Link href="/ma-giam-gia">Tất cả mã <span>→</span></Link></div><div className="voucher-grid">{related.map((item) => <CouponCard key={item.id} coupon={item} status={getCouponStatus(item, now)} />)}</div></section>}
    </main>
  );
}
