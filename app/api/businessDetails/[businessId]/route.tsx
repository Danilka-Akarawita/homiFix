import prisma from "@/prisma/client";
import {  NextRequest, NextResponse } from "next/server";

type Params = Promise<{ businessId: string }>;
export async function GET(
  request: NextRequest,
  
  { params }: { params: Params }
) {
  const { businessId } = await params;

  console.log("Fetching businessId:", businessId);
  try {
    const businessListsDetailsById = await prisma.businessList.findMany({
      where: {
        id:parseInt(businessId, 10)
      },
      include: {
        category: true, 
      },
    });

    return NextResponse.json(businessListsDetailsById, { status: 200 });
  } catch (error) {
    console.error("Error fetching businessListsDetails:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
