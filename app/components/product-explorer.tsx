import Image from 'next/image';
import Link from 'next/link';
import type { AffiliateProductPage, CommissionProgram, ProductSort } from '@/app/lib/products';

const labels: Record<'all' | CommissionProgram, string> = { all: 'Tất cả', shopee: 'Hoa hồng Shopee', xtra: 'Hoa hồng Xtra' };

export function ProductExplorer({ result, query, program, sort }: { result: AffiliateProductPage; query: string; program: 'all' | CommissionProgram; sort: ProductSort }) {
  const href = (next: { program?: 'all' | CommissionProgram; sort?: ProductSort; page?: number }) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    const nextProgram = next.program ?? program;
    const nextSort = next.sort ?? sort;
    if (nextProgram !== 'all') params.set('program', nextProgram);
    if (nextSort !== 'rank') params.set('sort', nextSort);
    if ((next.page ?? 1) > 1) params.set('page', String(next.page));
    const suffix = params.toString();
    return suffix ? `/san-pham?${suffix}` : '/san-pham';
  };

  return <>
    <form className="explorer-panel affiliate-toolbar" action="/san-pham" method="get">
      <label className="big-search"><span className="sr-only">Tìm sản phẩm</span><input name="q" defaultValue={query} type="search" placeholder="Tìm trong sản phẩm đã đồng bộ" /></label>
      {program !== 'all' && <input type="hidden" name="program" value={program} />}
      {sort !== 'rank' && <input type="hidden" name="sort" value={sort} />}
      <button className="primary-button" type="submit">Tìm sản phẩm</button>
    </form>
    <div className="filter-chips spacious" role="group" aria-label="Lọc chương trình hoa hồng">
      {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => <Link key={key} className={program === key ? 'active' : ''} aria-current={program === key ? 'page' : undefined} href={href({ program:key, page:1 })}>{labels[key]}</Link>)}
    </div>
    <div className="product-sort-links" aria-label="Sắp xếp sản phẩm">
      <span>Sắp xếp:</span>{([['rank','Shopee đề xuất'],['commission','Hoa hồng cao'],['sales','Bán chạy']] as Array<[ProductSort,string]>).map(([key,label]) => <Link key={key} className={sort === key ? 'active' : ''} href={href({ sort:key, page:1 })}>{label}</Link>)}
    </div>
    <div className="result-summary"><strong>{result.total}</strong> sản phẩm <span>· Trang {result.page}/{result.pageCount} · Hoa hồng và giá có thể thay đổi</span></div>
    {result.products.length ? <div className="affiliate-product-grid">{result.products.map((product) => <article className="affiliate-product-card" key={product.id}>
      <div className="affiliate-product-media"><Image src={product.image} alt={product.name} fill sizes="(max-width: 480px) 100vw, (max-width: 740px) 50vw, (max-width: 1020px) 33vw, 25vw" />{product.discount && <span>{product.discount}</span>}</div>
      <div className="affiliate-product-body"><div className="program-badges"><b>SHOPEE</b>{product.programs.includes('xtra') && <b className="xtra">XTRA</b>}</div><h2>{product.name}</h2><p className="affiliate-price">{product.price}</p><div className="affiliate-stats"><span>{product.sales} đã bán</span><strong>Tổng tối đa {formatRate(product.commission.totalRate)}</strong></div>{product.programs.includes('xtra') && <p className="commission-breakdown">Shopee: {formatOptionalRate(product.commission.shopeeRate)} · Xtra: {formatOptionalRate(product.commission.xtraRate)}</p>}{product.status === 'active' && product.affiliateUrl ? <a className="primary-button" href={`/go/product/${product.id}`} rel="nofollow sponsored">Mở link Affiliate</a> : <span className="primary-button affiliate-link-pending">Chờ link từ Shopee</span>}</div>
    </article>)}</div> : <div className="empty-state"><h2>Không tìm thấy sản phẩm</h2><p>Thử từ khóa khác hoặc quay lại bộ lọc Tất cả.</p></div>}
    {result.pageCount > 1 && <nav className="product-pagination" aria-label="Phân trang sản phẩm">{Array.from({ length:result.pageCount }, (_,index) => index+1).map((page) => <Link key={page} className={page === result.page ? 'active' : ''} aria-current={page === result.page ? 'page' : undefined} href={href({ page })}>{page}</Link>)}</nav>}
  </>;
}

function formatRate(value:number):string { return `${String(value).replace('.',',')}%`; }
function formatOptionalRate(value:number|undefined):string { return value === undefined ? 'chưa tách' : formatRate(value); }
