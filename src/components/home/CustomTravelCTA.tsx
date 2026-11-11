import Link from "next/link";
import { ArrowRight, Plane, Compass } from "lucide-react";

export default function CustomTravelCTA() {
  return (
    <section className="px-5 py-10 sm:py-12 md:py-16">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-700 via-red-600 to-rose-500 px-6 py-12 text-white shadow-2xl shadow-red-900/20 sm:px-12 md:py-16 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Dotted pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.2px,transparent_1.2px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_right,transparent_10%,black_90%)]" />
          {/* Rings */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/20" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-black/10 blur-2xl" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          {/* Dashed flight path */}
          <svg
            className="absolute bottom-0 right-0 hidden h-full w-[55%] text-white/30 lg:block"
            viewBox="0 0 600 300"
            fill="none"
            preserveAspectRatio="xMaxYMid slice"
            aria-hidden="true"
          >
            <path
              d="M20 270 C 160 270, 200 80, 340 120 S 520 60, 580 30"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 10"
              strokeLinecap="round"
            />
            <circle cx="20" cy="270" r="6" fill="currentColor" />
          </svg>
        </div>

        {/* Copy */}
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-50 backdrop-blur-md">
            <Compass size={14} />
            Your Dream Trip Starts Here
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Let&apos;s Plan Your{" "}
            <span className="underline decoration-white/50 decoration-4 underline-offset-8">
              Next Adventure
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-red-50/95">
            Looking for a family holiday, group tour or a personalised
            international experience? Tell us what you have in mind.
          </p>
        </div>

        {/* Action */}
        <div className="relative mt-8 sm:mt-9 flex shrink-0 items-center gap-5 w-full sm:w-auto lg:mt-0">
          <Link
            href="/contact"
            className="group inline-flex w-full sm:w-auto items-center justify-between sm:justify-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold text-red-600 shadow-xl shadow-red-950/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#101c32] hover:text-white"
          >
            Contact Our Team
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition-colors duration-300 group-hover:bg-red-500">
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          {/* Floating plane badge */}
          <span className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md lg:flex">
            <Plane size={28} className="-rotate-12" />
          </span>
        </div>
      </div>
    </section>
  );
}