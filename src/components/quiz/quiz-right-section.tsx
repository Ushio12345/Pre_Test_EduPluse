import { QuizQuestion } from '@/lib/types/quiz.type';
import React from 'react'
import { Button } from '../ui/button';

import AccurateTimer from './accurate-timer';
type QuizRightSectionProps = {
    questions: QuizQuestion[]
    currentQuestionIdx: number;
    setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
    userAnswers: Record<string, string[]>;
    timeLimit: number;
    onSubmit: () => void;
}
export default function QuizRightSection({ questions, currentQuestionIdx, setCurrentQuestionIdx, userAnswers, timeLimit, onSubmit }: QuizRightSectionProps) {
    return (
        <section className="p-6 bg-card border-2 border-border rounded-2xl shadow-sm flex flex-col justify-between gap-8">
            <div className="space-y-4">
                <div className='flex justify-between items-center  pb-4 border-b-2 border-border '>
                    <h3 className="text-sm font-bold tracking-tight">Danh sách câu hỏi</h3>
                    <AccurateTimer initialMinutes={timeLimit} onTimeout={onSubmit} />
                </div>
                <div className="grid grid-cols-6 gap-2 pb-4  ">
                    {questions.map((q, idx) => {
                        const isCurrent = idx === currentQuestionIdx;
                        const isAnswered = userAnswers[q.questionId]?.length > 0;
                        return (
                            <Button
                                key={q.questionId}
                                onClick={() => setCurrentQuestionIdx(idx)}
                                variant={isCurrent ? "secondary" : isAnswered ? "secondary" : "outline"}

                            >
                                {idx + 1}
                            </Button>
                        );
                    })}
                </div>
            </div>


            <Button variant={'secondary'} onClick={() => onSubmit()}>Nộp bài</Button>
        </section>
    )
}
