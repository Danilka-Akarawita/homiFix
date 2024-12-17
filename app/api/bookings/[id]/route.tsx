import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  console.log("Fetching bookings for id:", id);

  try {
    const booking = await prisma.booking.findMany({
      where: {
        businessListId: parseInt(id, 10),
      },
      select: {
        date: true,
        bookingStatus: true,
        time: true,
      },
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
