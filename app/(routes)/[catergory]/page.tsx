"use client";
import BussinessList from "@/app/_components/BussinessList";
import React, { useEffect, useState } from "react";
type Params = {
  catergory: string;
};

interface BusinessByCategoryProps {
  params: Params;
}

function BusinessByCatergory({ params }: BusinessByCategoryProps) {
  const [businessList, setBusinessList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchBusinessList = async () => {
    var categoryParams = await params;
    setCategoryName(categoryParams.catergory);

    try {
      const response = await fetch(
        `/api/catergory/${categoryParams.catergory}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBusinessList(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching business list:", error);
    }
  };

  useEffect(() => {
    fetchBusinessList();
  }, [params]);
  return (
    <div>
      <BussinessList title={categoryName} businessList={businessList} />
    </div>
  );
}

export default BusinessByCatergory;
