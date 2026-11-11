
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Headset, Plane } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Confirmation | TravelHodie",
  description: "Your travel booking request has been received.",
};

interface ConfirmationPageProps {
  searchParams: Promise<{
    bookingNumber?: string;
    packageName?: string;
  }>;
}

export default async function BookingConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = await searchParams;

  const bookingNumber = params.bookingNumber || "";
  const packageName = params.packageName || "Your selected travel package";

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-11 w-11 text-green-600" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#C62835]">
            TravelHodie
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#10243A] sm:text-4xl">
            Booking Request Received!
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
            Thank you for choosing TravelHodie. We have received your booking
            request and our travel team will contact you to confirm the details.
          </p>

          {bookingNumber && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Your booking reference</p>
              <p className="mt-2 break-all text-xl font-bold tracking-wide text-[#10243A]">
                {bookingNumber}
              </p>
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-[#10243A] p-6 text-left text-white">
            <h2 className="text-lg font-semibold">Booking summary</h2>
            <p className="mt-3 text-sm text-slate-300">Selected package</p>
            <p className="mt-1 font-semibold">{packageName}</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-[#E4B65D]" />
                <p className="text-sm leading-6 text-slate-200">
                  Our team will review your request and contact you regarding
                  availability and final pricing.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Headset className="mt-1 h-5 w-5 shrink-0 text-[#E4B65D]" />
                <p className="text-sm leading-6 text-slate-200">
                  If you need assistance, contact our team at +91 89210 83214.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/holidays"
              className="rounded-lg bg-[#C62835] px-7 py-3 font-semibold text-white transition hover:bg-[#a91e2a]"
            >
              Explore More Packages
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-7 py-3 font-semibold text-[#10243A] transition hover:bg-slate-50"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
            <Plane className="h-4 w-4" />
            <span>Your journey begins with TravelHodie</span>
          </div>
        </div>
      </div>
    </div>
  );
}
