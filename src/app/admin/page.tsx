"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Package,
  MapPin,
  Clock,
  Trash2,
  CheckCircle,
  CalendarCheck,
  MessageSquare,
  ArrowRight,
  Eye,
  Globe,
  Tag,
  AlertCircle,
  CheckCircle2,
  Users,
} from "lucide-react";

interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  duration: string;
  price: number | string;
  isFeatured: boolean;
  isActive: boolean;
  destination?: {
    id: string;
    name: string;
    country: string;
  } | null;
}

interface Booking {
  id: string;
  bookingNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number | string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  package?: {
    title: string;
  } | null;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  status: "PENDING" | "CONTACTED" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
}

function statusBadge(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "CONTACTED":
    case "COMPLETED":
      return "bg-sky-50 text-sky-700 border-sky-200";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [destinationCount, setDestinationCount] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [pkgRes, bkRes, enqRes, destRes] = await Promise.all([
        fetch("/api/admin/packages", { cache: "no-store" }),
        fetch("/api/admin/bookings", { cache: "no-store" }),
        fetch("/api/admin/enquiries", { cache: "no-store" }),
        fetch("/api/destinations?limit=100", { cache: "no-store" }),
      ]);

      const [pkgData, bkData, enqData, destData] = await Promise.all([
        pkgRes.json(),
        bkRes.json(),
        enqRes.json(),
        destRes.json(),
      ]);

      if (pkgData.success) {
        setPackages(pkgData.packages || []);
      }
      if (bkData.success) {
        setRecentBookings(bkData.bookings || []);
      }
      if (enqData.success) {
        setRecentEnquiries(enqData.enquiries || []);
      }
      if (destData.success) {
        setDestinationCount((destData.destinations || []).length);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${title}"?`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      const response = await fetch("/api/admin/packages/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete package.");
      }
      await loadDashboardData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete package."
      );
    } finally {
      setDeletingId(null);
    }
  }

  function formatPrice(price: number | string) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price));
  }

  const activeCount = packages.filter((item) => item.isActive).length;
  const pendingBookingsCount = recentBookings.filter(
    (item) => item.status === "PENDING"
  ).length;
  const pendingEnquiriesCount = recentEnquiries.filter(
    (item) => item.status === "PENDING"
  ).length;

  const filteredPackages = packages.filter((pkg) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(q) ||
      (pkg.destination?.name || "").toLowerCase().includes(q) ||
      (pkg.destination?.country || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                  Operations Center
                </span>
                <span className="text-xs text-slate-400">TravelHodie</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Live performance summary, customer travel bookings, and holiday catalog.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => void loadDashboardData()}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>

              <Link
                href="/admin/destinations/new"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Plus size={14} />
                New Destination
              </Link>

              <Link
                href="/admin/packages/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                <Plus size={14} />
                New Package
              </Link>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0" />
              <p className="flex-1">{error}</p>
            </div>
          )}

          {/* Top 4 Metrics Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Bookings */}
            <Link
              href="/admin/bookings"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Bookings
                </span>
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition group-hover:scale-105">
                  <CalendarCheck size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {recentBookings.length}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-amber-600 font-medium">
                  {pendingBookingsCount} pending review
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-600 group-hover:text-red-600">
                  Manage <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Enquiries */}
            <Link
              href="/admin/enquiries"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Customer Enquiries
                </span>
                <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 transition group-hover:scale-105">
                  <MessageSquare size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {recentEnquiries.length}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-amber-600 font-medium">
                  {pendingEnquiriesCount} awaiting reply
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-600 group-hover:text-red-600">
                  Manage <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Holiday Packages */}
            <Link
              href="/admin/packages"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Holiday Packages
                </span>
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 transition group-hover:scale-105">
                  <Package size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {packages.length}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-medium">
                  {activeCount} active packages
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-600 group-hover:text-red-600">
                  Manage <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Destinations */}
            <Link
              href="/admin/destinations"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Destinations
                </span>
                <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600 transition group-hover:scale-105">
                  <Globe size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {destinationCount}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Curated regions</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-600 group-hover:text-red-600">
                  Manage <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </div>

          {/* Recent Activity: Bookings & Enquiries side-by-side */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Bookings */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="font-bold text-slate-900">Recent Bookings</h2>
                  <p className="text-xs text-slate-500">Latest travel reservations</p>
                </div>
                <Link
                  href="/admin/bookings"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  View all ({recentBookings.length})
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="flex-1 divide-y divide-slate-100">
                {recentBookings.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400">
                    No bookings recorded yet.
                  </div>
                ) : (
                  recentBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 transition hover:bg-slate-50"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-800">
                            {booking.bookingNumber}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusBadge(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs font-medium text-slate-900">
                          {booking.customerName}
                        </p>
                        <p className="truncate text-[11px] text-slate-400">
                          {booking.package?.title || "Custom Package"} · {formatPrice(booking.totalAmount)}
                        </p>
                      </div>

                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-red-600"
                      >
                        <Eye size={12} />
                        View
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Enquiries */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="font-bold text-slate-900">Recent Enquiries</h2>
                  <p className="text-xs text-slate-500">Latest customer questions & leads</p>
                </div>
                <Link
                  href="/admin/enquiries"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  View all ({recentEnquiries.length})
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="flex-1 divide-y divide-slate-100">
                {recentEnquiries.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400">
                    No enquiries recorded yet.
                  </div>
                ) : (
                  recentEnquiries.slice(0, 5).map((enquiry) => (
                    <div
                      key={enquiry.id}
                      className="flex items-center justify-between p-4 transition hover:bg-slate-50"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-xs font-bold text-slate-900">
                            {enquiry.name}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusBadge(
                              enquiry.status
                            )}`}
                          >
                            {enquiry.status}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {enquiry.service || "General Inquiry"} · {enquiry.email}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <Link
                        href={`/admin/enquiries/${enquiry.id}`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-red-600"
                      >
                        <Eye size={12} />
                        View
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Packages Quick Table Section */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Holiday Packages Catalog</h2>
                <p className="text-xs text-slate-500">
                  {packages.length} travel packages available
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative w-full sm:w-64">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search package or destination..."
                    className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-red-500"
                  />
                </div>

                <Link
                  href="/admin/packages"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Manage All
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-slate-500">
                <RefreshCw size={20} className="mx-auto mb-2 animate-spin text-red-600" />
                Loading packages...
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="p-10 text-center">
                <Package size={32} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">No packages found</p>
                <p className="mt-1 text-xs text-slate-400">
                  Try adjusting your search query or add a new package.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-xs">
                  <thead className="border-b border-slate-100 bg-slate-50/75 uppercase tracking-wider text-slate-500 font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Package</th>
                      <th className="px-5 py-3.5">Destination</th>
                      <th className="px-5 py-3.5">Duration</th>
                      <th className="px-5 py-3.5">Price</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredPackages.map((item) => (
                      <tr key={item.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-3.5 font-medium text-slate-900">
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-[11px] text-slate-400">/{item.slug}</p>
                        </td>

                        <td className="px-5 py-3.5 text-slate-700">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-slate-400" />
                            <span>{item.destination?.name || "Unknown"}</span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5 text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Clock size={13} className="text-slate-400" />
                            <span>{item.duration}</span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5 font-bold text-slate-900">
                          {formatPrice(item.price)}
                        </td>

                        <td className="px-5 py-3.5">
                          {item.isActive ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 size={11} />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/packages/${item.id}/edit`}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                              <Pencil size={12} />
                              Edit
                            </Link>

                            <button
                              type="button"
                              disabled={deletingId === item.id}
                              onClick={() => void handleDelete(item.id, item.title)}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              <Trash2 size={12} />
                              {deletingId === item.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
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

