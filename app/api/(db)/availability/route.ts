import { authOptions } from "@/lib/auth-options";
import { setAvailablity } from "@/lib/controllers/availabilityController";
import ConnectToDB from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await ConnectToDB();

        const {
            from,
            to,
            sessionDuration,
            sessionCharge,
            date,
        }: {
            from: string,
            to: string,
            sessionDuration: string,
            sessionCharge: string,
            date: Date | Date[]
        } = await req.json();

        if (!from || !to || !sessionDuration || !sessionCharge || !date)
            return NextResponse.json({ message: "Invalid Data provided" }, { status: 400 })

        const userSession = await getServerSession(authOptions);

        if (!userSession)
            return NextResponse.json({ message: "Unauthorized!!" }, { status: 401 });

        const updatedAvailability = await setAvailablity({
            from,
            to,
            sessionDuration,
            sessionCharge,
            date,
            consultantId: userSession?.user?._id
        });


        if (!updatedAvailability)
            return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });

        return NextResponse.json({ message: updatedAvailability },
            { status: 200 })


    } catch (error) {
        return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });
    }
};

