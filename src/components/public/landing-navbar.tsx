import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./logo";

const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Tính năng
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Lộ trình học
            </Link>
          </div>

          <div className="flex items-center space-x-4">

            <Link href="/courses" passHref>
              <Button className="rounded-xl px-5 shadow-sm font-medium">
                Bắt đầu học
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;