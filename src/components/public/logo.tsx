import Link from "next/link";
import Image from "next/image";
import logoImg from "@image/logo.png";
import logoSmallImg from "@image/logo_small.png";
interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center justify-center w-auto select-none active:scale-95 transition-all duration-300 ${className}`}
    >
      <div
        className={`relative flex-shrink-0 transition-all duration-300
          ${iconOnly ? "w-15 h-15" : "w-[120px] h-[64px]"}`}
      >
        <Image
          src={iconOnly ? logoSmallImg : logoImg}
          alt="EduPulse Logo"
          priority
          fill
          sizes={iconOnly ? "36px" : "150px"}
          className="object-contain transition-all duration-300"
        />
      </div>
    </Link>
  );
}
