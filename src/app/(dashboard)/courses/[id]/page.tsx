import React from "react";
import { courseService } from "@/lib/services/course-service";
import { Course } from "@/lib/types/course.type";
import CourseIntro from "@/components/courses/course-intro";
import CourseSummary from "@/components/courses/course-summary";
import CoursesChapter from "@/components/courses/course-chapters";
import CourseItem from "@/components/courses/course-item";


interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { id } = await params;


  const course: Course | undefined = await courseService
    .getCourses()
    .then((list) => list.find((c) => c.id === id || c.slug === id));

  if (!course) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center">
        <p className="text-error-500 font-semibold">
          Không tìm thấy khóa học này!
        </p>
      </div>
    );
  }

  const { chapters, description, instructorName, level, thumbnailURL, title } = course;

  const totalLessons =
    chapters?.reduce((acc, chap) => acc + (chap.lessons?.length || 0), 0) || 0;

  const totalDuration =
    chapters?.reduce((acc, chap) => {
      const chapterDuration =
        chap.lessons?.reduce(
          (sum, lesson) => sum + (lesson.duration || 0),
          0,
        ) || 0;

      return acc + chapterDuration;
    }, 0) || 0;



  return (

    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 text-custom-text-primary min-w-[350px] min-h-screen overflow-auto">


      <div className="space-y-2">
        <CourseIntro data={{ title, description, id }} />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">

        <div className="order-1 lg:order-2 space-y-6 lg:sticky lg:top-20 w-full max-w-md md:max-w-xl lg:max-w-none mx-auto">
          <div className="bg-card border border-border rounded-2xl p-1 shadow-sm overflow-hidden">
            <CourseItem course={{ thumbnailURL, title, instructorName }} />
          </div>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-2 space-y-6 md:space-y-8 w-full min-w-0">
          <CourseSummary
            totalLessons={totalLessons ?? 0}
            level={level}
            totalDuration={totalDuration}
          />

          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Nội dung khóa học</h2>
            <div className="space-y-3">
              <CoursesChapter chapters={chapters} courseId={id} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}