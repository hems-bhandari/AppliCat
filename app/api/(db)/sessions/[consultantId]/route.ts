import { getAllAvailabilitiesWithSession, getAllAvailablities } from "@/lib/controllers/availabilityController";
import ConnectToDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,
    { params: { consultantId } }: { params: { consultantId: string } }) => {
    try {
        await ConnectToDB();
        if (!consultantId)
            return NextResponse.json({ message: "Meoww!! Availability Must be provided" }, { status: 400 });

        const availabilities = await getAllAvailabilitiesWithSession(consultantId);

        if (!availabilities)
            return NextResponse.json({ message: "Meoww!! No Availabilities Found" }, { status: 404 });

        return NextResponse.json({
            message: `${Object.keys(availabilities).length} Availabilities Found`,
            availabilities
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Meoww!! something went wrong" }, { status: 500 });
    }

}

