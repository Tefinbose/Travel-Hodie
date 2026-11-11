import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Compass, MapPin } from "lucide-react";

interface Package {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  duration: string;
  price: number;
  image: string | null;
  destination: {
    name: string;
  };
}

interface FeaturedPackagesProps {
  packages: Package[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedPackages({
  packages,
}: FeaturedPackagesProps) {
  return (
    // Full-viewport section: fills the screen height and centres its content.
    // Uses min-h (not h) so taller content on small screens can still grow.
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-16 -z-10 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:py-10 md:px-8 md:py-12">
        {/* Heading */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-red-100 bg-red-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Handpicked Experiences
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent">
                Holiday Packages
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-slate-500">
              Discover carefully selected journeys for every kind of traveller.
            </p>
          </div>

          <Link
            href="/holidays"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-slate-200 bg-white py-2 pl-6 pr-2 text-sm font-bold text-[#101c32] shadow-sm transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/25 sm:self-auto"
          >
            View All Packages
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>

        {packages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {packages.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-red-500/10"
              >
                {/* Image */}
                <Link
                  href={`/holidays/${item.slug}`}
                  className="relative block h-56 overflow-hidden bg-slate-100 lg:h-[clamp(11rem,28vh,17rem)]"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                      <Compass size={44} strokeWidth={1.5} />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-red-950/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Featured
                  </span>

                  <span className="absolute bottom-4 left-4 inline-flex max-w-[85%] items-center gap-1.5 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <MapPin size={13} className="shrink-0 text-red-300" />
                    <span className="truncate">{item.destination.name}</span>
                  </span>
                </Link>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <Link href={`/holidays/${item.slug}`}>
                    <h3 className="text-lg font-bold leading-snug text-[#101c32] transition-colors group-hover:text-red-600">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {item.shortDescription || item.description}
                  </p>

                  <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    <Clock size={13} className="text-red-500" />
                    {item.duration}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Starting from
                      </p>
                      <p className="mt-0.5 text-lg sm:text-xl font-extrabold tracking-tight text-[#101c32]">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <Link
                      href={`/holidays/${item.slug}`}
                      aria-label={`View ${item.title}`}
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-red-50 text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/30"
                    >
                      <ArrowUpRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center backdrop-blur">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Compass size={26} />
            </span>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Featured holiday packages will appear here when they are
              available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}