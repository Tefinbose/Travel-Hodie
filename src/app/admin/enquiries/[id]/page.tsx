"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  User,
  Mail,
  Phone,
  CalendarDays,
  Tag,
  Package,
  ExternalLink,
  CheckCircle,
  MessageCircle,
  RefreshCw,
  Plane,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
  package?: {
    title: string;
    slug: string;
  } | null;
}

const statuses = [
  "PENDING",
  "CONTACTED",
  "CONFIRMED",
  "CANCELLED",
];

export default function EnquiryDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEnquiry = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/enquiries/${params.id}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load enquiry.");
      }

      setEnquiry(data.enquiry);
      setSelectedStatus(data.enquiry.status);
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
      void fetchEnquiry();
    }
  }, [params.id, fetchEnquiry]);

  async function updateStatus() {
    if (!enquiry) return;

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/enquiries/${enquiry.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: selectedStatus }),
        }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update enquiry.");
      }

      setEnquiry((previous) =>
        previous ? { ...previous, status: selectedStatus } : null
      );
      setSuccess("Enquiry status updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update status."
      );
    } finally {
      setUpdating(false);
    }
  }

  function formatDate(date: string) {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "CONTACTED":
        return "bg-blue-100 text-blue-700";
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
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
            <p className="mt-3 text-sm text-slate-500">Loading enquiry details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !enquiry) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Unable to load enquiry</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button
              onClick={() => void fetchEnquiry()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <div className="mt-4">
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600"
              >
                <ArrowLeft size={16} />
                Back to Enquiries
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!enquiry) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
              >
                <ArrowLeft size={17} />
                Back to Enquiries
              </Link>
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-2.5 text-red-600">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Enquiry Details
                  </h1>
                  <p className="text-xs text-slate-500">
                    ID: <span className="font-mono font-medium">{enquiry.id}</span>
                  </p>
                </div>
              </div>
            </div>

            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${getStatusStyle(
                enquiry.status
              )}`}
            >
              {enquiry.status}
            </span>
          </div>

          {/* Notifications */}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Customer Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="rounded-lg bg-red-50 p-2 text-red-600">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Customer Information</h2>
                    <p className="text-xs text-slate-500">Sender contact details</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Customer Name</p>
                    <p className="mt-1 font-semibold text-slate-800">{enquiry.name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Email Address</p>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="mt-1 inline-flex items-center gap-1.5 font-semibold text-red-600 hover:underline"
                    >
                      <Mail size={14} />
                      {enquiry.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Phone Number</p>
                    {enquiry.phone ? (
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800 hover:text-red-600"
                      >
                        <Phone size={14} />
                        {enquiry.phone}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-slate-400">Not provided</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Submitted On</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800">
                      <CalendarDays size={14} className="text-slate-400" />
                      {formatDate(enquiry.createdAt)}
                    </p>
                  </div>
                </div>
              </section>

              {/* Enquiry Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="rounded-lg bg-red-50 p-2 text-red-600">
                    <Tag size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Enquiry Subject & Message</h2>
                    <p className="text-xs text-slate-500">Requested service and user inquiry</p>
                  </div>
                </div>

                <div className="space-y-5 text-sm">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Service Required</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {enquiry.service || "General Enquiry"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Related Holiday Package</p>
                    {enquiry.package ? (
                      <Link
                        href={`/holidays/${enquiry.package.slug}`}
                        target="_blank"
                        className="mt-1 inline-flex items-center gap-1.5 font-semibold text-red-600 hover:underline"
                      >
                        <Package size={15} />
                        {enquiry.package.title}
                        <ExternalLink size={13} />
                      </Link>
                    ) : (
                      <p className="mt-1 text-slate-400">No specific package attached</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">Customer Message</p>
                    <div className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-5 leading-7 text-slate-800">
                      {enquiry.message}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Status Update */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <CheckCircle size={18} />
                  </div>
                  <h2 className="font-bold text-slate-900">Update Status</h2>
                </div>

                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Select Status
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
                  disabled={updating || selectedStatus === enquiry.status}
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

              {/* Contact Customer */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-bold text-slate-900">Contact Customer</h2>

                <div className="space-y-3">
                  {enquiry.phone && (
                    <>
                      <a
                        href={`https://wa.me/${enquiry.phone.replace(
                          /\D/g,
                          ""
                        )}?text=${encodeURIComponent(
                          `Hello ${enquiry.name}, thank you for contacting TravelHodie. We are following up on your enquiry.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-50/50 px-4 py-2.5 text-center text-sm font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <MessageCircle size={16} />
                        Contact via WhatsApp
                      </a>

                      <a
                        href={`tel:${enquiry.phone}`}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Phone size={16} />
                        Call Customer
                      </a>
                    </>
                  )}

                  <a
                    href={`mailto:${enquiry.email}?subject=${encodeURIComponent(
                      "TravelHodie Enquiry Follow-up"
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
