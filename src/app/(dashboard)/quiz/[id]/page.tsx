import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Quiz } from "@/lib/types/quiz.type";
import { quizService } from "@/lib/services/quiz-service";
import QuizItem from "@/components/quiz/quiz-item";
import { Button } from "@/components/ui/button";

export default async function QuizPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const quiz: Quiz = await quizService.getQuizById(id);


    if (!quiz) {

        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-2xl bg-card text-center max-w-xl mx-auto my-10">
                <div className="p-4 rounded-full bg-muted border border-border text-muted-foreground mb-4">
                    <FileQuestion className="h-10 w-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">
                    Bài trắc nghiệm không tồn tại
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
                    Mã bài tập này không hợp lệ hoặc đã bị gỡ bỏ khỏi hệ thống quản lý.
                </p>
                <Button asChild variant="outline" className="gap-2 border-border hover:bg-muted">
                    <Link href="/quizzes">
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh sách bài tập
                    </Link>
                </Button>
            </div>
        );

    }

    return (
        <div className="w-full">
            <QuizItem quiz={quiz} />
        </div>
    );
}