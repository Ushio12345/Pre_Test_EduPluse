"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function SidebarToggle({
  isCollapsed,
  onToggle,
}: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={` ${!isCollapsed ? 'h-8 w-8 ' : 'w-16 h-12'}hover:bg-muted flex-shrink-0 items-center justify-center`}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  );
}
