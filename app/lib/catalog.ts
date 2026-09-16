import type { CouponTone } from './coupons';

export type Deal = {
  id: string;
  badge: string;
  kind: CouponTone;
  category: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  price: string;
  oldPrice: string;
  discount: string;
  popularity: number;
  tone: string;
  url: string;
  affiliateUrl?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  copy: string;
  tone: string;
};

export const categories: Category[] = [
  { id: 'cong-nghe', name: 'Công nghệ', icon: '01', count: 2, copy: 'Tai nghe, phụ kiện và góc làm việc', tone: 'blue' },
  { id: 'nha-cua', name: 'Nhà cửa', icon: '02', count: 2, copy: 'Đồ bếp và vật dụng sống gọn', tone: 'green' },
  { id: 'lam-dep', name: 'Làm đẹp', icon: '03', count: 2, copy: 'Skincare và chăm sóc cá nhân', tone: 'pink' },
  { id: 'thoi-trang', name: 'Thời trang', icon: '04', count: 1, copy: 'Trang phục và phụ kiện dễ phối', tone: 'yellow' },
  { id: 'me-va-be', name: 'Mẹ & Bé', icon: '05', count: 1, copy: 'Đồ dùng thiết thực cho gia đình', tone: 'purple' },
];

export const deals: Deal[] = [
  {
    id: 'tai-nghe-bluetooth',
    badge: 'Chống ồn',
    kind: 'hot',
    category: 'Công nghệ',
    brand: 'soundcore',
    model: 'Space One A3035',
    name: 'Tai nghe soundcore Space One',
    description: 'Chống ồn thích ứng, driver 40 mm và thời lượng pin tới 55 giờ khi tắt ANC.',
    image: '/products/soundcore-space-one.png',
    imageAlt: 'Tai nghe chụp tai Bluetooth soundcore Space One màu đen',
    sourceUrl: 'https://www.soundcore.com/products/space-one-a3035011?variant=44247740022974',
    price: '1.890.000đ',
    oldPrice: '2.490.000đ',
    discount: '-24%',
    popularity: 8,
    tone: 'peach',
    url: 'https://shopee.vn/search?keyword=soundcore%20Space%20One%20A3035',
  },
  {
    id: 'gia-do-laptop',
    badge: 'Góc làm việc',
    kind: 'voucher',
    category: 'Công nghệ',
    brand: 'UGREEN',
    model: '15925',
    name: 'Giá đỡ laptop UGREEN 15925',
    description: 'Khung nhôm hai trục, điều chỉnh độ cao và góc nhìn, có thể gập gọn khi di chuyển.',
    image: '/products/ugreen-laptop-stand.png',
    imageAlt: 'Giá đỡ laptop công thái học UGREEN bằng nhôm, gập gọn và điều chỉnh độ cao',
    sourceUrl: 'https://uk.ugreen.com/collections/laptop-and-tablet-stand/products/ugreen-foldable-dual-rod-laptop-stand',
    price: '699.000đ',
    oldPrice: '999.000đ',
    discount: '-30%',
    popularity: 6,
    tone: 'sky',
    url: 'https://shopee.vn/search?keyword=UGREEN%2015925',
  },
  {
    id: 'noi-chien',
    badge: 'Bếp gọn',
    kind: 'sale',
    category: 'Nhà cửa',
    brand: 'Philips',
    model: 'NA120/00',
    name: 'Nồi chiên Philips NA120/00 4,2L',
    description: 'Series 1000 dung tích 4,2 lít, công nghệ RapidAir và thiết kế núm xoay dễ sử dụng.',
    image: '/products/philips-airfryer-na120.png',
    imageAlt: 'Nồi chiên không dầu Philips Series 1000 NA120/00 màu đen, dung tích 4,2 lít, giỏ chiên đang mở',
    sourceUrl: 'https://www.philips.com.vn/c-p/NA120_00/1000-series-airfryer-1000-series-42l',
    price: '1.290.000đ',
    oldPrice: '1.590.000đ',
    discount: '-19%',
    popularity: 7,
    tone: 'mint',
    url: 'https://shopee.vn/search?keyword=Philips%20NA120%2F00',
  },
  {
    id: 'binh-giu-nhiet',
    badge: 'Siêu nhẹ',
    kind: 'hot',
    category: 'Nhà cửa',
    brand: 'LocknLock',
    model: 'LHC3335',
    name: 'Bình LocknLock Slo Light 600ml',
    description: 'Thân bình nhẹ 250 g, thép không gỉ 316 và nắp bật một tay; hãng lưu ý chỉ dùng nước lạnh.',
    image: '/products/locknlock-slo-light-lhc3335.jpg',
    imageAlt: 'Bình giữ nhiệt LocknLock Slo Light Tumbler LHC3335 600ml màu vàng chanh trên nền trắng',
    sourceUrl: 'https://www.locknlock.vn/vi-vn/b%C3%ACnh-gi%E1%BB%AF-nhi%E1%BB%87t-locknlock-slo-light-tumbler-600ml---4-m%C3%A0u-%C4%91en%2C-tr%E1%BA%AFng%2C-v%C3%A0ng%2C-h%E1%BB%93ng---lhc3335/LHC3335.html',
    price: '405.000đ',
    oldPrice: '698.000đ',
    discount: '-42%',
    popularity: 9,
    tone: 'yellow',
    url: 'https://shopee.vn/search?keyword=LocknLock%20LHC3335',
  },
  {
    id: 'kem-chong-nang',
    badge: 'Kiềm dầu',
    kind: 'hot',
    category: 'Làm đẹp',
    brand: 'ANESSA',
    model: 'Perfect UV Milk NA 60ml',
    name: 'Sữa chống nắng ANESSA Perfect UV',
    description: 'SPF50+ PA++++, kết cấu sữa mỏng nhẹ và công nghệ Auto Veil dành cho da thiên dầu.',
    image: '/products/anessa-sunscreen-60ml.png',
    imageAlt: 'Sữa chống nắng ANESSA Perfect UV Sunscreen Skincare Milk NA 60ml màu vàng',
    sourceUrl: 'https://www.anessa.vn/products/sua-chong-nang-duong-da-kiem-dau-bao-ve-hoan-hao-spf50-pa-60ml',
    price: '715.000đ',
    oldPrice: '850.000đ',
    discount: '-16%',
    popularity: 10,
    tone: 'lavender',
    url: 'https://shopee.vn/search?keyword=ANESSA%20Perfect%20UV%20Milk%2060ml',
  },
  {
    id: 'sua-rua-mat',
    badge: 'Da dầu',
    kind: 'voucher',
    category: 'Làm đẹp',
    brand: 'CeraVe',
    model: 'Foaming Cleanser 236ml',
    name: 'Sữa rửa mặt CeraVe Foaming Cleanser',
    description: 'Gel tạo bọt cho da thường đến da dầu, làm sạch dầu thừa mà không gây khô căng.',
    image: '/products/cerave-foaming-cleanser.jpg',
    imageAlt: 'Sữa rửa mặt tạo bọt CeraVe Foaming Facial Cleanser cho da thường đến da dầu',
    sourceUrl: 'https://www.cerave.com.vn/cham-soc-da/lam-sach/sua-rua-mat-danh-cho-da-dau',
    price: '385.000đ',
    oldPrice: '465.000đ',
    discount: '-17%',
    popularity: 8,
    tone: 'rose',
    url: 'https://shopee.vn/search?keyword=CeraVe%20Foaming%20Cleanser%20236ml',
  },
  {
    id: 'ao-thun',
    badge: 'Nhanh khô',
    kind: 'sale',
    category: 'Thời trang',
    brand: 'Coolmate',
    model: 'Recycle Basics',
    name: 'Áo thể thao Coolmate Basics',
    description: 'Phom basic dễ mặc, chất liệu nhẹ và nhanh khô cho tập luyện hoặc vận động hằng ngày.',
    image: '/products/coolmate-recycle-basics.jpg',
    imageAlt: 'Áo thun nam thể thao Coolmate Basics màu nâu, phom Regular Fit',
    sourceUrl: 'https://www.coolmate.me/product/ao-the-thao-nam-promax-recycle-basics1',
    price: '199.000đ',
    oldPrice: '249.000đ',
    discount: '-20%',
    popularity: 7,
    tone: 'blue',
    url: 'https://shopee.vn/search?keyword=Coolmate%20Recycle%20Basics',
  },
  {
    id: 'tui-bim',
    badge: '2 trong 1',
    kind: 'voucher',
    category: 'Mẹ & Bé',
    brand: 'MOOIMOM',
    model: 'MMMB5101',
    name: 'Balo bỉm sữa MOOIMOM 2in1',
    description: 'Balo nhiều ngăn có khoang giữ nhiệt riêng, chống thấm và đủ chỗ cho laptop.',
    image: '/products/mooimom-diaper-bag.jpeg',
    imageAlt: 'Balo bỉm sữa đa năng MOOIMOM 2in1 màu be trên nền trắng',
    sourceUrl: 'https://www.mooimom.vn/product/tui-bim-sua-da-nang-2in1',
    price: '899.000đ',
    oldPrice: '1.090.000đ',
    discount: '-18%',
    popularity: 6,
    tone: 'purple',
    url: 'https://shopee.vn/search?keyword=MOOIMOM%20t%C3%BAi%20b%E1%BB%89m%20s%E1%BB%AFa%202in1',
  },
];
