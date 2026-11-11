"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  image: string | null;
}

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export default function FeaturedDestinations({
  destinations,
}: FeaturedDestinationsProps) {
  if (!destinations || destinations.length === 0) {
    return (
      <section className="relative h-screen min-h-[100dvh] max-h-[100dvh] w-full flex items-center justify-center bg-slate-50 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <p className="rounded-xl border border-slate-200 bg-white p-10 text-sm text-slate-500">
            Featured destinations will appear here once you add them from the admin dashboard.
          </p>
        </div>
      </section>
    );
  }

  // Group destinations into International vs Domestic if tags exist, or split evenly into 2 dynamic rows
  const domesticList = destinations.filter(
    (d) =>
      d.country?.toLowerCase().includes("india") ||
      d.name.toLowerCase().includes("kerala") ||
      d.name.toLowerCase().includes("goa")
  );

  const internationalList = destinations.filter(
    (d) => !domesticList.some((dom) => dom.id === d.id)
  );

  const hasBothCategories = domesticList.length > 0 && internationalList.length > 0;

  // Row 1 & Row 2 items
  const row1Items = hasBothCategories
    ? internationalList
    : destinations.filter((_, i) => i % 2 === 0);

  const row2Items = hasBothCategories
    ? domesticList
    : destinations.filter((_, i) => i % 2 === 1);

  // Fallback to all items if one row is empty
  const activeRow1 = row1Items.length > 0 ? row1Items : destinations;
  const activeRow2 = row2Items.length > 0 ? row2Items : destinations;

  // Multiply items to ensure a gapless, seamless infinite loop
  const multiplyForLoop = (items: Destination[], minCount = 10) => {
    let result = [...items];
    while (result.length < minCount) {
      result = [...result, ...items];
    }
    // Duplicate the final array so translateX(-50%) creates a seamless infinite wrap
    return [...result, ...result];
  };

  const marqueeRow1 = multiplyForLoop(activeRow1, 10);
  const marqueeRow2 = multiplyForLoop(activeRow2, 10);

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-12 sm:py-14 md:py-16">
      {/* Container aligned with site width */}
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        {/* Compact Header */}
        <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-1 sm:flex-row sm:items-end text-center sm:text-left">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600 sm:text-xs">
              Explore the World
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#101c32] sm:text-2xl md:text-3xl">
              Popular Destinations
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 hidden sm:block">
              Find inspiration for your next unforgettable escape.
            </p>
          </div>

          <Link
            href="/destinations"
            className="hidden items-center gap-1.5 text-xs font-bold text-red-600 transition hover:text-red-700 hover:translate-x-0.5 sm:inline-flex"
          >
            <span>View All Destinations</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Dual Marquee Tracks in the Center Viewport */}
        <div className="flex flex-col justify-center gap-3 sm:gap-4 my-auto min-h-0">
          {/* Row 1 (Leftward) */}
          <div>
            {hasBothCategories && (
              <div className="mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  International
                </span>
              </div>
            )}

            <div className="relative w-full overflow-hidden rounded-2xl">
              {/* Edge Gradient Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

              {/* Scrolling Row 1 */}
              <div className="flex animate-marquee-left pause-on-hover py-1">
                {marqueeRow1.map((destination, index) => (
                  <div key={`row1-${destination.id}-${index}`} className="px-2 sm:px-2.5">
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="group relative block h-[135px] w-[180px] sm:h-[155px] sm:w-[215px] md:h-[175px] md:w-[245px] shrink-0 overflow-hidden rounded-2xl bg-[#101c32] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {destination.image ? (
                        <img
                          src={destination.image}
                          alt={destination.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                      )}

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                      {/* Destination Label */}
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                        {destination.country && (
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-red-300 sm:text-[10px]">
                            {destination.country}
                          </p>
                        )}
                        <h3 className="mt-0.5 text-sm sm:text-base md:text-lg font-bold text-white drop-shadow">
                          {destination.name}
                        </h3>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-slate-200 opacity-90 transition group-hover:text-red-400 group-hover:translate-x-1">
                          Discover More
                          <ArrowRight size={11} />
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 (Rightward) */}
          <div>
            {hasBothCategories && (
              <div className="mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Domestic
                </span>
              </div>
            )}

            <div className="relative w-full overflow-hidden rounded-2xl">
              {/* Edge Gradient Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

              {/* Scrolling Row 2 */}
              <div className="flex animate-marquee-right pause-on-hover py-1">
                {marqueeRow2.map((destination, index) => (
                  <div key={`row2-${destination.id}-${index}`} className="px-2 sm:px-2.5">
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="group relative block h-[135px] w-[180px] sm:h-[155px] sm:w-[215px] md:h-[175px] md:w-[245px] shrink-0 overflow-hidden rounded-2xl bg-[#101c32] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {destination.image ? (
                        <img
                          src={destination.image}
                          alt={destination.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                      )}

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                      {/* Destination Label */}
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                        {destination.country && (
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-red-300 sm:text-[10px]">
                            {destination.country}
                          </p>
                        )}
                        <h3 className="mt-0.5 text-sm sm:text-base md:text-lg font-bold text-white drop-shadow">
                          {destination.name}
                        </h3>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-slate-200 opacity-90 transition group-hover:text-red-400 group-hover:translate-x-1">
                          Discover More
                          <ArrowRight size={11} />
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Centered Pill Button */}
        <div className="text-center pt-2">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101c32] px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-red-900/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            View All Destinations
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
