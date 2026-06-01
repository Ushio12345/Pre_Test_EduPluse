import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const upperFirstString = (text: string): string => {
  if (!text || !text.trim()) {
    return "";
  }

  return `${text.charAt(0).toLocaleUpperCase()}${text.slice(1)}`;
};

export const formatDuration = (totalMinutes?: number): string => {
  if (!totalMinutes || totalMinutes <= 0) return "--";

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} phút`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours} giờ : ${remainingMinutes} phút`;
};


export const formatQuizTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  return `${mins} phút`;
};
