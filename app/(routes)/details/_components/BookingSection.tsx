import React, { ReactNode, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface BookingSectionProps {
  children: ReactNode;
}
interface TimeSlot {
  time: string;
}

function BookingSection({ children }: BookingSectionProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = React.useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<string>();

  const getTime = () => {
    const timeList: TimeSlot[] = [];

    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
    console.log("time: ", timeList);
  };

  useEffect(() => {
    getTime();
  }, []);

  const saveBooking = () => {};

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>book on a Service </SheetTitle>
            <SheetDescription>
              Select Date & Time to book the service
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="font-bold mt-2">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <h2 className="font-bold m-3">Select Time</h2>
              <div className="grid grid-cols-3 gap-2">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`border rounded-full px-2 p-2 hover:bg-primary hover:text-white ${
                      selectedTime == item.time && "bg-primary text-white"
                    }`}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <div className=" flex gap-5 mt-2">
                <Button
                  onClick={() => saveBooking()}
                  disabled={!(selectedTime && date)}
                >
                  Book
                </Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
