import { MongoClient } from 'mongodb';
import { isAffiliateProduct, isSafeShopeeUrl, type AffiliateProduct } from '../app/lib/products.ts';
import { shopeeProducts } from '../app/lib/shopee-products.ts';

const uri = process.env.MONGODB_URI?.trim();
if (!uri) throw new Error('Thiếu MONGODB_URI.');
const client = new MongoClient(uri);
try {
  const collection = client.db(process.env.MONGODB_DB?.trim() || 'chon_chuan').collection<Record<string, unknown>>('affiliate_products');
  const current = await collection.find({}).toArray();
  const seeds = new Map(shopeeProducts.map((product) => [product.id, product]));
  const migrated: AffiliateProduct[] = current.map((document, index) => {
    if (isAffiliateProduct(document)) return document;
    const id = String(document.id || '');
    const seed = seeds.get(id);
    if (seed) return seed;
    const syncedAt = validDate(document.syncedAt) || new Date().toISOString();
    const affiliateUrl = isSafeShopeeUrl(document.affiliateUrl) ? document.affiliateUrl : undefined;
    return {
      schemaVersion:2, id, name:String(document.name || `Sản phẩm ${id}`), price:String(document.price || 'Liên hệ Shopee'),
      discount:String(document.discount || ''), sales:String(document.sales || ''), salesCount:parseSales(String(document.sales || '')),
      image:String(document.image || ''), destinationUrl:String(document.destinationUrl || ''), ...(affiliateUrl ? { affiliateUrl } : {}),
      commission:{ totalRate:Number(document.commissionRate || 0) },
      programs:Array.isArray(document.programs) ? document.programs as AffiliateProduct['programs'] : ['shopee'],
      status:affiliateUrl ? 'active' : 'pending_link', rank:Number(document.rank || index+1), source:'manual_import',
      syncedAt, lastVerifiedAt:syncedAt, ...(affiliateUrl ? { linkVerifiedAt:syncedAt } : {}),
    };
  });
  const invalidIds:string[] = [];
  for (const product of migrated) if (!isAffiliateProduct(product as unknown)) invalidIds.push(String((product as unknown as { id?:unknown }).id || 'không có id'));
  if (invalidIds.length) throw new Error(`Migration dừng vì ${invalidIds.length} bản ghi không thể chuẩn hóa: ${invalidIds.join(', ')}`);
  if (migrated.length) await collection.bulkWrite(migrated.map((product) => ({ replaceOne:{ filter:{ id:product.id }, replacement:product } })));
  console.log(`Đã migrate ${migrated.length} sản phẩm sang schema v2.`);
} finally { await client.close(); }

function validDate(value:unknown):string|undefined { return typeof value === 'string' && Number.isFinite(Date.parse(value)) ? value : undefined; }
function parseSales(value:string):number { const number=Number.parseFloat(value.replace(',','.'))||0; if(value.includes('tr')) return number*1_000_000; if(value.includes('k')) return number*1_000; return number; }
