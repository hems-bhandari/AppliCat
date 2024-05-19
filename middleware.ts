// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const publicPaths = ["/", "/auth"];
    const isPublic = publicPaths.includes(pathname);

    const token =
        (req.cookies.get("next-auth.session-token"));

    if (!isPublic && !token)
        return NextResponse.redirect(new URL('/auth', req.nextUrl));

    if (pathname === "/auth" && token)
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/dashboard",
        "/",
        "/auth"
    ]
};
