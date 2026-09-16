import { MongoClient } from 'mongodb';
import { isAffiliateProduct, type AffiliateProduct } from '../app/lib/products.ts';

const uri = process.env.MONGODB_URI?.trim();
if (!uri) throw new Error('Thiếu MONGODB_URI.');
const client = new MongoClient(uri);
try {
  const rawProducts = await client.db(process.env.MONGODB_DB?.trim() || 'chon_chuan').collection<Record<string, unknown>>('affiliate_products').find({}, { projection:{ _id:0 } }).toArray();
  const products = rawProducts.filter((product) => isAffiliateProduct(product)) as unknown as AffiliateProduct[];
  const invalid = rawProducts.filter((product) => !isAffiliateProduct(product));
  const active = products.filter((product) => product.status === 'active');
  const report = {
    total:rawProducts.length, active:active.length, pendingLink:products.filter((product) => product.status === 'pending_link').length,
    xtra:products.filter((product) => product.programs.includes('xtra')).length,
    verifiedLinks:products.filter((product) => product.linkVerifiedAt).length,
    exactDestinations:products.filter((product) => /shopee\.vn\/(product\/|.*-i\.)/.test(product.destinationUrl)).length,
    invalid:invalid.length,
    staleOver24Hours:products.filter((product) => Date.now()-Date.parse(product.lastVerifiedAt) > 86_400_000).length,
  };
  console.log(JSON.stringify(report,null,2));
  if (invalid.length) { console.error('ID không hợp lệ:', invalid.map((product) => String(product.id || 'không có id'))); process.exitCode=1; }
} finally { await client.close(); }
