import Image from 'next/image';
import Link from 'next/link';
import { shoppingCategories, type ShoppingFilters, type shoppingPage, type ShoppingProduct } from '@/app/lib/storefront';

export function ShoppingProductCard({ product }: { product: ShoppingProduct }) {
  return <article className="affiliate-product-card">
    <Link className="affiliate-product-media" href={`/san-pham/${product.id}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 740px) 50vw, (max-width: 1020px) 33vw, 25vw" /></Link>
    <div className="affiliate-product-body">
      <p className="shopping-category">{shoppingCategories.find((category) => category.id === product.category)?.name}</p>
      <h2><Link href={`/san-pham/${product.id}`}>{product.name}</Link></h2>
      <small>Giá tham khảo</small><p className="affiliate-price">{product.price}</p>
      <p className="shopping-sales">{product.sales} đã bán · Theo dữ liệu Shopee</p>
      <a className="primary-button" href={`/go/product/${product.id}`} target="_blank" rel="nofollow sponsored noopener noreferrer">{product.purchaseLabel} ↗</a>
      <Link className="shopping-detail-link" href={`/san-pham/${product.id}`}>Xem chi tiết</Link>
    </div>
  </article>;
}

export function ProductExplorer({ result, filters }: { result: ReturnType<typeof shoppingPage>; filters: ShoppingFilters }) {
  const href = (changes: Partial<ShoppingFilters>) => {
    const values = { ...filters, page: 1, ...changes };
    const params = new URLSearchParams();
    if (values.query) params.set('q', values.query);
    if (values.category && values.category !== 'all') params.set('category', values.category);
    if (values.sort && values.sort !== 'recommended') params.set('sort', values.sort);
    if (values.min !== undefined) params.set('min', String(values.min));
    if (values.max !== undefined) params.set('max', String(values.max));
    if (values.page > 1) params.set('page', String(values.page));
    return `/san-pham${params.size ? `?${params}` : ''}`;
  };
  return <>
    <div className="filter-chips spacious" aria-label="Danh mục sản phẩm">{shoppingCategories.map((category) => <Link key={category.id} className={filters.category === category.id ? 'active' : ''} href={href({ category: category.id })}>{category.name}</Link>)}</div>
    <form className="explorer-panel shopping-filters" action="/san-pham" role="search">
      <label className="big-search"><span className="sr-only">Tìm sản phẩm</span><input name="q" defaultValue={filters.query} placeholder="Bạn đang tìm món gì?" type="search" /></label>
      <input type="hidden" name="category" value={filters.category || 'all'} />
      <label>Giá từ (đ)<input type="number" name="min" min="0" max="999999999999" defaultValue={filters.min} placeholder="0" /></label>
      <label>Đến (đ)<input type="number" name="max" min="0" max="999999999999" defaultValue={filters.max} placeholder="Không giới hạn" /></label>
      <label>Sắp xếp<select name="sort" defaultValue={filters.sort || 'recommended'}><option value="recommended">Gợi ý cho bạn</option><option value="price-asc">Giá thấp đến cao</option><option value="price-desc">Giá cao đến thấp</option><option value="sales">Bán chạy</option></select></label>
      <button className="primary-button" type="submit">Tìm kiếm</button>
      <Link href="/san-pham">Xóa bộ lọc</Link>
    </form>
    <div className="result-summary"><strong>{result.total}</strong> sản phẩm <span>· Trang {result.page}/{result.pageCount} · Kiểm tra giá cuối và phí giao hàng trên Shopee</span></div>
    {result.products.length ? <div className="affiliate-product-grid">{result.products.map((product) => <ShoppingProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>Chưa tìm thấy món phù hợp</h2><p>Thử tên ngắn hơn, chọn danh mục khác hoặc mở rộng khoảng giá.</p><Link href="/san-pham">Xem tất cả sản phẩm →</Link></div>}
    {result.pageCount > 1 && <nav className="product-pagination" aria-label="Phân trang sản phẩm">{Array.from({ length: result.pageCount }, (_, index) => index + 1).filter((page) => page === 1 || page === result.pageCount || Math.abs(page - result.page) <= 2).map((page) => <Link key={page} href={href({ page })} className={page === result.page ? 'active' : ''} aria-current={page === result.page ? 'page' : undefined}>{page}</Link>)}</nav>}
  </>;
}
