import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HolidaysHero() {
  return (
    <section className="relative overflow-hidden bg-[#071324] pb-8 pt-20 text-center text-white sm:pb-9 sm:pt-24 md:pb-10 md:pt-26">
      {/* Background Image matching Services layout */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/tropical-island-lagoon.jpg"
          alt="Tropical holiday getaway"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center brightness-[0.85] contrast-[1.05]"
        />
        {/* Scrim providing high legibility for centered text while keeping scenic background sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
        <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
          Discover Your Next{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
            Great Adventure.
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
          Explore handpicked holiday packages, unforgettable destinations,
          and personalised travel experiences designed around you.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#holiday-packages"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
          >
            Explore Packages
            <ArrowRight size={15} />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition hover:bg-white hover:text-[#101c32] active:scale-[0.98]"
          >
            Plan My Trip
          </Link>
        </div>
      </div>
    </section>
  );
}
