# JOB FINDER - Nhóm 16

## Thông tin nhóm
| STT | Họ và Tên         | Mã Sinh Viên  |
|-----|--------------------|---------------|
| 1   | Hoàng Minh Khương | B21DCCN461    |
| 2   | Nguyễn Văn Khanh  | B21DCCN449    |
| 3   | Đào Hải Đăng      | B21DCCN197    |

## Giới thiệu
JOB FINDER là một ứng dụng tìm kiếm việc làm được phát triển bằng Android, kết hợp với backend NestJS. Ứng dụng giúp người dùng tìm kiếm việc làm phù hợp và các nhà tuyển dụng đăng tin tuyển dụng.

## Công nghệ sử dụng

### Backend
- **Framework**: NestJS
- **Ngôn ngữ**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **API Documentation**: Swagger
- **File Storage**: AWS S3
- **Email Service**: Nodemailer
- **Security**: Helmet, bcryptjs
- **Validation**: class-validator, class-transformer

## Cấu trúc thư mục

```
BACKEND_android_jobfinder/
├── src/
│   ├── modules/           # Các module của ứng dụng
│   │   ├── auth/         # Module xác thực
│   │   ├── users/        # Module quản lý người dùng
│   │   ├── jobs/         # Module quản lý việc làm
│   │   ├── companies/    # Module quản lý công ty
│   │   └── experiences/  # Module quản lý kinh nghiệm
│   ├── common/           # Các thành phần dùng chung
│   ├── config/           # Cấu hình ứng dụng
│   └── main.ts           # Entry point
├── test/                 # Unit tests và E2E tests
├── dist/                 # Thư mục build
└── package.json          # Quản lý dependencies
```

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (v16 trở lên)
- MySQL (v8.0 trở lên)
- Android Studio (cho phần mobile)
- JDK 11 trở lên

### Cài đặt Backend

1. Clone repository:
```bash
git clone [https://github.com/khuonggminhhoang/job-finder.git]
cd BACKEND_android_jobfinder
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env trong thư mục gốc và cấu hình các biến môi trường, mẫu dựa vào file .env.example

4. Chạy migrations để tạo database:
```bash
npm run migrate:run
```

5. Khởi động server:
```bash
# Development mode
npm run start:dev

```

## API Documentation
Sau khi chạy server, truy cập Swagger UI tại:
```
http://localhost:3001/apidoc
```

## Tính năng chính
- Đăng ký/Đăng nhập người dùng
- Quản lý thông tin cá nhân
- Nộp CV ứng tuyển
- Tìm kiếm việc làm
- Thông báo việc làm


## Liên hệ
Nếu có bất kỳ thắc mắc hoặc góp ý, vui lòng liên hệ:
- Email: [minhkhuong782k3@gmail.com]
- GitHub: [https://github.com/khuonggminhhoang]