
import PackageCard from "./PackageCard";

interface PackageItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  duration: string;
  price: number;
  image: string | null;
  destination: {
    name: string;
  };
}

export default function PackageGrid({
  packages,
}: {
  packages: PackageItem[];
}) {
  if (packages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <h3 className="text-2xl font-bold text-[#071a35]">
          No holiday packages found
        </h3>

        <p className="mt-3 text-gray-600">
          Try another search or destination to discover available trips.
        </p>

        <a
          href="/holidays"
          className="mt-6 inline-block rounded-full bg-red-600 px-7 py-3 font-semibold text-white hover:bg-red-700"
        >
          View All Packages
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((item) => (
        <PackageCard key={item.id} item={item} />
      ))}
    </div>
  );
}
