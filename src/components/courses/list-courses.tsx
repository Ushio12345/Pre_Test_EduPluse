"use client";

import { CourseList } from "@/lib/types/course.type";
import React, { useState } from "react";
import CourseCard from "./course-card";

type ListCoursesProps = {
  items: CourseList;
};

const ListCourses = ({ items }: ListCoursesProps) => {
  // 1. Tạo state lưu từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Logic lọc danh sách khóa học dựa trên từ khóa (Không phân biệt chữ hoa/thường)
  const filteredCourses = items.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl  shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Số lượng kết quả hiển thị */}
        <div className="text-xs text-muted-foreground font-medium self-end sm:self-center">
          Hiển thị: <span className="text-foreground font-semibold">{filteredCourses.length}</span>/{items.length} khóa học
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
          {filteredCourses.map((item) => (
            <CourseCard key={item.id} item={item} />
          ))}
        </div>
      ) : (

        <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
          <p className="text-sm text-muted-foreground">Không tìm thấy khóa học nào khớp với từ khóa "{searchQuery}".</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs font-semibold text-primary hover:underline"
          >
            Xóa bộ lọc và thử lại
          </button>
        </div>
      )}
    </div>
  );
};

export default ListCourses;