"use client";

import React, { useEffect, useState } from "react";
import DashboardAside from "./dashboard-aside";
import DashboardTopBar from "./dashboard-topbar";
import { useAuthStore } from "@/store/auth-store";

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  useEffect(() => {

    const unsubscribe = initializeAuth()
    return () => unsubscribe();
  }, [initializeAuth]);
  return (

    <div className="h-screen bg-background text-foreground flex w-full overflow-hidden">

      <DashboardAside
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full">

        <header className="h-16 border-border border-b bg-card/50 backdrop-blur-sm z-30 flex-shrink-0">
          <DashboardTopBar />
        </header>

        <main className="flex-1 p-6 overflow-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div >
  );
};

export default DashboardShell;