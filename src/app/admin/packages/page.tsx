"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  MapPin,
  RefreshCw,
  Star,
  Eye,
  EyeOff,
  Pencil,
  Clock,
  Tag,
  Settings2,
  Plane,
  CheckCircle,
  XCircle,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  duration: string;
  price: number | string;
  image: string | null;
  isFeatured: boolean;
  isActive: boolean;
  destination: {
    id: string;
    name: string;
    country: string;
  };
}

function AdminPackagesContent() {
  const searchParams = useSearchParams();
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPackages(searchTerm = "") {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams();
      if (searchTerm.trim()) {
        query.set("search", searchTerm.trim());
      }

      const response = await fetch(
        `/api/admin/packages?${query.toString()}`,
        { cache: "no-store" }
      );
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
  }

  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearch(term);
    void loadPackages(term);
  }, [searchParams]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadPackages(search);
  }

  function formatPrice(price: number | string) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price));
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center text-sm font-medium text-red-600">
                <Plane size={15} className="mr-1.5" />
                TravelHodie Administration
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Holiday Packages
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage your holiday packages and travel offers.
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

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                  <Package size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Packages</p>
                  <p className="text-2xl font-bold text-slate-900">{packages.length}</p>
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
                  <p className="text-2xl font-bold text-slate-900">
                    {packages.filter((item) => item.isActive).length}
                  </p>
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
                  <p className="text-2xl font-bold text-slate-900">
                    {packages.filter((item) => item.isFeatured).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Package List */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <h2 className="font-bold text-slate-900">All Packages</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  View and manage your travel packages.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search packages..."
                      className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 sm:w-64"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
                  >
                    Search
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    void loadPackages("");
                  }}
                  disabled={loading}
                  title="Refresh packages"
                  className="rounded-lg border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Loading / Content */}
            {loading ? (
              <div className="py-20 text-center">
                <RefreshCw
                  size={28}
                  className="mx-auto animate-spin text-red-600"
                />
                <p className="mt-3 text-sm text-slate-500">Loading packages...</p>
              </div>
            ) : packages.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <Package size={40} className="mx-auto text-slate-300" />
                <h3 className="mt-4 font-semibold text-slate-800">No packages found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {search
                    ? "No packages match your search filter."
                    : "Add a new holiday package to get started."}
                </p>
                <Link
                  href="/admin/packages/new"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <Plus size={17} />
                  Add Package
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Package size={14} className="text-slate-400" />
                          Package
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          Destination
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-400" />
                          Duration
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Tag size={14} className="text-slate-400" />
                          Price
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Star size={14} className="text-slate-400" />
                          Featured
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Eye size={14} className="text-slate-400" />
                          Status
                        </span>
                      </th>
                      <th className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <Settings2 size={14} className="text-slate-400" />
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {packages.map((item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="min-w-64 px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-13 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-slate-400">
                                  <Package size={20} />
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">{item.title}</p>
                              <p className="mt-0.5 text-xs text-slate-500">{item.slug}</p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <MapPin size={14} className="text-red-500" />
                            <span className="font-medium">{item.destination.name}</span>
                          </div>
                          <p className="mt-0.5 pl-5 text-xs text-slate-400">
                            {item.destination.country}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={13} className="text-slate-400" />
                            {item.duration}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                          {formatPrice(item.price)}
                        </td>

                        <td className="px-6 py-4">
                          {item.isFeatured ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              <Star size={12} />
                              Featured
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {item.isActive ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                              <CheckCircle size={13} />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              <XCircle size={13} />
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <Link
                            href={`/admin/packages/${item.id}/edit`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Pencil size={13} />
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <footer className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm text-slate-500">
            <p>TravelHodie · Package Management</p>
            <p>Total: {packages.length} packages</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function AdminPackagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-500">
            <RefreshCw className="h-5 w-5 animate-spin text-red-600" />
            <span className="text-sm font-medium">Loading packages...</span>
          </div>
        </div>
      }
    >
      <AdminPackagesContent />
    </Suspense>
  );
}
