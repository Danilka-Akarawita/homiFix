"use client";
import React, { useEffect } from "react";
type Params = {
  categoryName: string;
};

interface BusinessByCategoryProps {
  params: Params;
}

function BusinessByCatergory({ params }: BusinessByCategoryProps) {
  useEffect(() => {
    console.log(params);
  }, [params]);

  return <div>BusinessByCatergory</div>;
}

export default BusinessByCatergory;
