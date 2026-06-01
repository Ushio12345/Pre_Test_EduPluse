# EduPluse - Frontend (FE) Pre-Test

Giao diện ứng dụng học tập trực tuyến tích hợp hệ thống khóa học, bài học và bài kiểm tra trắc nghiệm thuộc dự án EduPluse.

---

## 📌 Overview

EduPluse là nền tảng học tập trực tuyến được xây dựng bằng Next.js, TypeScript và Tailwind CSS. Dự án tập trung vào việc xây dựng trải nghiệm học tập hiện đại với hệ thống quản lý khóa học, làm bài Quiz và theo dõi tiến độ học tập của người dùng.

---

## 🚀 Demo

- Demo: https://your-demo-link.vercel.app
- Repository: https://github.com/Ushio12345/Pre_Test_EduPluse

---

## 🛠 Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI

### Authentication

- Firebase Authentication

### Media Storage

- Cloudinary

### State Management

- React Hooks
- Context API

---

## ✨ Features

### 📚 Courses & Lessons

- Hiển thị danh sách khóa học.
- Hiển thị chi tiết khóa học.
- Responsive trên Desktop và Mobile.

### 📝 Quiz System

- Danh sách bài Quiz.
- Làm bài trắc nghiệm.
- Tính điểm tự động.
- Hiển thị kết quả sau khi nộp bài.

### 🔐 Authentication

- Đăng ký tài khoản.
- Đăng nhập bằng Email/Password.
- Firebase Authentication.

### 👤 User Profile

- Cập nhật thông tin cá nhân.
- Theo dõi tiến độ học tập.
- Hiển thị lịch sử học tập.

---

## 📁 Folder Structure

```bash
src/
├── app/
│   ├── (auth)/
│   ├── courses/
│   ├── profile/
│   ├── quiz/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   └── course/
│
├── lib/
│   ├── types/
│   └── utils.ts
│
├── public/
│
└── tailwind.config.ts
```

---

## ⚙️ Environment Variables

```env
EDU_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_EDU_API_BASE_URL=http://localhost:5000/api

NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

NEXT_PUBLIC_FALLBACK_IMAGE=/placeholder.png
```

---

## 💻 Installation

Clone repository:

```bash
git clone https://github.com/Ushio12345/Pre_Test_EduPluse.git
cd Pre_Test_EduPluse
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 📊 Build Metrics

```text
├ ○ /profile                           25 kB      275 kB
├ ƒ /quiz                              4.13 kB    105 kB
├ ƒ /quiz/[id]                         5.71 kB    106 kB
└ ○ /register                          1.75 kB    262 kB

+ First Load JS shared by all          87 kB
```

---

## 📱 Screenshots

### Home Page

![Home](./public/screenshots/home.png)

### Quiz Page

![Quiz](./public/screenshots/quiz.png)

### Profile Page

![Profile](./public/screenshots/profile.png)

---

## 🔮 Future Improvements

- Dark Mode
- Course Search & Filtering
- Leaderboard
- Certificate Generation
- Real-time Quiz Analytics

---

## 👨‍💻 Author

Ushio

GitHub:
https://github.com/Ushio12345

---

⭐ Thank you for reviewing this project.
