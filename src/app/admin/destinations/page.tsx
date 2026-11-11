"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  RefreshCw,
  Globe,
  Star,
  CheckCircle,
  XCircle,
  Package,
  Pencil,
  ArrowLeft,
  Settings2,
  Plane,
  Plus,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Destination {
  id: string;
  name: string;
  slug: string;
  country?: string | null;
  description?: string | null;
  image?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  _count?: {
    packages: number;
  };
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadDestinations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/destinations?limit=100", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load destinations.");
      }

      setDestinations(data.destinations || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading destinations."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDestinations();
  }, [loadDestinations]);

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return destinations;

    return destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(query) ||
        destination.slug.toLowerCase().includes(query) ||
        (destination.country || "").toLowerCase().includes(query)
    );
  }, [destinations, search]);

  const totalDestinations = destinations.length;
  const activeDestinations = destinations.filter((d) => d.isActive).length;
  const featuredDestinations = destinations.filter((d) => d.isFeatured).length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center text-sm font-medium text-red-600">
                <Plane size={15} className="mr-1.5" />
                TravelHodie Administration
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Destinations
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                View and manage your travel destinations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/destinations/new"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                <Plus size={18} />
                Add New Destination
              </Link>

              <button
                type="button"
                onClick={loadDestinations}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                  <Globe size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Destinations</p>
                  <p className="text-2xl font-bold text-slate-900">{totalDestinations}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-3 text-green-600">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Active Destinations</p>
                  <p className="text-2xl font-bold text-slate-900">{activeDestinations}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
                  <Star size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Featured Destinations</p>
                  <p className="text-2xl font-bold text-slate-900">{featuredDestinations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Destination List */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  All Destinations
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Destinations currently stored in your database.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search destinations..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-red-500"
                />
              </div>
            </div>

            {error && (
              <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-semibold">Unable to load destinations</p>
                <p className="mt-1">{error}</p>
                <button
                  type="button"
                  onClick={loadDestinations}
                  className="mt-3 font-semibold underline"
                >
                  Try again
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex min-h-56 items-center justify-center">
                <div className="text-center">
                  <RefreshCw
                    size={25}
                    className="mx-auto animate-spin text-red-700"
                  />
                  <p className="mt-3 text-sm text-slate-500">
                    Loading destinations...
                  </p>
                </div>
              </div>
            ) : !error && filteredDestinations.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <MapPin
                  size={36}
                  className="mx-auto text-slate-300"
                />
                <h3 className="mt-4 font-semibold text-slate-800">
                  {search ? "No matching destinations" : "No destinations found"}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {search
                    ? "Try searching with another name or country."
                    : "Add destination records to your database to see them here."}
                </p>
              </div>
            ) : !error ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          Destination
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Globe size={14} className="text-slate-400" />
                          Country
                        </span>
                      </th>
                      <th className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Package size={14} className="text-slate-400" />
                          Packages
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
                          <CheckCircle size={14} className="text-slate-400" />
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
                    {filteredDestinations.map((destination) => (
                      <tr
                        key={destination.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="min-w-64 px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                              {destination.image ? (
                                <img
                                  src={destination.image}
                                  alt={destination.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <MapPin
                                  size={20}
                                  className="text-slate-400"
                                />
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {destination.name}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500">
                                {destination.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Globe size={13} className="text-slate-400" />
                            {destination.country || "—"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            <Package size={13} className="text-slate-500" />
                            {destination._count?.packages ?? 0} {destination._count?.packages === 1 ? "package" : "packages"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {destination.isFeatured ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              <Star size={12} />
                              Featured
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {destination.isActive ? (
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
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/destinations/${destination.id}/edit`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Pencil size={13} />
                              Edit
                            </Link>

                            <Link
                              href={`/admin/packages?search=${encodeURIComponent(destination.name)}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Package size={13} />
                              Packages
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
              Showing {filteredDestinations.length} of {totalDestinations} destinations
            </div>
          </section>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm text-slate-500">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-medium text-red-600 hover:text-red-700"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <p>TravelHodie · Destination Management</p>
          </div>
        </div>
      </main>
    </div>
  );
}
