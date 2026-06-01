"use client";

import { QuizList } from "@/lib/types/quiz.type";
import React from "react";
import QuizCard from "./quiz-card";

interface ListQuizProps {
    items: QuizList;
}

export default function ListQuiz({ items }: ListQuizProps) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return (
            <div className="p-8 text-center border-2 border-dashed border-custom-border-primary rounded-2xl">
                <p className="text-sm text-custom-text-secondary">
                    Hiện tại chưa có bài trắc nghiệm nào.
                </p>
            </div>
        );
    }

    return (

        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 w-full pb-4">
            {items.map((item) => (

                <div key={item.id} className="h-full">
                    <QuizCard item={item} />
                </div>
            ))}
        </div>
    );
}