import React from "react";
import Image from "next/image";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface BusinessListProps {
  business: BusinessList;
}

function BusinessInfo({ business }: BusinessListProps) {
    console.log("first,",business);
  return (
    <div className="md:flex items-center ">
      <Image
        src={"/default.png"} // Default placeholder
        alt={business.category.name}
        width={150}
        height={200}
        className="rounded-full h-[150px] object-cover"
      />
      <div className="md:flex justify-between items-center w-full">
        <div className="flex flex-col items-baseline m-2 gap-3">
          <h2 className="text-primary bg-purple-100 rounded-full  px-2 text-lg">
            {business.category.name}
          </h2>
          <h2 className="text-[40px] font-bold ">{business.name}</h2>
          <h2 className="flex gap-2 text-lg text-gray-500 ">
            <MapPin />
            {business.address}
          </h2>
          <h2 className="flex gap-2 text-lg  text-gray-500  ">
            <Mail />
            {business.email}
          </h2>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-3">
          <Button>
            <Share />
          </Button>
          <h2 className="flex gap-2 text-xl text-primary">
            <User />
            {business.contactPerson}
          </h2>
          <h2 className="flex gap-2 text-xl text-gray-500">
            <Clock />
            Available 8:00 AM to 10:00 PM
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
