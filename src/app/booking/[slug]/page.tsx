import { connection } from "next/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/booking/BookingForm";
import Link from "next/link";
import Image from "next/image";

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
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-[#14243A] px-5 pb-16 pt-28 text-center text-white md:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src={packageData.image || "/images/hero/tropical-island-lagoon.jpg"}
            alt={packageData.title}
            fill
            priority
            quality={90}
            className="object-cover object-center brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#14243A]/90 via-[#14243A]/85 to-[#14243A]/95" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5B96D]">
            TravelHodie Reservations
          </p>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Complete Your Booking
          </h1>

          <p className="mt-4 text-white/75">
            Share your travel details and let us help plan your journey.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-5 pt-8">
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:text-[#C62835]">
            Home
          </Link>
          {" / "}
          <Link href="/holidays" className="hover:text-[#C62835]">
            Holidays
          </Link>
          {" / "}
          <Link
            href={`/holidays/${packageData.slug}`}
            className="hover:text-[#C62835]"
          >
            {packageData.title}
          </Link>
          {" / "}
          <span className="text-[#14243A]">Booking</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_340px]">
        {/* Booking Form */}
        <div>
          <BookingForm
            packageId={packageData.id}
            packageTitle={packageData.title}
            price={price}
          />
        </div>

        {/* Selected Package */}
        <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {packageData.image ? (
            <img
              src={packageData.image}
              alt={packageData.title}
              className="h-52 w-full object-cover"
            />
          ) : (
            <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400">
              TravelHodie
            </div>
          )}

          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C62835]">
              Selected Holiday Package
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#14243A]">
              {packageData.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {packageData.destination.name},{" "}
              {packageData.destination.country}
            </p>

            <div className="mt-5 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-800">
                  {packageData.duration}
                </span>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-500">Price per person</span>
                <span className="font-bold text-[#C62835]">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Link
              href={`/holidays/${packageData.slug}`}
              className="mt-6 block text-center text-sm font-semibold text-[#14243A] hover:text-[#C62835]"
            >
              View Package Details →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}