
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const bookingSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Invalid phone number"),

  packageId: z.string().trim().min(1, "Package is required"),

  travelDate: z.string().datetime().optional(),

  passengers: z
    .array(
      z.object({
        name: z.string().trim().min(2).max(100),
        age: z.number().int().min(0).max(120).optional(),
        gender: z.string().trim().max(30).optional(),
      })
    )
    .min(1, "At least one passenger is required")
    .max(20, "Maximum 20 passengers allowed"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your booking details.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      email,
      phone,
      packageId,
      travelDate,
      passengers,
    } = validation.data;

    // Find and verify the selected package.
    const selectedPackage = await prisma.package.findFirst({
      where: {
        id: packageId,
        isActive: true,
        destination: {
          isActive: true,
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
      },
    });

    if (!selectedPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected travel package is unavailable.",
        },
        { status: 404 }
      );
    }

    // Calculate price on the server, not from customer input.
    const totalAmount = selectedPackage.price.mul(passengers.length);

    // Generate a unique booking number.
    const bookingNumber = `TH-${Date.now()}-${randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;

    // Save booking and passengers together.
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerName,
        email: email.toLowerCase(),
        phone,
        packageId,
        travelDate: travelDate ? new Date(travelDate) : null,
        totalAmount,
        status: "PENDING",

        passengers: {
          create: passengers.map((passenger) => ({
            name: passenger.name,
            age: passenger.age,
            gender: passenger.gender,
          })),
        },
      },
      include: {
        passengers: true,
        package: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your booking has been submitted successfully!",
        data: {
          bookingNumber: booking.bookingNumber,
          customerName: booking.customerName,
          email: booking.email,
          travelDate: booking.travelDate,
          totalAmount: booking.totalAmount.toString(),
          status: booking.status,
          package: booking.package,
          passengers: booking.passengers,
          createdAt: booking.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your booking. Please try again.",
      },
      { status: 500 }
    );
  }
}
