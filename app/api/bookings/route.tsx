import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { isBefore, parseISO } from "date-fns";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  userEmail: z.string().email("Invalid email address"),
  businessId: z.number().int("Business ID must be an integer"),
  businessStatus: z.enum(["booked", "completed"], {
    errorMap: () => ({
      message: "Status must be one of: booked, pending, completed",
    }),
  }),
  date: z.string(),
  time: z.string(),
});

type BookingData = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const body: BookingData = await request.json();
  console.log("Request Body:", body);

  const validation = schema.safeParse(body);
  if (!validation.success) {
    console.error("Validation Errors:", validation.error);
    return NextResponse.json(
      { error: validation.error.flatten() },
      { status: 400 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    console.error("User not authenticated");
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const booking = await prisma.booking.create({
    data: {
      username: validation.data.username,
      userEmail: validation.data.userEmail.trim(),
      businessListId: validation.data.businessId,
      bookingStatus: validation.data.businessStatus,
      date: new Date(validation.data.date),
      time: validation.data.time,
      createdBy: userId,
    },
  });

  return NextResponse.json(booking, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  console.log("Fetching bookings for user-id:", userId);

  if (userId) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          createdBy: userId,
        },
        include: {
          businessList: true,
        },
      });

      const updatedBookings = bookings.map((booking) => {
        const today = new Date();
        const bookingDate = parseISO(booking.date.toISOString());

        return {
          ...booking,
          bookingStatus:
            isBefore(bookingDate, today) ||
            bookingDate.toDateString() === today.toDateString()
              ? "completed"
              : "booked",
        };
      });

      return NextResponse.json(updatedBookings, { status: 200 });
    } catch (error) {
      console.error("Error fetching bookings:", error);

      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
