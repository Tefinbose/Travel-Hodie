import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;

    const destination = await prisma.destination.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        packages: {
          where: {
            isActive: true,
          },
          include: {
            images: true,
          },
        },
      },
    });

    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          message: "Destination not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error("Destination details API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch destination details.",
      },
      { status: 500 }
    );
  }
}

