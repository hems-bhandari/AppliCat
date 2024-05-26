"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { add, format, isSameDay } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/breadcrumb";
import AvailabilityForm from "./Footer";

// interface DateType {
//   justDate: Date | null;
//   dateTime: Date | null;
// }
function handleSubmit() {

}

const ConsultantPage = ({ params: { user } }: { params: { user: string } }) => {
    const [value, setValue] = useState<Date[]>([]);
    const breadcrumbItems = [
        { title: "Availability", link: "/consultant/availability" },
    ];

    // const [date, setDate] = useState<DateType>({
    //   justDate: null,
    //   dateTime: null,
    // });

    // console.log(date.dateTime);
    console.log(value);

    const handleDayClick = (day: Date, modifiers: any) => {
        const newValue = [...value];
        if (modifiers.selected) {
            const index = value.findIndex((d) => isSameDay(day, d));
            newValue.splice(index, 1);
        } else {
            newValue.push(day);
        }
        setValue(newValue);
    };

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
                        <AvailabilityForm value={value} resetCallander={handleResetClick} />
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default ConsultantPage;
