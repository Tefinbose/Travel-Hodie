
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const bookingStatuses = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
] as const;

async function verifyAdmin() {
  const session = await getAdminSession();
  if (!session) return false;

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true, isActive: true },
  });

  return Boolean(admin && admin.role === "ADMIN" && admin.isActive);
}

export async function GET(request: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.trim() || "";
    const requestedStatus = searchParams.get("status");

    const statusResult = requestedStatus
      ? z.enum(bookingStatuses).safeParse(requestedStatus)
      : null;

    if (statusResult && !statusResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid booking status." },
        { status: 400 }
      );
    }

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") || 20))
    );

    const where = {
      ...(statusResult?.success ? { status: statusResult.data } : {}),
      ...(search
        ? {
            OR: [
              { bookingNumber: { contains: search } },
              { customerName: { contains: search } },
              { email: { contains: search } },
              { phone: { contains: search } },
            ],
          }
        : {}),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          package: {
            select: {
              id: true,
              title: true,
              slug: true,
              image: true,
              price: true,
            },
          },
          passengers: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin bookings GET error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch bookings." },
      { status: 500 }
    );
  }
}
