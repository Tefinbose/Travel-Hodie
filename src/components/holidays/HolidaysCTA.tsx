
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function HolidaysCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-12 text-center text-white shadow-2xl sm:py-16">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-black/10 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-50 backdrop-blur-md">
          <Compass size={13} className="text-white" />
          Your Journey Starts Here
        </span>

        <h2 className="mt-3.5 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
          Can&apos;t Find Your Perfect Holiday?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-red-100">
          Tell us what you have in mind. Our travel team can help create a
          personalised holiday experience for you and your family.
        </p>

        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-red-600 shadow-xl transition-all duration-300 hover:bg-[#101c32] hover:text-white"
        >
          Request a Custom Trip
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
