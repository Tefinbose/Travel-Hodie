
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const destinationSchema = z.object({
  name: z.string().trim().min(2, "Destination name is required."),
  slug: z
    .string()
    .trim()
    .min(2, "A valid slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens."),
  country: z.string().trim().min(2, "Country is required."),
  description: z.string().trim().optional(),
  image: z.string().trim().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

async function verifyAdmin() {
  const session = await getAdminSession();

  if (!session) return null;

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, role: true, isActive: true },
  });

  if (!admin || admin.role !== "ADMIN" || !admin.isActive) {
    return null;
  }

  return admin;
}

// GET: List destinations
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const search = request.nextUrl.searchParams.get("search")?.trim() || "";

    const destinations = await prisma.destination.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { country: { contains: search } },
              { slug: { contains: search } },
            ],
          }
        : undefined,
      include: {
        _count: {
          select: { packages: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("Admin destinations GET error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch destinations." },
      { status: 500 }
    );
  }
}

// POST: Create destination
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = destinationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Invalid destination details.",
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const existing = await prisma.destination.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "A destination with this slug already exists." },
        { status: 409 }
      );
    }

    const destination = await prisma.destination.create({
      data: {
        name: data.name,
        slug: data.slug,
        country: data.country,
        description: data.description || "",
        image: data.image || null,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Destination created successfully.",
        destination,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin destinations POST error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to create destination." },
      { status: 500 }
    );
  }
}
