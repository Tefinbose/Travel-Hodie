
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, MessageCircle } from "lucide-react";

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
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071324] pb-10 pt-24 text-center text-white sm:pb-12 sm:pt-26 md:pb-14 md:pt-28">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={title}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
            {/* Scrim providing high legibility for centered text while keeping scenic background visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
          </div>
        )}

        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
          <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
            {title}
          </h1>

          <p className="mx-auto mt-3.5 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-[#101c32] active:scale-[0.98]"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-16 md:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Why TravelHodie
          </span>

          <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
            Travel Support Made Simpler
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
            Get personalised assistance and dependable support as you plan
            your journey with our team.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={benefit}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-base font-bold text-red-600 border border-red-100/60 shadow-sm">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-base sm:text-lg font-extrabold text-[#101c32]">
                {benefit}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              How It Works
            </span>

            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
              Simple Steps to Get Started
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#101c32] text-base font-bold text-white shadow-md">
                  {index + 1}
                </div>

                <p className="mt-4 text-sm sm:text-base font-semibold leading-relaxed text-[#101c32]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-14 sm:py-16">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-50 backdrop-blur-md">
              <Compass size={13} className="text-white" />
              Let&apos;s Plan Together
            </span>

            <h2 className="mt-3.5 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
              {ctaTitle}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-red-100">
              {ctaDescription}
            </p>

            <Link
              href="/enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-red-600 shadow-xl transition-all duration-300 hover:bg-[#101c32] hover:text-white"
            >
              Enquire Now
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
