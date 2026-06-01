import React from "react";

export default function FlashcardSkeleton() {
    return (
        <div className="min-h-screen  dark:bg-zinc-950 flex flex-col animate-pulse">
            <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4 w-1/3">
                    <div className="w-9 h-9 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                    <div className="space-y-2 flex-1">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                    </div>
                </div>
                <div className="w-16 h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-3xl w-full mx-auto gap-6">
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

                <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[380px] min-h-[250px] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center justify-center shadow-sm" />

                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl" />
                    <div className="w-10 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl" />
                </div>
            </main>
        </div>
    );
}