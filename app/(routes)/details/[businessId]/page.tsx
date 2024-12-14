"use client";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo/page";
import { usePathname } from "next/navigation";
import BusinessDescription from "../_components/BusinessDescription/page";
import SuggestedBusinessLists from "../_components/SuggestedBusinessLists/page";
export type Business = {
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
function BusinessDetails() {
  const [businessList, setBusinessList] = useState<Business | null>(null);
  const params = usePathname();
  const fetchBusinessList = async () => {
    const paramId = params.split("/")[2];
    console.log("id:", params.split("/")[2]);

    try {
      const response = await fetch(`/api/businessDetails/${paramId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBusinessList(data[0]);
     
    } catch (error) {
      console.error("Error fetching business list:", error);
    }
  };

  useEffect(() => {
    fetchBusinessList();
  }, []);
  return (
    <div className="py-8 md:py-20 px-10 md:px-36">
      {businessList && <BusinessInfo business={businessList} />}
      <div className="grid grid-cols-3 mt-10">
        <div className="col-span-3 md:col-span-2 order-last md:order-first"> {businessList && <BusinessDescription business={businessList} />}</div>
        <div > {businessList && <SuggestedBusinessLists business={businessList} />}</div>
      </div>
    </div>
  );
}

export default BusinessDetails;
