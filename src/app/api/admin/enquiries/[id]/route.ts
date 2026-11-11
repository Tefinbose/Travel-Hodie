
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const statusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONTACTED",
    "CONFIRMED",
    "CANCELLED",
  ]),
});

async function verifyAdmin() {
  const session = await getAdminSession();
  if (!session) return false;

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true, isActive: true },
  });

  return Boolean(admin && admin.role === "ADMIN" && admin.isActive);
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      include: {
        package: true,
      },
    });

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("Admin enquiry GET error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch enquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validation = statusSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Invalid status.",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.enquiry.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status: validation.data.status },
      include: {
        package: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry status updated successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Admin enquiry PATCH error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update enquiry." },
      { status: 500 }
    );
  }
}
