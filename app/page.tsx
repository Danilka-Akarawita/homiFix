"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect, useState } from "react";
import CatergoryList from "./_components/CatergoryList";

export default function Home() {
  const [catergoryList, setCatergoryList] = useState([]);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await fetch("/api/catergory");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json(); 
        setCatergoryList(data)
        console.log(data);
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };

    fetchCategoryList();
  }, []);

  return (
    <div>
      <Hero />
      <CatergoryList catergoryList={catergoryList}/>
    </div>
  );
}
