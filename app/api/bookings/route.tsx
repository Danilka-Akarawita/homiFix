import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  userEmail: z.string().email("Invalid email address"),
  businessId: z.number().int("Business ID must be an integer"),
  businessStatus: z.enum(["booked", "pending", "completed"], {
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
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      username: validation.data.username,
      userEmail: validation.data.userEmail,
      businessListId: validation.data.businessId,
      bookingStatus: validation.data.businessStatus,
      date: new Date(validation.data.date),
      time: validation.data.time,
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
