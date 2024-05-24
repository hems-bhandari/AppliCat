import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20 p-3">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link
                        href={"/"}
                    >
                        <Image src="/catOnlyWhite.png" className={cn("hidden dark:!block")} alt="Nav Logo" width={40} height={40} />
                        <Image src="/catOnlyBlack.png" className={cn("!block  dark:!hidden")} alt="Nav Logo" width={40} height={40} />
                    </Link>
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <UserNav />
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}
