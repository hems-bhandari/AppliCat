import { Consultant } from "@/lib/models/user";
import ConnectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

// gets all the consultants
export async function GET() {
    try {
        await ConnectToDB();
        const consultants = await Consultant.find({});
        if (!consultants)
            return NextResponse.json({
                message: "Meoww :( No consultants found",
            }, { status: 404 });

        return NextResponse.json({
            message: "Hurrey, Meoww!! we did it.",
            consultants: consultants
        },
            { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });
    }
}
