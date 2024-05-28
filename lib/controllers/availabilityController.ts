import { add } from "date-fns";
import { User } from "../models/userModel"

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
    date: Date,
}

// sets the availabilty in consultant
export const setAvailablity = async ({ consultantId, from, to, sessionDuration, sessionCharge, date }: TpropsSetAvailablity):
    Promise<any | null> => {
    try {
        const updatedConsultantAvailability = await User.findById(consultantId).then((consultant: any) => {
            const newAvailability = {
                from,
                to,
                sessionDuration,
                sessionCharge,
                date
            };


            let existingAvailability = consultant.availability || [];

            // no availablity is found
            if (!existingAvailability) {
                consultant.availability = [];
            }

            if (existingAvailability.length === 0) {
                consultant.availability = [newAvailability];
                consultant.save();
                return consultant.availability;
            }

            existingAvailability.map((availability: any) =>
                (availability.date === date)
                    ? newAvailability
                    : availability
            )

            consultant.availability = existingAvailability;
            consultant.save();

            console.log(consultant.availability)
            return consultant.availability;
        })

        // returns availablity if present or else null
        return updatedConsultantAvailability || null
    } catch (error) {
        console.log(error)
        return null;
    }
}
