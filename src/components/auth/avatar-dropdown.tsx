"use client";

import React, { use } from "react";
import { Button } from "../ui/button";
import {
    BellIcon,
    LogInIcon,
    MoonIcon,
    SunIcon,
    User,
    UserPlus,
    Settings,
    LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "react-toastify";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { UserType } from "@/lib/types/auth.type";
type Props = {
    user: UserType;
}
export default function AvatarDropdown({ user }: Props) {
    const { displayName, photoURL, createdAt, email, role, uid } = user
    const router = useRouter();
    const logout = async () => {
        await useAuthStore.getState().logout();
        toast.success('Đăng xuất thành công');
        router.push('/login');

    }


    return (
        <DropdownMenu>
            <Tooltip>
                <DropdownMenuTrigger asChild>
                    <TooltipTrigger asChild>
                        <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent data-[state=open]:ring-border hover:ring-border transition-all">
                            <AvatarImage
                                src={photoURL || ""}
                                alt={displayName || "User"}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                {displayName?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                </DropdownMenuTrigger>

                <TooltipContent side="bottom" align="end">
                    <p>{user?.displayName || "Tài khoản"}</p>
                </TooltipContent>
            </Tooltip>


            <DropdownMenuContent align="end" className="w-64 p-2 mt-1 bg-card border-border rounded-xl shadow-2xl ">
                <div className="flex-col flex justify-start items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-zinc-800 focus:text-white">
                    <h5 className="font-bold" >{displayName}</h5>
                    <span className="text-sm font-medium">{email}</span>
                </div>



                <Link href="/profile">
                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer ">
                        <User className="h-5 w-5 opacity-80" />
                        <span className="text-sm font-medium">Tài khoản của tôi</span>
                    </DropdownMenuItem>
                </Link>


                {/* <Link href="/dashboard/settings">
                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:bg-zinc-800 focus:text-white">
                        <Settings className="h-5 w-5 opacity-80" />
                        <span className="text-sm font-medium">Settings</span>
                    </DropdownMenuItem>
                </Link> */}
                <DropdownMenuSeparator className="bg-border my-1.5" />
                <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer focus:text-red-500 text-red-400"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-semibold">Đăng xuất</span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}