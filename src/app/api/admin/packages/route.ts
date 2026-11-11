import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const packageSchema = z.object({
  title: z.string().trim().min(3),
  slug: z.string().trim().min(3),
  shortDescription: z.string().trim().optional(),
  description: z.string().trim().min(10),
  destinationId: z.string().min(1),
  duration: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  image: z.string().trim().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

async function verifyAdmin() {
  const session = await getAdminSession();
  if (!session) return false;

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true, isActive: true },
  });

  return admin?.role === "ADMIN" && admin.isActive;
}

// GET: List all packages (for admin dashboard/management)
export async function GET(request: Request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { slug: { contains: search } },
          { shortDescription: { contains: search } },
        ],
      }),
    };

    const packages = await prisma.package.findMany({
      where,
      include: {
        destination: {
          select: {
            id: true,
            name: true,
            country: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      packages: packages.map((pkg) => ({
        ...pkg,
        price: Number(pkg.price),
      })),
    });
  } catch (error) {
    console.error("GET ADMIN PACKAGES ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch packages." },
      { status: 500 }
    );
  }
}

// POST: Create a new package
export async function POST(request: Request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = packageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message || "Invalid package details.",
          errors: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check duplicate slug
    const existingSlug = await prisma.package.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "This package URL slug is already in use.",
        },
        { status: 409 }
      );
    }

    // Verify destination exists
    const destination = await prisma.destination.findUnique({
      where: { id: data.destinationId },
      select: { id: true, isActive: true },
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

    const newPackage = await prisma.package.create({
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
    });

    return NextResponse.json(
      {
        success: true,
        message: "Package created successfully.",
        package: {
          ...newPackage,
          price: Number(newPackage.price),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ADMIN PACKAGE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Unable to create package." },
      { status: 500 }
    );
  }
}
