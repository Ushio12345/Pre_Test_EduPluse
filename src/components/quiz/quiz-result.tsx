import { QuizAttemptResult } from '@/lib/types/quiz.type';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import React from 'react'
type QuizResultProps = {
    title: string;
    attemptResult: QuizAttemptResult;
    passingScore: number;
    onResetQuiz: () => void;
}
export default function QuizResult({ title, attemptResult, passingScore, onResetQuiz }: QuizResultProps) {
    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card border border-custom-border-primary rounded-2xl shadow-sm text-center space-y-6 text-custom-text-primary">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Kết quả bài trắc nghiệm</h1>
                <p className="text-sm text-custom-text-secondary">{title}</p>
            </div>

            <div className="py-6 flex flex-col items-center justify-center space-y-2">
                <div className={`text-5xl font-extrabold  ${attemptResult.isPassed ? "text-emerald-500" : "text-rose-500"}`}>
                    {attemptResult.score}%
                </div>
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${attemptResult.isPassed
                    ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20"
                    : "bg-rose-500/5 text-rose-600 border-rose-500/20"
                    }`}>
                    {attemptResult.isPassed ? "HOÀN THÀNH" : "CHƯA ĐẠT"}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl border border-custom-border-primary/40 text-sm font-medium">
                <div className="flex flex-col items-center justify-center p-2">
                    <span className="text-custom-text-secondary text-xs">Trả lời đúng</span>
                    <span className="text-base font-bold flex items-center gap-1.5 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        {attemptResult.correctCount} / {attemptResult.totalQuestions} câu
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 border-l border-custom-border-primary/40">
                    <span className="text-custom-text-secondary text-xs">Điểm chuẩn qua môn</span>
                    <span className="text-base font-bold text-secondary-500 mt-1">{passingScore}%</span>
                </div>
            </div>

            <div className="pt-4 border-t border-custom-border-primary/40 flex justify-center">
                <button
                    onClick={onResetQuiz}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl bg-foreground text-background hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                    <RotateCcw className="h-4 w-4" />
                    Làm lại bài thi
                </button>
            </div>
        </div>
    )
}
