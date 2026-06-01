"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { GoogleIcon } from "@/components/icon/social-icon";
import { loginWithGoogle } from "@/lib/services/auth-service";

interface SocialLoginProps {
  onError: (message: string) => void;
}

export default function SocialLogin({ onError }: SocialLoginProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await loginWithGoogle();

      if (user) {
        const token = await user.getIdToken();
        document.cookie = `access_token=${token}; path=/; max-age=3600; SameSite=Lax; Secure`;
        router.push("/courses");
      }
    } catch (err: any) {
      console.error("Lỗi kích hoạt Đăng nhập Google:", err);
      onError("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2 font-medium border-border bg-transparent hover:bg-card text-foreground h-11"
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
    >
      {/* <GoogleIcon /> */}
      {loading ? "Đang chuyển hướng..." : "Tiếp tục với Google"}
    </Button>
  );
}
