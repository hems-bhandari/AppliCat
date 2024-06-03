import { authOptions } from "@/lib/auth-options";
import { getAllAvailablities, setAvailablity } from "@/lib/controllers/availabilityController";
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


        if (!updatedAvailability) {
            console.log("Empty update returned", updatedAvailability)
            return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });
        }

        return NextResponse.json({ message: "Hurrey, Meoww!! we did it.", availabilities: updatedAvailability },
            { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await ConnectToDB();
        const consultantId = req?.nextUrl?.searchParams.get("consultantId");

        if (!consultantId)
            return NextResponse.json({ message: "Meoww!! Availability Must be provided" }, { status: 400 });

        const availabilities = await getAllAvailablities(consultantId);

        if (!availabilities)
            return NextResponse.json({ message: "Meoww!! No Availabilities Found" }, { status: 404 });

        return NextResponse.json({
            message: `${availabilities.length} Availabilities Found`,
            availabilities
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });
    }

}

