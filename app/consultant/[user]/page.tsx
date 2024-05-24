"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { add, format } from "date-fns";

interface DateType {
    justDate: Date | null;
    dateTime: Date | null;
}

const ConsultantPage = ({ params: { user } }: { params: { user: string } }) => {
    const [date, setDate] = React.useState<DateType>({
        justDate: null,
        dateTime: null,
    });
    const getTimes = () => {
        if (!date.justDate) return;
        const { justDate } = date;

        const beginning = add(justDate, { hours: 19 });
        const end = add(justDate, { hours: 21 });
        const interval = 15;

        const times = [];
        for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
            times.push(i);
        }
        return times;
    };
    const times = getTimes();
    return (

        <div className="flex flex-col items-center justify-center h-screen">
            {/* <CalendarIcon /> */}
            <h2> Book a session with {user}</h2>
            <div className="flex">
                <Calendar
                    fromDate={new Date()}
                    onDayClick={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
                    mode="single"
                />
                {date.justDate && (
                    <div className="flex flex-col gap-4">
                        {times?.map((time, index) => (
                            <div key={`time-${index}`} className="rounded-sm bg-grey-100 p-2">
                                <button

                                    type="button"
                                    onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
                                >
                                    {format(time, "kk:mm")}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultantPage;
