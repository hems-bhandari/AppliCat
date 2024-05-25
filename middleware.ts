// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import path from "node:path/win32";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const publicPaths = ["/", "/auth", "/auth/onboarding"];
    const isPublic = publicPaths.includes(pathname);

    const token = (req.cookies.get("next-auth.session-token")) || "";

    if (pathname.startsWith("/_next")) return NextResponse.next();

    if (!isPublic && !token)
        return NextResponse.redirect(new URL('/auth', req.nextUrl));

    // checking every other request in the below mentioned routes
    // getting the request url
    const url = req.nextUrl.clone();

    // next auth secret for signin the token
    const secret = process.env.NEXTAUTH_SECRET || "";

    // getting the user type
    const session = await getToken({ req, secret })



    if (session) {

        const userType = (session._doc?.type as string)?.toLowerCase();

        // disabling the onboarding page 
        // if already onboarded
        if (pathname == "/auth/onboarding" && session.onboarded && userType)
            return NextResponse.redirect(new URL(`/${userType}`, req.nextUrl))

        // disabling the auth page if already authenticated
        if (pathname === "/auth" && session.onboarded && userType) {
            return NextResponse.redirect(
                new URL(`/${userType}`, req.nextUrl));
        }

        // throw on the onboarding screen if not onboarded 
        if (!session.onboarded && pathname !== '/auth/onboarding' && pathname !== '/auth')
            return NextResponse.redirect(new URL('/auth', req.nextUrl));

        // checking and replacing user according to their access and
        // permission level.
        const firstSplitPath = pathname.split("/")[1];
        if (userType &&
            firstSplitPath
            && firstSplitPath !== userType
            && ["admin", "consultant", "applicant"].includes(firstSplitPath.toLowerCase())
        ) {
            url.pathname = pathname.replace(pathname.split("/")[1], userType)
            return NextResponse.redirect(url)
        }
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
        "/auth",
        "/auth/onboarding"
    ]
};
