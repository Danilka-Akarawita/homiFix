import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


type Params = Promise<{ name: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { name } = await params;

  console.log("Fetching names:", name);

  try {
    const categories = await prisma.category.findMany({
      where: {
        name:name
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
