import ConnectToDB from "@/lib/mongodb";
import { connection } from "mongoose";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        ConnectToDB();
        console.log("Connected to db");
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ error: e }, { status: 500 })
    }
    return NextResponse.json({ success: "Connection", connection: connection.db }, { status: 200 })
}
