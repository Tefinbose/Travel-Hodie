
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Headphones,
  Award,
  BadgeCheck,
  Plane,
  Hotel,
  FileText,
  Landmark,
  BookOpen,
  Users,
  Globe,
} from "lucide-react";

interface ServicePageProps {
  eyebrow?: string;
  title: string;
  description: string;
  heroImage?: string;
  benefits: string[];
  steps: string[];
  ctaTitle: string;
  ctaDescription: string;
}

const BENEFIT_ICONS = [
  ShieldCheck,
  BadgeCheck,
  Clock,
  Headphones,
  Compass,
  Award,
];

const OTHER_SERVICES = [
  { name: "Flights", href: "/flights", icon: Plane },
  { name: "Hotels", href: "/hotels", icon: Hotel },
  { name: "Visa", href: "/visa", icon: FileText },
  { name: "Insurance", href: "/insurance", icon: ShieldCheck },
  { name: "Umrah", href: "/umrah", icon: Landmark },
  { name: "Passport", href: "/passport", icon: BookOpen },
  { name: "Group Travel", href: "/group-travel", icon: Users },
  { name: "Holidays", href: "/holidays", icon: Globe },
];

export default function ServicePage({
  title,
  description,
  heroImage,
  benefits,
  steps,
  ctaTitle,
  ctaDescription,
}: ServicePageProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071324] pb-8 pt-20 text-center text-white sm:pb-9 sm:pt-24 md:pb-10 md:pt-26">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={title}
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
            {/* Scrim providing high legibility for centered text while keeping scenic background sharp */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
          <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
            {title}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
            >
              Send an Enquiry
              <ArrowRight size={15} />
            </Link>

            <a
              href="https://wa.me/918921083214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition hover:bg-white hover:text-[#101c32] active:scale-[0.98]"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-10 md:py-12 md:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Why TravelHodie
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
            Travel Support Made Simpler
          </h2>

          <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-slate-500">
            Get personalised assistance and dependable support as you plan
            your journey with our team.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
            return (
              <div
                key={benefit}
                className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl"
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
                    {benefit}
                  </h3>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>TravelHodie Dedicated Service</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works / Process Section */}
      <section className="bg-slate-50 py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              How It Works
            </span>

            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
              Simple Steps to Get Started
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-500">
              Clear, fast, and dependable coordination from your initial enquiry to confirmed details.
            </p>
          </div>

          <div className="mx-auto mt-6 sm:mt-8 grid max-w-5xl gap-4 md:grid-cols-3 sm:gap-5">
            {steps.map((step, index) => (
              <div
                key={step}
                className="group relative rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg"
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  Step 0{index + 1}
                </span>

                <div className="mx-auto mt-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#101c32] text-sm font-bold text-white shadow-md transition-colors duration-300 group-hover:bg-red-600">
                  {index + 1}
                </div>

                <p className="mt-3.5 text-xs sm:text-sm md:text-[15px] font-semibold leading-relaxed text-[#101c32]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Services Marquee */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-10 md:px-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Complete Travel Solutions
            </span>
            <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-[#101c32]">
              Explore Other Services
            </h3>
          </div>
          <Link
            href="/holidays"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 transition"
          >
            Browse Holiday Packages
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Marquee Track Container with Edge Fade Masks */}
        <div className="relative w-full overflow-hidden">
          {/* Edge gradient masks for smooth fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Infinite Scrolling Track */}
          <div className="flex animate-marquee-left pause-on-hover py-2 gap-3 sm:gap-4">
            {[...OTHER_SERVICES, ...OTHER_SERVICES, ...OTHER_SERVICES, ...OTHER_SERVICES].map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={`${service.name}-${index}`}
                  href={service.href}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-5 py-4 min-w-[130px] sm:min-w-[145px] text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg shrink-0"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100/80 transition-colors group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-100">
                    <Icon size={18} />
                  </span>
                  <span className="mt-2.5 text-xs font-bold whitespace-nowrap text-[#101c32] group-hover:text-red-600 transition-colors">
                    {service.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 py-8 sm:py-10 md:py-12">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-9 text-center text-white shadow-2xl shadow-red-900/20 sm:px-10 sm:py-11">
          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-0.5 text-xs font-bold uppercase tracking-[0.2em] text-red-50">
              <Compass size={13} className="text-white" />
              Let&apos;s Plan Together
            </span>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl md:text-4xl text-white tracking-tight">
              {ctaTitle}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-red-100">
              {ctaDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-red-600 shadow-xl transition-all duration-300 hover:bg-[#101c32] hover:text-white"
              >
                Enquire Now
                <ArrowRight size={15} />
              </Link>

              <a
                href="https://wa.me/918921083214"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition hover:bg-white hover:text-[#101c32] active:scale-[0.98]"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
