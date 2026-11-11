
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

    const travelPackage = await prisma.package.findFirst({
      where: {
        slug,
        isActive: true,
        destination: {
          isActive: true,
        },
      },
      include: {
        destination: true,
        images: true,
      },
    });

    if (!travelPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Travel package not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: travelPackage,
    });
  } catch (error) {
    console.error("Package details API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch package details.",
      },
      { status: 500 }
    );
  }
}
