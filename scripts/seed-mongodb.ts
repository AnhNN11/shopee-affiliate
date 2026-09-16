import { MongoClient, ServerApiVersion } from 'mongodb';
import { categories, deals } from '../app/lib/catalog.ts';
import { coupons } from '../app/lib/coupons.ts';
import { shopeeProducts } from '../app/lib/shopee-products.ts';

const uri = process.env.MONGODB_URI?.trim();
const databaseName = process.env.MONGODB_DB?.trim() || 'chon_chuan';

if (!uri) {
  throw new Error('Thiếu MONGODB_URI. Hãy cấu hình biến môi trường trước khi seed.');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  const database = client.db(databaseName);

  await Promise.all([
    database.collection('categories').createIndex({ id: 1 }, { unique: true }),
    database.collection('deals').createIndex({ id: 1 }, { unique: true }),
    database.collection('coupons').createIndex({ id: 1 }, { unique: true }),
    database.collection('coupons').createIndex({ code: 1 }, { unique: true }),
    database.collection('affiliate_products').createIndex({ id: 1 }, { unique: true }),
    database.collection('affiliate_products').createIndex({ programs: 1, rank: 1 }),
    database.collection('affiliate_products').createIndex({ status: 1, rank: 1 }),
    database.collection('affiliate_products').createIndex({ 'commission.totalRate': -1, rank: 1 }),
    database.collection('affiliate_products').createIndex({ salesCount: -1, rank: 1 }),
    database.collection('outbound_clicks').createIndex({ clickedAt: -1 }),
    database.collection('outbound_clicks').createIndex({ kind: 1, itemId: 1, clickedAt: -1 }),
  ]);

  await Promise.all([
    database.collection('categories').bulkWrite(
      categories.map((category) => ({
        replaceOne: { filter: { id: category.id }, replacement: category, upsert: true },
      })),
    ),
    database.collection('deals').bulkWrite(
      deals.map((deal) => ({
        replaceOne: { filter: { id: deal.id }, replacement: deal, upsert: true },
      })),
    ),
    database.collection('coupons').bulkWrite(
      coupons.map((coupon) => ({
        replaceOne: { filter: { id: coupon.id }, replacement: coupon, upsert: true },
      })),
    ),
    database.collection('affiliate_products').bulkWrite(
      shopeeProducts.map((product) => ({
        updateOne: { filter: { id: product.id }, update: { $setOnInsert: product }, upsert: true },
      })),
    ),
  ]);

  console.log(
    `Đã đồng bộ ${categories.length} danh mục, ${deals.length} deal, ${coupons.length} mã và ${shopeeProducts.length} sản phẩm Affiliate vào ${databaseName}.`,
  );
} finally {
  await client.close();
}
