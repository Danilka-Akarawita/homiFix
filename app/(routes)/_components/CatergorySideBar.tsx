"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";
export type Catergory = {
  id: number;
  name: string;
  icon: string;
};

function CatergorySideBar() {
  const [catergoryList, setCatergoryList] = useState<Catergory[]>([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await fetch("/api/catergory");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCatergoryList(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };

    fetchCategoryList();
  }, []);
  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div className="grid grid-cols-1 gap-4">
        {catergoryList.length > 0 ? (
          catergoryList.map((catergory, index) => (
            <Link href={'/'+catergory.name}
              key={index} // Use `id` if available, fallback to index
              className="flex p-3 border  mb-3 rounded-lg items-center cursor-pointer md:mr-10 hover:bg-purple-50 hover:text-primary hover:border-primary hover:scale-110 transition-all ease-in-out"
            >
              <Image
                src={`/${catergory.icon}`}
                alt={catergory.name}
                width={30}
                height={30}
              />
              <h2 className="text-primary">{catergory.name}</h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
}

export default CatergorySideBar;
