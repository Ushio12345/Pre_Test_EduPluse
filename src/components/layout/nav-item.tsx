"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  name: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export default function NavItem({
  href,
  name,
  icon: Icon,
  isCollapsed,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link href={href} >
      <div
        className={`mb-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer group relative
          ${isActive ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />

        <span
          className={`transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
        >
          {name}
        </span>

        {isCollapsed && (
          <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-sm">
            {name}
          </div>
        )}
      </div>
    </Link>
  );
}
