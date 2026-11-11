"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
  CheckCircle2,
  X,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Destination {
  id: string;
  name: string;
  country: string;
}

export default function NewPackagePage() {
  const router = useRouter();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
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
  });

  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const response = await fetch("/api/destinations", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Unable to load destinations.");
        }
        setDestinations(data.destinations || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load destinations."
        );
      } finally {
        setLoadingDestinations(false);
      }
    }

    void loadDestinations();
  }, []);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "title" && !slugEdited) {
      setForm((previous) => ({
        ...previous,
        title: value,
        slug: generateSlug(value),
      }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.destinationId) {
      setError("Please select a destination.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          image: form.image.trim() || undefined,
          shortDescription: form.shortDescription.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const validationErrors = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : "";
        throw new Error(
          validationErrors || data.message || "Unable to create package."
        );
      }

      setSuccess("Holiday package created successfully!");
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

  return (
    <div className="flex min-h-screen bg-slate-50">
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
                  Add New Package
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Create a new holiday package for TravelHodie.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
              {success}
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
                  <p className="text-xs text-slate-500">Enter title, slug, and descriptions.</p>
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
                    onChange={handleChange}
                    required
                    minLength={3}
                    placeholder="Example: Dubai Luxury Escape"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
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
                    onChange={(event) => {
                      setSlugEdited(true);
                      setForm((previous) => ({
                        ...previous,
                        slug: generateSlug(event.target.value),
                      }));
                    }}
                    required
                    minLength={3}
                    placeholder="dubai-luxury-escape"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
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
                    required
                    disabled={loadingDestinations}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-red-500 disabled:bg-slate-100"
                  >
                    <option value="">
                      {loadingDestinations
                        ? "Loading destinations..."
                        : "Select destination"}
                    </option>
                    {destinations.map((destination) => (
                      <option key={destination.id} value={destination.id}>
                        {destination.name}, {destination.country}
                      </option>
                    ))}
                  </select>
                  {!loadingDestinations && destinations.length === 0 && (
                    <p className="mt-2 text-xs text-red-600">
                      No destinations available. Add a destination first.
                    </p>
                  )}
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
                    required
                    placeholder="5 Days / 4 Nights"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
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
                    placeholder="Write a short introduction to this package..."
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
                    required
                    minLength={10}
                    rows={5}
                    placeholder="Describe the holiday experience, attractions, and package details..."
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
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
                  <p className="text-xs text-slate-500">Set the tour package pricing and banner image.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <IndianRupee size={16} className="text-slate-400" />
                    Package Price (INR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="1"
                    step="0.01"
                    placeholder="45999"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ImagePlus size={16} className="text-slate-400" />
                    Main Image URL
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
                  <p className="text-xs text-slate-500">Manage visibility and featured status.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        isFeatured: event.target.checked,
                      }))
                    }
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
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        isActive: event.target.checked,
                      }))
                    }
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
                disabled={saving || loadingDestinations || destinations.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving Package...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Package
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
