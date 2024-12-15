import { Button } from "@/components/ui/button";
import { Notebook, NotebookPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingSection from "./BookingSection";

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
function SuggestedBusinessLists({ business }: BusinessListProps) {
  const [SimilarBusinessList, setSimilarBusinessList] = useState([]);

  const fetchBusinessList = async () => {
    try {
      const response = await fetch(`/api/catergory/${business.category.name}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSimilarBusinessList(data);
    } catch (error) {
      console.error("Error fetching business list:", error);
    }
  };

  useEffect(() => {
    business && fetchBusinessList();
    console.log("Similar:", SimilarBusinessList);
  }, [business]);
  return (
    <div className=" md:pl-10 ">
      <BookingSection>
        <Button className="flex gap-2  ">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2 className="font-bold text-lg mt-3 hidden md:block">
          Similar Business
        </h2>
        <div>
          {SimilarBusinessList?.map((similarBusiness, index) => (
            <Link
              key={index}
              href={`/details/1`}
              className="flex gap-2 mb-2 mt-3 hover:border rounded-lg border-primary p-2 cursor-pointer hover:shadow-sm"
            >
              <Image
                src={"/default.png"} // Default placeholder
                alt={""}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div>
                <h2 className="font-bold">{business.name}</h2>
                <h2 className="text-primary text-bold">
                  {business.contactPerson}
                </h2>
                <h2 className="text-gray-500">{business.address}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessLists;
