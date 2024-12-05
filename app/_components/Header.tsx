"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

const Header: React.FC = () => {
  const {user,isSignedIn}=useUser();
  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Image src="/logo.svg" alt="logo" width={50} height={30} />
        <div className="md:flex items-center gap-6 hidden">
          <Link
            href="/"
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/"
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            Services
          </Link>
          <Link
            href="/"
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            About Us
          </Link>
        </div>
      </div>
      {/* Right section: Button */}
      {isSignedIn?
      <UserButton/>:
      <Link href='/sign-in'>
      <Button >Get Started</Button>
      </Link>}
    </div>
  );
};

export default Header;
