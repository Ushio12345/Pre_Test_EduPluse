"use client";

import React from "react";
import { RotateCw, Lightbulb } from "lucide-react";
import { Flashcard as FlashcardType } from "@/lib/types/flashcard.type";

interface FlashcardItemProps {
    card: FlashcardType;
    isParentFlipped: boolean;
    onFlip: () => void;
}

export default function FlashcardItem({ card, isParentFlipped, onFlip }: FlashcardItemProps) {
    return (
        <div
            className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[380px] cursor-pointer [perspective:1000px] flex-1 min-h-[250px]"
            onClick={onFlip}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isParentFlipped ? "[transform:rotateX(180deg)]" : ""
                    }`}
            >
                <div className="absolute inset-0 w-full h-full bg-card rounded-3xl border border-border p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-sm [backface-visibility:hidden]">
                    <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4">Thuật ngữ</span>
                    <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground px-2 leading-snug">
                        {card?.front}
                    </p>
                    <div className="absolute bottom-6 flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/5 px-3 py-1.5 rounded-full">
                        <RotateCw className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                        Click hoặc nhấn Space để lật
                    </div>
                </div>

                <div className="absolute inset-0 w-full h-full bg-card text-foreground rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-md [backface-visibility:hidden] [transform:rotateX(180deg)] border border-border overflow-y-auto">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Định nghĩa</span>
                    <p className="text-base sm:text-lg md:text-xl font-bold max-w-xl leading-relaxed px-2">
                        {card?.back}
                    </p>

                    {card?.example && (
                        <div className="mt-4 sm:mt-5 flex items-start gap-2 bg-muted p-3 sm:p-4 rounded-xl max-w-lg text-left border border-border w-full">

                            <div>
                                <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Hint:</span>
                                <p className="text-xs sm:text-sm text-foreground mt-0.5 italic leading-normal">{card.example}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}