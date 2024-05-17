import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const conn = await clientPromise();
        console.log(conn)

    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ error: e }, { status: 500 })
    }
    return NextResponse.json({ success: "Cnnection" }, { status: 200 })
}
