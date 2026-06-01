import { courseService } from "@/lib/services/course-service";
import React, { Suspense } from "react";

import ListCourses from "@/components/courses/list-courses";
import { CourseList } from "@/lib/types/course.type";
import SectionHeading from "@/components/common/section-heading";
import LoadingQuiz from "@/components/loading/loading-quiz";

export default async function Courses() {
  const courses: CourseList | [] = await courseService.getCourses();

  return (
    <Suspense fallback={<LoadingQuiz />}>
      <SectionHeading
        title="Khám phá các khoá học "
        subTitle="Khám phá những kỹ năng mới và nâng cao kiến thức của bạn."
      />
      <ListCourses items={courses} />
    </Suspense>
  );
}
