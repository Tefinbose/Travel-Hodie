"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Mail,
  Phone,
  Package,
  Clock,
  MapPin,
  Users,
  Wallet,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  MessageCircle,
  Plane,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Passenger {
  id: string;
  name: string;
  age: number | null;
  gender: string | null;
}

interface Booking {
  id: string;
  bookingNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number | string;
  status: string;
  travelDate: string | null;
  createdAt: string;
  package: {
    title: string;
    slug: string;
    duration: string;
    price: number | string;
    destination: {
      name: string;
    };
  };
  passengers: Passenger[];
}

const statuses = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
];

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchBooking = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/admin/bookings/${params.id}`, {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load booking.");
      }

      setBooking(data.booking);
      setSelectedStatus(data.booking.status);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      void fetchBooking();
    }
  }, [params.id, fetchBooking]);

  async function updateStatus() {
    if (!booking) return;

    try {
      setUpdating(true);
      setMessage("");
      setError("");

      const response = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update booking status.");
      }

      setBooking((previous) =>
        previous ? { ...previous, status: selectedStatus } : null
      );
      setMessage("Booking status updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update booking status."
      );
    } finally {
      setUpdating(false);
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "Not provided";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function formatCurrency(amount: number | string) {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  }

  function getStatusStyle(status: string) {
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

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="flex min-w-0 flex-1 items-center justify-center p-6 lg:p-10">
          <div className="text-center">
            <RefreshCw className="mx-auto animate-spin text-red-600" size={30} />
            <p className="mt-3 text-sm text-slate-500">Loading booking details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Unable to load booking</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button
              onClick={() => void fetchBooking()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <div className="mt-4">
              <Link
                href="/admin/bookings"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600"
              >
                <ArrowLeft size={16} />
                Back to Bookings
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/admin/bookings"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
              >
                <ArrowLeft size={17} />
                Back to Bookings
              </Link>
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-2.5 text-red-600">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Booking Details
                  </h1>
                  <p className="text-xs text-slate-500">
                    Reference: <span className="font-mono font-medium">{booking.bookingNumber}</span>
                  </p>
                </div>
              </div>
            </div>

            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${getStatusStyle(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>

          {/* Notifications */}
          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            {/* Main Details */}
            <div className="space-y-6">
              {/* Customer Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="rounded-lg bg-red-50 p-2 text-red-600">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Customer Information</h2>
                    <p className="text-xs text-slate-500">Primary guest contact details</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Customer Name</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {booking.customerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Email Address</p>
                    <a
                      href={`mailto:${booking.email}`}
                      className="mt-1 inline-flex items-center gap-1.5 font-semibold text-red-600 hover:underline"
                    >
                      <Mail size={14} />
                      {booking.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Phone Number</p>
                    <a
                      href={`tel:${booking.phone}`}
                      className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800 hover:text-red-600"
                    >
                      <Phone size={14} />
                      {booking.phone}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Booking Date</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>
              </section>

              {/* Package Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="rounded-lg bg-red-50 p-2 text-red-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Holiday Package Details</h2>
                    <p className="text-xs text-slate-500">Reserved package and schedule</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Package Name</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {booking.package?.title || "Package unavailable"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Destination</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800">
                      <MapPin size={14} className="text-slate-400" />
                      {booking.package?.destination?.name || "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Duration</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800">
                      <Clock size={14} className="text-slate-400" />
                      {booking.package?.duration || "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Travel Date</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800">
                      <CalendarDays size={14} className="text-slate-400" />
                      {formatDate(booking.travelDate)}
                    </p>
                  </div>
                </div>

                {booking.package?.slug && (
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={`/holidays/${booking.package.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
                    >
                      <ExternalLink size={13} />
                      View Public Package Page
                    </Link>
                  </div>
                )}
              </section>

              {/* Passenger Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-red-50 p-2 text-red-600">
                      <Users size={20} />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">Passenger Information</h2>
                      <p className="text-xs text-slate-500">Names and details of all travelers</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {booking.passengers?.length || 0} Travelers
                  </span>
                </div>

                {booking.passengers?.length ? (
                  <div className="space-y-3">
                    {booking.passengers.map((passenger, index) => (
                      <div
                        key={passenger.id || index}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <h3 className="font-semibold text-slate-800">
                          Passenger {index + 1}
                        </h3>

                        <div className="mt-2 grid gap-3 sm:grid-cols-3 text-sm">
                          <div>
                            <p className="text-xs text-slate-400">Name</p>
                            <p className="font-medium text-slate-800">{passenger.name}</p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">Age</p>
                            <p className="font-medium text-slate-800">
                              {passenger.age ?? "Not provided"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">Gender</p>
                            <p className="font-medium text-slate-800">
                              {passenger.gender || "Not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No passenger details recorded.</p>
                )}
              </section>
            </div>

            {/* Sidebar Cards */}
            <aside className="space-y-6">
              {/* Payment Summary */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="rounded-lg bg-green-50 p-2 text-green-600">
                    <Wallet size={18} />
                  </div>
                  <h2 className="font-bold text-slate-900">Payment Summary</h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-3 text-slate-600">
                    <span>Passengers</span>
                    <span className="font-semibold text-slate-800">
                      {booking.passengers?.length || 0}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-slate-600">
                    <span>Price per person</span>
                    <span className="font-semibold text-slate-800">
                      {booking.package?.price != null
                        ? formatCurrency(booking.package.price)
                        : "Not available"}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-bold text-slate-900">Total Amount</span>
                      <span className="text-xl font-bold text-red-600">
                        {formatCurrency(booking.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Update Status */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <CheckCircle size={18} />
                  </div>
                  <h2 className="font-bold text-slate-900">Update Status</h2>
                </div>

                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Select Booking Status
                </label>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-red-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={updateStatus}
                  disabled={updating || selectedStatus === booking.status}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </button>
              </section>

              {/* Quick Actions */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-bold text-slate-900">Quick Contact</h2>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${booking.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hello ${booking.customerName}, regarding your TravelHodie booking ${booking.bookingNumber}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-50/50 px-4 py-2.5 text-center text-sm font-semibold text-green-700 transition hover:bg-green-100"
                  >
                    <MessageCircle size={16} />
                    Contact via WhatsApp
                  </a>

                  <a
                    href={`mailto:${booking.email}?subject=${encodeURIComponent(
                      `TravelHodie Booking ${booking.bookingNumber}`
                    )}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
