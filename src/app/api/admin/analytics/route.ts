import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

async function verifyAdmin() {
  const session = await getAdminSession();
  if (!session) return false;

  const admin = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true, isActive: true },
  });

  return Boolean(admin && admin.role === "ADMIN" && admin.isActive);
}

export async function GET() {
  try {
    const isAuthorized = await verifyAdmin();
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 }
      );
    }

    const [
      bookings,
      enquiries,
      totalPackages,
      activePackages,
      featuredPackages,
      totalDestinations,
      totalPassengers,
      subscribersCount,
      unreadContacts,
    ] = await Promise.all([
      prisma.booking.findMany({
        select: {
          id: true,
          bookingNumber: true,
          customerName: true,
          email: true,
          totalAmount: true,
          status: true,
          createdAt: true,
          package: {
            select: {
              id: true,
              title: true,
              slug: true,
              price: true,
              destination: {
                select: {
                  name: true,
                },
              },
            },
          },
          passengers: {
            select: {
              id: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.enquiry.findMany({
        select: {
          id: true,
          service: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.package.count(),
      prisma.package.count({ where: { isActive: true } }),
      prisma.package.count({ where: { isFeatured: true } }),
      prisma.destination.count(),
      prisma.bookingPassenger.count(),
      prisma.newsletter.count({ where: { isActive: true } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    // Financial calculations
    let totalGrossRevenue = 0;
    let confirmedRevenue = 0;
    let pendingRevenue = 0;
    let cancelledRevenue = 0;

    const bookingStatusCounts = {
      PENDING: 0,
      CONFIRMED: 0,
      CANCELLED: 0,
      COMPLETED: 0,
    };

    bookings.forEach((b) => {
      const amount = Number(b.totalAmount) || 0;
      totalGrossRevenue += amount;

      if (b.status === "CONFIRMED" || b.status === "COMPLETED") {
        confirmedRevenue += amount;
      } else if (b.status === "PENDING") {
        pendingRevenue += amount;
      } else if (b.status === "CANCELLED") {
        cancelledRevenue += amount;
      }

      if (b.status in bookingStatusCounts) {
        bookingStatusCounts[b.status as keyof typeof bookingStatusCounts]++;
      }
    });

    const confirmedOrCompletedCount =
      bookingStatusCounts.CONFIRMED + bookingStatusCounts.COMPLETED;
    const averageOrderValue =
      confirmedOrCompletedCount > 0
        ? Math.round(confirmedRevenue / confirmedOrCompletedCount)
        : bookings.length > 0
        ? Math.round(totalGrossRevenue / bookings.length)
        : 0;

    // Enquiry status breakdown & conversion
    const enquiryStatusCounts = {
      PENDING: 0,
      CONTACTED: 0,
      CONFIRMED: 0,
      CANCELLED: 0,
    };

    const serviceCounts: Record<string, number> = {};

    enquiries.forEach((e) => {
      if (e.status in enquiryStatusCounts) {
        enquiryStatusCounts[e.status as keyof typeof enquiryStatusCounts]++;
      }
      const sName = e.service?.trim() || "General";
      serviceCounts[sName] = (serviceCounts[sName] || 0) + 1;
    });

    const totalEnquiries = enquiries.length;
    const bookingConversionRate =
      totalEnquiries > 0
        ? Number(((bookings.length / totalEnquiries) * 100).toFixed(1))
        : 0;

    // Monthly trends (Last 6 Months)
    const now = new Date();
    const monthlyTrends: {
      monthKey: string;
      label: string;
      revenue: number;
      bookings: number;
      enquiries: number;
    }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = d.getMonth();
      const label = d.toLocaleString("en-US", { month: "short" });
      const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

      monthlyTrends.push({
        monthKey,
        label,
        revenue: 0,
        bookings: 0,
        enquiries: 0,
      });
    }

    bookings.forEach((b) => {
      const bDate = new Date(b.createdAt);
      const key = `${bDate.getFullYear()}-${String(bDate.getMonth() + 1).padStart(2, "0")}`;
      const found = monthlyTrends.find((m) => m.monthKey === key);
      if (found) {
        found.bookings++;
        if (b.status === "CONFIRMED" || b.status === "COMPLETED") {
          found.revenue += Number(b.totalAmount) || 0;
        }
      }
    });

    enquiries.forEach((e) => {
      const eDate = new Date(e.createdAt);
      const key = `${eDate.getFullYear()}-${String(eDate.getMonth() + 1).padStart(2, "0")}`;
      const found = monthlyTrends.find((m) => m.monthKey === key);
      if (found) {
        found.enquiries++;
      }
    });

    // Top Packages by revenue and bookings
    const packageStatsMap = new Map<
      string,
      {
        id: string;
        title: string;
        slug: string;
        destination: string;
        bookingsCount: number;
        revenue: number;
      }
    >();

    bookings.forEach((b) => {
      if (b.package) {
        const pkgId = b.package.id;
        const current = packageStatsMap.get(pkgId) || {
          id: pkgId,
          title: b.package.title,
          slug: b.package.slug,
          destination: b.package.destination?.name || "Global",
          bookingsCount: 0,
          revenue: 0,
        };
        current.bookingsCount++;
        if (b.status === "CONFIRMED" || b.status === "COMPLETED") {
          current.revenue += Number(b.totalAmount) || 0;
        }
        packageStatsMap.set(pkgId, current);
      }
    });

    const topPackages = Array.from(packageStatsMap.values())
      .sort((a, b) => b.revenue - a.revenue || b.bookingsCount - a.bookingsCount)
      .slice(0, 5);

    // Top services sorted by popularity
    const servicesBreakdown = Object.entries(serviceCounts)
      .map(([name, count]) => ({
        service: name,
        count,
        percentage:
          totalEnquiries > 0
            ? Number(((count / totalEnquiries) * 100).toFixed(1))
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      analytics: {
        kpis: {
          totalGrossRevenue,
          confirmedRevenue,
          pendingRevenue,
          cancelledRevenue,
          averageOrderValue,
          totalBookings: bookings.length,
          confirmedBookings: confirmedOrCompletedCount,
          pendingBookings: bookingStatusCounts.PENDING,
          totalPassengers,
          totalEnquiries,
          pendingEnquiries: enquiryStatusCounts.PENDING,
          bookingConversionRate,
          totalPackages,
          activePackages,
          featuredPackages,
          totalDestinations,
          subscribersCount,
          unreadContacts,
        },
        bookingStatusCounts,
        enquiryStatusCounts,
        monthlyTrends,
        topPackages,
        servicesBreakdown,
        recentBookings: bookings.slice(0, 6).map((b) => ({
          id: b.id,
          bookingNumber: b.bookingNumber,
          customerName: b.customerName,
          email: b.email,
          packageTitle: b.package?.title || "Custom Package",
          totalAmount: Number(b.totalAmount),
          status: b.status,
          passengersCount: b.passengers.length,
          createdAt: b.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error.",
      },
      { status: 500 }
    );
  }
}
