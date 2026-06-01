import { CourseStatus } from "@/lib/types/course.type";
import { HelpCircle, Layers, PlayCircle, BookOpenCheck } from "lucide-react";

export const getLessonIcon = (type: string) => {
  switch (type) {
    case "quiz":
      return <HelpCircle className="h-4 w-4 text-amber-500" />;
    case "flashcard":
      return <Layers className="h-4 w-4 text-primary-500" />;
    case "video":
      return <BookOpenCheck className="h-4 w-4 text-secondary-500" />;
    default:
      return (
        <PlayCircle className="h-4 w-4 text-zinc-400 group-hover:text-secondary-500 transition-colors" />
      );
  }
};

export const getStatusStyle = (status: CourseStatus) => {
  switch (status) {
    case "published":
      return {
        text: "Đã xuất bản",
        container:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-500 animate-pulse",
      };
    case "draft":
      return {
        text: "Bản nháp",
        container:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        dot: "bg-amber-500",
      };
    case "archived":
      return {
        text: "Đã lưu trữ",
        container:
          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
        dot: "bg-rose-500",
      };
    default:
      return {
        text: "Không xác định",
        container: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
        dot: "bg-zinc-500",
      };
  }
};
