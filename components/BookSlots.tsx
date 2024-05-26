"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { add, format } from "date-fns";
import {
  CONSULTANT_AVAILABILITY_BEGINNING_HOUR,
  CONSULTANT_AVAILABILITY_ENDING_HOUR,
  CONSULTANT_AVAILABILITY_INTERVAL,
} from "@/constants/config";
import { Button } from "@/components/ui/button";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const ConsultantPage = () => {
  const [date, setDate] = React.useState<DateType>({
    justDate: null,
    dateTime: null,
  });
  
  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;

    const beginning = add(justDate, {
      hours: CONSULTANT_AVAILABILITY_BEGINNING_HOUR,
    });
    const end = add(justDate, { hours: CONSULTANT_AVAILABILITY_ENDING_HOUR });
    const interval = CONSULTANT_AVAILABILITY_INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-8">
        <Calendar
          fromDate={new Date()}
          onDayClick={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
          selected={date.justDate ?? undefined}
          mode="single"
          className="lg:w-[500px] w-full h-[550px] mb-4 md:mb-0"
        />

        {date.justDate && (
            <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
              {times?.map((time, index) => (
                <div
                  key={`time-${index}`}
                  className="rounded-sm bg-grey-100"
                >
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
