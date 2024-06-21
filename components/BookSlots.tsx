"use client";

import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";

import { Button } from "@/components/ui/button";
import { DayContentProps, DayMouseEventHandler } from "react-day-picker";
import { DateType } from "./ConsultantDialog";

const BookSlots = ({
    consultantId,
    setDisabled,
    date,
    setDate,
}: {
    consultantId: string;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    date: DateType;
    setDate: React.Dispatch<React.SetStateAction<DateType>>;
}) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const [times, setTimes] = React.useState<Date[] | null>(null);

    // store the fetched data in the db
    const [availabilities, setAvailability] = React.useState<Record<
        string,
        {
            sessions: {
                startingTime: string;
                booked: boolean;
            }[];
        }
    > | null>(null);

    useEffect(() => {
        const times = getTimes();
        if (times) setTimes(times);
    }, [date.justDate]);

    useEffect(() => {
        if (!consultantId) return;

        // Fetch data from the server
        fetch(`/api/sessions/${consultantId}`).then((res) => {
            if (res.ok) {
                res.json().then((availability) => {
                    console.log(availability);

                    if (availability?.availabilities)
                        setAvailability(availability?.availabilities);
                });
            }
        });
    }, []);

    const Dates =
        (availabilities &&
            Object.keys(availabilities).map((date) => new Date(date))) ||
        [];

    const getTimes = () => {
        if (!date.justDate || !availabilities) return;

        // just date contains the clicked date
        const { justDate } = date;

        const availability = Object.keys(availabilities).find((date) =>
            isSameDay(new Date(date), justDate)
        );

        if (!availability) return [];

        // getting the sessions that are not booked
        // and converting the starting time string to new date.
        return availabilities[availability].sessions
            .filter((session) => !session.booked)
            .map((session) => new Date(session.startingTime)); // FIX: Mapping of the time to correct time since startingtime is only hour:min
    };

    const handleDayClick: DayMouseEventHandler = (day) => {
        if (!day) return;
        const stringDate = day.toDateString();
        const stringDates = Dates.map((date) => date.toDateString());

        if (stringDates.includes(stringDate)) {
            setDate((prev) => ({ ...prev, justDate: day }));
        }
    };

    const handleTimeClick = async (time: Date, index: number) => {
        setActiveIndex(index);
        setDate((prev) => ({ ...prev, dateTime: time }));
        setDisabled(false);
    };

    const CustomDayContent = (props: DayContentProps) => {
        const stringDate = props.date.toDateString();
        const stringDates = Dates.map((date) => date.toDateString());

        const isAvailable = stringDates.includes(stringDate);

        return (
            <span
                style={{
                    position: "relative",
                    overflow: "visible",
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    color: !isAvailable ? "gray" : "",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {props.date.getDate()}
            </span>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-8">
                <Calendar
                    onDayClick={handleDayClick}
                    modifiers={{
                        available: Dates,
                    }}
                    fromDate={new Date()}
                    modifiersClassNames={{
                        available: "cursor-pointer text-red",
                    }}
                    selected={date.justDate ?? undefined}
                    mode="single"
                    showOutsideDays={false}
                    className="lg:w-[500px] w-full h-[550px] mb-4 md:mb-0"
                    components={{
                        DayContent: CustomDayContent,
                    }}
                />

                {!!(Dates && Dates.length > 0) && (
                    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
                        {times?.map((time, index) => (
                            <div key={`time-${index}`} className="rounded-sm bg-grey-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={`w-[100px] ${activeIndex === index + 1
                                        ? "bg-primary text-black hover:bg-primary hover:text-black"
                                        : ""
                                        }`}
                                    onClick={() => handleTimeClick(time, index + 1)}
                                >
                                    {format(time, "kk:mm")}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookSlots;
