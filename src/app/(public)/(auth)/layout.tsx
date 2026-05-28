

import ThemeButton from "@/components/ui/theme-button";
import logo from "@image/logo.png";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <div id="auth-container" className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/30">




            <header className="w-full h-16 fixed top-0 left-0 z-50 border-b border-border/40 bg-background/50 backdrop-blur-md px-6 flex items-center justify-between">

                <Link href="/">
                    <div id="logo" className="w-[150px] h-[60px] relative transition-transform active:scale-95">
                        <Image
                            className="object-contain"
                            src={logo}
                            alt="Genkai Logo"
                            fill
                            priority
                        />
                    </div>
                </Link>


                <div className="flex items-center gap-4">
                    <ThemeButton />

                    <Link
                        href="/"
                        className="text-xs font-semibold uppercase tracking-wider text-custom-txt-secondary hover:text-foreground transition-colors border border-transparent hover:border-border bg-transparent hover:bg-card px-3 py-2 rounded-lg"
                    >
                        Home
                    </Link>
                </div>
            </header>


            <div id="child-container" className="flex-grow flex items-center justify-center w-full pt-16 p-4 z-10">
                {children}
            </div>

            <footer>

            </footer>

        </div>
    );
};

export default AuthLayout;