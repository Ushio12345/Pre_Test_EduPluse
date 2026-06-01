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
            setTimeout(() => setCurrentIndex((prev) => prev - 1), 150);
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
        <div className="min-h-screen bg-card text-foreground flex flex-col">
            <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between flex-shrink-0 fixed top-0 w-full z-50">
                <div className="flex items-center gap-4 min-w-0">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-accent hover:text-accent-foreground rounded-xl transition-colors text-muted-foreground shrink-0"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-sm sm:text-base font-bold line-clamp-1">{deck.title}</h1>
                        <p className="text-xs text-muted-foreground hidden sm:block line-clamp-1">{deck.description}</p>
                    </div>
                </div>
                <div className="text-xs font-bold px-3 py-1.5 bg-muted rounded-full text-muted-foreground shrink-0">
                    {currentIndex + 1} / {totalCards} Thẻ
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center   p-4 max-w-3xl w-full mx-auto gap-6 min-h-0">
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex-shrink-0">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
                    />
                </div>

                {currentCard && (
                    <FlashcardItem
                        card={currentCard}
                        isParentFlipped={isFlipped}
                        onFlip={() => setIsFlipped(!isFlipped)}
                    />
                )}

                <div className="flex items-center gap-6 flex-shrink-0 mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="h-11 w-11 rounded-xl shadow-sm bg-card border-border"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <span className="text-xs sm:text-sm font-bold tracking-wider text-muted-foreground min-w-[60px] text-center">
                        {currentIndex + 1} / {totalCards}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={currentIndex === totalCards - 1}
                        className="h-11 w-11 rounded-xl shadow-sm bg-card border-border"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </main>
        </div>
    );
}