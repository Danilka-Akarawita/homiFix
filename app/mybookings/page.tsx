"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_components/bookingHistoryList";

export type Booking = {
  date: string;
  username: string;
  userEmail: string;
  bookingStatus: string;
  time: string;
  businessList: {
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
};


function MyBookings() {
  const [myBookingsList, setMyBookingsList] = useState<Booking[]>([]);

  const fetchMyBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMyBookingsList(data);
      console.log("my bookings ", data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchMyBooking();
  }, []);

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">My Bookings </h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList
            bookingHistory={myBookingsList.filter(
              (booking) => booking.bookingStatus == "booked"
            )}
          />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList
            bookingHistory={myBookingsList.filter(
              (booking) => booking.bookingStatus == "completed"
            )}
          />
          
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBookings;
/* eslint-disable */