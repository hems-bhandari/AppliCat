// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { getToken } from "next-auth/jwt";
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

    // checking every other request in the below mentioned routes
    // getting the request url
    const url = req.nextUrl.clone();

    // next auth secret for signin the token
    const secret = process.env.NEXTAUTH_SECRET || "";

    // getting the user type
    const session = await getToken({ req, secret })

    if (session) {
        const pathname = url.pathname;
        const userType = (session._doc?.type as string).toLowerCase();

        // if (pathname.split("/")[1] !== userType) {
        //     url.pathname = pathname.replace(pathname.split("/")[1], userType)
        //     return NextResponse.redirect(url)
        // }

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
