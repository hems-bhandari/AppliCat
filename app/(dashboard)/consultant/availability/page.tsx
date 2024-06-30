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
    sessionTitle: string,
    sessionDuration: string,
    to: string,
}

const ConsultantPage = () => {
    const [value, setValue] = useState<Date[]>([]);
    const [defaultAvailabilityData, setDefaultAvailabilityData] = useState<TAvailability[]>([]);

    const breadcrumbItems = [
        { title: "Availability", link: "/consultant/availability" },
    ];

    const handleDayClick = (day: Date, modifiers: any) => {
        setValue((p: Date[]) =>
            modifiers?.selected
                ? p.filter((_, i: number) => p.findIndex(d => isSameDay(day, d)) !== i)
                : [...p, day])
    };

    // getting the consultant data;
    const userSession = useSession();

    useEffect(() => {
        if (userSession) {
            const consultantId = userSession.data?.user?._id;
            if (!consultantId) return;

            fetch(`/api/availability/?consultantId=${consultantId}`).then(res => res.ok && res.json())
                .then((availabilityFromDb) => {
                    if (!availabilityFromDb) return

                    const availabilities = availabilityFromDb.availabilities

                    if (availabilities)
                        setDefaultAvailabilityData(availabilities);
                })
        }

    }, [userSession])

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
                                            const storedDateString = new Date(availability.date)
                                            // every selected date in iso string format array
                                            const LastSelectedDateString = new Date(value[value.length - 1])
                                            return isSameDay(storedDateString, LastSelectedDateString)
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
