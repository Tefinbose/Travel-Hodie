import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Globe,
  ShieldCheck,
  Users,
  Rocket,
  Telescope,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | TravelHodie",
  description:
    "Discover TravelHodie's mission, vision and commitment to creating memorable travel experiences.",
};

const values = [
  {
    icon: Compass,
    title: "Personalised Service",
    description:
      "Travel solutions designed around your preferences, interests and requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Dependable Support",
    description:
      "Clear guidance and reliable assistance throughout your travel planning journey.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description:
      "Explore domestic and international destinations with a range of travel services.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your comfort, convenience and satisfaction remain at the heart of our approach.",
  },
];

const services = [
  "Domestic and international flight bookings",
  "Holiday and tour packages",
  "Hotel reservations",
  "Visa assistance",
  "Travel insurance assistance",
  "Umrah travel packages",
  "Passport assistance",
  "Customised family and group tours",
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071324] pb-8 pt-20 text-center text-white sm:pb-9 sm:pt-24 md:pb-10 md:pt-26">
        {/* Background Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/landing/hotels-luxury-resort.jpg"
            alt="About TravelHodie"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          {/* Scrim providing high legibility for centered text while keeping scenic resort visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
          <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight sm:leading-tight md:leading-[1.18]">
            Making Every Journey{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
              Worth Remembering.
            </span>
          </h1>

          <p className="mx-auto mt-2.5 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
            At TravelHodie, we believe travelling is more than reaching a
            destination. It is about discovering new experiences, creating
            meaningful memories and enjoying every moment.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/holidays"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
            >
              Explore Holidays
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-[#101c32] active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Company / Who We Are */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 sm:py-10 md:py-12 md:px-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Who We Are
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
            Your Travel Partner for Every New Adventure
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
            TravelHodie is a travel service company focused on making travel
            planning convenient, comfortable and memorable. We bring together a
            range of travel services to help individuals, families and groups
            plan their journeys.
          </p>

          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
            Whether you are planning a quick getaway, an international holiday, a
            family vacation or a group journey, our goal is to understand your
            needs and help you explore suitable travel arrangements.
          </p>

          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
            With a focus on personalised solutions, competitive travel options
            and dependable assistance, we aim to make every journey a more
            enjoyable experience.
          </p>
        </div>

        <div className="relative h-[300px] sm:h-[350px] lg:h-[380px] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-900/10 border border-slate-100">
          <Image
            src="/images/landing/group-travel-scenic.jpg"
            alt="Travellers exploring destinations"
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* Floating badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 rounded-2xl bg-white/95 p-3 sm:p-3.5 shadow-xl backdrop-blur-md border border-white/60 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Trusted Travel Partner
              </p>
              <p className="text-sm font-extrabold text-[#101c32]">
                Worldwide Destinations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision (What Drives Us) */}
      <section className="bg-[#f8fafc] py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-6 text-center sm:mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Our Purpose
            </span>

            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
              What Drives Us
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6 items-stretch">
            {/* Mission Card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-b from-[#141d2e] via-[#0f1726] to-[#090f1a] p-6 sm:p-7 text-white shadow-xl shadow-slate-900/10">
              <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-red-600/20 blur-3xl" />

              <div className="relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30">
                  <Rocket size={20} strokeWidth={2} />
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-white">
                  Our Mission
                </h3>

                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-300">
                  To make travel convenient, comfortable and memorable through
                  personalised travel solutions, competitive fares and
                  dependable customer support. We strive to understand every
                  traveller&apos;s needs and help turn travel plans into
                  meaningful experiences.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/80 shadow-sm">
                  <Telescope size={20} strokeWidth={2} />
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-[#101c32]">
                  Our Vision
                </h3>

                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600">
                  To become a trusted travel partner recognised for personalised
                  service, customer care and meaningful travel experiences,
                  helping people discover more of the world with confidence and
                  comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-10 md:py-12 md:px-8">
        <div className="mb-6 max-w-2xl sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            What We Believe In
          </span>

          <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
            The Values Behind Every Journey
          </h2>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-500">
            The principles that guide how we serve our customers and approach
            every travel requirement.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                      <Icon size={19} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base sm:text-lg font-extrabold text-[#101c32]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="relative overflow-hidden bg-[#0c1626] py-8 sm:py-10 md:py-12 text-white">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              What We Offer
            </span>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Complete Travel Solutions Under One Roof
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
              From planning your flights and accommodation to organising
              holidays and assisting with travel documentation, we offer a range
              of services to support your travel needs.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-red-950/50 transition-all duration-300 hover:bg-red-500 hover:gap-3"
            >
              Talk to Our Team
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-red-500/40 hover:bg-white/10"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/30">
                  <CheckCircle2 size={15} />
                </span>

                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-8 sm:py-10 md:py-12">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-9 text-center text-white shadow-2xl shadow-red-900/20 sm:px-10 sm:py-11">
          {/* Decorative ambient elements */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-0.5 text-xs font-bold uppercase tracking-[0.2em] text-red-50 backdrop-blur-md">
              Start Your Adventure
            </span>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl md:text-4xl text-white tracking-tight">
              Your Next Journey Starts Here
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-red-100 max-w-xl mx-auto">
              Let TravelHodie help you plan a journey that matches your
              interests, preferences and travel dreams.
            </p>

            <Link
              href="/enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-red-600 shadow-xl transition-all duration-300 hover:bg-[#101c32] hover:text-white"
            >
              Start Planning Your Trip
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
