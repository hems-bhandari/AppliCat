"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function GoogleSignInButton() {
    return (
        <Button
            className="w-full"
            onClick={() =>
                signIn("google",
                    { callbackUrl: "/auth/onboarding" })
            }
        >
            <Icons.google className="w-4 h-4 mr-2" />
            Continue with Google
        </Button>
    );
}
