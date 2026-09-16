import type { Metadata } from 'next';
import { CouponExplorer } from '@/app/components/coupon-explorer';
import { getDiscoverableCoupons } from '@/app/lib/data';
import { absoluteSiteUrl, createPageMetadata } from '@/app/lib/seo';

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
              name: `${coupon.code} — ${coupon.title}`,
              url: absoluteSiteUrl(`/ma-giam-gia/${coupon.id}`),
            })),
          },
        ],
      }
    : null;

  return (
    <main>
      {structuredData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /> : null}
      <section className="subpage-hero coupon-hero">
        <div className="page-shell"><span className="hero-kicker"><b>KHO MÃ</b> Có nguồn · Có ngày kiểm tra</span><h1>Mã giảm giá Shopee.</h1><p>Chỉ hiển thị mã đã đối chiếu với nguồn Shopee. Sao chép mã, đọc điều kiện và luôn xác nhận mức giảm cuối cùng tại bước thanh toán.</p></div>
      </section>
      <section className="content-with-aside page-shell">
        <div className="main-content">
          <CouponExplorer coupons={visibleCoupons} initialNow={now.toISOString()} />
          <section className="official-source-panel" id="nguon-chinh-thuc" aria-labelledby="official-source-title">
            <div><p className="eyebrow">Nguồn kiểm tra trực tiếp</p><h2 id="official-source-title">Không thấy mã phù hợp?</h2><p>Shopee có thể hiển thị ưu đãi khác nhau theo tài khoản, shop và khung giờ. Mở các nguồn chính thức để xem dữ liệu mới nhất.</p></div>
            <div className="official-source-links">
              <a href="https://shopee.vn/m/ma-giam-gia" target="_blank" rel="noopener noreferrer"><strong>Trang mã Shopee</strong><span>Mã đang mở trên nền tảng ↗</span></a>
              <a href="https://help.shopee.vn/portal/4/article/79049" target="_blank" rel="noopener noreferrer"><strong>Kho Voucher</strong><span>Cách lưu và nhập mã ↗</span></a>
              <a href="https://help.shopee.vn/portal/4/article/79515" target="_blank" rel="noopener noreferrer"><strong>Điều kiện voucher</strong><span>Xem hạn và phạm vi dùng ↗</span></a>
              <a href="https://shopee.vn/flash_sale/" target="_blank" rel="noopener noreferrer"><strong>Flash Sale</strong><span>Ưu đãi theo khung giờ ↗</span></a>
            </div>
          </section>
        </div>
        <aside className="guide-card"><span className="guide-icon">?</span><h2>Dùng mã thế nào?</h2><ol><li><span>1</span><p><strong>Đọc đúng đối tượng</strong>Mã đơn đầu tiên chỉ áp dụng cho tài khoản đủ điều kiện.</p></li><li><span>2</span><p><strong>Sao chép mã</strong>Dùng đúng chuỗi ký tự đã đối chiếu.</p></li><li><span>3</span><p><strong>Kiểm tra tại Shopee</strong>Lượt dùng và giá cuối có thể thay đổi.</p></li></ol><div className="aside-note"><strong>Affiliate đã được bật.</strong><br />Liên kết tiếp thị không làm tăng giá của bạn.</div></aside>
      </section>
    </main>
  );
}
