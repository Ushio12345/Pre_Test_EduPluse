"use client";

import { Quiz } from '@/lib/types/quiz.type';
import { formatQuizTime } from '@/lib/utils';
import { ArrowRight, Award, Timer, ClipboardCheck, Book } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';

interface QuizCardProps {
    item: Quiz;
}

export default function QuizCard({ item }: QuizCardProps) {
    const router = useRouter();

    return (
        <Card className="h-full group relative flex flex-col justify-between p-5 bg-card border-2 border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden hover:bg-primary/50 hover:ring-2 hover:ring-primary/20">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300 pointer-events-none" />

            <div className="space-y-4 flex-1 flex flex-col justify-between mb-5">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-muted text-primary border border-border">
                            <ClipboardCheck className="h-4 w-4" />
                        </div>

                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {item.title}
                    </h3>
                </div>

                {/* Info Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium border border-border">
                        <Book className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                        <span>{item.questions.length} câu</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium border border-border">
                        <Timer className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                        <span>{formatQuizTime(item.timeLimit)}</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium border border-border">
                        <Award className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                        <span>Đạt: {item.passingScore} điểm </span>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3.5 border-t-2 border-border flex items-center justify-end">
                <Button
                    onClick={() => router.push(`/quiz/${item.id}`)}
                    className="gap-1.5"
                >
                    Làm bài ngay
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
            </div>
        </Card>
    );
}