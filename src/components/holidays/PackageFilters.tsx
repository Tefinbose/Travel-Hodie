
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
      className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_auto_auto]"
    >
      <div>
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Search holidays
        </label>

        <input
          id="search"
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search packages or destinations"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
        />
      </div>

      <div>
        <label
          htmlFor="destination"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Destination
        </label>

        <select
          id="destination"
          name="destination"
          defaultValue={selectedDestination}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
        >
          <option value="">All destinations</option>

          {destinations.map((destination) => (
            <option key={destination.slug} value={destination.slug}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-[#071a35] px-7 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Search
        </button>
      </div>

      <div className="flex items-end">
        <a
          href="/holidays"
          className="w-full rounded-lg border border-gray-300 px-7 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Reset
        </a>
      </div>
    </form>
  );
}
