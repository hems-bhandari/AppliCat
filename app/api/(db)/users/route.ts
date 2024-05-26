import ConnectToDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../_models/userModel";

export async function GET(req: NextRequest) {
    try {
        await ConnectToDB();
        // const userId = req.body?.;
        if (!userId)
            return NextResponse.json({ message: "User Is is not provided" }, { status: 403 })

        const user = User.findById({})
        return NextResponse.json({ success: "Dami" }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: "sry", moreRef: e }, { status: 500 })
    }
}

export async function PATCH() {
    try {

    }
    catch (e) {
        return NextResponse.json({ message: "Something went wrong", error: e }, { status: 500 })


    }
}
