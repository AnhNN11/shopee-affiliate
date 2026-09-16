import type { AffiliateProduct } from './products';

const syncedAt = '2026-09-16T00:00:00.000Z';
type SeedProduct = { id:string; name:string; price:string; discount:string; sales:string; totalRate:number; image:string; rank:number; xtra?:boolean; affiliateUrl?:string; destinationUrl?:string; shopeeRate?:number; xtraRate?:number };

const rows: Array<[string,string,string,string,string,number,string]> = [
  ['23552060269','Giấy vệ sinh treo tường TopGia đa sắc 1280 tờ/4 lớp','₫125.000','-38%','1tr+',11.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mswt4wo4mo7408.webp'],
  ['26517116246','Bộ quần áo thun lạnh MDKIDS cho bé 5–15kg','₫27.501','-72%','100k+',15,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-msp3dx93e3gmbf.webp'],
  ['51966344308','Áo thun tay dài form Boxy phối Raglan unisex','₫69.000','-47%','3k+',11,'https://down-tx-vn.img.susercontent.com/sg-11134201-8257s-ms4dt5jaz4lc74.webp'],
  ['21288257085','Set 110 khẩu trang 5D Thịnh Phát cao cấp','₫25.000','-50%','4k+',12.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-7qukw-lg6pegxfp71z4d.webp'],
  ['19192149998','Thùng 10 bịch khăn giấy rút Top Gia treo tường','₫139.001','-37%','500k+',11.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mswt8xbqhnnp65.webp'],
  ['28257218140','Chân gà không xương Ăn Cùng Bà Tuyết M11','₫50.000','','30k+',12.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-820l4-mjurz17zhvd3a8.webp'],
  ['47766043212','Đèn lồng lân sư thủ công cho bé HOMIE','₫62.000','-38%','790',9.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mrvqvcniixhi99.webp'],
  ['23119593211','Khẩu trang 5D Thịnh Phát 3 lớp kháng khuẩn','₫68.020','-32%','600k+',12.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-m7g8mtd1ujgcb9.webp'],
  ['28576052647','Giấy vệ sinh treo tường TopGia cỡ đại','₫139.001','-38%','200k+',11.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mswt60r9kgzu77.webp'],
  ['26609048170','Ốp lưng iPhone TPU chống bẩn lót nhung','₫41.500','-31%','400k+',22.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-ma0no4sczi8q98.webp'],
  ['29428705340','Sốt chấm CayTeDai x2 siêu cay Lâm Vlog','₫46.000','-51%','20k+',10.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-msv3e0qcy4n8bc.webp'],
  ['24542304419','Áo mưa cánh dơi che phủ toàn thân','₫149.000','-39%','40k+',16,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-m70azsyh1hlzcf.webp'],
  ['17532975547','Thùng giấy ăn rút TopGia 4 lớp','₫74.001','-30%','1tr+',12.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-820l4-mfevehfzp2iz43.webp'],
  ['29000715432','Kính cường lực iPhone khung tự dán chống nhìn trộm','₫31.900','-20%','100k+',24.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-m9zmpaplkzlw13.webp'],
  ['24389484524','Sốt chấm CayTeDai x1 cay vừa Lâm Vlog','₫45.000','-50%','80k+',10.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-msv3t8mxvifce5.webp'],
  ['41869171810','Tai nghe Bluetooth không dây P4 TWS','₫42.500','-53%','10k+',17.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-820l4-mepjmu0aocnb4f.webp'],
  ['46859620849','Khăn giấy Pio TopGia đa năng cao cấp','₫69.000','-43%','100k+',10.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mswy7prrivpd88.webp'],
  ['4812682396','Kính cường lực iPhone chống nhìn trộm tự dán','₫29.900','-30%','1tr+',22.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-m9zmo77vdikka7.webp'],
  ['26303754046','Đèn Phúc Lân Đăng DIY tự lắp','₫38.000','-52%','7k+',6.5,'https://down-tx-vn.img.susercontent.com/vn-11134201-81ztc-ms58ghseploidf.webp'],
  ['25171045245','Áo mưa đi xe máy trong suốt cao cấp','₫149.000','-42%','30k+',16,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-ma0r95ek8ajy2f.webp'],
  ['24491019937','Khăn giấy vệ sinh treo tường Tiểu Hạ','₫119.001','-26%','600k+',10.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mp4jv0v8u1ovff.webp'],
  ['24995347301','Cường lực iPhone KK VMOX tự dán chống nhìn trộm','₫31.900','-30%','100k+',24.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-mac6wxq5h208f7.webp'],
  ['25824728833','Khăn ướt cao cấp TopGia 80 tờ cho mẹ và bé','₫70.000','-35%','200k+',12.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-msxift8is2yp82.webp'],
  ['43508358436','Combo 20 chân gà rút xương tê cay','₫198.500','-35%','200k+',12.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mo57bqj5k54y41.webp'],
  ['24184282389','Khăn giấy rút Top Gia cỡ đại 9 bịch','₫108.001','-37%','100k+',11.5,'https://down-tx-vn.img.susercontent.com/vn-11134207-81ztc-mswt7n6czr44d2.webp'],
];

const products: SeedProduct[] = rows.map(([id,name,price,discount,sales,totalRate,image], index) => ({ id,name,price,discount,sales,totalRate,image,rank:index+1 }));
products[9].xtra = true; products[21].xtra = true;
products.push({ id:'2608753400', name:'Kính cường lực iPhone KK 4D full màn', price:'₫29.900', discount:'-32%', sales:'2tr+', totalRate:24.5, shopeeRate:22, xtraRate:2.5, image:'https://down-tx-vn.img.susercontent.com/vn-11134207-7ra0g-m9zmtw4ti8ucfa.webp', rank:26, xtra:true, destinationUrl:'https://shopee.vn/product/89827191/2608753400', affiliateUrl:'https://s.shopee.vn/7AdagMkRpJ' });

export const shopeeProducts: AffiliateProduct[] = products.map((product) => ({
  schemaVersion: 2, id:product.id, name:product.name, price:product.price, discount:product.discount,
  sales:product.sales, salesCount:parseSales(product.sales), image:product.image,
  destinationUrl:product.destinationUrl || `https://shopee.vn/search?keyword=${encodeURIComponent(product.name)}`,
  ...(product.affiliateUrl ? { affiliateUrl:product.affiliateUrl } : {}),
  commission:{ totalRate:product.totalRate, ...(product.shopeeRate === undefined ? {} : { shopeeRate:product.shopeeRate }), ...(product.xtraRate === undefined ? {} : { xtraRate:product.xtraRate }), ...(product.affiliateUrl ? { socialRate:product.totalRate, liveRate:product.shopeeRate, videoRate:product.shopeeRate } : {}) },
  programs:product.xtra ? ['shopee','xtra'] : ['shopee'], status:product.affiliateUrl ? 'active' : 'pending_link', rank:product.rank,
  source:'shopee_affiliate_ui', syncedAt, lastVerifiedAt:syncedAt, ...(product.affiliateUrl ? { linkVerifiedAt:syncedAt } : {}),
}));

function parseSales(value:string):number { const number=Number.parseFloat(value.replace(',','.'))||0; if(value.includes('tr')) return number*1_000_000; if(value.includes('k')) return number*1_000; return number; }
