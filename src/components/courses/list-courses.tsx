"use client";
import { CourseList } from "@/lib/types/course.type";
import React from "react";
import CourseCard from "./course-card";
type ListCoursesProps = {
  items: CourseList;
};
const ListCourses = ({ items }: ListCoursesProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {items.map((item) => (
        <CourseCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListCourses;
