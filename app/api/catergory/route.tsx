import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const catergories = await prisma.category.findMany();

    return NextResponse.json(catergories, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
