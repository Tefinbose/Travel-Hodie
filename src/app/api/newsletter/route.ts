
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(150),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const email = validation.data.email.toLowerCase();

    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          {
            success: true,
            message: "You are already subscribed to our newsletter.",
          },
          { status: 200 }
        );
      }

      await prisma.newsletter.update({
        where: { email },
        data: { isActive: true },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Your newsletter subscription has been reactivated!",
        },
        { status: 200 }
      );
    }

    await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to TravelHodie!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to subscribe right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
