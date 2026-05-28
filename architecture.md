# Kiến trúc Dự án Next.js (Anti-Gravity Stack)

## 🛠️ Công nghệ cốt lõi (Tech Stack)
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Theme:** next-themes (Hỗ trợ Dark/Light mode)
- **State Management:** Zustand
- **Data Fetching & Cache:** TanStack Query (React Query)

## 📁 Cấu trúc thư mục (Folder Structure)
- `src/app/`: Quản lý routing và các trang (Pages).
- `src/components/ui/`: Chứa các component gốc từ shadcn/ui (Button, Card, Dropdown, v.v.).
- `src/components/`: Chứa các component dùng chung do người dùng tự viết.
- `src/lib/`: Chứa các hàm tiện ích (ví dụ: `utils.ts` của shadcn).
- `src/providers/`: Bộ bọc quản lý State và Theme (`Theme-provider.tsx`, `query-provider.tsx`).
- `src/store/`: Quản lý Global State bằng Zustand (`useCounterStore.ts`).

## 📜 Quy tắc code dành cho AI (AI Coding Rules)
1. Luôn sử dụng TypeScript với kiểu dữ liệu (Types/Interfaces) rõ ràng, tuyệt đối không dùng `any`.
2. Giao diện phải luôn đảm bảo hiển thị đẹp ở cả 2 chế độ Dark và Light mode bằng các class của Tailwind (ví dụ: `bg-white dark:bg-zinc-950`).
3. Các tác vụ gọi API từ phía Client bắt buộc phải đi qua TanStack Query, không sử dụng `useEffect` thuần để fetch data.
4. Khi cài thêm component mới của shadcn, hãy bỏ vào đúng thư mục `src/components/ui/`.