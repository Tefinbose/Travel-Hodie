import { connection } from "next/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/booking/BookingForm";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  Clock,
  ShieldCheck,
  Headphones,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const instant = false;

interface BookingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BookingPage({
  params,
}: BookingPageProps) {
  await connection();
  const { slug } = await params;

  const packageData = await prisma.package.findFirst({
    where: {
      slug,
      isActive: true,
      destination: {
        isActive: true,
      },
    },
    include: {
      destination: {
        select: {
          name: true,
          country: true,
        },
      },
    },
  });

  if (!packageData) {
    notFound();
  }

  const price = Number(packageData.price);

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
        <section className="relative flex min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[600px] items-center justify-center overflow-hidden bg-[#071324] px-5 pt-32 pb-18 sm:pt-40 sm:pb-22 md:pt-44 md:pb-26 text-center text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src={packageData.image || "/images/hero/tropical-island-lagoon.jpg"}
              alt={packageData.title}
              fill
              priority
              quality={95}
              className="object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/60 to-[#071324]/85" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
            <h1 className="mx-auto max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-tight md:leading-[1.18]">
              Complete Your{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">
                Booking.
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300">
              Share your preferred travel dates and passenger details. Our travel concierge will verify availability and assist you with every arrangement.
            </p>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-6xl px-5 pt-6 sm:pt-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="transition hover:text-red-600">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/holidays" className="transition hover:text-red-600">
              Holidays
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link
              href={`/holidays/${packageData.slug}`}
              className="max-w-[200px] truncate transition hover:text-red-600 sm:max-w-none"
            >
              {packageData.title}
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-semibold text-[#101c32]">Booking Request</span>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-6 sm:py-8 md:py-10 lg:grid-cols-[1fr_360px]">
          {/* Booking Form Component */}
          <div>
            <BookingForm
              packageId={packageData.id}
              packageTitle={packageData.title}
              price={price}
            />
          </div>

          {/* Selected Package Card - Sticky on desktop */}
          <aside className="h-fit rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-900/5 lg:sticky lg:top-24 z-10 overflow-hidden transition-all">
            {/* Card Top Image */}
            <div className="relative h-48 w-full bg-slate-100">
              {packageData.image ? (
                <Image
                  src={packageData.image}
                  alt={packageData.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-100 text-xs font-semibold text-slate-400">
                  TravelHodie
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <MapPin size={12} className="text-red-400" />
                {packageData.destination.name}, {packageData.destination.country}
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
                Selected Package
              </span>

              <h2 className="mt-1.5 text-base sm:text-lg font-extrabold leading-snug text-[#101c32]">
                {packageData.title}
              </h2>

              {/* Price & Duration Stats */}
              <div className="my-4 space-y-2.5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock size={13} className="text-red-500" />
                    Duration
                  </span>
                  <span className="font-bold text-[#101c32]">
                    {packageData.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500 font-medium">Price per person</span>
                  <span className="text-base font-extrabold text-red-600">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Trust Points */}
              <div className="space-y-2 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>Zero hidden booking charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones size={14} className="text-emerald-500 shrink-0" />
                  <span>Dedicated concierge coordination</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 space-y-2.5 pt-2">
                <Link
                  href={`/holidays/${packageData.slug}`}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-[#101c32] shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
                >
                  View Package Details
                  <ArrowRight size={13} />
                </Link>

                <a
                  href="https://wa.me/918921083214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-4 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.98]"
                >
                  <MessageCircle size={13} />
                  Need help? Chat on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
    </main>
  );
}