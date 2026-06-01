import AuthBanner from "@/components/auth/auth-banner";
import Logo from "@/components/public/logo";
import ThemeButton from "@/components/ui/theme-button";
import logo from "@image/logo.png";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id="auth-container"
      className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/30"
    >
      <header className="w-full h-16 fixed top-0 left-0 z-50 border-b border-border/40 bg-background/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-20">
        <div>
          <Logo />
        </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground overflow-x-hidden pt-16 min-h-screen">
        <div className="flex flex-col justify-center items-center w-full p-4 sm:px-10 md:px-16 lg:px-32">
          {children}
        </div>

        <AuthBanner />
      </div>

      <footer></footer>
    </div>
  );
};

export default AuthLayout;
