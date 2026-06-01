import DashboardShell from "@/components/layout/dashboard-shell";
import ProtectRoute from "@/components/protect-route";

import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <DashboardShell>{children}</DashboardShell>

  );
}
