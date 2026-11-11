import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function DestinationsHero() {
  return (
      <section className="relative flex min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[600px] items-center justify-center overflow-hidden bg-[#071324] px-5 pt-32 pb-18 sm:pt-40 sm:pb-22 md:pt-44 md:pb-26 text-center text-white">
        {/* Thematic Background Image based on Destinations */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/scrapbook/illustrated-travel-map-journal.jpg"
            alt="World destinations map"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          {/* Scrim providing high legibility for centered text while keeping scenic map sharp */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
          <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
            Discover Destinations That{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
              Inspire You.
            </span>
          </h1>

          <p className="mx-auto mt-3.5 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
            From peaceful escapes to exciting international adventures,
            discover your next destination with TravelHodie.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/holidays"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
            >
              Explore Holiday Packages
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      );
}
