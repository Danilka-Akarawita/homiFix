import React, { ReactNode, useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export type BusinessList = {
  id: number;
  name: string;
  address: string;
  contactPerson: string;
  about: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  email: string;
};

interface BookingSectionProps {
  children: ReactNode;
  business: BusinessList;
}
interface TimeSlot {
  time: string;
}

interface BookingSlot {
  date: Date; // Format: YYYY-MM-DD
  time: string;
  bookingStatus?: string; // Add other properties if needed
}

const generateTimeSlots = (): TimeSlot[] => {
  const timeList: TimeSlot[] = [];

  for (let i = 10; i <= 12; i++) {
    timeList.push({ time: `${i}:00 AM` });
    timeList.push({ time: `${i}:30 AM` });
  }

  for (let i = 1; i <= 6; i++) {
    timeList.push({ time: `${i}:00 PM` });
    timeList.push({ time: `${i}:30 PM` });
  }

  return timeList;
};

function BookingSection({ children, business }: BookingSectionProps) {
  const [bookedDate, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [bookedTimeSlot, setBookedTimeSlot] = useState<BookingSlot[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchBookingTimeSlots = async () => {
    try {
      const response = await fetch(`/api/bookings/${business.id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBookedTimeSlot(data);
      console.log("booking ", data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookingTimeSlots();
  }, [business.id, !isOpen]);

  const saveBooking = async () => {
    const objBooked = {
      username: business.contactPerson,
      userEmail: business.email.trim(),
      businessId: business.id,
      businessStatus: "booked",
      date: bookedDate?.toISOString().slice(0, 10), // Format: YYYY-MM-DD
      time: selectedTime,
    };

    console.log("ogj: ", objBooked);

    const response = await fetch(`/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objBooked),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    toast("New booking Created!");
    setSelectedTime(undefined);
    setDate(undefined);
  };

  const isValidDate = (date: Date | undefined): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return date >= today; 
  };

  const isBooked = (time: string) => {
    const selectedDateStr = bookedDate?.toISOString().slice(0, 10); // Format: YYYY-MM-DD

    const isSlotBooked = !!bookedTimeSlot.find((item) => {
      const itemDateStr = new Date(item.date).toISOString().slice(0, 10); 
      return itemDateStr === selectedDateStr && item.time === time;
    });

    console.log("Is booked:", isSlotBooked);
    return isSlotBooked;
  };
  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date & Time to book the service
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="font-bold mt-2">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={bookedDate}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                {!isValidDate(bookedDate) && (
                  <p className="text-red-500">
                    Booking date must be today or in the future.
                  </p>
                )}
              </div>
              <h2 className="font-bold m-3">Select Time</h2>
              <div className="grid grid-cols-3 gap-2">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`border rounded-full px-2 p-2 hover:bg-primary hover:text-white ${
                      selectedTime === item.time && "bg-primary text-white"
                    }`}
                    onClick={() => setSelectedTime(item.time)}
                    disabled={isBooked(item.time) || !isValidDate(bookedDate)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <div className="flex gap-5 mt-2">
                <Button
                  onClick={() => saveBooking()}
                  disabled={
                    !(selectedTime && bookedDate && isValidDate(bookedDate))
                  }
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
