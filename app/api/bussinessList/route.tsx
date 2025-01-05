import prisma from "@/prisma/client";
import {  NextResponse } from "next/server";


export async function GET() {
  try {
    const businessLists = await prisma.businessList.findMany({
        include: {
          category: true,
        },
      });

    return NextResponse.json(businessLists, { status: 200 });
  } catch (error) {
    console.error("Error fetching businessLists:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
/* eslint-disable */