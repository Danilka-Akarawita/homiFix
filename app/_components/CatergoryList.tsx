import React from "react";
import Image from "next/image";
import Link from "next/link";

export type Category = {
  id: number;
  name: string;
  icon: string;
};
interface CategoryItemProps {
  catergoryList: Category[];
}
function CategoryList({ catergoryList }: CategoryItemProps) {
  return (
    <div className="mx-4 md:mx-22 lg:mx-52 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {catergoryList?.length > 0
        ? catergoryList.map((catergory, index) => (
            <Link href={'/'+catergory.name}
              key={index}
              className="flex flex-col items-center justify-center gap-2 bg-purple-100 p-5 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out"
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
        : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
    </div>
  );
}

export default CategoryList;
