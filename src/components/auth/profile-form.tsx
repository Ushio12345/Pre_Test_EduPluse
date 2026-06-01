"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Loader2, Save, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileFormData, profileSchema } from "@/lib/validate/auth";
import { UserType } from "@/lib/types/auth.type";
import { toast } from "react-toastify";

interface ProfileFormProps {
  profile: UserType;
  isSubmitting: boolean;
  onSave: (
    values: ProfileFormData & { avatarFile?: File | null },
  ) => Promise<void>;
}

export default function ProfileForm({
  profile,
  isSubmitting,
  onSave,
}: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: profile?.displayName || "",
      photoURL: profile?.photoURL || "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName || "",
        photoURL: profile.photoURL || "",
      });
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  }, [profile, reset]);

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn tệp tin hình ảnh hợp lệ", {
        theme: "coloerror",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File quá lớn (Tối đa 5MB)", { theme: "coloerror" });
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setSelectedFile(file);
    setValue("photoURL", localUrl, { shouldValidate: true });
  };

  const handleFormSubmit = (values: ProfileFormData) => {
    onSave({ ...values, avatarFile: selectedFile });
  };

  return (
    <div className="pb-4 bg-background border-border">
      <div className="relative">
        <div className="h-40 w-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-600 relative rounded-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
        </div>

        {/* avatar */}
        <div className="absolute left-4 bottom-0 translate-y-1/2">
          <div
            onClick={!isSubmitting ? handleTriggerClick : undefined}
            className="group relative h-28 w-28 rounded-full ring-4 ring-white dark:ring-zinc-900 shadow-xl cursor-pointer overflow-hidden transition-transform active:scale-95 select-none"
          >
            <Avatar className="h-full w-full">
              <AvatarImage
                src={previewUrl || profile?.photoURL || ""}
                alt={profile?.displayName}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-black">
                {profile?.displayName
                  ? profile.displayName.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            {!isSubmitting && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="h-5 w-5 text-white" />
                <span className="text-[10px] font-bold text-white tracking-wide uppercase">
                  Thay ảnh
                </span>
              </div>
            )}
            {isSubmitting && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
            )}
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

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="mt-20 p-4 space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium  flex items-center gap-1.5">
              <User className="h-4 w-4 " />
              Họ và tên
            </label>
            <Input
              type="text"
              disabled={isSubmitting}
              placeholder="Nhập họ và tên của bạn"
              {...register("displayName")}
              className={`h-11 rounded-xl border-2 border-border  focus-visible:ring-primary-500 ${errors.displayName ? "border-error-500 focus-visible:ring-error-500" : ""}`}
            />
            {errors.displayName && (
              <p className="text-xs font-medium text-error-500">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium   flex items-center gap-1.5">
              <Mail className="h-4 w-4 " />
              Địa chỉ Email
            </label>
            <Input
              type="email"
              value={profile?.email || ""}
              disabled
              className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 text-zinc-400 border-2 border-border  cursor-not-allowed select-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="md:w-1/4 h-11 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm transition-all gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
