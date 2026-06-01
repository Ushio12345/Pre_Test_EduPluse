"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validate/auth";
import { loginWithEmail } from "@/lib/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import SocialLogin from "@/components/auth/social-login";

export default function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError("");
    try {
      const loggedInUser = await loginWithEmail(data.email, data.password);

      if (loggedInUser) {
        const token = await loggedInUser.getIdToken();
        document.cookie = `access_token=${token}; path=/; max-age=3600; SameSite=Lax; Secure`;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setAuthError("Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div className="w-full space-y-6 justify-center items-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Chào mừng trở lại</h1>
        <p className="text-sm text-muted-foreground">
          Đăng nhập vào tài khoản của bạn để tiếp tục hành trình học tập.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {authError && (
          <div className="text-xs font-semibold text-error-500 bg-error-50 p-3 rounded-lg border border-error-400/20 dark:bg-error-500/10 dark:text-error-400">
            {authError}
          </div>
        )}

        <div className="space-y-2">
          <FieldLabel htmlFor="email">Địa chỉ Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="student@example.com"
            disabled={isSubmitting}
            {...register("email")}
            className={`border-input bg-background text-foreground focus-visible:ring-ring ${errors.email
              ? "border-error-500 focus-visible:ring-error-500"
              : ""
              }`}
          />
          {errors.email && (
            <p className="text-xs font-medium text-error-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isSubmitting}
            {...register("password")}
            className={`border-input bg-background text-foreground focus-visible:ring-ring ${errors.password
              ? "border-error-500 focus-visible:ring-error-500"
              : ""
              }`}
          />
          {errors.password && (
            <p className="text-xs font-medium text-error-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          className="w-full font-semibold bg-primary text-primary-foreground hover:bg-primary-600 transition-colors"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập vào hệ thống"}
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <span className="relative bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
          Hoặc tiếp tục với
        </span>
      </div>

      <SocialLogin onError={(msg) => setAuthError(msg)} />

      <p className="text-center text-sm text-muted-foreground mt-4">
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
