
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Users,
  Plus,
  Trash2,
  Loader2,
  Plane,
} from "lucide-react";

interface Passenger {
  name: string;
  age: string;
  gender: string;
}

interface BookingFormProps {
  packageId: string;
  packageTitle: string;
  price: number;
}

export default function BookingForm({
  packageId,
  packageTitle,
  price,
}: BookingFormProps) {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: "", age: "", gender: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = price * passengers.length;

  const addPassenger = () => {
    setPassengers((current) => [
      ...current,
      { name: "", age: "", gender: "" },
    ]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length === 1) return;

    setPassengers((current) =>
      current.filter((_, passengerIndex) => passengerIndex !== index)
    );
  };

  const updatePassenger = (
    index: number,
    field: keyof Passenger,
    value: string
  ) => {
    setPassengers((current) =>
      current.map((passenger, passengerIndex) =>
        passengerIndex === index
          ? { ...passenger, [field]: value }
          : passenger
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      setError("Please complete all required customer details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!travelDate) {
      setError("Please select your preferred travel date.");
      return;
    }

    if (passengers.some((passenger) => !passenger.name.trim())) {
      setError("Please enter the name of every passenger.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ""),
          packageId,
          travelDate: new Date(
            `${travelDate}T00:00:00`
          ).toISOString(),
          passengers: passengers.map((passenger) => ({
            name: passenger.name.trim(),
            age: passenger.age ? Number(passenger.age) : undefined,
            gender: passenger.gender || undefined,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your booking request."
        );
      }

      const bookingNumber =
        data.booking?.bookingNumber ||
        data.bookingNumber ||
        "";

      const query = new URLSearchParams({
        packageName: packageTitle,
        ...(bookingNumber ? { bookingNumber } : {}),
      });

      router.push(`/booking/confirmation?${query.toString()}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#10243A]">
            Customer Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter the primary traveller's contact details.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                maxLength={100}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  maxLength={150}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Preferred Travel Date *
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Passenger Details */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#10243A]">
              Passenger Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add the details of everyone travelling.
            </p>
          </div>

          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-[#C62835]">
            {passengers.length} Passenger
            {passengers.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-5">
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#C62835]" />
                  <h3 className="font-semibold text-[#10243A]">
                    Passenger {index + 1}
                  </h3>
                </div>

                {passengers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePassenger(index)}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Passenger Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={passenger.name}
                    onChange={(e) =>
                      updatePassenger(index, "name", e.target.value)
                    }
                    placeholder="Enter passenger name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={passenger.age}
                    onChange={(e) =>
                      updatePassenger(index, "age", e.target.value)
                    }
                    placeholder="Age"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <select
                    value={passenger.gender}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#C62835] focus:ring-2 focus:ring-[#C62835]/10"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPassenger}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#C62835] px-5 py-3 font-semibold text-[#C62835] transition hover:bg-red-50"
        >
          <Plus className="h-5 w-5" />
          Add Another Passenger
        </button>
      </section>

      {/* Price Summary */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-[#10243A]">
          Booking Summary
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-slate-500">Selected Package</span>
            <span className="text-right font-semibold text-[#10243A]">
              {packageTitle}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Price per passenger</span>
            <span className="font-semibold text-[#10243A]">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Number of passengers</span>
            <span className="font-semibold text-[#10243A]">
              {passengers.length}
            </span>
          </div>

          <div className="border-t border-dashed border-slate-300 pt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-lg font-bold text-[#10243A]">
                Estimated Total
              </span>
              <span className="text-2xl font-bold text-[#C62835]">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          This is an estimated package amount based on the current displayed
          price. Final pricing and availability will be confirmed by our team.
        </p>
      </section>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#C62835] px-6 py-4 text-base font-bold text-white shadow-lg shadow-red-900/10 transition hover:bg-[#a91e2a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting Booking...
            </>
          ) : (
            <>
              <Plane className="h-5 w-5" />
              Submit Booking Request
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          Submitting this form sends a booking request only. No online payment
          is collected at this stage. Our team will contact you to confirm
          your booking.
        </p>
      </div>
    </form>
  );
}
