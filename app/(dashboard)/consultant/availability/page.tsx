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

  const Footer = () => {
    if (value.length === 0) {
      return <div className="mt-4">Please pick one or more days.</div>;
    }

    return (
      <div className="py-4">
        <div className="mt-0">
          <p className="text-[16px]">
            You selected {value.length} days.
            <Button
              variant="link"
              onClick={handleResetClick}
              className="w-auto h-auto text-[16px] p-0 ml-2 text-gray-400 hover:text-gray-300 transition-colors duration-200 ease-in-out"
            >
              Reset
            </Button>
          </p>
          <div className="flex justify-between items-center w-full gap-3 mt-7">
            <div className="flex flex-col w-full">
              <label htmlFor="from_time">From:</label>{" "}
              <Input id="from_time" className="w-full mt-1" type="time" />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="to_time">To:</label>{" "}
              <Input id="to_time" className="w-full mt-1" type="time" />
            </div>
          </div>
          <div className="flex flex-col justify-evenly w-full my-6">
            <label htmlFor="session_duration">
              Session Duration (in minutes)
            </label>
            <Input
              id="session_duration"
              className="w-full mt-1"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-wrap py-5 px-4 mt-6 lg:mt-16 lg:ml-20 gap-0 lg:gap-16">
        <Calendar
          fromDate={new Date()}
          onDayClick={handleDayClick}
          modifiers={{ selected: value }}
          className="lg:w-[600px] w-full h-[550px] mb-4 md:mb-0"
        />
        <div className="flex justify-start sm:justify-center lg:justify-start w-full md:w-auto">
          <Footer />
        </div>
      </div>
    </ScrollArea>
  );
};

export default ConsultantPage;
