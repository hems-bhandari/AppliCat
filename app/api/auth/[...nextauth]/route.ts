import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth(authOptions);

export function GET(req: NextRequest, res: NextResponse) {
    try {
        console.log(req)
        handler();
    } catch (e) {

    }
}

export {
    handler as POST
};

