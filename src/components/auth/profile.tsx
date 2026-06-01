"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDefaultDb } from "@/lib/firebase";
import { ProfileFormData } from "@/lib/validate/auth";
import { toast } from "react-toastify";
import ProfileForm from "./profile-form";
import BackButton from "../ui/back-button";
import ThemeButton from "../ui/theme-button";
import { uploadFileToCloudanary } from "@/hooks/useUploadImage";

export default function Profile({ profile }: any) {
  const [isUpdating, setIsUpdating] = useState(false);


  const handleUpdateProfile = async (
    values: ProfileFormData & { avatarFile?: File | null }
  ) => {
    if (!profile?.uid) return;

    setIsUpdating(true);
    try {

      let finalPhotoURL = profile.photoURL || "";


      if (values.avatarFile) {
        const uploadRes = await uploadFileToCloudanary(values.avatarFile, "edupulse_avatars");

        if (!uploadRes.success) {
          throw new Error(uploadRes.msg || "Không thể upload ảnh đại diện");
        }

        finalPhotoURL = uploadRes.data;
      }

      const userDocRef = doc(firebaseDefaultDb, "users", profile.uid);

      await updateDoc(userDocRef, {
        displayName: values.displayName,
        photoURL: finalPhotoURL,
      });
      useAuthStore.setState({
        profile: {
          ...profile,
          displayName: values.displayName,
          photoURL: finalPhotoURL,
        },
      });

      toast.success("Cập nhật thông tin tài khoản thành công", {
        theme: "colored",
      });
    } catch (error: any) {
      console.error("Lỗi cập nhật hồ sơ:", error);
      toast.error(error.message || "Cập nhật thất bại", { theme: "colored" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex items-center justify-between h-16 border-b border-border ">
        <BackButton />
        <ThemeButton />
      </div>
      <div className="max-w-3xl mx-auto space-y-6 my-10 rounded-2xl bg-card p-4 shadow-xl">
        <ProfileForm
          profile={profile}
          isSubmitting={isUpdating}
          onSave={handleUpdateProfile}
        />
      </div>
    </div>
  );
}