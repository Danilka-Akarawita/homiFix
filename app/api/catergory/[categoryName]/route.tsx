import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ categoryName: string }>;
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { categoryName } = await params;

  console.log("Fetching categoryName:", categoryName);
  try {
    const businessListsByCategoryName = await prisma.businessList.findMany({
      where: {
        category: {
          name: categoryName, // Filter based on category name
        },
      },
      include: {
        category: true, // Include category details if needed
      },
    });

    return NextResponse.json(businessListsByCategoryName, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
