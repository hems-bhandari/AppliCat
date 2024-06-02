import { add } from "date-fns";
import { Consultant } from "../models/user"
import { ConsultantAvailability } from "../models/consultantAvailabilityModel";
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


        let existingAvailabilities = await ConsultantAvailability.find({ consultant: consultantId });

        if (existingAvailabilities.length === 0) {
            // checking if multiple dates are present
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
            const storedDateString = new Date(availability?.date).toISOString()
            if (Array.isArray(date)) {
                // finding the preexisting availability and updating it
                // within from the new availabilities
                //

                // since we are directly mutating the array, 
                // it will get empty if all matches
                if (newAvailabilities.length === 0) break;

                newAvailabilities.forEach((newAvailability: any, index: number) => {
                    const newAvailabilityDateString = new Date(newAvailability.date).toISOString()
                    if (storedDateString === newAvailabilityDateString) {
                        // replacing with the new one
                        ConsultantAvailability.updateOne({ _id: availability._id }, {
                            $set: {
                                from: from,
                                to: to,
                                sessionDuration: sessionDuration,
                                sessionCharge: sessionCharge,
                                consultant: consultantId,
                                date: newAvailability.date,
                            }
                        }).then((res) => {
                            console.log({ updateResponse: res })
                        })

                        // removing the item from the array so it don't in the way of next itteration's 
                        // comparision
                        newAvailabilities.splice(index, 1)

                        // since we are removing the matched availablity from the new availabilities
                        updatedAvailabilities.push(newAvailability);
                    }
                });
                continue;
            }

            // when date is not an array only one new availability should be updated 
            // or created
            // converting date time to string
            const newAvailabilityDateString = new Date(date).toISOString();
            // only one new Availability whose date is equal to date is present
            if (storedDateString === newAvailabilityDateString) {
                // replacing with the new one
                //
                ConsultantAvailability.updateOne({ _id: availability._id }, {
                    $set: {
                        from,
                        to,
                        sessionDuration,
                        sessionCharge,
                        date,
                        consultant: consultantId,
                    }
                });
                newAvailabilities = []
                updatedAvailabilities.push(newAvailabilities[0])
                break;
            }
        }
        const verifiedNewAvailabilities = newAvailabilities.filter((data: any) => data)
        // Means only one availablity was present and was updated
        if (verifiedNewAvailabilities?.length < 1)
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

        // returns availablity if present or else null
        return newAvailabilities || null
    } catch (error) {
        console.log(error)
        return null;
    }
}

