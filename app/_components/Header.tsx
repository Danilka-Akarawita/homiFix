"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
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
      <Button>Get Started</Button>
    </div>
  );
};

export default Header;
