'use client';

import { useMemo, useState } from 'react';

const categories = ['Tất cả', 'Công nghệ', 'Nhà cửa', 'Làm đẹp'];

const products = [
  {
    icon: '🎧',
    label: 'Đáng tiền nhất',
    category: 'Công nghệ',
    name: 'Tai nghe Bluetooth pin lâu',
    description: 'Ưu tiên âm thanh cân bằng, pin từ 24 giờ và đeo lâu không đau tai.',
    price: 'Từ 249.000đ',
    tone: 'peach',
    url: 'https://shopee.vn/search?keyword=tai%20nghe%20bluetooth%20pin%20l%C3%A2u',
  },
  {
    icon: '💻',
    label: 'Góc làm việc',
    category: 'Công nghệ',
    name: 'Giá đỡ laptop công thái học',
    description: 'Khung chắc, nâng vừa tầm mắt và gấp gọn được khi cần di chuyển.',
    price: 'Từ 189.000đ',
    tone: 'sky',
    url: 'https://shopee.vn/search?keyword=gi%C3%A1%20%C4%91%E1%BB%A1%20laptop%20c%C3%B4ng%20th%C3%A1i%20h%E1%BB%8Dc',
  },
  {
    icon: '🍳',
    label: 'Bếp gọn hơn',
    category: 'Nhà cửa',
    name: 'Nồi chiên không dầu 5L',
    description: 'Dung tích vừa cho gia đình nhỏ, dễ vệ sinh và không chiếm nhiều chỗ.',
    price: 'Từ 899.000đ',
    tone: 'mint',
    url: 'https://shopee.vn/search?keyword=n%E1%BB%93i%20chi%C3%AAn%20kh%C3%B4ng%20d%E1%BA%A7u%205l',
  },
  {
    icon: '🥤',
    label: 'Mang đi mỗi ngày',
    category: 'Nhà cửa',
    name: 'Bình giữ nhiệt 600ml',
    description: 'Miệng rộng dễ rửa, giữ lạnh tốt và nắp kín để yên tâm bỏ vào túi.',
    price: 'Từ 129.000đ',
    tone: 'yellow',
    url: 'https://shopee.vn/search?keyword=b%C3%ACnh%20gi%E1%BB%AF%20nhi%E1%BB%87t%20600ml',
  },
  {
    icon: '☀️',
    label: 'Dùng mỗi ngày',
    category: 'Làm đẹp',
    name: 'Kem chống nắng dịu nhẹ',
    description: 'Kết cấu mỏng, không bí da và phù hợp với khí hậu nóng ẩm.',
    price: 'Từ 159.000đ',
    tone: 'lavender',
    url: 'https://shopee.vn/search?keyword=kem%20ch%E1%BB%91ng%20n%E1%BA%AFng%20d%E1%BB%8Bu%20nh%E1%BA%B9',
  },
  {
    icon: '🧴',
    label: 'Routine tối giản',
    category: 'Làm đẹp',
    name: 'Sữa rửa mặt da nhạy cảm',
    description: 'Làm sạch vừa đủ, ít hương liệu và không khiến da bị căng sau khi rửa.',
    price: 'Từ 119.000đ',
    tone: 'rose',
    url: 'https://shopee.vn/search?keyword=s%E1%BB%AFa%20r%E1%BB%ADa%20m%E1%BA%B7t%20da%20nh%E1%BA%A1y%20c%E1%BA%A3m',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    return products.filter((product) => {
      const categoryMatches = activeCategory === 'Tất cả' || product.category === activeCategory;
      const textMatches = !keyword || `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase('vi').includes(keyword);
      return categoryMatches && textMatches;
    });
  }, [activeCategory, query]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Chọn Chuẩn - Trang chủ">
          <span className="brand-mark">C</span>
          <span>CHỌN CHUẨN</span>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#ma-giam-gia">Mã giảm giá</a>
          <a href="#goi-y">Deal đa ngành</a>
          <a href="#cach-chon">Cách chọn</a>
        </nav>
        <a className="header-cta" href="#goi-y">Săn deal ngay</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Mã mới · Deal thật · Chọn nhanh</p>
          <h1>Deal đa ngành,<br />đã có người lọc hộ.</h1>
          <p className="hero-text">
            Một nơi để tìm mã giảm giá, sản phẩm đáng tiền và hướng dẫn mua sắm
            theo đúng nhu cầu của bạn.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#ma-giam-gia">Xem mã hôm nay</a>
            <a className="text-link" href="#cach-chon">Xem cách chúng tôi chọn <span>→</span></a>
          </div>
          <div className="trust-row" aria-label="Cam kết nội dung">
            <span>✓ So sánh rõ ràng</span>
            <span>✓ Không tô hồng</span>
            <span>✓ Cập nhật giá thường xuyên</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Tuyển chọn sản phẩm nổi bật">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-card hero-card-main">
            <span className="card-sticker">HỢP TÚI TIỀN</span>
            <span className="hero-emoji">🎧</span>
            <div>
              <strong>Tai nghe Bluetooth</strong>
              <small>4 lựa chọn đáng cân nhắc</small>
            </div>
          </div>
          <div className="hero-card hero-card-small top-card"><span>⭐</span><strong>4.8/5</strong><small>đánh giá tốt</small></div>
          <div className="hero-card hero-card-small bottom-card"><span>↘</span><strong>-31%</strong><small>giá đang tốt</small></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Nguyên tắc chọn sản phẩm">
        <span><strong>01</strong> Mã được ghi rõ điều kiện</span>
        <span><strong>02</strong> Deal chia theo từng ngành</span>
        <span><strong>03</strong> Giá và hạn dùng minh bạch</span>
      </section>

      <section className="coupon-section" id="ma-giam-gia">
        <div className="section-heading coupon-heading">
          <div>
            <p className="eyebrow">Bản thử nghiệm</p>
            <h2>Mã giảm giá nổi bật.</h2>
          </div>
          <p>Dữ liệu dưới đây là nội dung minh họa. Khi vận hành thật, mã sẽ được thay bằng ưu đãi còn hiệu lực từ hệ thống Shopee.</p>
        </div>
        <div className="coupon-grid">
          <article className="coupon-card">
            <div className="coupon-value"><span>ĐẾN</span><strong>₫50K</strong></div>
            <div className="coupon-copy"><span className="coupon-tag">Toàn ngành hàng</span><h3>Voucher mua sắm</h3><p>Đơn tối thiểu và thời hạn sẽ hiển thị rõ tại đây.</p><a href="#goi-y">Xem deal phù hợp <span>→</span></a></div>
          </article>
          <article className="coupon-card">
            <div className="coupon-value"><span>ƯU ĐÃI</span><strong>FREESHIP</strong></div>
            <div className="coupon-copy"><span className="coupon-tag">Vận chuyển</span><h3>Mã hỗ trợ phí ship</h3><p>Lọc theo giá trị đơn và khu vực áp dụng.</p><a href="#goi-y">Xem deal phù hợp <span>→</span></a></div>
          </article>
          <article className="coupon-card">
            <div className="coupon-value"><span>THÊM</span><strong>SHOP</strong></div>
            <div className="coupon-copy"><span className="coupon-tag">Voucher người bán</span><h3>Ưu đãi riêng của shop</h3><p>Kết hợp cùng sản phẩm đang có mức giá tốt.</p><a href="#goi-y">Xem deal phù hợp <span>→</span></a></div>
          </article>
        </div>
      </section>

      <section className="featured" id="goi-y">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Deal đa ngành</p>
            <h2>Tìm nhanh theo đúng nhu cầu.</h2>
          </div>
          <p>Mỗi lựa chọn đều có lý do, tiêu chí cần kiểm tra và khoảng giá tham khảo.</p>
        </div>

        <div className="discovery-bar">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Tìm sản phẩm</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm tai nghe, đồ bếp, skincare..."
            />
          </label>
          <div className="category-tabs" aria-label="Lọc theo danh mục">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="result-count">{filteredProducts.length} gợi ý</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className={`product-visual ${product.tone}`}>
                  <span className="product-label">{product.label}</span>
                  <span className="product-emoji">{product.icon}</span>
                </div>
                <div className="product-content">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <strong>{product.price}</strong>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      aria-label={`Xem ${product.name} trên Shopee`}
                    >
                      Xem trên Shopee <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔎</span>
            <h3>Chưa có gợi ý phù hợp</h3>
            <p>Thử từ khóa khác hoặc chọn lại “Tất cả”.</p>
          </div>
        )}
        <p className="price-note">Giá hiển thị là mức tham khảo và có thể thay đổi. Luôn kiểm tra giá, đánh giá và chính sách của shop trước khi đặt hàng.</p>
      </section>

      <section className="method" id="cach-chon">
        <div className="method-intro">
          <p className="eyebrow">Cách Chọn Chuẩn hoạt động</p>
          <h2>Không chỉ là một danh sách link.</h2>
          <p>Chúng tôi gom nhu cầu thật, so sánh tiêu chí quan trọng và chỉ đề xuất những lựa chọn có lý do rõ ràng.</p>
        </div>
        <div className="steps-grid">
          <article><span>01</span><h3>Hiểu nhu cầu</h3><p>Ngân sách bao nhiêu, dùng ở đâu và tính năng nào thật sự quan trọng?</p></article>
          <article><span>02</span><h3>Lập danh sách ngắn</h3><p>Loại bớt những món thông số đẹp nhưng không giải quyết đúng nhu cầu.</p></article>
          <article><span>03</span><h3>Kiểm tra lần cuối</h3><p>Đối chiếu giá, đánh giá gần đây, bảo hành và uy tín của người bán.</p></article>
        </div>
      </section>

      <section className="closing-cta">
        <p className="eyebrow">Một lựa chọn tốt bắt đầu từ câu hỏi đúng</p>
        <h2>Bạn đang định mua món gì?</h2>
        <p>Tìm nhanh trong các gợi ý đã được sắp theo nhu cầu và khoảng giá.</p>
        <a className="primary-button" href="#goi-y">Bắt đầu tìm sản phẩm</a>
      </section>

      <footer id="gioi-thieu">
        <div className="brand footer-brand"><span className="brand-mark">C</span><span>CHỌN CHUẨN</span></div>
        <p>Minh bạch Affiliate: Chọn Chuẩn có thể nhận hoa hồng khi bạn mua hàng qua liên kết giới thiệu. Bạn không phải trả thêm chi phí. Đây là website độc lập, không phải trang chính thức của Shopee.</p>
        <span>© 2026 Chọn Chuẩn</span>
      </footer>
    </main>
  );
}
