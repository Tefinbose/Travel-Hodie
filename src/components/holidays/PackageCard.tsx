
import Link from "next/link";

interface PackageCardProps {
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

export default function PackageCard({ item }: { item: PackageCardProps }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/holidays/${item.slug}`} className="block">
        <div className="relative h-60 overflow-hidden bg-gray-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#071a35] to-[#25466d] text-white">
              <span className="text-lg font-semibold">TravelHodie</span>
            </div>
          )}

          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071a35] shadow">
            {item.duration}
          </span>
        </div>

        <div className="p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
            {item.destination.name}
          </p>

          <h2 className="text-xl font-bold text-[#071a35] transition group-hover:text-red-600">
            {item.title}
          </h2>

          <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-gray-600">
            {item.shortDescription || "Discover an unforgettable holiday experience with TravelHodie."}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-[#071a35]">
                ₹{item.price.toLocaleString("en-IN")}
              </p>
            </div>

            <span className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
