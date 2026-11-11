import { Search, MapPin, RotateCcw } from "lucide-react";

interface DestinationOption {
  name: string;
  slug: string;
}

interface PackageFiltersProps {
  destinations: DestinationOption[];
  search: string;
  selectedDestination: string;
}

export default function PackageFilters({
  destinations,
  search,
  selectedDestination,
}: PackageFiltersProps) {
  return (
    <form
      action="/holidays"
      method="GET"
      className="grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_25px_rgba(0,0,0,0.04)] md:grid-cols-[1.2fr_1fr_auto_auto] items-end"
    >
      <div>
        <label
          htmlFor="search"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          <Search size={13} className="text-red-500" />
          Search Holidays
        </label>

        <div className="relative">
          <input
            id="search"
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search package name, city..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-[#101c32] outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="destination"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          <MapPin size={13} className="text-red-500" />
          Destination
        </label>

        <select
          id="destination"
          name="destination"
          defaultValue={selectedDestination}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-[#101c32] outline-none transition focus:border-red-500 focus:bg-white"
        >
          <option value="">All Destinations</option>

          {destinations.map((destination) => (
            <option key={destination.slug} value={destination.slug}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
        >
          <Search size={14} />
          Search
        </button>
      </div>

      <div>
        <a
          href="/holidays"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
        >
          <RotateCcw size={13} />
          Reset
        </a>
      </div>
    </form>
  );
}
