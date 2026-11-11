"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Plane,
  Hotel,
  Users,
  ShieldCheck,
  Landmark,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Find convenient domestic and international flights.",
    href: "/flights",
    image: "/images/landing/cityscape-at-sunset.png",
    number: "01",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Discover comfortable stays at great destinations.",
    href: "/hotels",
    image: "/images/landing/hotels-luxury-resort.jpg",
    number: "02",
  },
  {
    icon: Users,
    title: "Group Travel",
    description: "Tailor-made group holidays, corporate trips and family tours.",
    href: "/group-travel",
    image: "/images/landing/group-travel-scenic.jpg",
    number: "03",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    description: "Travel with comprehensive coverage and peace of mind.",
    href: "/insurance",
    image: "/images/landing/sunset-silhouette-of-serenity.png",
    number: "04",
  },
  {
    icon: Landmark,
    title: "Umrah Packages",
    description: "Spiritual journeys thoughtfully planned with dedicated care.",
    href: "/umrah",
    image: "/images/landing/umrah-makkah-spiritual.jpg",
    number: "05",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    // Only detect scroll position on mobile (< 768px)
    if (window.innerWidth >= 768) return;

    const container = scrollContainerRef.current;
    const card = container.firstElementChild as HTMLElement | null;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 14;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (newIndex >= 0 && newIndex < services.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (!scrollContainerRef.current) return;

    if (window.innerWidth < 768) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[index] as HTMLElement | undefined;
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white pt-3 pb-6 sm:pt-4 sm:pb-8 md:pt-4 md:pb-10">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 top-6 h-60 w-60 rounded-full bg-red-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-60 w-60 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 md:px-8">
        {/* Compact Heading */}
        <div className="mx-auto mb-4 max-w-2xl text-center sm:mb-5 md:mb-6">
          <span className="inline-flex items-center rounded-full border border-red-100 bg-red-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-red-600 sm:text-[11px]">
            What We Offer
          </span>

          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-[#101c32] sm:text-2xl md:text-3xl md:leading-tight">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent">
              Your Journey
            </span>
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Your travel partner for holidays, accommodation, flights and
            essential travel services.
          </p>
        </div>

        {/* Scrollable Container on Mobile, Accordion on Desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex flex-row overflow-x-auto pb-3 pt-1 px-4 sm:px-6 -mx-4 sm:-mx-6 gap-3.5 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:p-0 md:m-0 md:gap-3 md:h-[290px] lg:h-[310px] w-auto md:w-full"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={service.title}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => scrollToCard(index)}
                tabIndex={0}
                role="region"
                aria-expanded={isActive}
                aria-label={service.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-[24px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 select-none shadow-md hover:shadow-xl hover:shadow-slate-900/20 w-[82vw] max-w-[320px] shrink-0 snap-center h-[330px] sm:h-[350px] md:h-auto md:w-auto md:shrink ${
                  isActive
                    ? "md:flex-[3.2] ring-1 ring-white/30"
                    : "md:flex-1 md:hover:flex-[1.12] md:opacity-90 md:hover:opacity-100"
                }`}
              >
                {/* Background Image (exclusively from /images/landing) */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      isActive
                        ? "scale-105"
                        : "scale-100 brightness-95 md:brightness-90 group-hover:scale-105"
                    }`}
                  />
                </div>

                {/* Overlays */}
                {/* Desktop inactive dark overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 hidden md:block ${
                    isActive
                      ? "opacity-0 pointer-events-none"
                      : "bg-slate-950/55 backdrop-brightness-75 group-hover:bg-slate-950/45 opacity-100"
                  }`}
                />

                {/* Gradient scrim overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/20 transition-opacity duration-500 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-100 md:opacity-0 md:pointer-events-none"
                  }`}
                />

                {/* Subtle border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-[24px] ring-1 ring-inset ring-white/15" />

                {/* Top Section (Icon & Number) */}
                <div className="relative z-10 flex items-center justify-between p-4 sm:p-4 md:p-3.5 lg:p-4">
                  {/* Icon badge */}
                  <div
                    className={`flex items-center justify-center rounded-xl transition-all duration-500 ${
                      isActive
                        ? "h-9 w-9 bg-white/20 text-white shadow-md shadow-black/20 backdrop-blur-md border border-white/30"
                        : "h-8 w-8 md:h-8 md:w-8 bg-black/30 text-white/90 backdrop-blur-md border border-white/15 group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  {/* Index number */}
                  <span
                    className={`font-mono text-base font-black tracking-wider transition-colors duration-500 ${
                      isActive
                        ? "text-white/70"
                        : "text-white/40 group-hover:text-white/60"
                    }`}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Inactive slice text: vertical rotated title on desktop only */}
                <div
                  className={`absolute inset-0 hidden md:flex items-center justify-center pointer-events-none transition-all duration-300 ${
                    isActive ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <span className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.2em] text-[10px] font-bold text-white/75 select-none drop-shadow-md">
                    {service.title}
                  </span>
                </div>

                {/* Content Panel (always visible on mobile cards, expands on desktop) */}
                <div
                  className={`relative z-10 mt-auto p-4 sm:p-5 md:p-4 lg:p-5 transition-all duration-500 ${
                    isActive
                      ? "opacity-100 translate-y-0 md:delay-100"
                      : "opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:pointer-events-none"
                  }`}
                >
                  {/* Accent Bar + Title */}
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-gradient-to-b from-red-500 to-rose-400 shrink-0 shadow-sm shadow-red-500/50" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-200/90 drop-shadow line-clamp-2">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-3">
                    <Link
                      href={service.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-red-600/30 transition-all duration-300 hover:bg-red-500 hover:gap-2 hover:shadow-red-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Explore Service
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Indicator Dots */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5">
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to ${service.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-red-600"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
