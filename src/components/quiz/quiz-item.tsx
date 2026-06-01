"use client";

import React, { useState } from "react";
import { Quiz, QuizAttemptResult } from "@/lib/types/quiz.type";
import QuestionSection from "./question-section";
import SectionHeading from "../common/section-heading";
import QuizRightSection from "./quiz-right-section";
import QuizResult from "./quiz-result";

interface QuizItemProps {
    quiz: Quiz;
}

export default function QuizItem({ quiz }: QuizItemProps) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const currentQuestion = quiz?.questions?.[currentQuestionIdx]

    const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
    const [attemptResult, setAttemptResult] = useState<QuizAttemptResult | null>(null);


    const totalQuestions = quiz?.questions?.length || 0;

    if (!currentQuestion) return null;

    const handleSelectOption = (optionId: string) => {
        const quesId = currentQuestion.questionId;
        const type = currentQuestion.questionText;

        if (type === 'single_choice') {
            setUserAnswers((pre) => ({ ...pre, [quesId]: [optionId] }))
        } else {
            const currentAns = userAnswers[quesId] || [];
            const updateAns = currentAns.includes(optionId) ? currentAns.filter((id) => id !== optionId) : [...currentAns, optionId]

            setUserAnswers((pre) => ({ ...pre, [quesId]: updateAns }))
        }


    };
    const handleSubmitQuiz = () => {
        let correctCount = 0;

        //chấm điểm từng câu
        const details = quiz.questions.map((q) => {
            const userAns = userAnswers[q.questionId] || [];

            const isCorrect =
                q.correctAnswer.length === userAns.length &&
                q.correctAnswer.every((ans) => userAns.includes(ans));

            if (isCorrect) correctCount++;

            return {
                questionId: q.questionId,
                userAnswers: userAns,
                isCorrect,
            };
        });

        const score = Math.round((correctCount / totalQuestions) * 100);
        const isPassed = score >= quiz.passingScore;

        const result: QuizAttemptResult = {
            quizId: quiz.id,
            totalQuestions,
            correctCount,
            score,
            isPassed,
            details,
        };

        setAttemptResult(result);


        localStorage.setItem(`quiz_attempt_${quiz.id}`, JSON.stringify(result));
    };

    const handleResetQuiz = () => {
        setUserAnswers({});
        setCurrentQuestionIdx(0);
        setAttemptResult(null);
    };


    if (attemptResult) {
        return (
            <QuizResult attemptResult={attemptResult} title={quiz?.title} passingScore={quiz?.passingScore} onResetQuiz={handleResetQuiz} />
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 p-0 sm:p-4 text-custom-text-primary p-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:p-4 p-0 ">
                <div className="space-y-1.5">
                    <SectionHeading title={quiz?.title} />
                    <div className="flex items-center gap-2 text-xs font-semibold text-custom-text-secondary">
                        <span>Câu hỏi {currentQuestionIdx + 1} trên {totalQuestions}</span>
                        <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-secondary-500 transition-all duration-300" style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }} />
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-500/5 text-secondary-500  font-bold text-sm border border-secondary-500/10 self-start sm:self-center">
                    <Clock className="h-4 w-4" />
                    <span>09:22</span>
                </div> */}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột Trái */}
                <div className="lg:col-span-2 flex flex-col justify-between p-6 bg-card border border-border border-2 rounded-2xl shadow-sm ">
                    <QuestionSection currentQuestion={currentQuestion} onSelectOption={handleSelectOption} userAnswers={userAnswers} currentIndex={currentQuestionIdx} setCurrentQuestionIdx={setCurrentQuestionIdx} totalQuestions={totalQuestions} />

                </div>

                {/* Cột Phải */}
                <QuizRightSection questions={quiz?.questions} currentQuestionIdx={currentQuestionIdx} setCurrentQuestionIdx={setCurrentQuestionIdx} userAnswers={userAnswers} timeLimit={quiz?.timeLimit} onSubmit={handleSubmitQuiz} />
            </div>
        </div>
    );
}