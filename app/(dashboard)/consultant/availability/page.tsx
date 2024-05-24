"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { add, format, isSameDay } from "date-fns";
import {
  CONSULTANT_AVAILABILITY_BEGINNING_HOUR,
  CONSULTANT_AVAILABILITY_ENDING_HOUR,
  CONSULTANT_AVAILABILITY_INTERVAL,
} from "@/constants/config";

// import { DayMouseEventHandler, DayPicker } from "react-day-picker";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const ConsultantPage = ({ params: { user } }: { params: { user: string } }) => {
  const [value, setValue] = useState<Date[]>([]);

  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  console.log(date.dateTime);

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

  let footer = <>Please pick one or more days.</>;

  if (value.length > 0)
    footer = (
      <>
        You selected {value.length} days.{" "}
        <button onClick={handleResetClick}>Reset</button>
      </>
    );

  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-90px)] py-5">
      {/* <CalendarIcon /> */}
      <div>

        <div className="flex">
          <Calendar
            fromDate={new Date()}
            onDayClick={handleDayClick}
            modifiers={{ selected: value }}
            footer={footer}
            // numberOfMonths={2}
            className="w-[600px] h-[600px]"
          />
        </div>

        {/* {date.justDate && (
          <div className="flex flex-col gap-4">
            {times?.map((time, index) => (
              <div key={`time-${index}`} className="rounded-sm bg-grey-100 p-2">
                <button
                  type="button"
                  onClick={() =>
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }
                >
                  {format(time, "kk:mm")}
                </button>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ConsultantPage;
