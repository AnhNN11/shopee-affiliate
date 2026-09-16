import { readFile } from 'node:fs/promises';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { validateAffiliateProducts, type AffiliateProduct } from '../app/lib/products.ts';

const source = process.argv[2];
const reconcile = process.argv.includes('--reconcile');
const uri = process.env.MONGODB_URI?.trim();
const databaseName = process.env.MONGODB_DB?.trim() || 'chon_chuan';

if (!source) throw new Error('Cách dùng: npm run db:import-products -- duong-dan/products.json');
if (!uri) throw new Error('Thiếu MONGODB_URI.');

const parsed: unknown = JSON.parse(await readFile(source, 'utf8'));
if (!Array.isArray(parsed)) throw new Error('Tệp nhập phải là một mảng JSON.');
validateAffiliateProducts(parsed);
const products: AffiliateProduct[] = parsed;

const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
try {
  const collection = client.db(databaseName).collection<AffiliateProduct>('affiliate_products');
  await collection.createIndex({ id: 1 }, { unique: true });
  await collection.createIndex({ programs: 1, rank: 1 });
  await collection.createIndex({ status: 1, rank: 1 });
  await collection.createIndex({ 'commission.totalRate': -1, rank: 1 });
  await collection.createIndex({ salesCount: -1, rank: 1 });
  if (products.length) await collection.bulkWrite(products.map((product) => ({ updateOne: { filter: { id: product.id }, update: { $set: product }, upsert: true } })));
  if (reconcile) await collection.updateMany({ id: { $nin: products.map((product) => product.id) }, status: { $in: ['active', 'pending_link'] } }, { $set: { status: 'expired', lastVerifiedAt: new Date().toISOString() } });
  console.log(`Đã nhập/cập nhật ${products.length} sản phẩm Shopee Affiliate vào ${databaseName}.`);
} finally {
  await client.close();
}
