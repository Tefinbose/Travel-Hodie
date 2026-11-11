import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationView from "@/components/booking/ConfirmationView";

export const metadata: Metadata = {
  title: "Booking Confirmation | TravelHodie",
  description: "Your travel booking request has been received.",
};

function ConfirmationSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-12 animate-pulse">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100" />
      <div className="mx-auto mt-6 h-4 w-28 rounded bg-slate-200" />
      <div className="mx-auto mt-3 h-8 w-72 rounded bg-slate-200" />
      <div className="mx-auto mt-4 h-4 w-96 max-w-full rounded bg-slate-100" />
      <div className="mt-8 h-24 w-full rounded-2xl bg-slate-100" />
      <div className="mt-8 h-48 w-full rounded-2xl bg-slate-800" />
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <Suspense fallback={<ConfirmationSkeleton />}>
          <ConfirmationView />
        </Suspense>
      </div>
    </div>
  );
}
