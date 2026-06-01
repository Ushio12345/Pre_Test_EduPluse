import React, { Suspense } from "react";
import Link from "next/link";
import { ClipboardX, ArrowLeft, RefreshCw } from "lucide-react";
import { QuizList } from "@/lib/types/quiz.type";
import { quizService } from "@/lib/services/quiz-service";
import ListQuiz from "@/components/quiz/list-quiz";
import LoadingQuiz from "@/components/loading/loading-quiz";
import { Button } from "@/components/ui/button";

export default async function QuizesePage() {
    const quizzes: QuizList | [] = await quizService.getQuizs();

    if (!quizzes || quizzes.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center  border-2 border-dashed border-border rounded-2xl bg-card text-center max-w-xl mx-auto my-10">
                <div className="p-4 rounded-full bg-muted border border-border text-muted-foreground mb-4">
                    <ClipboardX className="h-10 w-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">
                    Danh sách bài tập trống
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
                    Hiện tại chưa có bài kiểm tra trắc nghiệm nào được kích hoạt trên hệ thống. Vui lòng quay lại sau!
                </p>
                <div className="flex items-center gap-3">
                    <Button asChild variant="outline" className="gap-2 border-border hover:bg-muted">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                            Về trang chủ
                        </Link>
                    </Button>
                    <Button asChild className="gap-2">
                        <Link href="/quizzes">
                            <RefreshCw className="h-4 w-4" />
                            Tải lại trang
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={<LoadingQuiz />}>
            <ListQuiz items={quizzes} />
        </Suspense>
    );
}