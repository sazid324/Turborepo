"use client";

import { Button } from "@repo/ui/src/components/ui/button";
import { Calendar } from "@repo/ui/src/components/ui/calendar";
import { FormControl } from "@repo/ui/src/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/src/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/components/ui/select";
import { formatDate } from "@repo/ui/src/lib/utils/functions";
import { cn } from "@repo/ui/src/lib/utils/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from(
  new Array(currentYear - 1900 + 1),
  (_, index) => currentYear - index,
);

interface IDatePicker {
  field: any;
}

export function DatePicker({ ...props }: IDatePicker) {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2000);

  const handleSelect: SelectSingleEventHandler = (day: Date | undefined) => {
    const date = new Date(day ?? "").toDateString();
    const formattedDate = formatDate(date);
    props.field.onChange({
      target: {
        value: formattedDate,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "font-inter w-full rounded-none border border-t-0 border-black bg-gray-50 bg-transparent px-3 py-[1.5rem] pl-3 text-left text-[16px] font-medium focus-visible:ring-0 focus-visible:drop-shadow-md",
              !props.field.value && "text-muted-foreground",
            )}
          >
            {props.field.value ? (
              formatDate(props.field.value)
            ) : (
              <span className="font-medium text-gray-700">Date of Birth</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="m-2 flex justify-between gap-1">
          <Select onValueChange={(value) => setMonth(parseInt(value))}>
            <SelectTrigger className="rounded border bg-transparent p-2 font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-gray-700">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setYear(parseInt(value))}>
            <SelectTrigger className="rounded border bg-transparent p-2 font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-gray-700">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map((year, index) => (
                  <SelectItem key={index} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          onSelect={handleSelect}
          month={new Date(year, month)}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
