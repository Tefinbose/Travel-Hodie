
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters").max(100),

  email: z.string().trim().email("Please enter a valid email address").max(150),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number"),

  service: z.string().trim().min(2).max(100),

  message: z.string().trim().min(10, "Message must contain at least 10 characters").max(3000),

  packageId: z.string().trim().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = enquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your enquiry details.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message, packageId } =
      validation.data;

    // Verify the package if the customer selected one.
    if (packageId) {
      const existingPackage = await prisma.package.findFirst({
        where: {
          id: packageId,
          isActive: true,
        },
        select: {
          id: true,
        },
      });

      if (!existingPackage) {
        return NextResponse.json(
          {
            success: false,
            message: "Selected travel package was not found.",
          },
          { status: 404 }
        );
      }
    }

    // Save enquiry in MySQL.
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        service,
        message,
        packageId: packageId || null,
        status: "PENDING",
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully!",
        data: enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
