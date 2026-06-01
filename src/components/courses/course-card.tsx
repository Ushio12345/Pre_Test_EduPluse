"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Course } from "@/lib/types/course.type";
import { Button } from "../ui/button";
import { upperFirstString } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  item: Course;
}

export default function CourseCard({ item }: CourseCardProps) {
  const router = useRouter();
  const fallbackImage = process.env.NEXT_PUBLIC_FALLBACK_IMAGE || "@/images/default_image.jpeg";

  const [imgSrc, setImgSrc] = useState<string>(item.thumbnailURL || fallbackImage);

  useEffect(() => {
    if (item.thumbnailURL?.includes("photo-1618401471353-b98aedd07871") || !item.thumbnailURL) {
      setImgSrc(fallbackImage);
    } else {
      setImgSrc(item.thumbnailURL);
    }
  }, [item.thumbnailURL]);

  const totalLessons =
    item.chapters?.reduce(
      (acc, chap) => acc + (chap.lessons?.length || 0),
      0,
    ) || 0;

  const progress =
    item.id === "c_nextjs_101" ? 25 : item.id === "c_typescript_pro" ? 100 : 0;

  const levelStyles = {
    beginner: {
      text: "Dễ",
      class: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    intermediate: {
      text: "Trung bình",
      class: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
    advanced: {
      text: "Khó",
      class: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    },
  };

  const currentLevel = levelStyles[item.level] || levelStyles.beginner;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border border-2 bg-card text-custom-text-primary shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          sizes="(max-w-7xl) 33vw, 100vw"
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          priority={false}
          onError={() => {
            setImgSrc(fallbackImage);
          }}
          unoptimized={imgSrc === fallbackImage}
        />
        <span className="absolute left-4 top-4 rounded-lg bg-card px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
          {upperFirstString(item.level)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-3">
          <div>
            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold tracking-wide ${currentLevel.class}`}>
              {currentLevel.text}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight group-hover:text-indigo-500 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <div className="flex items-center gap-2 text-custom-text-secondary text-sm font-medium">
            <BookOpen className="h-4 w-4 stroke-[2.5]" />
            <span>{totalLessons} bài</span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-custom-text-secondary">
            <span>
              {progress === 0 ? "Not started" : `${progress}% Complete`}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-custom-text-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-1">
        <Button
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-xl py-2"
          onClick={() => router.push(`/courses/${item.id}`)}
        >
          {progress === 0 ? "Bắt đầu khóa học" : "Tiếp tục học"}
        </Button>
      </div>
    </div>
  );
}