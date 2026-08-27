import Link from 'next/link';
import { CouponCard } from './components/coupon-card';
import { DealCard } from './components/deal-card';
import { categories, coupons, deals } from './lib/catalog';

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="hero-kicker"><b>🔥 HOT</b> Deal đa ngành được lọc mỗi ngày</span>
          <h1>Tìm đúng mã.<br /><em>Chốt đúng deal.</em></h1>
          <p>Trang tổng hợp giúp bạn đi thẳng tới mã giảm giá, deal đang hot và danh mục cần mua — không phải lạc trong hàng trăm sản phẩm.</p>
          <form className="hero-search" action="/deal-hot">
            <span aria-hidden="true">⌕</span>
            <input type="search" name="q" aria-label="Tìm sản phẩm hoặc mã giảm giá" placeholder="Tìm tai nghe, freeship, skincare..." />
            <button type="submit">Tìm ngay</button>
          </form>
          <div className="popular-searches"><span>Tìm nhiều:</span><Link href="/deal-hot?q=tai+nghe">Tai nghe</Link><Link href="/ma-giam-gia">Freeship</Link><Link href="/deal-hot?q=nồi+chiên">Nồi chiên</Link></div>
        </div>
        <div className="hero-dashboard" aria-label="Tổng quan ưu đãi hôm nay">
          <div className="dashboard-top"><span>Ưu đãi hôm nay</span><b>LIVE</b></div>
          <div className="big-deal"><span className="fire-icon">🔥</span><div><small>DEAL NỔI BẬT</small><strong>-35%</strong><p>Bình giữ nhiệt 600ml</p></div></div>
          <div className="dashboard-stats"><div><strong>08</strong><span>Mã mới</span></div><div><strong>24</strong><span>Deal hot</span></div><div><strong>05</strong><span>Danh mục</span></div></div>
          <div className="mini-voucher"><span>🎟</span><div><strong>FREESHIP50</strong><small>Hỗ trợ phí vận chuyển</small></div><span className="arrow-chip">→</span></div>
        </div>
      </section>

      <section className="shortcut-section page-shell">
        <div className="shortcut-grid">
          <Link href="/ma-giam-gia" className="shortcut-card voucher-shortcut"><span className="shortcut-icon">🎟</span><div><small>KHO MÃ</small><h2>Mã giảm giá</h2><p>Tìm, lọc và sao chép mã nhanh.</p></div><b>08 mã →</b></Link>
          <Link href="/deal-hot" className="shortcut-card hot-shortcut"><span className="shortcut-icon">🔥</span><div><small>ĐANG TĂNG NHIỆT</small><h2>Deal hot</h2><p>Sản phẩm giá tốt theo từng ngành.</p></div><b>Xem deal →</b></Link>
          <Link href="/danh-muc" className="shortcut-card category-shortcut"><span className="shortcut-icon">⌘</span><div><small>CHỌN NHANH</small><h2>Danh mục</h2><p>Đi thẳng tới đúng nhóm bạn cần.</p></div><b>5 ngành →</b></Link>
        </div>
      </section>

      <section className="home-section page-shell">
        <div className="section-title"><div><span className="section-icon hot">🔥</span><p className="eyebrow">Lấy mã trước khi mua</p><h2>Mã đáng chú ý hôm nay</h2></div><Link href="/ma-giam-gia">Xem tất cả mã <span>→</span></Link></div>
        <div className="voucher-grid compact">{coupons.slice(0, 3).map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)}</div>
      </section>

      <section className="category-band">
        <div className="page-shell">
          <div className="section-title light"><div><span className="section-icon">⌘</span><p className="eyebrow">Duyệt theo nhu cầu</p><h2>Mỗi ngành, một cách chọn.</h2></div><Link href="/danh-muc">Xem toàn bộ <span>→</span></Link></div>
          <div className="home-category-grid">
            {categories.map((category) => <Link href={`/deal-hot?q=${encodeURIComponent(category.name)}`} className={`category-tile ${category.tone}`} key={category.name}><span>{category.icon}</span><h3>{category.name}</h3><p>{category.copy}</p><b>{category.count} gợi ý</b></Link>)}
          </div>
        </div>
      </section>

      <section className="home-section page-shell">
        <div className="section-title"><div><span className="section-icon sale">%</span><p className="eyebrow">Sale off có chọn lọc</p><h2>Deal đang được quan tâm</h2></div><Link href="/deal-hot">Xem toàn bộ deal <span>→</span></Link></div>
        <div className="deal-grid home-deals">{deals.slice(0, 4).map((deal) => <DealCard key={deal.id} deal={deal} />)}</div>
      </section>

      <section className="editorial-section page-shell">
        <article className="editorial-lead"><span className="eyebrow">Cách Chọn Chuẩn hoạt động</span><h2>Không chỉ gom link.<br />Chúng tôi gom lý do để chọn.</h2><p>So sánh nhu cầu, khoảng giá, đánh giá gần đây và uy tín người bán trước khi gợi ý.</p><Link className="primary-button" href="/cach-chon">Xem quy trình chọn</Link></article>
        <div className="editorial-points"><div><span>01</span><h3>Hiểu nhu cầu</h3><p>Mua để làm gì và tiêu chí nào thật sự quan trọng?</p></div><div><span>02</span><h3>Loại nhiễu</h3><p>Bỏ bớt sản phẩm thông số đẹp nhưng không đúng việc.</p></div><div><span>03</span><h3>Kiểm tra lần cuối</h3><p>Đối chiếu giá, shop, bảo hành và đánh giá mới.</p></div></div>
      </section>

      <section className="demo-disclosure page-shell"><span>i</span><p><strong>Lưu ý bản thử nghiệm:</strong> mã, mức giảm và giá hiện là dữ liệu minh họa để kiểm tra website. Trước khi mua, hãy xác nhận điều kiện và giá cuối cùng trên Shopee.</p></section>
    </main>
  );
}
