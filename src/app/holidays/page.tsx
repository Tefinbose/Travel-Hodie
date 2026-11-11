
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

import HolidaysHero from "@/components/holidays/HolidaysHero";
import PackageFilters from "@/components/holidays/PackageFilters";
import PackageGrid from "@/components/holidays/PackageGrid";
import HolidaysCTA from "@/components/holidays/HolidaysCTA";

export const instant = false;

interface HolidaysPageProps {
  searchParams: Promise<{
    search?: string;
    destination?: string;
  }>;
}

export const metadata = {
  title: "Holiday Packages | TravelHodie",
  description:
    "Explore unforgettable domestic and international holiday packages with TravelHodie.",
};

export default async function HolidaysPage({
  searchParams,
}: HolidaysPageProps) {
  await connection();
  const params = await searchParams;

  const search = params.search?.trim() || "";
  const selectedDestination = params.destination?.trim() || "";

  let packages: any[] = [];
  let destinations: { name: string; slug: string }[] = [];

  try {
    const results = await Promise.all([
      prisma.package.findMany({
        where: {
          isActive: true,
          destination: {
            isActive: true,
            ...(selectedDestination ? { slug: selectedDestination } : {}),
          },
          ...(search
            ? {
                OR: [
                  { title: { contains: search } },
                  { shortDescription: { contains: search } },
                  {
                    destination: {
                      name: { contains: search },
                    },
                  },
                ],
              }
            : {}),
        },
        include: {
          destination: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.destination.findMany({
        where: {
          isActive: true,
        },
        select: {
          name: true,
          slug: true,
        },
        orderBy: {
          name: "asc",
        },
      }),
    ]);
    packages = results[0];
    destinations = results[1];
  } catch (error) {
    console.error("Database unavailable on HolidaysPage:", error);
  }

  const packageData = packages.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    shortDescription: item.shortDescription,
    duration: item.duration,
    price: Number(item.price),
    image: item.image,
    destination: {
      name: item.destination.name,
    },
  }));

  return (
    <main className="min-h-screen bg-white">
      <HolidaysHero />

      <section
        id="holiday-packages"
        className="mx-auto max-w-7xl px-5 py-8 sm:py-10 md:px-8 md:py-12"
      >
        <div className="mb-6 sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Explore our collection
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#101c32] sm:text-3xl md:text-4xl">
            Find Your Perfect Holiday
          </h2>

          <p className="mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-500">
            From relaxing beach escapes to exciting international adventures,
            find a holiday package that suits your travel plans.
          </p>
        </div>

        <PackageFilters
          destinations={destinations}
          search={search}
          selectedDestination={selectedDestination}
        />

        <div className="mb-5 mt-6 sm:mt-8 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#101c32]">
            Available Packages
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            {packages.length} {packages.length === 1 ? "package" : "packages"} found
          </p>
        </div>

        <PackageGrid packages={packageData} />
      </section>

      <HolidaysCTA />
    </main>
  );
}
