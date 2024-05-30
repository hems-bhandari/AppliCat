import { add } from "date-fns";
import { ConsultantAvailability, User } from "../models/userModel"
import mongoose from "mongoose";

// returns the sessions that are available in different dates where the consultant has
// set therir availablity
export const getSessionAvailablity = async (user: any): Promise<any | null> => {
    try {
        if (!user) return null // no user means no availabilty

        const availablity = user.availability;
        if (!availablity) return null // no availablity feild found means availabilty not set yet

        const bookedSession: any[] = user.bookedSessions;

        let availableSessions: any = {}

        availablity.forEach((day: any) => {
            const beginningDateTime = add(
                day?.date,
                { hours: day?.from }
            );

            const endingDateTime = add(
                day?.date,
                { hours: day?.to }
            );

            const sessions = [];

            for (let i = beginningDateTime; i <= endingDateTime;) {
                const newTime = add(i, { minutes: day?.sessionDuration });
                i = newTime;

                const session = {
                    startingTime: newTime,
                    booked: false,
                }

                if (bookedSession && bookedSession.length > 0) {
                    // checking if the session exists in booked session collection
                    // hosted by the consultant
                    const isBooked = bookedSession.some((session) => {
                        const dateTime = add(session.date, {
                            hours: session.time.split(":")[0],
                            minutes: session.time.split(":")[0]
                        })

                        // i is the current itteration of the session chunk datetime
                        if (dateTime == i)
                            return true;

                        return false;
                    })
                    session.booked = isBooked;
                }

                sessions.push(session);
            }

            availableSessions[day?.date] = {
                constPerSession: day.sessionCharge,
                sessionDuration: day.sessionDuration,
                sessions: sessions,
            }
        })
        return availableSessions;
    } catch (error) {
        console.log(error)
        return null;
    }
}



// returns all the availablity of consultant and no info about the sessions available
export const getAllAvailablity = async (consultant: any): Promise<any | null> => {
    try {
        const availablity = consultant?.availablity;

        // returns availablity if present or else null
        return availablity || null
    } catch (error) {
        console.log(error)
        return null;
    }
}


type TpropsSetAvailablity = {
    consultantId: string,
    from: string,
    to: string,
    sessionDuration: string,
    sessionCharge: string,
    date: Date | Date[],
}

// sets the availabilty in consultant
export const setAvailablity = async ({ consultantId, from, to, sessionDuration, sessionCharge, date }: TpropsSetAvailablity):
    Promise<any | null> => {
    try {
        let newAvailabilities: any;
        if (Array.isArray(date))
            newAvailabilities = date.map((date) => ({
                from,
                to,
                sessionDuration,
                sessionCharge,
                date,
                consultant: consultantId,
            }))
        else
            newAvailabilities = [{
                from,
                to,
                sessionDuration,
                sessionCharge,
                date,
                consultant: consultantId,
            }];

        let existingAvailabilities = await ConsultantAvailability.find({ consultant: consultantId }) || [];

        if (existingAvailabilities.length === 0) {
            const newAvailability = await ConsultantAvailability.create(newAvailabilities[0])

            await User.findByIdAndUpdate(consultantId, {
                $push: {
                    availability: newAvailability._id,
                }
            })
            return newAvailabilities;
        }

        let verifiedNewAvailabilities: any[] = [];

        existingAvailabilities.filter((availability: any) => {
            if (Array.isArray(date)) {
                // finding the preexisting availability and updating it
                // within from the new availabilities
                newAvailabilities.filter((newAvailability: any) => {
                    if (availability.date === newAvailability.date) {
                        // update the existing one wthe the new one

                        // replacing with the new one
                        ConsultantAvailability.replaceOne({ _id: availability._id }, availability)
                        return;
                    }

                    verifiedNewAvailabilities.push(newAvailabilities);
                });

                //
                //
            }
            else {
                if (availability.date === date) {
                    // replacing with the new one
                    ConsultantAvailability.replaceOne({ _id: availability._id }, newAvailabilities[0])
                    return;
                }
                verifiedNewAvailabilities.push(newAvailabilities);
            }
        })

        if (verifiedNewAvailabilities?.length < 1)
            return newAvailabilities

        const newlyInsertedAvailablities = await ConsultantAvailability.insertMany(
            verifiedNewAvailabilities
        );

        const insertedIds: mongoose.Types.ObjectId[] = newlyInsertedAvailablities.insertedIds;

        await User.findByIdAndUpdate(consultantId, {
            $push: {
                availability: insertedIds
            }
        })
        // to add this in users

        // returns availablity if present or else null
        return newAvailabilities || null
    } catch (error) {
        console.log(error)
        return null;
    }
}
