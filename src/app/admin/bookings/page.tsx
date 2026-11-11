"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Eye,
  CalendarDays,
  Users,
  Wallet,
  Filter,
  Package,
  CheckCircle,
  Settings2,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Booking {
  id: string;
  bookingNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number | string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  travelDate: string | null;
  createdAt: string;
  package: {
    id: string;
    title: string;
    slug: string;
  } | null;
  passengers: {
    id: string;
    name: string;
  }[];
}

const statuses = ["ALL", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

function statusStyle(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 border border-rose-200";
    case "COMPLETED":
      return "bg-sky-50 text-sky-700 border border-sky-200";
    default:
      return "bg-amber-50 text-amber-700 border border-amber-200";
  }
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (status !== "ALL") params.set("status", status);

      const response = await fetch(
        `/api/admin/bookings?${params.toString()}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load bookings.");
      }
      setBookings(data.bookings || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadBookings();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadBookings]);

  const pendingCount = bookings.filter((item) => item.status === "PENDING").length;
  const confirmedCount = bookings.filter((item) => item.status === "CONFIRMED").length;
  const totalAmount = bookings.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  Bookings Desk
                </span>
                <span className="text-xs text-slate-400">TravelHodie</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Booking Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track and process customer package bookings, dates, and payments.
              </p>
            </div>

            <button
              onClick={() => void loadBookings()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh Data
            </button>
          </div>

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Bookings
                </p>
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <CalendarDays size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{bookings.length}</p>
              <p className="mt-1 text-xs text-slate-400">Matching current filter</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pending Review
                </p>
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                  <Clock size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{pendingCount}</p>
              <p className="mt-1 text-xs text-amber-600 font-medium">Require customer confirmation</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Booking Value
                </p>
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                  <Wallet size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(totalAmount)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {confirmedCount} confirmed booking(s) in view
              </p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by booking number, customer name, email, or phone..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-4 text-xs text-slate-900 outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400" />
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 outline-none focus:border-red-500"
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item === "ALL" ? "All Statuses" : item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bookings table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-bold text-slate-900">All Reservations</h2>
                <p className="text-xs text-slate-500">{bookings.length} reservations matching criteria</p>
              </div>
            </div>

            {error && (
              <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="p-12 text-center text-xs text-slate-500">
                <RefreshCw size={20} className="mx-auto mb-2 animate-spin text-red-600" />
                Loading bookings...
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center">
                <CalendarDays size={32} className="mx-auto mb-2 text-slate-300" />
                <h3 className="font-semibold text-slate-800 text-sm">No bookings found</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Customer bookings will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-xs">
                  <thead className="border-b border-slate-100 bg-slate-50/75 uppercase tracking-wider text-slate-500 font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Booking Ref</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Package</th>
                      <th className="px-5 py-3.5">Guests</th>
                      <th className="px-5 py-3.5">Total Amount</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-3.5">
                          <p className="font-mono font-bold text-slate-900">
                            {booking.bookingNumber}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </td>

                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-slate-800">
                            {booking.customerName}
                          </p>
                          <p className="text-[11px] text-slate-500">{booking.email}</p>
                          <p className="text-[11px] text-slate-400">{booking.phone}</p>
                        </td>

                        <td className="px-5 py-3.5 text-slate-700 font-medium">
                          {booking.package?.title || "Custom Package"}
                        </td>

                        <td className="px-5 py-3.5 text-slate-700">
                          <span className="inline-flex items-center gap-1">
                            <Users size={12} className="text-slate-400" />
                            {booking.passengers?.length || 1}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 font-bold text-slate-900">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(Number(booking.totalAmount))}
                        </td>

                        <td className="px-5 py-3.5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <Link
                            href={`/admin/bookings/${booking.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-red-600"
                          >
                            <Eye size={12} />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

