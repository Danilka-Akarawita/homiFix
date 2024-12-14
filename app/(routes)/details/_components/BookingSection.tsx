import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar"


interface BookingSectionProps {
  children: ReactNode;
}

function BookingSection({ children }: BookingSectionProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>book on a Service </SheetTitle>
            <SheetDescription>
              Select Date & Time to book the service
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="font-bold">Select Date</h2>
                <Calendar
                  mode= "single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
