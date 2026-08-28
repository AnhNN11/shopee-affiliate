import Link from 'next/link';
import { CouponCard } from './components/coupon-card';
import { DealCard } from './components/deal-card';
import { categories, coupons, deals } from './lib/catalog';

export default function Home() {
  const featuredDeal = deals[3];
  const featuredCoupon = coupons[0];

  return (
    <main className="storefront-home">
      <section className="storefront-hero page-shell" aria-labelledby="home-hero-title">
        <article className="campaign-banner">
          <div className="campaign-copy">
            <span className="campaign-kicker"><b>🔥 Deal mỗi ngày</b><span>Đa ngành, dễ tìm</span></span>
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
            <span className="campaign-emoji" aria-hidden="true">{featuredDeal.icon}</span>
            <span className="campaign-product-copy">
              <small>{featuredDeal.category}</small>
              <strong>{featuredDeal.name}</strong>
              <span><b>{featuredDeal.price}</b><del>{featuredDeal.oldPrice}</del></span>
            </span>
          </Link>
        </article>

        <aside className="hero-offers" aria-label="Lối tắt ưu đãi">
          <Link className="offer-card voucher-offer" href={`/ma-giam-gia/${featuredCoupon.id}`}>
            <span className="offer-icon" aria-hidden="true">🎟</span>
            <span className="offer-copy">
              <small>MÃ {featuredCoupon.code}</small>
              <strong>{featuredCoupon.title}</strong>
              <span>{featuredCoupon.discount} · {featuredCoupon.minSpend}</span>
            </span>
            <b aria-hidden="true">→</b>
          </Link>
          <Link className="offer-card flash-offer" href="/deal-hot">
            <span className="offer-icon" aria-hidden="true">⚡</span>
            <span className="offer-copy">
              <small>DEAL ĐANG ĐƯỢC QUAN TÂM</small>
              <strong>Sản phẩm giá tốt đa ngành</strong>
              <span>{deals.length} gợi ý đang hiển thị</span>
            </span>
            <b aria-hidden="true">→</b>
          </Link>
        </aside>
      </section>

      <section className="benefit-strip" aria-label="Tổng quan nội dung">
        <div className="page-shell">
          <div className="benefit-item"><span aria-hidden="true">🎟</span><p><strong>{coupons.length} mã giảm giá</strong><small>Dễ lọc và sao chép</small></p></div>
          <div className="benefit-item"><span aria-hidden="true">🔥</span><p><strong>{deals.length} deal nổi bật</strong><small>Giá và điều kiện rõ ràng</small></p></div>
          <div className="benefit-item"><span aria-hidden="true">⌘</span><p><strong>{categories.length} ngành hàng</strong><small>Duyệt nhanh theo nhu cầu</small></p></div>
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
          <div><p className="section-kicker">Lấy mã trước khi mua</p><h2 id="coupon-section-title">Mã đáng chú ý hôm nay</h2></div>
          <Link href="/ma-giam-gia">Xem tất cả mã <span aria-hidden="true">→</span></Link>
        </div>
        <div className="voucher-grid home-vouchers">{coupons.slice(0, 3).map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)}</div>
      </section>

      <section className="commerce-section flash-section" aria-labelledby="deal-section-title">
        <div className="page-shell">
          <div className="commerce-heading flash-heading">
            <div><p className="section-kicker">⚡ Deal có chọn lọc</p><h2 id="deal-section-title">Deal đang được quan tâm</h2></div>
            <div className="heading-actions"><span className="flash-note">Giá hiện là dữ liệu minh họa</span><Link href="/deal-hot">Xem tất cả deal <span aria-hidden="true">→</span></Link></div>
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

      <section className="demo-disclosure page-shell"><span>i</span><p><strong>Lưu ý bản thử nghiệm:</strong> mã, mức giảm và giá hiện là dữ liệu minh họa để kiểm tra website. Trước khi mua, hãy xác nhận điều kiện và giá cuối cùng trên Shopee.</p></section>
    </main>
  );
}
