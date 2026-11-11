
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
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Info,
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
    if (passengers.length >= 20) return;
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

  const copyPrimaryTraveller = () => {
    if (!customerName.trim()) {
      setError("Please enter your primary customer name first.");
      return;
    }
    setError("");
    updatePassenger(0, "name", customerName.trim());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      setError("Please complete all required contact details.");
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
      setError("Please enter the full name for every traveller.");
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
          travelDate: new Date(`${travelDate}T00:00:00`).toISOString(),
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
        data.data?.bookingNumber ||
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
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 sm:p-4 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-500">
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-sm">
            1
          </span>
          <span>Contact Details</span>
        </div>
        <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
            2
          </span>
          <span className="hidden sm:inline">Travellers</span>
          <span className="sm:hidden">Travellers</span>
        </div>
        <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
            3
          </span>
          <span>Confirm</span>
        </div>
      </div>

      {/* Customer Contact Information */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="mb-5 sm:mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
            Step 1 of 3
          </span>
          <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-[#101c32]">
            Primary Traveller Details
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Booking confirmation and itinerary updates will be sent to this contact.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                maxLength={100}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-[#101c32] outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  maxLength={150}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-[#101c32] outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-[#101c32] outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>
          </div>

          {/* Travel Date */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Preferred Departure Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-[#101c32] outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
              />
            </div>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
              <Info size={12} className="text-slate-400 shrink-0" />
              Flexible dates? You can refine or reschedule with your concierge.
            </p>
          </div>
        </div>
      </section>

      {/* Passenger Details */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
              Step 2 of 3
            </span>
            <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-[#101c32]">
              Passenger Information
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Provide names as they appear on official government IDs.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600 border border-red-100/60">
            <Users size={13} />
            {passengers.length} {passengers.length === 1 ? "Traveller" : "Travellers"}
          </span>
        </div>

        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 transition-all hover:border-slate-300"
            >
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 text-xs font-bold text-white shadow-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#101c32]">
                    Traveller {index + 1} {index === 0 && "(Lead Guest)"}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {/* Autofill button for passenger 1 */}
                  {index === 0 && customerName.trim() && (
                    <button
                      type="button"
                      onClick={copyPrimaryTraveller}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 transition"
                      title="Use name entered above"
                    >
                      <Copy size={11} />
                      Same as contact
                    </button>
                  )}

                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={passenger.name}
                    onChange={(e) =>
                      updatePassenger(index, "name", e.target.value)
                    }
                    placeholder="Enter full name as per ID"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#101c32] outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
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
                    placeholder="e.g. 28"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#101c32] outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Gender
                  </label>
                  <select
                    value={passenger.gender}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#101c32] outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  >
                    <option value="">Select gender (optional)</option>
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
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-dashed border-red-300 bg-red-50/50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 active:scale-[0.98]"
        >
          <Plus size={14} />
          Add Another Traveller
        </button>
      </section>

      {/* Booking Summary Card */}
      <section className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
            Step 3 of 3
          </span>
          <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-[#101c32]">
            Fare Summary
          </h2>
        </div>

        <div className="space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Package Rate</span>
            <span className="font-semibold text-[#101c32]">
              ₹{price.toLocaleString("en-IN")} × {passengers.length} {passengers.length === 1 ? "person" : "persons"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Taxes & Service Coordination</span>
            <span className="font-semibold text-emerald-600">Included</span>
          </div>

          <div className="pt-3 border-t border-slate-200/60 flex items-baseline justify-between">
            <div>
              <span className="text-sm sm:text-base font-extrabold text-[#101c32]">
                Estimated Total
              </span>
              <p className="text-[11px] text-slate-400">All inclusive indicative pricing</p>
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-red-600">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
            <span>Pay nothing online today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
            <span>Dedicated concierge confirmation</span>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm font-semibold text-red-700 shadow-sm"
        >
          {error}
        </div>
      )}

      {/* Submit Action */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            <>
              Request Booking Confirmation
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
          Submitting this request does not charge your card. Our team will verify room & flight availability and contact you with final itinerary details.
        </p>
      </div>
    </form>
  );
}
