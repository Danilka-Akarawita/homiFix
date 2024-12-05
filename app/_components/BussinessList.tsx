import React from "react";
import { Button } from "@/components/ui/button";

export type BusinessList = {
  id: number;
  name: string;
  address: string;
  contactPerson: string;
  about: string;
  categoryId: number;
  category: Category;
  email: string;
};
export type Category = {
  id: number;
  name: string;
  icon: string;
};

interface BusinessListProps {
  businessList: BusinessList[];
  title: string;
}

function BussinessList({ businessList, title }: BusinessListProps) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-[22px]">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {businessList.length < 0
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-lg shadow-md"
              ></div>
            ))
          : businessList.map((business, index) => (
              <div
                key={index}
                className="shadow-md rounded-lg hover:shadow-lg cursor-pointer
                 hover:shadow-primary hover:scale-105 transition-all ease-in-out"
              >
                {/* Replace with actual image once available */}
                <div className="h-[150px] md:h-[200px] bg-purple-100 rounded-t-lg flex items-center justify-center">
                  <h2 className="text-gray-500 text-sm">Image Placeholder</h2>
                  {/* <Image src={}
            alt={business.name}
            width={500}
            height={200}
            className='h-[150px] md:h-[200px] object-cover rounded-lg'
            /> */}
                </div>
                <div className="flex flex-col items-baseline p-3 gap-1">
                  <h2 className="p-1 bg-purple-200 rounded-full text-primary px-2 text-[12px]">
                    {business.category.name}
                  </h2>
                  <h2 className="font-bold text-lg">{business.name}</h2>
                  <h2 className="text-primary">{business.contactPerson}</h2>
                  <h2 className="text-gray-500 text-sm">{business.address}</h2>
                  <Button className="rounded-lg mt-3">Book Now</Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BussinessList;
