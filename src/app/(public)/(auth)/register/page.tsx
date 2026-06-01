"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/validate/auth";
import { registerWithEmail } from "@/lib/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/components/auth/social-login";
import { toast } from "react-toastify";

export default function RegisterForm() {
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
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setAuthError("");
        try {
            const registeredUser = await registerWithEmail(
                data.email,
                data.password,
                data.fullName
            );

            if (registeredUser) {
                const token = await registeredUser.getIdToken();
                document.cookie = `access_token=${token}; path=/; max-age=3600; SameSite=Lax; Secure`;
                toast.success("Đăng ký tài khoản thành công");
                router.push("/login");
            }
        } catch (err: any) {
            console.error("Lỗi đăng ký:", err);
            if (err.code === "auth/email-already-in-use") {
                setAuthError("Email này đã được sử dụng bởi tài khoản khác.");
            } else if (err.code === "auth/weak-password") {
                setAuthError("Mật khẩu quá yếu. Vui lòng chọn mật khẩu khác.");
            } else {
                setAuthError("Đăng ký tài khoản thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (
        <div className="w-full space-y-6 justify-center items-center">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Tạo tài khoản mới</h1>
                <p className="text-sm text-muted-foreground">
                    Đăng ký tài khoản của bạn để tham gia hành trình học tập tại EduPulse.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {authError && (
                    <div className="text-xs font-semibold text-error-500 bg-error-50 p-3 rounded-lg border border-error-400/20 dark:bg-error-500/10 dark:text-error-400">
                        {authError}
                    </div>
                )}

                {/* full name */}
                <div className="space-y-2">
                    <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        disabled={isSubmitting}
                        {...register("fullName")}
                        className={`border-input bg-background text-foreground focus-visible:ring-ring ${errors.fullName
                            ? "border-error-500 focus-visible:ring-error-500"
                            : ""
                            }`}
                    />
                    {errors.fullName && (
                        <p className="text-xs font-medium text-error-500 mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                {/* Email */}
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

                {/* Password */}
                <div className="space-y-2">
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
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
                    {isSubmitting ? "Đang đăng ký..." : "Đăng ký tài khoản"}
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
                Đã có tài khoản?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                    Đăng nhập ngay
                </Link>
            </p>
        </div>
    );
}
