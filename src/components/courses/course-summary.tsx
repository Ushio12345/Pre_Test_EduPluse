import { formatDuration } from "@/lib/utils";
import { Award, BookOpen, Clock } from "lucide-react";
import React from "react";
type CourseSummaryProps = {
  totalLessons: number;
  level: string;
  totalDuration?: number;
};
const CourseSummary = ({
  totalLessons,
  level,
  totalDuration,
}: CourseSummaryProps) => {
  return (
    <section>
      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl border-2 border-border bg-card text-center">
        <div className="space-y-1">
          <BookOpen className="h-5 w-5 mx-auto text-secondary-500" />
          <p className="text-xs text-custom-text-secondary font-medium">
            Bài học
          </p>
          <p className="text-sm font-bold">{totalLessons} bài</p>
        </div>
        <div className="space-y-1 border-x border-border">
          <Clock className="h-5 w-5 mx-auto text-secondary-500" />
          <p className="text-xs text-custom-text-secondary font-medium">
            Thời lượng
          </p>
          <p className="text-sm font-bold">{formatDuration(totalDuration)}</p>
        </div>
        <div className="space-y-1">
          <Award className="h-5 w-5 mx-auto text-secondary-500" />
          <p className="text-xs text-custom-text-secondary font-medium">
            Cấp độ
          </p>
          <p className="font-bold uppercase text-xs">{level}</p>
        </div>
      </div>
    </section>
  );
};

export default CourseSummary;
