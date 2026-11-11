"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Users,
  CalendarCheck,
  MessageSquare,
  Package,
  Globe,
  RefreshCw,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  ShieldCheck,
  Eye,
  Filter,
  DollarSign,
  PieChart,
  Layers,
  ArrowRight,
} from "lucide-react";

interface AnalyticsData {
  kpis: {
    totalGrossRevenue: number;
    confirmedRevenue: number;
    pendingRevenue: number;
    cancelledRevenue: number;
    averageOrderValue: number;
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    totalPassengers: number;
    totalEnquiries: number;
    pendingEnquiries: number;
    bookingConversionRate: number;
    totalPackages: number;
    activePackages: number;
    featuredPackages: number;
    totalDestinations: number;
    subscribersCount: number;
    unreadContacts: number;
  };
  bookingStatusCounts: {
    PENDING: number;
    CONFIRMED: number;
    CANCELLED: number;
    COMPLETED: number;
  };
  enquiryStatusCounts: {
    PENDING: number;
    CONTACTED: number;
    CONFIRMED: number;
    CANCELLED: number;
  };
  monthlyTrends: {
    monthKey: string;
    label: string;
    revenue: number;
    bookings: number;
    enquiries: number;
  }[];
  topPackages: {
    id: string;
    title: string;
    slug: string;
    destination: string;
    bookingsCount: number;
    revenue: number;
  }[];
  servicesBreakdown: {
    service: string;
    count: number;
    percentage: number;
  }[];
  recentBookings: {
    id: string;
    bookingNumber: string;
    customerName: string;
    email: string;
    packageTitle: string;
    totalAmount: number;
    status: string;
    passengersCount: number;
    createdAt: string;
  }[];
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function statusBadge(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "COMPLETED":
    case "CONTACTED":
      return "bg-sky-50 text-sky-700 border-sky-200";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metricTab, setMetricTab] = useState<"revenue" | "bookings">("revenue");

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/admin/analytics", {
        cache: "no-store",
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to load analytics.");
      }

      setData(json.analytics);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to retrieve analytics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAnalytics();
  }, [fetchAnalytics]);

  const kpis = data?.kpis;
  const monthly = data?.monthlyTrends || [];
  const maxMonthlyRevenue = Math.max(
    ...monthly.map((m) => m.revenue),
    10000
  );
  const maxMonthlyBookings = Math.max(
    ...monthly.map((m) => m.bookings),
    5
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  Business Intelligence
                </span>
                <span className="text-xs text-slate-400">TravelHodie Performance</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Analytics & Insights
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Revenue streams, conversion metrics, customer demand, and itinerary popularity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => void fetchAnalytics()}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh Analytics
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Top 4 Primary KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* KPI 1: Confirmed Revenue */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Confirmed Revenue
                </p>
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                  <Wallet size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {formatINR(kpis?.confirmedRevenue || 0)}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Pipeline: {formatINR(kpis?.pendingRevenue || 0)} pending
                </span>
                <span className="font-semibold text-emerald-700">
                  {kpis?.confirmedBookings || 0} confirmed
                </span>
              </div>
            </div>

            {/* KPI 2: Average Order Value */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Average Order Value
                </p>
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <TrendingUp size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {formatINR(kpis?.averageOrderValue || 0)}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Mean spend per customer booking
              </p>
            </div>

            {/* KPI 3: Booking Conversion Velocity */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Booking Conversion
                </p>
                <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                  <PieChart size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {kpis?.bookingConversionRate || 0}%
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {kpis?.totalBookings || 0} bookings / {kpis?.totalEnquiries || 0} inquiries
                </span>
                <span className="font-semibold text-purple-700">Conversion</span>
              </div>
            </div>

            {/* KPI 4: Total Passengers Accommodated */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Travelers
                </p>
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                  <Users size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {kpis?.totalPassengers || 0}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Individual passengers registered across bookings
              </p>
            </div>
          </div>

          {/* Monthly Trajectory Bar Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-indigo-600" />
                  <h2 className="font-bold text-slate-900">
                    6-Month Trajectory & Growth
                  </h2>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  Monthly performance comparison showing customer activity over the last 6 months.
                </p>
              </div>

              {/* Metric Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMetricTab("revenue")}
                  className={`rounded-md px-3 py-1.5 transition ${
                    metricTab === "revenue"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Revenue Trend
                </button>
                <button
                  type="button"
                  onClick={() => setMetricTab("bookings")}
                  className={`rounded-md px-3 py-1.5 transition ${
                    metricTab === "bookings"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Bookings Volume
                </button>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="mt-6">
              <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-56 pt-6">
                {monthly.map((m) => {
                  const val = metricTab === "revenue" ? m.revenue : m.bookings;
                  const max =
                    metricTab === "revenue"
                      ? maxMonthlyRevenue
                      : maxMonthlyBookings;
                  const pct = Math.max(Math.round((val / max) * 100), 6);

                  return (
                    <div
                      key={m.monthKey}
                      className="group flex flex-col items-center h-full justify-end"
                    >
                      {/* Tooltip / Value */}
                      <span className="mb-2 text-[10px] sm:text-xs font-bold text-slate-700 group-hover:text-red-600 transition truncate max-w-full">
                        {metricTab === "revenue" ? `₹${(val / 1000).toFixed(0)}k` : val}
                      </span>

                      {/* Bar */}
                      <div className="w-full max-w-[48px] rounded-t-lg bg-slate-100 overflow-hidden relative h-full flex items-end">
                        <div
                          style={{ height: `${pct}%` }}
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            metricTab === "revenue"
                              ? "bg-gradient-to-t from-red-600 to-red-400 group-hover:from-red-700 group-hover:to-red-500"
                              : "bg-gradient-to-t from-blue-600 to-sky-400 group-hover:from-blue-700 group-hover:to-sky-500"
                          }`}
                        />
                      </div>

                      {/* Month Label */}
                      <span className="mt-3 text-xs font-medium text-slate-500 group-hover:text-slate-900">
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                <span>Values calculated from real-time database bookings</span>
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  {metricTab === "revenue" ? "Figures in INR (₹)" : "Count of bookings"}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Grids: Booking Status & Enquiry Service Demand */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 1. Booking Status Funnel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Booking Status Distribution
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ratio of confirmed vs pending vs cancelled reservations
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {kpis?.totalBookings || 0} Total
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Confirmed",
                    count: data?.bookingStatusCounts.CONFIRMED || 0,
                    color: "bg-emerald-500",
                    textColor: "text-emerald-700",
                    bgMuted: "bg-emerald-50",
                  },
                  {
                    label: "Completed",
                    count: data?.bookingStatusCounts.COMPLETED || 0,
                    color: "bg-sky-500",
                    textColor: "text-sky-700",
                    bgMuted: "bg-sky-50",
                  },
                  {
                    label: "Pending Review",
                    count: data?.bookingStatusCounts.PENDING || 0,
                    color: "bg-amber-500",
                    textColor: "text-amber-700",
                    bgMuted: "bg-amber-50",
                  },
                  {
                    label: "Cancelled",
                    count: data?.bookingStatusCounts.CANCELLED || 0,
                    color: "bg-rose-500",
                    textColor: "text-rose-700",
                    bgMuted: "bg-rose-50",
                  },
                ].map((item) => {
                  const total = kpis?.totalBookings || 1;
                  const pct = Math.round((item.count / total) * 100);

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-700">
                          {item.label}
                        </span>
                        <span className="text-slate-500 font-medium">
                          {item.count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                <Link
                  href="/admin/bookings"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  Manage Bookings
                  <ArrowRight size={12} />
                </Link>
                <span className="text-[11px] text-slate-400">
                  {kpis?.confirmedBookings || 0} active traveler bookings
                </span>
              </div>
            </div>

            {/* 2. Customer Inquiries by Service */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Service Demand Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Most requested travel assistance categories
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {kpis?.totalEnquiries || 0} Leads
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {(data?.servicesBreakdown || []).length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">
                    No enquiry service data available.
                  </p>
                ) : (
                  data?.servicesBreakdown.slice(0, 5).map((s) => (
                    <div key={s.service}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-700">
                          {s.service}
                        </span>
                        <span className="text-slate-500 font-medium">
                          {s.count} enquiries ({s.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${s.percentage}%` }}
                          className="h-full rounded-full bg-purple-600 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                <Link
                  href="/admin/enquiries"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  Manage Enquiries
                  <ArrowRight size={12} />
                </Link>
                <span className="text-[11px] text-slate-400">
                  {kpis?.pendingEnquiries || 0} awaiting concierge reply
                </span>
              </div>
            </div>
          </div>

          {/* Top Packages Leaderboard */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="font-bold text-slate-900">
                  Top Performing Holiday Packages
                </h3>
                <p className="text-xs text-slate-500">
                  Ranked by confirmed booking volume and generated revenue
                </p>
              </div>
              <Link
                href="/admin/packages"
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
              >
                View all packages
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50/75 uppercase tracking-wider text-slate-500 font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Rank</th>
                    <th className="px-5 py-3.5">Holiday Package</th>
                    <th className="px-5 py-3.5">Destination</th>
                    <th className="px-5 py-3.5">Bookings Count</th>
                    <th className="px-5 py-3.5">Revenue Generated</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {(data?.topPackages || []).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                        No package booking performance data recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data?.topPackages.map((pkg, idx) => (
                      <tr key={pkg.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-3.5 font-bold text-slate-400">
                          <span
                            className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                              idx === 0
                                ? "bg-amber-100 text-amber-800"
                                : idx === 1
                                ? "bg-slate-200 text-slate-700"
                                : idx === 2
                                ? "bg-orange-100 text-orange-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{idx + 1}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 font-semibold text-slate-900">
                          {pkg.title}
                        </td>

                        <td className="px-5 py-3.5 text-slate-600">
                          <span className="inline-flex items-center gap-1 font-medium">
                            <Globe size={13} className="text-slate-400" />
                            {pkg.destination}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 font-semibold text-slate-800">
                          {pkg.bookingsCount} booking{pkg.bookingsCount === 1 ? "" : "s"}
                        </td>

                        <td className="px-5 py-3.5 font-bold text-emerald-700">
                          {formatINR(pkg.revenue)}
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <Link
                            href={`/admin/packages/${pkg.id}/edit`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                          >
                            <Eye size={12} />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Secondary Platform Health Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Newsletter Audience
                </span>
                <Mail size={18} className="text-slate-400" />
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {kpis?.subscribersCount || 0}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Subscribers opted in for offers
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Unread Inquiries
                </span>
                <MessageSquare size={18} className="text-slate-400" />
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {kpis?.unreadContacts || 0}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Direct contact form submissions
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Catalog Size
                </span>
                <Package size={18} className="text-slate-400" />
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {kpis?.activePackages || 0} / {kpis?.totalPackages || 0}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Active packages on site
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Curated Destinations
                </span>
                <Globe size={18} className="text-slate-400" />
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {kpis?.totalDestinations || 0}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Worldwide regions & hubs
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

