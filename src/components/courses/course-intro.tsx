import React from "react";
import SectionHeading from "../common/section-heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
type CourseIntroProps = {
  data: {
    title: string;
    description?: string;
    id: string;
  };
};
const CourseIntro = ({ data }: CourseIntroProps) => {
  const { title, description, id } = data;
  return (
    <section className="space-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">Khoá học</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/courses/${id}`} aria-disabled>
              {title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SectionHeading title={title} subTitle={description} />
    </section>
  );
};

export default CourseIntro;
