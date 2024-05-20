import ConnectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectToDB();
        return NextResponse.json({ success: "Dami" }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: "sry", moreRef: e }, { status: 500 })
    }
}
