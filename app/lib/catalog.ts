export type CouponKind = 'hot' | 'sale' | 'voucher';

export type Coupon = {
  id: string;
  code: string;
  kind: CouponKind;
  badge: string;
  title: string;
  description: string;
  category: string;
  discount: string;
  minSpend: string;
  expires: string;
  url: string;
};

export type Deal = {
  id: string;
  icon: string;
  badge: string;
  kind: CouponKind;
  category: string;
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: string;
  sold: string;
  tone: string;
  url: string;
};

export const categories = [
  { id: 'cong-nghe', name: 'Công nghệ', icon: '⌁', count: 24, copy: 'Tai nghe, phụ kiện và góc làm việc', tone: 'blue' },
  { id: 'nha-cua', name: 'Nhà cửa', icon: '⌂', count: 31, copy: 'Đồ bếp và vật dụng sống gọn', tone: 'green' },
  { id: 'lam-dep', name: 'Làm đẹp', icon: '✦', count: 19, copy: 'Skincare và chăm sóc cá nhân', tone: 'pink' },
  { id: 'thoi-trang', name: 'Thời trang', icon: '♢', count: 27, copy: 'Trang phục và phụ kiện dễ phối', tone: 'yellow' },
  { id: 'me-va-be', name: 'Mẹ & Bé', icon: '☻', count: 16, copy: 'Đồ dùng thiết thực cho gia đình', tone: 'purple' },
];

export const coupons: Coupon[] = [
  { id: 'free-ship-50', code: 'FREESHIP50', kind: 'hot', badge: 'Hot hôm nay', title: 'Giảm phí vận chuyển', description: 'Hỗ trợ tối đa 50.000đ phí vận chuyển cho đơn đủ điều kiện.', category: 'Freeship', discount: '₫50K', minSpend: 'Đơn từ 99K', expires: 'HSD 23:59 hôm nay', url: 'https://shopee.vn/m/voucher-pack' },
  { id: 'toan-san-10', code: 'CHONCHUAN10', kind: 'voucher', badge: 'Toàn sàn', title: 'Giảm 10% toàn ngành hàng', description: 'Mức giảm tối đa 100.000đ, áp dụng cho shop tham gia chương trình.', category: 'Toàn sàn', discount: '-10%', minSpend: 'Đơn từ 299K', expires: 'Còn 2 ngày', url: 'https://shopee.vn/m/voucher-pack' },
  { id: 'flash-20', code: 'SIEUSALE20', kind: 'sale', badge: 'Sale off', title: 'Giảm 20% khung giờ vàng', description: 'Mở vào 12:00 và 20:00, số lượng mã có hạn theo từng khung giờ.', category: 'Toàn sàn', discount: '-20%', minSpend: 'Đơn từ 499K', expires: 'Mở lúc 20:00', url: 'https://shopee.vn/flash_sale' },
  { id: 'tech-100', code: 'TECH100K', kind: 'voucher', badge: 'Công nghệ', title: 'Giảm cho phụ kiện công nghệ', description: 'Dành cho tai nghe, bàn phím, giá đỡ và phụ kiện điện thoại.', category: 'Theo ngành', discount: '₫100K', minSpend: 'Đơn từ 899K', expires: 'Còn 3 ngày', url: 'https://shopee.vn/search?keyword=ph%E1%BB%A5%20ki%E1%BB%87n%20c%C3%B4ng%20ngh%E1%BB%87' },
  { id: 'home-10', code: 'BEPAM10', kind: 'sale', badge: 'Nhà cửa', title: 'Giảm đồ bếp chọn lọc', description: 'Áp dụng cho gian hàng gia dụng tham gia và sản phẩm có nhãn ưu đãi.', category: 'Theo ngành', discount: '-10%', minSpend: 'Đơn từ 399K', expires: 'Còn 5 ngày', url: 'https://shopee.vn/search?keyword=%C4%91%E1%BB%93%20b%E1%BA%BFp' },
  { id: 'beauty-12', code: 'DEPXINH12', kind: 'hot', badge: 'Đang được lưu nhiều', title: 'Giảm mỹ phẩm chính hãng', description: 'Ưu tiên gian hàng chính hãng và sản phẩm có đánh giá gần đây tốt.', category: 'Theo ngành', discount: '-12%', minSpend: 'Đơn từ 249K', expires: 'Còn 1 ngày', url: 'https://shopee.vn/search?keyword=m%E1%BB%B9%20ph%E1%BA%A9m%20ch%C3%ADnh%20h%C3%A3ng' },
  { id: 'new-user', code: 'THEMMOI80', kind: 'voucher', badge: 'Người dùng mới', title: 'Ưu đãi cho đơn đầu tiên', description: 'Điều kiện áp dụng phụ thuộc tài khoản và chương trình tại thời điểm đặt.', category: 'Tài khoản mới', discount: '₫80K', minSpend: 'Đơn từ 150K', expires: 'Theo tài khoản', url: 'https://shopee.vn/m/voucher-pack' },
  { id: 'shop-extra', code: 'SHOPTHEM15', kind: 'sale', badge: 'Mã của shop', title: 'Giảm thêm khi mua tại shop', description: 'Có thể kết hợp với ưu đãi nền tảng nếu điều kiện thanh toán cho phép.', category: 'Mã của shop', discount: '-15%', minSpend: 'Tùy gian hàng', expires: 'Kiểm tra tại shop', url: 'https://shopee.vn/' },
];

export const deals: Deal[] = [
  { id: 'tai-nghe-bluetooth', icon: '🎧', badge: 'Bán chạy', kind: 'hot', category: 'Công nghệ', name: 'Tai nghe Bluetooth pin lâu', description: 'Pin từ 24 giờ, âm thanh cân bằng và thiết kế đeo lâu không đau tai.', price: '249.000đ', oldPrice: '359.000đ', discount: '-31%', rating: '4.8', sold: '8,2k', tone: 'peach', url: 'https://shopee.vn/search?keyword=tai%20nghe%20bluetooth%20pin%20l%C3%A2u' },
  { id: 'gia-do-laptop', icon: '💻', badge: 'Góc làm việc', kind: 'voucher', category: 'Công nghệ', name: 'Giá đỡ laptop công thái học', description: 'Khung chắc, nâng vừa tầm mắt và gấp gọn khi cần di chuyển.', price: '189.000đ', oldPrice: '269.000đ', discount: '-30%', rating: '4.9', sold: '3,6k', tone: 'sky', url: 'https://shopee.vn/search?keyword=gi%C3%A1%20%C4%91%E1%BB%A1%20laptop' },
  { id: 'noi-chien', icon: '🍳', badge: 'Sale off', kind: 'sale', category: 'Nhà cửa', name: 'Nồi chiên không dầu 5L', description: 'Dung tích vừa cho gia đình nhỏ, dễ vệ sinh và không chiếm nhiều chỗ.', price: '899.000đ', oldPrice: '1.290.000đ', discount: '-30%', rating: '4.8', sold: '12k', tone: 'mint', url: 'https://shopee.vn/search?keyword=n%E1%BB%93i%20chi%C3%AAn%20kh%C3%B4ng%20d%E1%BA%A7u%205l' },
  { id: 'binh-giu-nhiet', icon: '🥤', badge: 'Giá tốt', kind: 'hot', category: 'Nhà cửa', name: 'Bình giữ nhiệt 600ml', description: 'Miệng rộng dễ rửa, giữ lạnh tốt và nắp kín để bỏ vào túi.', price: '129.000đ', oldPrice: '199.000đ', discount: '-35%', rating: '4.9', sold: '22k', tone: 'yellow', url: 'https://shopee.vn/search?keyword=b%C3%ACnh%20gi%E1%BB%AF%20nhi%E1%BB%87t%20600ml' },
  { id: 'kem-chong-nang', icon: '☀️', badge: 'Hot beauty', kind: 'hot', category: 'Làm đẹp', name: 'Kem chống nắng dịu nhẹ', description: 'Kết cấu mỏng, không bí da và phù hợp với khí hậu nóng ẩm.', price: '159.000đ', oldPrice: '239.000đ', discount: '-33%', rating: '4.8', sold: '18k', tone: 'lavender', url: 'https://shopee.vn/search?keyword=kem%20ch%E1%BB%91ng%20n%E1%BA%AFng%20d%E1%BB%8Bu%20nh%E1%BA%B9' },
  { id: 'sua-rua-mat', icon: '🧴', badge: 'Routine gọn', kind: 'voucher', category: 'Làm đẹp', name: 'Sữa rửa mặt da nhạy cảm', description: 'Làm sạch vừa đủ, ít hương liệu và không gây căng da sau khi rửa.', price: '119.000đ', oldPrice: '169.000đ', discount: '-30%', rating: '4.9', sold: '9,5k', tone: 'rose', url: 'https://shopee.vn/search?keyword=s%E1%BB%AFa%20r%E1%BB%ADa%20m%E1%BA%B7t%20da%20nh%E1%BA%A1y%20c%E1%BA%A3m' },
  { id: 'ao-thun', icon: '👕', badge: 'Dễ phối', kind: 'sale', category: 'Thời trang', name: 'Áo thun cotton form rộng', description: 'Vải dày vừa, phom dễ mặc và bảng màu trung tính dùng hằng ngày.', price: '139.000đ', oldPrice: '219.000đ', discount: '-37%', rating: '4.7', sold: '15k', tone: 'blue', url: 'https://shopee.vn/search?keyword=%C3%A1o%20thun%20cotton%20form%20r%E1%BB%99ng' },
  { id: 'tui-bim', icon: '🧸', badge: 'Mẹ chọn', kind: 'voucher', category: 'Mẹ & Bé', name: 'Túi đựng đồ cho bé đa ngăn', description: 'Chia ngăn rõ, chống thấm nhẹ và đủ gọn để mang đi hằng ngày.', price: '219.000đ', oldPrice: '329.000đ', discount: '-33%', rating: '4.9', sold: '4,2k', tone: 'purple', url: 'https://shopee.vn/search?keyword=t%C3%BAi%20%C4%91%E1%BB%B1ng%20%C4%91%E1%BB%93%20cho%20b%C3%A9' },
];
