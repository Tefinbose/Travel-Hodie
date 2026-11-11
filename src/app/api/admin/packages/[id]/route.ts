
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const packageSchema = z.object({
  title: z.string().trim().min(3),
  slug: z.string().trim().min(3),
  shortDescription: z.string().trim().optional(),
  description: z.string().trim().min(10),
  destinationId: z.string().min(1),
  duration: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  image: z.string().trim().optional(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

async function verifyAdmin() {
  const session = await getAdminSession();

  if (!session) {
    return false;
  }

  const admin = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      role: true,
      isActive: true,
    },
  });

  return Boolean(
    admin &&
    admin.role === "ADMIN" &&
    admin.isActive
  );
}

// GET SINGLE PACKAGE
export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Package ID is required." },
        { status: 400 }
      );
    }

    const item = await prisma.package.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        description: true,
        destinationId: true,
        duration: true,
        price: true,
        image: true,
        isFeatured: true,
        isActive: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Package not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      package: {
        ...item,
        price: Number(item.price),
      },
    });
  } catch (error) {
    console.error("GET ADMIN PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch package.",
        error:
          process.env.NODE_ENV === "development" &&
          error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}

// UPDATE PACKAGE
export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const validation = packageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message ||
            "Invalid package details.",
        },
        { status: 400 }
      );
    }

    const existingPackage = await prisma.package.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { success: false, message: "Package not found." },
        { status: 404 }
      );
    }

    const data = validation.data;

    const duplicateSlug = await prisma.package.findFirst({
      where: {
        slug: data.slug,
        NOT: {
          id,
        },
      },
      select: { id: true },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "This package URL slug is already in use.",
        },
        { status: 409 }
      );
    }

    const destination = await prisma.destination.findUnique({
      where: {
        id: data.destinationId,
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!destination || !destination.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an active destination.",
        },
        { status: 400 }
      );
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription || null,
        description: data.description,
        destinationId: data.destinationId,
        duration: data.duration,
        price: data.price,
        image: data.image || null,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        destinationId: true,
        isFeatured: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Package updated successfully.",
      package: {
        ...updatedPackage,
        price: Number(updatedPackage.price),
      },
    });
  } catch (error) {
    console.error("UPDATE ADMIN PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update package.",
        error:
          process.env.NODE_ENV === "development" &&
          error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
