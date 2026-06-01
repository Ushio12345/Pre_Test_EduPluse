import { Course, CourseStatus } from "@/lib/types/course.type";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
interface CourseItemProps {
  course: {
    thumbnailURL: string;
    title: string;
    instructorName: string;
  };
}

const CourseItem = ({ course }: CourseItemProps) => {
  const { thumbnailURL, title, instructorName } = course;

  return (
    <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-sm">
      <div className="relative aspect-[16/9] w-full bg-muted">
        <Image src={thumbnailURL} alt={title} fill className="object-cover" />
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-custom-text-primary line-clamp-1">
            {title}
          </h2>

          <Badge className="my-2 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-none shadow-none font-medium">
            {instructorName}
          </Badge>
        </div>

        <div className="pt-2 border-t border-border text-center">
          <p className="text-xs text-custom-text-secondary font-medium">
            Truy cập trọn đời • Học mọi lúc mọi nơi
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
