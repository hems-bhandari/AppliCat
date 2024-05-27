"use client";

import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { add, format } from "date-fns";

import { dummyData, Session } from "@/constants/some_dummy_data";
import { Button } from "@/components/ui/button";
import { DayContentProps, DayMouseEventHandler } from "react-day-picker";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const ConsultantPage = () => {
  const [date, setDate] = React.useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const [times, setTimes] = React.useState<Date[] | null>(null);

  useEffect(() => {
    const times = getTimes();
    if (times) setTimes(times);
  }, [date.justDate]);

  const Dates = Object.keys(dummyData).map((date) => new Date(date));

  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;

    const stringDate = justDate.toDateString();
    const stringDates = Dates.map((date) => date.toDateString());

    const index = stringDates.indexOf(stringDate);

    const times = dummyData[Object.keys(dummyData)[index]]?.sessions
      .map(
        (session: Session) =>
          session.booked === false &&
          new Date(`${stringDate} ${session.startingTime}`)
      )
      .filter(Boolean);

    return times as Date[];
  };

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    if (!day) return;
    const stringDate = day.toDateString();
    const stringDates = Dates.map((date) => date.toDateString());

    if (stringDates.includes(stringDate)) {
      setDate((prev) => ({ ...prev, justDate: day }));
    }
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

        {date.justDate && (
          <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
            {times?.map((time, index) => (
              <div key={`time-${index}`} className="rounded-sm bg-grey-100">
                <Button
                  type="button"
                  variant="outline"
                  className="w-[100px]"
                  onClick={() =>
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }
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

export default ConsultantPage;
