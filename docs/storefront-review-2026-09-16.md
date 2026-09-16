# Review storefront — 16/09/2026

## Phạm vi và kết luận

Chọn Chuẩn là website khám phá sản phẩm và chuyển sang Shopee để đặt hàng. Không phải hệ thống tự bán hàng có kho, giỏ hàng, thanh toán và xử lý đơn riêng. Các màn hình khách hàng không nên hiển thị bộ lọc chương trình hoặc tỷ lệ hoa hồng.

## Đã sửa

- Thay danh sách affiliate bằng danh sách mua sắm: tìm tiếng Việt không dấu, danh mục, khoảng giá, sắp xếp giá/lượt bán và phân trang.
- Thêm trang chi tiết từng sản phẩm, sản phẩm liên quan, thông tin giá tham khảo và hướng dẫn kiểm tra người bán.
- Chỉ truyền dữ liệu mua sắm ra giao diện; bỏ tỷ lệ hoa hồng và trạng thái tích hợp khỏi dữ liệu public của sản phẩm.
- Link đã xác minh dùng “Xem giá trên Shopee”; link tìm kiếm dùng “Tìm trên Shopee”. Không giả link tìm kiếm thành link mua trực tiếp.
- Cập nhật trang chủ, điều hướng, trang danh mục, chân trang; thêm hướng dẫn mua hàng và thông tin quyền riêng tư.
- Gỡ giá gạch ngang và phần trăm giảm minh họa khỏi thẻ deal/trang chi tiết; không sắp xếp theo số giảm hoặc độ phổ biến minh họa.
- Thêm trạng thái voucher hết lượt; ẩn khỏi danh sách đang dùng và chặn chuyển ra Shopee bằng voucher hết lượt.
- Voucher vận chuyển lưu trực tiếp không có nút sao chép ID nội bộ.
- Đối chiếu dữ liệu voucher trong code với MongoDB theo thời điểm xác minh, giữ bản mới hơn và không xóa voucher khác.
- Thêm trang lỗi, loading và URL sản phẩm/hỗ trợ vào sitemap; tránh lỗi trang chủ khi danh sách deal rỗng.

## Nguồn voucher

Đối chiếu ngày 16/09/2026 trên trang công khai chính thức và trang Điều Kiện của từng voucher:

- Kho mã: https://shopee.vn/m/ma-giam-gia
- Vận chuyển: https://shopee.vn/m/mien-phi-van-chuyen
- Chiến dịch cuối tháng: https://shopee.vn/m/ma-giam-gia-24-09
- URL bằng chứng riêng và điều kiện được lưu tại `app/lib/coupons.ts`.

CRMNUICL60T9 và voucher vận chuyển tối đa 500.000đ còn trong thời hạn, có giới hạn tài khoản/đơn đầu tiên/shop/sản phẩm. CRMNUICL80T9 đã hết lượt dù chưa đến ngày hết hạn. Không cam kết voucher áp dụng cho mọi người. Không có đồng bộ thời gian thực hay API voucher tự động trong bản này.

## Kiểm tra

- `npm run check`: 18 tests, ESLint và production build thành công.
- HTTP smoke test: 49 URL trong sitemap đều HTTP 200 trên production build local dùng MongoDB.
- Không còn nội dung “Hoa hồng Shopee”, “Hoa hồng Xtra”, “Affiliate đã được bật” trên HTML `/san-pham`.
- Redirect sản phẩm hợp lệ: 307 đến Shopee; ID không tồn tại: 404; voucher hết lượt quay về danh sách nguồn chính thức.
- Browser: desktop danh sách; mobile 390px voucher và kết quả sản phẩm; tìm `cuong luc` với giá tối đa 30.000đ ra 2 kết quả; trang chi tiết; ảnh sản phẩm tải được; không thấy lỗi console trong luồng đã thử.
- Không thực hiện đơn mua hàng thật hay kiểm tra thanh toán Shopee.

## Còn cần hoàn thiện bằng dữ liệu/quyền truy cập thật

1. Catalog hiện có 26 sản phẩm, không phải toàn bộ Shopee. Chỉ 1 link affiliate trực tiếp; 25 link tìm kiếm cần thay bằng URL sản phẩm + link affiliate được xác minh nếu muốn đo hoa hồng chính xác.
2. Chưa có nguồn API/export tự động để đồng bộ catalog, tồn kho, giá và voucher. Dữ liệu hiện là snapshot; cần đối chiếu định kỳ, không coi là thời gian thực.
3. Phân loại đang suy ra từ tên sản phẩm. Khi tăng catalog cần category ID từ nguồn và lọc/phân trang có index tại MongoDB thay vì tải toàn bộ.
4. Mục deal biên tập là gợi ý mua sắm, chưa phải feed khuyến mãi trực tiếp của shop. Không công bố giá giảm khi chưa có nguồn đối chiếu.
5. Nếu bán và thanh toán ngay trên website, cần xác định nhà bán/kho, SKU, phí giao hàng, thanh toán, quản lý đơn và chính sách vận hành trước khi triển khai.

Push code không tự chứng minh website production đã cập nhật; phải kiểm tra bản đang phục vụ sau deployment.
