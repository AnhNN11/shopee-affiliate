import type { Metadata } from 'next';
import { CouponExplorer } from '@/app/components/coupon-explorer';
import { getDiscoverableCoupons } from '@/app/lib/data';
import { absoluteSiteUrl, createPageMetadata } from '@/app/lib/seo';
import { voucherSources } from '@/app/lib/voucher-sources';

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: 'Mã giảm giá Shopee có nguồn và điều kiện',
  description:
    'Tra mã giảm giá Shopee đã đối chiếu từ nguồn chính thức, xem ngày kiểm tra, điều kiện và thời hạn trước khi áp dụng.',
  path: '/ma-giam-gia',
});

export default async function CouponPage() {
  const now = new Date();
  const visibleCoupons = await getDiscoverableCoupons(now);
  const pageUrl = absoluteSiteUrl('/ma-giam-gia');
  const structuredData = pageUrl
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#collection`,
            url: pageUrl,
            name: 'Mã giảm giá Shopee có nguồn và điều kiện',
            description: 'Danh sách mã được đối chiếu với nguồn Shopee và tự ẩn khỏi danh sách khi hết thời hạn.',
            inLanguage: 'vi-VN',
          },
          {
            '@type': 'ItemList',
            itemListElement: visibleCoupons.map((coupon, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: coupon.redemption === 'save' ? coupon.title : `${coupon.code} — ${coupon.title}`,
              url: absoluteSiteUrl(`/ma-giam-gia/${coupon.id}`),
            })),
          },
        ],
      }
    : null;

  return (
    <main>
      {structuredData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /> : null}
      <section className="voucher-mall-hero">
        <div className="page-shell voucher-mall-hero-inner">
          <div><span className="voucher-mall-kicker">CHỌN CHUẨN / TRẠM VOUCHER</span><h1>Săn mã đúng gu.<br /><em>Mua sắm nhẹ ví.</em></h1><p>Tìm ưu đãi cho món bạn thích. Đọc điều kiện, lưu mã và kiểm tra giá cuối trên Shopee.</p><a className="voucher-hero-button" href="#kho-voucher">Khám phá voucher <span>↓</span></a><small>Website độc lập · Không phải trang chính thức của Shopee</small></div>
          <div className="voucher-hero-art" aria-hidden="true"><span className="voucher-art-star">✦</span><div className="voucher-art-ticket ticket-back"><span>CHỌN CHUẨN</span><strong>FREESHIP</strong><small>Khám phá ưu đãi vận chuyển</small></div><div className="voucher-art-ticket ticket-front"><span>VOUCHER CÓ NGUỒN</span><strong>%</strong><small>Chọn mã hợp đơn hàng</small></div><span className="voucher-art-caption">Lưu mã · Kiểm tra · Đặt hàng</span></div>
        </div>
      </section>
      <div className="page-shell voucher-mall-body">
        <div className="voucher-benefits"><span>✓ Nguồn Shopee chính thức</span><span>✓ Hiển thị điều kiện sử dụng</span><span>✓ Có ngày đối chiếu</span></div>
        <CouponExplorer coupons={visibleCoupons} initialNow={now.toISOString()} />
        <section className="voucher-discovery" id="nguon-chinh-thuc" aria-labelledby="official-source-title">
          <div className="voucher-section-heading"><div><span className="eyebrow">Thêm lựa chọn, thêm ưu đãi</span><h2 id="official-source-title">Khám phá kho ưu đãi Shopee</h2></div><span>{voucherSources.length} điểm đến chính thức ↗</span></div>
          <p>Đây là các trang khám phá, không phải mã đã xác minh. Ưu đãi hiển thị có thể khác theo tài khoản và thời điểm.</p>
          <div className="voucher-discovery-grid">{voucherSources.map((source, index) => <a className={`voucher-destination destination-${index}`} key={source.url} href={source.url} target="_blank" rel="noopener noreferrer"><span className="destination-icon" aria-hidden="true">{['%','↗','✦','▦','▶'][index]}</span><small>KHÁM PHÁ TRÊN SHOPEE</small><h3>{source.name}</h3><p>{source.description}</p><strong>Mở kho ưu đãi <span>↗</span></strong></a>)}</div>
        </section>
        <section className="voucher-howto" aria-labelledby="voucher-howto-title"><div><span className="eyebrow">Mua sắm dễ hơn</span><h2 id="voucher-howto-title">Một phút trước khi chốt đơn</h2><p>Mã phù hợp mới là mã tiết kiệm.</p></div><ol><li><b>01</b><div><strong>Chọn đúng điều kiện</strong><p>Xem đối tượng, đơn tối thiểu và sản phẩm áp dụng.</p></div></li><li><b>02</b><div><strong>Sao chép hoặc lưu mã</strong><p>Mã vận chuyển cần lưu trực tiếp trên Shopee.</p></div></li><li><b>03</b><div><strong>Kiểm tra tổng tiền</strong><p>Xác nhận giảm giá và phí giao hàng trước khi đặt.</p></div></li></ol></section>
      </div>
    </main>
  );
}
