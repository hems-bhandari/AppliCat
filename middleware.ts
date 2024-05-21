// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { getSession, useSession, } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const publicPaths = ["/", "/auth"];
    const isPublic = publicPaths.includes(pathname);

    const token = (req.cookies.get("next-auth.session-token")) || "";

    if (!isPublic && !token)
        return NextResponse.redirect(new URL('/auth', req.nextUrl));

    if (pathname === "/auth" && token) {
        return NextResponse.redirect(
            new URL('/applicant', req.nextUrl));
    }
}

export const config = {
    matcher: [
        "/applicant/:path*",
        "/applicant",
        "/consultant/:path*",
        "/consultant",
        "/admin/:path*",
        "/admin",
        "/",
        "/auth"
    ]
};
