"use client";

import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { uploadFileToCloudanary } from "@/hooks/useUploadImage";

interface AvatarUpdateProps {
    profile: any;
    onAvatarUploaded: (url: string) => void;
}

export default function AvatarUpdate({ profile, onAvatarUploaded }: AvatarUpdateProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleTriggerClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Vui lòng chọn tệp tin hình ảnh hợp lệ", { theme: "colored" });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File quá lớn (Tối đa 5MB)", { theme: "colored" });
            return;
        }

        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);
        setIsUploading(true);

        try {
            const result = await uploadFileToCloudanary(file, "edupulse_avatars");
            if (result.success && result.data) {
                onAvatarUploaded(result.data);
            } else {
                throw new Error(result.msg || "Upload thất bại");
            }
        } catch (error: any) {
            console.error(error);
            setPreviewUrl(null);
            toast.error(error.message || "Không thể upload ảnh lên Cloudinary", { theme: "colored" });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-md overflow-hidden transition-all">
            <div className="h-40 w-full bg-gradient-to-r from-secondary-500 via-secondary-600 to-purple-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-bold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 tracking-wide uppercase">
                    <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
                    Premium Profile
                </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-4 relative z-10">
                    <div
                        onClick={!isUploading ? handleTriggerClick : undefined}
                        className="group relative h-28 w-28 rounded-full ring-4 ring-white dark:ring-zinc-900 shadow-xl cursor-pointer overflow-hidden transition-transform active:scale-95 select-none"
                    >
                        <Avatar className="h-full w-full">
                            <AvatarImage
                                src={previewUrl || profile?.photoURL || ""}
                                alt={profile?.displayName}
                                className="object-cover"
                            />
                            <AvatarFallback className="text-3xl bg-gradient-to-br from-secondary-500 to-secondary-600 text-white font-black">
                                {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : "U"}
                            </AvatarFallback>
                        </Avatar>

                        {!isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Camera className="h-5 w-5 text-white" />
                                <span className="text-[10px] font-bold text-white tracking-wide uppercase">Thay ảnh</span>
                            </div>
                        )}

                        {isUploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Loader2 className="h-6 w-6 text-white animate-spin" />
                            </div>
                        )}
                    </div>

                    <div className="mt-4 sm:mt-0 pb-1 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-0.5">
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                {profile?.displayName || "Học viên EduPulse"}
                            </h1>
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                {profile?.email}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isUploading}
                            onClick={handleTriggerClick}
                            className="rounded-xl font-semibold border-zinc-200 dark:border-zinc-800 gap-1.5 self-start sm:self-auto bg-white dark:bg-zinc-900 text-xs shadow-sm hover:bg-zinc-50"
                        >
                            <Camera className="h-3.5 w-3.5 text-zinc-500" />
                            Đổi ảnh
                        </Button>
                    </div>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}