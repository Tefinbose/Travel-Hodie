"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  MapPin,
  ImagePlus,
  Globe,
  Link2,
  FileText,
  Sliders,
  X,
  Loader2,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function NewDestinationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    country: "",
    description: "",
    image: "",
    isFeatured: false,
    isActive: true,
  });

  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!slugEdited) {
      setForm((previous) => ({
        ...previous,
        slug: previous.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      }));
    }
  }, [form.name, slugEdited]);

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
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/destinations", {
        method: "POST",
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
        throw new Error(data.message || "Unable to create destination.");
      }

      setSuccess("Destination created successfully!");
      setTimeout(() => {
        router.push("/admin/destinations");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <Link
              href="/admin/destinations"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
            >
              <ArrowLeft size={17} />
              Back to Destinations
            </Link>

            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <MapPin size={26} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Add New Destination
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Add a new travel destination to your website.
                </p>
              </div>
            </div>
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
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Destination Details</h2>
                  <p className="text-xs text-slate-500">Basic information about the destination.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin size={16} className="text-slate-400" />
                    Destination Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Bali"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Globe size={16} className="text-slate-400" />
                    Country *
                  </label>
                  <input
                    name="country"
                    required
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. Indonesia"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Link2 size={16} className="text-slate-400" />
                    URL Slug *
                  </label>
                  <input
                    name="slug"
                    required
                    value={form.slug}
                    onChange={(event) => {
                      setSlugEdited(true);
                      setForm((previous) => ({
                        ...previous,
                        slug: event.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/-+/g, "-"),
                      }));
                    }}
                    placeholder="bali"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-500"
                  />
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                    <span>URL: /destinations/{form.slug || "your-slug"}</span>
                    <button
                      type="button"
                      onClick={() => setSlugEdited(false)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Reset from name
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FileText size={16} className="text-slate-400" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the destination highlights and atmosphere..."
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </section>

            {/* Destination Image */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <ImagePlus size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Destination Image</h2>
                  <p className="text-xs text-slate-500">Provide an image URL for this destination.</p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/destination.jpg"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-500"
                />

                {form.image && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      Image Preview
                    </p>
                    <img
                      src={form.image}
                      alt="Destination preview"
                      className="h-52 w-full rounded-xl border border-slate-200 object-cover"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Publishing Settings */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Publishing Settings</h2>
                  <p className="text-xs text-slate-500">Manage display visibility.</p>
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
                    <span className="block text-sm font-semibold text-slate-800">
                      Featured Destination
                    </span>
                    <span className="text-xs text-slate-500">
                      Display this destination in featured sections on the homepage.
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
                    <span className="block text-sm font-semibold text-slate-800">
                      Active Destination
                    </span>
                    <span className="text-xs text-slate-500">
                      Make this destination visible on the website.
                    </span>
                  </span>
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="/admin/destinations"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <X size={16} />
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Destination
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
