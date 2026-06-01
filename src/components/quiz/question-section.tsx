import { QuestionType, QuizQuestion } from '@/lib/types/quiz.type';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
type QuestionSectionProps = {
    currentQuestion: QuizQuestion;
    onSelectOption: (optionId: string) => void;
    userAnswers: Record<string, string[]>;
    currentIndex: number;
    setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
    totalQuestions: number;
}
export default function QuestionSection({ currentQuestion, onSelectOption, userAnswers, currentIndex, setCurrentQuestionIdx, totalQuestions }: QuestionSectionProps) {
    const { options } = currentQuestion;
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-base sm:text-lg font-bold leading-snug">{currentQuestion.questionText}</h2>
                <button className="p-2 rounded-lg bg-muted/60 text-custom-text-secondary border border-border/40 shrink-0"><Flag className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3">
                {options.map((option) => {
                    const isSelected = userAnswers[currentQuestion.questionId]?.includes(option.optionId);
                    return (
                        <div
                            key={option.optionId}
                            onClick={() => onSelectOption(option.optionId)}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${isSelected ? "border-secondary-500 bg-secondary-500/5 text-secondary-600" : "border-border hover:border-border/80 bg-card hover:bg-muted/30"}`}
                        >
                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-secondary-500" : "border-zinc-400"}`}>
                                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-secondary-500" />}
                            </div>
                            <span className="text-sm font-medium leading-normal">{option.text}</span>
                        </div>
                    );
                })}
            </div>


            <div className="flex items-center justify-between mt-6 pt-6  border-t border-border ">
                <Button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentQuestionIdx((prev) => prev - 1)}
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-foreground text-background hover:opacity-90 transition-all"
                >
                    <ChevronLeft className="h-4 w-4" /> Câu trước
                </Button>


                <Button
                    disabled={currentIndex >= totalQuestions - 1}
                    onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-foreground text-background hover:opacity-90 transition-all"
                >
                    Câu tiếp theo <ChevronRight className="h-4 w-4" />
                </Button>



            </div>
        </div>
    )
}
