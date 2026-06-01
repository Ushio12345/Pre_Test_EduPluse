import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {
    return (
        <header className="bg-card border-b border-border h-16 flex items-center px-6 justify-between">

            <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-primary/20 bg-background flex items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="Genkai Logo"
                        width={36}
                        height={36}
                        className="object-contain group-hover:scale-105 transition-transform"
                        priority
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-foreground tracking-tight leading-none text-lg group-hover:text-primary transition-colors">
                        GENKAI
                    </span>
                    <span className="text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
                        Create • Manage
                    </span>
                </div>
            </Link>


            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground">Browse</button>
                <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Write Story
                </button>
            </div>
        </header>
    );
}