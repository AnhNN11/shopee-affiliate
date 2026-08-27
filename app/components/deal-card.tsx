import type { Deal } from '@/app/lib/catalog';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="deal-card">
      <div className={`deal-visual ${deal.tone}`}>
        <span className={`status-badge ${deal.kind}`}>{deal.kind === 'hot' ? '🔥 ' : deal.kind === 'sale' ? '⚡ ' : '🎟 '}{deal.badge}</span>
        <span className="discount-bubble">{deal.discount}</span>
        <span className="deal-emoji">{deal.icon}</span>
      </div>
      <div className="deal-body">
        <p className="deal-category">{deal.category}</p>
        <h3>{deal.name}</h3>
        <p className="deal-description">{deal.description}</p>
        <div className="deal-price"><strong>{deal.price}</strong><del>{deal.oldPrice}</del></div>
        <div className="deal-meta"><span>★ {deal.rating}</span><span>Đã bán {deal.sold}</span></div>
        <a href={`/deal-hot/${deal.id}`}>Xem chi tiết deal <span>→</span></a>
      </div>
    </article>
  );
}
