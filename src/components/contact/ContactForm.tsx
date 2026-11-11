
"use client";

import { FormEvent, useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  packageName?: string;
}

export default function ContactForm({
  packageName = "",
}: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your enquiry.");
      }

      setSuccess("Thank you! Your message has been submitted successfully.");
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
        Send us a message
      </p>

      <h2 className="mt-3 text-2xl font-bold text-[#071a35] md:text-3xl">
        How Can We Help You?
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        Fill out the form below and our team will get back to you.
      </p>

      {success && (
        <div className="mt-6 flex gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle className="shrink-0" size={20} />
          {success}
        </div>
      )}

      {error && (
        <div className="mt-6 flex gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="shrink-0" size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={150}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={20}
              placeholder="+91"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              maxLength={150}
              defaultValue={
                packageName ? `Enquiry about ${packageName}` : ""
              }
              placeholder="How can we help?"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={5}
            placeholder="Tell us about your travel plans..."
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-red-600 px-7 py-4 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
          {!loading && <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
