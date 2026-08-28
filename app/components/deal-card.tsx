import Link from 'next/link';
import type { Deal } from '@/app/lib/catalog';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="deal-card product-card">
      <Link className="product-card-link" href={`/deal-hot/${deal.id}`}>
        <div className={`deal-visual product-media ${deal.tone}`}>
          <span className={`status-badge product-badge ${deal.kind}`}>
            {deal.kind === 'hot' ? '🔥 ' : deal.kind === 'sale' ? '⚡ ' : '🎟 '}{deal.badge}
          </span>
          <span className="discount-bubble product-discount">{deal.discount}</span>
          <span className="deal-emoji product-emoji" aria-hidden="true">{deal.icon}</span>
        </div>
        <div className="deal-body product-info">
          <p className="deal-category product-shopline">{deal.category}</p>
          <h3>{deal.name}</h3>
          <p className="deal-description product-description">{deal.description}</p>
          <div className="deal-price product-price"><strong>{deal.price}</strong><del>{deal.oldPrice}</del></div>
          <div className="deal-meta product-meta"><span>★ {deal.rating}</span><span>Đã bán {deal.sold}</span></div>
          <span className="product-card-cta">Xem chi tiết deal <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
