"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect, useState } from "react";
import CatergoryList from "./_components/CatergoryList";
import BussinessList from "./_components/BussinessList";

export default function Home() {
  const [catergoryList, setCatergoryList] = useState([]);
  const [businessList, setbusinessList] = useState([]);
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

    const fetchBusinessList = async () => {
      try {
        const response = await fetch("/api/bussinessList");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setbusinessList(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching business list:", error);
      }
    };

    fetchCategoryList();
    fetchBusinessList();
  }, []);

  return (
    <div>
      <Hero />
      <CatergoryList catergoryList={catergoryList} />
      <BussinessList businessList={businessList} title={'Popular Business'}/>
    </div>
  );
}
