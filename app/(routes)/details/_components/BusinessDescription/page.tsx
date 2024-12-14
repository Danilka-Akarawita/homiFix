import React from 'react'
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

function BusinessDescription({ business }: BusinessListProps) {
  return (
    <div>BusinessDescription</div>
  )
}

export default BusinessDescription