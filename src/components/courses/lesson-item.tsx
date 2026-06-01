import React from "react";
import { PlayCircle, HelpCircle, Layers } from "lucide-react";
import { Lesson } from "@/lib/types/course.type";
import { getLessonIcon } from "../common/status";
import { formatDuration } from "@/lib/utils";

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  onChangePage: (lesson: Lesson) => void;
}

const LessonItem = ({ lesson, index, onChangePage }: LessonItemProps) => {


  return (
    <div onClick={() => onChangePage(lesson)} className="p-3.5 px-5 flex items-center justify-between hover:bg-muted/20 transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        {getLessonIcon(lesson.type)}

        <span className="text-sm font-medium text-custom-text-secondary group-hover:text-custom-text-primary transition-colors line-clamp-1">
          {index + 1}. {lesson.title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {lesson.type !== "video" && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-custom-text-secondary">
            {lesson.type}
          </span>
        )}
        <span className="text-xs text-custom-text-secondary font-medium ">
          {formatDuration(lesson?.duration)}
        </span>
      </div>
    </div>
  );
};

export default LessonItem;
