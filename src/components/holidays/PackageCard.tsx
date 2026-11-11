import Link from "next/link";
import { Clock, MapPin, ArrowUpRight, Compass } from "lucide-react";

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
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-red-500/10">
      <Link href={`/holidays/${item.slug}`} className="block">
        <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
              <Compass size={40} strokeWidth={1.5} />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

          {/* Destination Badge */}
          <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <MapPin size={12} className="text-red-400" />
            <span className="truncate max-w-[130px]">{item.destination.name}</span>
          </span>

          {/* Duration Badge */}
          <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#101c32] shadow backdrop-blur-md">
            <Clock size={12} className="text-red-500" />
            {item.duration}
          </span>
        </div>

        <div className="p-5">
          <h2 className="text-base sm:text-lg font-extrabold text-[#101c32] transition group-hover:text-red-600 line-clamp-1">
            {item.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-500 min-h-[38px]">
            {item.shortDescription || "Discover an unforgettable holiday experience with TravelHodie."}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
            <div>
              <p className="text-[11px] font-medium text-slate-400">Starting from</p>
              <p className="text-base sm:text-lg font-extrabold text-[#101c32]">
                ₹{item.price.toLocaleString("en-IN")}
              </p>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-red-950/20 transition-transform group-hover:gap-1.5">
              View Details
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
