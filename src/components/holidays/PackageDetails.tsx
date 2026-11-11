import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Plane,
  Luggage,
  Handshake,
  Globe,
  ArrowRight,
  Send,
  Compass,
  CheckCircle2,
} from "lucide-react";

interface PackageDetailsProps {
  packageData: {
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
  };
}

export default function PackageDetails({
  packageData,
}: PackageDetailsProps) {
  const heroImageSrc =
    packageData.image || "/images/hero/tropical-island-lagoon.jpg";

  return (
    <main className="bg-white">
      {/* Hero Section */}
        <section className="relative flex min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[600px] items-center overflow-hidden bg-[#071324] px-5 pt-32 pb-18 sm:pt-40 sm:pb-22 md:pt-44 md:pb-26 text-white">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImageSrc}
              alt={packageData.title}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-black/20" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
            <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
              {packageData.title}
            </h1>

            <p className="mt-3 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
              {packageData.shortDescription || packageData.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3.5 py-1 font-semibold">
                <MapPin size={13} className="text-red-400" />
                {packageData.destination.name}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3.5 py-1 font-semibold">
                <Clock size={13} className="text-red-400" />
                {packageData.duration}
              </span>
            </div>
          </div>
        </section>

        {/* Package Content */}
        <section className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-8 sm:py-10 md:px-8 md:py-12 lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* Left Content */}
          <div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                About This Journey
              </span>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl">
                Discover Your Next Adventure
              </h2>

              <div className="mt-4 whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-600">
                {packageData.description}
              </div>
            </div>

            {/* Package Highlights */}
            <div className="mt-8 sm:mt-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Highlights
              </span>

              <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#101c32]">
                Why Choose This Package?
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                    <Plane size={19} />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-[#101c32]">
                    Memorable Experiences
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    Discover iconic landmarks and create unforgettable travel memories.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                    <Luggage size={19} />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-[#101c32]">
                    Carefully Planned
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    Travel arrangements designed for seamless comfort and convenience.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                    <Handshake size={19} />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-[#101c32]">
                    Personalised Assistance
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    Our expert travel concierge is always ready to support your itinerary.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                    <Globe size={19} />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-[#101c32]">
                    Explore Worldwide
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    Enjoy genuine destination immersion crafted around your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card - Sticky on desktop */}
          <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 lg:sticky lg:top-24 z-10 transition-shadow">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Package Price
            </span>

            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-extrabold text-[#101c32]">
                ₹{packageData.price.toLocaleString("en-IN")}
              </span>
              <span className="ml-2 text-xs font-semibold text-slate-400">
                / person
              </span>
            </div>

            <div className="my-5 space-y-3 border-y border-slate-100 py-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Destination</span>
                <span className="font-bold text-[#101c32]">
                  {packageData.destination.name}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Duration</span>
                <span className="font-bold text-[#101c32]">
                  {packageData.duration}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Package Type</span>
                <span className="font-bold text-red-600">
                  Curated Holiday
                </span>
              </div>
            </div>

            {/* Book This Package Button */}
            <Link
              href={`/booking/${packageData.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
            >
              Book This Package
              <ArrowRight size={15} />
            </Link>

            {/* Enquiry Button */}
            <Link
              href={`/contact?package=${encodeURIComponent(packageData.title)}`}
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-[#101c32] transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <Send size={14} />
              Send an Enquiry
            </Link>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
              Final availability and customisation options will be confirmed by our TravelHodie concierge.
            </p>
          </aside>
        </section>

        {/* Bottom CTA */}
        <section className="px-5 py-8 sm:py-10 md:py-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-9 text-center text-white shadow-2xl shadow-red-900/20 sm:px-10 sm:py-11">
            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-0.5 text-xs font-bold uppercase tracking-[0.2em] text-red-50">
                TravelHodie Holidays
              </span>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl md:text-4xl text-white tracking-tight">
                Ready to Begin Your Journey?
              </h2>

              <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-red-100 max-w-xl mx-auto">
                Let us help you plan a comfortable, seamless, and memorable travel experience.
              </p>

              <Link
                href={`/booking/${packageData.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-red-600 shadow-xl transition-all duration-300 hover:bg-[#101c32] hover:text-white"
              >
                Book Your Holiday
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}
