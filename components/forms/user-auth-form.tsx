"use client";
import GoogleSignInButton from "../google-auth-button";

export default function UserAuthForm() {
    return (
        <div className="w-full space-y-2">
            <GoogleSignInButton />
        </div>
    );
}
