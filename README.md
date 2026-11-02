# Quản lý quân số trực ban

PWA ngoại tuyến kế thừa giao diện bốn tab của tệp HTML tham chiếu: **Điểm danh, Báo cáo, Lịch sử, Cài đặt**. Thiết kế xanh đậm được giữ nguyên.

## Chức năng

- Điểm danh độc lập theo Sáng, Chiều, Tối và bản dự kiến Sáng ngày tiếp theo.
- Chọn cán bộ vắng bằng checkbox; tên đã chọn ở nhóm trên tự ẩn khỏi nhóm dưới. Số lượng vắng tự đếm theo tên đã tích.
- Tìm nhanh tên theo dấu hoặc không dấu; danh sách lọc ngay khi gõ.
- Bố cục điện thoại xếp dọc, bộ đếm và checkbox có vùng chạm lớn hơn.
- Danh sách Chỉ huy trực và Trực ban được nạp lại sau khi dữ liệu đã lưu tải xong.
- Danh mục nhóm vắng bắt đầu trống; người dùng tự thêm, sửa hoặc xóa nhóm.
- Nạp danh sách cán bộ hàng loạt từ CSV/TXT hoặc dán nhiều tên; thêm, sửa, xóa từng người. Tên trùng được gộp.
- Dữ liệu số lượng nhập từ phiên bản cũ vẫn được giữ nếu chưa chuyển nhóm sang chọn tên.
- Sáu ô Chỉ huy trực và sáu ô Trực ban có thể chỉnh sửa.
- Tính tổng vắng/có mặt, cảnh báo khi số liệu không khớp.
- Xem báo cáo gửi Zalo, sao chép văn bản, lưu lịch sử, xuất hoặc chia sẻ ảnh PNG chi tiết.
- Xuất và phục hồi bản sao lưu JSON.
- IndexedDB là nơi lưu chính, localStorage được dùng làm bản dự phòng; service worker lưu giao diện để dùng ngoại tuyến.

### Nạp danh sách cán bộ

Trong **Cài đặt > Danh sách cán bộ**, chọn **Nạp danh sách** rồi tải tệp `.txt`/`.csv` hoặc dán danh sách. Mỗi dòng là một tên; tệp CSV lấy cột đầu tiên. Chọn **Thêm vào danh sách** để giữ các tên đang có, hoặc **Thay toàn bộ danh sách** để thay danh mục. Tệp Excel `.xlsx` cần lưu thành CSV/TXT trước khi nạp.

## Riêng tư

Dữ liệu điểm danh chỉ lưu trên thiết bị/trình duyệt đang sử dụng. Repository chỉ chứa mã và không chứa dữ liệu cá nhân hay dữ liệu nghiệp vụ. Không có máy chủ, đăng nhập, đồng bộ hoặc mã hóa dữ liệu. Hãy bảo vệ thiết bị và giữ bản sao lưu ở nơi an toàn; không đưa dữ liệu thật lên GitHub.

## Dùng PWA

Phục vụ thư mục `www` qua HTTPS (GitHub Pages đáp ứng điều kiện này), mở đường dẫn trên điện thoại và dùng chức năng thêm vào màn hình chính của trình duyệt. Mở lần đầu khi có kết nối để lưu tệp ứng dụng ngoại tuyến.

## Tạo APK Android

Cần Node.js/npm, JDK 17 và Android SDK (Android Studio cài đặt SDK/Build Tools). Từ thư mục dự án:

```sh
npm install
npm run android:add
npm run android:sync
npm run android:open
```

Trong Android Studio chọn **Build > Build Bundle(s) / APK(s) > Build APK(s)**. APK debug thường nằm tại `android/app/build/outputs/apk/debug/app-debug.apk`. Lệnh dòng lệnh tương đương (sau khi thêm Android platform):

```sh
cd android
./gradlew assembleDebug
```

Windows dùng `gradlew.bat assembleDebug`. Ký APK phát hành cần cấu hình khóa ký riêng; không commit khóa hoặc dữ liệu thật vào repository. APK chưa được tạo trong môi trường bàn giao này do không phát hiện JDK/Android SDK.

## GitHub Pages

Workflow `.github/workflows/pages.yml` tự xuất bản thư mục `www` sau mỗi lần đẩy lên `main`. Trong repository, đặt **Settings > Pages > Build and deployment > Source** thành **GitHub Actions**. URL dự kiến: `https://mitt2105.github.io/Quanso/`; xác minh trạng thái workflow và mở URL sau lần triển khai đầu.

## Cấu trúc

- `www/`: ứng dụng PWA và tài nguyên ngoại tuyến.
- `capacitor.config.ts`, `package.json`: cấu hình Capacitor để tạo Android wrapper.
- `.github/workflows/pages.yml`: xuất bản GitHub Pages.

## Chuyển đổi dữ liệu cũ

Bản tham chiếu cũ dùng localStorage với khóa `qstb_data_v1`. Ứng dụng tự đọc khóa này lần đầu nếu IndexedDB chưa có dữ liệu, sau đó ghi bản chính vào IndexedDB. Luôn xuất một bản sao lưu trước khi xóa dữ liệu trình duyệt.

