"use client";
import { Chapter, Lesson } from "@/lib/types/course.type";
import React from "react";
import LessonItem from "./lesson-item";
import { useRouter } from "next/navigation";
type CourseCurriculumProps = {
  chapters: Chapter[];
  courseId: string;

};

const CoursesChapter = ({ chapters, courseId }: CourseCurriculumProps) => {
  const router = useRouter();
  const handleLessonRedirect = (lesson: Lesson) => {

    if (!courseId || courseId === "undefined") {

      return;
    }

    switch (lesson.type) {
      case "quiz":
        if (lesson.quizId) {
          router.push(`/quiz/${lesson.quizId}`);
        }
        break;

      case "flashcard":
        if (lesson.deckId) {
          router.push(`/courses/${courseId}/flashcards`);
        }
        break;

      case "video":
      default:

        router.push(`/courses/${courseId}/video?lesson=${lesson.lessonId}`);
        break;
    }
  };
  return (
    <div className="space-y-4">
      {chapters?.map((chapter, chapIdx) => (
        <div
          key={chapter.chapterId}
          className="rounded-xl border-2 border-border bg-card overflow-hidden shadow-sm"
        >
          {/* Header của Chương */}
          <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-custom-text-primary">
                Chương {chapIdx + 1}: {chapter.title}
              </h3>
              <p className="text-xs text-custom-text-secondary font-medium mt-0.5">
                {chapter.lessons?.length || 0} bài học
              </p>
            </div>
          </div>

          {/* Danh sách bài học của Chương */}
          <div className="divide-y divide-custom-border-primary">
            {chapter.lessons?.map((lesson, lesIdx) => (
              <LessonItem
                key={lesson.lessonId}
                lesson={lesson}
                index={lesIdx}
                onChangePage={handleLessonRedirect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesChapter;
