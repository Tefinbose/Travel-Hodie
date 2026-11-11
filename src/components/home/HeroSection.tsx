"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

// Modern pairing: Outfit (geometric display) for headlines,
// Plus Jakarta Sans (clean, friendly) for body text and UI.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface HeroSlide {
  image: string;
  tagline: string;
  headlineMain: string;
  headlineAccent: string;
  headlineSub: string;
  location: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/landing/hotels-luxury-resort.jpg",
    tagline: "Explore the World with TravelHodie",
    headlineMain: "Unforgettable",
    headlineAccent: "Travel Moments",
    headlineSub: "by TravelHodie",
    location: "Maldives & Luxury Resorts",
  },
  {
    image: "/images/landing/cityscape-at-sunset.png",
    tagline: "Tailored City & Coastal Journeys",
    headlineMain: "Collect Moments.",
    headlineAccent: "Not Just Miles.",
    headlineSub: "by TravelHodie",
    location: "Metropolitan & Sunset Horizons",
  },
  {
    image: "/images/landing/group-travel-scenic.jpg",
    tagline: "Curated Group Expeditions",
    headlineMain: "Every Destination",
    headlineAccent: "Tells A Story.",
    headlineSub: "Start Yours Today",
    location: "Scenic Coastlines & Groups",
  },
  {
    image: "/images/landing/sunset-silhouette-of-serenity.png",
    tagline: "Serene & Peaceful Getaways",
    headlineMain: "Your Passport To",
    headlineAccent: "Peace of Mind",
    headlineSub: "with TravelHodie",
    location: "Handcrafted Worldwide Itineraries",
  },
  {
    image: "/images/landing/umrah-makkah-spiritual.jpg",
    tagline: "Dedicated Spiritual Arrangements",
    headlineMain: "Meaningful Journeys",
    headlineAccent: "Thoughtfully Planned",
    headlineSub: "by TravelHodie",
    location: "Makkah & Spiritual Retreats",
  },
];

const AUTOPLAY_INTERVAL = 7000; // ms

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const total = HERO_SLIDES.length;

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % total),
    [total]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + total) % total),
    [total]
  );

  // Autoplay: a fresh 7s timer starts after every slide change
  useEffect(() => {
    const id = setTimeout(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearTimeout(id);
  }, [currentSlide, nextSlide]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Horizontal swipe must be greater than vertical gesture
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleScrollDown = () => {
    const target = document.getElementById("travel-search");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Hero carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`${jakarta.className} relative h-[100dvh] min-h-[560px] max-h-[100dvh] w-full select-none overflow-hidden bg-slate-950`}
    >
      <style>{`
        @keyframes heroFadeUp   { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFadeIn   { from { opacity: 0; } to { opacity: 1; } }
        .hero-fade-up  { animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .hero-fade-in  { animation: heroFadeIn 0.7s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-up, .hero-fade-in { animation: none; }
        }
      `}</style>

      <div
        className="relative flex h-full w-full flex-col justify-between overflow-hidden text-white"
      >
        {/* Background slides: cross-fade + slow Ken Burns zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
          {HERO_SLIDES.map((s, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={s.image}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.location}
                  fill
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                  className={`h-full w-full object-cover object-center brightness-[0.96] contrast-[1.05] saturate-[1.08] transition-transform ease-out ${
                    index % 2 === 0 ? "origin-bottom-left" : "origin-top-right"
                  } ${
                    isActive
                      ? "scale-110 duration-[9000ms]"
                      : "scale-100 duration-0 delay-[1200ms]"
                  }`}
                />
              </div>
            );
          })}

          {/* Scrims for text contrast - enhanced for mobile sunlight readability */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-36 sm:h-44 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 z-20 h-[520px] w-[720px] rounded-full bg-black/60 blur-[110px]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[72%] sm:h-[65%] bg-gradient-to-t from-slate-950/95 via-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.45)_100%)]" />
          {/* Warm brand tint */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-red-950/20 via-transparent to-transparent mix-blend-soft-light" />
        </div>

        {/* Clears floating navbar - responsive headroom */}
        <div className="relative z-30 pt-16 sm:pt-24 md:pt-28" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-30 mx-auto w-full max-w-7xl px-4 pb-5 sm:px-6 sm:pb-8 md:px-8 md:pb-10">
          {/* Re-keyed so the text animates in on every slide change */}
          <div key={currentSlide} className="max-w-3xl" aria-live="polite">
            {/* Location pill */}
            <div className="hero-fade-up mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/95 shadow-lg backdrop-blur-md sm:mb-4 sm:text-xs">
              <MapPin size={12} className="shrink-0 text-red-400" />
              <span className="truncate max-w-[250px] sm:max-w-none">{slide.location}</span>
            </div>

            {/* Headline */}
            <h1
              className={`${outfit.className} hero-fade-up text-[1.85rem] xs:text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl lg:text-[4.25rem]`}
              style={{ animationDelay: "120ms" }}
            >
              {slide.headlineMain}
              <br />
              <span className="bg-gradient-to-r from-red-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">
                {slide.headlineAccent}
              </span>
              <br />
              <span className="text-[0.58em] sm:text-[0.62em] font-semibold text-white/90">
                {slide.headlineSub}
              </span>
            </h1>

            {/* Action Buttons - streamlined for mobile touch & screen fit */}
            <div
              className="hero-fade-up mt-4 sm:mt-6 flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/holidays"
                className="group inline-flex flex-1 sm:flex-initial items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-red-600 px-4 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-red-950/50 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
              >
                <span>Explore Packages</span>
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1 shrink-0"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex flex-1 sm:flex-initial items-center justify-center rounded-full border border-white/35 bg-white/10 px-4 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-white shadow-xl backdrop-blur-md transition hover:bg-white hover:text-slate-900 active:scale-[0.98]"
              >
                Plan Your Journey
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Indicators & Controls */}
          <div className="mt-5 border-t border-white/15 pt-3 sm:mt-7 sm:pt-4">
            <div className="flex items-center justify-between gap-2.5">
              {/* Slide Indicator Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === i
                        ? "w-6 bg-red-500 sm:w-8"
                        : "w-1.5 bg-white/40 hover:bg-white/70 sm:w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation controls */}
              <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white transition hover:bg-white hover:text-slate-900 active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white transition hover:bg-white hover:text-slate-900 active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleScrollDown}
                  aria-label="Scroll down to search trips"
                  className="group inline-flex h-8 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-black/30 pl-2.5 sm:pl-4 pr-1 text-xs font-medium backdrop-blur-md text-white transition hover:border-white hover:bg-white hover:text-slate-900"
                >
                  <span className="hidden sm:inline">Explore More</span>
                  <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-slate-900 group-hover:text-white">
                    <ArrowDown size={12} className="animate-bounce" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
