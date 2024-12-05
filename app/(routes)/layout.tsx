import React, { ReactNode } from "react";
import CatergorySideBar from "./_components/CatergorySideBar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="grid grid-cols-4 mt-8">
        <div className=""><CatergorySideBar/></div>
        <div className="col-span-3 bg-red-100">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
