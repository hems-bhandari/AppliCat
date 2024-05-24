"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { add, format, isSameDay } from "date-fns";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// interface DateType {
//   justDate: Date | null;
//   dateTime: Date | null;
// }
function handleSubmit() {}

const ConsultantPage = ({ params: { user } }: { params: { user: string } }) => {
  const [value, setValue] = useState<Date[]>([]);

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

  let footer = <div className="mt-4">Please pick one or more days.</div>;

  if (value.length > 0)
    footer = (
      <>
        <div className="mt-4">
          You selected {value.length} days. <br />
          <Button onClick={handleResetClick}>Reset</Button>
          <div className="flex justify-evenly w-full mt-7">
            <label>From</label> <Input className="w-1/4" type="time" />
            <label>To</label> <Input className="w-1/4" type="time" />
          </div>
          <div className="flex flex-col justify-evenly w-full m-6">
            <label>Session Duration in Minutes</label>
            <Input className="w-1/2" type="number" />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <Button onClick={handleSubmit}> Submit </Button>
        </div>
      </>
    );

  return (
    <ScrollArea className="h-full">
      <div className="flex items-start justify-evenly min-h-[calc(100vh-90px)] py-5">
        <div className="flex">
          <Calendar
            fromDate={new Date()}
            onDayClick={handleDayClick}
            modifiers={{ selected: value }}
            // footer={footer}
            className="w-[600px] h-[600px]"
          />
        </div>
        <div className="flex flex-col items-center justify-evenly">
          {footer}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ConsultantPage;
