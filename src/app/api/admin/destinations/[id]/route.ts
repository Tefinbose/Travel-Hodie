
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

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

// GET: Fetch one destination
export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        _count: {
          select: { packages: true },
        },
      },
    });

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error("Admin destination GET error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch destination." },
      { status: 500 }
    );
  }
}

// PUT: Update destination
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;
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

    const existingDestination = await prisma.destination.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingDestination) {
      return NextResponse.json(
        { success: false, message: "Destination not found." },
        { status: 404 }
      );
    }

    const duplicateSlug = await prisma.destination.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
      select: { id: true },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        { success: false, message: "Another destination already uses this slug." },
        { status: 409 }
      );
    }

    const destination = await prisma.destination.update({
      where: { id },
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

    return NextResponse.json({
      success: true,
      message: "Destination updated successfully.",
      destination,
    });
  } catch (error) {
    console.error("Admin destination PUT error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update destination." },
      { status: 500 }
    );
  }
}

// DELETE: Delete destination if it has no packages
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        _count: {
          select: { packages: true },
        },
      },
    });

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found." },
        { status: 404 }
      );
    }

    if (destination._count.packages > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `This destination has ${destination._count.packages} associated package(s). Deactivate it instead of deleting it.`,
        },
        { status: 409 }
      );
    }

    await prisma.destination.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Destination deleted successfully.",
    });
  } catch (error) {
    console.error("Admin destination DELETE error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete destination." },
      { status: 500 }
    );
  }
}
