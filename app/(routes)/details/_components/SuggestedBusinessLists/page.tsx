import React from "react";
export type BusinessList = {
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

interface BusinessListProps {
  business: BusinessList;
}
function SuggestedBusinessLists({ business }: BusinessListProps) {
  return <div>SuggestedBusinessLists</div>;
}

export default SuggestedBusinessLists;
