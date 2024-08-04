import { add } from "date-fns";
import { Consultant } from "../models/user"
import { ConsultantAvailability } from "../models/consultantAvailabilityModel";
import { consultingSession } from "../models/sessionModel";
import { compareAsc, isSameDay } from "date-fns/esm";


type TAvailabilityWithSession = Record<string, {
    sessionTitle: string,
    sessionDuration: string,
    costPerSession: string,
    sessions: {
        startingTime: Date,
        booked: boolean,
    }[]
}>
// returns the sessions that are available in different dates where the consultant has
// set therir availablity
export const getAllAvailabilitiesWithSession = async (consultantId: string, today: Date): Promise<any | null> => {
    try {
        const availabilities = await ConsultantAvailability.find({ consultant: consultantId });
        if (!availabilities || availabilities?.length < 1) return null // no availablity feild found means availabilty not set yet

        // find the consulting sessions that are hosted by the consultant
        // those sessions that are booked
        const bookedSessions = await consultingSession.find({ consultant: consultantId });

        if (bookedSessions && bookedSessions.length > 0)
            bookedSessions.filter((session) => compareAsc(today, session?.date) !== -1);

        console.log(bookedSessions)

        let availableSessions: TAvailabilityWithSession = {};

        availabilities.forEach((availability: any) => {
            // checking to see if the day of the availablility is before today which is not bookable hence removing it's session generation.
            // compare asc returns -1 if first date comes before second date
            const isBeforeToday = compareAsc(today, availability?.date) === -1;

            // removing without generating the sessions for days before today
            if (isBeforeToday)
                return;

            // starting point for session generation.
            const beginningDateTime = add(
                availability?.date,
                {
                    hours: availability?.from.split(":")[0],
                    minutes: availability?.from.split(":")[1]
                }
            );

            // ending point for session generation.
            const endingDateTime = add(
                availability?.date,
                {
                    hours: availability?.to.split(":")[0],
                    minutes: availability?.to.split(":")[1]
                }
            );

            const sessions = [];

            // compareAsc returns -1 if the first date is before the second date
            // 0 if both are same
            for (let i = beginningDateTime; compareAsc(i, endingDateTime) === -1; i = add(i, { minutes: availability?.sessionDuration })) {

                const session = {
                    startingTime: i, // starting time of the session
                    booked: false,
                }

                if (bookedSessions && bookedSessions.length > 0) {
                    // checking if the session exists in booked session collection
                    // hosted by the consultant
                    const isBooked = bookedSessions.some((session) => {
                        const dateTime = add(session.date, {
                            hours: session.time.split(":")[0],
                            minutes: session.time.split(":")[1]
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

            availableSessions[availability?.date] = {
                sessionTitle: availability.sessionTitle || "",
                costPerSession: availability.sessionCharge,
                sessionDuration: availability.sessionDuration,
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
export const getAllAvailablities = async (consultantId: string): Promise<any | null> => {
    try {
        const availablity = await ConsultantAvailability.find({ consultant: consultantId });

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
    sessionTitle: string,
    date: Date | Date[],
}

// sets the availabilty in consultant
export const setAvailablity = async ({ consultantId, from, to, sessionDuration, sessionCharge, date, sessionTitle }: TpropsSetAvailablity):
    Promise<any | null> => {
    try {
        let newAvailabilities: any;
        if (Array.isArray(date))
            newAvailabilities = date.map((date) => ({
                from,
                to,
                sessionDuration,
                sessionCharge,
                sessionTitle,
                date: new Date(date),
                consultant: consultantId,
            }))
        else
            newAvailabilities = [{
                from,
                to,
                sessionDuration,
                sessionCharge,
                sessionTitle,
                date: new Date(date),
                consultant: consultantId,
            }];

        let existingAvailabilities = await ConsultantAvailability.find({ consultant: consultantId });

        if (existingAvailabilities.length === 0) {
            // checking if multiple dates are present
            // directly inserting since there are no avaialbilities in the db
            if (Array.isArray(date)) {
                const newAvailability = await ConsultantAvailability.insertMany(newAvailabilities)
                const newIds = newAvailability.map((data) => data._id);

                await Consultant.findByIdAndUpdate(consultantId, {
                    $push: {
                        availability: newIds,
                    }
                })
                return newAvailabilities;
            }

            const newAvailability = await ConsultantAvailability.create(newAvailabilities[0])

            await Consultant.findByIdAndUpdate(consultantId, {
                $push: {
                    availability: newAvailability._id,
                }
            })
            return newAvailabilities;
        }

        // updating the existing availabilities
        const updatedAvailabilities: any[] = [];

        for (const availability of existingAvailabilities) {
            const storedDate = new Date(availability?.date);
            if (Array.isArray(date)) {
                // finding the preexisting availability and updating it
                // within from the new availabilities
                //

                // since we are directly mutating the array, 
                // it will get empty if all matches
                if (newAvailabilities.length === 0) break;

                for (const [index, newAvailability] of newAvailabilities.entries()) {
                    const newAvailabilityDate = new Date(newAvailability.date);

                    if (isSameDay(storedDate, newAvailabilityDate)) {
                        // replacing with the new one
                        await ConsultantAvailability.findOneAndUpdate({ _id: availability._id }, {
                            $set: {
                                from: from,
                                to: to,
                                sessionDuration: sessionDuration,
                                sessionCharge: sessionCharge,
                                consultant: consultantId,
                                sessionTitle: sessionTitle,
                                date: newAvailability.date,
                            }
                        }).then((res) => {
                            // removing the item from the array so it don't in the way of next itteration's 
                            // comparision
                            newAvailabilities.splice(index, 1)

                            // since we are removing the matched availablity from the new availabilities
                            updatedAvailabilities.push(newAvailability);
                        })

                    }
                }
                // this acts as return since it will take the program flow to the next iteration.
                continue;
            }

            // when date is not an array only one new availability should be updated 
            // or created
            // converting date time to string
            const newAvailabilityDate = new Date(date);
            // only one new Availability whose date is equal to date is present
            if (isSameDay(storedDate, newAvailabilityDate)) {
                // replacing with the new one
                //
                const updated = await ConsultantAvailability.findOneAndUpdate({ _id: availability._id }, {
                    $set: {
                        from: from,
                        to: to,
                        sessionDuration: sessionDuration,
                        sessionCharge: sessionCharge,
                        consultant: consultantId,
                        sessionTitle: sessionTitle,
                        date: date,
                    },
                },
                    { new: true }
                )

                // first setting the updated availability
                updatedAvailabilities.push(newAvailabilities[0])
                // removing it
                newAvailabilities = []
                break;
            }
        }

        const verifiedNewAvailabilities = newAvailabilities.filter((data: any) => data)

        // Means all availabilities were already present in the db and were updated
        if (verifiedNewAvailabilities?.length === 0)
            return updatedAvailabilities;

        // uploading the new Availabilities
        const newlyInsertedAvailablities = await ConsultantAvailability.insertMany(
            verifiedNewAvailabilities
        );

        // getting the newly added availablities ids
        const insertedIds = newlyInsertedAvailablities.map((data) => data._id);
        await Consultant.findByIdAndUpdate(consultantId, {
            $push: {
                availability: insertedIds
            }
        })

        // returns availabilities that were updated or inserted or for some reason Nothing is there then null.
        // verifiedNewAvailabilities contains inserted ones & updatedAvailabilities contains those which are updated.
        return [...verifiedNewAvailabilities, ...updatedAvailabilities] || null
    } catch (error) {
        console.log(error)
        return null;
    }
}
