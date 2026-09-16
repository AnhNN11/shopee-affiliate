# Chọn Chuẩn

Website biên tập deal và mã giảm giá Shopee. Dữ liệu sản phẩm được đối chiếu với trang hãng; mã giảm giá chỉ được xuất bản khi có trang điều kiện Shopee riêng.

## Chạy dự án

Yêu cầu Node.js 22.

```bash
npm install
npm run dev
```

Kiểm tra đầy đủ trước khi deploy:

```bash
npm run check
```

## Cập nhật mã giảm giá

Dữ liệu và quy tắc vòng đời nằm tại `app/lib/coupons.ts`.

Một mã chỉ được đặt `published: true` khi có đủ:

- mã chính xác và không trùng;
- mức giảm, đơn tối thiểu, đối tượng áp dụng;
- `startsAt`, `endsAt`, `verifiedAt` theo RFC 3339 và có múi giờ;
- `sourceUrl` là trang Điều Kiện cụ thể trên Shopee;
- `destinationUrl` là trang Shopee để người dùng lưu hoặc áp mã.

Trang chủ, trang danh sách, danh mục và sitemap tự loại mã hết hạn. Trang chi tiết cũ vẫn tồn tại ở trạng thái `noindex, follow` để không tạo URL rác. Các trang nhạy theo thời gian được revalidate mỗi 60 giây.

## Shopee Affiliate

Trang `/san-pham` đọc collection `affiliate_products`, tìm kiếm và phân trang phía server. Dữ liệu dùng schema v2 để lưu riêng hoa hồng Shopee, Xtra, tổng hoa hồng, trạng thái link và thời gian xác minh.

Route `/go/product/[id]` chỉ chuyển hướng khi sản phẩm có `status: "active"` và `affiliateUrl` HTTPS thuộc Shopee. Sản phẩm chờ link không được thay bằng link tìm kiếm vì có thể không ghi nhận hoa hồng. Lỗi ghi click không chặn chuyển hướng mua hàng.

Không nhận URL đích từ query string. Route chuyển hướng chỉ tra ID có trong catalog và chỉ cho phép hostname Shopee qua HTTPS để tránh open redirect.

Nhập hoặc đồng bộ tệp JSON đã chuẩn hóa:

```bash
npm run db:import-products -- products.json
```

Thêm `--reconcile` khi tệp là snapshot đầy đủ; sản phẩm không còn trong snapshot sẽ được chuyển sang `expired`, không bị xóa.

```bash
npm run db:import-products -- products.json --reconcile
npm run db:audit-products
```

`npm run db:seed` chỉ thêm sản phẩm mẫu chưa tồn tại, không ghi đè link Affiliate đã nhập. Dùng `npm run db:migrate-products` khi nâng dữ liệu cũ lên schema v2.

## MongoDB

Website dùng MongoDB cho bốn collection nội dung (`categories`, `deals`, `coupons`, `affiliate_products`) và một collection thống kê (`outbound_clicks`). Khi chưa có `MONGODB_URI`, ứng dụng dùng catalog trong source để local development và build preview không bị chặn.

1. Tạo database trên MongoDB Atlas hoặc MongoDB tự quản lý.
2. Sao chép `.env.example` thành `.env.local`, sau đó điền `MONGODB_URI` và `MONGODB_DB`.
3. Chạy `npm run db:seed` để tạo index và đồng bộ dữ liệu mẫu.
4. Chạy `npm run dev` và kiểm tra danh sách deal, mã giảm giá cùng route `/go/*`.

Không commit connection string. Trên Vercel, thêm hai biến MongoDB vào Project Settings → Environment Variables trước khi deploy.

## Biến môi trường

Sao chép `.env.example` thành `.env.local` khi phát triển cục bộ. Trên Vercel, cấu hình cùng tên trong Project Settings → Environment Variables.
