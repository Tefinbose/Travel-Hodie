import { NextResponse } from "next/server";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(
      1,
      Number.parseInt(searchParams.get("page") || "1", 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(
        1,
        Number.parseInt(searchParams.get("limit") || "12", 10) || 12
      )
    );

    const featured = searchParams.get("featured");
    const destinationSlug = searchParams.get("destination");
    const search = searchParams.get("search")?.trim();

    const where = {
      isActive: true,

      ...(featured === "true" && {
        isFeatured: true,
      }),

      ...(destinationSlug && {
        destination: {
          is: {
            slug: destinationSlug,
            isActive: true,
          },
        },
      }),

      ...(search && {
        OR: [
          { title: { contains: search } },
          { shortDescription: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [total, packages] = await Promise.all([
      prisma.package.count({ where }),
      prisma.package.findMany({
        where,
        include: {
          destination: {
            select: {
              id: true,
              name: true,
              slug: true,
              country: true,
            },
          },
          images: {
            take: 1,
            select: {
              url: true,
              alt: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      packages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch packages API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load packages.",
      },
      { status: 500 }
    );
  }
}
