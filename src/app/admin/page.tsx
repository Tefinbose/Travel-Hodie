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
  Star,
  Tag,
  Settings2,
  Plane,
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

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPackages = useCallback(async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");
      const query = searchValue
        ? `?search=${encodeURIComponent(searchValue)}`
        : "";
      const response = await fetch(`/api/admin/packages${query}`, {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load packages.");
      }
      setPackages(data.packages || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPackages();
  }, [loadPackages]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadPackages(search);
  }

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
      await loadPackages(search);
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
  const featuredCount = packages.filter((item) => item.isFeatured).length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center text-sm font-medium text-red-600">
                <Plane size={15} className="mr-1.5" />
                TravelHodie Administration
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Overview of holiday packages, destinations, and system metrics.
              </p>
            </div>

            <Link
              href="/admin/packages/new"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <Plus size={18} />
              Add New Package
            </Link>
          </div>

          {/* Statistics */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                  <Package size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Packages</p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {packages.length}
                  </h2>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-3 text-green-600">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Active Packages</p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {activeCount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
                  <Star size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Featured Packages</p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {featuredCount}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search packages by title or destination..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  void loadPackages("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </form>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Package Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">Holiday Packages</h2>
              <span className="text-sm text-slate-500">
                {packages.length} packages
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-sm text-slate-500">
                <RefreshCw size={24} className="mx-auto mb-3 animate-spin text-red-600" />
                Loading packages...
              </div>
            ) : packages.length === 0 ? (
              <div className="p-12 text-center">
                <Package size={36} className="mx-auto mb-3 text-slate-300" />
                <h3 className="font-semibold text-slate-800">No packages found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add a new package or try another search term.
                </p>
                <Link
                  href="/admin/packages/new"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                >
                  <Plus size={16} />
                  Add Package
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Package size={14} /> Package
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} /> Destination
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} /> Duration
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Tag size={14} /> Price
                        </span>
                      </th>
                      <th className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle size={14} /> Status
                        </span>
                      </th>
                      <th className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <Settings2 size={14} /> Actions
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm">
                    {packages.map((item) => (
                      <tr key={item.id} className="transition hover:bg-slate-50/80">
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-400">/{item.slug}</p>
                            {item.isFeatured && (
                              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                <Star size={11} className="fill-amber-500 text-amber-500" />
                                Featured
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-slate-700">
                            <MapPin size={15} className="text-slate-400" />
                            <div>
                              <p className="font-medium">{item.destination?.name || "Unknown"}</p>
                              <p className="text-xs text-slate-400">
                                {item.destination?.country || ""}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-400" />
                            {item.duration}
                          </span>
                        </td>

                        <td className="px-5 py-4 font-semibold text-slate-900">
                          {formatPrice(item.price)}
                        </td>

                        <td className="px-5 py-4">
                          {item.isActive ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                              <CheckCircle size={12} />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/packages/${item.id}/edit`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                              <Pencil size={13} className="text-slate-500" />
                              Edit
                            </Link>

                            <button
                              type="button"
                              disabled={deletingId === item.id}
                              onClick={() => void handleDelete(item.id, item.title)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              <Trash2 size={13} />
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
