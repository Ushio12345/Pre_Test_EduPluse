import React from "react";
import { courseService } from "@/lib/services/course-service";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import CoursesChapter from "@/components/courses/course-chapters";

interface LearningPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lesson: string }>;
}

export default async function LearningPage({ params, searchParams }: LearningPageProps) {
    const { id: courseId } = await params;
    const { lesson: currentLessonId } = await searchParams;

    const course = await courseService
        .getCourses()
        .then((list) => list.find((c) => c.id === courseId || c.slug === courseId));

    if (!course) {
        return <div className="p-8 text-center text-error-500 font-semibold">Không tìm thấy khóa học!</div>;
    }

    let currentLesson = course.chapters?.[0]?.lessons?.[0];
    const videoLesson = currentLesson as { videoURL?: string; title: string; order: number; content?: string };
    if (currentLessonId && course.chapters) {
        for (const chapter of course.chapters) {
            const found = chapter.lessons?.find((l) => l.lessonId === currentLessonId);
            if (found) {
                currentLesson = found;
                break;
            }
        }
    }

    if (!currentLesson) {
        return <div className="p-8 text-center text-zinc-500">Chưa có bài học nào trong khóa này.</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-background text-custom-text-primary overflow-hidden">
            <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                    <Link
                        href={`/courses/${courseId}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-zinc-500 hover:text-custom-text-primary shrink-0"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="min-w-0">
                        <h1 className="text-sm sm:text-base font-bold line-clamp-1">{course.title}</h1>
                    </div>
                </div>
                <div className="text-xs text-zinc-500 font-medium shrink-0 pl-2">
                    Đang học: <span className="font-semibold text-primary-500">{currentLesson.title}</span>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

                <div className="flex-1 flex flex-col overflow-y-auto bg-background">


                    <div className="w-full bg-black aspect-video relative shadow-2xl flex-shrink-0 border-b border-border/40">
                        {videoLesson.videoURL ? (
                            <iframe
                                src={`${videoLesson.videoURL}?autoplay=1&rel=0&modestbranding=1`}
                                title={videoLesson.title}
                                className="absolute top-0 left-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-2">
                                <BookOpen className="h-8 w-8 stroke-[1.5]" />
                                <p className="text-sm">Bài học này không có dữ liệu Video.</p>
                            </div>
                        )}
                    </div>


                    <div className="p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto lg:mx-0">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-600 dark:text-primary-400 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                                Bài {currentLesson.order} • Video Bài Giảng
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                {currentLesson.title}
                            </h2>
                        </div>

                        <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent" />


                        <div className="bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Mô tả bài học</h3>
                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-medium">
                                {videoLesson.content || "Không có mô tả bổ sung cho bài học này."}
                            </p>
                        </div>
                    </div>
                </div>

                <aside className="w-full lg:w-[360px] border-t lg:border-t-0 lg:border-l border-border bg-card flex flex-col overflow-y-auto flex-shrink-0 h-[40vh] lg:h-full">
                    <div className="p-4 border-b border-border bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
                        <h3 className="text-sm font-bold tracking-wide uppercase text-zinc-500">Nội dung khóa học</h3>
                    </div>
                    <div className="p-2">
                        <CoursesChapter chapters={course.chapters} courseId={courseId} />
                    </div>
                </aside>
            </div>
        </div>
    );
}