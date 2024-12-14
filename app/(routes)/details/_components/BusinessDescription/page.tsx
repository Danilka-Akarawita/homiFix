import React from "react";
import Image from "next/image";

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

function BusinessDescription({ business }: BusinessListProps) {
  return (
    <div>
      <h2 className="font-bold text-[25px]">Description</h2>
      <h2 className="mt-4 text-lg text-justify text-gray-700">
        {business.about}
      </h2>
      <h2 className="font-bold text-[25px] mt-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {/* need to map rom the business db  */}
        <Image
          src={"/default.png"} // Default placeholder
          alt={business.category.name}
          width={700}
          height={200}
          className="rounded-lg"
        />
        <Image
          src={"/default.png"} // Default placeholder
          alt={business.category.name}
          width={700}
          height={200}
          className="rounded-lg "
        />
      </div>
    </div>
  );
}

export default BusinessDescription;
