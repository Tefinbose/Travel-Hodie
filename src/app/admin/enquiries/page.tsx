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
  CheckCircle,
  Settings2,
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
      return "bg-blue-100 text-blue-700";
    case "CONFIRMED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-amber-100 text-amber-700";
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
                Enquiry Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage questions and custom holiday requests from customers.
              </p>
            </div>

            <button
              onClick={() => void loadEnquiries()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Statistics */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Total Enquiries</p>
                <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
                  <MessageSquare size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{enquiries.length}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Pending Follow-up</p>
                <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
                  <Mail size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{pendingCount}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Contacted Customers</p>
                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                  <Phone size={20} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{contactedCount}</p>
            </div>
          </div>

          {/* Search and filter */}
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
                  placeholder="Search by customer name, email, phone, or service..."
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

          {/* Enquiries table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Customer Enquiries</h2>
            </div>

            {error && (
              <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="p-12 text-center text-sm text-slate-500">
                <RefreshCw size={24} className="mx-auto mb-3 animate-spin text-red-600" />
                Loading enquiries...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare size={36} className="mx-auto mb-3 text-slate-300" />
                <h3 className="font-semibold text-slate-800">No enquiries found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Customer enquiries will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <User size={14} /> Customer
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Tag size={14} /> Service
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <MessageSquare size={14} /> Message
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Package size={14} /> Package
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} /> Date
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
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="transition hover:bg-slate-50/80">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">{enquiry.name}</p>
                          <p className="text-xs text-slate-500">{enquiry.email}</p>
                          <p className="text-xs text-slate-400">
                            {enquiry.phone || "No phone provided"}
                          </p>
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-700">
                          {enquiry.service}
                        </td>

                        <td className="max-w-[240px] px-5 py-4">
                          <p className="line-clamp-2 text-slate-600">
                            {enquiry.message}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-slate-700">
                          {enquiry.package?.title || (
                            <span className="text-xs text-slate-400">General enquiry</span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {new Date(enquiry.createdAt).toLocaleDateString("en-IN")}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(enquiry.status)}`}
                          >
                            {enquiry.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/admin/enquiries/${enquiry.id}`}
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
