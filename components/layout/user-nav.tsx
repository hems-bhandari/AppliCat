"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserNav() {
    const { data: session } = useSession();
    const router = useRouter();

    if (session) {
        const redirectTo = (to: "home" | "profile" | "landing") => {
            if (!session.user)
                return router.replace('/auth');

            const userBasePathName = session?.user?.userType?.toLowerCase();
            if (!userBasePathName)
                return router.replace('/auth');

            const redirectMap = {
                landing: `/`,
                home: `/${userBasePathName}/profile`,
                profile: `/${userBasePathName}/profile`,
            }

            return router.replace(redirectMap[to]);
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={session.user?.image ?? ""}
                                alt={session.user?.name ?? ""}
                            />
                            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.user?.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="*:cursor-pointer">
                        <DropdownMenuItem
                            onClick={() => redirectTo("home")}>
                            Home
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => redirectTo("profile")}>
                            Profile
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => signOut()}
                        className="cursor-pointer"
                    >
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}
