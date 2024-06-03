"use client";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/breadcrumb";
import AvailabilityForm from "./Footer";
import { useSession } from "next-auth/react";

export type TAvailability = {
    _id: string,
    consultant: string,
    date: string,
    from: string,
    sessionCharge: string,
    sessionDuration: string,
    to: string,
}
const ConsultantPage = ({ params: { user } }: { params: { user: string } }) => {
    const [value, setValue] = useState<Date[]>([]);
    const [defaultAvailabilityData, setDefaultAvailabilityData] = useState<TAvailability[]>([]);

    const breadcrumbItems = [
        { title: "Availability", link: "/consultant/availability" },
    ];

    const handleDayClick = (day: Date, modifiers: any) => {
        console.log(day, modifiers)
        setValue((prev: Date[]) =>
            modifiers?.selected
                ? prev.filter((_, i: number) => prev.findIndex(prevDay => isSameDay(day, prevDay)) !== i)
                : [...prev, day])
    };
    // getting the consultant data;
    const userSession = useSession();
    useEffect(() => {
        if (userSession) {
            // FIX:manually fetching the data since the context for some reason
            // doesnot have the data that is set by the auth function in the
            // auth-options session callback. this needs to be updated, but is of for the time
            // being
            fetch(`/api/auth/session`).then(res => res.json()).then((res) => {
                const user = res.user;
                if (!user) return;

                const consultantId = res.user?._id;

                fetch(`/api/availability/?consultantId=${consultantId}`).then(res => res.ok && res.json())
                    .then((availabilityFromDb) => {
                        if (!availabilityFromDb) return

                        const availabilities = availabilityFromDb.availabilities

                        if (availabilities)
                            setDefaultAvailabilityData(availabilities);
                    })
            });
            // fetching the previous availabilities
        }

    }, [])

    const handleResetClick = () => setValue([]);
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <div className="flex flex-wrap py-5 px-4 mt-6 gap-0 lg:gap-16">
                    <Calendar
                        fromDate={new Date()}
                        onDayClick={handleDayClick}
                        modifiers={{ selected: value }}
                        className="lg:w-[600px] w-full h-[550px] mb-4 md:mb-0"
                        cellStyle={``}
                    />
                    <div className="flex justify-start sm:justify-center lg:justify-start w-full md:w-auto">
                        {value.length < 1 ?
                            <div className="mt-4">Please pick one or more days.</div>
                            : <AvailabilityForm
                                value={value}
                                resetCallander={handleResetClick}
                                defaultValue={
                                    defaultAvailabilityData
                                        .find((availability: TAvailability) => {
                                            const storedDateString = new Date(availability.date).toISOString();
                                            // every selected date in iso string format array
                                            const LastSelectedDateString = new Date(value[value.length - 1]).toISOString();
                                            return LastSelectedDateString === storedDateString
                                        }) || null
                                }
                                setDefaultAvailabilityData={setDefaultAvailabilityData}
                            />
                        }

                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default ConsultantPage;
