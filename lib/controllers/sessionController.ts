"use server";
import { compareAsc } from "date-fns";
import { consultingSession } from "../models/sessionModel";
import ConnectToDB from "../mongoose";
import { revalidatePath } from "next/cache";
import { Applicant, Consultant } from "../models/user";
import mongoose from "mongoose";
import { sendMail } from "../utils/sendMail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";

export const getSessionInfoForSideBar = async (): Promise<{
    totalSessions: number;
    totalIncome?: number;
}> => {
    await ConnectToDB();

    const userSession = await getServerSession(authOptions);
    const user = userSession?.user;
    if (!user || (user && !user._id || !user.userType))
        throw new Error("Meow !! user is invalid");

    if (user.userType === "Consultant") {
        const sessionData = await consultingSession.find({
            consultant: user._id,
        });

        // filtering the sessions that are still in the progress
        const notInProgressSessionData = sessionData.filter(
            (session) => session.status !== "progress"
        );

        return {
            totalSessions: notInProgressSessionData?.length || 0,
            totalIncome:
                notInProgressSessionData?.length > 0
                    ? notInProgressSessionData.reduce(
                        (total, sessionData) => total + sessionData.sessionCharge,
                        0
                    )
                    : 0,
        };
    }

    const sessionData = await consultingSession.find({ applicant: user._id });

    // filtering the sessions that are still in the progress
    const notInProgressSessionData = sessionData.filter(
        (session) => session.status !== "progress"
    );

    return {
        totalSessions: notInProgressSessionData?.length || 0,
    };
};

export interface getSessionsProps {
    delimeter: "upcoming" | "previous" | "all";
    date: Date;
}

export interface Tsession {
    applicant: string;
    consultant: string;
    status: "progress" | "pending" | "confirmed";
    sessionCharge: number;
    sessionDuration: number;
    sessionTitle: string;
    date: Date;
    time: string;
    receipt?: string;
}

export type TsessionWithSubDoc = Omit<Tsession, "consultant" | "consultant"> & {
    applicant: {
        phoneNumber: number;
        highSchool: string;
        education: string;
        gpa: string;
        sat: number;
        image: string;
        name: string;
        email: string;
    };
    consultant: {
        phoneNumber: number;
        highSchool: string;
        acceptedUniversity: string[];
        avaliablity: mongoose.Types.ObjectId[];
        image: string;
        email: string;
        name: string;
    };
};

export const getConsultingSessions = async (
    props: getSessionsProps
): Promise<TsessionWithSubDoc[]> => {
    try {
        const userSession = await getServerSession(authOptions);
        const userData = userSession?.user;

        if (!userData || (userData && !userData._id)) {
            throw new Error("Cannot determine user")
        }

        if (!props.delimeter) {
            throw new Error("Invalid props cannot get user sessions");
        }

        await ConnectToDB();

        const sessions = await consultingSession.find({
            [userData.userType.toLowerCase()]: userData._id,
        });

        const filteredSessions = sessions.filter((session) => {
            const timeSplit = session.time.split(":");
            const dateWithTime = new Date(session.date).setHours(
                parseInt(timeSplit[0]),
                parseInt(timeSplit[1]),
                0,
                0
            );

            // removing all the non confirmed sessions
            if (session?.status === "progress")
                return false;

            // looking for sessions that are before today
            // i.e second date is before the first date 
            //
            // first date = today
            // second date = session date
            if (props.delimeter === "previous")
                return compareAsc(props.date, new Date(dateWithTime)) === 1

            return compareAsc(new Date(dateWithTime), props.date) === 1;
        });

        const filteredSessionWithSubDocs = [];
        // fetching the additional data of the consultant and the applicant.
        for (const session of props.delimeter === "all"
            ? sessions
            : filteredSessions) {
            const consultant = await Consultant.findById(session.consultant);
            const applicant = await Applicant.findById(session.applicant);

            filteredSessionWithSubDocs.push(
                {
                    ...session._doc,
                    applicant,
                    consultant,
                }
            );
        }

        // suggestions from stack overflow since the _id in the responose is a complex
        // object it is not simple enough to be passed to a client component hence an error
        // Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
        // {_id: {buffer: ...}, applicant: ..., consultant: ..., sessionTitle: ..., status: ..., sessionCharge: ..., sessionDuration: ..., date: ..., time: ..., updatedOn: ..., __v: ..., receipt: ..., sessionEmail: ...}
        // occures:
        //
        // that is why we are first converting it to json and then parsing it again.
        return JSON.parse(JSON.stringify(filteredSessionWithSubDocs));
    } catch (e) {
        console.log(e);
        return [];
    }
};

type createOnProgressSessionProps = Omit<Tsession, "status">;

// creates a new consulting sesson with the status progress.
export const createOnProgressSession = async (
    props: createOnProgressSessionProps
): Promise<string | null> => {
    try {
        await ConnectToDB();

        // checking if any prop is empty null or undefined
        const arePropsValid = Object.values(props).every((values) => values);

        if (!arePropsValid)
            throw new Error(
                "Invalid props were provided during creation of pending session, so aborting. :( Meow Meow!!"
            );

        // NOTE: checking existing sessions
        //  finding the session has been already booked or not is difficult and will
        // require additional validation.
        //
        // TODO:
        // Future Note:
        // - filter all the sessions by the consultant and compare the booking dateand time of the current session
        // - if the session is already booked then throw an error.
        // - Since, one consultant can only have one session at a time, this will be a valid check.
        //
        //
        // FIX: const existingSession = await consultingSession.find({ applicant: props.applicant });
        // if (!!existingSession.length)
        //     throw new Error("Session Booking failed it is already booked, :( Sorry Meow!!")

        // session can be created safely
        const newConsultingSession = await consultingSession.create({
            ...props,
            updatedOn: new Date(),
        });

        console.log(newConsultingSession);

        if (newConsultingSession) {
            revalidatePath("/applicant/sessions");
            return newConsultingSession._id.toString();
        }

        throw new Error("Something went wrong couldnot create session");
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const confirmPendingSession = async (props: {
    sessionId: string;
    receiptUrl: string;
    email: string;
    consultantEmail: string;
}): Promise<boolean> => {
    try {
        await ConnectToDB();

        const session = await consultingSession.findById(props.sessionId);

        if (!session) throw new Error("Session not found");

        session.receipt = props.receiptUrl;
        session.status = "pending";
        session.sessionEmail = props.email;
        session.updatedOn = new Date();

        await session.save();

        // send a confirmation email to the applicant.
        sendMail(
            props.email,
            "Session Booking Confirmation",
            `Your session has been booked successfully.`
        );

        // send a confirmation email to the consultant.
        sendMail(
            session.consultant.email,
            "Session Booking Confirmation",
            `A new session has been booked with you. Bruh! you are earning money.`
        );

        revalidatePath("/consultant/sessions");

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
