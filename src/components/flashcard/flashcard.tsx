"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { FlashcardDeck } from "@/lib/types/flashcard.type";
import FlashcardItem from "./flashcard-item";
import { Button } from "../ui/button";

interface FlashcardProps {
    deck: FlashcardDeck;
}

export default function Flashcard({ deck }: FlashcardProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalCards = deck?.cards?.length || 0;
    const currentCard = deck?.cards?.[currentIndex];

    const handleNext = () => {
        if (currentIndex < totalCards - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex((prev) => prev + 1), 150);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex((prev) => prev + 1), 150);
        }
    };

    useEffect(() => {
        if (!mounted || totalCards === 0) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setIsFlipped((prev) => !prev);
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, totalCards, mounted]);

    if (!mounted) {
        return <div className="min-h-screen bg-background" />;
    }

    return (
        <div className="h-screen w-full text-foreground flex flex-col overflow-hidden bg-background">

            <header className="h-14 sm:h-16 border-b border-border px-4 flex items-center justify-between fixed top-0 left-0 right-0 bg-background z-50">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 max-w-[70%]">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-accent hover:text-accent-foreground rounded-xl transition-colors text-muted-foreground shrink-0"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="min-w-0">
                        {/* Fix lỗi lặp class text size */}
                        <h1 className="text-xs sm:text-base font-bold line-clamp-1">{deck.title}</h1>
                        <p className="text-[11px] text-muted-foreground hidden sm:block line-clamp-1">{deck.description}</p>
                    </div>
                </div>
                <div className="text-[11px] sm:text-xs font-bold px-2.5 py-1 bg-muted rounded-full text-muted-foreground shrink-0">
                    {currentIndex + 1} / {totalCards} Thẻ
                </div>
            </header>

            {/* Main: Thêm pt-14/pt-16 để không bị Header đè lên code */}
            <main className="flex-1 flex flex-col items-center pt-14 sm:pt-16 px-4 pb-4 max-w-2xl w-full mx-auto gap-4 sm:gap-6 justify-between min-h-0">

                {/* Thanh Progress bar */}
                <div className="w-full h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden shrink-0 mt-2">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
                    />
                </div>

                {/* Khu vực chứa Flashcard: Chiếm trọn không gian trống còn lại */}
                <div className="flex-1 w-full flex items-center justify-center min-h-0 py-2">
                    {currentCard && (
                        <FlashcardItem
                            card={currentCard}
                            isParentFlipped={isFlipped}
                            onFlip={() => setIsFlipped(!isFlipped)}
                        />
                    )}
                </div>

                {/* Thanh điều hướng Button bên dưới Bottom */}
                <div className="flex items-center gap-6 shrink-0 pb-2 sm:pb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl shadow-sm bg-card border-border touch-manipulation"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <span className="text-xs sm:text-sm font-bold tracking-wider text-muted-foreground min-w-[50px] text-center">
                        {currentIndex + 1} / {totalCards}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={currentIndex === totalCards - 1}
                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl shadow-sm bg-card border-border touch-manipulation"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </main>
        </div>
    );
}