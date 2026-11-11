
"use client";

import { FormEvent, useState } from "react";

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit your enquiry.");
      }

      setSuccess(
        data.message ||
          "Thank you! Your enquiry has been submitted successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={150}
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={15}
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Service Required *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
          >
            <option value="">Select a service</option>
            <option value="Holiday Packages">Holiday Packages</option>
            <option value="Flight Booking">Flight Booking</option>
            <option value="Hotel Reservations">Hotel Reservations</option>
            <option value="Visa Assistance">Visa Assistance</option>
            <option value="Travel Insurance">Travel Insurance</option>
            <option value="Umrah Packages">Umrah Packages</option>
            <option value="Passport Assistance">Passport Assistance</option>
            <option value="Group Travel">Group Travel</option>
            <option value="Customised Travel">Customised Travel</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Your Travel Requirements *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={5}
          maxLength={3000}
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your destination, travel dates, number of travellers and other requirements..."
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#C62835] px-7 py-4 font-semibold text-white transition hover:bg-[#a91e2a] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>

      <p className="text-xs leading-5 text-gray-500">
        By submitting this form, you agree to be contacted by the TravelHodie
        team regarding your travel enquiry.
      </p>
    </form>
  );
}
