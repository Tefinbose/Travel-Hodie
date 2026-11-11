"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Save,
  Loader2,
  MapPin,
  Clock,
  IndianRupee,
  ImagePlus,
  Sliders,
  Link2,
  FileText,
  X,
  RefreshCw,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Destination {
  id: string;
  name: string;
  country: string;
}

interface PackageForm {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  destinationId: string;
  duration: string;
  price: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
}

const initialForm: PackageForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  destinationId: "",
  duration: "",
  price: "",
  image: "",
  isFeatured: false,
  isActive: true,
};

export default function EditPackagePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState<PackageForm>(initialForm);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [packageResponse, destinationResponse] = await Promise.all([
          fetch(`/api/admin/packages/${id}`),
          fetch("/api/destinations"),
        ]);

        const packageData = await packageResponse.json();
        const destinationData = await destinationResponse.json();

        if (!packageResponse.ok || !packageData.success) {
          throw new Error(packageData.message || "Unable to load package.");
        }

        if (!destinationResponse.ok || !destinationData.success) {
          throw new Error(
            destinationData.message || "Unable to load destinations."
          );
        }

        const item = packageData.package;

        setForm({
          title: item.title || "",
          slug: item.slug || "",
          shortDescription: item.shortDescription || "",
          description: item.description || "",
          destinationId: item.destinationId || "",
          duration: item.duration || "",
          price: String(item.price ?? ""),
          image: item.image || "",
          isFeatured: Boolean(item.isFeatured),
          isActive: Boolean(item.isActive),
        });

        setDestinations(destinationData.destinations || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) void loadData();
  }, [id]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      setForm((previous) => ({
        ...previous,
        [name]: (event.target as HTMLInputElement).checked,
      }));
      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          shortDescription: form.shortDescription.trim() || undefined,
          image: form.image.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update package.");
      }

      setMessage("Package updated successfully!");

      setTimeout(() => {
        router.push("/admin/packages");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
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
            <RefreshCw className="mx-auto animate-spin text-red-600" size={32} />
            <p className="mt-3 text-sm text-slate-500">Loading package details...</p>
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
          <div>
            <Link
              href="/admin/packages"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
            >
              <ArrowLeft size={17} />
              Back to Packages
            </Link>

            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <Package size={26} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Edit Package
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Update your travel package details and pricing.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Basic Information</h2>
                  <p className="text-xs text-slate-500">Edit title, slug, and descriptions.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Package size={16} className="text-slate-400" />
                    Package Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={(event) => {
                      const title = event.target.value;
                      setForm((previous) => ({
                        ...previous,
                        title,
                        slug: generateSlug(title),
                      }));
                    }}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                    required
                    minLength={3}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Link2 size={16} className="text-slate-400" />
                    Package Slug *
                  </label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                    required
                    minLength={3}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    URL: /holidays/{form.slug || "package-name"}
                  </p>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin size={16} className="text-slate-400" />
                    Destination *
                  </label>
                  <select
                    name="destinationId"
                    value={form.destinationId}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-red-500"
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map((destination) => (
                      <option key={destination.id} value={destination.id}>
                        {destination.name}, {destination.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock size={16} className="text-slate-400" />
                    Duration *
                  </label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="5 Days / 4 Nights"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleChange}
                    rows={2}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                    required
                    minLength={10}
                  />
                </div>
              </div>
            </section>

            {/* Pricing and Images */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <IndianRupee size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Pricing and Images</h2>
                  <p className="text-xs text-slate-500">Edit price and image asset.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <IndianRupee size={16} className="text-slate-400" />
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="1"
                    step="0.01"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ImagePlus size={16} className="text-slate-400" />
                    Package Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>

                {form.image && (
                  <div className="md:col-span-2">
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      Image Preview
                    </p>
                    <img
                      src={form.image}
                      alt="Package preview"
                      className="h-48 w-full rounded-xl border border-slate-200 object-cover"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Visibility Settings */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Package Settings</h2>
                  <p className="text-xs text-slate-500">Manage display options.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 accent-red-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Display as a featured package on homepage
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 accent-red-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Make this package active and visible to visitors
                  </span>
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="/admin/packages"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <X size={16} />
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving || destinations.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Updating Package...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Update Package
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
