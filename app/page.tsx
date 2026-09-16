import Link from 'next/link';
import { CouponCard } from './components/coupon-card';
import { DealCard } from './components/deal-card';
import { UiIcon } from './components/iconography';
import { getActiveCoupons, getCategories, getDeals } from './lib/data';

export const revalidate = 60;

export default async function Home() {
  const now = new Date();
  const [activeCoupons, categories, deals] = await Promise.all([
    getActiveCoupons(now),
    getCategories(),
    getDeals(),
  ]);
  const featuredDeal = deals[3];
  const featuredCoupon = activeCoupons[0];

  return (
    <main className="storefront-home">
      <section className="storefront-hero page-shell" aria-labelledby="home-hero-title">
        <article className="campaign-banner">
          <div className="campaign-copy">
            <span className="campaign-kicker"><b>Bản tin hôm nay</b><span>Đa ngành, có chọn lọc</span></span>
            <h1 id="home-hero-title">Tìm đúng mã.<br /><span>Chốt đúng deal.</span></h1>
            <p>Đi thẳng tới mã giảm giá, deal đang được quan tâm và danh mục cần mua — không phải lạc trong hàng trăm sản phẩm.</p>
            <div className="campaign-actions">
              <Link className="campaign-primary" href="/deal-hot">Khám phá deal hot <span aria-hidden="true">→</span></Link>
              <Link className="campaign-secondary" href="/ma-giam-gia">Lấy mã giảm giá</Link>
            </div>
            <div className="campaign-tags" aria-label="Tìm kiếm phổ biến">
              <span>Tìm nhiều:</span>
              <Link href="/deal-hot?q=tai+nghe">Tai nghe</Link>
              <Link href="/ma-giam-gia">Freeship</Link>
              <Link href="/deal-hot?q=nồi+chiên">Nồi chiên</Link>
            </div>
          </div>

          <Link className="campaign-product" href={`/deal-hot/${featuredDeal.id}`} aria-label={`Xem deal ${featuredDeal.name}`}>
            <span className="campaign-discount">{featuredDeal.discount}</span>
            <span className="campaign-product-copy">
              <small>{featuredDeal.category}</small>
              <strong>{featuredDeal.name}</strong>
              <span><b>{featuredDeal.price}</b><del>{featuredDeal.oldPrice}</del></span>
            </span>
          </Link>
        </article>

        <aside className="hero-brief" aria-label="Ghi chú mua sắm">
          <div className="brief-heading"><span>01 / Gợi ý nhanh</span><UiIcon name="check" /></div>
          <h2>Chốt đơn sau ba lần kiểm tra.</h2>
          <ol>
            <li><span>01</span><p><strong>Đúng nhu cầu</strong>Không mua chỉ vì phần trăm giảm lớn.</p></li>
            <li><span>02</span><p><strong>Đúng giá cuối</strong>Tính cả phí ship và điều kiện mã.</p></li>
            <li><span>03</span><p><strong>Đúng người bán</strong>Đọc đánh giá mới và chính sách đổi trả.</p></li>
          </ol>
          <Link href="/cach-chon">Mở quy trình Chọn Chuẩn <UiIcon name="arrow" /></Link>
          {featuredCoupon
            ? <p className="brief-voucher">Mã đã đối chiếu: <Link href={`/ma-giam-gia/${featuredCoupon.id}`}>{featuredCoupon.code}</Link></p>
            : <p className="brief-voucher">Mã mới đang được đối chiếu từ nguồn Shopee.</p>}
        </aside>
      </section>

      <section className="benefit-strip" aria-label="Tổng quan nội dung">
        <div className="page-shell">
          <div className="benefit-item"><span><UiIcon name="ticket" /></span><p><strong>{activeCoupons.length} mã đã đối chiếu</strong><small>Có nguồn và thời hạn rõ ràng</small></p></div>
          <div className="benefit-item"><span><UiIcon name="spark" /></span><p><strong>{deals.length} deal nổi bật</strong><small>Ảnh và thông số từ hãng</small></p></div>
          <div className="benefit-item"><span><UiIcon name="grid" /></span><p><strong>{categories.length} ngành hàng</strong><small>Duyệt nhanh theo nhu cầu</small></p></div>
        </div>
      </section>

      <section className="commerce-section category-section page-shell" aria-labelledby="category-section-title">
        <div className="commerce-heading">
          <div><p className="section-kicker">Danh mục nổi bật</p><h2 id="category-section-title">Mua sắm theo nhu cầu</h2></div>
          <Link href="/danh-muc">Xem tất cả danh mục <span aria-hidden="true">→</span></Link>
        </div>
        <div className="category-shop-grid">
          {categories.map((category) => (
            <Link href={`/danh-muc/${category.id}`} className={`category-shop-card ${category.tone}`} key={category.name}>
              <span className="category-shop-icon" aria-hidden="true">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.copy}</p>
              <b>{category.count} gợi ý</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="commerce-section coupon-section page-shell" aria-labelledby="coupon-section-title">
        <div className="commerce-heading">
          <div><p className="section-kicker">Lấy mã trước khi mua</p><h2 id="coupon-section-title">Mã Shopee đã đối chiếu</h2></div>
          <Link href="/ma-giam-gia">Xem tất cả mã <span aria-hidden="true">→</span></Link>
        </div>
        {activeCoupons.length
          ? <div className="voucher-grid home-vouchers">{activeCoupons.slice(0, 3).map((coupon) => <CouponCard key={coupon.id} coupon={coupon} status="active" />)}</div>
          : <div className="empty-state"><UiIcon name="ticket" /><h3>Chưa có mã còn trong thời hạn</h3><p>Mở Kho mã để kiểm tra các nguồn Shopee chính thức.</p></div>}
      </section>

      <section className="commerce-section flash-section" aria-labelledby="deal-section-title">
        <div className="page-shell">
          <div className="commerce-heading flash-heading">
            <div><p className="section-kicker">Deal có chọn lọc</p><h2 id="deal-section-title">Deal đang được quan tâm</h2></div>
            <div className="heading-actions"><span className="flash-note">Ảnh từ hãng · Giá minh họa</span><Link href="/deal-hot">Xem tất cả deal <span aria-hidden="true">→</span></Link></div>
          </div>
          <div className="deal-grid home-deals">{deals.slice(0, 4).map((deal) => <DealCard key={deal.id} deal={deal} />)}</div>
        </div>
      </section>

      <section className="trust-strip page-shell" aria-labelledby="trust-section-title">
        <div className="trust-intro">
          <p className="section-kicker">Cách Chọn Chuẩn hoạt động</p>
          <h2 id="trust-section-title">Chọn nhanh hơn, kiểm tra kỹ hơn.</h2>
          <Link href="/cach-chon">Xem quy trình chọn <span aria-hidden="true">→</span></Link>
        </div>
        <article className="trust-item"><span>01</span><h3>Hiểu nhu cầu</h3><p>Xác định mục đích mua và tiêu chí thật sự quan trọng.</p></article>
        <article className="trust-item"><span>02</span><h3>Loại nhiễu</h3><p>Bỏ bớt sản phẩm có thông số đẹp nhưng không đúng việc.</p></article>
        <article className="trust-item"><span>03</span><h3>Kiểm tra lần cuối</h3><p>Đối chiếu giá, shop, bảo hành và đánh giá mới trước khi mua.</p></article>
      </section>

      <section className="demo-disclosure page-shell"><span>i</span><p><strong>Nguồn dữ liệu:</strong> hình ảnh và thông số sản phẩm được đối chiếu từ trang hãng; mã giảm giá có liên kết điều kiện và ngày kiểm tra từ Shopee. Giá sản phẩm vẫn là giá tham khảo, hãy xác nhận giá cuối trước khi mua.</p></section>
    </main>
  );
}
