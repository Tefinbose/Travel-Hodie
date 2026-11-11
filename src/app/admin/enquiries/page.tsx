"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Eye,
  MessageSquare,
  Mail,
  Phone,
  Filter,
  User,
  Tag,
  Package,
  CalendarDays,
  Clock,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: "PENDING" | "CONTACTED" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
  package: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

const statuses = ["ALL", "PENDING", "CONTACTED", "CONFIRMED", "CANCELLED"];

function statusStyle(status: string) {
  switch (status) {
    case "CONTACTED":
      return "bg-sky-50 text-sky-700 border border-sky-200";
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 border border-rose-200";
    default:
      return "bg-amber-50 text-amber-700 border border-amber-200";
  }
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (status !== "ALL") params.set("status", status);

      const response = await fetch(
        `/api/admin/enquiries?${params.toString()}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load enquiries.");
      }
      setEnquiries(data.enquiries || []);
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
      void loadEnquiries();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadEnquiries]);

  const pendingCount = enquiries.filter((item) => item.status === "PENDING").length;
  const contactedCount = enquiries.filter((item) => item.status === "CONTACTED").length;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                  Customer Inquiries
                </span>
                <span className="text-xs text-slate-400">TravelHodie</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Enquiry Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track customer inquiries, custom travel requests, and service questions.
              </p>
            </div>

            <button
              onClick={() => void loadEnquiries()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh Data
            </button>
          </div>

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Enquiries
                </p>
                <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                  <MessageSquare size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{enquiries.length}</p>
              <p className="mt-1 text-xs text-slate-400">Received inquiries</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pending Follow-up
                </p>
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                  <Clock size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{pendingCount}</p>
              <p className="mt-1 text-xs text-amber-600 font-medium">Awaiting contact</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  In Progress / Contacted
                </p>
                <div className="rounded-xl bg-sky-50 p-2.5 text-sky-600">
                  <Phone size={18} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{contactedCount}</p>
              <p className="mt-1 text-xs text-slate-400">Customers reached</p>
            </div>
          </div>

          {/* Search and filter */}
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
                  placeholder="Search by customer name, email, phone, or service..."
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

          {/* Enquiries table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-bold text-slate-900">Customer Inquiries</h2>
                <p className="text-xs text-slate-500">{enquiries.length} total messages received</p>
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
                Loading enquiries...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare size={32} className="mx-auto mb-2 text-slate-300" />
                <h3 className="font-semibold text-slate-800 text-sm">No enquiries found</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Customer enquiries will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-xs">
                  <thead className="border-b border-slate-100 bg-slate-50/75 uppercase tracking-wider text-slate-500 font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Service</th>
                      <th className="px-5 py-3.5">Message Excerpt</th>
                      <th className="px-5 py-3.5">Package</th>
                      <th className="px-5 py-3.5">Received Date</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-slate-900">{enquiry.name}</p>
                          <p className="text-[11px] text-slate-500">{enquiry.email}</p>
                          <p className="text-[11px] text-slate-400">
                            {enquiry.phone || "No phone provided"}
                          </p>
                        </td>

                        <td className="px-5 py-3.5 font-medium text-slate-800">
                          {enquiry.service}
                        </td>

                        <td className="max-w-[260px] px-5 py-3.5">
                          <p className="line-clamp-2 text-slate-600">
                            {enquiry.message}
                          </p>
                        </td>

                        <td className="px-5 py-3.5 text-slate-700">
                          {enquiry.package?.title || (
                            <span className="text-slate-400">General enquiry</span>
                          )}
                        </td>

                        <td className="px-5 py-3.5 text-slate-500">
                          {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        <td className="px-5 py-3.5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyle(
                              enquiry.status
                            )}`}
                          >
                            {enquiry.status}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <Link
                            href={`/admin/enquiries/${enquiry.id}`}
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

