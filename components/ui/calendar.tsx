"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    cellStyle?: string;
};

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                button: cn(
                    buttonVariants({ variant: "ghost" }),
                    "!p-0"
                ),
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-[18px] font-medium mb-2",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-[40px] w-[40px] bg-transparent p-0 opacity-50 hover:opacity-100 mb-2"
                ),
                nav_button_previous: "absolute left-2",
                nav_button_next: "absolute right-2",
                table: "w-full border-collapse space-y-1",
                head_row: "flex justify-around w-full",
                head_cell:
                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full",
                cell: cn(
                    "relative p-0 text-center m-1 w-10 aspect-square text-[40px] focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent w-full overflow-hidden flex items-center justify-center",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md"
                ),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-full w-full font-normal aria-selected:opacity-100"
                ),
                day_range_start: "day-range-start",
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
