import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#071324] pb-10 pt-24 text-center text-white sm:pb-12 sm:pt-26 md:pb-14 md:pt-28">
      {/* Thematic Background Image based on Travel Concierge & Contact */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/coastal-cliffs-sunset.jpg"
          alt="Contact TravelHodie concierge"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center brightness-[0.85] contrast-[1.05]"
        />
        {/* Scrim providing high legibility for centered text while keeping scenic background visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
        <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
          Let&apos;s Plan Your{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
            Next Journey.
          </span>
        </h1>

        <p className="mx-auto mt-3.5 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
          Have a question, need a travel quotation, or want to customise
          your holiday? Our team is ready to help you plan your journey.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/918921083214"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
          >
            <MessageCircle size={15} />
            Chat on WhatsApp
          </a>

          <a
            href="tel:+918921083214"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-[#101c32] active:scale-[0.98]"
          >
            <Phone size={14} />
            +91 89210 83214
          </a>
        </div>
      </div>
    </section>
  );
}
