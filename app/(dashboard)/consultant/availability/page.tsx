"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
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
function handleNext1(){

}

const ConsultantPage = ({ params: { user } }: { params: { user: string } }) => {
  const [value, setValue] = useState<Date[]>([]);

  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  console.log(date.dateTime);
  console.log(value);

  // const getTimes = () => {
  //   if (!date.justDate) return;
  //   const { justDate } = date;

  //   const beginning = add(justDate, {
  //     hours: CONSULTANT_AVAILABILITY_BEGINNING_HOUR,
  //   });
  //   const end = add(justDate, { hours: CONSULTANT_AVAILABILITY_ENDING_HOUR });
  //   const interval = CONSULTANT_AVAILABILITY_INTERVAL;

  //   const times = [];
  //   for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
  //     times.push(i);
  //   }

  //   return times;
  // };

  // const times = getTimes();

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

  let footer = <div className="mt-4">Please pick one or more days.</div>;

  if (value.length > 0)
    footer = (
      <>
        <div className="mt-4">
        You selected {value.length} days.{" "} <br />
        <button onClick={handleResetClick}><b>Reset</b></button>
        <div className="flex flex-row-reverse">
          <Button onClick={handleNext1}> Next </Button>
        </div>
        </div>
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
            className="w-[600px] h-[600px]"
          />
        </div>
        
      </div>
    </div>
  );
};

export default ConsultantPage;
