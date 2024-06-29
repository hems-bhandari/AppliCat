"use server";
import { compareAsc } from "date-fns";
import { consultingSession } from "../models/sessionModel";
import ConnectToDB from "../mongoose";
import { revalidatePath } from "next/cache";
import { Applicant, Consultant } from "../models/user";
import mongoose from "mongoose";

interface getSessionInfoForSideBarProps {
    userType?: "Consultant" | "Applicant" | null;
    userId?: string | null;
}

export const getSessionInfoForSideBar = async (props: getSessionInfoForSideBarProps): Promise<{
    totalSessions: number,
    totalIncome?: number,
}> => {
    await ConnectToDB();

    if (!props.userId || !props.userType || (props.userType !== "Consultant" && props.userType !== "Applicant"))
        return {
            totalSessions: 0,
            totalIncome: 0
        }

    if (props.userType === "Consultant") {
        const sessionData = await consultingSession.find({
            consultant: props.userId
        });

        // filtering the sessions that are still in the progress
        const notInProgressSessionData = sessionData.filter((session) => session.status !== "progress")

        return {
            totalSessions: notInProgressSessionData?.length || 0,
            totalIncome: notInProgressSessionData?.length > 0
                ? notInProgressSessionData.reduce(
                    (total, sessionData) => total + sessionData.sessionCharge, 0)
                : 0
        }
    }

    const sessionData = await consultingSession.find({ applicant: props.userId });

    // filtering the sessions that are still in the progress
    const notInProgressSessionData = sessionData.filter((session) => session.status !== "progress")

    return {
        totalSessions: notInProgressSessionData?.length || 0,
    }
}

interface getSessionsProps {
    userId: string,
    userType: "Consultant" | "Applicant";
    delimeter: "upcoming" | "previous" | "all",
    date: Date,
}

export interface Tsession {
    applicant: string,
    consultant: string,
    status: "progress" | "pending" | "confirmed",
    sessionCharge: number,
    sessionDuration: number,
    sessionTitle: string,
    date: string,
    time: string,
    receipt?: string,
}

export type TsessionWithSubDoc = Omit<Tsession, "consultant" | "consultant"> & {
    applicant: {
        phoneNumber: number,
        highSchool: string,
        education: string,
        gpa: string,
        sat: number,
    },
    consultant: {
        phoneNumber: number,
        highSchool: string,
        acceptedUniversity: string[],
        avaliablity: mongoose.Types.ObjectId[],
    }
};

export const getConsultingSessions = async (props: getSessionsProps): Promise<TsessionWithSubDoc[]> => {
    try {
        if (!props.userId
            || !props.delimeter
            || !props.userType
            || props.userType && !["Consultant", "Applicant"].includes(props.userType)) {
            throw new Error("Invalid props cannot get user sessions")
        }
        const sessions = await consultingSession.find({ [props.userType.toLowerCase()]: props.userId });

        const filteredSessions = sessions.filter((session) => {
            const timeSplit = session.time.split(":");
            const dateWithTime = new Date(session.date).setHours(parseInt(timeSplit[0]), parseInt(timeSplit[1]), 0, 0);


            return props.delimeter === "previous"
                ? (compareAsc(props.date, new Date(dateWithTime)) !== 1) && session.status === "completed"
                : compareAsc(new Date(dateWithTime), props.date) && session.status !== "progress"
        })

        const filteredSessionWithSubDocs = [];
        // fetching the additional data of the consultant and the applicant.
        for (const session of props.delimeter === "all" ? sessions : filteredSessions) {
            const consultant = await Consultant.findById(session.consultant);
            const applicant = await Applicant.findById(session.applicant);

            filteredSessionWithSubDocs.push({ ...session._doc, applicant, consultant });
        }

        return filteredSessionWithSubDocs;
    } catch (e) {
        console.log(e);
        return [];
    }

}

type createOnProgressSessionProps = Omit<Tsession, "status">

// creates a new consulting sesson with the status progress.
export const createOnProgressSession = async (props: createOnProgressSessionProps): Promise<string | null> => {
    try {
        await ConnectToDB();

        console.log({ props })
        const arePropsValid = Object.values(props).every((values) => values);

        if (!arePropsValid) throw new Error("Invalid props were provided during creation of pending session, so aborting. :( Meow Meow!!");

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

        if (newConsultingSession) {
            revalidatePath("/applicant/sessions");
            return newConsultingSession._id.toString();
        }

        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const confirmPendingSession = async (props: { sessionId: string, receiptUrl: string, email: string }): Promise<boolean> => {
    try {
        await ConnectToDB();

        const session = await consultingSession.findById(props.sessionId);

        if (!session) throw new Error("Session not found");

        session.receipt = props.receiptUrl;
        session.status = "pending";
        session.sessionEmail = props.email;
        session.updatedOn = new Date();

        await session.save();

        revalidatePath("/consultant/sessions");

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
