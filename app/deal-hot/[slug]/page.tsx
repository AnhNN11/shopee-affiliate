import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DealCard } from '@/app/components/deal-card';
import { deals } from '@/app/lib/catalog';
import { absoluteSiteUrl, createNotFoundMetadata, createPageMetadata } from '@/app/lib/seo';

type Props = { params: Promise<{ slug: string }> };

const advice: Record<string, { highlights: string[]; checks: string[] }> = {
  'Công nghệ': {
    highlights: ['Thông số đáp ứng tốt nhu cầu dùng hằng ngày', 'Mức giá nằm trong phân khúc dễ tiếp cận', 'Có nhiều đánh giá để đối chiếu trải nghiệm thật'],
    checks: ['Kiểm tra phiên bản và khả năng tương thích', 'Đọc kỹ thời hạn bảo hành', 'Ưu tiên shop có phản hồi kỹ thuật rõ ràng'],
  },
  'Nhà cửa': {
    highlights: ['Kích thước phù hợp không gian gia đình nhỏ', 'Thiết kế ưu tiên thao tác và vệ sinh dễ', 'Mức giá đã giảm đủ đáng cân nhắc'],
    checks: ['Đo vị trí đặt trước khi mua', 'Xem điện áp, công suất và phụ kiện đi kèm', 'Kiểm tra chính sách đổi trả khi hàng lỗi'],
  },
  'Làm đẹp': {
    highlights: ['Phù hợp routine tối giản và khí hậu nóng ẩm', 'Nhiều phản hồi gần đây để tham khảo', 'Giá nằm trong vùng hợp lý của phân khúc'],
    checks: ['Đọc bảng thành phần và loại da phù hợp', 'Kiểm tra hạn sử dụng khi nhận hàng', 'Test thử vùng nhỏ nếu da nhạy cảm'],
  },
  'Thời trang': {
    highlights: ['Phom cơ bản, dễ mặc và dễ phối', 'Khoảng giá phù hợp cho món dùng thường xuyên', 'Có nhiều lựa chọn màu và kích thước'],
    checks: ['Đối chiếu bảng size của đúng shop', 'Xem ảnh thật trong đánh giá gần đây', 'Đọc chất liệu và chính sách đổi size'],
  },
  'Mẹ & Bé': {
    highlights: ['Tập trung vào sự tiện dụng hằng ngày', 'Thiết kế gọn và dễ vệ sinh', 'Đánh giá người mua tương đối tích cực'],
    checks: ['Kiểm tra chất liệu và tiêu chuẩn an toàn', 'Đọc kích thước thực tế', 'Ưu tiên shop có chính sách đổi trả rõ'],
  },
};

export function generateStaticParams() {
  return deals.map((deal) => ({ slug: deal.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deal = deals.find((item) => item.id === slug);
  if (!deal) return createNotFoundMetadata('Không tìm thấy deal');

  return createPageMetadata({
    title: `${deal.name}: giá tham khảo và tiêu chí chọn`,
    description: `${deal.description} Xem mức giá tham khảo và các điểm cần kiểm tra về sản phẩm, người bán trước khi mua.`,
    path: `/deal-hot/${encodeURIComponent(deal.id)}`,
  });
}

export default async function DealDetailPage({ params }: Props) {
  const { slug } = await params;
  const deal = deals.find((item) => item.id === slug);
  if (!deal) notFound();
  const sameCategory = deals.filter((item) => item.category === deal.category && item.id !== deal.id);
  const related = [...sameCategory, ...deals.filter((item) => item.category !== deal.category && item.id !== deal.id)].slice(0, 3);
  const notes = advice[deal.category] ?? advice['Công nghệ'];
  const productUrl = absoluteSiteUrl(`/deal-hot/${deal.id}`);
  const imageUrl = absoluteSiteUrl(deal.image);
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.name,
    description: deal.description,
    image: imageUrl ? [imageUrl] : undefined,
    sku: deal.model,
    model: deal.model,
    brand: { '@type': 'Brand', name: deal.brand },
    category: deal.category,
    url: productUrl,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData).replace(/</g, '\\u003c'),
        }}
      />
      <nav className="breadcrumbs page-shell" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>›</span><Link href="/deal-hot">Deal đã lọc</Link><span>›</span><strong>{deal.name}</strong></nav>
      <section className="deal-detail page-shell">
        <div className={`detail-visual ${deal.tone}`}>
          <span className={`status-badge ${deal.kind}`}>{deal.badge}</span>
          <span className="detail-discount">{deal.discount}</span>
          <Image
            className="detail-product-photo"
            src={deal.image}
            alt={deal.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <small>Ảnh sản phẩm từ {deal.brand}</small>
        </div>
        <div className="detail-summary">
          <p className="eyebrow">{deal.category} · Deal đã lọc</p>
          <h1>{deal.name}</h1>
          <div className="detail-rating"><span>{deal.brand}</span><span>Model {deal.model}</span><span>Giá có thể thay đổi</span></div>
          <p className="detail-description">{deal.description}</p>
          <a className="brand-source-link" href={deal.sourceUrl} target="_blank" rel="noopener noreferrer">Xem thông tin chính thức từ {deal.brand} <span aria-hidden="true">↗</span></a>
          <div className="detail-price-row"><strong>{deal.price}</strong><del>{deal.oldPrice}</del><span>Giảm {deal.discount.replace('-', '')}</span></div>
          <div className="mini-checks"><span>✓ Có lý do lựa chọn</span><span>✓ Kiểm tra shop trước khi mua</span><span>✓ Giá có thể thay đổi</span></div>
          <a className="shopee-button" href={deal.url} target="_blank" rel="sponsored nofollow noopener noreferrer">Tìm sản phẩm tương tự trên Shopee <span>↗</span></a>
          <p className="affiliate-inline">Liên kết trên có thể là liên kết tiếp thị. Bạn không phải trả thêm chi phí.</p>
        </div>
      </section>

      <section className="decision-section page-shell">
        <article><span className="decision-icon">+</span><h2>Vì sao đáng cân nhắc?</h2><ul>{notes.highlights.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span className="decision-icon warning">!</span><h2>Cần kiểm tra trước khi chốt</h2><ul>{notes.checks.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="detail-facts page-shell"><div><small>Giá tham khảo</small><strong>{deal.price}</strong></div><div><small>Thương hiệu</small><strong>{deal.brand}</strong></div><div><small>Model</small><strong>{deal.model}</strong></div><div><small>Danh mục</small><strong>{deal.category}</strong></div></section>

      {related.length > 0 && <section className="related-section page-shell"><div className="section-title"><div><p className="eyebrow">Xem thêm cùng ngành</p><h2>Có thể bạn cũng cần</h2></div><Link href="/deal-hot">Tất cả deal <span>→</span></Link></div><div className="deal-grid">{related.map((item) => <DealCard key={item.id} deal={item} />)}</div></section>}
    </main>
  );
}
