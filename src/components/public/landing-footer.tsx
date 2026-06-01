import Link from "next/link";
import Logo from "./logo";

const LandingFooter = () => {
  return (
    <footer className="w-full bg-background border-t border-border bg-card/30">
      <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground gap-4 py-4">
        <p>© {new Date().getFullYear()} - EduPulse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default LandingFooter;