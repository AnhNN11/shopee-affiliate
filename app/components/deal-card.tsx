import Image from 'next/image';
import Link from 'next/link';
import type { Deal } from '@/app/lib/catalog';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="deal-card product-card">
      <Link className="product-card-link" href={`/deal-hot/${deal.id}`}>
        <div className={`deal-visual product-media ${deal.tone}`}>
          <span className={`status-badge product-badge ${deal.kind}`}>
            {deal.badge}
          </span>
          <Image
            className="product-photo"
            src={deal.image}
            alt={deal.imageAlt}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 800px) 50vw, (max-width: 1080px) 33vw, 25vw"
          />
        </div>
        <div className="deal-body product-info">
          <p className="deal-category product-shopline">{deal.category} · {deal.brand}</p>
          <h3>{deal.name}</h3>
          <p className="deal-description product-description">{deal.description}</p>
          <small>Giá tham khảo</small><div className="deal-price product-price"><strong>{deal.price}</strong></div>
          <div className="deal-meta product-meta"><span>Ảnh từ hãng</span><span>{deal.model}</span></div>
          <span className="product-card-cta">Xem chi tiết deal <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
