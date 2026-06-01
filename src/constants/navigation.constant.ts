import { BookOpen, Bookmark, LucideIcon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const NAVIGATION_ITEMS: NavItem[] = [

  { name: "Khóa học", href: "/courses", icon: BookOpen },
  { name: "Luyện đề (Quiz)", href: "/quiz", icon: Bookmark },

];
