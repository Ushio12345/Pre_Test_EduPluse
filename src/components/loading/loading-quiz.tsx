import React from "react";

export default function LoadingQuiz() {

    const skeletonCards = Array.from({ length: 6 });

    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-6">

            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skeletonCards.map((_, index) => (
                    <div
                        key={index}
                        className="p-5 border border-border bg-card rounded-2xl space-y-4 shadow-sm"
                    >

                        <div className="h-40 w-full bg-muted rounded-xl animate-pulse" />


                        <div className="h-6 w-3/4 bg-muted rounded-md animate-pulse" />


                        <div className="space-y-2">
                            <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
                            <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse" />
                        </div>


                        <div className="flex justify-between items-center pt-2">
                            <div className="h-4 w-20 bg-muted rounded-md animate-pulse" />
                            <div className="h-8 w-24 bg-muted rounded-lg animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}