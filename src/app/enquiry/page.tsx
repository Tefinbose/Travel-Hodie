
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  Compass,
  ArrowRight,
} from "lucide-react";

import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Travel Enquiry | TravelHodie",
  description:
    "Send your travel requirements to TravelHodie. Get assistance with holiday packages, flights, hotels, visas and customised trips.",
};

export default function EnquiryPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071324] px-5 pb-8 pt-24 text-center text-white sm:pb-10 sm:pt-26 md:pb-12 md:pt-28">
        {/* Thematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/scrapbook/minimalist-traveler-desk.jpg"
            alt="Plan your travel enquiry"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/85 via-[#071324]/65 to-[#071324]/90" />
        </div>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
            Plan Your Journey{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
              With Us.
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
            Tell us where you want to go and what you have in mind.
            Our travel experts will help you plan a journey that suits
            your preferences.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:pt-8">
        <div className="text-xs sm:text-sm text-slate-500">
          <Link href="/" className="hover:text-red-600 transition">
            Home
          </Link>
          {" / "}
          <span className="font-semibold text-[#101c32]">Enquiry</span>
        </div>
      </div>

      {/* Main Section */}
      <section className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-8 sm:py-10 md:py-12 lg:grid-cols-[1fr_380px]">
        {/* Enquiry Form */}
        <div>
          <div className="mb-6 sm:mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Send Us Your Requirements
            </span>

            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl">
              Tell Us About Your Trip
            </h2>

            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
              Complete the form below. Our team will review your
              requirements and get in touch with you promptly.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] sm:p-8">
            <EnquiryForm />
          </div>
        </div>

        {/* Contact Information - Sticky on desktop */}
        <aside className="h-fit rounded-3xl bg-[#101c32] p-7 text-white shadow-xl shadow-slate-900/10 border border-slate-800 lg:sticky lg:top-24 z-10 transition-all">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            Contact TravelHodie
          </span>

          <h2 className="mt-2.5 text-xl sm:text-2xl font-extrabold text-white">
            Let&apos;s Make Your Plans Happen
          </h2>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
            Need immediate assistance? Contact our team directly.
            We&apos;re happy to help with your travel questions.
          </p>

          <div className="mt-7 space-y-5">
            <div className="flex gap-3.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Our Office</h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-300">
                  Door No. 4/461, 2nd Floor, Valamkoottil Towers,
                  Judgemukku, Thrikkakara P.O., Kakkanad,
                  Kochi, Kerala – 682021, India.
                </p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Call Us</h3>
                <a
                  href="tel:+918921083214"
                  className="mt-1 block text-xs sm:text-sm text-slate-300 transition hover:text-red-400"
                >
                  +91 89210 83214
                </a>
              </div>
            </div>

            <div className="flex gap-3.5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Email Us</h3>
                <a
                  href="mailto:Sales@travelhodie.com"
                  className="mt-1 block text-xs sm:text-sm text-slate-300 transition hover:text-red-400"
                >
                  Sales@travelhodie.com
                </a>
                <a
                  href="mailto:Info@travelhodie.com"
                  className="mt-0.5 block text-xs sm:text-sm text-slate-300 transition hover:text-red-400"
                >
                  Info@travelhodie.com
                </a>
              </div>
            </div>

            <div className="flex gap-3.5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Working Hours</h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Mon – Sat: 9:30 AM – 6:30 PM IST
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/918921083214"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500 active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </aside>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 py-12 sm:py-16">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-50 backdrop-blur-md">
              <Compass size={13} className="text-white" />
              Custom Travel Planning
            </span>

            <h2 className="mt-3.5 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
              Have a Special Travel Requirement?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-red-100">
              Whether it&apos;s a family holiday, group tour, luxury escape
              or international journey, TravelHodie can help you plan it.
            </p>

            <Link
              href="/holidays"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-red-600 shadow-xl transition-all duration-300 hover:bg-[#101c32] hover:text-white"
            >
              Explore Holiday Packages
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
