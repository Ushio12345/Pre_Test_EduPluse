import React from "react";
import { NAVIGATION_ITEMS } from "@/constants/navigation.constant";
import Logo from "../public/logo";
import NavItem from "./nav-item";
import SidebarToggle from "./sidebar-toggle";

interface DashboardAsideProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

function DashboardAside({ isCollapsed, setIsCollapsed }: DashboardAsideProps) {
  return (
    <aside
      className={`h-screen sticky top-0 border-r border-border bg-background flex flex-col  z-40 transition-all duration-300
        ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <div className={`h-16 flex items-center border-b border-border  px-1 overflow-hidden  ${isCollapsed ? "justify-center" : "justify-between "}`}>
        <Logo iconOnly={isCollapsed} />

        <SidebarToggle
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      <nav className="flex-1 space-y-4 px-2 py-10">
        {NAVIGATION_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            name={item.name}
            icon={item.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
}

export default DashboardAside;
