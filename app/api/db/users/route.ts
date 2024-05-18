import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ success: "Dami" }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: "sry", moreRef: e }, { status: 500 })
    }
}
