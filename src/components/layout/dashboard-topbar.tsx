"use client";

import React from "react";
import { Button } from "../ui/button";
import { BellIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import AvatarDropdown from "../auth/avatar-dropdown";
import ThemeButton from "../ui/theme-button";

type Props = {};

export default function DashboardTopBar({ }: Props) {
  const profile = useAuthStore((state) => state.profile);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  return (
    <div className="flex items-center justify-between h-full w-full px-2 md:px-10 ">
      <div></div>
      <div className="flex items-center space-x-3 sm:space-x-4  ">
        <ThemeButton />

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-zinc-700 mx-1 hidden sm:block"></div>


        {isAuthLoading ? (

          <div className="h-9 w-9 rounded-full bg-muted animate-pulse border border-border" />
        ) : profile ? (
          <AvatarDropdown user={profile} />
        ) : (
          <Link href="/login" passHref>
            <Button
              size="sm"
              variant="default"
              className="gap-2 text-xs font-semibold"
            >
              <LogInIcon className="h-4 w-4" />
              <span>Đăng nhập</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}