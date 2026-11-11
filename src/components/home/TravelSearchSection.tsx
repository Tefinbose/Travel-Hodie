import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";

const popularDestinations = ["Maldives", "Switzerland", "Santorini", "Kyoto", "Dubai"];

export default function TravelSearchSection() {
  return (
    <section
      id="travel-search"
      className="relative z-10 mx-auto max-w-5xl scroll-mt-6 px-4 sm:px-6 pt-6 pb-2 sm:pt-8 sm:pb-3 md:pt-8 md:pb-3"
    >
      <div className="relative">
        {/* Soft glow behind the card */}
        <div className="pointer-events-none absolute inset-x-8 -bottom-2 h-10 rounded-full bg-red-500/15 blur-xl" />

        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 p-3 sm:p-4 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
          <form
            action="/holidays"
            method="GET"
            className="grid gap-2.5 sm:gap-3 md:grid-cols-[1fr_auto] md:items-stretch"
          >
            {/* Field */}
            <label
              htmlFor="destination-search"
              className="group flex cursor-text items-center gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 px-3.5 py-2 sm:px-4 sm:py-2.5 transition-all duration-300 focus-within:border-red-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 hover:border-slate-300"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-red-50 to-rose-100 text-red-600 ring-1 ring-red-100 transition-all duration-300 group-focus-within:from-red-600 group-focus-within:to-rose-500 group-focus-within:text-white group-focus-within:ring-transparent">
                <MapPin size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Where would you like to go?
                </span>
                <input
                  id="destination-search"
                  name="search"
                  type="search"
                  autoComplete="off"
                  placeholder="Search your destination or holiday package"
                  className="mt-0.5 w-full border-0 bg-transparent p-0 text-base sm:text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#101c32] to-[#1b2f52] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-slate-900/15 transition-all duration-300 hover:from-red-600 hover:to-rose-500 hover:shadow-red-500/25 active:scale-[0.98] md:min-w-[160px]"
            >
              <Search size={16} />
              Search Trips
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Quick picks */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 px-1">
            <span className="mr-1 text-[11px] font-semibold text-slate-500">
              Popular:
            </span>
            {popularDestinations.map((place) => (
              <Link
                key={place}
                href={`/holidays?search=${encodeURIComponent(place)}`}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                {place}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
