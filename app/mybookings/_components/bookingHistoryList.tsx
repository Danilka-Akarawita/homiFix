import React from "react";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export type BookingHistoryList = {
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

interface BookingHistoryProps {
  bookingHistory: BookingHistoryList[];
}

function BookingHistoryList({ bookingHistory }: BookingHistoryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {bookingHistory.map((history, index) => (
        <div
          key={index}
          className="flex gap-3 border rounded-lg p-4 mb-5
         "
        >
          <Image
            src={"/default.png"}
            alt={history.username}
            width={120}
            height={120}
            className="rounded-lg"
          />

          <div className="flex flex-col items-baseline p-3 gap-1">
          <h2 className="p-1 bg-purple-200 rounded-full text-primary px-2 text-[12px]">{history.businessList.name}</h2>
            <h2 className="font-bold text-lg ">{history.username}</h2>
            <h2 className=" flex gap-2 text-gray-500">
              <Calendar className=" text-primary" />
              Service on :{new Date(history.date).toISOString().slice(0, 10)}
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <Clock className=" text-primary" />
              Service at: {history.time}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryList;
