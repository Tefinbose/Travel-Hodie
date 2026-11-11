
import Link from "next/link";

export interface DestinationCardData {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  image: string | null;
  packageCount: number;
}

export default function DestinationCard({
  destination,
}: {
  destination: DestinationCardData;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div
        className="relative h-64 bg-gray-200 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
        style={{
          backgroundImage: destination.image
            ? `url("${destination.image}")`
            : "linear-gradient(135deg, #263b5c, #101d35)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 text-white">
          <p className="text-sm text-gray-200">
            {destination.country || "Explore destination"}
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {destination.name}
          </h2>

          <p className="mt-2 text-sm text-gray-200">
            {destination.packageCount}{" "}
            {destination.packageCount === 1 ? "package" : "packages"} available
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-semibold text-[#101D35]">
          Explore Destination
        </span>

        <span className="text-xl text-[#C62835] transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
