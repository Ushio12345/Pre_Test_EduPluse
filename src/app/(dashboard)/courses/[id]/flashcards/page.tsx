import React, { Suspense } from "react";
import Link from "next/link";
import { FolderX, ArrowLeft } from "lucide-react";
import { flashcardService } from "@/lib/services/flashcard-service";
import FlashcardSkeleton from "@/components/skeleton/flashcard";
import Flashcard from "@/components/flashcard/flashcard";
import { Button } from "@/components/ui/button";

export default async function FlashcardPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const deck = await flashcardService.getFlashcardsByCourse(id);

    if (!deck) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-2xl  text-center max-w-xl mx-auto my-10">
                <div className="p-4 rounded-full border border-border text-muted-foreground mb-4">
                    <FolderX className="h-10 w-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">
                    Không tìm thấy bộ Flashcard
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
                    Khóa học này hiện chưa được cập nhật dữ liệu thẻ ghi nhớ hoặc bộ thẻ đã bị xóa.
                </p>
                <Button asChild variant="outline" className="gap-2 border-border hover:bg-muted">
                    <Link href="/courses">
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh sách
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <Suspense fallback={<FlashcardSkeleton />}>
            <Flashcard deck={deck} />
        </Suspense>
    );
}