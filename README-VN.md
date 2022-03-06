
# Free Fontaweseome

Lấy và tải xuống svg từ Fontaweseome



## Chrome extension

Mở [extension page](about://extensions/)

Bật chế độ dành cho nhà phát triển

Kéo và thả folder extension vào extension page

## Cách dùng

Vào icon mà bạn muốn lấy, ví dụ: https://fontawesome.com/icons/ban-bug?s=solid

Click vào icon extension vừa mới thêm

Ctrl + U để lấy nội dung svg hoặc Ctrl + S để tải về

Enjoy!

# Dành cho các nhà phát triển đóng góp
## Lấy tất cả svg

Hiện tại đang sử dụng prisma + mongodb

Tải project về

Vui lòng copy file .env sang .env.local, và thay thế URI kết nối mongodb vào DATABASE_URL

Cài đặt

```bash
  npm install
```

Load tất cả dữ liệu file icon vào mongodb

```bash
  npm run crawl
```

Sau khi load hết tất cả icon, giờ có thể download svg về

```bash
  npm run load
```

Lệnh này cần khoảng vài tiếng để hoàn tất.

Enjoy!
## Contributing

Luôn chào đón các nhà đóng góp vào project!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Tác giả

- [@Ily1606](https://www.facebook.com/Ily1606)

