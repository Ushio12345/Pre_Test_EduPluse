"use client";

import { useEffect } from "react"; // 1. Thêm useEffect
import Profile from "@/components/auth/profile";
import { useAuthStore } from "@/store/auth-store";
import SkeletonProfile from "@/components/skeleton/profile";

export default function ProfilePage() {

  const { profile, isAuthLoading, initializeAuth } = useAuthStore();


  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);
  if (isAuthLoading) {
    return <SkeletonProfile />;
  }

  return (
    <>
      {profile ? (
        <Profile profile={profile} />
      ) : (
        <div className="flex items-center justify-center min-h-[200px] text-sm text-muted-foreground">
          Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.
        </div>
      )}
    </>
  );
}