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
  Plane,
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
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    case "COMPLETED":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-amber-100 text-amber-700";
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
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="inline-flex items-center text-sm font-medium text-red-600">
                <Plane size={15} className="mr-1.5" />
                TravelHodie Administration
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Booking Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                View and manage customer travel bookings and status.
              </p>
            </div>

            <button
              onClick={() => void loadBookings()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Statistics */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Total Bookings Shown</p>
                <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
                  <CalendarDays size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{bookings.length}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Pending Bookings</p>
                <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
                  <Users size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{pendingCount}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Confirmed Value</p>
                <div className="rounded-lg bg-green-50 p-2.5 text-green-600">
                  <Wallet size={20} />
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
                {confirmedCount} confirmed booking(s) in current results
              </p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search booking number, customer, email, or phone..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={16} className="text-slate-400" />
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-red-500"
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
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Customer Bookings</h2>
            </div>

            {error && (
              <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="p-12 text-center text-sm text-slate-500">
                <RefreshCw size={24} className="mx-auto mb-3 animate-spin text-red-600" />
                Loading bookings...
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center">
                <CalendarDays size={36} className="mx-auto mb-3 text-slate-300" />
                <h3 className="font-semibold text-slate-800">No bookings found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Customer bookings will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} /> Booking
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} /> Customer
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Package size={14} /> Package
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} /> Guests
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Wallet size={14} /> Amount
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle size={14} /> Status
                        </span>
                      </th>
                      <th className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <Settings2 size={14} /> Action
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="transition hover:bg-slate-50/80">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {booking.bookingNumber}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800">
                            {booking.customerName}
                          </p>
                          <p className="text-xs text-slate-500">{booking.email}</p>
                          <p className="text-xs text-slate-400">{booking.phone}</p>
                        </td>

                        <td className="px-5 py-4 text-slate-700">
                          {booking.package?.title || "Package unavailable"}
                        </td>

                        <td className="px-5 py-4 text-slate-700">
                          <span className="inline-flex items-center gap-1">
                            <Users size={13} className="text-slate-400" />
                            {booking.passengers?.length || 0}
                          </span>
                        </td>

                        <td className="px-5 py-4 font-bold text-slate-900">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(Number(booking.totalAmount))}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(booking.status)}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/admin/bookings/${booking.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-red-600"
                          >
                            <Eye size={13} />
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
