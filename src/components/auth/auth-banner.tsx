import React from "react";
import { GraduationCapIcon, SparklesIcon } from "lucide-react";

export default function AuthBanner() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-primary-600 p-12 text-white relative overflow-hidden select-none">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl space-y-6 relative z-10 transition-all duration-300 hover:border-white/30">
        <div className="h-12 w-12 rounded-xl text-white flex items-center justify-center ">
          <GraduationCapIcon className="h-10 w-10" />
        </div>

        <blockquote className="space-y-3">
          <p className="text-2xl font-bold tracking-tight leading-snug text-white drop-shadow-sm">
            "An investment in knowledge pays the best interest."
          </p>
          <footer className="text-sm text-white/80 flex items-center gap-2 font-medium">
            <span className="h-[2px] w-6 bg-white/60 rounded"></span> Benjamin
            Franklin
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
