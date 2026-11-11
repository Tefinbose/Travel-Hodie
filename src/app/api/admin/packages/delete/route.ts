
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { z } from "zod";

const deleteSchema = z.object({
  id: z.string().min(1, "Package ID is required."),
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

export async function POST(request: Request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = deleteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Invalid request.",
        },
        { status: 400 }
      );
    }

    const { id } = validation.data;

    const existingPackage = await prisma.package.findUnique({
      where: { id },
      select: { id: true, title: true },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { success: false, message: "Package not found." },
        { status: 404 }
      );
    }

    const [bookingCount, enquiryCount] = await Promise.all([
      prisma.booking.count({ where: { packageId: id } }),
      prisma.enquiry.count({ where: { packageId: id } }),
    ]);

    if (bookingCount > 0 || enquiryCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This package has existing bookings or enquiries. Deactivate it instead of deleting it.",
          bookings: bookingCount,
          enquiries: enquiryCount,
        },
        { status: 409 }
      );
    }

    await prisma.package.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `${existingPackage.title} deleted successfully.`,
    });
  } catch (error) {
    console.error("DELETE PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete package.",
      },
      { status: 500 }
    );
  }
}
