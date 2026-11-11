
import Link from "next/link";

export interface DestinationPackageData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  duration: string;
  price: number;
  image: string | null;
}

export default function DestinationPackageCard({
  packageData,
}: {
  packageData: DestinationPackageData;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className="h-52 bg-gray-200 bg-cover bg-center"
        style={{
          backgroundImage: packageData.image
            ? `url("${packageData.image}")`
            : "linear-gradient(135deg, #263b5c, #101d35)",
        }}
      />

      <div className="p-6">
        <p className="text-sm font-medium text-[#C62835]">
          {packageData.duration}
        </p>

        <h3 className="mt-2 text-xl font-bold text-[#101D35]">
          {packageData.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
          {packageData.shortDescription || "Discover this exciting holiday package with TravelHodie."}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-[#101D35]">
              ₹{packageData.price.toLocaleString("en-IN")}
            </p>
          </div>

          <Link
            href={`/holidays/${packageData.slug}`}
            className="rounded-lg bg-[#C62835] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a91e2a]"
          >
            View Package
          </Link>
        </div>
      </div>
    </article>
  );
}
