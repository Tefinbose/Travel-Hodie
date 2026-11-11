"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  MapPin,
  ImagePlus,
  RefreshCw,
  Globe,
  Link2,
  FileText,
  Sliders,
  Star,
  CheckCircle,
  X,
  Plane,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface DestinationForm {
  name: string;
  slug: string;
  country: string;
  description: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
}

const initialForm: DestinationForm = {
  name: "",
  slug: "",
  country: "",
  description: "",
  image: "",
  isFeatured: false,
  isActive: true,
};

export default function EditDestinationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState<DestinationForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadDestination = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/admin/destinations/${id}`, {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load destination.");
      }

      const destination = data.destination;
      setForm({
        name: destination.name || "",
        slug: destination.slug || "",
        country: destination.country || "",
        description: destination.description || "",
        image: destination.image || "",
        isFeatured: destination.isFeatured ?? false,
        isActive: destination.isActive ?? true,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load destination."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      void loadDestination();
    }
  }, [id, loadDestination]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/admin/destinations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          slug: form.slug.trim(),
          country: form.country.trim(),
          description: form.description.trim(),
          image: form.image.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update destination.");
      }

      setSuccess("Destination updated successfully!");

      setTimeout(() => {
        router.push("/admin/destinations");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update destination."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
        <AdminSidebar />
        <main className="flex min-w-0 flex-1 items-center justify-center p-6 lg:p-10">
          <div className="text-center">
            <RefreshCw className="mx-auto animate-spin text-red-600" size={30} />
            <p className="mt-3 text-sm text-slate-500">Loading destination...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !form.name) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Unable to load destination</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button
              onClick={loadDestination}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <div className="mt-4">
              <Link
                href="/admin/destinations"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600"
              >
                <ArrowLeft size={16} />
                Back to Destinations
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <Link
            href="/admin/destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-red-600"
          >
            <ArrowLeft size={16} />
            Back to Destinations
          </Link>

          <div>
            <p className="inline-flex items-center text-sm font-medium text-red-600">
              <Plane size={15} className="mr-1.5" />
              TravelHodie Administration
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Edit Destination
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Update your destination information and publishing settings.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Destination Information</h2>
                  <p className="text-xs text-slate-500">Update the basic destination details.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-400" />
                      Destination Name *
                    </span>
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Destination name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe size={14} className="text-slate-400" />
                      Country *
                    </span>
                  </label>
                  <input
                    name="country"
                    required
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Link2 size={14} className="text-slate-400" />
                      URL Slug *
                    </span>
                  </label>
                  <input
                    name="slug"
                    required
                    value={form.slug}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        slug: event.target.value
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/-+/g, "-"),
                      }))
                    }
                    placeholder="destination-slug"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Public URL: /destinations/{form.slug || "slug"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText size={14} className="text-slate-400" />
                      Description
                    </span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe this destination..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </section>

            {/* Image */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <ImagePlus size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Destination Image</h2>
                  <p className="text-xs text-slate-500">Change the cover image for this destination.</p>
                </div>
              </div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5">
                  <ImagePlus size={14} className="text-slate-400" />
                  Image URL
                </span>
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              {form.image && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-slate-500">Image Preview</p>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <img
                      src={form.image}
                      alt={form.name || "Destination Preview"}
                      className="h-52 w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Publishing Settings */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Publishing Settings</h2>
                  <p className="text-xs text-slate-500">Manage visibility and featured status.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        isFeatured: event.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-red-600"
                  />
                  <span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                      <Star size={14} className="text-amber-500" />
                      Featured Destination
                    </span>
                    <span className="block text-xs text-slate-500">
                      Show this destination in highlighted and home page sections.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        isActive: event.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-red-600"
                  />
                  <span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                      <CheckCircle size={14} className="text-green-500" />
                      Active Destination
                    </span>
                    <span className="block text-xs text-slate-500">
                      Make this destination visible across all booking and package options.
                    </span>
                  </span>
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <Link
                href="/admin/destinations"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <X size={16} />
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Updating..." : "Update Destination"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
