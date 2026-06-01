import { Skeleton } from "../ui/skeleton";

export default function SkeletonProfile() {
    return (
        <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-3xl mx-auto">

                <Skeleton className="h-9 w-40 mb-6 rounded-lg bg-zinc-200 dark:bg-zinc-800" />


                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

                    <Skeleton className="h-32 w-full bg-zinc-200 dark:bg-zinc-800/80 rounded-none" />

                    <div className="px-6 pb-6 relative">

                        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-16 mb-4">
                            <Skeleton className="h-28 w-28 rounded-full ring-4 ring-white dark:ring-zinc-900 bg-zinc-300 dark:bg-zinc-700" />
                            <div className="mt-4 sm:mt-0 space-y-2">
                                <Skeleton className="h-7 w-48 bg-zinc-200 dark:bg-zinc-800" />
                                <Skeleton className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800" />
                            </div>
                        </div>


                        <div className="mt-8 space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                            <Skeleton className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex items-center space-x-3 p-3.5 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                                        <Skeleton className="h-5 w-5 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                                        <div className="space-y-1.5 flex-1">
                                            <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800" />
                                            <Skeleton className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}