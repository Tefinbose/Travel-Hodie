import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: {
            packages: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      destinations,
      data: destinations,
    });
  } catch (error) {
    console.error("Destinations API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch destinations.",
      },
      { status: 500 }
    );
  }
}
